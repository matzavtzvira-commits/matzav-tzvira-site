import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, phone, org, type, participants, date, message } = await req.json();

    if (!name || !phone || !org) {
      return NextResponse.json({ error: "חסרים שדות חובה" }, { status: 400 });
    }

    await resend.emails.send({
      from: "אתר מצב צבירה <noreply@matzavtzvira.co.il>",
      to: "matzavtzvira@gmail.com",
      subject: `הזמנה חדשה: ${type} - ${org}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f4f7ff; border-radius: 16px;">
          <h2 style="color: #070C24; margin-bottom: 24px;">הזמנה חדשה מהאתר</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edff; color: #888; width: 40%;">סוג</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edff; font-weight: bold; color: #124AF0;">${type}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edff; color: #888;">שם</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edff; font-weight: bold;">${name}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edff; color: #888;">טלפון</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edff; font-weight: bold;">${phone}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edff; color: #888;">ארגון</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edff; font-weight: bold;">${org}</td></tr>
            ${participants ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edff; color: #888;">מספר משתתפות</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edff;">${participants}</td></tr>` : ""}
            ${date ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e8edff; color: #888;">תאריך מבוקש</td><td style="padding: 10px 0; border-bottom: 1px solid #e8edff;">${date}</td></tr>` : ""}
            ${message ? `<tr><td style="padding: 10px 0; color: #888; vertical-align: top;">הודעה</td><td style="padding: 10px 0;">${message}</td></tr>` : ""}
          </table>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Workshop contact error:", err);
    return NextResponse.json({ error: "שגיאת שרת" }, { status: 500 });
  }
}
