// Gives every post in content/blog that has no publishDate yet the next free day,
// one post per day, never on Saturday (Shabbat). Oldest email first.
//   node scripts/schedule-blog.mjs                     -> starts the day after the last scheduled post (or tomorrow)
//   node scripts/schedule-blog.mjs 2026-11-16 3        -> starts on that date, 3 posts on the first day
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SRC = join(process.cwd(), "content", "blog");
const [startArg, firstDayCountArg] = process.argv.slice(2);
const firstDayCount = Number(firstDayCountArg) || 1;

const files = readdirSync(SRC).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
const read = (f) => readFileSync(join(SRC, f), "utf8").replace(/^﻿/, "").replace(/\r\n/g, "\n");
const field = (raw, k) => (raw.match(new RegExp(`^${k}:\\s*(.+)$`, "m")) || [])[1]?.trim();

const addDays = (iso, n) => { const d = new Date(iso + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const isSaturday = (iso) => new Date(iso + "T12:00:00Z").getUTCDay() === 6;
const todayIL = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jerusalem" }).format(new Date());

const scheduled = files.map((f) => field(read(f), "publishDate")).filter(Boolean).sort();
let day = startArg || (scheduled.length ? addDays(scheduled[scheduled.length - 1], 1) : addDays(todayIL, 1));

const pending = files
  .map((f) => ({ f, raw: read(f) }))
  .filter(({ raw }) => !field(raw, "publishDate"))
  .sort((a, b) => (field(a.raw, "originalDate") || "").localeCompare(field(b.raw, "originalDate") || ""));

let onThisDay = 0;
let capacity = firstDayCount;
for (const { f, raw } of pending) {
  while (isSaturday(day)) day = addDays(day, 1);
  const updated = raw.replace(/^(originalDate:.*)$/m, `$1\npublishDate: ${day}`);
  writeFileSync(join(SRC, f), updated, "utf8");
  console.log(`${day}  ${f}`);
  if (++onThisDay >= capacity) { day = addDays(day, 1); onThisDay = 0; capacity = 1; }
}
console.log(`${pending.length} posts scheduled.`);
