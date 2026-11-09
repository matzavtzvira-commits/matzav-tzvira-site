import { NextRequest, NextResponse } from "next/server";
import { forwardFilesToDashboard } from "@/lib/dashboard-files";
import { BUSINESS_EMAIL, CORS_HEADERS, FROM_SITE, env } from "@/lib/vip/config";
import { FileRequestError, filesToAttachments, readFormFiles } from "@/lib/vip/files";
import { cancelMail, createResend, idemKey, requestId, sendMail } from "@/lib/vip/mail";
import { renderPendingUploadEmail } from "@/lib/vip/render-business";
import { businessItemLabel } from "@/lib/vip/pending";
import { verifyToken } from "@/lib/vip/token";
import { str } from "@/lib/vip/normalize";
import type { TokenItem } from "@/lib/vip/types";

// Upload page for items the client marked "אשלח בהמשך" (public/vip-upload.html,
// linked from the reminder email). multipart: t (signed token), per item
// file_<itemId>[_N] and/or hp_<itemId> (payslips), complete=1 + received=<ids> on
// the last batch, batchId (idempotency key of the email). check=1 only validates the
// token (page load). Only photos and PDFs are accepted (415 otherwise).
export const maxDuration = 60;

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: CORS_HEADERS });

function parseIdList(values: FormDataEntryValue[]): string[] {
  const out: string[] = [];
  for (const v of values) {
    if (typeof v !== "string") continue;
    const s = v.trim();
    if (!s) continue;
    if (s.startsWith("[")) {
      try {
        const arr = JSON.parse(s);
        if (Array.isArray(arr)) arr.forEach(x => typeof x === "string" && out.push(x));
        continue;
      } catch {
        /* fall through to comma list */
      }
    }
    out.push(...s.split(",").map(x => x.trim()).filter(Boolean));
  }
  return out;
}

export async function POST(req: NextRequest) {
  try {
    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return json({ ok: false, error: "בקשה לא תקינה" }, 400);
    }

    const secret = env.intakeSecret();
    if (!secret) return json({ ok: false, error: "not configured" }, 503);

    const v = verifyToken(str(form.get("t"), 8000), secret);
    if (!v.ok) return json({ ok: false, error: v.reason, expired: v.reason === "expired" }, 401);
    const payload = v.payload;

    if (str(form.get("check")) === "1") return json({ ok: true, items: payload.it.map(i => i.id) });

    const byId = new Map<string, TokenItem>(payload.it.map(i => [i.id, i]));
    const itemFor = (fileId: string): TokenItem | null =>
      byId.get(fileId) ?? byId.get(fileId.replace(/_\d+$/, "")) ?? null;

    let files;
    try {
      files = await readFormFiles(form, fileId => itemFor(fileId)?.label ?? null);
    } catch (e) {
      if (e instanceof FileRequestError) return json({ ok: false, error: e.message }, e.status);
      throw e;
    }

    // Typed ח"פ values (payslip items only).
    const hpValues: Array<{ item: TokenItem; hp: string }> = [];
    for (const [key, value] of form.entries()) {
      if (!key.startsWith("hp_") || typeof value !== "string" || !value.trim()) continue;
      const item = byId.get(key.slice(3));
      if (!item || item.kind !== "payslip") return json({ ok: false, error: `פריט לא צפוי: ${key.slice(3)}` }, 400);
      const hp = value.trim().slice(0, 30);
      if (!/^\d{5,12}$/.test(hp.replace(/[\s-]/g, ""))) return json({ ok: false, error: 'מספר ח"פ לא תקין' }, 400);
      hpValues.push({ item, hp });
    }

    const received = new Set<string>();
    for (const f of files) received.add(itemFor(f.fileId)!.id);
    for (const h of hpValues) received.add(h.item.id);
    if (!received.size) return json({ ok: false, error: "לא התקבלו קבצים" }, 400);

    const all = new Set([...parseIdList(form.getAll("received")), ...received]);
    const complete = str(form.get("complete")) === "1" && payload.it.every(i => all.has(i.id));

    const resend = createResend();
    const { attachments, names } = filesToAttachments(files);
    const receivedLabels = payload.it
      .filter(i => received.has(i.id))
      .map(i => businessItemLabel(i, payload));
    const mail = renderPendingUploadEmail({
      payload,
      receivedLabels,
      attachedNames: names,
      hpValues: hpValues.map(h => ({ label: businessItemLabel(h.item, payload), hp: h.hp })),
      complete,
    });
    const sent = await sendMail(
      resend,
      {
        from: FROM_SITE,
        to: BUSINESS_EMAIL,
        subject: mail.subject,
        html: mail.html,
        ...(attachments.length ? { attachments } : {}),
      },
      "pending upload",
      idemKey(requestId(form.get("batchId")), "pending-upload"),
    );
    // Forward only after the email went out, so a browser retry can't store a file twice.
    if (!sent.ok) return json({ ok: false, error: "שליחת המייל נכשלה" }, 502);
    await forwardFilesToDashboard(
      { email: payload.e, phone: payload.ph },
      files.map(f => ({ label: f.label, filename: f.originalName, content: f.content, contentType: f.contentType })),
    );

    if (complete && payload.fu) await cancelMail(resend, payload.fu, "follow-up (all received)");

    return json({ ok: true, received: [...received], complete });
  } catch (err) {
    console.error("VIP pending upload error:", err);
    return json({ ok: false, error: "שגיאת שרת" }, 500);
  }
}
