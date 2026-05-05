"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── format number ── */
function fmt(v: number): string {
  if (v < 1) return `${Math.round(v * 100)} אג׳`;
  if (v < 1000) return `${v.toFixed(2)} ₪`;
  if (v < 1_000_000) return `${(v / 1000).toFixed(v >= 100_000 ? 0 : 1)}K ₪`;
  return `${(v / 1_000_000).toFixed(2)}M ₪`;
}

/* ── 30-day penny doubling ── */
const PENNY_DAYS = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: 0.1 * Math.pow(2, i),
}));
const LOG_MAX = Math.log10(PENNY_DAYS[29].value + 1);

const MILESTONES: Record<number, string> = {
  1: "כמו מסטיק",
  5: "כוס קפה",
  10: "ספר",
  15: "טלפון ישן",
  20: "חופשה ברומא",
  24: "רכב משומש",
  25: "מיליונרית!",
  28: "כמה דירות",
  30: "האיים הקריביים...",
};

/* ════════════════════════════════════════════════════════
   CALCULATOR
════════════════════════════════════════════════════════ */

function SketchLine({ color, id, delay = 0, onMount = false }: { color: string; id: string; delay?: number; onMount?: boolean }) {
  const anim = onMount
    ? { animate: { pathLength: 1 } }
    : { whileInView: { pathLength: 1 }, viewport: { once: true as const } };
  return (
    <svg viewBox="0 0 300 12" fill="none" style={{ width: "100%", display: "block", marginTop: 4 }} preserveAspectRatio="none">
      <defs>
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <motion.path d="M4 5 Q75 3 150 6 Q225 9 296 5" stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none"
        filter={`url(#${id})`} opacity="0.95" initial={{ pathLength: 0 }} {...anim}
        transition={{ duration: 0.9, delay, ease: "easeOut" }} />
      <motion.path d="M8 8 Q80 6 155 9 Q230 11 292 7" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none"
        filter={`url(#${id})`} opacity="0.55" initial={{ pathLength: 0 }} {...anim}
        transition={{ duration: 0.9, delay: delay + 0.15, ease: "easeOut" }} />
    </svg>
  );
}

