"use client";
import Link from "next/link";

export default function HomeAbout() {
  return (
    <section id="about" style={{ background: "#F4F7FF", padding: "88px 1.5rem", position: "relative", overflow: "hidden" }}>
      {/* orb */}
      <div style={{ position: "absolute", top: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(33,240,176,0.07)", filter: "blur(60px)", animation: "float 14s ease-in-out infinite", pointerEvents: "none" }} />

      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 56, alignItems: "center" }}>
        {/* Photo placeholder */}
        <div
          style={{
            background: "linear-gradient(135deg, #124AF0, #0a38c4)",
            borderRadius: 24,
            aspectRatio: "3/4",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", bottom: -30, right: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(33,240,176,0.15)", animation: "pulse 4s ease-in-out infinite" }} />
          <div style={{ fontSize: "4rem", marginBottom: 16, position: "relative", zIndex: 1 }}>👩</div>
          <p style={{ color: "white", fontWeight: 700, fontSize: "1rem", position: "relative", zIndex: 1 }}>רבקי וייס</p>
          <p style={{ color: "#21F0B0", fontSize: "0.85rem", position: "relative", zIndex: 1 }}>מתכננת פיננסית</p>
        </div>

        {/* Text */}
        <div>
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1, marginBottom: 8, background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50 }}>
            נעים להכיר
          </p>

          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", color: "#124AF0", marginTop: 14, marginBottom: 24, lineHeight: 1.25 }}>
            רבקי וייס
            <br />
            <span style={{ fontSize: "1rem", fontWeight: 400, color: "#555" }}>מתכננת פיננסית | מייסדת מצב צבירה</span>
          </h2>

          <p style={{ color: "#292929", lineHeight: 1.9, fontSize: "1.02rem", marginBottom: 20 }}>
            עד לפני שש שנים, סביר להניח שהיינו נפגשות כשאני עם מברשת ופן ביד. הייתי פאנית מצליחה, עובדת שעות על הרגליים — במירוץ שמעולם לא נגמר.
          </p>

          {/* Pull quote */}
          <div
            style={{
              borderRight: "4px solid #21F0B0",
              paddingRight: 20,
              marginBottom: 20,
            }}
          >
            <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#124AF0", lineHeight: 1.5, fontStyle: "italic" }}>
              "הבנתי שביום שהידיים שלי לא בפעולה — אין הכנסה."
            </p>
          </div>

          <p style={{ color: "#555", lineHeight: 1.9, fontSize: "0.97rem", marginBottom: 28 }}>
            היום אני מלווה 168 משפחות להשקעות ארוכות טווח ומעבירה סדנאות ברחבי הארץ — כי ידע פיננסי הוא לא מותרות, הוא זכות.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/course"
              style={{
                background: "#124AF0",
                color: "white",
                padding: "13px 28px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: "0.97rem",
                display: "inline-block",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#21F0B0"; (e.currentTarget as HTMLElement).style.color = "#124AF0"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#124AF0"; (e.currentTarget as HTMLElement).style.color = "white"; }}
            >
              לתוכנית המלאה ←
            </Link>
            <Link
              href="/workshop"
              style={{
                border: "2px solid #124AF0",
                color: "#124AF0",
                padding: "11px 24px",
                borderRadius: 50,
                fontWeight: 600,
                fontSize: "0.95rem",
                display: "inline-block",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#124AF0"; (e.currentTarget as HTMLElement).style.color = "white"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#124AF0"; }}
            >
              סדנאות והרצאות
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
