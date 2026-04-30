"use client";

export default function HomeHero() {
  return (
    <section style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
      {/* Video background */}
      <video
        autoPlay loop muted playsInline
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E"
      >
        <source src="https://videos.pexels.com/video-files/3948498/3948498-hd_1920_1080_30fps.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(5,10,40,0.62)", zIndex: 1 }} />

      {/* Floating orbs */}
      <div style={{ position: "absolute", top: "10%", left: "5%", width: 420, height: 420, borderRadius: "50%", background: "rgba(18,74,240,0.18)", filter: "blur(80px)", animation: "float 12s ease-in-out infinite", zIndex: 1, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "8%", width: 280, height: 280, borderRadius: "50%", background: "rgba(33,240,176,0.12)", filter: "blur(60px)", animation: "floatAlt 9s ease-in-out infinite", zIndex: 1, pointerEvents: "none" }} />

      {/* Glass panel */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 5%",
        }}
      >
        <div
          style={{
            background: "rgba(18,74,240,0.15)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 28,
            padding: "52px 52px 48px",
            maxWidth: 560,
            width: "100%",
            textAlign: "right",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#21F0B0",
              color: "#124AF0",
              borderRadius: 50,
              padding: "5px 16px",
              fontSize: "0.85rem",
              fontWeight: 700,
              marginBottom: 24,
              animation: "fadeInUp 0.6s ease 0.1s both",
            }}
          >
            מומחית שוק ההון לנשים חרדיות
          </div>

          {/* H1 */}
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.2,
              marginBottom: 16,
              animation: "fadeInUp 0.6s ease 0.3s both",
            }}
          >
            הכסף שלך יכול לעבוד —
            <br />
            <span style={{ color: "#21F0B0" }}>גם בלי שתגעי בו</span>
          </h1>

          {/* Sub */}
          <p
            style={{
              fontSize: "1.15rem",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.7,
              marginBottom: 8,
              animation: "fadeInUp 0.6s ease 0.5s both",
            }}
          >
            הון נצבר מהשקעות — לא מעוד שעות עבודה
          </p>
          <p
            style={{
              fontSize: "0.97rem",
              color: "rgba(255,255,255,0.68)",
              lineHeight: 1.7,
              marginBottom: 36,
              animation: "fadeInUp 0.6s ease 0.55s both",
            }}
          >
            ליווי משפחות להשקעות ארוכות טווח. כי כשאת יודעת — את שולטת.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "fadeInUp 0.6s ease 0.8s both" }}>
            <a
              href="/course"
              style={{
                background: "#124AF0",
                color: "white",
                padding: "14px 28px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: "1rem",
                display: "inline-block",
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#21F0B0"; e.currentTarget.style.color = "#124AF0"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#124AF0"; e.currentTarget.style.color = "white"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              לתוכנית הקורס ←
            </a>
            <a
              href="#about"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "white",
                padding: "14px 28px",
                borderRadius: 50,
                fontWeight: 600,
                fontSize: "1rem",
                display: "inline-block",
                border: "1px solid rgba(255,255,255,0.3)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            >
              קראי עלי
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          color: "rgba(255,255,255,0.5)",
          fontSize: "1.5rem",
          animation: "float 2.5s ease-in-out infinite",
        }}
      >
        ↓
      </div>
    </section>
  );
}
