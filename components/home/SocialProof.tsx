"use client";

const stats = [
  { num: "8+", label: "שנות ניסיון בשוק ההון" },
  { num: "168", label: "משפחות לרווחה כלכלית" },
  { num: "טור שבועי", label: 'ב"בתוך המשפחה" — שוות הון' },
  { num: "סדנאות", label: "והרצאות ברחבי הארץ" },
];

export default function SocialProof() {
  return (
    <section style={{ background: "#124AF0", padding: "28px 1.5rem", position: "relative", overflow: "hidden" }}>
      {/* decorative dots */}
      <div style={{ position: "absolute", top: 8, right: 20, display: "flex", gap: 6, opacity: 0.25, pointerEvents: "none" }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#21F0B0" }} />
        ))}
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: "center", color: "white" }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#21F0B0", lineHeight: 1 }}>
              {s.num}
            </div>
            <div style={{ fontSize: "0.85rem", opacity: 0.85, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
