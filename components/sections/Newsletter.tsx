"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section style={{ background: "white", padding: "80px 1.5rem" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #124AF0 0%, #0a38c4 100%)",
            borderRadius: 28,
            padding: "52px 40px",
            textAlign: "center",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              top: -40,
              left: -40,
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "rgba(33,240,176,0.08)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -30,
              right: -30,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(33,240,176,0.06)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#21F0B0",
                color: "#124AF0",
                borderRadius: 50,
                padding: "6px 20px",
                fontSize: "0.88rem",
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              מדריך חינמי
            </div>

            <h2
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 700,
                marginBottom: 12,
                lineHeight: 1.3,
              }}
            >
              איך להגדיל את החיסכון לכל ילד
              <br />
              <span style={{ color: "#21F0B0" }}>מ-20,000 ל-70,000 ₪</span>
            </h2>

            <p
              style={{
                opacity: 0.88,
                fontSize: "1rem",
                lineHeight: 1.7,
                marginBottom: 32,
                maxWidth: 480,
                margin: "0 auto 32px",
              }}
            >
              המדריך שאני שולחת לכל מי שנרשמת לרשימת הדיוור שלי — חינם, בלי שיווק מיותר. רק ידע שעובד.
            </p>

            {submitted ? (
              <div
                style={{
                  background: "#21F0B0",
                  color: "#124AF0",
                  borderRadius: 16,
                  padding: "20px 28px",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                }}
              >
                תודה! המדריך בדרך לתיבת הדואר שלך
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  gap: 12,
                  maxWidth: 480,
                  margin: "0 auto",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="כתובת האימייל שלך"
                  required
                  style={{
                    flex: 1,
                    minWidth: 220,
                    padding: "14px 20px",
                    borderRadius: 50,
                    border: "none",
                    fontSize: "1rem",
                    outline: "none",
                    textAlign: "right",
                    color: "#292929",
                    direction: "rtl",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "#21F0B0",
                    color: "#124AF0",
                    border: "none",
                    borderRadius: 50,
                    padding: "14px 28px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "transform 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  {loading ? "שולחת..." : "שלחי לי את המדריך ←"}
                </button>
              </form>
            )}

            <p style={{ opacity: 0.6, fontSize: "0.82rem", marginTop: 16 }}>
              ללא ספאם. אפשר להסיר בכל עת.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
