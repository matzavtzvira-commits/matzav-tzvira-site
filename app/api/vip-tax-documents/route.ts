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

    const clientName   = formData.get("clientName") as string;
    const clientEmail  = formData.get("clientEmail") as string;
    const idNumber     = formData.get("idNumber") as string;
    const dob          = formData.get("dob") as string;
    const address      = formData.get("address") as string;
    const spouseId     = formData.get("spouseIdNumber") as string;
    const spouseDob    = formData.get("spouseDob") as string;
    const empChanges   = formData.get("employmentChanges") as string;
    const familyBens   = formData.get("familyBenefits") as string;
    const financeItems = formData.get("financeItems") as string;
    const taxNotes     = formData.get("taxNotes") as string;
    const taxConsent   = formData.get("taxConsent") as string;

    const fileFields = [
      "forms106", "annualReportsDoc", "bituachLeumiDoc", "birthCertDoc", "degreeDoc",
      "settlementDoc", "specialEdDoc", "disabilityDoc",
      "lifeInsDoc", "mortgageInsDoc", "pensionDoc", "form867Doc", "propertyTaxDoc"
    ];

    const labelMap: Record<string, string> = {
      forms106: "טופס 106", annualReportsDoc: "דוח שנתי עסק", bituachLeumiDoc: "ריכוז ב\"ל",
      birthCertDoc: "תעודת לידה", degreeDoc: "תעודת תואר",
      settlementDoc: "אישור ישוב מזכה", specialEdDoc: "ועדת השמה",
      disabilityDoc: "אישור נכות", lifeInsDoc: "ביטוח חיים פרטי",
      mortgageInsDoc: "ביטוח חיים משכנתא", pensionDoc: "אישור פנסיה/גמל",
      form867Doc: "טופס 867", propertyTaxDoc: "מס שבח"
    };

    const attachments: { filename: string; content: Buffer }[] = [];
    const attachedSummary: string[] = [];

    for (const field of fileFields) {
      const files = formData.getAll(field) as File[];
      for (const file of files) {
        if (file && file.size > 0) {
          const buf = Buffer.from(await file.arrayBuffer());
          attachments.push({ filename: `${field}-${file.name}`, content: buf });
          attachedSummary.push(labelMap[field] || field);
        }
      }
    }

    const row = (label: string, value: string) => value ? `
      <tr>
        <td style="padding:9px 12px;border-bottom:1px solid #E8EDFF;color:#888;width:38%;font-size:13px;">${label}</td>
        <td style="padding:9px 12px;border-bottom:1px solid #E8EDFF;color:#292929;font-size:13px;">${value}</td>
      </tr>` : "";

    const html = `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;padding:32px;background:#F4F7FF;border-radius:16px;">
        <div style="background:#124AF0;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
          <h2 style="color:#21F0B0;margin:0 0 4px;font-size:18px;">מסמכי החזר מס - ${clientName}</h2>
          <p style="color:rgba(255,255,255,0.7);font-size:13px;margin:0;">${new Date().toLocaleDateString("he-IL", { day:"numeric", month:"long", year:"numeric" })}</p>
        </div>

        <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;margin-bottom:18px;">
          <thead><tr><td colspan="2" style="padding:11px 16px;background:#060D3C;color:#fff;font-weight:bold;font-size:14px;">פרטים מזהים</td></tr></thead>
          <tbody>
            ${row("שם", clientName)}
            ${row("מייל", clientEmail)}
            ${row("ת\"ז", idNumber)}
            ${row("תאריך לידה", dob)}
            ${row("כתובת", address)}
            ${spouseId ? row("ת\"ז בעל", spouseId) : ""}
            ${spouseDob ? row("תאריך לידה בעל", spouseDob) : ""}
          </tbody>
        </table>

        <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;margin-bottom:18px;">
          <thead><tr><td colspan="2" style="padding:11px 16px;background:#060D3C;color:#fff;font-weight:bold;font-size:14px;">שינויי תעסוקה</td></tr></thead>
          <tbody>${row("", empChanges || "לא רלוונטי")}</tbody>
        </table>

        <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;margin-bottom:18px;">
          <thead><tr><td colspan="2" style="padding:11px 16px;background:#060D3C;color:#fff;font-weight:bold;font-size:14px;">הטבות משפחתיות</td></tr></thead>
          <tbody>${row("", familyBens || "לא רלוונטי")}</tbody>
        </table>

        <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;margin-bottom:18px;">
          <thead><tr><td colspan="2" style="padding:11px 16px;background:#060D3C;color:#fff;font-weight:bold;font-size:14px;">פיננסים</td></tr></thead>
          <tbody>${row("", financeItems || "לא רלוונטי")}</tbody>
        </table>

        ${taxNotes ? `<div style="background:#fff;border-radius:10px;padding:14px 18px;margin-bottom:18px;"><p style="color:#888;font-size:12px;margin:0 0 4px;">הערות</p><p style="color:#292929;font-size:14px;margin:0;">${taxNotes}</p></div>` : ""}

        <div style="background:${taxConsent && taxConsent.startsWith("כן") ? "#F0FDF4" : "#FFF1F1"};border-radius:10px;padding:14px 18px;margin-bottom:18px;border-right:3px solid ${taxConsent && taxConsent.startsWith("כן") ? "#21F0B0" : "#FA5C5C"};">
          <p style="color:#888;font-size:12px;margin:0 0 4px;">אישור העברת מידע לחברת החזרי מס</p>
          <p style="color:#292929;font-size:14px;font-weight:bold;margin:0;">${taxConsent || "לא התקבל אישור"}</p>
        </div>

        <div style="background:${attachments.length > 0 ? "#21F0B0" : "#E8EDFF"};border-radius:10px;padding:14px 20px;">
          <p style="margin:0;color:#060D3C;font-weight:bold;font-size:14px;">
            ${attachments.length > 0
              ? `✓ ${attachments.length} קבצים מצורפים: ${[...new Set(attachedSummary)].join(" | ")}`
              : "לא הועלו קבצים"}
          </p>
        </div>
      </div>`;

    await resend.emails.send({
      from: "אתר מצב צבירה <noreply@matzavtzvira.co.il>",
      to: "matzavtzvira@gmail.com",
      subject: `מסמכי החזר מס - ${clientName}`,
      html,
      attachments,
    });

    return NextResponse.json({ ok: true }, { headers: CORS_HEADERS });
  } catch (err) {
    console.error("Tax docs error:", err);
    return NextResponse.json({ error: "שגיאת שרת" }, { status: 500, headers: CORS_HEADERS });
  }
}
