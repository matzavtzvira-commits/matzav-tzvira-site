// Reminders without a database: Resend scheduled sends + a signed link token.
// Order: schedule the business follow-up first (keep its id) -> build the token
// (it carries the follow-up id) -> schedule the client reminder with the link.
// Both sends carry idempotency keys derived from the browser's submissionId, and their
// payloads depend only on the request + the Israel date (token expiry included), so a
// retried request is byte-identical and Resend returns the original email.
import type { Resend } from "resend";
import type { TokenPayload } from "./types";
import type { PendingItem } from "./pending";
import { businessItemLabels } from "./pending";
import { reminderSchedule, formatDayLabel, tokenExpiry, type Ymd } from "./dates";
import { signToken } from "./token";
import { renderClientReminder, renderFollowUp } from "./render-reminders";
import { sendMail, cancelMail, idemKey } from "./mail";
import { BUSINESS_EMAIL, FROM_RIVKY, FROM_SITE, RESEND_MAX_SCHEDULE_DAYS, TOKEN_TTL_DAYS, env } from "./config";

export interface ScheduleInput {
  stage: "part1" | "tax";
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  spouseFirstName: string;
  married: boolean;
  items: PendingItem[];
  employerCounts: { her: number; spouse: number };
  /** The browser's submissionId (null for old clients -> no idempotency keys). */
  submissionId: string | null;
  now?: Date;
}

export type ScheduleResult =
  | { ok: true; reminderDay: Ymd; reminderId: string; followUpId: string; token: string; link: string }
  | { ok: false; reminderDay: Ymd; error: string };

export function uploadLink(token: string): string {
  return `${env.uploadBaseUrl()}/vip-upload.html?t=${token}`;
}

export async function scheduleReminders(resend: Resend, input: ScheduleInput): Promise<ScheduleResult> {
  const now = input.now ?? new Date();
  const schedule = reminderSchedule(input.items.map(i => i.remind), now);
  const fail = (error: string): ScheduleResult => {
    console.error(`[vip] reminders (${input.stage}) not scheduled:`, error);
    return { ok: false, reminderDay: schedule.reminderDay, error };
  };

  if (!input.items.length) return fail("no items");
  const secret = env.intakeSecret();
  if (!secret) return fail("VIP_INTAKE_SECRET missing");
  const horizon = now.getTime() + RESEND_MAX_SCHEDULE_DAYS * 24 * 3600 * 1000;
  if (schedule.followUpAt.getTime() > horizon) return fail("beyond the Resend scheduling horizon");

  const fullName = [input.firstName, input.lastName].filter(Boolean).join(" ");
  const tokenItems = input.items.map(({ id, label, kind, person, employer }) => ({ id, label, kind, person, employer }));

  // 1. Business follow-up, the day after the reminder.
  const followUp = renderFollowUp({
    fullName,
    phone: input.phone,
    email: input.email,
    itemLabels: businessItemLabels({ it: tokenItems, fn: input.firstName, sp: input.spouseFirstName }),
    reminderDayLabel: formatDayLabel(schedule.reminderDay),
    stage: input.stage,
  });
  const fu = await sendMail(
    resend,
    {
      from: FROM_SITE,
      to: BUSINESS_EMAIL,
      subject: followUp.subject,
      html: followUp.html,
      scheduledAt: schedule.followUpAt.toISOString(),
    },
    `follow-up ${input.stage}`,
    idemKey(input.submissionId, `${input.stage}-followup`),
  );
  if (!fu.ok) return fail(`follow-up: ${fu.error}`);

  // 2. Token with the follow-up id.
  const payload: TokenPayload = {
    v: 1,
    e: input.email,
    n: fullName,
    ph: input.phone,
    fn: input.firstName,
    ln: input.lastName,
    sp: input.spouseFirstName || "",
    m: input.married,
    it: tokenItems,
    fu: fu.id,
    st: input.stage,
    x: tokenExpiry(TOKEN_TTL_DAYS, now),
  };
  const token = signToken(payload, secret);
  const link = uploadLink(token);

  // 3. Client reminder.
  const reminder = renderClientReminder({
    firstName: input.firstName,
    lastName: input.lastName,
    spouseFirstName: input.spouseFirstName,
    items: tokenItems,
    link,
    employerCounts: input.employerCounts,
    stage: input.stage,
  });
  const rem = await sendMail(
    resend,
    {
      from: FROM_RIVKY,
      to: input.email,
      // matzavtzvira.co.il has no MX: replies must go to the Gmail inbox.
      replyTo: BUSINESS_EMAIL,
      subject: reminder.subject,
      html: reminder.html,
      text: reminder.text,
      scheduledAt: schedule.reminderAt.toISOString(),
    },
    `reminder ${input.stage}`,
    idemKey(input.submissionId, `${input.stage}-reminder`),
  );
  if (!rem.ok) {
    // No reminder -> the follow-up would claim one was sent. Take it back.
    await cancelMail(resend, fu.id, `follow-up ${input.stage} (reminder failed)`);
    return fail(`reminder: ${rem.error}`);
  }

  return { ok: true, reminderDay: schedule.reminderDay, reminderId: rem.id, followUpId: fu.id, token, link };
}

/**
 * Takes back a scheduled reminder + follow-up (used when the business email of the
 * same request failed and the request had no submissionId: the browser's retry would
 * otherwise schedule them a second time). With a submissionId they are kept - the
 * retry gets the same emails back from Resend.
 */
export async function cancelScheduled(resend: Resend, r: ScheduleResult, tag: string): Promise<void> {
  if (!r.ok) return;
  await cancelMail(resend, r.reminderId, `reminder ${tag} (rollback)`);
  await cancelMail(resend, r.followUpId, `follow-up ${tag} (rollback)`);
}
