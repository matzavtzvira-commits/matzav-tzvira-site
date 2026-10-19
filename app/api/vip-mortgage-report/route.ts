import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// דוח יתרות משכנתא מטופסי הליד של VIP (/vip, /vip/waitlist, /vip/maastariot).
// נשלח בנפרד מהליד עצמו (/api/vip-contact) כדי שקובץ גדול לא יפיל את הפנייה
// (מגבלת 4.5MB לבקשה ב-Vercel).

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const formData = await req.formData();
    const name = ((formData.get("name") as string) || "").trim();
    const email = ((formData.get("email") as string) || "").trim();
    const phone = ((formData.get("phone") as string) || "").trim();
    const file = formData.get("mortgageReport") as File | null;

    if (!name || !file || typeof file === "string" || file.size === 0) {
      return NextResponse.json({ error: "חסרים שדות חובה" }, { status: 400 });
    }

    const html = `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;padding:32px;background:#F4F7FF;border-radius:16px;">
        <div style="background:#124AF0;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
          <h2 style="color:#fff;margin:0 0 4px;">דוח יתרות משכנתא - ${name}</h2>
          <p style="color:rgba(255,255,255,0.75);font-size:13px;margin:0;">הועלה מטופס הפנייה ל-VIP</p>
        </div>
        <div style="background:#fff;border-radius:10px;padding:18px 20px;">
          <p style="color:#292929;font-size:15px;margin:0 0 8px;">✓ הדוח מצורף למייל</p>
          <p style="color:#555;font-size:14px;margin:0;">שייך למייל הפנייה של ${name}${phone ? ` · <a href="tel:${phone}" style="color:#124AF0;">${phone}</a>` : ""}${email ? ` · <a href="mailto:${email}" style="color:#124AF0;">${email}</a>` : ""}</p>
        </div>
      </div>`;

    const { error: sendError } = await resend.emails.send({
      from: "אתר מצב צבירה <noreply@matzavtzvira.co.il>",
      to: "matzavtzvira@gmail.com",
      subject: `דוח יתרות משכנתא - ${name}`,
      html,
      attachments: [{ filename: `mortgage-report-${name}-${file.name}`, content: Buffer.from(await file.arrayBuffer()) }],
    });
    if (sendError) {
      console.error("VIP mortgage report email failed:", sendError);
      return NextResponse.json({ error: "שליחת המייל נכשלה" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("VIP mortgage report error:", err);
    return NextResponse.json({ error: "שגיאת שרת" }, { status: 500 });
  }
}
