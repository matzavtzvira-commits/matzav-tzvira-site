import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const POA_PARAGRAPHS = [
  'ממנה ומיפה בזה את כוחו של מצב צבירה (עוסק פטור) 311127716 ו/או כל מי שעובד בעסק ו/או כל מי שבא מכוחה, כבא כוחי החוקי והמורשה מטעמם, לעשות ולדבר בשמי, עבורי ובמקומי את כל הפעולות הבאות להלן, וכל אחת מהן בנפרד כדלהלן:',
  'להיכנס בשמי ובמקומי לאזור האישי שלי ממשלתי ו/או לאזור אישי שלי ברשויות המס למדינה ו/או לאזור אישי ברשויות המקומיות (עיריות) וכן לכל אזור אישי בכל חברה ו/או נותן שירות מסויים באשר הוא ולשמור את הסיסמא והפרטים של אזור האישי שלי בצורה מאובטחת ואחראית.',
  'להיכנס בשמי ובמקומי במוסדות פיננסים למיניהם וזאת לרבות בנקים ו/או ביטוחים ו/או ביטוח לאומי ו/או כל גוף אחר.',
  'ולחתום בו ו/או בהם בשמי ובמקומי ו/או לצרף את חתימתי עליהם, ועל כל מסמך/ים ו/או טפסים ו/או בקשות ולרבות טפסים מקוונים ו/או דיגיטליים, וכן על כל מה שדרוש לבצע כל שירות עבורי.',
  'וזאת בכדי לבצע עבורי את כל הפעולות שבקשתי / אבקש בעתיד.',
  'ואני מרשה לב"כ הנ"ל לפעול בשמי ולעיין בכל מידע ו/או מסמכים ו/או חומר ממוחשב ו/או דיגיטלי ולהשתמש בהם לצורך השירות, ואני מוותר בזאת על זכויות שלי מכוח חוק הגנת הפרטיות, תשמ"א-1981.',
  'ואני מרשה לב"כ הנ"ל לשלם בשמי ובמקומי על חשבונו את כל התשלומים, המיסים, האגרות, הארנונות והיטלים ו/או תשלומי חובה למיניהם וכל הוצאה שתידרש לצורך השגת כל אישור ו/או תעודה ו/או מסמך שיידרש לביצוע הפעולות הנזכרות.',
  'יפוי כוח זה יפורש באופן המרחיב ביותר כדי שבאי כוחנו הנ"ל יוכלו לעשות בשמנו ובמקומנו את כל אשר אנו רשאים ו/או מחוייבים לעשות בעצמנו ברשויות ו/או מוסדות השונות.',
  'כל מעשה שיעשו באי כוחנו הנ"ל בכל הנוגע לפעולות לפי יפוי כוח זה, יחייב אותנו, את יורשינו, את חליפינו ואת כל הבאים מכוחנו, והרנו מסכימים מראש לכל מעשיהם שייעשו בתוקף יפוי כוח זה.',
  'יפוי כוח זה לשון יחיד רבים במשמע ולהיפך, ולשון זכר גם לשון נקבה במשמע ולהיפך, הכל לפי המקרה.',
  'בורר מוסכם בין הצדדים יהיה הרב ב"ד היושר והטוב סניף בית שמש, מזכיר הדיינים יקבע את הרכב הבוררים שידונו בתיק.',
  'כדי להימנע מאיסור ריבית, הצדדים מסכימים בזה כי כל תנאי השירות כפוף לתנאי היתר עיסקא המובא בספר ברית פנחס.',
  'כמו"כ אני מתחייב/ת בזאת שכל המסמכים שאגיש יהיו תקינים ואמינים, ואני מודע/ת לכך ששליחת מסמכים שאינם תקינים או אמינים מהווה עבירה ואשא בכל ההשלכות המשפטיות.',
];

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, idNumber, signature, signedDate } = await req.json();

    if (!name || !signature) {
      return NextResponse.json({ error: "חסרים שם או חתימה" }, { status: 400 });
    }

    const base64 = String(signature).replace(/^data:image\/\w+;base64,/, "");
    const sigBuffer = Buffer.from(base64, "base64");
    const stamp = new Date().toLocaleString("he-IL", { dateStyle: "long", timeStyle: "short" });

    const paras = POA_PARAGRAPHS
      .map(p => `<p style="font-size:14px;color:#333;line-height:1.85;margin:0 0 10px;">${p}</p>`)
      .join("");

    const html = `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:28px;background:#F4F7FF;border-radius:16px;">
        <div style="background:#124AF0;border-radius:12px;padding:18px 22px;margin-bottom:24px;">
          <h2 style="color:#21F0B0;margin:0 0 4px;">✍️ ייפוי כוח חתום</h2>
          <p style="color:rgba(255,255,255,0.75);font-size:13px;margin:0;">${name} · נחתם דיגיטלית ${stamp}</p>
        </div>

        <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;margin-bottom:18px;">
          <tr><td style="padding:10px 14px;border-bottom:1px solid #E8EDFF;color:#888;width:35%;">שם החותמת</td><td style="padding:10px 14px;border-bottom:1px solid #E8EDFF;font-weight:bold;color:#060D3C;">${name}</td></tr>
          <tr><td style="padding:10px 14px;border-bottom:1px solid #E8EDFF;color:#888;">תעודת זהות</td><td style="padding:10px 14px;border-bottom:1px solid #E8EDFF;color:#060D3C;">${idNumber || "לא צוין"}</td></tr>
          <tr><td style="padding:10px 14px;border-bottom:1px solid #E8EDFF;color:#888;">מייל</td><td style="padding:10px 14px;border-bottom:1px solid #E8EDFF;color:#124AF0;">${email || "לא צוין"}</td></tr>
          <tr><td style="padding:10px 14px;color:#888;">תאריך</td><td style="padding:10px 14px;color:#060D3C;">${signedDate || stamp}</td></tr>
        </table>

        <div style="background:#fff;border-radius:10px;padding:22px;margin-bottom:18px;">
          <p style="text-align:center;font-weight:700;color:#888;margin:0 0 2px;">בס"ד</p>
          <h3 style="text-align:center;font-size:18px;color:#060D3C;margin:0 0 16px;">ייפוי כח</h3>
          ${paras}
        </div>

        <div style="background:#fff;border-radius:10px;padding:18px 22px;text-align:center;">
          <p style="color:#888;font-size:13px;margin:0 0 10px;">חתימת הלקוחה</p>
          <img src="cid:poa-signature" alt="חתימה" style="max-width:320px;width:100%;border-bottom:2px solid #060D3C;" />
          <p style="color:#060D3C;font-weight:bold;margin:10px 0 0;">${name}</p>
        </div>

        <p style="color:#aaa;font-size:11px;margin-top:18px;text-align:center;">נחתם דיגיטלית דרך matzavtzvira.co.il · חותמת זמן: ${stamp}</p>
      </div>`;

    await resend.emails.send({
      from: "אתר מצב צבירה <noreply@matzavtzvira.co.il>",
      to: "matzavtzvira@gmail.com",
      subject: `ייפוי כוח חתום - ${name}`,
      html,
      attachments: [
        { filename: "signature.png", content: sigBuffer, contentId: "poa-signature" },
      ],
    });

    // Best-effort: flag the dashboard client as POA-signed.
    const secret = process.env.VIP_INTAKE_SECRET;
    if (secret && email) {
      const syncUrl =
        process.env.VIP_POA_SYNC_URL ||
        "https://tasks-dashboard-gamma.vercel.app/api/vip-poa-sync";
      try {
        await fetch(syncUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-intake-secret": secret },
          body: JSON.stringify({ email }),
          signal: AbortSignal.timeout(5000),
        });
      } catch (e) {
        console.error("POA dashboard sync failed:", e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("VIP POA error:", err);
    return NextResponse.json({ error: "שגיאת שרת" }, { status: 500 });
  }
}
