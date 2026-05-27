import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, phone, email } = await req.json();

    if (!name || !phone || !email) {
      return NextResponse.json({ error: "חסרים שדות חובה" }, { status: 400 });
    }

    await resend.emails.send({
      from: "אתר מצב צבירה <noreply@matzavtzvira.co.il>",
      to: "matzavtzvira@gmail.com",
      subject: `פנייה חדשה - מצב צבירה VIP - ${name}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #F4F7FF; border-radius: 16px;">
          <h2 style="color: #060D3C; margin-bottom: 8px;">פנייה חדשה - מצב צבירה VIP</h2>
          <p style="color: #888; font-size: 14px; margin-bottom: 28px;">הגיעה מהדף הנחיתה</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #E8EDFF; color: #888; width: 35%;">שם</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #E8EDFF; font-weight: bold; color: #060D3C;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #E8EDFF; color: #888;">טלפון</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #E8EDFF; font-weight: bold; color: #124AF0;">
                <a href="tel:${phone}" style="color: #124AF0; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #888;">מייל</td>
              <td style="padding: 12px 0; font-weight: bold; color: #124AF0;">
                <a href="mailto:${email}" style="color: #124AF0; text-decoration: none;">${email}</a>
              </td>
            </tr>
          </table>

          <div style="margin-top: 28px; background: #124AF0; border-radius: 12px; padding: 16px 20px; text-align: center;">
            <p style="color: #21F0B0; font-weight: bold; margin: 0;">מחזור שלישי - לחזור תוך 24 שעות לשיחת היכרות</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("VIP contact error:", err);
    return NextResponse.json({ error: "שגיאת שרת" }, { status: 500 });
  }
}
