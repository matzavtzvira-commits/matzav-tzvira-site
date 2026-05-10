"use client";
import { motion } from "framer-motion";

export default function UrgencySection() {
  return (
    <section style={{ background: "radial-gradient(ellipse at 50% 30%, #1535B5 0%, #060D3C 65%)", padding: "80px 1.5rem", overflow: "hidden", position: "relative" }}>

      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 56, alignItems: "center" }} className="urgency-grid">

        {/* Einstein photo */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ flexShrink: 0, position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/einstein.jpg"
            alt="אלברט איינשטיין"
            style={{ width: 220, height: 260, objectFit: "cover", borderRadius: 20, display: "block", filter: "grayscale(0.2) contrast(1.05)" }}
          />
          <div style={{ position: "absolute", inset: 0, borderRadius: 20, border: "2px solid rgba(33,240,176,0.35)" }} />
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: 1 }}>
          <div style={{ fontSize: "5rem", color: "#21F0B0", lineHeight: 0.6, fontFamily: "Georgia, serif", marginBottom: 16 }}>״</div>

          <p style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.55, margin: "0 0 24px 0" }}>
            הפלא השמיני בתבל <span style={{ color: "#21F0B0" }}>
              <span style={{ fontSize: "0.75em" }}>-</span> ריבית דריבית.
            </span>
            <br />
            מי שמבין זאת <span style={{ color: "#21F0B0" }}>מרוויח</span> <span style={{ fontSize: "0.75em" }}>-</span>
            <br />
            מי שלא, <motion.span
              animate={{ scale: [1, 1.18, 0.95, 1.22, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
              style={{ color: "#FA5C5C", display: "inline-block", transformOrigin: "right center" }}>עובד כל ימיו.</motion.span>
          </p>

          <div style={{ borderRight: "3px solid #21F0B0", paddingRight: 16, marginBottom: 32 }}>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", fontStyle: "italic", margin: 0 }}>
              - אלברט איינשטיין
            </p>
          </div>

          <a
            href="/course"
            className="urgency-btn"
            style={{ position: "relative", display: "inline-block", textDecoration: "none" }}
          >
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-green.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 41%" }} />
            <span style={{ position: "relative", zIndex: 1, color: "#070C24", padding: "20px 64px", fontWeight: 800, fontSize: "1.05rem", display: "block", whiteSpace: "nowrap" }}>
              בואי תביני ותרוויחי <span className="arrow-anim">←</span>
            </span>
          </a>
        </motion.div>

      </div>

      <style>{`
        @media(max-width:768px){
          .urgency-grid { flex-direction: column !important; text-align: center; align-items: center !important; gap: 32px !important; }
          .urgency-grid img { width: 160px !important; height: 190px !important; }
          .urgency-btn span { padding: 16px 40px !important; white-space: normal !important; font-size: 0.95rem !important; }
        }
        @media(max-width:640px){
          .urgency-btn span { padding: 14px 28px !important; }
        }
      `}</style>
    </section>
  );
}
