// TEMPORARY (9.11.2026): one-off check of the Ogen Gmail draft on production, where
// GMAIL_APP_PASSWORD lives. Creates a draft "בדיקה - לא לשלוח" only. Remove after the test.
import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createOgenDraft } from "@/lib/vip/gmail-draft";
import { normalizeAnswers } from "@/lib/vip/normalize";
import { renderOgenEmail } from "@/lib/vip/render-ogen";
import { toAttachment } from "@/lib/vip/mail";

const TOKEN_SHA256 = "a6ec5510141b57e669f1bdefc25da884389c1847ccc51f5ca253919fbd27db75";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-test-token") || "";
  if (createHash("sha256").update(token).digest("hex") !== TOKEN_SHA256) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  const answers = normalizeAnswers({
    her: { firstName: "בדיקה", lastName: "טסט", phone: "050-0000000", email: "test@example.com", usCitizen: "לא" },
    maritalStatus: "רווקה",
    address: { street: "רחוב בדיקה", houseNumber: "1", city: "בני ברק" },
  });
  const mail = renderOgenEmail({ answers, missingFiles: [], attachedNames: ['ת"ז - בדיקה טסט - test.txt'], forDraft: true });
  const att = toAttachment('ת"ז - בדיקה טסט - test.txt', Buffer.from("קובץ בדיקה - לא לשלוח", "utf8"), "text/plain");
  const input = { subject: "בדיקה - לא לשלוח", html: mail.html, attachments: [att], submissionId: "ogen-draft-test-20261109" };
  const first = await createOgenDraft(input);
  const second = first.ok ? await createOgenDraft(input) : null; // must come back as a duplicate
  return NextResponse.json({ first, second });
}
