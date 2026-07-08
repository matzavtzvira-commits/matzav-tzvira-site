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
      from: "רבקי - מצב צבירה <rivky@matzavtzvira.co.il>",
      to: email,
      subject: "השלב הבא - טופס קבלת מידע VIP",
      html: `<!DOCTYPE html><html dir="rtl"><head><meta charset="UTF-8"/></head><body>
        <div style="font-family:Arial,sans-serif;max-width:580px;margin:0 auto;padding:0;background:#ffffff;direction:rtl;unicode-bidi:embed;">

          <!-- Header -->
          <div style="background:linear-gradient(135deg,#124AF0 0%,#060D3C 100%);padding:36px 32px;border-radius:0 0 0 0;text-align:center;">
            <p style="color:#21F0B0;font-size:13px;font-weight:700;letter-spacing:2px;margin:0 0 8px;text-transform:uppercase;">מצב צבירה</p>
            <h1 style="color:#ffffff;font-size:24px;font-weight:900;margin:0;line-height:1.4;">ברוכה הבאה לתהליך VIP</h1>
          </div>

          <!-- Body -->
          <div style="padding:36px 32px;">

            <p style="font-size:16px;color:#292929;line-height:1.8;margin:0 0 20px;">
              שלום,
            </p>
            <p style="font-size:16px;color:#292929;line-height:1.8;margin:0 0 20px;">
              שמחה לקבל אותך לתהליך!
            </p>
            <p style="font-size:15px;color:#555;line-height:1.8;margin:0 0 28px;">
              כדי שנוכל להתחיל לעבוד על התיק שלך ביעילות -
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

            <p style="font-size:15px;color:#555;line-height:1.8;margin:24px 0 0;">
              לכל שאלה - תכתבי לי בחזרה למייל הזה.
            </p>

            <p style="font-size:16px;color:#292929;font-weight:700;margin:24px 0 0;">
              רבקי
            </p>
          </div>


        </div>
      </body></html>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Send VIP onboarding error:", err);
    return NextResponse.json({ error: "שגיאת שרת" }, { status: 500 });
  }
}
