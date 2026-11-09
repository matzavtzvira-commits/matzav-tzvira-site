// Calendar helpers in Israel time (Asia/Jerusalem), independent of the server's
// own time zone. A "day" is a plain { y, m, d } date in Israel.
// Rest days: Shabbat and the chagim (Rosh Hashana, Yom Kippur, Sukkot through Shemini
// Atzeret, Pesach, Shavuot). Business days are Sunday-Thursday that are not chagim.
// Nothing is ever scheduled on a rest day.

export const TZ = "Asia/Jerusalem";

export interface Ymd {
  y: number;
  m: number; // 1-12
  d: number;
}

const HE_WEEKDAYS = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

const partsFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TZ,
  hourCycle: "h23",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

function zonedParts(date: Date) {
  const out: Record<string, number> = {};
  for (const p of partsFormatter.formatToParts(date)) {
    if (p.type !== "literal") out[p.type] = Number(p.value);
  }
  return {
    y: out.year,
    m: out.month,
    d: out.day,
    hour: out.hour === 24 ? 0 : out.hour,
    minute: out.minute,
    second: out.second,
  };
}

/** The Israel calendar date of an instant. */
export function israelYmd(now: Date = new Date()): Ymd {
  const p = zonedParts(now);
  return { y: p.y, m: p.m, d: p.d };
}

/** 0 = Sunday ... 6 = Saturday. */
export function weekday(day: Ymd): number {
  return new Date(Date.UTC(day.y, day.m - 1, day.d)).getUTCDay();
}

export function addDays(day: Ymd, n: number): Ymd {
  const t = new Date(Date.UTC(day.y, day.m - 1, day.d + n));
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
}

let hebrewFormatter: Intl.DateTimeFormat | null | undefined;
function hebrewDate(day: Ymd): { month: string; day: number } | null {
  if (hebrewFormatter === undefined) {
    try {
      hebrewFormatter = new Intl.DateTimeFormat("en-u-ca-hebrew", { timeZone: "UTC", day: "numeric", month: "long" });
    } catch {
      hebrewFormatter = null;
    }
  }
  if (!hebrewFormatter) return null;
  const parts = hebrewFormatter.formatToParts(new Date(Date.UTC(day.y, day.m - 1, day.d)));
  const month = parts.find(x => x.type === "month")?.value || "";
  const d = Number(parts.find(x => x.type === "day")?.value);
  return month && Number.isFinite(d) ? { month, day: d } : null;
}

/**
 * A chag (Israel): 1-2 Tishri (Rosh Hashana), 10 Tishri (Yom Kippur), 15-22 Tishri
 * (Sukkot incl. chol hamoed, through Shemini Atzeret), 15-21 Nisan (Pesach incl. chol
 * hamoed), 6 Sivan (Shavuot). Uses the Intl Hebrew calendar; false if it is unavailable.
 */
export function isHoliday(day: Ymd): boolean {
  try {
    const h = hebrewDate(day);
    if (!h) return false;
    if (h.month === "Tishri") return h.day === 1 || h.day === 2 || h.day === 10 || (h.day >= 15 && h.day <= 22);
    if (h.month === "Nisan") return h.day >= 15 && h.day <= 21;
    if (h.month === "Sivan") return h.day === 6;
    return false;
  } catch {
    return false;
  }
}

/** Shabbat or chag - no email is ever scheduled on it. */
export function isRestDay(day: Ymd): boolean {
  return weekday(day) === 6 || isHoliday(day);
}

/** Sunday-Thursday and not a chag. */
export function isBusinessDay(day: Ymd): boolean {
  const w = weekday(day);
  return w !== 5 && w !== 6 && !isHoliday(day);
}

/** -1 / 0 / 1 */
export function compareYmd(a: Ymd, b: Ymd): number {
  const d = Date.UTC(a.y, a.m - 1, a.d) - Date.UTC(b.y, b.m - 1, b.d);
  return d < 0 ? -1 : d > 0 ? 1 : 0;
}

/** The first day after `day` that is not a rest day. */
export function nextNonRestDay(day: Ymd): Ymd {
  let d = addDays(day, 1);
  for (let i = 0; i < 60 && isRestDay(d); i++) d = addDays(d, 1);
  return d;
}

/** The last day before `day` that is not a rest day (Friday / erev chag). */
export function prevNonRestDay(day: Ymd): Ymd {
  let d = addDays(day, -1);
  for (let i = 0; i < 60 && isRestDay(d); i++) d = addDays(d, -1);
  return d;
}

