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

    console.log("Cardcom VIP webhook:", JSON.stringify(data));

    // Tolerant field lookup: case-insensitive, tries many possible key names
    // so it works with both the standard Cardcom indicator and the
    // Wishlist Member integration (which uses different field names).
    const lower: Record<string, string> = {};
    for (const k of Object.keys(data)) lower[k.toLowerCase()] = data[k];
    const pick = (...keys: string[]): string => {
      for (const k of keys) {
        const v = lower[k.toLowerCase()];
        if (v != null && String(v).trim() !== "") return String(v).trim();
      }
      return "";
    };
    const scanEmail = (): string => {
      for (const v of Object.values(data)) {
        const m = String(v).match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
        if (m) return m[0];
      }
      return "";
    };

    // Only skip if a response-code field is present AND not approved.
    // (The Wishlist Member POST fires only on success and may omit it.)
    const code = pick("ResponseCode", "responseCode", "OperationResponse", "DealResponse");
    if (code && code !== "0") {
      console.log("VIP payment not approved, code:", code);
      return NextResponse.json({ ok: false });
    }

    let name = pick("CardOwnerName", "Name", "FullName", "ClientName", "CustomerName", "fullname");
    if (!name) {
      const first = pick("FirstName", "first_name", "Firstname");
      const last = pick("LastName", "last_name", "Lastname");
      name = [first, last].filter(Boolean).join(" ").trim();
    }
    const email = pick("CardOwnerEmail", "Email", "ClientEmail", "CustomerEmail") || scanEmail();
    const phone = pick("CardOwnerPhone", "Phone", "Mobile", "ClientPhone", "CustomerPhone");
    const amountStr = pick("SumToBill", "Amount", "TotalSum", "Sum", "Price", "DealSum");
    const amount = amountStr ? Number(amountStr) : null;

    if (!name && !email && !phone) {
      console.warn("Cardcom VIP webhook: no identifying fields received", JSON.stringify(data));
      return NextResponse.json({ ok: true });
    }

    // Safety guard for when this runs as the account-level (global) webhook:
    // never create a VIP client for the digital-program prices (597 / 1190).
    // The ליווי is priced 790 (or 590 with the 200 coupon).
    const DIGITAL_PROGRAM_AMOUNTS = [597, 1190];
    if (amount != null && DIGITAL_PROGRAM_AMOUNTS.includes(amount)) {
      console.log("Skipping non-VIP (digital program) payment, amount:", amount);
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
