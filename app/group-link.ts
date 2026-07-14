// מקור-אמת יחיד לכתובת קבוצת הווטסאפ הפעילה.
// כל הלינקים הקבועים (/join, /קהילה) מפנים לכאן. כשקבוצה מתמלאת (מקס' 1,024):
// פותחים קבוצה חדשה ומעדכנים את משתנה הסביבה WHATSAPP_GROUP_URL ב-Vercel
// (Settings → Environment Variables) - בלי לגעת בקוד, וכל הלינקים מתעדכנים יחד.

export function groupUrl(): string {
  return (
    process.env.WHATSAPP_GROUP_URL?.trim() ||
    "https://chat.whatsapp.com/KUc5iTtqUdm85W6Fnf3Tcx" // הקבוצה הנוכחית (יולי 2026)
  );
}
