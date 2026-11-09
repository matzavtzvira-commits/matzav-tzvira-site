// The questionnaire as labeled sections, shared by the HTML emails and the plain
// text that goes to the dashboard client file. Values are raw text here.
import type { Answers, Item, Work } from "./types";
import { fullName, isSalaried } from "./normalize";
import { money } from "./html";
import { payslipLabel } from "./pending";

export interface ViewRow {
  label: string;
  value: string;
  kind?: "tel" | "mail";
}

export interface ViewSection {
  title: string;
  rows: ViewRow[];
}

const r = (label: string, value: string, kind?: ViewRow["kind"]): ViewRow => ({ label, value, kind });

function remindText(remind: string): string {
  return remind ? `תשלח בהמשך (תזכורת: ${remind})` : "תשלח בהמשך";
}

export function addressLine(a: Answers["address"]): string {
  const parts = [[a.street, a.houseNumber].filter(Boolean).join(" ")];
  if (a.entrance) parts.push(`כניסה ${a.entrance}`);
  if (a.floor) parts.push(`קומה ${a.floor}`);
  if (a.apartment) parts.push(`דירה ${a.apartment}`);
  return parts.filter(Boolean).join(", ");
}

/** missingFiles holds the labels of files that did not get through (maybe with extra text). */
export function missingChecker(missingFiles: string[]): (label: string) => boolean {
  return (label: string) => missingFiles.some(m => m === label || m.startsWith(label));
}

type IsMissing = (label: string) => boolean;

/** ח"פ / payslip status of one employer, e.g. 'בית ספר אורות - ח"פ 512345678'. */
export function employerValue(e: Work["employers"][number], missing: IsMissing, payslipLabelText: string): string {
  const name = e.name || "לא צוין שם";
  if (e.idMode === "hp") return `${name} - ח"פ ${e.hp || "לא צוין"}`;
  if (e.idMode === "payslip") {
    return missing(payslipLabelText) ? `${name} - תלוש שכר לא עבר (חסר)` : `${name} - תלוש שכר הועלה`;
  }
  return `${name} - תלוש / ח"פ: ${remindText(e.remind)}`;
}

function workSection(title: string, w: Work, personFull: string, missing: IsMissing, male: boolean): ViewSection {
  const rows: ViewRow[] = [r("מצב תעסוקתי", w.status)];
  if (isSalaried(w.status)) {
    w.employers.forEach((e, i) => {
      const label = payslipLabel(personFull, e.name);
      rows.push(r(w.employers.length > 1 ? `מקום עבודה ${i + 1}` : "מקום עבודה", employerValue(e, missing, label)));
    });
  }
  if (isSalaried(w.status) || w.teacherHishtalmut) {
    rows.push(r("קרן השתלמות למורים", w.teacherHishtalmut));
    if (w.teacherHishtalmut === "כן") {
      rows.push(r("שנים בהוראה", w.teachingYears));
      rows.push(r(male ? "לקח בעבר שנת שבתון בפועל?" : "לקחה בעבר שנת שבתון בפועל?", w.sabbaticalTaken));
    }
  }
  rows.push(r("שינוי מתוכנן בשנה הקרובה", w.plannedChange.join(", ")));
  rows.push(r("הכנסה חודשית נטו", w.income));
  return { title, rows };
}

/** Pages 1-3. */
export function part1Sections(a: Answers, missingFiles: string[] = []): ViewSection[] {
  const missing = missingChecker(missingFiles);
  const herFull = fullName(a.her.firstName, a.her.lastName);
  const sections: ViewSection[] = [];

  sections.push({
    title: "פרטים אישיים",
    rows: [
      r("שם מלא", herFull),
      r("טלפון", a.her.phone, "tel"),
      r("מייל", a.her.email, "mail"),
      r("אזרחות אמריקאית", a.her.usCitizen),
      r("מצב משפחתי", a.maritalStatus),
    ],
  });

  if (a.spouse) {
    sections.push({
      title: "פרטי הבעל",
      rows: [
        r("שם מלא", fullName(a.spouse.firstName, a.spouse.lastName)),
        r("טלפון", a.spouse.phone, "tel"),
        r("אזרחות אמריקאית", a.spouse.usCitizen),
      ],
    });
  }

  sections.push({
    title: "כתובת מגורים",
    rows: [r("כתובת", addressLine(a.address)), r("עיר", a.address.city), r("מיקוד", a.address.zip)],
  });

  const mortgageRows: ViewRow[] = [r("יש משכנתא?", a.mortgage.has)];
  if (a.mortgage.has === "כן") {
    mortgageRows.push(r("מעוניינים לבדוק מחזור משכנתא?", a.mortgage.refinance));
    if (a.mortgage.refinance === "כן, בהחלט" || a.mortgage.report !== "none") {
      const report =
        a.mortgage.report === "uploaded"
          ? missing("דוח יתרות משכנתא") ? "לא עבר (חסר)" : "הועלה"
          : a.mortgage.report === "later"
            ? remindText(a.mortgage.reportRemind)
            : "לא הועלה";
      mortgageRows.push(r("דוח יתרות משכנתא", report));
    }
  }
  sections.push({ title: "משכנתא", rows: mortgageRows });

  const docRows: ViewRow[] = [r("נולד ילד אחרי שהספח הונפק?", a.documents.childAfterSefach)];
  const nc = a.documents.newChild;
  if (a.documents.childAfterSefach === "כן") {
    if (nc && nc.mode === "file") docRows.push(r("תעודת לידה", missing("תעודת לידה") ? "לא עברה (חסר)" : "הועלתה"));
    else if (nc && nc.mode === "details") {
      docRows.push(r("שם הילד/ה", nc.name), r("ת\"ז הילד/ה", nc.idNumber), r("תאריך לידה", nc.dob));
    } else docRows.push(r("תעודת לידה / פרטים", ""));
  }
  docRows.push(r("לילדים יש אזרחות אמריקאית?", a.documents.childrenUsCitizen));
  sections.push({ title: "מסמכים", rows: docRows });

  sections.push(workSection(`עבודה - ${a.her.firstName || "הלקוחה"}`, a.work.her, herFull, missing, false));
  if (a.spouse && a.work.spouse) {
    const spFull = fullName(a.spouse.firstName, a.spouse.lastName);
    sections.push(workSection(`עבודה - ${a.spouse.firstName || "הבעל"} (הבעל)`, a.work.spouse, spFull, missing, true));
  }
  return sections;
}

