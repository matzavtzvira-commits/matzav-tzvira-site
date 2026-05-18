import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const body = new URLSearchParams({
      "fields[subscribers_email]": email,
      "form_id": process.env.RAVMESSER_KEREN_HISHTALMUT_FORM_ID!,
      "encoding": "UTF-8",
    });

    await fetch("https://subscribe.responder.co.il", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Keren hishtalmut signup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
