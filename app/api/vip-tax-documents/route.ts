import { NextRequest, NextResponse } from "next/server";
import { BUSINESS_EMAIL, CORS_HEADERS, FROM_SITE } from "@/lib/vip/config";
import { createResend, idemKey, requestId, sendMail } from "@/lib/vip/mail";
import { isMarried, isValidEmail, normalizeTaxRequest } from "@/lib/vip/normalize";
import { renderTaxEmail } from "@/lib/vip/render-business";
import { canonicalTaxDocs, employerCountsFromItems, taxPendingItems } from "@/lib/vip/pending";
import { cancelScheduled, scheduleReminders, scheduledLabel, type ScheduleResult } from "@/lib/vip/reminders";
import { lookupClient } from "@/lib/vip/dashboard";
import type { ReminderStatus } from "@/lib/vip/reminder-status";

// Page 7 of the VIP onboarding form (JSON). The documents themselves were already
// sent through /api/vip-onboarding-files (stage "tax"). Docs marked "אשלח בהמשך" get a
// client reminder (tomorrow 09:00) + a business follow-up - only when the dashboard
// knows her. Doc keys are mapped to the 13 known documents; the browser's labels are
// never used. Every send carries an idempotency key from the submissionId.
export const maxDuration = 60;

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: CORS_HEADERS });

export async function POST(req: NextRequest) {
  try {
    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return json({ error: "בקשה לא תקינה" }, 400);
    }
    const parsed = normalizeTaxRequest(raw);
    if (!parsed.name || !parsed.email || !isValidEmail(parsed.email)) return json({ error: "חסרים שדות חובה" }, 400);
    const t = { ...parsed, docs: canonicalTaxDocs(parsed.docs) };

    const resend = createResend();
    const sid = requestId((raw as { submissionId?: unknown } | null)?.submissionId);
    const pending = t.wantTax === "כן" ? taxPendingItems(t.docs) : [];

    // 1. Reminder + follow-up for "later" docs, only for a client the dashboard knows.
    let reminder: ReminderStatus = { kind: "none" };
    let scheduled: ScheduleResult | null = null;
    if (pending.length) {
      const known = await lookupClient({ email: t.email, phone: t.phone });
      if (known.ok && !known.matched) reminder = { kind: "nomatch" };
      else if (!known.ok) reminder = { kind: "error" };
      else {
        try {
          scheduled = await scheduleReminders(resend, {
            stage: "tax",
            email: t.email,
            phone: t.phone,
            firstName: t.firstName || t.name.split(" ")[0] || "",
            lastName: t.lastName || t.name.split(" ").slice(1).join(" "),
            spouseFirstName: t.spouseFirstName,
            married: isMarried(t.maritalStatus),
            items: pending,
            employerCounts: employerCountsFromItems(pending),
            submissionId: sid,
          });
          reminder = scheduled.ok ? { kind: "scheduled", dayLabel: scheduledLabel(scheduled) } : { kind: "error" };
        } catch (e) {
          console.error("[vip] tax reminders failed:", e);
          reminder = { kind: "error" };
        }
      }
    }

    // 2. Business email with the real outcome.
    const mail = renderTaxEmail(t, reminder);
    const sent = await sendMail(
      resend,
      { from: FROM_SITE, to: BUSINESS_EMAIL, subject: mail.subject, html: mail.html },
      "tax",
      idemKey(sid, "tax-business"),
    );
    if (!sent.ok) {
      if (!sid && scheduled) await cancelScheduled(resend, scheduled, "tax");
      return json({ error: "שליחת המייל נכשלה" }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error("Tax docs error:", err);
    return json({ error: "שגיאת שרת" }, 500);
  }
}
