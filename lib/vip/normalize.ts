// Coerces the JSON the browser sent into the typed shapes, so the renderers never
// crash on a missing or odd field. Values stay raw text (escaping happens at render).
import type {
  Answers, Employer, Item, NewChild, Person, RemindChoice, TaxDoc, TaxRequest, Work,
} from "./types";

type Obj = Record<string, unknown>;

const MAX_TEXT = 3000;

export function str(v: unknown, max = MAX_TEXT): string {
  if (v === null || v === undefined) return "";
  if (typeof v !== "string" && typeof v !== "number" && typeof v !== "boolean") return "";
  const s = String(v).trim();
  return s.length > max ? s.slice(0, max) : s;
}

export function strArr(v: unknown, maxItems = 30, maxLen = 300): string[] {
  if (!Array.isArray(v)) return [];
  return v.map(x => str(x, maxLen)).filter(Boolean).slice(0, maxItems);
}

function obj(v: unknown): Obj {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Obj) : {};
}

function remind(v: unknown): RemindChoice {
  const s = str(v);
  return s === "מחר" || s === "בעוד יומיים" ? s : "";
}

function yesNoEmpty(v: unknown): "" | "כן" | "לא" {
  const s = str(v);
  return s === "כן" || s === "לא" ? s : "";
}

function person(v: unknown): Person {
  const o = obj(v);
  return { firstName: str(o.firstName, 80), lastName: str(o.lastName, 80), phone: str(o.phone, 40), usCitizen: str(o.usCitizen, 40) };
}

function employer(v: unknown): Employer {
  const o = obj(v);
  const mode = str(o.idMode);
  return {
    name: str(o.name, 120),
    idMode: mode === "hp" || mode === "payslip" || mode === "later" ? mode : "later",
    hp: str(o.hp, 30),
    remind: remind(o.remind),
  };
}

function work(v: unknown): Work {
  const o = obj(v);
  return {
    status: str(o.status, 60),
    employers: Array.isArray(o.employers) ? o.employers.slice(0, 4).map(employer) : [],
    teacherHishtalmut: yesNoEmpty(o.teacherHishtalmut),
    teachingYears: str(o.teachingYears, 10),
    sabbaticalTaken: yesNoEmpty(o.sabbaticalTaken),
    plannedChange: strArr(o.plannedChange, 10, 60),
    income: str(o.income, 60),
  };
}

function item(v: unknown): Item {
  const o = obj(v);
  return {
    has: str(o.has, 20),
    amount: str(o.amount, 40),
    amountUnknown: o.amountUnknown === true,
    monthly: str(o.monthly, 40),
    until: str(o.until, 80),
    where: str(o.where, 120),
    purpose: str(o.purpose, 300),
  };
}

function newChild(v: unknown): NewChild {
  const o = obj(v);
  if (o.mode === "file") return { mode: "file" };
  if (o.mode === "details") {
    return { mode: "details", name: str(o.name, 80), idNumber: str(o.idNumber, 20), dob: str(o.dob, 20) };
  }
  return null;
}

/** Status includes "שכיר" / "שכירה" (also "שכירה ועצמאית"). */
export function isSalaried(status: string): boolean {
  return status.includes("שכיר");
}

export function isMarried(maritalStatus: string): boolean {
  return maritalStatus === "נשואה";
}

export function fullName(first: string, last: string): string {
  return [first, last].map(s => (s || "").trim()).filter(Boolean).join(" ");
}

