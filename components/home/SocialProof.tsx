"use client";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { target: 6,    suffix: "+",  label: "שנות ניסיון מהשטח" },
  { target: 329,  suffix: "",   label: "נשים שעברו את התוכנית" },
  { target: 72,   suffix: "",   label: "משפחות בליווי VIP אישי" },
  { target: 40,   suffix: "+",  label: "הרצאות וסדנאות לארגונים" },
  { target: 3000, suffix: "+",  label: "בקהילה הפעילה" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(1);
  const rounded = useTransform(count, (v) => {
    const n = Math.round(v);
    return target >= 1000
      ? n.toLocaleString("en-US").replace(",", ",") + suffix
      : n + suffix;
  });

  useEffect(() => {
    if (!isInView) return;
    const duration = target >= 1000 ? 2.2 : target >= 100 ? 2 : 1.5;
    const controls = animate(count, target, { duration, ease: "easeOut" });
    return controls.stop;
  }, [isInView, count, target]);

  return (
    <motion.span ref={ref} className="stat-number"
      style={{ fontSize: "2.6rem", fontWeight: 900, color: "#21F0B0", lineHeight: 1, fontFamily: "'Rubik', sans-serif" }}>
      {rounded}
    </motion.span>
  );
}

export default function SocialProof() {
  return (
    <section style={{ background: "#124AF0", padding: "40px 1.5rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 8, right: 20, display: "flex", gap: 6, opacity: 0.25, pointerEvents: "none" }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#21F0B0" }} />
        ))}
      </div>

      <div className="stats-row" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-around", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="stat-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: "center", color: "white", padding: "0 40px", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none" }}
          >
            <AnimatedCounter target={s.target} suffix={s.suffix} />
            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.85)", marginTop: 8, letterSpacing: 0.3, fontFamily: "'Rubik', sans-serif" }}>{s.label}</div>
          </motion.div>
        ))}
      </div>
      <style>{`
        @media(max-width:640px){
          .stats-row { flex-direction: column !important; align-items: stretch !important; gap: 0 !important; }
          .stat-item { padding: 16px 1.5rem !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.12); width: 100% !important; }
          .stat-item:last-child { border-bottom: none !important; }
          .stat-number { font-size: 2.2rem !important; }
        }
      `}</style>
    </section>
  );
}
