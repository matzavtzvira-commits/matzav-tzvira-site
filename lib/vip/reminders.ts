// Reminders without a database: Resend scheduled sends + a signed link token.
//
// One reminder day (target is not Shabbat / chag):
//   follow-up (id fu) -> token {.., fu} -> reminder.
// Two reminder days (target is a rest day: the day before it and the day after it):
//   follow-up (id fu) -> token2 {.., fu} -> AFTER reminder (id r2)
//   -> token1 {.., fu, rm: [r2]} -> BEFORE reminder.
// Whichever link she uses, a complete upload cancels the follow-up and the reminders
// still pending (rm). Every send carries an idempotency key derived from the browser's
// submissionId, and every payload depends only on the request + the Israel date (token
// expiry included), so a retried request is byte-identical and Resend returns the
// original emails.
import type { Resend } from "resend";
import type { TokenPayload } from "./types";
import type { PendingItem } from "./pending";
import { businessItemLabels } from "./pending";
import { reminderSchedule, formatReminderDays, tokenExpiry, type Ymd } from "./dates";
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
  | {
      ok: true;
      /** 1 or 2 days, chronological */
      reminderDays: Ymd[];
      /** ids of the scheduled reminders ("" when Resend answered "already sent") */
      reminderIds: string[];
      followUpId: string;
      /** the link in the last (AFTER / only) reminder */
      link: string;
    }
  | { ok: false; reminderDays: Ymd[]; error: string };

export function uploadLink(token: string): string {
  return `${env.uploadBaseUrl()}/vip-upload.html?t=${token}`;
}

/** "יום שלישי 10.11" or "יום שישי 13.11 ושוב ביום ראשון 15.11" (for "ב..." sentences). */
export function scheduledLabel(r: ScheduleResult): string {
  return formatReminderDays(r.reminderDays);
}

export async function scheduleReminders(resend: Resend, input: ScheduleInput): Promise<ScheduleResult> {
  const now = input.now ?? new Date();
  const schedule = reminderSchedule(input.items.map(i => i.remind), now);
  const days = schedule.reminderDays;
  const fail = (error: string): ScheduleResult => {
    console.error(`[vip] reminders (${input.stage}) not scheduled:`, error);
    return { ok: false, reminderDays: days, error };
  };

  if (!input.items.length) return fail("no items");
  const secret = env.intakeSecret();
  if (!secret) return fail("VIP_INTAKE_SECRET missing");
  const horizon = now.getTime() + RESEND_MAX_SCHEDULE_DAYS * 24 * 3600 * 1000;
  if (schedule.followUpAt.getTime() > horizon) return fail("beyond the Resend scheduling horizon");

  const fullName = [input.firstName, input.lastName].filter(Boolean).join(" ");
  const tokenItems = input.items.map(({ id, label, kind, person, employer }) => ({ id, label, kind, person, employer }));

  // 1. Business follow-up: first non-rest day after the last reminder.
  const followUp = renderFollowUp({
    fullName,
    phone: input.phone,
    email: input.email,
    itemLabels: businessItemLabels({ it: tokenItems, fn: input.firstName, sp: input.spouseFirstName }),
    reminderDayLabel: formatReminderDays(days),
    stage: input.stage,
  });
  const fu = await sendMail(
    resend,
    { from: FROM_SITE, to: BUSINESS_EMAIL, subject: followUp.subject, html: followUp.html, scheduledAt: schedule.followUpAt.toISOString() },
    `follow-up ${input.stage}`,
    idemKey(input.submissionId, `${input.stage}-followup`),
  );
  if (!fu.ok) return fail(`follow-up: ${fu.error}`);

  const basePayload: TokenPayload = {
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

  const sendReminder = async (payload: TokenPayload, at: Date, kind: string) => {
    const link = uploadLink(signToken(payload, secret));
    const reminder = renderClientReminder({
      firstName: input.firstName,
      lastName: input.lastName,
      spouseFirstName: input.spouseFirstName,
      items: tokenItems,
      link,
      employerCounts: input.employerCounts,
      stage: input.stage,
    });
    const res = await sendMail(
      resend,
      {
        from: FROM_RIVKY,
        to: input.email,
        // matzavtzvira.co.il has no MX: replies must go to the Gmail inbox.
        replyTo: BUSINESS_EMAIL,
        subject: reminder.subject,
        html: reminder.html,
        text: reminder.text,
        scheduledAt: at.toISOString(),
      },
      `${kind} ${input.stage}`,
      idemKey(input.submissionId, `${input.stage}-${kind}`),
    );
    return { res, link };
  };

  // 2. The last reminder (the only one, or the one after the rest day): token {.., fu}.
  const last = await sendReminder(basePayload, schedule.reminderAts[days.length - 1], "reminder");
  if (!last.res.ok) {
    // No reminder -> the follow-up would claim one was sent. Take it back.
    await cancelMail(resend, fu.id, `follow-up ${input.stage} (reminder failed)`);
    return fail(`reminder: ${last.res.error}`);
  }
  const lastId = last.res.id;

  // 3. Two days: the reminder before the rest day, its token also cancels the later one.
  if (days.length === 2) {
    const first = await sendReminder(
      { ...basePayload, ...(lastId ? { rm: [lastId] } : {}) },
      schedule.reminderAts[0],
      "reminder2",
    );
    if (!first.res.ok) {
      await cancelMail(resend, lastId, `reminder ${input.stage} (rollback)`);
      await cancelMail(resend, fu.id, `follow-up ${input.stage} (reminder failed)`);
      return fail(`reminder (before the rest day): ${first.res.error}`);
    }
    return { ok: true, reminderDays: days, reminderIds: [first.res.id, lastId], followUpId: fu.id, link: last.link };
  }

  return { ok: true, reminderDays: days, reminderIds: [lastId], followUpId: fu.id, link: last.link };
}

/**
 * Takes back the scheduled reminder(s) + follow-up (used when the business email of the
 * same request failed and the request had no submissionId: the browser's retry would
 * otherwise schedule them a second time). With a submissionId they are kept - the
 * retry gets the same emails back from Resend.
 */
export async function cancelScheduled(resend: Resend, r: ScheduleResult, tag: string): Promise<void> {
  if (!r.ok) return;
  for (const id of r.reminderIds) await cancelMail(resend, id, `reminder ${tag} (rollback)`);
  await cancelMail(resend, r.followUpId, `follow-up ${tag} (rollback)`);
}
