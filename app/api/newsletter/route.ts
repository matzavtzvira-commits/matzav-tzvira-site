import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const body = new URLSearchParams({
      "fields[subscribers_email]": email,
      "form_id": process.env.RAVMESSER_FORM_ID!,
      "encoding": "UTF-8",
    });

    const res = await fetch("https://subscribe.responder.co.il", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    console.log("Responder status:", res.status, "url:", res.url);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
