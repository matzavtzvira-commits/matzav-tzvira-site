"use client";
import Link from "next/link";

const pillars = [
  { icon: "", title: "ידע", desc: "הכל בשפה ברורה - מאמרים, הסברים ומדריכים שמנגישים את עולם שוק ההון", href: "/articles", color: "#124AF0" },
  { icon: "", title: "מאמרים", desc: "טור שבועי מלא תובנות שאפשר ליישם - מפנסיה ועד פתיחת חשבון מסחר", href: "/articles", color: "#21F0B0" },
  { icon: "", title: "מחשבונים", desc: "כלים אינטראקטיביים שעושים את החישוב בשבילך - דמי ניהול, חיסכון, ריבית דריבית", href: "/calculators", color: "#FA5C5C" },
  { icon: "", title: "MUSTריות", desc: "התוכנית המלאה - מאפס לביטחון פיננסי אמיתי, עם ליווי אישי ודשבורדים דיגיטליים", href: "/course", color: "#124AF0" },
  { icon: "", title: "קהילה", desc: "קהילת נשים תוססת שמדברות שוק ההון, צוברות פיננסיות ומחזקות אחת את השנייה", href: "/#community", color: "#21F0B0" },
];

export default function FivePillars() {
  return (
    <section style={{ background: "white", padding: "88px 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1, marginBottom: 8, background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50 }}>
            מה תמצאי כאן
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#124AF0", marginTop: 12, lineHeight: 1.2 }}>
            המטריה הפיננסית שלך
          </h2>
          <p style={{ color: "#555", fontSize: "1.05rem", marginTop: 12, lineHeight: 1.9 }}>
            ידע • תוכן • השקעות • עתיד
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 20 }}>
          {pillars.map((p, i) => (
            <Link
              key={i}
              href={p.href}
              style={{
                background: "#F4F7FF",
                borderRadius: 20,
                padding: "32px 20px",
                textAlign: "center",
                border: "2px solid #E8EDFF",
                display: "block",
                transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 36px rgba(18,74,240,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = p.color;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.borderColor = "#E8EDFF";
              }}
            >
              {/* pulse orb */}
              <div style={{ position: "absolute", top: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: p.color, opacity: 0.06, animation: "pulse 3s ease-in-out infinite", pointerEvents: "none" }} />
              <div style={{ fontSize: "2.2rem", marginBottom: 14 }}>{p.icon}</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#124AF0", marginBottom: 10 }}>{p.title}</h3>
              <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.7 }}>{p.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
