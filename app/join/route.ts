import { NextResponse } from "next/server";

// לינק קבוע לקבוצת הצפייה. הדפים מצביעים ל-/join, וכאן מפנים לקבוצה הפעילה.
// כשקבוצה מתמלאת (מקסימום 1,024): פותחים קבוצה חדשה ומעדכנים את משתנה הסביבה
// WHATSAPP_GROUP_URL ב-Vercel (Settings → Environment Variables) - בלי לגעת בקוד.
// הפניה 302 (זמנית) כדי שהדפדפן לא יזכור לינק ישן אחרי החלפה.

const FALLBACK = "https://chat.whatsapp.com/KUc5iTtqUdm85W6Fnf3Tcx"; // הקבוצה הנוכחית (מאי 2026)

export function GET() {
  const url = process.env.WHATSAPP_GROUP_URL?.trim() || FALLBACK;
  return NextResponse.redirect(url, 302);
}
