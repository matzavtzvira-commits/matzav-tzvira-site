"use client";
import { motion } from "framer-motion";

export default function CommunitySection() {
  return (
    <section id="community" style={{ background: "radial-gradient(ellipse at 50% 30%, #1535B5 0%, #060D3C 65%)", padding: "40px 1.5rem" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "stretch" }} className="two-col">
        {/* video */}
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ borderRadius: 20, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "stretch", maxHeight: 260 }}>
          <video autoPlay loop muted playsInline style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", transform: "scale(1.85)", transformOrigin: "center 50%" }}>
            <source src="/community-video.mp4" type="video/mp4" />
          </video>
        </motion.div>
        {/* text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={{ background: "rgba(255,255,255,0.15)", color: "#FFFFFF", fontWeight: 700, fontSize: "0.82rem", padding: "4px 16px", borderRadius: 50, border: "1px solid rgba(255,255,255,0.3)", alignSelf: "flex-start" }}>
            הקהילה
          </span>
          <h3 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: "#FFFFFF", margin: 0, lineHeight: 1.4 }}>
            הצטרפי למהפכה.
            <br />
            <span style={{ color: "#21F0B0" }}>אלפי נשים כבר שם.</span>
          </h3>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.8, margin: 0 }}>
            מדברות כסף בגובה העינים, שואלות, לומדות ומתקדמות יחד.
          </p>
          <a
            href="https://chat.whatsapp.com/KUc5iTtqUdm85W6Fnf3Tcx"
            target="_blank"
            rel="noopener noreferrer"
            style={{ position: "relative", display: "inline-block", textDecoration: "none", alignSelf: "flex-start" }}
          >
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-green.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 41%" }} />
            <span style={{ position: "relative", zIndex: 1, color: "#070C24", padding: "20px 64px", fontWeight: 800, fontSize: "1.05rem", display: "block", whiteSpace: "nowrap" }}>
              אני חלק מהקהילה <span className="arrow-anim">←</span>
            </span>
          </a>
        </motion.div>
      </div>
      <style>{`@media(max-width:768px){.two-col{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
