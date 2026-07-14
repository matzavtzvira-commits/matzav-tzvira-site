"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { LEVELS } from "./videos";

const NAVY = "#060D3C";
const NAVY_2 = "#0B1338";

export default function AcademyHub() {
  return (
    <main style={{ background: NAVY }}>
      {/* ── הירו ── */}
      <section style={{ position: "relative", background: `radial-gradient(ellipse at 50% 0%, ${NAVY_2} 0%, ${NAVY} 62%)`, overflow: "hidden", paddingTop: 128, paddingBottom: 56, textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 1.5rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ color: "#21F0B0", fontWeight: 700, letterSpacing: 0.5, marginBottom: 18 }}
          >
            האקדמיה של מצבית
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: "#fff", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 800, lineHeight: 1.1, margin: 0 }}
          >
            שוק ההון בנעלי בית
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.15rem", lineHeight: 1.7, margin: "24px auto 0", maxWidth: 560 }}
          >
            שלוש רמות, סרטון קטן בכל פעם, בשפה שרק אנחנו מבינות. בחרי איפה את נמצאת והתחילי מהמקום שנוח לך.
          </motion.p>
        </div>
      </section>

      {/* ── שלוש הרמות ── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 1.5rem 80px" }}>
        <div className="hub-grid">
          {LEVELS.map((lv, i) => {
            const poster = lv.videos[0]?.poster;
            return (
              <motion.div
                key={lv.slug}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/academy/${lv.slug}`} className="hub-card">
                  <div className="hub-card-media">
                    {poster && <img src={poster} alt={lv.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(6,13,60,0.97) 8%, rgba(6,13,60,0.3) 55%, rgba(6,13,60,0.15) 100%)` }} />
                    <div style={{ position: "absolute", top: 14, insetInlineEnd: 16, width: 46, height: 46, borderRadius: "50%", background: lv.accent, color: lv.accent === "#21F0B0" ? "#060D3C" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1.3rem", fontFamily: "var(--font-heading)", boxShadow: `0 6px 18px ${lv.accent}66` }}>
                      {lv.num}
                    </div>
                  </div>
                  <div className="hub-card-body">
                    <span style={{ color: lv.accent, fontWeight: 700, fontSize: "0.82rem", letterSpacing: 0.3 }}>{lv.eyebrow}</span>
                    <h2 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800, margin: "8px 0 10px", lineHeight: 1.2 }}>{lv.title}</h2>
                    <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0, flexGrow: 1 }}>{lv.tagline}</p>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: lv.accent, fontWeight: 800, fontSize: "1rem", marginTop: 18 }}>
                      {lv.videos.length} סרטונים
                      <span aria-hidden="true">←</span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <style>{`
        .hub-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .hub-card {
          display: flex; flex-direction: column;
          height: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 24px;
          overflow: hidden;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .hub-card:hover { transform: translateY(-6px); border-color: rgba(255,255,255,0.22); box-shadow: 0 22px 50px rgba(0,0,0,0.4); }
        .hub-card-media { position: relative; aspect-ratio: 4 / 3; overflow: hidden; }
        .hub-card-body { padding: 22px 24px 26px; display: flex; flex-direction: column; flex-grow: 1; }
        @media (max-width: 820px) { .hub-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; } }
      `}</style>
    </main>
  );
}
