import { NextRequest, NextResponse } from "next/server";
import { forwardFilesToDashboard } from "@/lib/dashboard-files";
import { BUSINESS_EMAIL, CORS_HEADERS, FROM_SITE } from "@/lib/vip/config";
import { FileRequestError, filesToAttachments, readFormFiles } from "@/lib/vip/files";
import { createResend, idemKey, requestId, sendMail } from "@/lib/vip/mail";
import { renderFilesEmail } from "@/lib/vip/render-business";
import { str } from "@/lib/vip/normalize";

// Files of the VIP onboarding form (part 1: IDs, ספח, birth certificate, mortgage
// report, payslips; tax: the tax-refund documents). The browser sends them in
// batches (each request <= 4.5MB, Vercel's cap): name, email, phone, stage and per
// file `file_<fileId>` + `label_<fileId>`. One email per request with everything
// attached, and every file is copied into her dashboard client file. The browser sends
// a batchId per batch: the email carries an idempotency key from it, so a retried batch
// is not emailed twice. Only photos and PDFs are accepted (415 otherwise).
export const maxDuration = 60;

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  try {
    const resend = createResend();
    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400, headers: CORS_HEADERS });
    }
    const name = str(form.get("name"), 160);
    const email = str(form.get("email"), 200);
    const phone = str(form.get("phone"), 40);
    const stage = str(form.get("stage")) === "tax" ? "tax" : "part1";

    if (!name || !email) {
      return NextResponse.json({ error: "חסרים שדות חובה" }, { status: 400, headers: CORS_HEADERS });
    }

    let files;
    try {
      files = await readFormFiles(form, fileId => str(form.get(`label_${fileId}`), 500) || "");
    } catch (e) {
      if (e instanceof FileRequestError) {
        return NextResponse.json({ error: e.message }, { status: e.status, headers: CORS_HEADERS });
      }
      throw e;
    }
    if (!files.length) {
      return NextResponse.json({ error: "לא התקבלו קבצים" }, { status: 400, headers: CORS_HEADERS });
    }

    const { attachments, names } = filesToAttachments(files);
    const mail = renderFilesEmail({ stage, name, email, phone, attachedNames: names });
    const sent = await sendMail(
      resend,
      { from: FROM_SITE, to: BUSINESS_EMAIL, subject: mail.subject, html: mail.html, attachments },
      `files ${stage}`,
      idemKey(requestId(form.get("batchId")), "files"),
    );

    if (!sent.ok) {
      // Not forwarded either: the browser retries this batch, and forwarding now
      // would store the same file twice in the dashboard.
      return NextResponse.json({ error: "שליחת המייל נכשלה" }, { status: 502, headers: CORS_HEADERS });
    }

    await forwardFilesToDashboard(
      { email, phone },
      files.map(f => ({ label: f.label, filename: f.originalName, content: f.content, contentType: f.contentType })),
    );
    return NextResponse.json({ ok: true }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error("VIP onboarding files error:", err);
    return NextResponse.json({ error: "שגיאת שרת" }, { status: 500, headers: CORS_HEADERS });
  }
}
