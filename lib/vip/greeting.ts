// Who is the client email addressed to? Usually the woman who filled the form
// ("היי שרה," singular). When the "her" first name is really a man's name, or equals
// the husband's name, the husband filled it in -> "היי משפחת כהן," and plural text.

export const MALE_NAMES: readonly string[] = [
  "אברהם", "אברומי", "אהרון", "אהרן", "אורי", "אליהו", "אלי", "אליעזר", "אלימלך", "אלחנן", "אלעזר", "אפרים",
  "אריה", "אשר", "ארי", "בנימין", "בן ציון", "בצלאל", "ברוך", "גבריאל", "גדליה", "גד", "דב", "דוד", "דודי",
  "הלל", "הערשי", "הרשי", "זאב", "זבולון", "זלמן", "חזקיהו", "חיים", "חנוך", "חנניה", "טוביה",
  "יואל", "יוחנן", "יונתן", "יוסי", "יוסף", "יחזקאל", "יחיאל", "יהודה", "יהושע", "יענקי", "יעקב", "יצחק",
  "ירמיהו", "ישעיהו", "ישראל", "יששכר", "לוי", "מאיר", "מוטי", "מוישי", "מיכאל", "מנדי", "מנחם", "מנשה",
  "מרדכי", "משה", "נחום", "נחמן", "נפתלי", "נתן", "נתנאל", "עזריאל", "עמרם", "פנחס", "צבי", "ראובן",
  "רפאל", "שאול", "שלום", "שלמה", "שמואל", "שמוליק", "שמעון", "שמשון", "שניאור", "שרגא",
];

/** Trims, drops quotes/geresh and punctuation, collapses spaces. */
export function normalizeName(name: string): string {
  return String(name || "")
    .replace(/["'״׳`.,\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const MALE_SET = new Set(MALE_NAMES.map(normalizeName));

export function isMaleName(firstName: string): boolean {
  const n = normalizeName(firstName);
  if (!n) return false;
  if (MALE_SET.has(n)) return true;
  // "יוסף חיים", "משה דוד" - the first word decides.
  return MALE_SET.has(n.split(" ")[0]);
}

/** Plural (family) address: male first name, or the same as the husband's first name. */
export function isPluralAddress(firstName: string, spouseFirstName: string): boolean {
  if (isMaleName(firstName)) return true;
  const a = normalizeName(firstName);
  const b = normalizeName(spouseFirstName);
  return !!a && !!b && a === b;
}

export interface Greeting {
  plural: boolean;
  /** "היי שרה," / "היי משפחת כהן," (plain text, escape before using in HTML) */
  line: string;
}

export function greeting(firstName: string, lastName: string, spouseFirstName: string): Greeting {
  const first = (firstName || "").trim();
  const last = (lastName || "").trim();
  const plural = isPluralAddress(first, spouseFirstName) || (!first && !!last);
  if (plural) return { plural: true, line: last ? `היי משפחת ${last},` : "היי," };
  return { plural: false, line: first ? `היי ${first},` : "היי," };
}
