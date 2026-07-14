"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { AcademyLevel, AcademyVideo } from "./videos";
import { WHATSAPP_GROUP_URL, WHATSAPP_STATUS_URL } from "./videos";

const NAVY = "#060D3C";
const NAVY_2 = "#0B1338";

/* ── קו יד מצויר מתחת לכותרת (בסגנון ההירו של האתר) ── */
function SketchUnderline({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 300 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 300, display: "block", marginTop: 2 }}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="acadSketch">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <motion.path
        d="M4 5 Q75 3 150 6 Q225 9 296 5"
        stroke={color} strokeWidth="2.4" strokeLinecap="round" fill="none"
        filter="url(#acadSketch)" opacity="0.95"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ── אייקון ווטסאפ ── */
function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#060D3C" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.15-1.7-.85-2-.94-.26-.1-.45-.15-.64.15-.19.28-.73.94-.9 1.13-.16.19-.33.21-.61.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.73-1.63-2.02-.17-.29-.02-.44.13-.59.13-.13.3-.34.44-.5.15-.17.2-.29.3-.48.1-.19.05-.36-.02-.5-.08-.15-.64-1.54-.88-2.11-.23-.55-.46-.48-.64-.49h-.54c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.17 2.95c.15.19 2.02 3.08 4.9 4.32.68.29 1.22.47 1.63.6.69.22 1.31.19 1.8.11.55-.08 1.7-.69 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34zM12 2A10 10 0 0 0 3.5 17.2L2 22l4.9-1.5A10 10 0 1 0 12 2z" />
    </svg>
  );
}

