"use client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#292929",
        color: "white",
        padding: "56px 1.5rem 32px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 40,
            marginBottom: 48,
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#124AF0",
                borderRadius: 50,
                padding: "8px 18px 8px 8px",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "#21F0B0",
                  borderRadius: "50%",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontWeight: 700, fontSize: "1rem", color: "white" }}>
                מצב צבירה
              </span>
            </div>
            <p style={{ color: "#aaa", fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 240 }}>
              מנגישות את עולם שוק ההון לנשים חרדיות — בשפה ברורה, בידע אמיתי.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: "0.95rem", color: "#21F0B0" }}>
              ניווט מהיר
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "אודות", href: "#about" },
                { label: "מה כלול", href: "#included" },
                { label: "סילבוס", href: "#syllabus" },
                { label: "מחירים", href: "#pricing" },
                { label: "שאלות נפוצות", href: "#faq" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      color: "#aaa",
                      fontSize: "0.9rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#21F0B0")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: "0.95rem", color: "#21F0B0" }}>
              צרי קשר
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a
                href="mailto:matzavtzvira@gmail.com"
                style={{
                  color: "#aaa",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
              >
                <span>✉️</span>
                matzavtzvira@gmail.com
              </a>
              <a
                href="tel:0527065653"
                style={{
                  color: "#aaa",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  direction: "ltr",
                  justifyContent: "flex-end",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
              >
                <span style={{ direction: "rtl" }}>📞</span>
                052-706-5653
              </a>
            </div>

            <div style={{ marginTop: 24 }}>
              <a
                href="https://matzavtzvira.co.il"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#21F0B0",
                  color: "#124AF0",
                  borderRadius: 50,
                  padding: "10px 22px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  display: "inline-block",
                  transition: "transform 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                לרכישת התוכנית ←
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ color: "#666", fontSize: "0.82rem" }}>
            © 2024 מצב צבירה | כל הזכויות שמורות לרבקי וייס
          </p>
          <p style={{ color: "#555", fontSize: "0.8rem" }}>
            המידע באתר אינו מהווה ייעוץ פיננסי אישי
          </p>
        </div>
      </div>
    </footer>
  );
}
