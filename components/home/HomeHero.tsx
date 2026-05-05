"use client";
import { motion } from "framer-motion";

export default function HomeHero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#070C24",
        overflow: "hidden",
        paddingTop: 80,
      }}
    >
      {/* Video - left side */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          bottom: 0,
          width: "48%",
        }}
      >
        <video
          autoPlay loop muted playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Fade to dark toward center */}
        <div
          style={{
            position: "absolute",
            top: 0, right: 0, bottom: 0,
            width: "50%",
            background: "linear-gradient(to right, transparent, #070C24)",
          }}
        />
      </div>

      {/* Right side — content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingRight: "5%",
          paddingLeft: "52%",
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: "#21F0B0", fontSize: "1rem", fontWeight: 600, marginBottom: 24, letterSpacing: 0.5 }}
          >
            הבית הפיננסי שלך
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: "white", fontSize: "clamp(2.8rem, 5vw, 4.2rem)", fontWeight: 700, lineHeight: 1.2, marginBottom: 36 }}
          >
            רבקי וייס נותנת לך מטריה פיננסית.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32, textShadow: "0 0 12px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.6)" }}>
            <p style={{ color: "#FFFFFF", fontSize: "1.25rem", fontWeight: 400, margin: 0, lineHeight: 1.6 }}>
              בשפה שרק אנחנו מבינות.
            </p>
            <p style={{ color: "#FFFFFF", fontSize: "1.25rem", fontWeight: 400, margin: 0, lineHeight: 1.6 }}>
              כל מה שאת צריכה <span style={{ fontSize: "0.75em", opacity: 0.6 }}>—</span>
            </p>
            <p style={{ color: "#FFFFFF", fontSize: "1.25rem", fontWeight: 400, margin: 0, lineHeight: 1.6 }}>
              תחת מטריה אחת.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", display: "inline-block" }}>
            <p style={{ color: "#FA5C5C", fontSize: "1.1rem", margin: 0, fontWeight: 600 }}>
              בלי נוסחאות. בלי חליפות. עם נעלי בית.
            </p>
            <svg
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", display: "block", marginTop: 1 }}
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="sketch">
                  <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed="5" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
              <motion.path
                d="M4 5 Q75 3 150 6 Q225 9 296 5"
                stroke="#FA5C5C"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                filter="url(#sketch)"
                opacity="0.95"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 1.0, ease: "easeOut" }}
              />
              <motion.path
                d="M8 8 Q80 6 155 9 Q230 11 292 7"
                stroke="#FA5C5C"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                filter="url(#sketch)"
                opacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 1.15, ease: "easeOut" }}
              />
            </svg>
          </motion.div>


        </div>
      </div>

      {/* Scroll arrow */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <style>{`
          @keyframes arrowBounce {
            0%   { opacity: 0; transform: translateY(-10px); }
            50%  { opacity: 1; transform: translateY(0px); }
            100% { opacity: 0; transform: translateY(10px); }
          }
        `}</style>
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            width="32"
            height="18"
            viewBox="0 0 32 18"
            fill="none"
            style={{
              animation: `arrowBounce 1.5s ease-in-out ${i * 0.3}s infinite`,
            }}
          >
            <polyline
              points="2,2 16,14 30,2"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </div>
    </section>
  );
}
