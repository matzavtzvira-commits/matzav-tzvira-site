import { NextRequest, NextResponse } from "next/server";

// Dedicated webhook for the VIP coaching (ליווי) Cardcom payment page.
// Configure THIS url as the notification URL on the ליווי payment page in Cardcom.
// Any approved payment here = a VIP coaching client -> created in the dashboard
// as "in_progress" with the amount actually paid (coupon-aware).
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

    console.log("Cardcom VIP webhook:", data);

    // Only approved payments
    const code = data["ResponseCode"] ?? data["responseCode"] ?? "-1";
    if (code !== "0") {
      console.log("VIP payment not approved, code:", code);
      return NextResponse.json({ ok: false });
    }

    const name =
      data["CardOwnerName"] ?? data["Name"] ?? data["cardOwnerName"] ?? "";
    const email =
      data["CardOwnerEmail"] ?? data["Email"] ?? data["email"] ?? "";
    const phone =
      data["CardOwnerPhone"] ?? data["Phone"] ?? data["phone"] ?? "";
    const amount =
      data["SumToBill"] ?? data["Amount"] ?? data["TotalSum"] ?? "";

    if (!name && !email && !phone) {
      console.warn("Cardcom VIP webhook: no identifying fields received");
      return NextResponse.json({ ok: true });
    }

    const secret = process.env.VIP_INTAKE_SECRET;
    if (!secret) {
      console.error("VIP_INTAKE_SECRET not set — cannot forward VIP payment to dashboard");
      return NextResponse.json({ ok: true });
    }

    const intakeUrl =
      process.env.VIP_INTAKE_URL ||
      "https://tasks-dashboard-gamma.vercel.app/api/vip-intake";

    try {
      const res = await fetch(intakeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-intake-secret": secret },
        body: JSON.stringify({
          name: name || email || phone,
          phone: phone || null,
          email: email || null,
          status: "in_progress",
          source: "cardcom",
          amount_paid: amount ? Number(amount) : null,
        }),
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) {
        console.error("VIP intake forward failed:", res.status, await res.text());
      }
    } catch (e) {
      console.error("VIP intake forward error:", e);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Cardcom VIP webhook error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
