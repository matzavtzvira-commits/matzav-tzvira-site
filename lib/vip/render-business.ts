// Emails to the business (matzavtzvira@gmail.com). All client values are escaped.
import type { Answers, TaxRequest, TokenPayload } from "./types";
import type { ViewSection } from "./answers-view";
import { part1Sections, finalSections } from "./answers-view";
import {
  esc, escMultiline, row, rowHtml, table, boxHtml, listHtml, businessShell, telLink, mailLink, type TableStyle,
} from "./html";
import { fullName } from "./normalize";
import { nowLabel } from "./dates";
import type { RenderedEmail } from "./render-reminders";
import { reminderProblemText, type ReminderStatus } from "./reminder-status";

/** A red bold line inside a box (escaped). */
function redLine(text: string): string {
  return text ? `<p style="margin:8px 0 0;color:#991B1B;font-weight:bold;">${esc(text)}</p>` : "";
}

export function sectionsHtml(sections: ViewSection[], style: TableStyle = {}): string {
  return sections
    .map(s =>
      table(
        s.title,
        s.rows
          .map(rw => {
            if (rw.kind === "tel") return rowHtml(esc(rw.label), rw.value ? telLink(rw.value) : "", style);
            if (rw.kind === "mail") return rowHtml(esc(rw.label), rw.value ? mailLink(rw.value) : "", style);
            return row(rw.label, rw.value, style);
          })
          .join(""),
        style,
      ),
    )
    .join("");
}

function missingFilesBox(missingFiles: string[]): string {
  if (!missingFiles.length) return "";
  return boxHtml(
    "red",
    "קבצים שלא עברו - הלקוחה בחרה להמשיך בלעדיהם",
    `${listHtml(missingFiles)}<p style="margin:8px 0 0;">צריך לבקש אותם ממנה.</p>`,
  );
}

export interface Part1EmailInput {
  answers: Answers;
  missingFiles: string[];
  /** Business labels of items she will send later. */
  pendingItems: string[];
  /** The real outcome of scheduling the reminder (step order: sync -> schedule -> this email). */
  reminder: ReminderStatus;
  now?: Date;
}

export function renderPart1Email(input: Part1EmailInput): RenderedEmail {
  const a = input.answers;
  const name = fullName(a.her.firstName, a.her.lastName);
  const r = input.reminder;
  const pendingBox = input.pendingItems.length
    ? boxHtml(
        "yellow",
        "יגיע בהמשך",
        listHtml(input.pendingItems) +
          (r.kind === "scheduled"
            ? `<p style="margin:8px 0 0;">${esc(
                `תזכורת תצא ללקוחה ב${r.dayLabel} בשעה 09:00, עם קישור להעלאה. אם לא תעלה, יגיע אלייך אחר כך מייל מעקב.`,
              )}</p>`
            : redLine(reminderProblemText(r))),
      )
    : "";
  const body = `
    ${missingFilesBox(input.missingFiles)}
    ${pendingBox}
    ${sectionsHtml(part1Sections(a, input.missingFiles))}
    ${boxHtml("blue", "", esc(`הקבצים מגיעים במייל נפרד: 'קבצי VIP - ${name}'. השאלון המלא (חסכונות, שמחות והעדפות) יגיע כשתסיים את העמודים הבאים.`))}`;
  return {
    subject: `לקוחת VIP חדשה - ${name} (חלק 1: פרטים, מסמכים ועבודה)`,
    html: businessShell("לקוחת VIP חדשה - חלק 1: פרטים, מסמכים ועבודה", `${name} · ${nowLabel(input.now)}`, body),
  };
}

export function renderFinalEmail(a: Answers, missingFiles: string[] = [], now?: Date): RenderedEmail {
  const name = fullName(a.her.firstName, a.her.lastName);
  const body = `
    ${missingFilesBox(missingFiles)}
    ${sectionsHtml(finalSections(a))}
    <p style="margin:26px 0 10px;color:#060D3C;font-weight:bold;font-size:14px;">עותק מקוצר של חלק 1 (פרטים, מסמכים ועבודה)</p>
    ${sectionsHtml(part1Sections(a, missingFiles), { compact: true })}`;
  return {
    subject: `שאלון VIP מלא - ${name}`,
    html: businessShell("שאלון VIP מלא", `${name} · ${nowLabel(now)}`, body),
  };
}

export interface FilesEmailInput {
  stage: "part1" | "tax";
  name: string;
  email: string;
  phone: string;
  /** "label - original filename" per attached file */
  attachedNames: string[];
  now?: Date;
}

export function renderFilesEmail(input: FilesEmailInput): RenderedEmail {
  const tax = input.stage === "tax";
  const subject = tax ? `מסמכי החזר מס - ${input.name}` : `קבצי VIP - ${input.name}`;
  const related = tax ? `בדיקת החזר מס - ${input.name}` : `לקוחת VIP חדשה - ${input.name}`;
  const body = `
    <div style="background:#fff;border-radius:10px;padding:18px 20px;margin-bottom:18px;">
      <p style="color:#292929;font-size:15px;margin:0 0 8px;font-weight:bold;">${esc(`✓ ${input.attachedNames.length} קבצים מצורפים:`)}</p>
      ${listHtml(input.attachedNames)}
      <p style="color:#555;font-size:14px;margin:12px 0 0;">${esc(`שייך למייל '${related}'`)} · ${mailLink(input.email)}${input.phone ? ` · ${telLink(input.phone)}` : ""}</p>
    </div>`;
  return {
    subject,
    html: businessShell(tax ? "מסמכים לבדיקת החזר מס" : "קבצים מטופס קבלת מידע VIP", `${input.name} · ${nowLabel(input.now)}`, body),
  };
}

