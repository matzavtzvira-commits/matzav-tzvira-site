import { NextResponse } from "next/server";
import { groupUrl } from "../group-link";

// לינק קבוע לקבוצה. הפניה 302 (זמנית) כדי שהדפדפן לא יזכור לינק ישן אחרי החלפת קבוצה.
export function GET() {
  return NextResponse.redirect(groupUrl(), 302);
}
