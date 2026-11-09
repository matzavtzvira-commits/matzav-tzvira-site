// "Ready for Ogen": a forward-ready email (body = the email to Ogen) and a short
// notification to the business with the forward instructions + call reminder.
import type { Answers, Work } from "./types";
import { esc, telLink } from "./html";
import { fullName, isSalaried } from "./normalize";
import { addressLine, missingChecker } from "./answers-view";
import { capLabel, payslipLabel } from "./pending";
import { OGEN_CC, OGEN_TO } from "./config";
import type { RenderedEmail } from "./render-reminders";
import { reminderProblemText, type ReminderStatus } from "./reminder-status";

// ---- which Ogen files exist, and which of them are really attached ----

export type OgenFileState = "attached" | "missing" | "notFetched";

export interface OgenFile {
  label: string; // file label as the form sends it, e.g. 'ת"ז - שרה כהן'
  group: "id" | "sefach" | "birth" | "payslip";
  first: string; // first name of the person it belongs to ("" for ספח / birth certificate)
  employer: string;
  /** attached: in the dashboard listing; missing: she continued without it; notFetched: uploaded but not in the listing */
  state: OgenFileState;
}

/**
 * The Ogen files the answers say were uploaded (her ID, the husband's ID, ספח, a birth
 * certificate uploaded as a file, payslips), each checked against missingFiles and
 * against the dashboard names ("<label> - <original>") that were attached.
 */
export function ogenFiles(a: Answers, missingFiles: string[], attachedNames: string[]): OgenFile[] {
  const missing = missingChecker(missingFiles);
  const herFull = fullName(a.her.firstName, a.her.lastName);
  const spFull = a.spouse ? fullName(a.spouse.firstName, a.spouse.lastName) : "";
  const list: Array<Omit<OgenFile, "state">> = [];
  list.push({ label: capLabel(`ת"ז - ${herFull}`), group: "id", first: a.her.firstName, employer: "" });
  if (a.spouse) list.push({ label: capLabel(`ת"ז בעל - ${spFull}`), group: "id", first: a.spouse.firstName, employer: "" });
  list.push({ label: "ספח", group: "sefach", first: "", employer: "" });
  if (a.documents.childAfterSefach === "כן" && a.documents.newChild && a.documents.newChild.mode === "file") {
    list.push({ label: "תעודת לידה", group: "birth", first: "", employer: "" });
  }
  const people = [
    { first: a.her.firstName, full: herFull, w: a.work.her },
    ...(a.spouse && a.work.spouse ? [{ first: a.spouse.firstName, full: spFull, w: a.work.spouse }] : []),
  ];
  for (const { first, full, w } of people) {
    if (!isSalaried(w.status)) continue;
    for (const e of w.employers) {
      if (e.idMode === "payslip") list.push({ label: payslipLabel(full, e.name), group: "payslip", first, employer: e.name });
    }
  }
  return list.map(f => ({
    ...f,
    state: missing(f.label) ? "missing" : attachedNames.some(n => n.startsWith(`${f.label} - `)) ? "attached" : "notFetched",
  }));
}

/** 'ת"ז' when the subset holds every ID (else 'ת"ז של <name>'); 'תלושים' likewise. */
function fileNames(subset: OgenFile[], all: OgenFile[]): string[] {
  const names: string[] = [];
  const whole = (g: OgenFile["group"]) => all.filter(f => f.group === g).every(f => subset.includes(f));
  const ids = subset.filter(f => f.group === "id");
  if (ids.length) names.push(...(whole("id") ? ['ת"ז'] : ids.map(f => `ת"ז של ${f.first}`)));
  if (subset.some(f => f.group === "sefach")) names.push("ספח");
  if (subset.some(f => f.group === "birth")) names.push("תעודת לידה");
  const slips = subset.filter(f => f.group === "payslip");
  if (slips.length) names.push(...(whole("payslip") ? ["תלושים"] : slips.map(f => `תלוש ${f.employer || f.first}`)));
  return names;
}

const MARITAL_TEXT: Record<string, string> = { "נשואה": "נשואים", "רווקה": "רווקה", "חד הורית": "חד הורית" };

function usCitizenLine(a: Answers): string {
  const parts: string[] = [];
  const counts = (v: string) => v && v !== "לא";
  if (counts(a.her.usCitizen)) parts.push(`${a.her.firstName || "היא"} - ${a.her.usCitizen}`);
  if (a.spouse && counts(a.spouse.usCitizen)) parts.push(`${a.spouse.firstName || "הבעל"} - ${a.spouse.usCitizen}`);
  if (counts(a.documents.childrenUsCitizen)) parts.push(`הילדים - ${a.documents.childrenUsCitizen}`);
  return parts.length ? `אזרחות אמריקאית: ${parts.join(", ")}` : "";
}

