import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";

// Weekly "call queue" email (Sunday morning, see vercel.json).
// Pulls program buyers from Cardcom + Rav Messer, hands them to the dashboard
// (which stores purchase dates and merges duplicate leads), and emails רבקי one
// organized list of all open VIP leads: what happened in the last call, and whether
// she bought the program before or after reaching out.
// ?dry=1 returns JSON without writing or sending. ?preview=1 returns the email HTML.
export const maxDuration = 60;

const CARDCOM_LIST = "https://secure.cardcom.solutions/api/v11/Transactions/ListTransactions";
const QUEUE_URL = process.env.VIP_CALL_QUEUE_URL || "https://tasks-dashboard-gamma.vercel.app/api/vip-call-queue";
const DASHBOARD_URL = "https://tasks-dashboard-gamma.vercel.app/vip";
const CARDCOM_FROM = new Date(2026, 0, 1); // the terminal's first transactions are from Jan 2026
const PROGRAM_PRODUCT_ID = "2"; // Cardcom custom field 19: 2 = התוכנית, 3 = ליווי, 5 = פגישה
const RAVMESSER_PROGRAM_LISTS = ["1465869", "1484945"]; // MUSTרית, מאסטריות

type Buyer = { email: string | null; phone: string | null; date: string; free: boolean };
type QueueItem = {
  name: string; phone: string | null; signups: number; firstContact: string; lastContact: string;
  sources: string[]; callStatus: string; notes: string; followUpDate: string | null;
  purchase: { date: string; free: boolean } | null; relation: "before" | "after" | "none"; alreadyClient: boolean;
};

function ddmmyyyy(d: Date) {
  return `${String(d.getDate()).padStart(2, "0")}${String(d.getMonth() + 1).padStart(2, "0")}${d.getFullYear()}`;
}

async function cardcomBuyers(): Promise<Buyer[]> {
  const TerminalNumber = Number(process.env.CARDCOM_TERMINAL);
  const ApiName = process.env.CARDCOM_USERNAME;
  const ApiPassword = process.env.CARDCOM_PASSWORD;
  if (!TerminalNumber || !ApiName) throw new Error("Cardcom not configured");

  // Month by month, in parallel.
  const months: Array<[Date, Date]> = [];
  for (let d = new Date(CARDCOM_FROM); d <= new Date(); d = new Date(d.getFullYear(), d.getMonth() + 1, 1)) {
    months.push([d, new Date(d.getFullYear(), d.getMonth() + 1, 0)]);
  }
  type Tx = {
    Amount?: number; IsRefund?: boolean; ResponseCode?: number; CreateDate?: string;
    CardOwnerEmail?: string; CardOwnerPhone?: string; CustomFields?: Array<{ Id: number; Value: string }>;
  };
  const pages = await Promise.all(months.map(async ([from, to]) => {
    const txs: Tx[] = [];
    for (let Page = 1; Page <= 10; Page++) {
      const res = await fetch(CARDCOM_LIST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ TerminalNumber, ApiName, ApiPassword, FromDate: ddmmyyyy(from), ToDate: ddmmyyyy(to), Page, Page_size: 100 }),
        signal: AbortSignal.timeout(15000),
      });
      const batch: Tx[] = (await res.json()).Tranzactions || [];
      txs.push(...batch);
      if (batch.length < 100) break;
    }
    return txs;
  }));

  return pages.flat()
    .filter(t => !t.IsRefund && (t.ResponseCode == null || t.ResponseCode === 0))
    .filter(t => (t.CustomFields || []).some(f => f.Id === 19 && String(f.Value) === PROGRAM_PRODUCT_ID))
    .map(t => ({
      email: t.CardOwnerEmail?.trim() || null,
      phone: t.CardOwnerPhone?.trim() || null,
      date: (t.CreateDate || "").slice(0, 10),
      free: Number(t.Amount) === 0,
    }));
}

