import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Daily reminder: emails רבקי the list of clients due for follow-up today.
// Triggered by Vercel Cron (see vercel.json). Protected by CRON_SECRET.
export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const secret = process.env.VIP_INTAKE_SECRET;
  if (!secret) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  // Today's date in Israel time, as YYYY-MM-DD
  const todayIL = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jerusalem", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date());

  const dueUrl =
    process.env.VIP_FOLLOWUPS_URL ||
    "https://tasks-dashboard-gamma.vercel.app/api/vip-followups-due";

  let followups: { full_name: string; phone: string | null; email: string | null; follow_up_note: string | null }[] = [];
  try {
    const res = await fetch(dueUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-intake-secret": secret },
      body: JSON.stringify({ date: todayIL }),
      signal: AbortSignal.timeout(8000),
    });
    const data = await res.json();
    followups = data.followups || [];
  } catch (e) {
    console.error("Fetch followups failed:", e);
    return NextResponse.json({ error: "fetch failed" }, { status: 500 });
  }

  if (followups.length === 0) {
    return NextResponse.json({ ok: true, count: 0, message: "no followups today" });
  }

  const rows = followups.map(f => `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #E8EDFF;font-weight:bold;color:#060D3C;">${f.full_name}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #E8EDFF;color:#124AF0;">${f.phone ? `<a href="tel:${f.phone}" style="color:#124AF0;text-decoration:none;">${f.phone}</a>` : "—"}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #E8EDFF;color:#666;">${f.follow_up_note || ""}</td>
    </tr>`).join("");

  const html = `
    <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:28px;background:#F4F7FF;border-radius:16px;">
      <div style="background:#124AF0;border-radius:12px;padding:18px 22px;margin-bottom:22px;">
        <h2 style="color:#21F0B0;margin:0 0 4px;">🔔 מעקבים להיום</h2>
        <p style="color:rgba(255,255,255,0.75);font-size:13px;margin:0;">${followups.length} לקוחות שצריך לחזור אליהן היום</p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;">
        <thead><tr>
          <td style="padding:10px 14px;background:#060D3C;color:#fff;font-weight:bold;font-size:13px;">שם</td>
          <td style="padding:10px 14px;background:#060D3C;color:#fff;font-weight:bold;font-size:13px;">טלפון</td>
          <td style="padding:10px 14px;background:#060D3C;color:#fff;font-weight:bold;font-size:13px;">על מה</td>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="color:#aaa;font-size:12px;margin-top:18px;text-align:center;">מצב צבירה · תזכורת יומית אוטומטית מהדשבורד</p>
    </div>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "דשבורד מצב צבירה <noreply@matzavtzvira.co.il>",
      to: "matzavtzvira@gmail.com",
      subject: `🔔 מעקבים להיום - ${followups.length} לקוחות`,
      html,
    });
  } catch (e) {
    console.error("Reminder email failed:", e);
    return NextResponse.json({ error: "email failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, count: followups.length });
}