function AnimatedStripe() {
  const items = [
    "ריבית דריבית — הפלא השמיני בתבל",
    "₪200 בחודש × 30 שנה = מעל ₪400,000",
    "10% תשואה שנתית ממוצעת בשוק המניות",
    "כל שנה שמאחרת — שווה אלפי שקלים",
    "דמי ניהול נמוכים = עשרות אלפי שקלים יותר",
    "זמן הוא הנכס הכי יקר שלך",
  ];
  const all = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", background: "#124AF0", padding: "18px 0", direction: "ltr" }}>
      <div style={{ display: "flex", animation: "stripeScroll 26s linear infinite", width: "max-content" }}>
        {all.map((item, i) => (
          <span key={i} style={{ whiteSpace: "nowrap", padding: "0 44px", color: "#FFFFFF", fontWeight: 700, fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: 22 }}>
            {item}
            <span style={{ color: "#21F0B0", fontWeight: 900 }}>◆</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes stripeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function CompoundCalculator() {
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(20);
  const [accumFee, setAccumFee] = useState(0.5);
  const [depositFee, setDepositFee] = useState(0);

  const { points, noFeeTotal } = useMemo(() => {
    const monthlyRate = (rate - accumFee) / 100 / 12;
    const effectiveDep = monthly * (1 - depositFee / 100);
    let bal = initial * (1 - depositFee / 100);
    let totalDep = initial;
    const pts: { year: number; total: number; deposits: number }[] = [
      { year: 0, total: bal, deposits: initial },
    ];
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        bal = bal * (1 + monthlyRate) + effectiveDep;
        totalDep += monthly;
      }
      pts.push({ year: y, total: Math.max(0, bal), deposits: totalDep });
    }
    const r0 = rate / 100 / 12;
    let b0 = initial;
    for (let m = 0; m < years * 12; m++) b0 = b0 * (1 + r0) + monthly;
    return { points: pts, noFeeTotal: b0 };
  }, [initial, monthly, rate, years, accumFee, depositFee]);

  const final = points[points.length - 1];
  const feeImpact = Math.max(0, noFeeTotal - final.total);
  const interest = final.total - final.deposits;
  const maxVal = Math.max(final.total, 1);
  const barPct = (v: number) => Math.max(1.5, (v / maxVal) * 100);
  const rows = points.filter(
    (_, i) => i === 0 || i % Math.max(1, Math.floor(years / 8)) === 0 || i === years
  );

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    border: "2px solid #E8EDFF",
    fontSize: "0.95rem",
    outline: "none",
    direction: "rtl",
    boxSizing: "border-box",
    fontFamily: "inherit",
    color: "#292929",
    background: "#FAFBFF",
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontWeight: 600,
    color: "#292929",
    marginBottom: 8,
    fontSize: "0.88rem",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: EASE }}
      style={{
        background: "white",
        borderRadius: 24,
        padding: "40px 36px",
        border: "2px solid #E8EDFF",
        boxShadow: "0 8px 48px rgba(18,74,240,0.08)",
      }}
    >
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#124AF0", marginBottom: 6 }}>
          מחשבון ריבית דריבית
        </h2>
        <p style={{ color: "#444", fontSize: "0.88rem" }}>כולל דמי ניהול מצבירה ומהפקדה</p>
      </div>

      {/* Inputs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 32 }}>
        <div>
          <label style={labelStyle}>סכום התחלתי (₪)</label>
          <input type="number" value={initial} min={0} onChange={e => setInitial(+e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>הפקדה חודשית (₪)</label>
          <input type="number" value={monthly} min={0} onChange={e => setMonthly(+e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>
            תשואה שנתית: <strong style={{ color: "#124AF0" }}>{rate}%</strong>
          </label>
          <input type="range" min={1} max={15} step={0.5} value={rate}
            onChange={e => setRate(+e.target.value)}
            style={{ width: "100%", accentColor: "#124AF0", cursor: "pointer" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#777", marginTop: 4 }}>
            <span>1%</span><span>שוק מנייתי ~10%</span><span>15%</span>
          </div>
        </div>
        <div>
          <label style={labelStyle}>
            מספר שנים: <strong style={{ color: "#124AF0" }}>{years}</strong>
          </label>
          <input type="range" min={1} max={40} value={years}
            onChange={e => setYears(+e.target.value)}
            style={{ width: "100%", accentColor: "#124AF0", cursor: "pointer" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#777", marginTop: 4 }}>
            <span>1</span><span>40</span>
          </div>
        </div>
        <div>
          <label style={labelStyle}>
            דמי ניהול מצבירה: <strong style={{ color: "#FA5C5C" }}>{accumFee.toFixed(2)}%</strong>
            <span style={{ fontSize: "0.72rem", color: "#555", fontWeight: 400, marginRight: 6 }}>/ שנה מהיתרה</span>

          </label>
          <input type="range" min={0} max={2} step={0.05} value={accumFee}
            onChange={e => setAccumFee(+e.target.value)}
            style={{ width: "100%", accentColor: "#FA5C5C", cursor: "pointer" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#777", marginTop: 4 }}>
            <span>0%</span><span>2%</span>
          </div>
        </div>
        <div>
          <label style={labelStyle}>
            דמי ניהול מהפקדה: <strong style={{ color: "#FA5C5C" }}>{depositFee.toFixed(1)}%</strong>
            <span style={{ fontSize: "0.72rem", color: "#555", fontWeight: 400, marginRight: 6 }}>מכל הפקדה</span>
          </label>
          <input type="range" min={0} max={5} step={0.1} value={depositFee}
            onChange={e => setDepositFee(+e.target.value)}
            style={{ width: "100%", accentColor: "#FA5C5C", cursor: "pointer" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#777", marginTop: 4 }}>
            <span>0%</span><span>5%</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 24 }}>
        {[
          { label: "סכום סופי", value: Math.round(final.total).toLocaleString("he-IL") + " ₪", color: "#124AF0", bold: true },
          { label: "סך הפקדות", value: Math.round(final.deposits).toLocaleString("he-IL") + " ₪", color: "#333" },
          { label: "רווח מריבית", value: Math.round(interest).toLocaleString("he-IL") + " ₪", color: "#1a9e6e" },
          { label: "עלות דמי ניהול", value: Math.round(feeImpact).toLocaleString("he-IL") + " ₪", color: "#FA5C5C" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#F4F7FF", borderRadius: 14, padding: "18px 14px", textAlign: "center" }}>
            <p style={{ color: "#444", fontSize: "0.72rem", margin: "0 0 8px", lineHeight: 1.4 }}>{s.label}</p>
            <p style={{ color: s.color, fontSize: s.bold ? "1.1rem" : "0.9rem", fontWeight: 700, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Fee warning */}
      {feeImpact > 5000 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            background: "#FFF5F5",
            border: "1.5px solid #FA5C5C",
            borderRadius: 14,
            padding: "16px 20px",
            marginBottom: 28,
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: "50%", background: "#FA5C5C",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2,
          }}>
            <span style={{ color: "white", fontWeight: 900, fontSize: "0.95rem" }}>!</span>
          </div>
          <p style={{ margin: 0, fontSize: "0.88rem", color: "#c0392b", lineHeight: 1.7 }}>
            <strong>תשומת ליבך:</strong> דמי הניהול עולים לך{" "}
            <strong>{Math.round(feeImpact).toLocaleString("he-IL")} ₪</strong> לאורך {years} שנה{" "}
            <span style={{ fontSize: "0.75em" }}>—</span>{" "}
            זה ההבדל בין לפרוש בשקט לבין לעבוד עוד {Math.max(1, Math.round(feeImpact / (monthly * 12)))} שנה.
          </p>
        </motion.div>
      )}

      {/* Bar chart */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {rows.map(d => (
          <div key={d.year} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 44, textAlign: "left", fontSize: "0.75rem", color: "#555", flexShrink: 0 }}>
              שנה {d.year}
            </span>
            <div style={{ flex: 1, height: 18, background: "#F4F7FF", borderRadius: 5, overflow: "hidden", position: "relative" }}>
              <motion.div
                style={{ position: "absolute", top: 0, right: 0, height: "100%", background: "#E8EDFF" }}
                animate={{ width: `${barPct(d.deposits)}%` }}
                transition={{ duration: 0.35, ease: EASE }}
              />
              <motion.div
                style={{ position: "absolute", top: 0, right: 0, height: "100%", background: "linear-gradient(90deg, #21F0B0, #124AF0)" }}
                animate={{ width: `${barPct(d.total)}%` }}
                transition={{ duration: 0.35, ease: EASE }}
              />
            </div>
            <span style={{ width: 88, textAlign: "right", fontSize: "0.75rem", color: "#333", flexShrink: 0 }}>
              {d.total >= 1_000_000
                ? `${(d.total / 1_000_000).toFixed(1)}M ₪`
                : d.total >= 1000
                ? `${Math.round(d.total / 1000)}K ₪`
                : `${Math.round(d.total)} ₪`}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 20, marginTop: 14, justifyContent: "center" }}>
        {[
          { bg: "linear-gradient(90deg, #21F0B0, #124AF0)", label: "סכום כולל" },
          { bg: "#E8EDFF", label: "סך הפקדות בלבד" },
        ].map((l, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: l.bg }} />
            <span style={{ fontSize: "0.77rem", color: "#444" }}>{l.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   HOW TO USE
════════════════════════════════════════════════════════ */
function HowToUse() {
  const steps = [
    { num: "01", title: "סכום התחלתי", desc: "כמה כסף יש לך היום? גם 0 זה בסדר גמור – הקסם מתחיל גם מאפס." },
    { num: "02", title: "הפקדה חודשית", desc: "כמה תוסיפי כל חודש? גם 200 ₪ מספיקים. העיקר – קבועות." },
    { num: "03", title: "תשואה שנתית", desc: "ממוצע שוק המניות לטווח ארוך: כ-7-8%. אם לא בטוחה – השאירי 7%." },
    { num: "04", title: "דמי ניהול", desc: "בדקי בדף הפנסיה שלך מה את משלמת. הוסיפי ותראי את ההשפעה." },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
      {steps.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
          style={{ background: "white", borderRadius: 20, padding: "28px 24px", border: "2px solid #E8EDFF", position: "relative" }}
        >
          <img
            src="/badge-proof.png"
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              width: 36,
              height: "auto",
              animation: "badgeBounce 2.8s ease-in-out infinite",
              animationDelay: `${i * 0.4}s`,
            }}
          />
          <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#E8EDFF", marginBottom: 12, fontFamily: "Heebo, Arial, sans-serif" }}>
            {s.num}
          </div>
          <h3 style={{ fontWeight: 700, color: "#124AF0", fontSize: "0.95rem", marginBottom: 10 }}>{s.title}</h3>
          <p style={{ color: "#444", fontSize: "0.88rem", lineHeight: 1.75 }}>{s.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   RIDDLE SECTION
════════════════════════════════════════════════════════ */
function RiddleSection() {
  const [choice, setChoice] = useState<"penny" | "million" | null>(null);
  const [revealed, setRevealed] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!revealed ? (
        /* ── QUESTION ── */
        <motion.div
          key="q"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
              style={{
                display: "inline-block",
                background: "rgba(33,240,176,0.15)",
                color: "#21F0B0",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: 1,
                padding: "5px 18px",
                borderRadius: 50,
                marginBottom: 20,
                border: "1px solid rgba(33,240,176,0.3)",
              }}
            >
              חידה לילדים (ולמבוגרים)
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, color: "white", lineHeight: 1.25, marginBottom: 16 }}
            >
              מה הייתן בוחרות?
            </motion.h2>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} style={{ marginBottom: 12 }}>
              <SketchLine color="#FA5C5C" id="sketch-riddle" delay={0.45} onMount />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ color: "rgba(255,255,255,0.92)", fontSize: "1rem" }}
            >
              שאלי את הילדים. שאלי את הבעל. ואז תראי להם את התשובה.
            </motion.p>
          </div>

          {/* Click instruction */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5, ease: EASE }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 24 }}
          >
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.88rem", fontStyle: "italic" }}>
              לחצי על הבחירה שלך
            </span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: "#21F0B0", fontSize: "1.3rem", lineHeight: 1 }}
            >
              ↓
            </motion.span>
          </motion.div>

          {/* Choices */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, maxWidth: 680, margin: "0 auto 48px" }}>
            {/* Option A */}
            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
              onClick={() => setChoice("penny")}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: choice === "penny" ? "rgba(33,240,176,0.15)" : "rgba(255,255,255,0.05)",
                border: `2.5px solid ${choice === "penny" ? "#21F0B0" : "rgba(255,255,255,0.15)"}`,
                borderRadius: 24,
                padding: "36px 24px",
                cursor: "pointer",
                textAlign: "center",
                transition: "border-color 0.2s, background 0.2s",
                fontFamily: "inherit",
              }}
            >
              <div style={{
                width: 72, height: 72, borderRadius: "50%", background: "#21F0B0",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px", flexDirection: "column", gap: 2,
              }}>
                <span style={{ fontWeight: 900, color: "#060D3C", fontSize: "1.1rem", fontFamily: "Heebo, Arial, sans-serif", lineHeight: 1 }}>10</span>
                <span style={{ fontWeight: 700, color: "#060D3C", fontSize: "0.65rem", lineHeight: 1 }}>אג׳</span>
              </div>
              <h3 style={{ color: "white", fontWeight: 800, fontSize: "1.15rem", marginBottom: 12 }}>10 אגורות</h3>
              <p style={{ color: "rgba(255,255,255,0.92)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                שמכפילות את עצמן כל יום<br />
                למשך <strong style={{ color: "#21F0B0" }}>30 יום</strong>
              </p>
              {choice === "penny" && (
                <div style={{ marginTop: 14, background: "rgba(33,240,176,0.2)", borderRadius: 8, padding: "6px 12px", display: "inline-block" }}>
                  <span style={{ color: "#21F0B0", fontSize: "0.82rem", fontWeight: 700 }}>הבחירה שלי</span>
                </div>
              )}
            </motion.button>

            {/* Option B */}
            <motion.button
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
              onClick={() => setChoice("million")}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: choice === "million" ? "rgba(250,92,92,0.15)" : "rgba(255,255,255,0.05)",
                border: `2.5px solid ${choice === "million" ? "#FA5C5C" : "rgba(255,255,255,0.15)"}`,
                borderRadius: 24,
                padding: "36px 24px",
                cursor: "pointer",
                textAlign: "center",
                transition: "border-color 0.2s, background 0.2s",
                fontFamily: "inherit",
              }}
            >
              <div style={{
                width: 72, height: 72, borderRadius: "50%", background: "#FA5C5C",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px",
              }}>
                <span style={{ fontWeight: 900, color: "white", fontSize: "0.88rem", fontFamily: "Heebo, Arial, sans-serif" }}>₪1M</span>
              </div>
              <h3 style={{ color: "white", fontWeight: 800, fontSize: "1.15rem", marginBottom: 12 }}>מיליון שקל</h3>
              <p style={{ color: "rgba(255,255,255,0.92)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                מזומן, עכשיו,<br />
                <strong style={{ color: "#FA5C5C" }}>ביד</strong>
              </p>
              {choice === "million" && (
                <div style={{ marginTop: 14, background: "rgba(250,92,92,0.2)", borderRadius: 8, padding: "6px 12px", display: "inline-block" }}>
                  <span style={{ color: "#FA5C5C", fontSize: "0.82rem", fontWeight: 700 }}>הבחירה שלי</span>
                </div>
              )}
            </motion.button>
          </div>

          {/* Reveal button */}
          <AnimatePresence>
            {choice && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                style={{ textAlign: "center" }}
              >
                <motion.button
                  onClick={() => setRevealed(true)}
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    position: "relative",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    display: "inline-block",
                    padding: 0,
                  }}
                >
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    backgroundImage: "url('/btn-red.svg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "110% 560%",
                    backgroundPosition: "center 41%",
                    borderRadius: 50,
                  }} />
                  <span style={{
                    position: "relative",
                    zIndex: 1,
                    color: "#FFFFFF",
                    padding: "20px 64px",
                    fontWeight: 800,
                    fontSize: "1.05rem",
                    display: "block",
                    whiteSpace: "nowrap",
                    textShadow: "0 0 12px rgba(255,255,255,0.8)",
                  }}>
                    גלי את התשובה <span className="arrow-anim">←</span>
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* ── REVEAL ── */
        <motion.div
          key="reveal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Dramatic headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            {choice === "million" ? (
              <p style={{ color: "#FA5C5C", fontWeight: 700, fontSize: "1rem", marginBottom: 12 }}>
                בחרת במיליון... ועשית טעות
              </p>
            ) : (
              <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "1rem", marginBottom: 12 }}>
                בחרת ב-10 אגורות... בחרת נכון!
              </p>
            )}
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "white", lineHeight: 1.2, marginBottom: 20 }}>
              10 אגורות × 30 יום
              <span style={{ color: "#21F0B0", display: "block" }}>= 53,687,091 ₪</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.92)", fontSize: "1rem", maxWidth: 520, margin: "0 auto 10px" }}>
              המיליון מגיע ביום ה-25. ביום ה-30 יש לך פי 53 מהמיליון.
            </p>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.88rem" }}>
              זו לא מתמטיקה. זה קסם. וזה נקרא ריבית דריבית.
            </p>
          </motion.div>

          {/* 30-day infographic */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: 24,
              padding: "36px 32px",
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: 28,
            }}
          >
            <h3 style={{ color: "white", fontWeight: 700, fontSize: "1.05rem", marginBottom: 28, textAlign: "center" }}>
              30 יום <span style={{ fontSize: "0.75em" }}>—</span> מ-10 אגורות ל-53 מיליון
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {PENNY_DAYS.map((d, i) => {
                const logVal = Math.log10(d.value + 0.01);
                const pct = Math.max(1.5, (logVal / LOG_MAX) * 100);
                const isMillion = d.day === 25;
                const isLast = d.day === 30;
                const isBig = isMillion || isLast;
                const barColor = isLast
                  ? "linear-gradient(90deg, #21F0B0, #124AF0)"
                  : isMillion
                  ? "#21F0B0"
                  : d.value >= 50000
                  ? "#124AF0"
                  : d.value >= 100
                  ? "#1a9e6e"
                  : "rgba(33,240,176,0.5)";

                return (
                  <motion.div
                    key={d.day}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.025, duration: 0.3, ease: EASE }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: isBig ? "8px 12px" : "3px 0",
                      background: isBig ? "rgba(33,240,176,0.07)" : "transparent",
                      borderRadius: isBig ? 12 : 0,
                      border: isBig ? "1px solid rgba(33,240,176,0.2)" : "none",
                    }}
                  >
                    <span style={{
                      width: 32,
                      fontSize: "0.73rem",
                      textAlign: "center",
                      flexShrink: 0,
                      color: isBig ? "#21F0B0" : "rgba(255,255,255,0.4)",
                      fontWeight: isBig ? 700 : 400,
                    }}>
                      {d.day}
                    </span>
                    <div style={{ flex: 1, height: 14, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.6 + i * 0.03, duration: 0.4, ease: EASE }}
                        style={{ height: "100%", background: barColor, borderRadius: 4 }}
                      />
                    </div>
                    <span style={{
                      width: 92,
                      textAlign: "left",
                      flexShrink: 0,
                      fontSize: isBig ? "0.85rem" : "0.72rem",
                      fontWeight: isBig ? 700 : 400,
                      color: isBig ? "#21F0B0" : "rgba(255,255,255,0.65)",
                    }}>
                      {fmt(d.value)}
                    </span>
                    {MILESTONES[d.day] && (
                      <span style={{
                        fontSize: "0.7rem",
                        flexShrink: 0,
                        fontStyle: "italic",
                        color: isBig ? "#21F0B0" : "rgba(255,255,255,0.35)",
                      }}>
                        {MILESTONES[d.day]}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Comparison cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 32 }}>
              <div style={{
                background: "rgba(250,92,92,0.1)",
                border: "1.5px solid rgba(250,92,92,0.25)",
                borderRadius: 16,
                padding: "22px 18px",
                textAlign: "center",
              }}>
                <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.8rem", marginBottom: 10 }}>
                  המיליון שחשבת שהוא הרבה
                </p>
                <p style={{ color: "#FA5C5C", fontSize: "1.6rem", fontWeight: 700 }}>1,000,000 ₪</p>
              </div>
              <div style={{
                background: "rgba(33,240,176,0.1)",
                border: "1.5px solid rgba(33,240,176,0.25)",
                borderRadius: 16,
                padding: "22px 18px",
                textAlign: "center",
              }}>
                <p style={{ color: "#21F0B0", fontSize: "0.8rem", marginBottom: 10 }}>
                  10 אגורות × 30 יום
                </p>
                <p style={{ color: "#21F0B0", fontSize: "1.6rem", fontWeight: 700 }}>53,687,091 ₪</p>
              </div>
            </div>
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.78)", fontSize: "0.8rem", marginTop: 14 }}>
              פי 53.7 מהמיליון שנראה לך גדול
            </p>
          </motion.div>

          {/* ── Infographic image ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
            style={{ marginBottom: 40 }}
          >
            <img
              src="/infographic-compound.png"
              alt="כוחה המטורף של ההכפלה: מ-10 אגורות ל-53 מיליון ש״ח"
              style={{
                width: "100%",
                borderRadius: 20,
                boxShadow: "0 16px 64px rgba(0,0,0,0.5)",
                display: "block",
              }}
            />
          </motion.div>

          {/* ── Rational dramatic explanation ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.7, ease: EASE }}
          >
            {/* Main insight */}
            <div style={{
              background: "rgba(255,255,255,0.06)",
              borderRadius: 20,
              padding: "36px 32px",
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: 20,
            }}>
              <h3 style={{ color: "white", fontWeight: 800, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", lineHeight: 1.5, marginBottom: 20 }}>
                למה זה לא נראה כך בחיים האמיתיים?
              </h3>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.9, marginBottom: 16 }}>
                כי <strong style={{ color: "#21F0B0" }}>90% מהקסם קורה ב-20% האחרון מהזמן</strong>.
                {" "}ביום ה-25 עברנו את המיליון.
                {" "}ביום ה-30 יש לנו 53 מיליון.
                {" "}5 ימים אחרונים = 52 מיליון רווח.
              </p>
              <p style={{ color: "rgba(255,255,255,0.92)", fontSize: "0.95rem", lineHeight: 1.9 }}>
                מי שנסבלת רק עד יום ה-20 רואה 52,000 ₪ ומתפרגנת לעצמה.
                מי שמחזיקה עד יום ה-30 מקבלת 53 מיליון.
                ההבדל? <strong style={{ color: "#FA5C5C" }}>סבלנות של 10 ימים.</strong>
              </p>
            </div>

            {/* 3 key insights */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {[
                {
                  num: "01",
                  color: "#21F0B0",
                  title: "ההתחלה תמיד מאכזבת",
                  text: "ימים 1-15 נראים כמו כלום. מסטיק. קפה. ספר. המוח אומר לנו: זה לא שווה. זו הטעות. הגדול מחכה בסוף.",
                },
                {
                  num: "02",
                  color: "#124AF0",
                  title: "הזמן הוא הדלק",
                  text: "בדיוק כמו בדוגמה – הקסם לא בסכום ההתחלתי. הקסם בזמן שנתת לו לעבוד. לא ניתן לקנות זמן שכבר עבר.",
                },
                {
                  num: "03",
                  color: "#FA5C5C",
                  title: "דמי הניהול הם הגנב",
                  text: "1% דמי ניהול = יום פחות. כל שנה. כל חודש. זה לא 1% מהכסף שלך – זה 1% מכל כפל עתידי שיצא ממנו.",
                },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9 + i * 0.12, duration: 0.5, ease: EASE }}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 16,
                    padding: "24px 20px",
                    borderTop: `3px solid ${b.color}`,
                  }}
                >
                  <span style={{ fontSize: "1.6rem", fontWeight: 900, color: b.color, opacity: 0.3, fontFamily: "Heebo, Arial, sans-serif", display: "block", marginBottom: 10 }}>
                    {b.num}
                  </span>
                  <h4 style={{ color: "white", fontWeight: 700, fontSize: "0.95rem", marginBottom: 10 }}>{b.title}</h4>
                  <p style={{ color: "rgba(255,255,255,0.92)", fontSize: "0.86rem", lineHeight: 1.8 }}>{b.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Closing punch */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.3, duration: 0.6 }}
              style={{ marginTop: 28, textAlign: "center", padding: "24px 20px", background: "rgba(33,240,176,0.07)", borderRadius: 16, border: "1px solid rgba(33,240,176,0.2)" }}
            >
              <p style={{ color: "white", fontWeight: 700, fontSize: "clamp(1rem, 2.5vw, 1.2rem)", lineHeight: 1.7, marginBottom: 8 }}>
                10 אגורות לא הפכו ל-53 מיליון בגלל מזל.
              </p>
              <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "clamp(1rem, 2.5vw, 1.2rem)", lineHeight: 1.7 }}>
                הן הפכו ל-53 מיליון כי מישהי לא נגעה בהן 30 יום.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ════════════════════════════════════════════════════════
   EXPLANATION
