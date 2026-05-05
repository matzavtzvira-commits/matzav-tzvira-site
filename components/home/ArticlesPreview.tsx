"use client";
import Link from "next/link";

const articles = [
  {
    slug: "pension-management-fees",
    title: "איך לבדוק את דמי הניהול בפנסיה שלך",
    excerpt: "רוב הנשים לא יודעות כמה הן משלמות בפנסיה — ואחרי שהן מגלות, הן לא מאמינות. מדריך פשוט שיחסוך לך עשרות אלפי שקלים.",
    date: "ינואר 2025",
    tag: "פנסיה",
    tagColor: "#124AF0",
    emoji: "",
  },
  {
    slug: "har-hakessef",
    title: "הר הכסף — כך תמצאי כסף שלא ידעת שיש לך",
    excerpt: "מיליארדים ממתינים לבעליהם. כל מה שצריך זה לדעת לחפש. מדריך שלב אחר שלב לאיתור קרנות ישנות, ביטוחים ופנסיות שכוחות.",
    date: "פברואר 2025",
    tag: "חדש",
    tagColor: "#FA5C5C",
    emoji: "",
  },
  {
    slug: "savings-for-kids",
    title: "חיסכון לכל ילד — מ-20,000 ל-70,000 ₪",
    excerpt: "החיסכון שהממשלה פותחת לכל ילד יכול להפוך להון אמיתי — אם בוחרים נכון. הנה הדרך הפשוטה שרוב ההורים לא מכירים.",
    date: "מרץ 2025",
    tag: "ילדים",
    tagColor: "#21F0B0",
    emoji: "",
  },
];

export default function ArticlesPreview() {
  return (
    <section style={{ background: "#F4F7FF", padding: "88px 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1, background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50, marginBottom: 10 }}>
              מאמרים אחרונים
            </p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", color: "#124AF0", lineHeight: 1.2 }}>
              ידע שאפשר ליישם היום
            </h2>
          </div>
          <Link
            href="/articles"
            style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.95rem", borderBottom: "2px solid #21F0B0", paddingBottom: 2, transition: "color 0.2s" }}
          >
            לכל המאמרים ←
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/articles/${a.slug}`}
              style={{
                background: "white",
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid #E8EDFF",
                display: "block",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(18,74,240,0.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              {/* Image placeholder */}
              <div style={{ background: "linear-gradient(135deg, #F4F7FF, #e8edff)", height: 160, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>
                {a.emoji}
              </div>
              <div style={{ padding: "24px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ background: a.tagColor, color: a.tagColor === "#21F0B0" ? "#124AF0" : "white", borderRadius: 50, padding: "3px 12px", fontSize: "0.78rem", fontWeight: 700 }}>
                    {a.tag}
                  </span>
                  <span style={{ color: "#999", fontSize: "0.8rem" }}>{a.date}</span>
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#292929", lineHeight: 1.4, marginBottom: 10 }}>
                  {a.title}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.7 }}>{a.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
