"use client";
import Link from "next/link";

const SEGMENT = Array.from("הגיע הזמן שגם הכסף שלך יעשה השתדלות ✦ ");
const TEXT = [...SEGMENT, ...SEGMENT];

export default function RotatingCircleSection() {
  return (
    <section style={{ background: "#070C24", padding: "80px 1.5rem", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: -120, left: "30%", width: 500, height: 500, borderRadius: "50%", background: "rgba(33,240,176,0.05)", filter: "blur(90px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="rotating-grid">

        {/* Circle */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="rotating-circle-outer" style={{ position: "relative", width: 340, height: 340 }}>

            {/* Spinning ring of characters */}
            <div style={{
              position: "absolute",
              inset: 0,
              animation: "spinRing 22s linear infinite",
            }}>
              {TEXT.map((char, i) => {
                const angle = (i / TEXT.length) * 360;
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      bottom: "50%",
                      left: "50%",
                      width: 18,
                      marginLeft: -9,
                      height: 155,
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: "bottom center",
                    }}
                  >
                    <span style={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: `translateX(-50%) rotate(${-angle}deg)`,
                      color: "#21F0B0",
                      fontSize: 12,
                      fontWeight: 700,
                      fontFamily: "Rubik, Arial, sans-serif",
                      lineHeight: 1,
                      display: "block",
                      userSelect: "none",
                    }}>
                      {char}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Inner glow */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: "radial-gradient(circle at center, rgba(33,240,176,0.22) 0%, rgba(33,240,176,0.06) 55%, transparent 75%)",
              border: "1px solid rgba(33,240,176,0.25)",
              boxShadow: "0 0 60px rgba(33,240,176,0.18), inset 0 0 40px rgba(33,240,176,0.08)",
            }} />

            {/* Center dot */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#21F0B0",
              boxShadow: "0 0 20px rgba(33,240,176,0.9)",
            }} />
          </div>
        </div>

        {/* Text */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.85rem", letterSpacing: 1, margin: 0 }}>
            הגיע הזמן
          </p>
          <h2 style={{ color: "#FFFFFF", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, lineHeight: 1.3, margin: 0 }}>
            שגם הכסף שלך
            <br />
            <span style={{ color: "#21F0B0" }}>יעשה השתדלות.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", lineHeight: 1.9, margin: 0 }}>
            את עובדת קשה. הגיע הזמן שהכסף יעבוד בשבילך -
            <br />
            בלי להבין כלכלה, בלי תואר, מהספה שלך.
          </p>
          <Link href="/course" className="rotating-btn" style={{ position: "relative", display: "inline-block", textDecoration: "none", alignSelf: "flex-start", maxWidth: "100%" }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-green.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 41%" }} />
            <span style={{ position: "relative", zIndex: 1, color: "#070C24", padding: "20px 64px", fontWeight: 800, fontSize: "1.05rem", display: "block" }}>
              אני מוכנה <span className="arrow-anim">←</span>
            </span>
          </Link>
        </div>

      </div>

      <style>{`
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media(max-width:768px){
          .rotating-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .rotating-grid > div:first-child { order: 2; }
        }
        @media(max-width:640px){
          .rotating-circle-outer { width: 260px !important; height: 260px !important; overflow: hidden !important; }
          .rotating-btn span { padding: 14px 32px !important; white-space: normal !important; font-size: 0.95rem !important; }
        }
      `}</style>
    </section>
  );
}
