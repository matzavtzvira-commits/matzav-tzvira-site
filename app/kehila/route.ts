import { NextResponse } from "next/server";
import { groupUrl } from "../group-link";

// לינק יפה וקבוע להזמנת נשים לקהילה: matzavtzvira.co.il/kehila
// מפנה (302) לאותה קבוצה פעילה כמו /join. מקור-אמת אחד ב-group-link.ts.
export function GET() {
  return NextResponse.redirect(groupUrl(), 302);
}
