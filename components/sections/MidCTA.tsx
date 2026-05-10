"use client";

export default function MidCTA() {
  return (
    <div style={{ background: "#124AF0", padding: "56px 1.5rem", textAlign: "center" }}>
      <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: 4 }}>329 נשים כבר יודעות.</p>
      <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: 16 }}>הידע כאן. הכסף מחכה לך.</p>
      <a
        href="#pricing"
        style={{ position: "relative", display: "inline-block", textDecoration: "none", transition: "transform 0.2s", maxWidth: "100%" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-green.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 43%" }} />
        <span style={{ position: "relative", zIndex: 1, color: "#070C24", padding: "16px 52px", fontWeight: 800, fontSize: "1.05rem", display: "block" }}>
          אני רוצה להצטרף ←
        </span>
      </a>
    </div>
  );
}
