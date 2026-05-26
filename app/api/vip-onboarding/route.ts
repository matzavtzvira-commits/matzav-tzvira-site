import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://matzavtzvira.co.il",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const maritalStatus = formData.get("maritalStatus") as string;
    const numChildren = formData.get("numChildren") as string;
    const childrenAges = formData.get("childrenAges") as string;
    const employmentStatus = formData.get("employmentStatus") as string;
    const income = formData.get("income") as string;
    const hasPension = formData.get("hasPension") as string;
    const hasHishtalmut = formData.get("hasHishtalmut") as string;
    const hasMortgage = formData.get("hasMortgage") as string;
    const interestedInRefinance = formData.get("interestedInRefinance") as string;
    const hasChildSavings = formData.get("hasChildSavings") as string;
    const notes = formData.get("notes") as string;

    const tzFile = formData.get("tzFile") as File | null;
    const spouseTzFile = formData.get("spouseTzFile") as File | null;
    const mortgageReportFile = formData.get("mortgageReportFile") as File | null;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "חסרים שדות חובה" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    if (!tzFile || tzFile.size === 0 || !spouseTzFile || spouseTzFile.size === 0) {
      return NextResponse.json(
        { error: "יש להעלות צילום ת\"ז שלך ושל בעלך" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const attachments: { filename: string; content: Buffer }[] = [];

    const tzBuffer = Buffer.from(await tzFile.arrayBuffer());
    attachments.push({ filename: `tz-${name}-${tzFile.name}`, content: tzBuffer });

    const spouseBuffer = Buffer.from(await spouseTzFile.arrayBuffer());
    attachments.push({ filename: `tz-spouse-${spouseTzFile.name}`, content: spouseBuffer });

    if (mortgageReportFile && mortgageReportFile.size > 0) {
      const mortgageBuffer = Buffer.from(await mortgageReportFile.arrayBuffer());
      attachments.push({ filename: `mortgage-report-${mortgageReportFile.name}`, content: mortgageBuffer });
    }

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #E8EDFF;color:#888;width:38%;font-size:14px;">${label}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #E8EDFF;color:#292929;font-size:14px;">${value || "לא צוין"}</td>
      </tr>`;

    const mortgageRow = hasMortgage === "כן"
      ? row("מעוניינת במחזור משכנתא?", interestedInRefinance || "לא צוין")
      : "";

    const html = `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;padding:32px;background:#F4F7FF;border-radius:16px;">
        <div style="background:#124AF0;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
          <h2 style="color:#21F0B0;margin:0 0 4px;">לקוחת VIP חדשה - טופס קבלת מידע</h2>
          <p style="color:rgba(255,255,255,0.7);font-size:13px;margin:0;">${new Date().toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
        </div>

        <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;margin-bottom:20px;">
          <thead><tr><td colspan="2" style="padding:12px 16px;background:#060D3C;color:#fff;font-weight:bold;font-size:15px;">פרטים אישיים</td></tr></thead>
          <tbody>
            ${row("שם מלא", name)}
            <tr>
              <td style="padding:10px 12px;border-bottom:1px solid #E8EDFF;color:#888;width:38%;font-size:14px;">טלפון</td>
              <td style="padding:10px 12px;border-bottom:1px solid #E8EDFF;font-size:14px;"><a href="tel:${phone}" style="color:#124AF0;text-decoration:none;font-weight:bold;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding:10px 12px;border-bottom:1px solid #E8EDFF;color:#888;font-size:14px;">מייל</td>
              <td style="padding:10px 12px;border-bottom:1px solid #E8EDFF;font-size:14px;"><a href="mailto:${email}" style="color:#124AF0;text-decoration:none;">${email}</a></td>
            </tr>
            ${row("מצב משפחתי", maritalStatus)}
          </tbody>
        </table>

        <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;margin-bottom:20px;">
          <thead><tr><td colspan="2" style="padding:12px 16px;background:#060D3C;color:#fff;font-weight:bold;font-size:15px;">משפחה ועבודה</td></tr></thead>
          <tbody>
            ${row("מספר ילדים", numChildren)}
            ${row("גילאי הילדים", childrenAges)}
            ${row("סטטוס תעסוקה", employmentStatus)}
            ${row("הכנסה חודשית", income)}
          </tbody>
        </table>

        <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;margin-bottom:20px;">
          <thead><tr><td colspan="2" style="padding:12px 16px;background:#060D3C;color:#fff;font-weight:bold;font-size:15px;">מצב פיננסי</td></tr></thead>
          <tbody>
            ${row("יש פנסיה?", hasPension)}
            ${row("יש קרן השתלמות?", hasHishtalmut)}
            ${row("יש משכנתא?", hasMortgage)}
            ${mortgageRow}
            ${row("יש חסכון לילדים?", hasChildSavings)}
          </tbody>
        </table>

        ${notes ? `
        <div style="background:#fff;border-radius:10px;padding:16px 20px;margin-bottom:20px;">
          <p style="color:#888;font-size:13px;margin:0 0 6px;">הערות</p>
          <p style="color:#292929;margin:0;font-size:15px;">${notes}</p>
        </div>` : ""}

        <div style="background:#21F0B0;border-radius:10px;padding:14px 20px;">
          <p style="margin:0;color:#060D3C;font-weight:bold;font-size:14px;">✓ ${attachments.length} קבצים מצורפים (ת"ז${attachments.length > 2 ? " + דוח משכנתא" : ""})</p>
        </div>

        <p style="color:#aaa;font-size:12px;margin-top:20px;text-align:center;">נשלח מטופס קבלת מידע VIP - matzavtzvira.co.il</p>
      </div>`;

    await resend.emails.send({
      from: "אתר מצב צבירה <onboarding@resend.dev>",
      to: "matzavtzvira@gmail.com",
      subject: `לקוחת VIP חדשה - ${name}`,
      html,
      attachments,
    });

    return NextResponse.json({ ok: true }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error("VIP onboarding error:", err);
    return NextResponse.json(
      { error: "שגיאת שרת" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
