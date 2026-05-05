"use client";
import Link from "next/link";

export default function FeaturedCourse() {
  return (
    <section style={{ background: "white", padding: "88px 1.5rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1, background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50, marginBottom: 12 }}>
            קורס הדגל
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: "#124AF0", lineHeight: 1.2 }}>
            הכסף ישתדל, ואת תנוחי
          </h2>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #124AF0 0%, #0a38c4 100%)",
            borderRadius: 28,
            padding: "48px 40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* orbs */}
          <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(33,240,176,0.1)", animation: "pulse 4s ease-in-out infinite", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -50, left: -50, width: 250, height: 250, borderRadius: "50%", background: "rgba(250,92,92,0.07)", filter: "blur(40px)", pointerEvents: "none" }} />

          {/* Left: info */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.92rem", lineHeight: 1.9, marginBottom: 24 }}>
              תוכנית מקיפה ללמוד איך שוק ההון עובד — בשפה שלך. מאפס לביטחון פיננסי אמיתי, עם ליווי, כלים ודשבורדים דיגיטליים.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
              {["שיעורים קלילים בגובה העיניים", "דשבורדים דיגיטליים שעושים את החישוב", "קהילת המאסטריות + ליווי צמוד", "גישה לשנה שלמה"].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.8rem" }}>■</span>
                  <span style={{ color: "white", fontSize: "0.95rem" }}>{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="/course"
              style={{
                background: "#21F0B0",
                color: "#124AF0",
                padding: "14px 32px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: "1rem",
                display: "inline-block",
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}
            >
              לפרטים ולרכישה ←
            </Link>
          </div>

          {/* Right: pricing card */}
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 20,
              padding: "32px 28px",
              textAlign: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", marginBottom: 8 }}>מסלול בסיסי</div>
            <div style={{ fontSize: "3rem", fontWeight: 700, color: "white", lineHeight: 1 }}>597 ₪</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", marginTop: 6, marginBottom: 20 }}>או 3 × 199 ₪</div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 20 }}>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", marginBottom: 8 }}>מסלול מלא + פגישה</div>
              <div style={{ fontSize: "2rem", fontWeight: 700, color: "#21F0B0", lineHeight: 1 }}>1,190 ₪</div>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", marginTop: 6 }}>או 5 × 238 ₪</div>
              <div
                style={{
                  background: "#21F0B0",
                  color: "#124AF0",
                  borderRadius: 50,
                  padding: "4px 14px",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  display: "inline-block",
                  marginTop: 10,
                }}
              >
                הכי פופולרי
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