/** N business days (Sun-Thu, not chag) after `from`, not counting `from` itself. */
export function addBusinessDays(from: Ymd, n: number): Ymd {
  let day = from;
  let added = 0;
  while (added < n) {
    day = addDays(day, 1);
    if (isBusinessDay(day)) added++;
  }
  return day;
}


/** The UTC instant of a wall-clock time in Israel. */
export function israelTimeToDate(day: Ymd, hour: number, minute = 0): Date {
  const wallAsUtc = Date.UTC(day.y, day.m - 1, day.d, hour, minute);
  let guess = wallAsUtc;
  // Two passes settle the offset also next to a DST switch.
  for (let i = 0; i < 2; i++) {
    const p = zonedParts(new Date(guess));
    const shownAsUtc = Date.UTC(p.y, p.m - 1, p.d, p.hour, p.minute, p.second);
    guess += wallAsUtc - shownAsUtc;
  }
  return new Date(guess);
}

/** "9.11.2026" */
export function formatDmy(day: Ymd): string {
  return `${day.d}.${day.m}.${day.y}`;
}

/** "יום שלישי 11.11" */
export function formatDayLabel(day: Ymd): string {
  return `יום ${HE_WEEKDAYS[weekday(day)]} ${day.d}.${day.m}`;
}

/**
 * The reminder day(s) for a sentence that puts "ב" in front:
 * one -> "יום שלישי 10.11"; two -> "יום שישי 13.11 ושוב ביום ראשון 15.11".
 */
export function formatReminderDays(days: Ymd[]): string {
  return days.map((d, i) => (i === 0 ? formatDayLabel(d) : `ושוב ב${formatDayLabel(d)}`)).join(" ");
}

/** Cut-off date shown in the declaration on page 6: 3 business days after today. */
export function cutoffDate(now: Date = new Date()): string {
  return formatDmy(addBusinessDays(israelYmd(now), 3));
}

/** The day to call the client: 2 business days from today. */
export function callDay(now: Date = new Date()): Ymd {
  return addBusinessDays(israelYmd(now), 2);
}

export type ReminderChoice = "מחר" | "בעוד יומיים" | "";

function choiceOffset(choice: ReminderChoice): number {
  return choice === "בעוד יומיים" ? 2 : 1; // "מחר" and anything unknown -> tomorrow
}

export interface ReminderSchedule {
  /** today + the earliest chosen offset */
  targetDay: Ymd;
  /** 1 or 2 days, chronological; never a rest day */
  reminderDays: Ymd[];
  /** 09:00 Israel on each reminder day */
  reminderAts: Date[];
  /** first non-rest day after the last reminder */
  followUpDay: Ymd;
  followUpAt: Date; // 09:00 Israel
}

/**
 * Target = today + the earliest chosen offset ("מחר" = 1, "בעוד יומיים" = 2; tax = 1).
 * Target not a rest day -> one reminder that day. Target a rest day (Shabbat / chag) ->
 * two reminders: the last non-rest day before it (Friday / erev chag) and the first
 * non-rest day after it; the one before is skipped when it is not after today.
 * The business follow-up is the first non-rest day after the last reminder. All 09:00.
 */
export function reminderSchedule(choices: ReminderChoice[], now: Date = new Date()): ReminderSchedule {
  const offsets = choices.length ? choices.map(choiceOffset) : [1];
  const today = israelYmd(now);
  const targetDay = addDays(today, Math.min(...offsets));
  let reminderDays: Ymd[];
  if (!isRestDay(targetDay)) reminderDays = [targetDay];
  else {
    const before = prevNonRestDay(targetDay);
    const after = nextNonRestDay(targetDay);
    reminderDays = compareYmd(before, today) > 0 ? [before, after] : [after];
  }
  const followUpDay = nextNonRestDay(reminderDays[reminderDays.length - 1]);
  return {
    targetDay,
    reminderDays,
    reminderAts: reminderDays.map(d => israelTimeToDate(d, 9)),
    followUpDay,
    followUpAt: israelTimeToDate(followUpDay, 9),
  };
}

/**
 * Token expiry (epoch seconds): 00:00 Israel time, `days` days after today. Depends
 * only on the Israel date, so a retried request builds a byte-identical token.
 */
export function tokenExpiry(days: number, now: Date = new Date()): number {
  return Math.floor(israelTimeToDate(addDays(israelYmd(now), days), 0).getTime() / 1000);
}

/** "9 בנובמבר 2026, 14:05" - header line of business emails. */
export function nowLabel(now: Date = new Date()): string {
  return now.toLocaleDateString("he-IL", {
    timeZone: TZ,
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
