import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formId = process.env.RAVMESSER_SAVINGS_KIDS_FORM_ID;
  if (!formId) {
    console.error("RAVMESSER_SAVINGS_KIDS_FORM_ID is not set");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  try {
    const { name, email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const body = new URLSearchParams({
      "fields[subscribers_name]": name || "",
      "fields[subscribers_email]": email,
      "form_id": formId,
      "encoding": "UTF-8",
    });

    const responderRes = await fetch("https://subscribe.responder.co.il", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    const responderText = await responderRes.text();
    if (responderText.includes("Error initializing class")) {
      console.error("Responder subscription error (savings kids):", responderText.slice(0, 300));
      return NextResponse.json({ error: "Subscription failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Savings for kids signup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
