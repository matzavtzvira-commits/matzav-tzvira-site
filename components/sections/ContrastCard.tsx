"use client";
import { motion } from "framer-motion";

const rows = [
  {
    label: "משכורת חודשית",
    miri: { text: "30,000 ₪", sub: "מרוויחה כמו מכונה" },
    batya: { text: "6,000 ₪", sub: "מרוויחה בנחת" },
  },
  {
    label: "חתונת ילד",
    miri: { text: "לחץ", sub: "הלוואה חדשה לכל שמחה" },
    batya: { text: "300,000 ₪", sub: "מוכן מראש, בלי הפתעות" },
  },
  {
    label: "גיל פרישה",
    miri: { text: "ממשיכה לעבוד", sub: "כי אין ברירה" },
    batya: { text: "2,500,000 ₪", sub: "פנסיה שמשרתת אותה" },
  },
];

export default function ContrastCard() {
  return (
    <section style={{ background: "#060D3C", padding: "64px 1.5rem 72px", position: "relative", overflow: "hidden" }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(33,240,176,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Decorative logo circles */}
      {[
        { size: 90,  color: "#21F0B0", top: "8%",  right: "4%",  yRange: 18, delay: 0 },
        { size: 54,  color: "#FA5C5C", top: "18%", right: "14%", yRange: 12, delay: 0.6 },
        { size: 68,  color: "#FFFFFF", bottom: "10%", right: "7%",  yRange: 14, delay: 1.1 },
        { size: 44,  color: "#21F0B0", bottom: "22%", left: "5%",  yRange: 10, delay: 0.3 },
        { size: 76,  color: "#FA5C5C", top: "12%", left: "3%",  yRange: 20, delay: 0.9 },
        { size: 36,  color: "#FFFFFF", bottom: "35%", left: "14%", yRange: 8,  delay: 1.4 },
      ].map((c, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -c.yRange, 0] }}
          transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
          style={{
            position: "absolute",
            width: c.size,
            height: c.size,
            borderRadius: "50%",
            background: c.color,
            top: c.top,
            bottom: c.bottom,
            right: c.right,
            left: c.left,
            opacity: 0.55,
            pointerEvents: "none",
          }}
        />
      ))}

      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 24 }}
        >
          <span style={{ background: "rgba(33,240,176,0.12)", color: "#21F0B0", border: "1px solid rgba(33,240,176,0.35)", borderRadius: 50, padding: "5px 18px", fontSize: "0.82rem", fontWeight: 700, letterSpacing: 1 }}>
            ניסוי מחשבתי
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ textAlign: "center", color: "#FFFFFF", fontSize: "clamp(1.7rem, 4vw, 2.4rem)", marginBottom: 12, lineHeight: 1.35 }}
        >
          לא כמה את מרוויחה.
          <br />
          <span style={{ color: "#21F0B0" }}>כמה את יודעת.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{ textAlign: "center", color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", marginBottom: 40 }}
        >
          שתי נשים. שני מסלולי חיים. ההבדל?
        </motion.p>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "rgba(255,255,255,0.04)" }}>
            <div style={{ padding: "14px 12px", borderLeft: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
              <div style={{ fontWeight: 800, fontSize: "1rem", color: "#FA5C5C" }}>מירי</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>המצליחה</div>
            </div>
            <div style={{ padding: "14px 8px", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>הפרמטר</div>
            </div>
            <div style={{ padding: "14px 12px", textAlign: "center" }}>
              <div style={{ fontWeight: 800, fontSize: "1rem", color: "#21F0B0" }}>בתיה</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>המזכירה</div>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.3 + i * 0.1 }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
              }}
            >
              {/* Miri */}
              <div className="cc-cell" style={{ padding: "16px 12px", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontWeight: 800, fontSize: "1rem", color: "#FA5C5C", whiteSpace: "nowrap" }}>{row.miri.text}</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: 4, lineHeight: 1.4 }}>{row.miri.sub}</div>
              </div>
              {/* Label */}
              <div className="cc-cell" style={{ padding: "16px 8px", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{row.label}</div>
              </div>
              {/* Batya */}
              <div className="cc-cell" style={{ padding: "16px 12px", textAlign: "center" }}>
                <div style={{ fontWeight: 800, fontSize: "1rem", color: "#21F0B0", whiteSpace: "nowrap" }}>{row.batya.text}</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: 4, lineHeight: 1.4 }}>{row.batya.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Revelation line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.55 }}
          style={{ textAlign: "center", marginTop: 36, marginBottom: 32 }}
        >
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.8, marginBottom: 8 }}>
            ההבדל בין השתיים?
          </p>
          <p style={{ color: "#FFFFFF", fontWeight: 800, fontSize: "clamp(1.2rem, 3vw, 1.6rem)", lineHeight: 1.4 }}>
            דבר אחד בלבד.
            <br />
            <span style={{ color: "#21F0B0" }}>שאף אחד לא לימד את מירי.</span>
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.65 }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <a
            href="#pricing"
            style={{ position: "relative", display: "inline-block", textDecoration: "none", transition: "transform 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-green.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 43%" }} />
            <span style={{ position: "relative", zIndex: 1, color: "#070C24", padding: "18px 52px", fontWeight: 800, fontSize: "1.1rem", display: "block" }}>
              אני רוצה להיות בתיה ←
            </span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75, duration: 0.4 }}
          style={{ textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", marginTop: 14 }}
        >
          תשלום מאובטח | אחריות 14 יום - החזר מלא ללא שאלות
        </motion.p>
      </div>
    </section>
  );
}
