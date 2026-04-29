"use client";

const steps = [
  { num: "1", title: "מיפוי מלא", icon: "🗺️", desc: "דאשבורד דיגיטלי למיפוי כל הנכסים הפיננסיים שלך במקום אחד" },
  { num: "2", title: "משוב אישי", icon: "👁️", desc: "צוות מצב צבירה עובר על הנתונים שלך ונותן המלצות מותאמות אישית" },
  { num: "3", title: "תוכנית שיפור", icon: "📋", desc: "הצעות פרקטיות לשיפור התיק הפיננסי שלך צעד אחר צעד" },
];

export default function Bonus() {
  return (
    <section style={{ background: "white", padding: "80px 1.5rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #F4F7FF, #e8edff)",
            borderRadius: 24,
            padding: "48px 36px",
            border: "2px solid #E8EDFF",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#124AF0",
              color: "#21F0B0",
              borderRadius: 50,
              padding: "6px 20px",
              fontSize: "0.88rem",
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            🎁 בונוס מיוחד
          </div>

          <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#124AF0", marginBottom: 8 }}>
            מפת הנכסים שלי
          </h2>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <span style={{ fontSize: "1.1rem", color: "#555", textDecoration: "line-through" }}>
              שווי: 500 ₪
            </span>
            <span
              style={{
                background: "#21F0B0",
                color: "#124AF0",
                borderRadius: 50,
                padding: "4px 16px",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              כלול חינם בתוכנית!
            </span>
          </div>

          {/* Steps */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
              textAlign: "right",
            }}
          >
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: 16,
                  padding: "24px 20px",
                  border: "1px solid #E8EDFF",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: "#124AF0",
                    color: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    marginBottom: 12,
                  }}
                >
                  {step.num}
                </div>
                <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{step.icon}</div>
                <h3 style={{ fontWeight: 700, color: "#124AF0", fontSize: "1rem", marginBottom: 8 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
