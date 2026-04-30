"use client";
import Link from "next/link";

const calcs = [
  { icon: "🌱", title: "חיסכון לכל ילד", desc: "כמה יהיה לילד שלך בגיל 18 לפי המסלול שתבחרי", href: "/calculators#kids", color: "#21F0B0" },
  { icon: "📉", title: "מחשבון דמי ניהול", desc: "כמה כסף תחסכי אם תורידי 0.5% דמי ניהול בפנסיה", href: "/calculators#fees", color: "#FA5C5C" },
  { icon: "📈", title: "ריבית דריבית", desc: "ראי איך הכסף שלך גדל עם הזמן — גרף חי ותוצאה מיידית", href: "/calculators#compound", color: "#124AF0" },
];

export default function CalculatorsPreview() {
  return (
    <section style={{ background: "white", padding: "88px 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1, background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50, marginBottom: 10 }}>
              כלים חינמיים
            </p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", color: "#124AF0", lineHeight: 1.2 }}>
              מחשבונים שעושים את העבודה
            </h2>
          </div>
          <Link href="/calculators" style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.95rem", borderBottom: "2px solid #21F0B0", paddingBottom: 2 }}>
            לכל המחשבונים ←
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {calcs.map((c, i) => (
            <Link
              key={i}
              href={c.href}
              style={{
                background: "#F4F7FF",
                borderRadius: 20,
                padding: "32px 24px",
                border: `2px solid #E8EDFF`,
                display: "flex",
                gap: 18,
                alignItems: "flex-start",
                transition: "border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = c.color; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#E8EDFF"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: "2rem", flexShrink: 0 }}>{c.icon}</div>
              <div>
                <h3 style={{ fontWeight: 700, color: "#124AF0", fontSize: "1rem", marginBottom: 8 }}>{c.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.7 }}>{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
