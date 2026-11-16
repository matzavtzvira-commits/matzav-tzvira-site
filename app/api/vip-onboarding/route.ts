import { NextRequest, NextResponse } from "next/server";
import { BUSINESS_EMAIL, CORS_HEADERS, FROM_SITE } from "@/lib/vip/config";
import { createResend, idemKey, requestId, sendMail } from "@/lib/vip/mail";
import { fullName, isValidEmail, normalizeAnswers, strArr } from "@/lib/vip/normalize";
import { part1Sections, finalSections, sectionsToText } from "@/lib/vip/answers-view";
import { renderFinalEmail, renderPart1Email } from "@/lib/vip/render-business";
import { ogenFilesPointer, ogenSubject, renderOgenEmail, renderOgenNotice } from "@/lib/vip/render-ogen";
import { createOgenDraft, gmailDraftConfigured } from "@/lib/vip/gmail-draft";
import { businessItemLabel, employerCounts, part1PendingItems } from "@/lib/vip/pending";
import { cancelScheduled, scheduleReminders, scheduledLabel, type ScheduleResult } from "@/lib/vip/reminders";
import { callDay, formatDayLabel } from "@/lib/vip/dates";
import { syncOnboardingText } from "@/lib/vip/dashboard";
import { OGEN_LABEL_PREFIXES, fetchOgenFiles } from "@/lib/vip/files";
import type { ReminderStatus } from "@/lib/vip/reminder-status";
import type { Answers } from "@/lib/vip/types";

// VIP onboarding form v2 answers (JSON).
// stage "part1" (after page 3): dashboard text (tells whether she is known there) ->
//   reminders for "send later" items (only when she is known) -> business email with the
//   real outcome -> Gmail draft to Ogen (fallback: forward-ready Ogen email) + notification.
// stage "final" (after page 6): business email with all answers + dashboard text.
// Files travel separately through /api/vip-onboarding-files.
// Every send carries an idempotency key from the browser's submissionId.
export const maxDuration = 60;

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: CORS_HEADERS });

/** Dashboard text tail: what will come later and which files did not get through. */
function pendingAndMissingText(answers: Answers, missingFiles: string[]): string {
  const names = { fn: answers.her.firstName, sp: answers.spouse?.firstName || "" };
  const pending = part1PendingItems(answers).map(i => businessItemLabel(i, names));
  return (
    (pending.length ? `\n\n== יגיע בהמשך ==\n${pending.join("\n")}` : "") +
    (missingFiles.length ? `\n\n== קבצים שלא עברו ==\n${missingFiles.join("\n")}` : "")
  );
}