════════════════════════════════════════════════════════ */
function ExplanationSection() {
  const blocks = [
    {
      title: "מה זה בכלל ריבית דריבית?",
      text: "ריבית דריבית זה כשהרווחים שלך מתחילים גם הם לעשות רווחים. לא רק הכסף המקורי – גם הריבית עצמה מרוויחה ריבית. כמו כדור שלג שמתגלגל: ככל שמתגלגל, כך הוא גדל מהר יותר.",
    },
    {
      title: "למה רוב האנשים לא מבינים את זה?",
      text: "המוח שלנו מתוכנת לחשוב בקווים ישרים. אנחנו מתקשות לדמיין צמיחה שמאיצה את עצמה. זה לא חוסר אינטליגנציה – זה פשוט איך המוח האנושי עובד.",
    },
    {
      title: "מה זה אומר עבורי בפועל?",
      text: "זמן הוא המשאב הכי יקר שלך. 500 ₪ בחודש בגיל 25 שווים הרבה יותר מ-1,000 ₪ בחודש בגיל 45. לא כי הכסף שונה – אלא כי ל-500 ₪ יש יותר זמן לגדול.",
    },
    {
      title: "ומה עם דמי הניהול?",
      text: "דמי ניהול של 1% נשמעים זניחים. אבל 1% כל שנה, כפול הרבה שנים, שקול לאבד שנות עבודה שלמות. בדיוק בגלל זה ריבית דריבית יכולה לעבוד נגדך – כשהיא בצד של מישהי אחרת.",
    },
  ];

  return (
    <section id="explain" style={{ background: "white", padding: "80px 1.5rem", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <span style={{
            display: "inline-block",
            background: "#124AF0",
            color: "#21F0B0",
            fontWeight: 700,
            fontSize: "0.85rem",
            letterSpacing: 1,
            padding: "4px 18px",
            borderRadius: 50,
            marginBottom: 18,
          }}>
            ידע = כוח
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: "#070C24", lineHeight: 1.3 }}>
            ריבית דריבית בגובה העיניים
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: 24, marginBottom: 48 }}>
          {blocks.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
              style={{
                background: "#F4F7FF",
                borderRadius: 20,
                padding: "32px 28px",
                border: "2px solid #E8EDFF",
                borderRight: "4px solid #124AF0",
                position: "relative",
              }}
            >
              <img
                src="/badge-proof.png"
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  width: 32,
                  height: "auto",
                  animation: "badgeBounce 3s ease-in-out infinite",
                  animationDelay: `${i * 0.5}s`,
                }}
              />
              <h3 style={{ fontWeight: 700, color: "#124AF0", fontSize: "1.02rem", marginBottom: 14 }}>{b.title}</h3>
              <p style={{ color: "#333", fontSize: "0.93rem", lineHeight: 1.85 }}>{b.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Einstein quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
          style={{
            background: "#070C24",
            borderRadius: 20,
            padding: "40px 36px",
            position: "relative",
            overflow: "hidden",
            margin: 0,
          }}
        >
          <div style={{
            position: "absolute", top: -40, left: -40, width: 200, height: 200,
            borderRadius: "50%", background: "rgba(33,240,176,0.07)", filter: "blur(50px)", pointerEvents: "none",
          }} />
          <p style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.55rem)",
            color: "white",
            fontWeight: 700,
            lineHeight: 1.65,
            position: "relative",
            marginBottom: 20,
          }}>
            "ריבית דריבית היא הפלא השמיני בתבל. מי שמבינה אותה{" "}
            <span style={{ color: "#21F0B0" }}>מרוויחה</span> אותה,
            ומי שאינה מבינה <span style={{ fontSize: "0.75em" }}>—</span>{" "}
            <span style={{ color: "#FA5C5C" }}>משלמת</span> אותה."
          </p>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.88rem", margin: 0 }}>
            <span style={{ fontSize: "0.75em" }}>—</span> מיוחס לאלברט איינשטיין
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════ */
const SITE_URL = "https://www.matzav-tzvira.co.il";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "מחשבון ריבית דריבית",
      description: "מחשבון ריבית דריבית חינמי — חשבי כמה הכסף שלך יגדל לאורך שנים, כולל דמי ניהול ודמי צבירה",
      url: `${SITE_URL}/calculators/compound-interest`,
      applicationCategory: "FinanceApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "ILS" },
      provider: { "@type": "Organization", name: "מצב צבירה", url: SITE_URL },
      inLanguage: "he",
      operatingSystem: "Web",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "מה זה ריבית דריבית?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ריבית דריבית זה כשהרווחים שלך מתחילים גם הם לעשות רווחים. לא רק הכסף המקורי — גם הריבית עצמה מרוויחה ריבית. כמו כדור שלג שמתגלגל: ככל שמתגלגל, כך הוא גדל מהר יותר.",
          },
        },
        {
          "@type": "Question",
          name: "כמה כסף אצבור עם ריבית דריבית?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "זה תלוי בסכום ההתחלתי, ההפקדה החודשית, שיעור התשואה השנתית ומספר השנים. לדוגמה: 500 ₪ בחודש עם תשואה שנתית של 10% לאורך 30 שנה יצמחו למעל מיליון שקלים. השתמשי במחשבון החינמי שלנו לחישוב מדויק עם הנתונים שלך.",
          },
        },
        {
          "@type": "Question",
          name: "מה ההשפעה של דמי הניהול על ריבית דריבית?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "דמי ניהול של 1% נשמעים זניחים, אבל לאורך 30 שנה הם יכולים לגרום להפסד של עשרות עד מאות אלפי שקלים בגלל אפקט ריבית הדריבית. בדיוק בגלל זה חשוב להוריד דמי ניהול בפנסיה ובקרן ההשתלמות.",
          },
        },
        {
          "@type": "Question",
          name: "מה התשואה הממוצעת בשוק המניות?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "התשואה הממוצעת ההיסטורית של שוק המניות הגלובלי עומדת על כ-10% בשנה לפני אינפלציה. זה ממוצע לאורך עשרות שנים — בשנים ספציפיות יכולות להיות עליות וירידות משמעותיות.",
          },
        },
        {
          "@type": "Question",
          name: "מתי הכי כדאי להתחיל לחסוך?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ככל שמתחילים מוקדם יותר, כך ריבית הדריבית עובדת יותר זמן לטובתך. 200 ₪ בחודש מגיל 25 שווים הרבה יותר מ-500 ₪ בחודש מגיל 45, בגלל הזמן שנוסף לצמיחה.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "דף הבית", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "מחשבונים", item: `${SITE_URL}/calculators` },
        { "@type": "ListItem", position: 3, name: "מחשבון ריבית דריבית", item: `${SITE_URL}/calculators/compound-interest` },
      ],
    },
  ],
};