export function normalizeAnswers(raw: unknown): Answers {
  const o = obj(raw);
  const her = obj(o.her);
  const maritalStatus = str(o.maritalStatus, 30);
  const married = isMarried(maritalStatus);
  const address = obj(o.address);
  const mortgage = obj(o.mortgage);
  const documents = obj(o.documents);
  const w = obj(o.work);
  const report = str(mortgage.report);

  const a: Answers = {
    v: 2,
    her: {
      firstName: str(her.firstName, 80),
      lastName: str(her.lastName, 80),
      phone: str(her.phone, 40),
      email: str(her.email, 200),
      usCitizen: str(her.usCitizen, 40),
    },
    maritalStatus,
    address: {
      street: str(address.street, 120),
      houseNumber: str(address.houseNumber, 20),
      city: str(address.city, 80),
      zip: str(address.zip, 20),
      entrance: str(address.entrance, 20),
      floor: str(address.floor, 20),
      apartment: str(address.apartment, 20),
    },
    mortgage: {
      has: str(mortgage.has, 10),
      refinance: str(mortgage.refinance, 40),
      report: report === "uploaded" || report === "later" ? report : "none",
      reportRemind: remind(mortgage.reportRemind),
    },
    documents: {
      childAfterSefach: str(documents.childAfterSefach, 10),
      newChild: newChild(documents.newChild),
      childrenUsCitizen: str(documents.childrenUsCitizen, 40),
    },
    work: { her: work(w.her) },
  };
  if (married) {
    a.spouse = person(o.spouse);
    a.work.spouse = work(w.spouse);
  }

  if (o.savings) {
    const s = obj(o.savings);
    a.savings = {
      checking: str(s.checking, 60),
      deposit: item(s.deposit),
      savingsPlan: item(s.savingsPlan),
      kidsBank: item(s.kidsBank),
      trading: item(s.trading),
      community: item(s.community),
      cash: item(s.cash),
      earmarked: item(s.earmarked),
    };
  }
  if (o.loans) {
    const l = obj(o.loans);
    a.loans = {
      bank: item(l.bank),
      gemach: item(l.gemach),
      pensionLoanHer: str(l.pensionLoanHer, 20),
      ...(married ? { pensionLoanSpouse: str(l.pensionLoanSpouse, 20) } : {}),
    };
  }
  if (o.simchas) {
    const s = obj(o.simchas);
    a.simchas = {
      weddingBudgetSon: str(s.weddingBudgetSon, 60),
      weddingAgeSons: str(s.weddingAgeSons, 60),
      weddingBudgetDaughter: str(s.weddingBudgetDaughter, 60),
      weddingAgeDaughters: str(s.weddingAgeDaughters, 60),
      barMitzvahBudget: str(s.barMitzvahBudget, 60),
      hishtalmutForSimchas: str(s.hishtalmutForSimchas, 60),
      monthlyInvest: str(s.monthlyInvest, 60),
    };
  }
  if (o.prefs) {
    const p = obj(o.prefs);
    a.prefs = {
      kosher: str(p.kosher, 30),
      risk: str(p.risk, 100),
      goal: str(p.goal),
      notes: str(p.notes),
      declaration: p.declaration === true,
      cutoffDate: str(p.cutoffDate, 20),
    };
  }
  return a;
}

export function normalizeTaxRequest(raw: unknown): TaxRequest {
  const o = obj(raw);
  const docs: TaxDoc[] = Array.isArray(o.docs)
    ? o.docs.slice(0, 40).map(d => {
        const x = obj(d);
        const status = str(x.status);
        return {
          key: str(x.key, 40),
          label: str(x.label, 120),
          status: status === "later" || status === "already" ? status : "uploaded",
        } as TaxDoc;
      }).filter(d => d.key && d.label)
    : [];
  const firstName = str(o.firstName, 80);
  const lastName = str(o.lastName, 80);
  return {
    name: str(o.name, 160) || fullName(firstName, lastName),
    email: str(o.email, 200),
    phone: str(o.phone, 40),
    firstName,
    lastName,
    maritalStatus: str(o.maritalStatus, 30),
    spouseFirstName: str(o.spouseFirstName, 80),
    wantTax: str(o.wantTax) === "כן" ? "כן" : "לא",
    emp: strArr(o.emp),
    family: strArr(o.family),
    finance: strArr(o.finance),
    docs,
    notes: str(o.notes),
    consent: o.consent === true,
    missingFiles: strArr(o.missingFiles, 40, 200),
  };
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
