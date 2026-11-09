// Calendar helpers in Israel time (Asia/Jerusalem), independent of the server's
// own time zone. A "day" is a plain { y, m, d } date in Israel.
// Business days are Sunday-Thursday.

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

export function isBusinessDay(day: Ymd): boolean {
  const w = weekday(day);
  return w !== 5 && w !== 6;
}

/** N business days (Sun-Thu) after `from`, not counting `from` itself. */
export function addBusinessDays(from: Ymd, n: number): Ymd {
  let day = from;
  let added = 0;
  while (added < n) {
    day = addDays(day, 1);
    if (isBusinessDay(day)) added++;
  }
  return day;
}

/** Saturday -> the following Sunday (never send on Shabbat). Other days unchanged. */
export function skipShabbat(day: Ymd): Ymd {
  return weekday(day) === 6 ? addDays(day, 1) : day;
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
  reminderDay: Ymd;
  reminderAt: Date; // 09:00 Israel
  followUpDay: Ymd;
  followUpAt: Date; // 09:00 Israel, the day after the reminder
}

/**
 * Reminder at 09:00 Israel time on the earliest chosen day ("מחר" = tomorrow,
 * "בעוד יומיים" = in 2 days); Saturday moves to Sunday. The business follow-up is
 * the day after the reminder at 09:00, again never on Saturday.
 */
export function reminderSchedule(choices: ReminderChoice[], now: Date = new Date()): ReminderSchedule {
  const offsets = choices.length ? choices.map(choiceOffset) : [1];
  const today = israelYmd(now);
  const reminderDay = skipShabbat(addDays(today, Math.min(...offsets)));
  const followUpDay = skipShabbat(addDays(reminderDay, 1));
  return {
    reminderDay,
    reminderAt: israelTimeToDate(reminderDay, 9),
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
