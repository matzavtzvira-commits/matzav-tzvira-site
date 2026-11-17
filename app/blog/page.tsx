import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getPublishedPosts, formatHebrewDate, CATEGORY_COLORS } from "@/lib/blog";

// A new post goes live every day at midnight (Israel time); re-check hourly.
export const revalidate = 3600;

const SITE_URL = "https://matzavtzvira.co.il";

export default function BlogIndexPage() {
  const posts = getPublishedPosts();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "מאמרים - מצב צבירה",
    url: `${SITE_URL}/blog`,
    inLanguage: "he",
    author: { "@type": "Person", name: "רבקי וייס", url: `${SITE_URL}/about` },
    blogPost: posts.slice(0, 20).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.publishDate,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navigation />
      <main style={{ paddingTop: 80 }}>
        <section style={{ background: "radial-gradient(ellipse at 50% 30%, #1535B5 0%, #060D3C 65%)", padding: "96px 1.5rem 64px", textAlign: "center" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.9rem", letterSpacing: 1, margin: "0 0 14px" }}>פעמיים בשבוע, ישר מהתיבה</p>
            <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", fontWeight: 800, color: "white", lineHeight: 1.3, margin: "0 0 16px" }}>
              מאמרים
            </h1>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.9, margin: 0 }}>
              בשני: מושג אחד על הכסף שלך. בחמישי: חלון קטן למה שקורה בעולם.
              <br />
              הכל בשפה שלנו, בלי פחד ובלי מילים מפוצצות.
            </p>
          </div>
        </section>

        <section style={{ background: "#F4F7FF", padding: "56px 1.5rem 72px" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 }}>
            {posts.length === 0 && (
              <p style={{ textAlign: "center", color: "#555", fontSize: "1.05rem" }}>הפוסט הראשון עולה ממש בקרוב.</p>
            )}
            {posts.map((p) => {
              const color = CATEGORY_COLORS[p.category] ?? "#124AF0";
              return (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-card" style={{ display: "block", background: "white", borderRadius: 20, padding: "26px 30px", border: "1px solid #E8EDFF", textDecoration: "none", color: "#292929", transition: "box-shadow 0.2s, transform 0.2s" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}>
                    <span style={{ background: color, color: "white", borderRadius: 50, padding: "3px 12px", fontSize: "0.78rem", fontWeight: 700 }}>{p.category}</span>
                    <span style={{ color: "#888", fontSize: "0.82rem" }}>נשלח במייל ב-{formatHebrewDate(p.originalDate)}</span>
                    <span style={{ color: "#888", fontSize: "0.82rem" }}>• {p.readMinutes} דקות קריאה</span>
                  </div>
                  <h2 style={{ fontSize: "1.22rem", fontWeight: 800, color: "#0B1F66", lineHeight: 1.45, margin: "0 0 8px" }}>{p.title}</h2>
                  <p style={{ fontSize: "0.97rem", color: "#555", lineHeight: 1.8, margin: 0 }}>{p.description}</p>
                </Link>
              );
            })}
          </div>
          <style>{`
            .blog-card:hover { box-shadow: 0 8px 28px rgba(18,74,240,0.10); transform: translateY(-2px); }
            @media(max-width:600px){ .blog-card { padding: 22px 18px !important; } }
          `}</style>
        </section>
      </main>
      <Footer />
    </>
  );
}
