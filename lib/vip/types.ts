// Shapes sent by public/vip-onboarding.html (v2). Strings are the exact Hebrew
// option texts shown in the form; an unanswered optional field is "".

export type YesNo = "כן" | "לא";
export type RemindChoice = "" | "מחר" | "בעוד יומיים";

export interface Person {
  firstName: string;
  lastName: string;
  phone: string;
  usCitizen: string;
}

export interface Her extends Person {
  email: string;
}

export interface Address {
  street: string;
  houseNumber: string;
  city: string;
  zip: string;
  entrance: string;
  floor: string;
  apartment: string;
}

export interface Mortgage {
  has: string; // "כן" | "לא"
  refinance: string;
  report: "uploaded" | "later" | "none";
  reportRemind: RemindChoice;
}

export type NewChild =
  | null
  | { mode: "file" }
  | { mode: "details"; name: string; idNumber: string; dob: string };

/** The kids question at the top of the documents page (exact option texts). */
export const KIDS_YOUNG = "יש ילדים מתחת לגיל 18";
export const KIDS_ADULT = "כל הילדים מעל 18, חלק עוד לא התחתנו";
export const KIDS_NONE = "כל הילדים נשואים, או שאין ילדים";

export interface Documents {
  /** "" in forms sent before the question existed (then every kids question was asked). */
  kidsStage: string;
  childAfterSefach: string; // "כן" | "לא" | "" (not asked)
  newChild: NewChild;
  childrenUsCitizen: string;
}

export interface Employer {
  name: string;
  idMode: "hp" | "payslip" | "later";
  hp: string;
  remind: RemindChoice;
}

export interface Work {
  status: string;
  employers: Employer[];
  teacherHishtalmut: "" | "כן" | "לא";
  teachingYears: string;
  sabbaticalTaken: "" | "כן" | "לא";
  plannedChange: string[];
  income: string;
}

export interface Item {
  has: string; // "יש" | "אין" | "לא יודעת"
  amount: string;
  amountUnknown: boolean;
  monthly: string;
  until: string;
  where: string;
  purpose: string;
}

export interface Savings {
  checking: string;
  deposit: Item;
  savingsPlan: Item;
  kidsBank: Item;
  trading: Item;
  community: Item;
  cash: Item;
  earmarked: Item;
}

export interface Loans {
  bank: Item;
  gemach: Item;
  pensionLoanHer: string;
  pensionLoanSpouse?: string;
}

export interface Simchas {
  weddingBudgetSon: string;
  weddingAgeSons: string;
  weddingBudgetDaughter: string;
  weddingAgeDaughters: string;
  barMitzvahBudget: string;
  hishtalmutForSimchas: string;
  monthlyInvest: string;
}

export interface Prefs {
  kosher: string;
  risk: string;
  goal: string;
  notes: string;
  declaration: boolean;
  cutoffDate: string; // d.m.yyyy
}

export interface Answers {
  v: 2;
  her: Her;
  maritalStatus: string; // "נשואה" | "רווקה" | "חד הורית"
  spouse?: Person;
  address: Address;
  mortgage: Mortgage;
  documents: Documents;
  work: { her: Work; spouse?: Work };
  // Only in stage "final":
  savings?: Savings;
  loans?: Loans;
  simchas?: Simchas;
  prefs?: Prefs;
}

export type TaxDocStatus = "uploaded" | "later" | "already";

export interface TaxDoc {
  key: string;
  label: string;
  status: TaxDocStatus;
}

export interface TaxRequest {
  name: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  maritalStatus: string;
  spouseFirstName: string;
  wantTax: "כן" | "לא";
  emp: string[];
  family: string[];
  finance: string[];
  docs: TaxDoc[];
  notes: string;
  consent: boolean;
  missingFiles: string[];
}

// ---- Reminder link token ----

export interface TokenItem {
  id: string; // upload field id, e.g. "payslip_her_1", "mortgageReport", "forms106"
  label: string; // file label used for the email attachment + dashboard (e.g. 'תלוש שכר - שרה כהן - בית ספר')
  kind: "payslip" | "doc";
  person: "her" | "spouse" | "";
  employer: string;
}

export interface TokenPayload {
  v: 1;
  e: string; // email
  n: string; // full name
  ph: string; // phone
  fn: string; // her first name
  ln: string; // last name
  sp: string; // spouse first name or ""
  m: boolean; // married
  it: TokenItem[];
  fu: string; // follow-up email id (Resend) to cancel when everything arrived
  rm?: string[]; // later reminders still scheduled (two-reminder case) - cancelled too
  st: "part1" | "tax";
  x: number; // expiry, epoch seconds
}
