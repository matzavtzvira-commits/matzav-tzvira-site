"use client";
import Link from "next/link";

export default function Footer() {
  const circles = [
    { size: 80, color: "#292929", bottom: "15%", right: "8%" },
    { size: 52, color: "#292929", bottom: "40%", right: "18%" },
    { size: 44, color: "#FA5C5C", bottom: "55%", left: "12%" },
    { size: 64, color: "#21F0B0", bottom: "20%", left: "35%" },
  ];

  return (
    <footer
      style={{
        background: "#124AF0",
        position: "relative",
        overflow: "hidden",
        padding: "40px 1.5rem 32px",
      }}
    >
      {/* Decorative circles */}
      {circles.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: c.size,
            height: c.size,
            borderRadius: "50%",
            background: c.color,
            bottom: c.bottom,
            right: c.right,
            left: c.left,
            opacity: 0.9,
          }}
        />
      ))}

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 40 }}>
          <a href="mailto:matzavtzvira@gmail.com" aria-label="שלח מייל למצב צבירה" style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.35)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
          <a href="https://wa.me/972527065653" target="_blank" rel="noopener noreferrer" aria-label="פנה אלינו בוואטסאפ (נפתח בחלון חדש)" style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.35)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </a>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 24 }}>
          {/* Credit */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{ color: "#FFFFFF", fontSize: "0.85rem", fontWeight: 600 }}>עיצוב ובניה</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/web-builder-logo.png"
              alt="grid עיצוב איפיון"
              style={{ height: 36, width: 36, borderRadius: 6, objectFit: "cover", opacity: 1 }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 12, flexWrap: "wrap" }}>
            <Link href="/privacy" style={{ color: "#FFFFFF", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#21F0B0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#FFFFFF")}>
              מדיניות פרטיות
            </Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>|</span>
            <Link href="/terms" style={{ color: "#FFFFFF", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#21F0B0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#FFFFFF")}>
              תקנון האתר
            </Link>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>|</span>
            <Link href="/accessibility" style={{ color: "#FFFFFF", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#21F0B0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#FFFFFF")}>
              הצהרת נגישות
            </Link>
          </div>
          <p style={{ color: "#FFFFFF", fontSize: "0.82rem", fontWeight: 500 }}>
            © 2026 מצב צבירה | המידע באתר אינו מהווה ייעוץ פיננסי
          </p>
        </div>
      </div>
    </footer>
  );
}