export async function POST(req: NextRequest) {
  try {
    let body: { stage?: unknown; answers?: unknown; missingFiles?: unknown; submissionId?: unknown };
    try {
      body = await req.json();
    } catch {
      return json({ error: "בקשה לא תקינה" }, 400);
    }
    if (!body || typeof body !== "object") return json({ error: "בקשה לא תקינה" }, 400);

    const stage = body.stage === "final" ? "final" : body.stage === "part1" ? "part1" : null;
    if (!stage) return json({ error: "שלב לא תקין" }, 400);

    const answers = normalizeAnswers(body.answers);
    const { her } = answers;
    if (!her.firstName || !her.lastName || !her.phone || !her.email || !isValidEmail(her.email)) {
      return json({ error: "חסרים שדות חובה" }, 400);
    }

    const resend = createResend();
    const sid = requestId(body.submissionId);
    const key = (kind: string) => idemKey(sid, `${stage}-${kind}`);
    const name = fullName(her.firstName, her.lastName);
    const client = { email: her.email, phone: her.phone };
    const missingFiles = strArr(body.missingFiles, 40, 200);

    if (stage === "final") {
      const mail = renderFinalEmail(answers, missingFiles);
      const sent = await sendMail(resend, { from: FROM_SITE, to: BUSINESS_EMAIL, subject: mail.subject, html: mail.html }, "final", key("business"));
      if (!sent.ok) return json({ error: "שליחת המייל נכשלה" }, 502);
      // Overwrites the part1 text, so the pending / missing lines are added again.
      await syncOnboardingText(
        client,
        sectionsToText([...finalSections(answers), ...part1Sections(answers, missingFiles)]) + pendingAndMissingText(answers, missingFiles),
      );
      return json({ ok: true });
    }

    // ---- part1 ----
    const pending = part1PendingItems(answers);
    const names = { fn: her.firstName, sp: answers.spouse?.firstName || "" };
    const pendingLabels = pending.map(i => businessItemLabel(i, names));
    const ogenFilesP = fetchOgenFiles(client); // independent, runs alongside

    // 1. Dashboard text. Its `matched` decides whether reminders are scheduled.
    const sync = await syncOnboardingText(client, sectionsToText(part1Sections(answers, missingFiles)) + pendingAndMissingText(answers, missingFiles));

    // 2. Reminder + follow-up, only for a client the dashboard knows.
    let reminder: ReminderStatus = { kind: "none" };
    let scheduled: ScheduleResult | null = null;
    if (pending.length) {
      if (sync.ok && !sync.matched) reminder = { kind: "nomatch" };
      else if (!sync.ok) reminder = { kind: "error" };
      else {
        try {
          scheduled = await scheduleReminders(resend, {
            stage: "part1",
            email: her.email,
            phone: her.phone,
            firstName: her.firstName,
            lastName: her.lastName,
            spouseFirstName: answers.spouse?.firstName || "",
            married: !!answers.spouse,
            items: pending,
            employerCounts: employerCounts(answers),
            submissionId: sid,
          });
          reminder = scheduled.ok ? { kind: "scheduled", dayLabel: scheduledLabel(scheduled) } : { kind: "error" };
        } catch (e) {
          console.error("[vip] part1 reminders failed:", e);
          reminder = { kind: "error" };
        }
      }
    }

    // 3. Business email with the real outcome - the only step that must succeed.
    const mail = renderPart1Email({ answers, missingFiles, pendingItems: pendingLabels, reminder });
    const sent = await sendMail(resend, { from: FROM_SITE, to: BUSINESS_EMAIL, subject: mail.subject, html: mail.html }, "part1", key("business"));
    if (!sent.ok) {
      // Without a submissionId the browser's retry would schedule the reminder again.
      if (!sid && scheduled) await cancelScheduled(resend, scheduled, "part1");
      await ogenFilesP.catch(() => null);
      return json({ error: "שליחת המייל נכשלה" }, 502);
    }

    // From here on everything is best-effort (logged, never fails the request).
    // 4a. A Gmail draft to Ogen in the business account. When it cannot be created,
    //     the forward-ready Ogen email; if that fails, once more without attachments.
    let ogenOutcome: "draft" | "email" | "failed" = "failed";
    let filesPointer = "";
    try {
      const ogenFiles = await ogenFilesP;
      if (gmailDraftConfigured()) {
        const draftMail = renderOgenEmail({ answers, missingFiles, attachedNames: ogenFiles.attachedNames, forDraft: true });
        const draft = await createOgenDraft({
          subject: draftMail.subject,
          html: draftMail.html,
          attachments: ogenFiles.attachments,
          submissionId: sid,
        });
        if (draft.ok) {
          ogenOutcome = "draft";
          filesPointer = ogenFilesPointer(answers, missingFiles, ogenFiles.attachedNames);
        }
      }
    } catch (e) {
      console.error("[vip] ogen draft failed:", e);
    }
    if (ogenOutcome !== "draft") {
      try {
        const ogenFiles = await ogenFilesP;
        const ogen = renderOgenEmail({ answers, missingFiles, attachedNames: ogenFiles.attachedNames });
        const first = await sendMail(
          resend,
          {
            from: FROM_SITE,
            to: BUSINESS_EMAIL,
            subject: `מייל לעוגן - ${name}`,
            html: ogen.html,
            ...(ogenFiles.attachments.length ? { attachments: ogenFiles.attachments } : {}),
          },
          "ogen email",
          key("ogen"),
        );
        if (first.ok) ogenOutcome = "email";
        else {
          const bare = renderOgenEmail({ answers, missingFiles, attachedNames: [] });
          const second = await sendMail(
            resend,
            { from: FROM_SITE, to: BUSINESS_EMAIL, subject: `מייל לעוגן - ${name}`, html: bare.html },
            "ogen email (no attachments)",
            key("ogen-noatt"),
          );
          if (second.ok) ogenOutcome = "email";
        }
      } catch (e) {
        console.error("[vip] ogen email failed:", e);
      }
    }

    // 4b. Notification: the draft is waiting (or forward instructions / the Ogen failure) + call reminder.
    try {
      const notice = renderOgenNotice({
        fullName: name,
        phone: her.phone,
        pendingOgenItems: pending.filter(i => i.kind === "payslip").map(i => businessItemLabel(i, names)),
        reminder,
        ogen: ogenOutcome,
        filesPointer,
        missingFiles: missingFiles.filter(m => OGEN_LABEL_PREFIXES.some(p => m.startsWith(p))),
        callDayLabel: formatDayLabel(callDay()),
        ogenSubject: ogenSubject(answers),
      });
      await sendMail(resend, { from: FROM_SITE, to: BUSINESS_EMAIL, subject: notice.subject, html: notice.html }, "ogen notice", key("notice"));
    } catch (e) {
      console.error("[vip] ogen notice failed:", e);
    }

    return json({ ok: true });
  } catch (err) {
    console.error("VIP onboarding error:", err);
    return json({ error: "שגיאת שרת" }, 500);
  }
}
