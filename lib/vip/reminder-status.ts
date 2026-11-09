// What happened to the client reminder, as shown in the business emails.

export type ReminderStatus =
  | { kind: "none" } // nothing pending
  | { kind: "scheduled"; dayLabel: string } // "יום שלישי 10.11"
  | { kind: "nomatch" } // she is not in the dashboard -> not scheduled on purpose
  | { kind: "error" }; // scheduling failed

export const REMINDER_NOMATCH_TEXT =
  "התזכורת ללקוחה לא נקבעה כי היא לא נמצאה בדשבורד (מייל או טלפון שונים מהתשלום?) - צריך לבקש ממנה ישירות.";
export const REMINDER_ERROR_TEXT = "התזכורת ללקוחה לא נקבעה בגלל תקלה - צריך לבקש ממנה ישירות";

/** The red line for a reminder that was not scheduled, or "" when there is nothing to warn about. */
export function reminderProblemText(s: ReminderStatus): string {
  return s.kind === "nomatch" ? REMINDER_NOMATCH_TEXT : s.kind === "error" ? REMINDER_ERROR_TEXT : "";
}