/* ── כרטיס סרטון אנכי עם נגן לחץ-לצפייה ── */
function VideoCard({ video, index, accent }: { video: AcademyVideo; index: number; accent: string }) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = video.src.trim() !== "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="acad-card"
    >
      <div
        className="acad-card-frame"
        onClick={() => hasVideo && setPlaying(true)}
        role={hasVideo ? "button" : undefined}
        tabIndex={hasVideo ? 0 : undefined}
        onKeyDown={(e) => {
          if (hasVideo && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setPlaying(true); }
        }}
        aria-label={hasVideo ? `נגני: ${video.title}` : `${video.title} - בקרוב`}
        style={{ cursor: hasVideo ? "pointer" : "default" }}
      >
        {playing && hasVideo ? (
          <video
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", background: "#000" }}
          />
        ) : (
          <>
            <img src={video.poster} alt={video.title} loading="lazy"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            {/* גרדיאנט תחתון שמכסה כתובית צרובה ונושא את הכותרת */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,13,60,0.96) 0%, rgba(6,13,60,0.55) 26%, rgba(6,13,60,0) 52%)" }} />

            {/* מספר */}
            <div style={{ position: "absolute", top: 12, insetInlineEnd: 12, width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.14)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "0.85rem", fontFamily: "var(--font-heading)" }}>
              {index + 1}
            </div>

            {/* כפתור נגינה / בקרוב */}
            {hasVideo ? (
              <div className="acad-play" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 58, height: 58, borderRadius: "50%", background: accent, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 26px ${accent}66`, transition: "transform 0.2s" }}>
                <svg width="20" height="22" viewBox="0 0 20 22" fill={accent === "#21F0B0" ? "#060D3C" : "#fff"} style={{ marginInlineStart: 3 }}>
                  <path d="M0 1.7C0 .3 1.5-.5 2.7.3l15.6 9.3c1.1.7 1.1 2.3 0 3L2.7 21.7C1.5 22.5 0 21.7 0 20.3V1.7Z" />
                </svg>
              </div>
            ) : (
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", padding: "7px 16px", borderRadius: 50, background: "rgba(255,255,255,0.16)", backdropFilter: "blur(4px)", color: "#fff", fontWeight: 700, fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                בקרוב
              </div>
            )}

            {/* כותרת + תיאור */}
            <div style={{ position: "absolute", insetInline: 0, bottom: 0, padding: "16px 16px 18px" }}>
              <h3 style={{ color: "#fff", fontSize: "1.15rem", fontWeight: 800, margin: 0, lineHeight: 1.25 }}>{video.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "0.82rem", margin: "5px 0 0", lineHeight: 1.45 }}>{video.blurb}</p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function LevelView({ level }: { level: AcademyLevel }) {
  const bridge = level.videos.find((v) => v.isBridge);
  const rest = level.videos.filter((v) => !v.isBridge);
  const accent = level.accent;

  return (
    <main style={{ background: NAVY }}>
      {/* ── הירו ── */}
      <section style={{ position: "relative", background: `radial-gradient(ellipse at 70% 0%, ${NAVY_2} 0%, ${NAVY} 60%)`, overflow: "hidden", paddingTop: 128, paddingBottom: 64 }}>
        {/* מספר רמה ענק ברקע */}
        <div aria-hidden="true" style={{ position: "absolute", top: 40, insetInlineStart: -20, fontSize: "clamp(14rem, 34vw, 30rem)", fontWeight: 900, lineHeight: 0.8, color: accent, opacity: 0.06, fontFamily: "var(--font-heading)", pointerEvents: "none", userSelect: "none" }}>
          {level.num}
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ color: accent, fontWeight: 700, letterSpacing: 0.4, marginBottom: 18, fontSize: "0.98rem" }}
          >
            {level.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: "#fff", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 800, lineHeight: 1.1, margin: 0, maxWidth: 760 }}
          >
            {level.title}
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ display: "inline-block", marginTop: 14 }}>
            <p style={{ color: "#FA5C5C", fontWeight: 600, fontSize: "1.05rem", margin: 0 }}>{level.tagline}</p>
            <SketchUnderline color="#FA5C5C" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
            style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.1rem", lineHeight: 1.7, margin: "26px 0 0", maxWidth: 620 }}
          >
            {level.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 30 }}
          >
            {[`${level.videos.length} סרטונים`, "דקה כל אחד", "חינם לגמרי", "בגובה העיניים"].map((t) => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 50, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.9)", fontSize: "0.88rem", fontWeight: 500 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, display: "inline-block" }} />
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── סרטון מעבר מודגש (לרמות 2-3) ── */}
      {bridge && (
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "8px 1.5rem 0" }}>
          <div className="acad-bridge">
            <div className="acad-bridge-video">
              <VideoCard video={bridge} index={0} accent={accent} />
            </div>
            <div className="acad-bridge-text">
              <span style={{ display: "inline-block", padding: "6px 14px", borderRadius: 50, background: accent, color: accent === "#21F0B0" ? "#060D3C" : "#fff", fontWeight: 800, fontSize: "0.8rem", marginBottom: 16 }}>
                נתחיל מכאן
              </span>
              <h2 style={{ color: "#fff", fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)", fontWeight: 800, lineHeight: 1.2, margin: "0 0 14px" }}>
                {bridge.title}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.08rem", lineHeight: 1.7, margin: 0, maxWidth: 460 }}>
                {bridge.blurb}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── גלריית הסרטונים ── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "44px 1.5rem 20px" }}>
        {bridge && (
          <p style={{ color: accent, fontWeight: 700, fontSize: "0.95rem", margin: "0 0 22px", letterSpacing: 0.3 }}>
            וממשיכות הלאה ↓
          </p>
        )}
        <div className="acad-grid">
          {rest.map((v, i) => (
            <VideoCard key={v.slug} video={v} index={i} accent={accent} />
          ))}
        </div>
      </section>

      {/* ── בלוק סיום רך ── */}
      <section style={{ padding: "48px 1.5rem 72px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, margin: "0 0 14px", lineHeight: 1.2 }}>
            {level.next ? "סיימת את הרמה הזאת?" : "סיימת את כל המסע 🤍"}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "1.1rem", lineHeight: 1.7, margin: "0 auto 34px", maxWidth: 560 }}>
            {level.next
              ? "כל הכבוד. עשית עוד צעד גדול שרוב הנשים אף פעם לא עושות. מוכנה להמשיך?"
              : "עשית דרך אמיתית. מכאן ממשיכות יחד בקבוצה, בקצב שלך, בלי לחץ."}
          </p>

          {/* המשך לרמה הבאה */}
          {level.next && (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} style={{ display: "inline-block", marginBottom: 40 }}>
              <Link href={`/academy/${level.next.slug}`}
                style={{ display: "inline-flex", alignItems: "center", gap: 12, background: accent, color: accent === "#21F0B0" ? "#060D3C" : "#fff", fontWeight: 800, fontSize: "1.15rem", padding: "18px 40px", borderRadius: 60, boxShadow: `0 12px 34px ${accent}55` }}>
                <span>קדימה ל{level.next.label}</span>
                <span style={{ fontSize: "1.3rem" }}>←</span>
              </Link>
            </motion.div>
          )}

          {/* ברוכה הבאה לקהילה */}
          <motion.div
            className="acad-community"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="acad-slippers-wrap">
              <img src="/academy/slippers.jpg" alt="נעלי בית אדומות" className="acad-slippers" />
            </div>
            <div className="acad-community-text">
              <h3 style={{ color: "#fff", fontSize: "clamp(1.35rem, 3vw, 1.9rem)", fontWeight: 800, margin: "0 0 10px", lineHeight: 1.25 }}>
                את כבר חלק מהקהילה 🤍
              </h3>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.05rem", lineHeight: 1.65, margin: "0 0 22px" }}>
                בקהילת הנשים הכי גדולה שמדברת שוק ההון בנעלי בית. כאן ממשיכות יחד, וכל הסרטונים החדשים מגיעים לקבוצה ראשונים.
              </p>
              <motion.a
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                href={WHATSAPP_GROUP_URL} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#21F0B0", color: "#060D3C", fontWeight: 800, fontSize: "1.1rem", padding: "15px 34px", borderRadius: 60, boxShadow: "0 12px 30px rgba(33,240,176,0.4)" }}
              >
                <WhatsAppIcon />
                לקבוצה שלנו
              </motion.a>
            </div>
          </motion.div>

          {/* סטטוס - פעולה משנית */}
          <a href={WHATSAPP_STATUS_URL} target="_blank" rel="noopener noreferrer" className="acad-status-link">
            👀 רוצה לראות אותי גם בסטטוס? שמרי את המספר שלי ←
          </a>

          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", lineHeight: 1.6, margin: "48px auto 0", maxWidth: 620 }}>
            כל האמור הוא למטרת העשרה והדרכה בלבד, ואינו מהווה ייעוץ פיננסי, המלצה להשקעה או תחליף לייעוץ מקצועי. כל פעולה בשוק ההון הינה על אחריותך בלבד.
          </p>
        </div>
      </section>

      <style>{`
        .acad-card-frame {
          position: relative;
          aspect-ratio: 9 / 16;
          border-radius: 20px;
          overflow: hidden;
          background: #0B1338;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 14px 40px rgba(0,0,0,0.35);
        }
        .acad-card-frame:hover .acad-play { transform: translate(-50%,-50%) scale(1.12); }
        .acad-card-frame:focus-visible { outline: 3px solid ${accent}; outline-offset: 3px; }

        .acad-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .acad-bridge {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 40px;
          align-items: center;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 28px;
          padding: 28px;
        }
        .acad-bridge-video { max-width: 300px; }
        .acad-community {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 34px;
          align-items: center;
          text-align: right;
          max-width: 720px;
          margin: 0 auto;
          background: linear-gradient(135deg, rgba(33,240,176,0.09), rgba(255,255,255,0.03));
          border: 1px solid rgba(33,240,176,0.22);
          border-radius: 28px;
          padding: 32px 38px;
        }
        .acad-slippers-wrap { flex-shrink: 0; }
        .acad-slippers {
          display: block;
          width: 150px; height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid rgba(255,255,255,0.92);
          box-shadow: 0 12px 32px rgba(250,92,92,0.38), 0 0 0 9px rgba(250,92,92,0.12);
          animation: slipperFloat 4s ease-in-out infinite;
        }
        @keyframes slipperFloat {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50%       { transform: translateY(-12px) rotate(3deg); }
        }
        .acad-status-link {
          display: inline-block;
          margin-top: 24px;
          color: rgba(255,255,255,0.7);
          font-weight: 600;
          font-size: 0.98rem;
          border-bottom: 1px dashed rgba(255,255,255,0.3);
          padding-bottom: 3px;
          transition: color 0.2s;
        }
        .acad-status-link:hover { color: #21F0B0; }

        @media (max-width: 900px) {
          .acad-bridge { grid-template-columns: 220px 1fr; gap: 24px; padding: 20px; }
          .acad-bridge-video { max-width: 220px; }
        }
        @media (max-width: 680px) {
          .acad-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .acad-bridge { grid-template-columns: 1fr; }
          .acad-bridge-video { max-width: 260px; margin: 0 auto; }
          .acad-bridge-text { text-align: center; }
          .acad-bridge-text p { margin: 0 auto !important; }
          .acad-community { grid-template-columns: 1fr; text-align: center; padding: 28px 22px; gap: 20px; }
          .acad-slippers-wrap { margin: 0 auto; }
          .acad-community-text .stat, .acad-community-text a { }
        }
      `}</style>
    </main>
  );
}
