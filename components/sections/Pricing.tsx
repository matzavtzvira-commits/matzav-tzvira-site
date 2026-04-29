"use client";

export default function Pricing() {
  return (
    <section
      id="pricing"
      style={{ background: "#F4F7FF", padding: "80px 1.5rem" }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.9rem", letterSpacing: 1, marginBottom: 8, background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50 }}>
            ההשקעה שלך
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#124AF0", marginTop: 12, marginBottom: 12 }}>
            בחרי את המסלול שמתאים לך
          </h2>
          <p style={{ color: "#555", fontSize: "1rem" }}>
            המחיר הגבוה ביותר הוא מחיר אי-ההשקעה.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          {/* Plan A — Course only */}
          <div
            style={{
              background: "white",
              borderRadius: 24,
              padding: "36px 28px",
              border: "2px solid #E8EDFF",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: "1.15rem", color: "#292929", marginBottom: 6 }}>
                מסלול בסיסי
              </div>
              <div style={{ color: "#555", fontSize: "0.92rem" }}>
                קורס מלא + כל הכלים
              </div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: "3rem", fontWeight: 700, color: "#124AF0", lineHeight: 1 }}>
                597 ₪
              </div>
              <div style={{ color: "#555", fontSize: "0.9rem", marginTop: 6 }}>
                או 3 תשלומים של 199 ₪
              </div>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "שיעורים קלילים בגובה העיניים",
                "מדריכים פרקטיים",
                "דשבורדים דיגיטליים",
                "ליווי וקהילת המאסטריות",
                "גישה לשנה שלמה",
                "בדיקת תיק פיננסי אישית",
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", gap: 10, fontSize: "0.95rem", color: "#292929" }}>
                  <span style={{ color: "#21F0B0", fontWeight: 700 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="https://matzavtzvira.co.il"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "transparent",
                color: "#124AF0",
                border: "2px solid #124AF0",
                borderRadius: 50,
                padding: "14px",
                fontWeight: 700,
                fontSize: "1rem",
                textAlign: "center",
                display: "block",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#124AF0";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#124AF0";
              }}
            >
              אני מצטרפת — 597 ₪
            </a>
          </div>

          {/* Plan B — Full (recommended) */}
          <div
            style={{
              background: "linear-gradient(160deg, #124AF0 0%, #0a38c4 100%)",
              color: "white",
              borderRadius: 24,
              padding: "36px 28px",
              border: "2px solid #124AF0",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              boxShadow: "0 16px 48px rgba(18,74,240,0.25)",
            }}
          >
            {/* Recommended badge */}
            <div
              style={{
                position: "absolute",
                top: -14,
                right: 28,
                background: "#21F0B0",
                color: "#124AF0",
                borderRadius: 50,
                padding: "6px 20px",
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              ⭐ הכי פופולרי
            </div>

            <div style={{ marginBottom: 20, marginTop: 8 }}>
              <div style={{ fontWeight: 700, fontSize: "1.15rem", marginBottom: 6 }}>
                מסלול מלא + פגישה
              </div>
              <div style={{ opacity: 0.8, fontSize: "0.92rem" }}>
                קורס + זום אישי 1:1 אחרי חודשיים
              </div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: "3rem", fontWeight: 700, lineHeight: 1 }}>
                1,190 ₪
              </div>
              <div style={{ opacity: 0.8, fontSize: "0.9rem", marginTop: 6 }}>
                או 5 תשלומים של 238 ₪
              </div>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "כל מה שבמסלול הבסיסי",
                "פגישת זום אישית 1:1",
                "ניתוח מעמיק של הנתונים שלך",
                "דיוק תוכנית פעולה אישית",
                "וידוא שכל שקל במקום הנכון",
                "תמיכה גם אחרי הפגישה",
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", gap: 10, fontSize: "0.95rem" }}>
                  <span style={{ color: "#21F0B0", fontWeight: 700 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="https://matzavtzvira.co.il"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#21F0B0",
                color: "#124AF0",
                borderRadius: 50,
                padding: "16px",
                fontWeight: 700,
                fontSize: "1.05rem",
                textAlign: "center",
                display: "block",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              אני מצטרפת — 1,190 ₪ ←
            </a>
          </div>
        </div>

        {/* Trust footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: 32,
            display: "flex",
            justifyContent: "center",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          {["🔒 תשלום מאובטח", "↩️ אחריות 14 יום — החזר מלא", "📞 תמיכה אישית"].map((item, i) => (
            <span key={i} style={{ color: "#555", fontSize: "0.9rem", fontWeight: 600 }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