async function ravmesserBuyers(): Promise<Buyer[]> {
  const { RAVMESSER_CLIENT_TOKEN: ck, RAVMESSER_CLIENT_SECRET: cs, RAVMESSER_USER_TOKEN: uk, RAVMESSER_USER_SECRET: us } = process.env;
  if (!ck || !cs || !uk || !us) throw new Error("Rav Messer not configured");
  const md5 = (s: string) => crypto.createHash("md5").update(s).digest("hex");
  const get = async (path: string) => {
    const nonce = crypto.randomBytes(8).toString("hex");
    const auth = `c_key=${ck},c_secret=${md5(cs + nonce)},u_key=${uk},u_secret=${md5(us + nonce)},nonce=${nonce},timestamp=${Math.floor(Date.now() / 1000)}`;
    const res = await fetch(`https://api.responder.co.il/main/${path}`, { headers: { Authorization: auth }, signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`Rav Messer ${res.status}`);
    return res.json();
  };
  const out: Buyer[] = [];
  for (const list of RAVMESSER_PROGRAM_LISTS) {
    for (let offset = 0; offset < 5000; offset += 500) {
      const data = await get(`lists/${list}/subscribers?limit=500&offset=${offset}`);
      const subs: Array<{ EMAIL?: string; PHONE?: string; JOIN_DATE?: string }> = Array.isArray(data) ? data : data.SUBSCRIBERS || [];
      for (const s of subs) out.push({ email: s.EMAIL || null, phone: s.PHONE || null, date: (s.JOIN_DATE || "").slice(0, 10), free: false });
      if (subs.length < 500) break;
    }
  }
  return out;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const fmt = (d: string) => { const [y, m, day] = d.split("-"); return `${Number(day)}.${Number(m)}.${y.slice(2)}`; };
const CALL_LABEL: Record<string, string> = {
  spoke: "💬 דיברנו", callback: "🔁 ביקשה שנחזור", no_answer: "📵 לא ענתה", not_called: "⏳ עוד לא התקשרנו",
};
const CALL_ORDER: Record<string, number> = { spoke: 0, callback: 1, no_answer: 2, not_called: 3 };
const SOURCE_LABEL: Record<string, string> = {
  website: "האתר", waitlist: "רשימת המתנה", maastariot: "דף המאסטריות", manual: "הוספה ידנית", cardcom: "קארדקום",
};

function renderItem(q: QueueItem) {
  const notes = q.notes.length > 220 ? q.notes.slice(0, 220) + "..." : q.notes;
  const signup = q.signups > 1
    ? `השאירה פרטים ${q.signups} פעמים (${fmt(q.firstContact)} עד ${fmt(q.lastContact)})`
    : `השאירה פרטים ${fmt(q.firstContact)}`;
  const program = q.purchase
    ? ` · 🎓 ${q.purchase.free ? "קיבלה את התוכנית בקופון" : "קנתה את התוכנית"} ${fmt(q.purchase.date)}`
    : "";
  return `
    <div style="background:#fff;border-radius:10px;padding:12px 14px;margin-bottom:8px;border-right:4px solid #C9A84C;">
      <div style="font-weight:bold;color:#060D3C;font-size:15px;">${esc(q.name)}
        ${q.phone ? ` · <a href="tel:${esc(q.phone)}" style="color:#124AF0;text-decoration:none;font-weight:normal;" dir="ltr">${esc(q.phone)}</a>` : ""}
      </div>
      <div style="color:#888;font-size:12px;margin-top:3px;">${signup} · מ${q.sources.map(s => SOURCE_LABEL[s] || s).join(", ")}${program}</div>
      <div style="color:#060D3C;font-size:13px;margin-top:6px;"><b>${CALL_LABEL[q.callStatus] || q.callStatus}</b>${notes ? `: ${esc(notes)}` : ""}</div>
    </div>`;
}

function renderSection(title: string, subtitle: string, items: QueueItem[]) {
  if (items.length === 0) return "";
  const sorted = [...items].sort((a, b) =>
    (CALL_ORDER[a.callStatus] ?? 9) - (CALL_ORDER[b.callStatus] ?? 9) || b.lastContact.localeCompare(a.lastContact));
  return `
    <h3 style="color:#060D3C;margin:26px 0 2px;font-size:17px;">${title} (${items.length})</h3>
    <p style="color:#888;font-size:12px;margin:0 0 10px;">${subtitle}</p>
    ${sorted.map(renderItem).join("")}`;
}

function renderEmail(queue: QueueItem[]) {
  const clients = queue.filter(q => q.alreadyClient);
  const open = queue.filter(q => !q.alreadyClient);
  const before = open.filter(q => q.relation === "before");
  const after = open.filter(q => q.relation === "after");
  const none = open.filter(q => q.relation === "none");
  return `
    <div dir="rtl" style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;background:#F4F7FF;border-radius:16px;">
      <div style="background:#124AF0;border-radius:12px;padding:18px 22px;">
        <h2 style="color:#21F0B0;margin:0 0 4px;">📞 תור השיחות - ליווי VIP</h2>
        <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:0;">${open.length} נשים מחכות לשיחה · בכל קבוצה: דיברנו ← ביקשה שנחזור ← לא ענתה ← עוד לא התקשרנו</p>
      </div>
      ${renderSection("🎓 הגיעו אחרי התוכנית", "קנו את התוכנית, ואחר כך השאירו פרטים לליווי", before)}
      ${renderSection("🔄 הגיעו לפני התוכנית", "השאירו פרטים לליווי, ורק אחר כך קנו את התוכנית", after)}
      ${renderSection("🆕 לא קנו את התוכנית", "לא נמצאה רכישה בקארדקום (מינואר 2026) או ברב-מסר. מי ששילמה בהעברה ולא נוספה לרב-מסר תופיע כאן", none)}
      ${renderSection("⚠️ כבר לקוחות ליווי", "יש להן גם כרטיס פנייה פתוח. כדאי לסגור את הכפול בדשבורד", clients)}
      <p style="text-align:center;margin-top:22px;"><a href="${DASHBOARD_URL}" style="color:#124AF0;font-size:13px;">לפתיחת הדשבורד ←</a></p>
      <p style="color:#aaa;font-size:12px;margin-top:8px;text-align:center;">מצב צבירה · תור שיחות שבועי אוטומטי · מי שסימנת "לא רלוונטית" לא מופיעה כאן</p>
    </div>`;
}

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const intakeSecret = process.env.VIP_INTAKE_SECRET;
  const byCron = cronSecret && req.headers.get("authorization") === `Bearer ${cronSecret}`;
  const byIntake = intakeSecret && req.headers.get("x-intake-secret") === intakeSecret;
  if (!byCron && !byIntake) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!intakeSecret) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const params = new URL(req.url).searchParams;
  const dry = params.get("dry") === "1";
  const preview = params.get("preview") === "1";

  let buyers: Buyer[];
  try {
    const [a, b] = await Promise.all([cardcomBuyers(), ravmesserBuyers()]);
    buyers = [...a, ...b];
  } catch (e) {
    console.error("Program buyers fetch failed:", e);
    return NextResponse.json({ error: "buyers fetch failed" }, { status: 500 });
  }

  let queue: QueueItem[] = [];
  let sync: { hasColumn?: boolean; updated?: number } = {};
  try {
    const res = await fetch(QUEUE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-intake-secret": intakeSecret },
      body: JSON.stringify({ buyers, dryRun: dry || preview }),
      signal: AbortSignal.timeout(30000),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || res.status);
    queue = data.queue || [];
    sync = { hasColumn: data.hasColumn, updated: data.updated };
  } catch (e) {
    console.error("Call queue fetch failed:", e);
    return NextResponse.json({ error: "queue fetch failed" }, { status: 500 });
  }

  const html = renderEmail(queue);
  if (preview) return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  const waiting = queue.filter(q => !q.alreadyClient).length;
  if (dry) return NextResponse.json({ ok: true, buyers: buyers.length, waiting, ...sync, queue });
  if (queue.length === 0) return NextResponse.json({ ok: true, count: 0, message: "no open leads" });

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "דשבורד מצב צבירה <noreply@matzavtzvira.co.il>",
      to: "matzavtzvira@gmail.com",
      subject: `📞 תור השיחות השבועי - ${waiting} נשים מחכות`,
      html,
    });
    if (error) throw new Error(error.message);
  } catch (e) {
    console.error("Call queue email failed:", e);
    return NextResponse.json({ error: "email failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, waiting, ...sync });
}
