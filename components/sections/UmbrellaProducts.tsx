"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const products = [
  {
    video: "/must-video.mp4",
    badge: "חובה לכל אישה עם נעלי בית",
    badgeBg: "rgba(33,240,176,0.14)",
    badgeColor: "#0FE0A0",
    title: "שוק ההון בנעלי בית",
    desc: "התוכנית הדיגיטלית שמלמדת אותך להשקיע - בשפה קלילה ונשית, בלי ז'רגון ובלי פחד. בקצב שלך, מהבית, בכוס קפה.",
    href: "/course",
    btnLabel: "MUSTרית",
  },
  {
    video: "/vip-video.mp4",
    badge: "ליווי אישי - עושָה במקומך",
    badgeBg: "rgba(200,151,58,0.16)",
    badgeColor: "#E0A93E",
    title: "ליווי VIP",
    desc: "אני נכנסת לנעליים שלך ונותנת את כל המקצועיות שלי לתיק שלך. עושה במקומך - לא מלמדת אותך לעשות לבד.",
    href: "/vip",
    btnLabel: "ליווי VIP",
  },
];

const circles = [
  { size: 92, color: "#21F0B0", top: "20%", right: "5%", yRange: 20, delay: 0 },
  { size: 130, color: "#21F0B0", top: "16%", right: "3%", yRange: 20, delay: 0, glow: true },
  { size: 60, color: "#FA5C5C", top: "40%", right: "16%", yRange: 12, delay: 0.6 },
  { size: 96, color: "#FA5C5C", top: "30%", left: "4%", yRange: 18, delay: 0.9 },
  { size: 46, color: "#FFFFFF", bottom: "16%", left: "12%", yRange: 10, delay: 0.3 },
  { size: 40, color: "#21F0B0", bottom: "20%", right: "10%", yRange: 9, delay: 1.2 },
];

export default function UmbrellaProducts() {
  return (
    <section style={{ background: "#060D3C", position: "relative", overflow: "hidden", padding: "150px 1.5rem 80px" }}>
      {/* Blue curved/angled top wedge */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 190, background: "linear-gradient(135deg, #1E52FF, #124AF0)", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 58%)", zIndex: 0 }} />

      {/* Soft glow */}
      <div style={{ position: "absolute", top: "35%", left: "50%", transform: "translateX(-50%)", width: 620, height: 320, background: "radial-gradient(ellipse, rgba(33,240,176,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Floating decorative circles */}
      {circles.map((c, i) => (
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
            opacity: c.glow ? 0.12 : 0.5,
            filter: c.glow ? "blur(24px)" : "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 18 }}
        >
          <span style={{ background: "rgba(33,240,176,0.12)", color: "#21F0B0", border: "1px solid rgba(33,240,176,0.35)", borderRadius: 50, padding: "5px 18px", fontSize: "0.82rem", fontWeight: 700, letterSpacing: 1 }}>
            ☂ המטריה הפיננסית
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ textAlign: "center", color: "#FFFFFF", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 800, margin: "0 0 12px", lineHeight: 1.35 }}
        >
          תחת המטריה הפיננסית
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{ textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: "1.02rem", fontWeight: 500, maxWidth: 470, margin: "0 auto 40px", lineHeight: 1.6 }}
        >
          כי הגיע הזמן שגם הכסף שלך יעשה השתדלות - לא רק את.
        </motion.p>

        {/* Product cards */}
        <div className="umbrella-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 22 }}>
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.15, ease: "easeOut" }}
              whileHover={{ y: -7 }}
              style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", borderRadius: 20, overflow: "hidden", boxShadow: "0 14px 40px rgba(0,0,0,0.35)" }}
            >
              <div style={{ overflow: "hidden", lineHeight: 0 }}>
                <video autoPlay loop muted playsInline style={{ width: "100%", height: "auto", display: "block" }}>
                  <source src={p.video} type="video/mp4" />
                </video>
              </div>
              <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                <span style={{ alignSelf: "flex-start", background: "#0A1440", color: "#21F0B0", border: "1px solid rgba(33,240,176,0.45)", fontWeight: 700, fontSize: "0.78rem", borderRadius: 50, padding: "6px 16px", marginBottom: 14, letterSpacing: 0.3 }}>{p.badge}</span>
                <h3 style={{ color: "#124AF0", fontSize: "1.22rem", fontWeight: 800, margin: "0 0 8px" }}>{p.title}</h3>
                <p style={{ color: "#555", fontSize: "0.95rem", lineHeight: 1.7, margin: "0 0 18px", flex: 1 }}>{p.desc}</p>
                <Link href={p.href} style={{ display: "block", textAlign: "center", background: "#124AF0", color: "#fff", borderRadius: 50, padding: "14px 24px", fontWeight: 800, fontSize: "1.05rem", textDecoration: "none", boxShadow: "0 6px 18px rgba(18,74,240,0.3)" }}>{p.btnLabel}</Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back link */}
        <div className="no-print" style={{ textAlign: "center", marginTop: 44 }}>
          <Link href="/articles" style={{ color: "#21F0B0", fontWeight: 600, fontSize: "0.95rem", borderBottom: "2px solid rgba(33,240,176,0.5)", paddingBottom: 2, textDecoration: "none" }}>
            ← לכל המאמרים
          </Link>
        </div>
      </div>

      <style>{`
        @media(max-width:600px){
          .umbrella-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