function itemValue(it: Item, opts: { amountLabel?: string; untilLabel?: string } = {}): string {
  if (!it.has) return "";
  if (it.has !== "יש") return it.has;
  const parts = ["יש"];
  const amountLabel = opts.amountLabel || "סכום";
  parts.push(`${amountLabel}: ${it.amountUnknown ? "לא יודעת" : money(it.amount) || "לא צוין"}`);
  if (it.monthly) parts.push(`${opts.amountLabel === "יתרה" ? "החזר חודשי" : "הפקדה חודשית"}: ${money(it.monthly)}`);
  if (it.until) parts.push(`${opts.untilLabel || "עד"}: ${it.until}`);
  if (it.where) parts.push(`איפה: ${it.where}`);
  if (it.purpose) parts.push(`למה: ${it.purpose}`);
  return parts.join(" | ");
}

/** Pages 4-6 (empty when the stage-final fields are missing). */
export function finalSections(a: Answers): ViewSection[] {
  const sections: ViewSection[] = [];
  if (a.savings) {
    const s = a.savings;
    sections.push({
      title: "חסכונות (של המשפחה כולה)",
      rows: [
        r("יתרה ממוצעת בעו\"ש", s.checking),
        r("פיקדון או פק\"מ בבנק", itemValue(s.deposit, { untilLabel: "משתחרר" })),
        r("תוכנית חיסכון בבנק", itemValue(s.savingsPlan, { untilLabel: "מסתיימת" })),
        r("חיסכון לילדים בבנק (לא \"חיסכון לכל ילד\")", itemValue(s.kidsBank)),
        r("חשבון מסחר, תיק השקעות או קרן כספית", itemValue(s.trading)),
        r("קופה בקהילה, גמ\"ח או קופת שמחות", itemValue(s.community)),
        r("כסף בצד - מזומן או מט\"ח", itemValue(s.cash)),
        r("כסף שכבר מיועד למשהו מסוים", itemValue(s.earmarked)),
      ],
    });
  }
  if (a.loans) {
    const l = a.loans;
    const rows = [
      r("הלוואות בנק", itemValue(l.bank, { amountLabel: "יתרה" })),
      r("הלוואות גמ\"ח", itemValue(l.gemach, { amountLabel: "יתרה" })),
      r("הלוואה על פנסיה, השתלמות או גמל - שלה", l.pensionLoanHer),
    ];
    if (a.spouse) rows.push(r("הלוואה על פנסיה, השתלמות או גמל - של הבעל", l.pensionLoanSpouse || ""));
    sections.push({ title: "הלוואות", rows });
  }
  if (a.simchas) {
    const s = a.simchas;
    sections.push({
      title: "שמחות ויעדים",
      rows: [
        r("תקציב משוער לחתונה של בן", s.weddingBudgetSon),
        r("גיל חתונה של הבנים", s.weddingAgeSons),
        r("תקציב משוער לחתונה של בת", s.weddingBudgetDaughter),
        r("גיל חתונה של הבנות", s.weddingAgeDaughters),
        r("תקציב משוער לבר/בת מצווה", s.barMitzvahBudget),
        r("קרן ההשתלמות מיועדת לשמחות?", s.hishtalmutForSimchas),
        r("כמה אפשר להפריש בחודש להשקעה", s.monthlyInvest),
      ],
    });
  }
  if (a.prefs) {
    const p = a.prefs;
    sections.push({
      title: "העדפות וסיום",
      rows: [
        r("חשוב שהמסלולים יהיו כשרים?", p.kosher),
        r("אם הכסף יורד ב-10% בשנה מסוימת", p.risk),
        r("המטרה העיקרית מהליווי", p.goal),
        r("משהו נוסף שחשוב לה שנדע", p.notes),
        r(
          "הצהרה",
          p.declaration
            ? `אושרה: מילאה את כל מה שידוע לה. מידע שיגיע אחרי ${p.cutoffDate || "התאריך"} לא ייכלל בתוכנית הנוכחית.`
            : "לא אושרה",
        ),
      ],
    });
  }
  return sections;
}

/** Plain text for the dashboard client file. */
export function sectionsToText(sections: ViewSection[]): string {
  return sections
    .map(s => [`== ${s.title} ==`, ...s.rows.map(row => `${row.label}: ${row.value || "לא צוין"}`)].join("\n"))
    .join("\n\n");
}
