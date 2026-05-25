"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const bullets = [
  "מה זה ביטקוין ולמה כולם מדברים עליו",
  "המספרים האמיתיים - הזדמנות מול סיכון",
  "2 הדרכים להשקיע (ומה ההבדל ביניהן)",
  "מה קורה עם הרגולציה בישראל",
];

export default function BitcoinGuidePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !consent) return;
    setLoading(true);
    try {
      await fetch("/api/guides/bitcoin-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
    } catch {}
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main dir="rtl" style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 20%, #1535B5 0%, #060D3C 65%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 1.5rem 80px" }}>

      {/* Logo */}
      <Link href="/" style={{ marginBottom: 36, display: "block" }}>
        <Image src="/icon.svg" alt="מצב צבירה" width={60} height={60} style={{ borderRadius: 12 }} />
      </Link>

      <div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>

        {/* Badge */}
        <div style={{ display: "inline-block", background: "rgba(33,240,176,0.12)", border: "1px solid rgba(33,240,176,0.35)", borderRadius: 50, padding: "6px 20px", marginBottom: 24 }}>
          <span style={{ color: "#21F0B0", fontSize: "0.82rem", fontWeight: 700, letterSpacing: 1 }}>מדריך חינמי</span>
        </div>

        {/* Title */}
        <h1 style={{ color: "#FFFFFF", fontSize: "clamp(1.7rem, 5vw, 2.4rem)", fontWeight: 900, lineHeight: 1.3, marginBottom: 12 }}>
          המדריך הפרקטי לביטקוין
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.05rem", marginBottom: 28, lineHeight: 1.6 }}>
          לעשות סדר בבלאגן - בלי פחד
        </p>

        {/* Video */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 12px 48px rgba(0,0,0,0.5)", width: "100%", maxWidth: 340, aspectRatio: "9/16", position: "relative" }}>
            <video autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
              <source src="/guides/bitcoin-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Bullets */}
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "24px 28px", marginBottom: 36, textAlign: "right" }}>
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", marginBottom: 14, textAlign: "center" }}>מה תקבלי במדריך</p>
          {bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: i < bullets.length - 1 ? 12 : 0 }}>
              <span style={{ color: "#21F0B0", fontWeight: 900, fontSize: "1rem", flexShrink: 0, marginTop: 1 }}>✓</span>
              <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", lineHeight: 1.5 }}>{b}</span>
            </div>
          ))}
        </div>

        {/* Form or Success */}
        {submitted ? (
          <div style={{ background: "#21F0B0", color: "#124AF0", borderRadius: 16, padding: "24px 28px", fontWeight: 800, fontSize: "1.05rem", lineHeight: 1.5 }}>
            המדריך בדרך - תבדקי את תיבת הדואר שלך
            <p style={{ fontWeight: 400, fontSize: "0.88rem", marginTop: 8, opacity: 0.75 }}>
              לא קיבלת? שלחי מייל ל-
              <a href="mailto:matzavtzvira@gmail.com" style={{ color: "#124AF0", textDecoration: "underline" }}>matzavtzvira@gmail.com</a>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input
              type="text"
              placeholder="השם שלך"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              dir="rtl"
              style={{ padding: "15px 20px", borderRadius: 50, border: "2px solid #21F0B0", fontSize: "1rem", outline: "none", textAlign: "right", color: "#292929", width: "100%", boxSizing: "border-box", background: "#ffffff", boxShadow: "0 0 0 4px rgba(33,240,176,0.15)" }}
            />
            <input
              type="email"
              placeholder="כתובת האימייל שלך"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              dir="rtl"
              style={{ padding: "15px 20px", borderRadius: 50, border: "2px solid #21F0B0", fontSize: "1rem", outline: "none", textAlign: "right", color: "#292929", width: "100%", boxSizing: "border-box", background: "#ffffff", boxShadow: "0 0 0 4px rgba(33,240,176,0.15)" }}
            />

            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", textAlign: "right" }}>
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                style={{ width: 16, height: 16, marginTop: 2, flexShrink: 0, cursor: "pointer", accentColor: "#21F0B0" }}
              />
              <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem", lineHeight: 1.5 }}>
                אני מאשרת קבלת תכנים ומידע מרבקי - מצב צבירה. ניתן להסיר בכל עת.
              </span>
            </label>

            <button
              type="submit"
              disabled={!name || !email || !consent || loading}
              style={{ background: !name || !email || !consent ? "rgba(33,240,176,0.35)" : "#21F0B0", color: "#ffffff", border: "none", borderRadius: 50, padding: "15px 32px", fontSize: "1rem", fontWeight: 800, cursor: !email || !consent ? "not-allowed" : "pointer", transition: "all 0.2s", width: "100%" }}
            >
              {loading ? "שולחת..." : "שלחי לי את המדריך ←"}
            </button>
          </form>
        )}

        {/* Footer note */}
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", marginTop: 28, lineHeight: 1.6 }}>
          כל האמור הוא למטרת העשרה בלבד ואינו מהווה ייעוץ פיננסי
        </p>
      </div>
    </main>
  );
}
