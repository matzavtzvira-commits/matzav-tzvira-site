import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const formId = process.env.RAVMESSER_KEREN_HISHTALMUT_FORM_ID!;
    const body = new URLSearchParams({
      "fields[subscribers_name]": name || "",
      "fields[subscribers_email]": email,
      "form_id": formId,
      "encoding": "UTF-8",
      "__ravxx_url__": "http://form.ravpage.co.il/keren-hishtalmut-morot",
    });

    const responderRes = await fetch("https://subscribe.responder.co.il", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0",
      },
      body: body.toString(),
    });

    const responderText = await responderRes.text();
    console.log("Responder status:", responderRes.status, "body:", responderText.slice(0, 500));

    if (!responderRes.ok) {
      console.error("Responder error for keren hishtalmut:", responderRes.status, responderText);
      return NextResponse.json({ error: "Subscription failed", detail: responderText }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Keren hishtalmut signup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
