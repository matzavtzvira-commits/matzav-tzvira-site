"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { LazyVideo } from "@/components/LazyVideo";

export default function LibrarySection() {
  return (
    <section id="library" style={{ background: "radial-gradient(ellipse at 50% 30%, #1535B5 0%, #060D3C 65%)", padding: "40px 1.5rem" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "stretch" }} className="two-col">
        {/* text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ background: "rgba(255,255,255,0.15)", color: "#FFFFFF", fontWeight: 700, fontSize: "0.82rem", padding: "4px 16px", borderRadius: 50, border: "1px solid rgba(255,255,255,0.3)", alignSelf: "flex-start" }}>
            חינמי
          </span>
          <h3 style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 800, color: "#FFFFFF", margin: 0, lineHeight: 1.4 }}>
            הספרייה הפיננסית שלך
          </h3>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.9, margin: 0 }}>
            מאמרים, מחשבונים, מדריכים ותוכן חינמי <span style={{ fontSize: "0.75em" }}>-</span>
            <br />
            שיתנו לכסף שלך להשתדל.
          </p>
          <Link href="/articles" className="section-btn" style={{ position: "relative", display: "inline-block", textDecoration: "none", alignSelf: "flex-start", maxWidth: "100%" }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-red.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 43%" }} />
            <span style={{ position: "relative", zIndex: 1, color: "#FFFFFF", padding: "20px 64px", fontWeight: 800, fontSize: "1.05rem", display: "block" }}>
              למעבר לספרייה <span className="arrow-anim">←</span>
            </span>
          </Link>
        </motion.div>
        {/* video */}
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="section-video-wrap"
          style={{ borderRadius: 20, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "stretch" }}>
          <LazyVideo src="/library-video.mp4" style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", transform: "scale(1.85)", transformOrigin: "center 50%" }} />
        </motion.div>
      </div>
      <style>{`
        @media(max-width:768px){
          .two-col { grid-template-columns: 1fr !important; }
          .section-video-wrap { min-height: 260px !important; order: 2; }
        }
        @media(max-width:640px){
          .section-btn span { padding: 14px 32px !important; white-space: normal !important; font-size: 0.95rem !important; }
        }
      `}</style>
    </section>
  );
}
