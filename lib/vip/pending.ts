// "Send later" items: which ones are pending, how they are named for the client,
// for the business and for the uploaded file's label.
import type { Answers, RemindChoice, TaxDoc, TokenItem, TokenPayload } from "./types";
import { fullName, isSalaried } from "./normalize";
import { MAX_LABEL_LENGTH } from "./config";

export interface PendingItem extends TokenItem {
  remind: RemindChoice;
}

export const TAX_LABEL_PREFIX = "החזר מס - ";

/** Server-built labels stay within the 120 chars the file routes accept. */
export function capLabel(label: string): string {
  return label.length > MAX_LABEL_LENGTH ? label.slice(0, MAX_LABEL_LENGTH).trimEnd() : label;
}

export function payslipLabel(personFull: string, employer: string): string {
  return capLabel(["תלוש שכר", personFull, employer].filter(s => s && s.trim()).join(" - "));
}

/** The 13 tax-refund documents (spec): key -> Hebrew label. */
export const TAX_DOC_LABELS: Readonly<Record<string, string>> = {
  forms106: "טופס 106",
  annualReports: "דוח שנתי של העסק",
  bituachLeumi: "ריכוז תשלומים מביטוח לאומי",
  birthCertTax: "תעודת לידה",
  degree: "תעודת תואר",
  settlement: "אישור תושב מהמועצה",
  specialEd: "החלטת ועדת השמה",
  disability: "אישור רפואי",
  lifeIns: "אישור שנתי ביטוח חיים פרטי",
  mortgageIns: "אישור שנתי ביטוח חיים למשכנתא",
  pension: "אישור שנתי פנסיה/גמל",
  form867: "טופס 867",
  propertyTax: "שומת מס שבח",
};

/**
 * Maps the browser's docs to the known documents: "forms106_2" -> "forms106", label
 * always from TAX_DOC_LABELS (never the client-sent one), unknown keys dropped, one
 * entry per document (first one wins).
 */
export function canonicalTaxDocs(docs: TaxDoc[]): TaxDoc[] {
  const out = new Map<string, TaxDoc>();
  for (const d of docs) {
    const key = String(d.key || "").replace(/_\d+$/, "");
    if (!Object.prototype.hasOwnProperty.call(TAX_DOC_LABELS, key) || out.has(key)) continue;
    out.set(key, { key, label: TAX_DOC_LABELS[key], status: d.status });
  }
  return [...out.values()];
}

/** Payslips marked "אשלח בהמשך" + the mortgage report marked "later". */
export function part1PendingItems(a: Answers): PendingItem[] {
  const items: PendingItem[] = [];
  const herFull = fullName(a.her.firstName, a.her.lastName);
  const people: Array<{ key: "her" | "spouse"; full: string }> = [{ key: "her", full: herFull }];
  if (a.spouse && a.work.spouse) people.push({ key: "spouse", full: fullName(a.spouse.firstName, a.spouse.lastName) });

  for (const p of people) {
    const w = p.key === "her" ? a.work.her : a.work.spouse;
    if (!w || !isSalaried(w.status)) continue;
    w.employers.forEach((e, i) => {
      if (e.idMode !== "later") return;
      items.push({
        id: `payslip_${p.key}_${i + 1}`,
        label: payslipLabel(p.full, e.name),
        kind: "payslip",
        person: p.key,
        employer: e.name,
        remind: e.remind || "מחר",
      });
    });
  }
  if (a.mortgage.report === "later") {
    items.push({
      id: "mortgageReport",
      label: "דוח יתרות משכנתא",
      kind: "doc",
      person: "",
      employer: "",
      remind: a.mortgage.reportRemind || "מחר",
    });
  }
  return items;
}

/** Tax docs marked "אשלח בהמשך" (reminder is always tomorrow). */
export function taxPendingItems(docs: TaxDoc[]): PendingItem[] {
  return docs
    .filter(d => d.status === "later")
    .map(d => ({
      id: d.key,
      label: capLabel(TAX_LABEL_PREFIX + d.label),
      kind: "doc" as const,
      person: "" as const,
      employer: "",
      remind: "מחר" as const,
    }));
}

/** How many employers each person has (decides whether payslip bullets name the employer). */
export function employerCounts(a: Answers): { her: number; spouse: number } {
  const count = (w?: { status: string; employers: unknown[] }) => (w && isSalaried(w.status) ? w.employers.length : 0);
  return { her: count(a.work.her), spouse: count(a.work.spouse) };
}

/** Counts from the token items alone (used when the answers are not at hand). */
export function employerCountsFromItems(items: TokenItem[]): { her: number; spouse: number } {
  return {
    her: items.filter(i => i.kind === "payslip" && i.person === "her").length,
    spouse: items.filter(i => i.kind === "payslip" && i.person === "spouse").length,
  };
}

/** A doc item's name for the client ("טופס 106", "דוח יתרות משכנתא"). */
export function docDisplayLabel(item: TokenItem): string {
  return item.label.startsWith(TAX_LABEL_PREFIX) ? item.label.slice(TAX_LABEL_PREFIX.length) : item.label;
}

/** Short name for the business ("תלוש שכר - שרה (בית ספר אורות)", "טופס 106"). */
export function businessItemLabel(item: TokenItem, names: { fn: string; sp: string }): string {
  if (item.kind === "payslip") {
    const who = item.person === "spouse" ? names.sp || "הבעל" : names.fn || "הלקוחה";
    return `תלוש שכר - ${who}${item.employer ? ` (${item.employer})` : ""}`;
  }
  return docDisplayLabel(item);
}

export function businessItemLabels(p: Pick<TokenPayload, "it" | "fn" | "sp">): string[] {
  return p.it.map(i => businessItemLabel(i, p));
}
