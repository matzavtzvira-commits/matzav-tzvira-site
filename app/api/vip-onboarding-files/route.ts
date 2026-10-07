import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// קבצי טופס קבלת המידע VIP (ת"ז, ת"ז בעל, דוח משכנתא) - נשלחים בנפרד מהתשובות
// כדי שקובץ גדול לא יפיל את כל הטופס (מגבלת 4.5MB לבקשה ב-Vercel).
// כשהלקוחה ממשיכה בלי קבצים שנתקעו, מגיע לכאן שדה missing במקום קבצים
// ורבקי מקבלת מייל "חסרים קבצים".

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://matzavtzvira.co.il",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const FILE_FIELDS: { id: string; label: string; prefix: string }[] = [
  { id: "tzFile", label: 'צילום ת"ז', prefix: "tz" },
  { id: "spouseTzFile", label: 'צילום ת"ז של הבעל', prefix: "tz-spouse" },
  { id: "mortgageReportFile", label: "דוח יתרת משכנתא", prefix: "mortgage-report" },
];

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const formData = await req.formData();
    const name = ((formData.get("name") as string) || "").trim();
    const email = ((formData.get("email") as string) || "").trim();
    const phone = ((formData.get("phone") as string) || "").trim();
    const missing = ((formData.get("missing") as string) || "").trim();

    if (!name || !email) {
      return NextResponse.json({ error: "חסרים שדות חובה" }, { status: 400, headers: CORS_HEADERS });
    }

    const attachments: { filename: string; content: Buffer }[] = [];
    const labels: string[] = [];
    for (const f of FILE_FIELDS) {
      const file = formData.get(f.id) as File | null;
      if (file && typeof file !== "string" && file.size > 0) {
        attachments.push({
          filename: `${f.prefix}-${name}-${file.name}`,
          content: Buffer.from(await file.arrayBuffer()),
        });
        labels.push(f.label);
      }
    }

    if (!attachments.length && !missing) {
      return NextResponse.json({ error: "לא התקבלו קבצים" }, { status: 400, headers: CORS_HEADERS });
    }

    const date = new Date().toLocaleDateString("he-IL", {
      timeZone: "Asia/Jerusalem", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
    });

    const isMissing = !attachments.length;
    const subject = isMissing ? `⚠️ חסרים קבצים - ${name}` : `קבצי VIP - ${name}`;
    const body = isMissing
      ? `<p style="color:#991B1B;font-size:15px;font-weight:bold;margin:0 0 10px;">הלקוחה מילאה את הטופס, אבל הקבצים האלה לא עברו והיא בחרה להמשיך בלעדיהם:</p>
         <p style="color:#292929;font-size:15px;margin:0 0 14px;">${missing}</p>
         <p style="color:#555;font-size:14px;margin:0;">צריך לבקש ממנה אותם.${phone ? ` טלפון: <a href="tel:${phone}" style="color:#124AF0;">${phone}</a>` : ""} · מייל: <a href="mailto:${email}" style="color:#124AF0;">${email}</a></p>`
      : `<p style="color:#292929;font-size:15px;margin:0 0 8px;">✓ מצורפים: ${labels.join(", ")}</p>
         <p style="color:#555;font-size:14px;margin:0;">שייך למייל "לקוחת VIP חדשה - ${name}" · ${email}</p>`;

    const html = `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;padding:32px;background:#F4F7FF;border-radius:16px;">
        <div style="background:${isMissing ? "#991B1B" : "#124AF0"};border-radius:12px;padding:20px 24px;margin-bottom:20px;">
          <h2 style="color:#fff;margin:0 0 4px;">${isMissing ? "חסרים קבצים בטופס VIP" : "קבצים מטופס קבלת מידע VIP"}</h2>
          <p style="color:rgba(255,255,255,0.75);font-size:13px;margin:0;">${name} · ${date}</p>
        </div>
        <div style="background:#fff;border-radius:10px;padding:18px 20px;">${body}</div>
        <p style="color:#aaa;font-size:12px;margin-top:20px;text-align:center;">נשלח מטופס קבלת מידע VIP - matzavtzvira.co.il</p>
      </div>`;

    const { error: sendError } = await resend.emails.send({
      from: "אתר מצב צבירה <noreply@matzavtzvira.co.il>",
      to: "matzavtzvira@gmail.com",
      subject,
      html,
      ...(attachments.length ? { attachments } : {}),
    });
    if (sendError) {
      console.error("VIP onboarding files email failed:", sendError);
      return NextResponse.json({ error: "שליחת המייל נכשלה" }, { status: 502, headers: CORS_HEADERS });
    }

    return NextResponse.json({ ok: true }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error("VIP onboarding files error:", err);
    return NextResponse.json({ error: "שגיאת שרת" }, { status: 500, headers: CORS_HEADERS });
  }
}
