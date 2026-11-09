// Client reminder (scheduled, from Rivky, signed הניה) and the business follow-up
// that fires the day after if she did not upload through the link.
import type { TokenItem } from "./types";
import { esc, mailLink, telLink, businessShell, listHtml, boxHtml } from "./html";
import { greeting } from "./greeting";
import { docDisplayLabel } from "./pending";
import { MORTGAGE_GUIDE_URL } from "./config";

export interface RenderedEmail {
  subject: string;
  html: string;
  text?: string;
}

export interface ClientReminderInput {
  firstName: string;
  lastName: string;
  spouseFirstName: string;
  items: TokenItem[];
  link: string;
  /** Employers per person; the employer name is added only when a person has more than one. */
  employerCounts: { her: number; spouse: number };
  /** "tax" reminders get their own subject, so two reminders on the same morning are not identical. */
  stage?: "part1" | "tax";
}

/** The lines of the "I need:" list. Payslips are grouped under one heading. */
export function reminderItemLines(items: TokenItem[], plural: boolean, counts: { her: number; spouse: number }) {
  const payslips = items.filter(i => i.kind === "payslip");
  const docs = items.filter(i => i.kind !== "payslip");
  const payslipBullets = payslips.map(i => {
    const spouse = i.person === "spouse";
    const who = plural ? (spouse ? "של הבעל" : "של האישה") : spouse ? "של בעלך" : "שלך";
    const many = (spouse ? counts.spouse : counts.her) > 1;
    return many && i.employer ? `${who} (${i.employer})` : who;
  });
  return { payslipBullets, docLabels: docs.map(docDisplayLabel), hasPayslips: payslips.length > 0 };
}

