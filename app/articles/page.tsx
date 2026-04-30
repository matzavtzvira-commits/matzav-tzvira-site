"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const articles = [
  { slug: "pension-management-fees", title: "איך לבדוק את דמי הניהול בפנסיה שלך", excerpt: "רוב הנשים לא יודעות כמה הן משלמות בפנסיה — ואחרי שהן מגלות, הן לא מאמינות. מדריך פשוט שיחסוך לך עשרות אלפי שקלים.", date: "ינואר 2025", tag: "פנסיה", emoji: "📊", tagColor: "#124AF0" },
  { slug: "har-hakessef", title: "הר הכסף — כך תמצאי כסף שלא ידעת שיש לך", excerpt: "מיליארדים ממתינים לבעליהם. כל מה שצריך זה לדעת לחפש. מדריך שלב אחר שלב לאיתור קרנות ישנות, ביטוחים ופנסיות שכוחות.", date: "פברואר 2025", tag: "חדש", emoji: "🏔️", tagColor: "#FA5C5C" },
  { slug: "savings-for-kids", title: "חיסכון לכל ילד — מ-20,000 ל-70,000 ₪", excerpt: "החיסכון שהממשלה פותחת לכל ילד יכול להפוך להון אמיתי — אם בוחרים נכון. הנה הדרך הפשוטה שרוב ההורים לא מכירים.", date: "מרץ 2025", tag: "ילדים", emoji: "🌱", tagColor: "#21F0B0" },
  { slug: "open-trading-account", title: "פתיחת חשבון מסחר — מדריך שלב אחרי שלב", excerpt: "פתיחת חשבון מסחר נשמעת מסובכת — אבל זה תהליך של פחות מ-20 דקות. הנה כל מה שצריך לדעת לפני שמתחילים.", date: "אפריל 2025", tag: "השקעות", emoji: "💼", tagColor: "#124AF0" },
];


export default function ArticlesPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: 90 }}>
        {/* Header */}
        <section style={{ background: "linear-gradient(135deg, #124AF0, #0a38c4)", padding: "72px 1.5rem 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(33,240,176,0.1)", filter: "blur(40px)", pointerEvents: "none" }} />
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1, marginBottom: 12 }}>ידע = כוח</p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "white", fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>מאמרים ומדריכים</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", lineHeight: 1.8 }}>כל מה שצריך לדעת על שוק ההון, פנסיה והשקעות — בשפה שמבינים</p>
        </section>

        {/* Articles grid */}
        <section style={{ background: "#F4F7FF", padding: "64px 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {articles.map((a) => (
              <Link key={a.slug} href={`/articles/${a.slug}`}
                style={{ background: "white", borderRadius: 20, overflow: "hidden", border: "1px solid #E8EDFF", display: "block", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(18,74,240,0.1)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                <div style={{ background: "linear-gradient(135deg, #F4F7FF, #e8edff)", height: 160, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>{a.emoji}</div>
                <div style={{ padding: "24px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ background: a.tagColor, color: a.tagColor === "#21F0B0" ? "#124AF0" : "white", borderRadius: 50, padding: "3px 12px", fontSize: "0.78rem", fontWeight: 700 }}>{a.tag}</span>
                    <span style={{ color: "#999", fontSize: "0.8rem" }}>{a.date}</span>
                  </div>
                  <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#292929", lineHeight: 1.4, marginBottom: 10 }}>{a.title}</h2>
                  <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.7 }}>{a.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
