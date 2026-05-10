"use client";

export default function MidCTA() {
  return (
    <div style={{ background: "#124AF0", padding: "56px 1.5rem", textAlign: "center" }}>
      <div style={{ maxWidth: 520, margin: "0 auto 28px" }}>
        {[
          "את רוצה שהכסף שלך יעבוד בשבילך",
          "את לא רוצה להיות האישה שגילתה מאוחר מדי",
          "את מוכנה להשקיע שבוע אחד כדי לשנות את כל השאר",
        ].map((q, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 10 }}>
            <span style={{ background: "#21F0B0", color: "#124AF0", fontSize: "0.72rem", fontWeight: 800, padding: "3px 10px", borderRadius: 50, whiteSpace: "nowrap", flexShrink: 0 }}>כן</span>
            <p style={{ fontSize: "0.97rem", color: "rgba(255,255,255,0.9)", margin: 0 }}>{q}</p>
          </div>
        ))}
        <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFFFFF", marginTop: 20, marginBottom: 0 }}>
          אז את כבר יודעת מה לעשות.
        </p>
      </div>
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
