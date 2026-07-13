import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Daily reconciliation: pulls ליווי VIP payments straight from Cardcom and
// syncs them into the dashboard. This is the reliable safety net that does NOT
// depend on the Wishlist Member webhook (which misses installment payments).
// Idempotent on the dashboard side. Add ?dry=1 for a no-write preview.
const CARDCOM_LIST = "https://secure.cardcom.solutions/api/v11/Transactions/ListTransactions";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://matzavtzvira.co.il";
const SYNC_URL = process.env.VIP_CARDCOM_SYNC_URL || "https://tasks-dashboard-gamma.vercel.app/api/vip-cardcom-sync";

// ליווי is 790, or 590 with the 200 coupon. (Course/digital = 597/1190, excluded.)
const LIVUY_AMOUNTS = [790, 590];

function ddmmyyyy(d: Date): string {
  const p = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jerusalem", day: "2-digit", month: "2-digit", year: "numeric",
  }).formatToParts(d);
  const g = (t: string) => p.find(x => x.type === t)!.value;
  return `${g("day")}${g("month")}${g("year")}`;
}

interface Tranzaction {
  Amount?: number; IsRefund?: boolean; ResponseCode?: number;
  CardOwnerName?: string; CardOwnerEmail?: string; CardOwnerPhone?: string;
  CreateDate?: string; CustomFields?: Array<{ Id: number; Value: string }>;
}

export async function GET(req: NextRequest) {
  const dry = new URL(req.url).searchParams.get("dry") === "1";

  // Auth: Vercel Cron bearer OR the shared intake secret (for manual/dry runs).
  const cronSecret = process.env.CRON_SECRET;
  const intakeSecret = process.env.VIP_INTAKE_SECRET;
  const byCron = cronSecret && req.headers.get("authorization") === `Bearer ${cronSecret}`;
  const byIntake = intakeSecret && req.headers.get("x-intake-secret") === intakeSecret;
  if (!byCron && !byIntake) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!intakeSecret) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const TerminalNumber = Number(process.env.CARDCOM_TERMINAL);
  const ApiName = process.env.CARDCOM_USERNAME;
  const ApiPassword = process.env.CARDCOM_PASSWORD;
  if (!TerminalNumber || !ApiName) return NextResponse.json({ error: "Cardcom not configured" }, { status: 503 });

  const now = new Date();
  const from = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const FromDate = ddmmyyyy(from);
  const ToDate = ddmmyyyy(now);

  // 1) Pull recent Cardcom transactions (paginate a few pages to be safe).
  const txs: Tranzaction[] = [];
  try {
    for (let page = 1; page <= 5; page++) {
      const res = await fetch(CARDCOM_LIST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ TerminalNumber, ApiName, ApiPassword, FromDate, ToDate, Page: page, Page_size: 100 }),
        signal: AbortSignal.timeout(12000),
      });
      const data = await res.json();
      const batch: Tranzaction[] = data.Tranzactions || [];
      txs.push(...batch);
      if (batch.length < 100) break;
    }
  } catch (e) {
    console.error("Cardcom list failed:", e);
    return NextResponse.json({ error: "cardcom fetch failed" }, { status: 500 });
  }

  // 2) Keep successful ליווי payments only; dedupe by email/phone.
  const seen = new Set<string>();
  const clients: Array<{ name: string; email: string | null; phone: string | null; amount: number; date: string }> = [];
  for (const t of txs) {
    if (t.IsRefund) continue;
    if (t.ResponseCode != null && t.ResponseCode !== 0) continue;
    const amount = Number(t.Amount);
    const isLivuy = LIVUY_AMOUNTS.includes(amount) ||
      (t.CustomFields || []).some(f => typeof f.Value === "string" && f.Value.includes("ליווי"));
    if (!isLivuy) continue;
    const email = (t.CardOwnerEmail || "").trim() || null;
    const phone = (t.CardOwnerPhone || "").trim() || null;
    if (!email && !phone) continue;
    const dedupeKey = (email || "") + "|" + (phone || "");
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);
    clients.push({
      name: (t.CardOwnerName || "").trim() || email || phone || "לקוחה",
      email, phone, amount: LIVUY_AMOUNTS.includes(amount) ? amount : 790,
      date: t.CreateDate ? t.CreateDate.slice(0, 10) : "",
    });
  }

  // 3) Hand the batch to the dashboard (idempotent upsert).
  let syncResult: { newlySynced?: number; results?: Array<{ name: string; email: string | null; phone: string | null; action: string }> } = {};
  try {
    const res = await fetch(SYNC_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-intake-secret": intakeSecret },
      body: JSON.stringify({ clients, dryRun: dry }),
      signal: AbortSignal.timeout(15000),
    });
    syncResult = await res.json();
  } catch (e) {
    console.error("Dashboard sync failed:", e);
    return NextResponse.json({ error: "dashboard sync failed" }, { status: 500 });
  }

  const newlySynced = (syncResult.results || []).filter(r => r.action === "created" || r.action === "updated");

  // 4) For each newly-synced client, send the onboarding form email.
  if (!dry) {
    for (const c of newlySynced) {
      if (!c.email) continue;
      try {
        await fetch(`${SITE_URL}/api/send-vip-onboarding`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: c.name, email: c.email, phone: c.phone || "" }),
          signal: AbortSignal.timeout(8000),
        });
      } catch (e) {
        console.error("Onboarding email failed for", c.email, e);
      }
    }
  }

  // 5) Alert רבקי only when the safety net actually caught something.
  if (!dry && newlySynced.length > 0) {
    const rows = newlySynced.map(c =>
      `<li style="margin:6px 0;">${c.name}${c.phone ? ` · ${c.phone}` : ""}</li>`).join("");
    const html = `
      <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:28px;background:#F4F7FF;border-radius:16px;">
        <div style="background:#124AF0;border-radius:12px;padding:18px 22px;margin-bottom:20px;">
          <h2 style="color:#21F0B0;margin:0 0 4px;">✅ סנכרון תשלומי ליווי</h2>
          <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:0;">${newlySynced.length} תשלומים נקלטו אוטומטית מ-Cardcom</p>
        </div>
        <p style="color:#292929;font-size:15px;">התשלומים הבאים לא נקלטו דרך ה-webhook (כנראה תשלומים) והמערכת קלטה אותם לבד לדשבורד ושלחה להן את טופס ה-VIP:</p>
        <ul style="color:#060D3C;font-size:15px;padding-inline-start:20px;">${rows}</ul>
        <p style="color:#aaa;font-size:12px;margin-top:18px;text-align:center;">מצב צבירה · סנכרון יומי אוטומטי מ-Cardcom</p>
      </div>`;
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "דשבורד מצב צבירה <noreply@matzavtzvira.co.il>",
        to: "matzavtzvira@gmail.com",
        subject: `✅ נקלטו ${newlySynced.length} תשלומי ליווי מ-Cardcom`,
        html,
      });
    } catch (e) {
      console.error("Sync alert email failed:", e);
    }
  }

  return NextResponse.json({
    ok: true, dry, range: { FromDate, ToDate },
    cardcomTx: txs.length, livuyFound: clients.length,
    newlySynced: newlySynced.length,
    results: syncResult.results || [],
  });
}
