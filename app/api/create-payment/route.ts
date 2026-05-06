import { NextResponse } from "next/server";

const CARDCOM_API = "https://secure.cardcom.solutions/api/v11/LowProfile/Create";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function POST() {
  try {
    const body = {
      TerminalNumber: Number(process.env.CARDCOM_TERMINAL),
      UserName: process.env.CARDCOM_USERNAME,
      UserPassword: process.env.CARDCOM_PASSWORD,
      APILevel: 10,
      SumToBill: Number(process.env.CARDCOM_PRICE),
      CoinID: 1,
      MaxPayments: Number(process.env.CARDCOM_MAX_PAYMENTS),
      ProductName: "תוכנית דיגיטלית MUSTרית",
      Language: "He",
      SuccessRedirectUrl: `${SITE_URL}/thankyou`,
      FailedRedirectUrl: `${SITE_URL}/course#pricing`,
      WebHookUrl: `${SITE_URL}/api/cardcom-webhook`,
    };

    const res = await fetch(CARDCOM_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log("Cardcom response:", data);

    if (data.ResponseCode !== 0) {
      console.error("Cardcom error full response:", JSON.stringify(data));
      return NextResponse.json({ error: data.Description || "שגיאה ביצירת עסקה", details: data }, { status: 500 });
    }

    const paymentUrl =
      data.url ||
      `https://secure.cardcom.solutions/External/LPF.aspx?LowProfileCode=${data.LowProfileCode}`;

    return NextResponse.json({ url: paymentUrl });
  } catch (err) {
    console.error("Create payment error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
