"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useMemo } from "react";

/* ─── Kids Savings Calculator ─── */
function KidsCalc() {
  const [age, setAge] = useState(3);
  const [track, setTrack] = useState<"default" | "stocks">("stocks");

  const monthly = 60;
  const yearsLeft = Math.max(0, 18 - age);
  const rate = track === "stocks" ? 0.075 : 0.025;
  const months = yearsLeft * 12;

  const fv = useMemo(() => {
    if (months === 0) return 0;
    const r = rate / 12;
    return monthly * ((Math.pow(1 + r, months) - 1) / r);
  }, [months, rate]);

  return (
    <div id="kids" style={{ background: "white", borderRadius: 24, padding: "40px 36px", border: "2px solid #E8EDFF", scrollMarginTop: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#21F0B0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>🌱</div>
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#124AF0", margin: 0 }}>חיסכון לכל ילד</h2>
          <p style={{ color: "#888", fontSize: "0.85rem", margin: 0 }}>כמה יהיה לילד שלך בגיל 18</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, color: "#292929", marginBottom: 8, fontSize: "0.9rem" }}>גיל הילד: {age}</label>
          <input
            type="range" min={0} max={17} value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#124AF0" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#aaa" }}>
            <span>0</span><span>17</span>
          </div>
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, color: "#292929", marginBottom: 8, fontSize: "0.9rem" }}>מסלול השקעה</label>
          <div style={{ display: "flex", gap: 10 }}>
            {([["default", "ברירת מחדל (2.5%)"], ["stocks", "מנייתי (7.5%)"]] as const).map(([val, label]) => (
              <button key={val} onClick={() => setTrack(val)}
                style={{
                  flex: 1, padding: "10px 8px", borderRadius: 12,
                  border: `2px solid ${track === val ? "#124AF0" : "#E8EDFF"}`,
                  background: track === val ? "#EEF3FF" : "white",
                  color: track === val ? "#124AF0" : "#666",
                  fontWeight: track === val ? 700 : 400,
                  fontSize: "0.78rem", cursor: "pointer",
                }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg, #124AF0, #0a38c4)", borderRadius: 16, padding: "28px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.88rem", margin: "0 0 6px" }}>הסכום הצפוי בגיל 18</p>
          <p style={{ color: "white", fontSize: "2rem", fontWeight: 700, margin: 0 }}>
            {fv > 0 ? `${Math.round(fv).toLocaleString("he-IL")} ₪` : "—"}
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", margin: "0 0 4px" }}>שנים לחיסכון</p>
          <p style={{ color: "#21F0B0", fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>{yearsLeft}</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", margin: "0 0 4px" }}>הפקדה חודשית</p>
          <p style={{ color: "#21F0B0", fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>60 ₪</p>
        </div>
      </div>
      {track === "stocks" && fv > 0 && (
        <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", marginTop: 16, textAlign: "center", background: "#F0FDF9", padding: "10px 16px", borderRadius: 10 }}>
          במסלול מנייתי תחסכי {Math.round(fv - monthly * 12 * yearsLeft).toLocaleString("he-IL")} ₪ יותר מאשר בברירת המחדל
        </p>
      )}
    </div>
  );
}

/* ─── Management Fees Calculator ─── */
function FeesCalc() {
  const [balance, setBalance] = useState(200000);
  const [currentFee, setCurrentFee] = useState(1.0);
  const [targetFee, setTargetFee] = useState(0.5);
  const [years, setYears] = useState(25);

  const growth = 0.06;
  const fv = (b: number, fee: number) => b * Math.pow(1 + growth - fee / 100, years);
  const currentFV = fv(balance, currentFee);
  const targetFV = fv(balance, targetFee);
  const saving = targetFV - currentFV;

  return (
    <div id="fees" style={{ background: "white", borderRadius: 24, padding: "40px 36px", border: "2px solid #E8EDFF", scrollMarginTop: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#FA5C5C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>📉</div>
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#124AF0", margin: 0 }}>מחשבון דמי ניהול</h2>
          <p style={{ color: "#888", fontSize: "0.85rem", margin: 0 }}>כמה תחסכי אם תורידי את דמי הניהול</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, color: "#292929", marginBottom: 8, fontSize: "0.9rem" }}>יתרת קרן נוכחית (₪)</label>
          <input type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))}
            style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box" }} />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, color: "#292929", marginBottom: 8, fontSize: "0.9rem" }}>שנים לפרישה: {years}</label>
          <input type="range" min={5} max={40} value={years} onChange={(e) => setYears(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#124AF0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#aaa" }}><span>5</span><span>40</span></div>
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, color: "#292929", marginBottom: 8, fontSize: "0.9rem" }}>דמי ניהול נוכחיים: {currentFee.toFixed(2)}%</label>
          <input type="range" min={0.1} max={2} step={0.05} value={currentFee} onChange={(e) => setCurrentFee(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#FA5C5C" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#aaa" }}><span>0.1%</span><span>2%</span></div>
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, color: "#292929", marginBottom: 8, fontSize: "0.9rem" }}>דמי ניהול מבוקשים: {targetFee.toFixed(2)}%</label>
          <input type="range" min={0.1} max={2} step={0.05} value={targetFee} onChange={(e) => setTargetFee(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#21F0B0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#aaa" }}><span>0.1%</span><span>2%</span></div>
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg, #124AF0, #0a38c4)", borderRadius: 16, padding: "28px 32px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, textAlign: "center" }}>
        <div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", margin: "0 0 6px" }}>בדמי ניהול נוכחיים</p>
          <p style={{ color: "white", fontSize: "1.3rem", fontWeight: 700, margin: 0 }}>{Math.round(currentFV).toLocaleString("he-IL")} ₪</p>
        </div>
        <div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", margin: "0 0 6px" }}>בדמי ניהול מבוקשים</p>
          <p style={{ color: "#21F0B0", fontSize: "1.3rem", fontWeight: 700, margin: 0 }}>{Math.round(targetFV).toLocaleString("he-IL")} ₪</p>
        </div>
        <div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.82rem", margin: "0 0 6px" }}>חיסכון צפוי</p>
          <p style={{ color: saving > 0 ? "#21F0B0" : "#FA5C5C", fontSize: "1.6rem", fontWeight: 700, margin: 0 }}>
            {saving > 0 ? "+" : ""}{Math.round(saving).toLocaleString("he-IL")} ₪
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Compound Interest Calculator ─── */
function CompoundCalc() {
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [ratePercent, setRatePercent] = useState(7);
  const [years, setYears] = useState(20);

  const data = useMemo(() => {
    const r = ratePercent / 100 / 12;
    const points: { year: number; total: number; deposits: number }[] = [];
    for (let y = 0; y <= years; y++) {
      const months = y * 12;
      const fvInitial = initial * Math.pow(1 + r, months);
      const fvMonthly = monthly > 0 ? monthly * ((Math.pow(1 + r, months) - 1) / r) : 0;
      points.push({ year: y, total: fvInitial + fvMonthly, deposits: initial + monthly * months });
    }
    return points;
  }, [initial, monthly, ratePercent, years]);

  const final = data[data.length - 1];
  const maxVal = final.total;
  const barWidth = (val: number) => `${Math.max(2, (val / maxVal) * 100)}%`;

  return (
    <div id="compound" style={{ background: "white", borderRadius: 24, padding: "40px 36px", border: "2px solid #E8EDFF", scrollMarginTop: 100 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#124AF0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>📈</div>
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#124AF0", margin: 0 }}>ריבית דריבית</h2>
          <p style={{ color: "#888", fontSize: "0.85rem", margin: 0 }}>ראי איך הכסף שלך גדל עם הזמן</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
        <div>
          <label style={{ display: "block", fontWeight: 600, color: "#292929", marginBottom: 8, fontSize: "0.9rem" }}>סכום התחלתי (₪)</label>
          <input type="number" value={initial} onChange={(e) => setInitial(Number(e.target.value))}
            style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box" }} />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, color: "#292929", marginBottom: 8, fontSize: "0.9rem" }}>הפקדה חודשית (₪)</label>
          <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))}
            style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box" }} />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, color: "#292929", marginBottom: 8, fontSize: "0.9rem" }}>תשואה שנתית: {ratePercent}%</label>
          <input type="range" min={1} max={15} step={0.5} value={ratePercent} onChange={(e) => setRatePercent(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#124AF0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#aaa" }}><span>1%</span><span>15%</span></div>
        </div>
        <div>
          <label style={{ display: "block", fontWeight: 600, color: "#292929", marginBottom: 8, fontSize: "0.9rem" }}>מספר שנים: {years}</label>
          <input type="range" min={1} max={40} value={years} onChange={(e) => setYears(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#124AF0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#aaa" }}><span>1</span><span>40</span></div>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
        {[
          { label: "סכום סופי", value: `${Math.round(final.total).toLocaleString("he-IL")} ₪`, color: "#124AF0" },
          { label: "סך הפקדות", value: `${Math.round(final.deposits).toLocaleString("he-IL")} ₪`, color: "#555" },
          { label: "רווח מריבית", value: `${Math.round(final.total - final.deposits).toLocaleString("he-IL")} ₪`, color: "#21a87b" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#F4F7FF", borderRadius: 14, padding: "20px 16px", textAlign: "center" }}>
            <p style={{ color: "#888", fontSize: "0.78rem", margin: "0 0 8px" }}>{s.label}</p>
            <p style={{ color: s.color, fontSize: "1.15rem", fontWeight: 700, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {data.filter((_, i) => i % Math.max(1, Math.floor(years / 8)) === 0 || i === years).map((d) => (
          <div key={d.year} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 40, textAlign: "left", fontSize: "0.78rem", color: "#888", flexShrink: 0 }}>שנה {d.year}</span>
            <div style={{ flex: 1, height: 22, background: "#F4F7FF", borderRadius: 6, overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, right: 0, height: "100%", width: barWidth(d.deposits), background: "#E8EDFF" }} />
              <div style={{ position: "absolute", top: 0, right: 0, height: "100%", width: barWidth(d.total), background: "linear-gradient(90deg, #21F0B0, #124AF0)", transition: "width 0.3s" }} />
            </div>
            <span style={{ width: 90, textAlign: "right", fontSize: "0.78rem", color: "#555", flexShrink: 0 }}>
              {Math.round(d.total / 1000)}K ₪
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 12, justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: "linear-gradient(90deg, #21F0B0, #124AF0)" }} />
          <span style={{ fontSize: "0.78rem", color: "#666" }}>סכום כולל</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: "#E8EDFF" }} />
          <span style={{ fontSize: "0.78rem", color: "#666" }}>סך הפקדות</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function CalculatorsPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: 70 }}>
        {/* Header */}
        <section style={{ background: "linear-gradient(135deg, #124AF0, #0a38c4)", padding: "72px 1.5rem 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, left: -40, width: 220, height: 220, borderRadius: "50%", background: "rgba(33,240,176,0.1)", filter: "blur(50px)", pointerEvents: "none" }} />
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1, marginBottom: 12 }}>כלים חינמיים</p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "white", fontWeight: 700, marginBottom: 16 }}>מחשבונים פיננסיים</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
            כלים אינטראקטיביים שיעזרו לך לקבל החלטות פיננסיות מושכלות — בלי חישובים מסובכים
          </p>
        </section>

        {/* Jump links */}
        <section style={{ background: "white", padding: "28px 1.5rem", borderBottom: "1px solid #E8EDFF" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { href: "#kids", label: "🌱 חיסכון לכל ילד" },
              { href: "#fees", label: "📉 דמי ניהול" },
              { href: "#compound", label: "📈 ריבית דריבית" },
            ].map((l) => (
              <a key={l.href} href={l.href} style={{ background: "#F4F7FF", color: "#124AF0", borderRadius: 50, padding: "10px 22px", fontWeight: 600, fontSize: "0.9rem", border: "2px solid #E8EDFF", transition: "all 0.2s", display: "inline-block" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#124AF0"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F4F7FF"; (e.currentTarget as HTMLElement).style.color = "#124AF0"; }}>
                {l.label}
              </a>
            ))}
          </div>
        </section>

        {/* Calculators */}
        <section style={{ background: "#F4F7FF", padding: "56px 1.5rem" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>
            <KidsCalc />
            <FeesCalc />
            <CompoundCalc />
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "white", padding: "72px 1.5rem", textAlign: "center" }}>
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50, marginBottom: 20 }}>
            רוצה ללמוד יותר?
          </p>
          <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#124AF0", fontWeight: 700, marginBottom: 16 }}>
            מהמחשבונים — לידע אמיתי
          </h2>
          <p style={{ color: "#555", fontSize: "1rem", lineHeight: 1.9, marginBottom: 32, maxWidth: 560, margin: "0 auto 32px" }}>
            הקורס "הכסף ישתדל, ואת תנוחי" מלמד את כל הנושאים האלה לעומק — עם דוגמאות, תרגולים ותכנית פעולה אישית.
          </p>
          <a href="/course" style={{ display: "inline-block", background: "#124AF0", color: "white", borderRadius: 50, padding: "16px 40px", fontWeight: 700, fontSize: "1rem" }}>
            לפרטי הקורס ←
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
