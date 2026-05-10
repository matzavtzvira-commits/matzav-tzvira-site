"use client";
import { useState } from "react";
import Link from "next/link";

const services = [
  { label: "התוכנית הדיגיטלית MUSTרית", href: "/course" },
  { label: "ליווי VIP אישי", href: "/vip" },
  { label: "סדנאות והרצאות לארגונים", href: "/workshop" },
  { label: "מחשבונים פיננסיים חינמיים", href: "/calculators" },
  { label: "מאמרים ומדריכים", href: "/articles" },
];

export default function PreFooter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !consent) return;
    setLoading(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
    } catch {}
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="newsletter" style={{ background: "linear-gradient(135deg, #0a1a6e 0%, #124AF0 100%)", padding: "80px 1.5rem", position: "relative", overflow: "hidden" }}>
      {/* orbs */}
      <div style={{ position: "absolute", top: -80, right: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(33,240,176,0.08)", filter: "blur(70px)", animation: "float 12s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(250,92,92,0.06)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="prefooter-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>

          {/* Right: services list */}
          <div>
            <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 700, color: "white", lineHeight: 1.3, marginBottom: 32 }}>
              מה תמצאי אצלי:
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 0 }}>
              {services.map((s, i) => (
                <li key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <Link
                    href={s.href}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px 0",
                      color: "rgba(255,255,255,0.85)",
                      fontSize: "1rem",
                      fontWeight: 500,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#21F0B0"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"; }}
                  >
                    <span>+ {s.label}</span>
                    <span style={{ color: "#21F0B0", fontSize: "1.1rem" }}>←</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Left: newsletter */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#21F0B0",
                color: "#124AF0",
                borderRadius: 50,
                padding: "5px 16px",
                fontSize: "0.82rem",
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              חינמי לגמרי
            </div>
            <h3 style={{ fontSize: "clamp(1.3rem, 2.8vw, 1.8rem)", fontWeight: 700, color: "white", lineHeight: 1.3, marginBottom: 12 }}>
              קהילת צוברות פיננסיות
              <br />
              <span style={{ color: "#21F0B0" }}>קהילת הנשים שמדברות שוק ההון</span>
            </h3>
            <p style={{ color: "#FFFFFF", fontSize: "0.92rem", lineHeight: 1.9, marginBottom: 8 }}>
              נשים צוברות. פיננסיות. פעילות.
            </p>
            <p style={{ color: "#FFFFFF", fontSize: "0.88rem", lineHeight: 1.9, marginBottom: 28 }}>
              כל שבוע: תוכן פיננסי בשפה שלנו, וטיפ שאפשר ליישם היום.
              <br />
              <strong style={{ color: "#21F0B0" }}>+ סרטון חינמי</strong> &ldquo;5 הטעויות הנפוצות שנשים עושות בשוק ההון&rdquo; ישירות למייל.
              <br />
              <span style={{ color: "#FFFFFF", fontSize: "0.82rem" }}>(בלי ספאם. בלי שטויות. רק ידע שווה.)</span>
            </p>

            {submitted ? (
              <div style={{ background: "#21F0B0", color: "#124AF0", borderRadius: 16, padding: "20px 24px", fontWeight: 700, fontSize: "1rem" }}>
                נרשמת! המיני-קורס בדרך אלייך
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <label htmlFor="prefooter-name" className="sr-only">שם מלא</label>
                <input
                  id="prefooter-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="השם שלך"
                  required
                  className="prefooter-input" style={{ padding: "14px 20px", borderRadius: 50, border: "2px solid rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.1)", fontSize: "1rem", direction: "rtl", color: "#FFFFFF" }}
                />
                <label htmlFor="prefooter-email" className="sr-only">כתובת אימייל</label>
                <input
                  id="prefooter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="כתובת האימייל שלך"
                  required
                  className="prefooter-input" style={{ padding: "14px 20px", borderRadius: 50, border: "2px solid rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.1)", fontSize: "1rem", direction: "rtl", color: "#FFFFFF" }}
                />
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: "#21F0B0", cursor: "pointer", flexShrink: 0 }}
                  />
                  <span style={{ color: "#FFFFFF", fontSize: "0.85rem", lineHeight: 1.5 }}>
                    אני מאשרת קבלת תכנים ממצב צבירה
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={!consent}
                  style={{
                    background: "transparent",
                    color: "#FFFFFF",
                    textShadow: "0 0 8px #fff, 0 0 24px rgba(255,255,255,0.9), 0 0 48px rgba(255,255,255,0.6)",
                    border: "2px solid rgba(255,255,255,0.9)",
                    boxShadow: "0 0 16px rgba(255,255,255,0.25)",
                    borderRadius: 50,
                    padding: "15px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: consent ? "pointer" : "not-allowed",
                    transition: "transform 0.15s, opacity 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}
                >
                  {loading ? "שולחת..." : <>אני מצטרפת לקהילה <span className="arrow-anim">←</span></>}
                </button>
              </form>
            )}
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", marginTop: 12 }}>
              ללא ספאם. אפשר להסיר בכל עת.
            </p>
          </div>
        </div>

      </div>
      <style>{`
        @media(max-width:768px){
          .prefooter-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media(max-width:640px){
          .prefooter-input { font-size: 0.95rem !important; }
        }
      `}</style>
    </section>
  );
}
