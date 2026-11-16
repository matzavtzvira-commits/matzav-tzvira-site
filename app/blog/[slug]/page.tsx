import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogBody from "@/components/blog/BlogBody";
import BlogCta from "@/components/blog/BlogCta";
import { getPublishedPosts, getPublishedPost, formatHebrewDate, CATEGORY_COLORS } from "@/lib/blog";

// Posts that aren't live yet return 404 and are re-checked hourly,
// so each one appears on its publishDate without a new deploy.
export const revalidate = 3600;
export const dynamicParams = true;

const SITE_URL = "https://matzavtzvira.co.il";

export async function generateStaticParams() {
  return getPublishedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPublishedPost(slug);
  if (!post) return { title: "הפוסט לא נמצא | מצב צבירה" };
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} | מצב צבירה`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "מצב צבירה",
      locale: "he_IL",
      type: "article",
      publishedTime: post.publishDate,
      authors: ["רבקי וייס"],
      images: [{ url: `${SITE_URL}/logo-new.png`, alt: "מצב צבירה" }],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPublishedPost(slug);
  if (!post) notFound();

  const all = getPublishedPosts(); // newest first
  const idx = all.findIndex((p) => p.slug === post.slug);
  const newer = idx > 0 ? all[idx - 1] : undefined;
  const older = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : undefined;
  const color = CATEGORY_COLORS[post.category] ?? "#124AF0";
  const url = `${SITE_URL}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: url,
    datePublished: post.publishDate,
    inLanguage: "he",
    author: { "@type": "Person", name: "רבקי וייס", url: `${SITE_URL}/about` },
    publisher: { "@type": "Organization", name: "מצב צבירה", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-new.png` } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation />
      <main style={{ paddingTop: 80 }}>
        <section style={{ background: "radial-gradient(ellipse at 50% 30%, #1535B5 0%, #060D3C 65%)", padding: "88px 1.5rem 56px", textAlign: "center" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
              <span style={{ background: color, color: "white", borderRadius: 50, padding: "4px 14px", fontSize: "0.82rem", fontWeight: 700 }}>{post.category}</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", display: "flex", alignItems: "center" }}>• {post.readMinutes} דקות קריאה</span>
            </div>
            <h1 style={{ fontSize: "clamp(1.7rem, 4vw, 2.5rem)", color: "white", fontWeight: 800, lineHeight: 1.35, margin: 0 }}>{post.title}</h1>
          </div>
        </section>

        <section style={{ background: "#F4F7FF", padding: "48px 1.5rem 72px" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <Link href="/blog" style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>→ לכל המיילים</Link>

            <article className="blog-article" style={{ background: "white", borderRadius: 24, padding: "40px 44px", border: "1px solid #E8EDFF", marginTop: 16 }}>
              <p style={{ fontSize: "0.85rem", color: "#888", margin: "0 0 26px", borderBottom: "1px solid #EEF1FA", paddingBottom: 16 }}>
                המייל נשלח לרשימת התפוצה ב-{formatHebrewDate(post.originalDate)} בנושא: <strong style={{ color: "#555" }}>{post.subject}</strong>
              </p>
              <BlogBody body={post.body} />
              <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "#124AF0", margin: "26px 0 0" }}>רבקי</p>
              <p style={{ fontSize: "0.78rem", color: "#999", lineHeight: 1.7, fontStyle: "italic", margin: "28px 0 0" }}>
                כל האמור הוא למטרת העשרה והדרכה בלבד, ואינו מהווה ייעוץ פיננסי, המלצה להשקעה או תחליף לייעוץ מקצועי. כל פעולה בשוק ההון הינה על אחריותך בלבד. הנתונים נכונים למועד שליחת המייל.
              </p>
            </article>

            <BlogCta />

            {(newer || older) && (
              <nav className="blog-pager" aria-label="מיילים נוספים" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 28 }}>
                {older ? (
                  <Link href={`/blog/${older.slug}`} style={{ background: "white", border: "1px solid #E8EDFF", borderRadius: 18, padding: "18px 20px", textDecoration: "none" }}>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "#888", marginBottom: 4 }}>→ המייל הקודם</span>
                    <span style={{ fontWeight: 700, color: "#0B1F66", lineHeight: 1.5 }}>{older.title}</span>
                  </Link>
                ) : <span />}
                {newer ? (
                  <Link href={`/blog/${newer.slug}`} style={{ background: "white", border: "1px solid #E8EDFF", borderRadius: 18, padding: "18px 20px", textDecoration: "none", textAlign: "left" }}>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "#888", marginBottom: 4 }}>המייל הבא ←</span>
                    <span style={{ fontWeight: 700, color: "#0B1F66", lineHeight: 1.5 }}>{newer.title}</span>
                  </Link>
                ) : <span />}
              </nav>
            )}
          </div>
          <style>{`
            @media(max-width:600px){
              .blog-article { padding: 28px 20px !important; }
              .blog-pager { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>
      </main>
      <Footer />
    </>
  );
}