type StateOf = (label: string) => OgenFileState | undefined;

function employerOgenText(e: Work["employers"][number], stateOf: StateOf, personFull: string): string {
  const name = e.name || "מקום עבודה";
  if (e.idMode === "hp") return `${name} (ח"פ ${e.hp})`;
  if (e.idMode === "payslip") {
    const st = stateOf(payslipLabel(personFull, e.name));
    // "מצורף" only for a payslip that is really attached; one that is only in the
    // "קבצי VIP" email is named neutrally (the business attaches it by hand).
    if (st === "attached") return `${name} (תלוש מצורף)`;
    if (st === "notFetched") return `${name} (תלוש שכר)`;
  }
  return `${name} (תלוש יגיע בהמשך)`;
}

/** Lines (escaped HTML) about one person's work. */
function workLines(first: string, personFull: string, w: Work, stateOf: StateOf): string[] {
  let main = `<b>${esc(first)}</b> - ${esc(w.status || "לא צוין")}`;
  if (isSalaried(w.status) && w.employers.length) {
    main += `; ${esc(w.employers.map(e => employerOgenText(e, stateOf, personFull)).join(", "))}`;
  }
  main += `; הכנסה: ${esc(w.income || "לא צוין")}`;
  const lines = [main];
  if (w.teacherHishtalmut === "כן") {
    lines.push(`&nbsp;&nbsp;קרן השתלמות מורים: ${esc(w.teachingYears || "?")} שנים בהוראה, שבתון: ${esc(w.sabbaticalTaken || "לא צוין")}`);
  }
  const changes = w.plannedChange.filter(c => c !== "אין");
  if (changes.length) lines.push(`&nbsp;&nbsp;שינוי מתוכנן: ${esc(changes.join(", "))}`);
  return lines;
}

export interface OgenEmailInput {
  answers: Answers;
  missingFiles: string[];
  /** Dashboard names of the files attached to this email ([] = sent without attachments). */
  attachedNames: string[];
}

export function ogenSubject(a: Answers): string {
  const her = fullName(a.her.firstName, a.her.lastName);
  const sp = a.spouse ? fullName(a.spouse.firstName, a.spouse.lastName) : "";
  return `לקוחה חדשה ממצב צבירה לקוח VIP - ${her}${sp ? ` ו${sp}` : ""}`;
}

