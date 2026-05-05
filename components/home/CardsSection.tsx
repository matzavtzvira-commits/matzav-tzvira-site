"use client";

const badges = [
  { label: "קורס ה-MUSTריות", href: "#must", color: "rgba(255,255,255,0.15)", text: "#FFFFFF", border: "2px solid rgba(255,255,255,0.6)" },
  { label: "ליווי VIP אישי", href: "#vip", color: "rgba(255,255,255,0.15)", text: "#FFFFFF", border: "2px solid rgba(255,255,255,0.6)" },
  { label: "ספרייה פיננסית", href: "#library", color: "rgba(255,255,255,0.15)", text: "#FFFFFF", border: "2px solid rgba(255,255,255,0.6)" },
  { label: "הרצאות וסדנאות", href: "/workshop", color: "rgba(255,255,255,0.15)", text: "#FFFFFF", border: "2px solid rgba(255,255,255,0.6)" },
  { label: "קהילת צוברות", href: "#community", color: "rgba(255,255,255,0.15)", text: "#FFFFFF", border: "2px solid rgba(255,255,255,0.6)" },
];

export default function CardsSection() {
  return (
    <section style={{ position: "relative", overflow: "hidden", minHeight: 420 }}>
      {/* background video */}
      <video
        autoPlay loop muted playsInline
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      >
        <source src="/umbrella-wide-new.mp4" type="video/mp4" />
      </video>

      {/* dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(7,12,36,0.45) 0%, rgba(7,12,36,0.75) 60%, rgba(7,12,36,0.97) 100%)" }} />

      {/* content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 860, margin: "0 auto", padding: "72px 1.5rem 64px", textAlign: "center" }}>

        <h2 style={{ color: "#FFFFFF", fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.3, margin: "0 0 16px 0", textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>
          מה יש תחת המטריה?
        </h2>
        <p style={{ color: "#21F0B0", fontSize: "1.15rem", fontWeight: 600, margin: "0 0 40px", textShadow: "0 0 20px rgba(33,240,176,0.5)" }}>
          מצב צבירה הוא לא עוד קורס אחד <span style={{ fontSize: "0.75em" }}>—</span> זה הבית הפיננסי שלך.
        </p>

        <div style={{ display: "flex", flexWrap: "nowrap", gap: 10, justifyContent: "center" }}>
          {badges.map((b, i) => (
            <a
              key={i}
              href={b.href}
              style={{
                background: b.color,
                color: b.text,
                border: b.border,
                padding: "11px 20px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                whiteSpace: "nowrap",
                backdropFilter: "blur(8px)",
                transition: "transform 0.15s, background 0.2s",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              {b.label} <span className="arrow-anim">←</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
