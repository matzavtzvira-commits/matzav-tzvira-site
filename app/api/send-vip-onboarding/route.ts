import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://matzavtzvira.co.il";
const FORM_URL = `${SITE_URL}/vip-onboarding.html`;

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { name, email, phone } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "חסרים שדות חובה" }, { status: 400 });
    }

    const firstName = name.split(" ")[0];

    await resend.emails.send({
      from: "רבקי - מצב צבירה <onboarding@resend.dev>",
      to: email,
      subject: "השלב הבא - טופס קבלת מידע VIP",
      html: `
        <div dir="rtl" style="font-family:Arial,sans-serif;max-width:580px;margin:0 auto;padding:0;background:#ffffff;">

          <!-- Header -->
          <div style="background:linear-gradient(135deg,#124AF0 0%,#060D3C 100%);padding:36px 32px;border-radius:0 0 0 0;text-align:center;">
            <p style="color:#21F0B0;font-size:13px;font-weight:700;letter-spacing:2px;margin:0 0 8px;text-transform:uppercase;">מצב צבירה</p>
            <h1 style="color:#ffffff;font-size:24px;font-weight:900;margin:0;line-height:1.4;">ברוכה הבאה לתהליך VIP</h1>
          </div>

          <!-- Body -->
          <div style="padding:36px 32px;">

            <p style="font-size:16px;color:#292929;line-height:1.8;margin:0 0 20px;">
              ${firstName} שלום,
            </p>
            <p style="font-size:16px;color:#292929;line-height:1.8;margin:0 0 20px;">
              שמחה לקבל אותך לתהליך!
            </p>
            <p style="font-size:15px;color:#555;line-height:1.8;margin:0 0 28px;">
              כדי שנוכל להתחיל לעבוד על התיק שלך ולהגיע מוכנות לפגישה הראשונה -
              אני צריכה כמה פרטים.
              <br/>
              זה לוקח כ-5 דקות, ואפשר לעשות את זה עם כוס קפה.
            </p>

            <!-- CTA Button -->
            <div style="text-align:center;margin:32px 0;">
              <a href="${FORM_URL}"
                 style="display:inline-block;background:#124AF0;color:#ffffff;font-size:17px;font-weight:800;padding:16px 40px;border-radius:14px;text-decoration:none;">
                למילוי הטופס &larr;
              </a>
            </div>

            <!-- Note -->
            <div style="background:#F4F7FF;border-radius:12px;padding:18px 20px;margin:28px 0;">
              <p style="margin:0;font-size:14px;color:#555;line-height:1.7;">
                <strong style="color:#292929;">שימי לב:</strong>
                בטופס תתבקשי להעלות צילום ת"ז שלך ושל בעלך -
                הם נדרשים לבדיקת התיק.
                <br/>
                אם אין לך אחד מהם בהישג יד, זה בסדר - תמלאי מה שיש ואצור איתך קשר.
              </p>
            </div>

            <p style="font-size:15px;color:#555;line-height:1.8;margin:24px 0 0;">
              לכל שאלה - תכתבי לי בחזרה למייל הזה.
            </p>

            <p style="font-size:16px;color:#292929;font-weight:700;margin:24px 0 0;">
              בעזרת השם,<br/>
              רבקי
            </p>
          </div>

          <!-- Footer -->
          <div style="background:#F4F7FF;padding:20px 32px;border-top:1px solid #E8EDFF;text-align:center;">
            <p style="font-size:12px;color:#aaa;margin:0;line-height:1.6;">
              מצב צבירה | matzavtzvira.co.il
              <br/>
              ${phone ? `טלפון: ${phone}` : ""}
            </p>
          </div>

        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Send VIP onboarding error:", err);
    return NextResponse.json({ error: "שגיאת שרת" }, { status: 500 });
  }
}
