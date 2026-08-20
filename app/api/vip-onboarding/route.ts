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
    const hasLoan = formData.get("hasLoan") as string;
    const hasLifeInsurance = formData.get("hasLifeInsurance") as string;
    const hasGemel = formData.get("hasGemel") as string;
    const hasMortgage = formData.get("hasMortgage") as string;
    const interestedInRefinance = formData.get("interestedInRefinance") as string;
    const hasChildSavings = formData.get("hasChildSavings") as string;
    const kosherTracks = formData.get("kosherTracks") as string;
    const usCitizen = formData.get("usCitizen") as string;
    const notes = formData.get("notes") as string;

    // Spouse (husband) answers - collected only when married
    const spouseEmploymentStatus = formData.get("spouseEmploymentStatus") as string;
    const spouseIncome = formData.get("spouseIncome") as string;
    const spouseHasPension = formData.get("spouseHasPension") as string;
    const spouseHasHishtalmut = formData.get("spouseHasHishtalmut") as string;
    const spouseHasLoan = formData.get("spouseHasLoan") as string;
    const spouseHasLifeInsurance = formData.get("spouseHasLifeInsurance") as string;
    const spouseHasGemel = formData.get("spouseHasGemel") as string;
    const spouseUsCitizen = formData.get("spouseUsCitizen") as string;

    const tzFile = formData.get("tzFile") as File | null;
    const spouseTzFile = formData.get("spouseTzFile") as File | null;
    const mortgageReportFile = formData.get("mortgageReportFile") as File | null;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "חסרים שדות חובה" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const married = maritalStatus === "נשואה";

    // ת"ז שלה תמיד חובה. ת"ז בן זוג נדרשת רק כשנשואה - אחרת רווקה / חד הורית נחסמות.
    if (!tzFile || tzFile.size === 0) {
      return NextResponse.json(
        { error: "יש להעלות צילום ת\"ז" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    if (married && (!spouseTzFile || spouseTzFile.size === 0)) {
      return NextResponse.json(
        { error: "יש להעלות צילום ת\"ז של בעלך" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const attachments: { filename: string; content: Buffer }[] = [];

    const tzBuffer = Buffer.from(await tzFile.arrayBuffer());
    attachments.push({ filename: `tz-${name}-${tzFile.name}`, content: tzBuffer });

    if (spouseTzFile && spouseTzFile.size > 0) {
      const spouseBuffer = Buffer.from(await spouseTzFile.arrayBuffer());
      attachments.push({ filename: `tz-spouse-${spouseTzFile.name}`, content: spouseBuffer });
    }

    let hasMortgageReport = false;
    if (mortgageReportFile && mortgageReportFile.size > 0) {
      const mortgageBuffer = Buffer.from(await mortgageReportFile.arrayBuffer());
      attachments.push({ filename: `mortgage-report-${mortgageReportFile.name}`, content: mortgageBuffer });
      hasMortgageReport = true;
    }

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #E8EDFF;color:#888;width:38%;font-size:14px;">${label}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #E8EDFF;color:#292929;font-size:14px;">${value || "לא צוין"}</td>
      </tr>`;

    const spouseRow = (label: string, value: string) => (married ? row(label, value) : "");

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
            ${row("סטטוס תעסוקה שלה", employmentStatus)}
            ${spouseRow("סטטוס תעסוקה של הבעל", spouseEmploymentStatus)}
            ${row("הכנסה חודשית שלה", income)}
            ${spouseRow("הכנסה חודשית של הבעל", spouseIncome)}
          </tbody>
        </table>

        <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;margin-bottom:20px;">
          <thead><tr><td colspan="2" style="padding:12px 16px;background:#060D3C;color:#fff;font-weight:bold;font-size:15px;">מצב פיננסי</td></tr></thead>
          <tbody>
            ${row("יש לה פנסיה?", hasPension)}
            ${spouseRow("לבעל יש פנסיה?", spouseHasPension)}
            ${row("יש לה קרן השתלמות?", hasHishtalmut)}
            ${spouseRow("לבעל יש קרן השתלמות?", spouseHasHishtalmut)}
            ${row("יש לה קרן גמל?", hasGemel)}
            ${spouseRow("לבעל יש קרן גמל?", spouseHasGemel)}
            ${row("יש לה ביטוח חיים פרטי?", hasLifeInsurance)}
            ${spouseRow("לבעל יש ביטוח חיים פרטי?", spouseHasLifeInsurance)}
            ${row("יש לה הלוואה על מוצר פיננסי?", hasLoan)}
            ${spouseRow("לבעל יש הלוואה על מוצר פיננסי?", spouseHasLoan)}
            ${row("יש משכנתא?", hasMortgage)}
            ${mortgageRow}
            ${row("יש חסכון לילדים?", hasChildSavings)}
            ${row("חשוב להם מסלולים כשרים?", kosherTracks)}
            ${row("אזרחות אמריקאית שלה?", usCitizen)}
            ${spouseRow("לבעל אזרחות אמריקאית?", spouseUsCitizen)}
          </tbody>
        </table>

        ${notes ? `
        <div style="background:#fff;border-radius:10px;padding:16px 20px;margin-bottom:20px;">
          <p style="color:#888;font-size:13px;margin:0 0 6px;">הערות</p>
          <p style="color:#292929;margin:0;font-size:15px;">${notes}</p>
        </div>` : ""}

        <div style="background:#21F0B0;border-radius:10px;padding:14px 20px;">
          <p style="margin:0;color:#060D3C;font-weight:bold;font-size:14px;">✓ ${attachments.length} קבצים מצורפים (ת"ז${hasMortgageReport ? " + דוח משכנתא" : ""})</p>
        </div>

        <p style="color:#aaa;font-size:12px;margin-top:20px;text-align:center;">נשלח מטופס קבלת מידע VIP - matzavtzvira.co.il</p>
      </div>`;

    await resend.emails.send({
      from: "אתר מצב צבירה <noreply@matzavtzvira.co.il>",
      to: "matzavtzvira@gmail.com",
      subject: `לקוחת VIP חדשה - ${name}`,
      html,
      attachments,
    });

    // Sync the textual answers to the dashboard client (matched by email).
    // Files (ID photos, mortgage report) are intentionally NOT sent — email only.
    const onboarding = [
      `מצב משפחתי: ${maritalStatus || "לא צוין"}`,
      `מספר ילדים: ${numChildren || "לא צוין"}`,
      `גילאי הילדים: ${childrenAges || "לא צוין"}`,
      `סטטוס תעסוקה: ${employmentStatus || "לא צוין"}`,
      ...(married ? [`סטטוס תעסוקה של הבעל: ${spouseEmploymentStatus || "לא צוין"}`] : []),
      `הכנסה חודשית: ${income || "לא צוין"}`,
      ...(married ? [`הכנסה חודשית של הבעל: ${spouseIncome || "לא צוין"}`] : []),
      `פנסיה: ${hasPension || "לא צוין"}`,
      ...(married ? [`פנסיה של הבעל: ${spouseHasPension || "לא צוין"}`] : []),
      `קרן השתלמות: ${hasHishtalmut || "לא צוין"}`,
      ...(married ? [`קרן השתלמות של הבעל: ${spouseHasHishtalmut || "לא צוין"}`] : []),
      `קרן גמל: ${hasGemel || "לא צוין"}`,
      ...(married ? [`קרן גמל של הבעל: ${spouseHasGemel || "לא צוין"}`] : []),
      `ביטוח חיים פרטי: ${hasLifeInsurance || "לא צוין"}`,
      ...(married ? [`ביטוח חיים פרטי של הבעל: ${spouseHasLifeInsurance || "לא צוין"}`] : []),
      `הלוואה על מוצר פיננסי: ${hasLoan || "לא צוין"}`,
      ...(married ? [`הלוואה על מוצר פיננסי של הבעל: ${spouseHasLoan || "לא צוין"}`] : []),
      `משכנתא: ${hasMortgage || "לא צוין"}`,
      ...(hasMortgage === "כן" ? [`מחזור משכנתא: ${interestedInRefinance || "לא צוין"}`] : []),
      `חסכון לילדים: ${hasChildSavings || "לא צוין"}`,
      `מסלולים כשרים חשובים: ${kosherTracks || "לא צוין"}`,
      `אזרחות אמריקאית: ${usCitizen || "לא צוין"}`,
      ...(married ? [`אזרחות אמריקאית של הבעל: ${spouseUsCitizen || "לא צוין"}`] : []),
      ...(notes ? [`הערות: ${notes}`] : []),
    ].join("\n");

    const syncSecret = process.env.VIP_INTAKE_SECRET;
    if (syncSecret) {
      const syncUrl =
        process.env.VIP_ONBOARDING_SYNC_URL ||
        "https://tasks-dashboard-gamma.vercel.app/api/vip-onboarding-sync";
      try {
        await fetch(syncUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-intake-secret": syncSecret },
          body: JSON.stringify({ email, onboarding, phone }),
          signal: AbortSignal.timeout(5000),
        });
      } catch (e) {
        console.error("VIP onboarding dashboard sync failed:", e);
      }
    }

    return NextResponse.json({ ok: true }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error("VIP onboarding error:", err);
    return NextResponse.json(
      { error: "שגיאת שרת" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
