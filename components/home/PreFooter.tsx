"use client";
import { useState } from "react";
import Link from "next/link";

const services = [
  { label: 'הקורס: "הכסף ישתדל, ואת תנוחי"', href: "/course" },
  { label: "ליווי VIP אישי", href: "/vip" },
  { label: "סדנאות והרצאות לארגונים", href: "/workshop" },
  { label: "מחשבונים פיננסיים חינמיים", href: "/calculators" },
  { label: "מאמרים ומדריכים", href: "/articles" },
];

export default function PreFooter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setSubmitted(true);
  };

  return (
    <section style={{ background: "linear-gradient(135deg, #0a1a6e 0%, #124AF0 100%)", padding: "80px 1.5rem", position: "relative", overflow: "hidden" }}>
      {/* orbs */}
      <div style={{ position: "absolute", top: -80, right: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(33,240,176,0.08)", filter: "blur(70px)", animation: "float 12s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(250,92,92,0.06)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>

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
              הצטרפי לקהילת הנשים
              <br />
              <span style={{ color: "#21F0B0" }}>שמדברות שוק ההון</span>
            </h3>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.92rem", lineHeight: 1.9, marginBottom: 8 }}>
              נשים צוברות. פיננסיות. פעילות.
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.88rem", lineHeight: 1.9, marginBottom: 28 }}>
              כל שבוע: מדריך קצר, עדכון שוק ההון בשפה שלנו, וטיפ שאפשר ליישם היום.
              <br />
              <strong style={{ color: "#21F0B0" }}>+ מיני-קורס חינמי</strong> "5 צעדים ראשונים בשוק ההון" ישירות למייל.
            </p>

            {submitted ? (
              <div style={{ background: "#21F0B0", color: "#124AF0", borderRadius: 16, padding: "20px 24px", fontWeight: 700, fontSize: "1rem" }}>
                ✓ ברוך הבא לקהילה! המיני-קורס בדרך אלייך
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="השם שלך"
                  required
                  style={{ padding: "14px 20px", borderRadius: 50, border: "none", fontSize: "1rem", outline: "none", direction: "rtl", color: "#292929" }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="כתובת האימייל שלך"
                  required
                  style={{ padding: "14px 20px", borderRadius: 50, border: "none", fontSize: "1rem", outline: "none", direction: "rtl", color: "#292929" }}
                />
                <button
                  type="submit"
                  style={{
                    background: "#21F0B0",
                    color: "#124AF0",
                    border: "none",
                    borderRadius: 50,
                    padding: "15px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "transform 0.15s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}
                >
                  אני מצטרפת לקהילה ←
                </button>
              </form>
            )}
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", marginTop: 12 }}>
              ללא ספאם. אפשר להסיר בכל עת.
            </p>
          </div>
        </div>

        {/* Contact bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            marginTop: 52,
            paddingTop: 28,
            display: "flex",
            justifyContent: "center",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          <a href="tel:0527065653" style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.92rem", display: "flex", alignItems: "center", gap: 8, transition: "color 0.2s", direction: "ltr" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#21F0B0")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)")}>
            <span>📞</span> 052-706-5653
          </a>
          <a href="mailto:matzavtzvira@gmail.com" style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.92rem", display: "flex", alignItems: "center", gap: 8, transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#21F0B0")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)")}>
            <span>✉️</span> matzavtzvira@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