const TAX_GROUP_TITLES: Array<[keyof Pick<TaxRequest, "emp" | "family" | "finance">, string]> = [
  ["emp", "שינויי תעסוקה ושכר"],
  ["family", "הטבות משפחתיות ורפואיות"],
  ["finance", "פיננסים והשקעות"],
];

export function renderTaxEmail(t: TaxRequest, reminder: ReminderStatus, now?: Date): RenderedEmail {
  const reminderDayLabel = reminder.kind === "scheduled" ? reminder.dayLabel : "";
  const contact = table(
    "פרטים",
    row("שם", t.name) + rowHtml("טלפון", t.phone ? telLink(t.phone) : "") + rowHtml("מייל", mailLink(t.email)),
  );

  if (t.wantTax !== "כן") {
    const body = `${boxHtml("blue", "", esc("הלקוחה סימנה שהיא לא מעוניינת בבדיקת החזר מס."))}${contact}`;
    return {
      subject: `החזר מס - ${t.name}: לא מעוניינת בבדיקה`,
      html: businessShell("החזר מס: לא מעוניינת בבדיקה", `${t.name} · ${nowLabel(now)}`, body),
    };
  }

  const groups = TAX_GROUP_TITLES.map(([key, title]) =>
    table(title, rowHtml("", t[key].length ? listHtml(t[key]) : "לא סומן")),
  ).join("");

  const statusText = (s: string) =>
    s === "uploaded"
      ? `הועלה (במייל 'מסמכי החזר מס - ${t.name}')`
      : s === "already"
        ? "כבר אצלנו מעמוד המסמכים"
        : `תשלח בהמשך${reminderDayLabel ? ` (תזכורת ב${reminderDayLabel})` : ""}`;
  const docs = t.docs.length
    ? table("מסמכים", t.docs.map(d => row(d.label, statusText(d.status))).join(""))
    : boxHtml("blue", "", "לא סומנו מסמכים.");

  const notes = t.notes
    ? `<div style="background:#fff;border-radius:10px;padding:14px 18px;margin-bottom:18px;"><p style="color:#888;font-size:12px;margin:0 0 4px;">הערות</p><p style="color:#292929;font-size:14px;margin:0;">${escMultiline(t.notes)}</p></div>`
    : "";

  const consent = t.consent
    ? boxHtml("green", "אישור העברת מידע ליועצת מס", "כן - הלקוחה אישרה העברת מידע ליועצת מס")
    : boxHtml("red", "אישור העברת מידע ליועצת מס", "לא התקבל אישור");

  const missing = t.missingFiles.length
    ? boxHtml("red", "קבצים שלא עברו - הלקוחה בחרה להמשיך בלעדיהם", `${listHtml(t.missingFiles)}<p style="margin:8px 0 0;">צריך לבקש אותם ממנה.</p>`)
    : "";

  const problem = reminderProblemText(reminder);
  const reminderBox = problem ? boxHtml("red", "", `<b>${esc(problem)}</b>`) : "";
  const body = `${missing}${reminderBox}${contact}${groups}${docs}${notes}${consent}`;
  return {
    subject: `בדיקת החזר מס - ${t.name}`,
    html: businessShell("בדיקת החזר מס", `${t.name} · ${nowLabel(now)}`, body),
  };
}

export interface PendingUploadEmailInput {
  payload: TokenPayload;
  /** Business labels of what arrived in this request */
  receivedLabels: string[];
  attachedNames: string[];
  hpValues: Array<{ label: string; hp: string }>;
  complete: boolean;
  now?: Date;
}

export function renderPendingUploadEmail(input: PendingUploadEmailInput): RenderedEmail {
  const p = input.payload;
  const parts: string[] = [];
  if (input.complete) {
    parts.push(boxHtml("green", "", esc("כל מה שחסר התקבל, אז מייל המעקב מבוטל.")));
    if (p.st === "part1" && p.it.some(i => i.kind === "payslip")) {
      parts.push(boxHtml("blue", "", `<b>${esc(`עכשיו הכל מוכן לעוגן: לצרף את הקובץ למייל 'מייל לעוגן - ${p.n}' ולשלוח.`)}</b>`));
    }
  }
  parts.push(`
    <div style="background:#fff;border-radius:10px;padding:18px 20px;margin-bottom:18px;">
      <p style="color:#292929;font-size:15px;margin:0 0 8px;font-weight:bold;">התקבל עכשיו:</p>
      ${listHtml(input.receivedLabels)}
      ${input.attachedNames.length ? `<p style="color:#555;font-size:13px;margin:12px 0 4px;">${esc(`${input.attachedNames.length} קבצים מצורפים:`)}</p>${listHtml(input.attachedNames)}` : ""}
      <p style="color:#555;font-size:14px;margin:12px 0 0;">${mailLink(p.e)}${p.ph ? ` · ${telLink(p.ph)}` : ""}</p>
    </div>`);
  if (input.hpValues.length) {
    parts.push(table('ח"פ שהוקלד', input.hpValues.map(h => row(h.label, h.hp)).join("")));
  }
  return {
    subject: `התקבל מה שחסר - ${p.n}`,
    html: businessShell(p.st === "tax" ? "התקבל מסמך להחזר מס" : "התקבל מה שחסר לתיק", `${p.n} · ${nowLabel(input.now)}`, parts.join("")),
  };
}