export default function CompoundInterestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation />

      {/* Floating CTA */}
      <a
        href="#calculator"
        aria-label="לחישוב מהיר"
        style={{
          position: "fixed",
          bottom: 32,
          left: 24,
          zIndex: 999,
          background: "#FFFFFF",
          color: "#124AF0",
          border: "2.5px solid #124AF0",
          padding: "14px 28px",
          borderRadius: 50,
          fontWeight: 800,
          fontSize: "0.95rem",
          textDecoration: "none",
          boxShadow: "0 6px 28px rgba(18,74,240,0.25)",
          whiteSpace: "nowrap",
          animation: "floatBtn 3s ease-in-out infinite",
        }}
      >
        לחישוב מהיר <span className="arrow-anim">←</span>
      </a>
      <style>{`
        @keyframes floatBtn { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes slippersFloat {
          0%   { transform: translateY(0px) rotate(-4deg); }
          25%  { transform: translateY(-10px) rotate(2deg); }
          50%  { transform: translateY(-14px) rotate(-2deg); }
          75%  { transform: translateY(-6px) rotate(3deg); }
          100% { transform: translateY(0px) rotate(-4deg); }
        }
        @keyframes badgeBounce {
          0%,100% { transform: translateY(0) scale(1); }
          40%     { transform: translateY(-5px) scale(1.08); }
          60%     { transform: translateY(-3px) scale(1.04); }
        }
        @keyframes underlineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      <main id="main-content" tabIndex={-1} style={{ paddingTop: 80 }}>

        {/* ── HERO ── */}
        <section style={{
          background: "radial-gradient(ellipse at 50% 30%, #1535B5 0%, #060D3C 65%)",
          padding: "80px 1.5rem 96px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(33,240,176,0.06)", filter: "blur(80px)", animation: "float 12s ease-in-out infinite", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(18,74,240,0.12)", filter: "blur(60px)", animation: "floatAlt 10s ease-in-out infinite", pointerEvents: "none" }} />

          <div style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}>
            {/* Slippers + badge — inline */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
              style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 20, marginBottom: 24, flexWrap: "wrap" }}
            >
              <motion.img
                src="/slippers.svg"
                alt="נעלי בית אדומות"
                initial={{ scale: 0.5, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.7, type: "spring", stiffness: 220, damping: 14 }}
                style={{
                  height: 130,
                  width: "auto",
                  filter: "drop-shadow(0 10px 24px rgba(250,92,92,0.5)) drop-shadow(0 2px 6px rgba(0,0,0,0.2))",
                  animation: "slippersFloat 3.2s ease-in-out infinite",
                  transformOrigin: "center bottom",
                  flexShrink: 0,
                  marginBottom: 6,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginBottom: 6 }}>
                <span style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.95rem", letterSpacing: 1.5 }}>
                  שוק ההון בנעלי בית
                </span>
                <div style={{ width: 180 }}>
                  <SketchLine color="#21F0B0" id="sketch-slippers" delay={0.7} onMount />
                </div>
              </div>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5rem)",
                fontWeight: 900,
                color: "white",
                lineHeight: 1.1,
                marginBottom: 24,
                textShadow: "0 0 40px rgba(33,240,176,0.18)",
              }}
            >
              ריבית דריבית
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
              style={{ color: "rgba(255,255,255,0.82)", fontSize: "clamp(1rem, 2.5vw, 1.22rem)", lineHeight: 1.8, marginBottom: 36 }}
            >
              הפלא השמיני בתבל{" "}
              <span style={{ fontSize: "0.75em" }}>—</span>{" "}
              מי שמבינה אותה <span style={{ color: "#21F0B0", fontWeight: 700 }}>מרוויחה</span>,
              ומי שאינה מבינה <span style={{ fontSize: "0.75em" }}>—</span>{" "}
              <span style={{ color: "#FA5C5C", fontWeight: 700 }}>עובדת כל ימיה</span>.
            </motion.p>

            {/* Nav pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: EASE }}
              style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
            >
              {[
                { href: "#calculator", label: "המחשבון" },
                { href: "#riddle", label: "החידה" },
                { href: "#explain", label: "ההסבר" },
              ].map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.8)",
                    borderRadius: 50,
                    padding: "9px 24px",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    border: "1px solid rgba(255,255,255,0.18)",
                    transition: "all 0.2s",
                  }}
                >
                  {l.label}
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        <AnimatedStripe />
        {/* Diagonal: blue → light */}
        <div style={{ height: 56, background: "#F4F7FF", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 0,56" fill="#124AF0" />
          </svg>
        </div>

        {/* ── CALCULATOR ── */}
        <section id="calculator" style={{ background: "#F4F7FF", padding: "64px 1.5rem 72px", scrollMarginTop: 80 }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ marginBottom: 40 }}
            >
              <p style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.85rem", letterSpacing: 1, marginBottom: 12 }}>
                כלי חינמי
              </p>
              <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", color: "#070C24", fontWeight: 700, marginBottom: 12 }}>
                המחשבון הפרקטי
              </h2>
              <p style={{ color: "#444", fontSize: "1rem", lineHeight: 1.8 }}>
                תראי בדיוק מה קורה לכסף שלך <span style={{ fontSize: "0.75em" }}>—</span> כולל הנזק האמיתי של דמי הניהול.
              </p>
            </motion.div>
            <CompoundCalculator />
          </div>
        </section>

        {/* ── HOW TO USE ── */}
        <section style={{ background: "white", padding: "64px 1.5rem" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ textAlign: "center", marginBottom: 36 }}
            >
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#070C24", fontWeight: 700, marginBottom: 6 }}>
                איך משתמשים במחשבון?
              </h2>
              <div style={{ maxWidth: 300, margin: "0 auto 10px" }}>
                <SketchLine color="#124AF0" id="sketch-howto" />
              </div>
              <p style={{ color: "#444", fontSize: "0.95rem" }}>ארבעה צעדים פשוטים</p>
            </motion.div>
            <HowToUse />
          </div>
        </section>

        <AnimatedStripe />
        {/* Diagonal: blue → dark */}
        <div style={{ height: 56, background: "radial-gradient(ellipse at 50% 0%, #1535B5 0%, #060D3C 80%)", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 1440,56" fill="#124AF0" />
          </svg>
        </div>

        {/* ── RIDDLE ── */}
        <section id="riddle" style={{
          background: "radial-gradient(ellipse at 50% 30%, #1535B5 0%, #060D3C 65%)",
          padding: "88px 1.5rem 96px",
          scrollMarginTop: 80,
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 60, right: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(33,240,176,0.04)", filter: "blur(80px)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}>
            <RiddleSection />
          </div>
        </section>

        <AnimatedStripe />
        {/* Diagonal: blue → white */}
        <div style={{ height: 56, background: "white", overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" width="100%" height="100%" style={{ display: "block" }}>
            <polygon points="0,0 1440,0 0,56" fill="#124AF0" />
          </svg>
        </div>

        {/* ── EXPLANATION ── */}
        <ExplanationSection />

        {/* ── CTA ── */}
        <section style={{ background: "#124AF0", padding: "72px 1.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(33,240,176,0.08)", filter: "blur(60px)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1, marginBottom: 16 }}>
                מהמחשבון לידע אמיתי
              </p>
              <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "white", fontWeight: 700, marginBottom: 8, textShadow: "0 0 12px rgba(255,255,255,0.15)" }}>
                רוצה להבין את זה לעומק?
              </h2>
              <div style={{ maxWidth: 340, margin: "0 auto 20px" }}>
                <SketchLine color="#21F0B0" id="sketch-explain" />
              </div>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.85, marginBottom: 36 }}>
                בתוכנית המאסטריות לומדים ריבית דריבית, שוק ההון, פנסיה והשקעות{" "}
                <span style={{ fontSize: "0.75em" }}>—</span>{" "}
                בשפה שלנו, בנעלי בית, בלי נוסחאות מסובכות.
              </p>
              <Link
                href="/course"
                style={{ position: "relative", display: "inline-block", textDecoration: "none" }}
              >
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  backgroundImage: "url('/btn-blue-new.svg?v=2')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "110% 560%",
                  backgroundPosition: "center 41%",
                }} />
                <span style={{
                  position: "relative", zIndex: 1, color: "#FFFFFF",
                  padding: "20px 64px", fontWeight: 800, fontSize: "1.05rem",
                  display: "block", whiteSpace: "nowrap",
                  textShadow: "0 0 12px rgba(255,255,255,0.8)",
                }}>
                  לתוכנית המאסטריות <span className="arrow-anim">←</span>
                </span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Back link */}
        <section style={{ background: "white", padding: "28px 1.5rem", textAlign: "center", borderTop: "1px solid #E8EDFF" }}>
          <Link href="/calculators" style={{ color: "#124AF0", fontWeight: 600, fontSize: "0.9rem", borderBottom: "2px solid #21F0B0", paddingBottom: 2 }}>
            ← חזרה לכל המחשבונים
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
