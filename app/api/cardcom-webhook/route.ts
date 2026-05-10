import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let data: Record<string, string> = {};

    if (contentType.includes("application/json")) {
      data = await req.json();
    } else {
      const form = await req.formData();
      form.forEach((val, key) => { data[key] = val.toString(); });
    }

    console.log("Cardcom webhook:", data);

    // רק תשלומים מאושרים
    const code = data["ResponseCode"] ?? data["responseCode"] ?? "-1";
    if (code !== "0") {
      console.log("Payment not approved, code:", code);
      return NextResponse.json({ ok: false });
    }

    // שם ומייל הקונה (קארדקום שולח שדות אלה)
    const email = data["CardOwnerEmail"] ?? data["Email"] ?? data["email"] ?? "";
    const firstName = (data["CardOwnerName"] ?? data["Name"] ?? "").split(" ")[0];

    if (!email) {
      console.warn("Cardcom webhook: no email received");
      return NextResponse.json({ ok: true });
    }

    // הוספה לרב מסר - רשימת הקורס
    const body = new URLSearchParams({
      "fields[subscribers_email]": email,
      "fields[subscribers_firstname]": firstName,
      "form_id": process.env.RAVMESSER_COURSE_FORM_ID!,
      "encoding": "UTF-8",
    });

    const rmRes = await fetch("https://subscribe.responder.co.il", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    console.log("Rav Messer enrollment status:", rmRes.status, "email:", email);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
