"use client";
import { motion } from "framer-motion";

export default function MediaSection() {
  return (
    <section style={{ background: "#FFFFFF", padding: "72px 1.5rem" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ background: "#EEF2FF", color: "#124AF0", fontWeight: 700, fontSize: "0.82rem", padding: "4px 16px", borderRadius: 50 }}>
            כפי שפורסם
          </span>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)", fontWeight: 800, color: "#070C24", marginTop: 16, lineHeight: 1.4 }}>
            אולי כבר נפגשנו אנשהו...
          </h2>
        </div>

        {/* Two cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="media-grid">

          {/* Card 1 - Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "white", borderRadius: 24, overflow: "hidden", boxShadow: "0 4px 24px rgba(18,74,240,0.07)", display: "flex", flexDirection: "column" }}>
            {/* Image */}
            <div style={{ height: 200, overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-mishpacha.png" alt="בתוך המשפחה" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", padding: "24px" }} />
            </div>
            {/* Content */}
            <div style={{ padding: "28px 28px 32px", display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
              <div>
                <span style={{ background: "#EEF2FF", color: "#124AF0", fontWeight: 700, fontSize: "0.78rem", padding: "3px 12px", borderRadius: 50, display: "inline-block", marginBottom: 8 }}>טור</span>
                <p style={{ fontSize: "1.15rem", fontWeight: 800, color: "#070C24", margin: "0 0 8px" }}>שוות הון</p>
                <p style={{ fontSize: "0.95rem", color: "#555", lineHeight: 1.8, margin: 0 }}>
                  הטור הפיננסי לאישה <span style={{ fontSize: "0.75em" }}>-</span> כסף והשקעות בשפה שלנו.
                </p>
              </div>
              <a href="/column-mishpacha.pdf" target="_blank" rel="noopener noreferrer"
                style={{ marginTop: "auto", color: "#124AF0", fontWeight: 700, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: 6 }}>
                לקריאת הטור <span className="arrow-anim">←</span>
              </a>
            </div>
          </motion.div>

          {/* Card 2 - Podcast */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "white", borderRadius: 24, overflow: "hidden", boxShadow: "0 4px 24px rgba(18,74,240,0.07)", display: "flex", flexDirection: "column" }}>
            {/* Image */}
            <div style={{ height: 200, background: "#FFE8EE", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/podcast-cover.jpg" alt="קפה לדרך" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            {/* Content */}
            <div style={{ padding: "28px 28px 32px", display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
              <span style={{ background: "#FFF0F3", color: "#FA5C5C", fontWeight: 700, fontSize: "0.78rem", padding: "3px 12px", borderRadius: 50, alignSelf: "flex-start" }}>
                פודקאסט
              </span>
              <div>
                <p style={{ fontSize: "0.85rem", color: "#999", margin: "0 0 4px" }}>קפה לדרך <span style={{ fontSize: "0.75em" }}>-</span> דיתי וינשטיין</p>
                <p style={{ fontSize: "1.15rem", fontWeight: 800, color: "#070C24", margin: "0 0 8px" }}>פרק 3 <span style={{ fontSize: "0.75em" }}>-</span> הון ללא שלטון</p>
                <p style={{ fontSize: "0.95rem", color: "#555", lineHeight: 1.8, margin: 0 }}>
                  איך הכסף שלך יעשה את העבודה בזמן שאת עסוקה בחיים.
                </p>
              </div>
              <a href="https://www.doscast.co.il/episode/10342" target="_blank" rel="noopener noreferrer"
                style={{ marginTop: "auto", color: "#124AF0", fontWeight: 700, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: 6 }}>
                להאזנה לפרק <span className="arrow-anim">←</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
      <style>{`@media(max-width:768px){.media-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