export function renderOgenEmail(input: OgenEmailInput): RenderedEmail {
  const a = input.answers;
  const files = ogenFiles(a, input.missingFiles, input.attachedNames);
  const stateOf: StateOf = label => files.find(f => f.label === label)?.state;
  const herFull = fullName(a.her.firstName, a.her.lastName);
  const spFull = a.spouse ? fullName(a.spouse.firstName, a.spouse.lastName) : "";

  const lines: string[] = [];
  lines.push("שרי שלום,");
  lines.push(`<b>${esc(herFull)}</b>, טלפון ${esc(a.her.phone)}`);
  if (a.spouse) lines.push(`<b>${esc(spFull)}</b>, טלפון ${esc(a.spouse.phone)}`);
  lines.push(`מייל: ${esc(a.her.email)}`);
  const addr = addressLine(a.address);
  lines.push(`כתובת: ${esc([addr, a.address.city].filter(Boolean).join(", "))}${a.address.zip ? `, מיקוד ${esc(a.address.zip)}` : ""}`);
  lines.push(esc(MARITAL_TEXT[a.maritalStatus] || a.maritalStatus));
  const us = usCitizenLine(a);
  if (us) lines.push(esc(us));
  lines.push(...workLines(a.her.firstName || herFull, herFull, a.work.her, stateOf));
  if (a.spouse && a.work.spouse) lines.push(...workLines(a.spouse.firstName || spFull, spFull, a.work.spouse, stateOf));
  lines.push(`משכנתא: ${esc(a.mortgage.has || "לא צוין")}`);

  // Only claim what is really attached. Files she skipped are "יגיע בהמשך"; files that
  // are only in the "קבצי VIP" email are not claimed at all (pointer note on top).
  const joinHe = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ו${xs[xs.length - 1]}`);
  const attached = fileNames(files.filter(f => f.state === "attached"), files);
  const later = fileNames(files.filter(f => f.state === "missing"), files);
  if (attached.length) lines.push(esc(`${joinHe(attached)} מצורפים.`));
  if (later.length) lines.push(esc(`${joinHe(later)} - יגיע בהמשך.`));
  lines.push("אשמח בהקדם למסלקות + המלצות שלך.");
  lines.push("תודה רבה!");

  const notFetched = files.some(f => f.state === "notFetched");
  const noneAttached = !files.some(f => f.state === "attached");
  const pointer = !notFetched
    ? ""
    : noneAttached
      ? `הקבצים נמצאים במייל 'קבצי VIP - ${herFull}'`
      : `חלק מהקבצים נמצאים במייל 'קבצי VIP - ${herFull}'`;
  const note = pointer
    ? `<p style="background:#FFF8E1;border-right:4px solid #F5B400;padding:10px 14px;margin:0 0 16px;color:#7A4F00;">${esc(pointer)}</p>`
    : "";

  const html = `<!DOCTYPE html><html dir="rtl" lang="he"><head><meta charset="UTF-8"/></head><body>
<div dir="rtl" style="direction:rtl;text-align:right;font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#222;">
${note}${lines.map(l => `<div>${l}</div>`).join("\n")}
</div>
</body></html>`;
  return { subject: ogenSubject(a), html };
}

export interface OgenNoticeInput {
  fullName: string;
  phone: string;
  /** Business labels of Ogen-relevant items still pending (payslips "later"). */
  pendingOgenItems: string[];
  /** What happened to the client reminder (all pending items, not only Ogen ones). */
  reminder: ReminderStatus;
  /** false when the forward-ready "מייל לעוגן" could not be sent at all */
  ogenSent: boolean;
  /** Files that did not get through in the form (she continued without them). */
  missingFiles: string[];
  callDayLabel: string; // "יום רביעי 11.11"
  /** Subject to give the forwarded email (section 5 of the spec). */
  ogenSubject: string;
}

/** "שימי לב: מוכן לעוגן" - forward instructions + the call reminder. */
export function renderOgenNotice(input: OgenNoticeInput): RenderedEmail {
  const p = (html: string) => `<p style="margin:0 0 10px;">${html}</p>`;
  const parts: string[] = [];
  if (input.ogenSent) {
    parts.push(p(esc(`שימי לב, הפרטים לעוגן מוכנים במייל 'מייל לעוגן - ${input.fullName}'.`)));
    parts.push(p(esc(`להעביר (Forward) ל-${OGEN_TO}, עם עותק ל-${OGEN_CC}, ולשלוח בהקדם. בהצלחה!`)));
    if (input.ogenSubject) parts.push(p(`<span style="color:#666;font-size:13px;">${esc(`נושא להעברה: ${input.ogenSubject}`)}</span>`));
  } else {
    parts.push(p(`<b style="color:#991B1B;">${esc(`המייל לעוגן לא נשלח בגלל תקלה - הפרטים במייל 'לקוחת VIP חדשה - ${input.fullName}'`)}</b>`));
    parts.push(p(esc(`לשלוח לעוגן ידנית ל-${OGEN_TO}, עם עותק ל-${OGEN_CC}${input.ogenSubject ? `, בנושא: ${input.ogenSubject}` : ""}.`)));
  }
  const problem = reminderProblemText(input.reminder);
  const red = (text: string) => `<span style="color:#991B1B;font-weight:bold;">${esc(text)}</span>`;
  if (input.pendingOgenItems.length) {
    const when =
      input.reminder.kind === "scheduled"
        ? `${esc(`תזכורת תצא ללקוחה ב${input.reminder.dayLabel}.`)} ${esc("כשזה יגיע, תקבלי מייל, ואז לצרף ולשלוח.")}`
        : red(problem);
    parts.push(p(`<b>${esc(`חסר עדיין: ${input.pendingOgenItems.join(", ")}.`)}</b> ${when}`));
  } else if (problem) {
    parts.push(p(red(problem)));
  }
  if (input.missingFiles.length) {
    parts.push(p(`<b>${esc(`קבצים לעוגן שלא עברו בטופס: ${input.missingFiles.join(", ")}.`)}</b> ${esc("צריך לבקש אותם ממנה ולצרף לפני השליחה.")}`));
  }
  parts.push(
    `<p style="margin:16px 0 4px;background:#E8EDFF;border-radius:8px;padding:10px 14px;"><b>${esc(
      `תזכורת: לקבוע שיחה עם ${input.fullName} ל${input.callDayLabel}`,
    )}</b><br/>טלפון: ${telLink(input.phone)}</p>`,
  );

  const html = `<!DOCTYPE html><html dir="rtl" lang="he"><head><meta charset="UTF-8"/></head><body>
<div dir="rtl" style="direction:rtl;text-align:right;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#222;max-width:600px;">
${parts.join("\n")}
</div>
</body></html>`;
  return { subject: `שימי לב: מוכן לעוגן - ${input.fullName}`, html };
}