export function renderClientReminder(input: ClientReminderInput): RenderedEmail {
  const g = greeting(input.firstName, input.lastName, input.spouseFirstName);
  const P = g.plural;
  const you = P ? "אתכם" : "אותך";
  const yours = P ? "שלכם" : "שלך";
  const { payslipBullets, docLabels, hasPayslips } = reminderItemLines(input.items, P, input.employerCounts);
  const hasMortgage = input.items.some(i => i.id === "mortgageReport");

  const p = (text: string, extra = "") =>
    `<p style="font-size:16px;color:#292929;line-height:1.8;margin:0 0 14px;${extra}">${text}</p>`;

  const listItems: string[] = [];
  if (payslipBullets.length) {
    listItems.push(
      `<li style="margin-bottom:8px;">תלוש שכר מהחודשים האחרונים (או מספר ח"פ של המעסיק):` +
        `<ul style="margin:6px 0 0;padding-right:20px;">${payslipBullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul></li>`,
    );
  }
  for (const d of docLabels) listItems.push(`<li style="margin-bottom:8px;">${esc(d)}</li>`);

  const subject =
    input.stage === "tax"
      ? P
        ? "נשאר רק דבר אחד קטן לבדיקת החזר המס שלכם"
        : "נשאר רק דבר אחד קטן לבדיקת החזר המס שלך"
      : P
        ? "נשאר רק דבר אחד קטן לתיק שלכם"
        : "נשאר רק דבר אחד קטן לתיק שלך";

  const html = `<!DOCTYPE html><html dir="rtl" lang="he"><head><meta charset="UTF-8"/></head><body style="margin:0;background:#ffffff;">
  <div dir="rtl" style="font-family:Arial,sans-serif;max-width:580px;margin:0 auto;background:#ffffff;direction:rtl;text-align:right;">
    <div style="background:linear-gradient(135deg,#124AF0 0%,#060D3C 100%);padding:28px 32px;text-align:center;">
      <p style="color:#21F0B0;font-size:13px;font-weight:700;letter-spacing:2px;margin:0;">מצב צבירה</p>
    </div>
    <div style="padding:32px 32px 36px;">
      ${p(esc(g.line), "font-weight:700;")}
      ${p(`מתזכרת ${you} שנשאר לשלוח לי רק דבר אחד קטן.`)}
      ${p(`השאלון כבר אצלי, ואנחנו עובדות על התיק ${yours}.`)}
      ${p("כדי להשלים את התמונה, אני צריכה:", "margin-bottom:6px;")}
      <ul style="font-size:16px;color:#292929;line-height:1.7;margin:0 0 22px;padding-right:22px;">${listItems.join("")}</ul>
      <div style="text-align:center;margin:28px 0;">
        <a href="${esc(input.link)}" style="display:inline-block;background:#124AF0;color:#ffffff;font-size:18px;font-weight:800;padding:16px 48px;border-radius:14px;text-decoration:none;">להעלאה</a>
      </div>
      ${hasPayslips ? `<div style="background:#F4F7FF;border-radius:12px;padding:14px 18px;margin:0 0 18px;">
        <p style="font-size:15px;color:#060D3C;font-weight:700;margin:0 0 4px;">אין ${P ? "לכם" : "לך"} תלוש בהישג יד?</p>
        <p style="font-size:15px;color:#555;line-height:1.7;margin:0;">אפשר לשלוח רק את הח"פ של המעסיק. אפשר לבקש אותו מהנהלת החשבונות במקום העבודה.</p>
      </div>` : ""}
      ${hasMortgage ? `<p style="font-size:15px;margin:0 0 18px;"><a href="${esc(MORTGAGE_GUIDE_URL)}" style="color:#124AF0;font-weight:700;">איך מוציאים את הדוח?</a></p>` : ""}
      ${p(`כדי שנוכל להתקדם ביעילות עם התיק ${yours}.`)}
      <p style="font-size:16px;color:#292929;font-weight:700;margin:22px 0 0;">הניה</p>
    </div>
  </div>
</body></html>`;

  const textLines = [
    g.line,
    `מתזכרת ${you} שנשאר לשלוח לי רק דבר אחד קטן.`,
    `השאלון כבר אצלי, ואנחנו עובדות על התיק ${yours}.`,
    "כדי להשלים את התמונה, אני צריכה:",
    ...(payslipBullets.length ? ['- תלוש שכר מהחודשים האחרונים (או מספר ח"פ של המעסיק):', ...payslipBullets.map(b => `  * ${b}`)] : []),
    ...docLabels.map(d => `- ${d}`),
    "",
    `להעלאה: ${input.link}`,
    ...(hasPayslips ? ["", `אין ${P ? "לכם" : "לך"} תלוש בהישג יד?`, 'אפשר לשלוח רק את הח"פ של המעסיק. אפשר לבקש אותו מהנהלת החשבונות במקום העבודה.'] : []),
    ...(hasMortgage ? ["", `איך מוציאים את הדוח? ${MORTGAGE_GUIDE_URL}`] : []),
    "",
    `כדי שנוכל להתקדם ביעילות עם התיק ${yours}.`,
    "הניה",
  ];

  return { subject, html, text: textLines.join("\n") };
}

export interface FollowUpInput {
  fullName: string;
  phone: string;
  email: string;
  itemLabels: string[]; // business labels
  reminderDayLabel: string; // "יום ראשון 15.11" (rendered as "ביום ראשון 15.11")
  stage: "part1" | "tax";
}

export function renderFollowUp(input: FollowUpInput): RenderedEmail {
  const subject = `עדיין חסר: ${input.itemLabels.join(", ")} - ${input.fullName}`;
  const body = `
    <div style="background:#fff;border-radius:10px;padding:18px 20px;margin-bottom:18px;font-size:15px;color:#292929;line-height:1.8;">
      <p style="margin:0 0 10px;">${esc(input.fullName)} קיבלה תזכורת ב${esc(input.reminderDayLabel)} ועדיין לא העלתה דרך הקישור:</p>
      ${listHtml(input.itemLabels)}
      <p style="margin:14px 0 0;">טלפון: ${telLink(input.phone)} · מייל: ${mailLink(input.email)}</p>
    </div>
    ${boxHtml("yellow", "", esc("אם היא שלחה בדרך אחרת (וואטסאפ או מייל), אפשר להתעלם."))}`;
  const title = input.stage === "tax" ? "עדיין חסרים מסמכים להחזר מס" : "עדיין חסר מסמך לתיק";
  return { subject, html: businessShell(title, input.fullName, body) };
}
