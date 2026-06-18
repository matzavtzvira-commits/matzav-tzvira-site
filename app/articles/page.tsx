"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

const _START = new Date("2026-05-17").getTime();
const v = (base: number, inc: number) =>
  base + Math.max(0, Math.floor((Date.now() - _START) / 86400000)) * inc;

const EyeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const kidsArticles = [
  { slug: "savings-for-kids", title: "חיסכון לכל ילד - המדריך המלא", excerpt: "מ-2017 המדינה מפקידה כסף לכל ילד כל חודש. ברירת המחדל מנחיתה אתכן במסלול שמניב פחות - וההפרש יכול להגיע ל-50,000 ₪. המדריך שיכניס אתכן לתמונה.", date: "מאי 2026", tag: "ילדים", tagColor: "#21F0B0", views: v(881, 6) },
  { slug: "savings-for-kids-niyud", title: "ניוד חיסכון לכל ילד - כך עוברות למסלול שעובד", excerpt: "בדקתן היכן הכסף ורוצות לשנות מסלול? המדריך המלא לניוד - למיטב הלכה, אינפיניטי הלכה ודרך ביטוח לאומי ישירות. חינמי, מקוון, פחות מ-15 דקות.", date: "מאי 2026", tag: "ילדים", tagColor: "#21F0B0", views: v(634, 5) },
];

const articles = [
  { slug: "bitcoin-guide", title: "המדריך הפרקטי לביטקוין: לעשות סדר בבלאגן", excerpt: "כולם מדברים על ביטקוין. חלק מפחדים, חלק נלהבים - ורוב הנשים לא יודעות מה לחשוב. מדריך ברור ובלי פחד.", date: "מאי 2026", tag: "השקעות", tagColor: "#124AF0", views: v(412, 4) },
  { slug: "har-hakessef", title: "הר הכסף - כך תמצאי כסף שלא ידעת שיש לך", excerpt: "מעל 8 מיליארד ש\"ח מחכים לבעליהם. פנסיות ישנות, ביטוחי חיים שנשכחו, חשבונות שנסגרו. בדיקה של 5 דקות שיכולה לגלות עשרות אלפי שקלים.", date: "מאי 2026", tag: "", tagColor: "#FA5C5C", views: v(235, 3) },
  { slug: "mashkanta-check", title: "המשכנתא שלך מחכה שתבדקי אותה", excerpt: "יש חלון קצר שבו מחזור נכון יכול לחסוך לך מאות אלפי שקלים. ואם את צריכה כסף נזיל - יש תאריך קריטי שאת חייבת לדעת.", date: "יוני 2026", tag: "משכנתא", tagColor: "#C8973A", views: v(180, 8) },
  // { slug: "keren-hishtalmut", title: "קרן השתלמות - הכסף שעובד בשבילך בשקט", excerpt: "יש לך חשבון שמתמלא כל חודש בלי שאת עושה כלום. המדריך המלא - כולל הסבר מיוחד למורות, טבלת השוואת מסלולים, והטעות שעולה מאות אלפי שקלים.", date: "מאי 2026", tag: "חיסכון", tagColor: "#124AF0" },
  { slug: "open-trading-account", title: "פתיחת תיק השקעות - וההבדלים בין הפלטפורמות המובילות", excerpt: "מיטב, פייר, IBI או אלטשולר - ההשוואה הכנה + מדריך שלב-אחר-שלב לפתיחת חשבון. פחות מ-15 דקות, מהבית, עם הטבות בלעדיות.", date: "מאי 2026", tag: "השקעות", tagColor: "#124AF0", views: v(659, 7) },
  { slug: "pension-management-fees", title: "איך לבדוק את דמי הניהול בפנסיה שלך", excerpt: "רוב הנשים לא יודעות כמה הן משלמות בפנסיה - ואחרי שהן מגלות, הן לא מאמינות. מדריך פשוט שיחסוך לך עשרות אלפי שקלים.", date: "ינואר 2025", tag: "פנסיה", tagColor: "#124AF0", comingSoon: true },
  // { slug: "mischar-vs-gemel", title: "חשבון מסחר עצמאי מול קופת גמל להשקעה - מי מנצח?", excerpt: "שאלה אחת מגיעה אלי יותר מכל אחרת. עשיתי סימולציה של 30 שנה עם מספרים אמיתיים - כולל המיסוי שהופך את כל התמונה. התשובה תפתיע אתכן.", date: "מאי 2026", tag: "השקעות", tagColor: "#124AF0" },
];


export default function ArticlesPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: 80 }}>
        {/* Header - Hero style */}
        <section style={{ background: "radial-gradient(ellipse at 50% 30%, #1535B5 0%, #060D3C 65%)", paddingTop: 100, paddingBottom: 72, position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
            <div className="articles-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 56, alignItems: "center" }}>

              {/* RIGHT - text */}
              <motion.div
                initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ textAlign: "right" }}
              >
                <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1, marginBottom: 14 }}>ידע = כוח</p>
                <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.3, margin: "0 0 16px" }}>
                  הספרייה הפי<span style={{ color: "#21F0B0" }}>נ</span><span style={{ color: "#FA5C5C" }}>נ</span><span style={{ color: "#21F0B0" }}>ס</span>ית שלך
                </h1>
                <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.9, margin: "0 0 8px" }}>
                  מדריכים שקוראים בנעלי בית, מהספה, עם קפה.
                </p>
                <span style={{ display: "inline-block", marginBottom: 0 }}>
                  <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: 0 }}>
                    אחריהם הכסף עובד בשבילך.
                  </p>
                  <svg viewBox="0 0 260 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }} preserveAspectRatio="none">
                    <defs>
                      <filter id="libSketch">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed="7" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
                      </filter>
                      <linearGradient id="libGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#21F0B0" />
                        <stop offset="100%" stopColor="#FA5C5C" />
                      </linearGradient>
                    </defs>
                    <motion.path d="M4 4 Q65 2 130 4 Q195 6 256 4" stroke="url(#libGrad)" strokeWidth="2" strokeLinecap="round" fill="none" filter="url(#libSketch)" opacity="0.85" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }} />
                  </svg>
                </span>
              </motion.div>

              {/* LEFT - slippers image */}
              <motion.div
                initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="articles-hero-img"
                style={{ borderRadius: 24, overflow: "hidden", height: 380 }}
              >
                <img src="/slippers-hero.jpg" alt="שוק ההון בנעלי בית" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </motion.div>

            </div>
          </div>
          <style>{`
            @media(max-width:768px){
              .articles-hero-grid { grid-template-columns: 1fr !important; }
              .articles-hero-img { height: 220px !important; order: 2; }
            }
          `}</style>
        </section>

        {/* All articles - unified grid, kids first */}
        <section style={{ background: "#F4F7FF", padding: "64px 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>

              {kidsArticles.map((a) => (
                <Link key={a.slug} href={`/articles/${a.slug}`}
                  style={{ background: "white", borderRadius: 20, overflow: "hidden", border: "2px solid #21F0B033", display: "block", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(33,240,176,0.15)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  <div style={{ background: "radial-gradient(ellipse at 50% 40%, #1535B5 0%, #060D3C 80%)", height: 160, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <video src="/kids-balloon.mp4" autoPlay loop muted playsInline style={{ height: "100%", width: "100%", objectFit: "contain" }} />
                  </div>
                  <div style={{ padding: "24px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ background: "#21F0B0", color: "#124AF0", borderRadius: 50, padding: "3px 12px", fontSize: "0.78rem", fontWeight: 700 }}>{a.tag}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#999", fontSize: "0.78rem" }}><EyeIcon />{a.views}</span>
                    </div>
                    <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#292929", lineHeight: 1.4, marginBottom: 10 }}>{a.title}</h2>
                    <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.7 }}>{a.excerpt}</p>
                  </div>
                </Link>
              ))}

              {articles.map((a) =>
                a.comingSoon ? (
                  <div key={a.slug} style={{ background: "white", borderRadius: 20, overflow: "hidden", border: "1px solid #E8EDFF", opacity: 0.55, cursor: "default", position: "relative" }}>
                    <div style={{ background: "linear-gradient(135deg, #F4F7FF, #e8edff)", height: 160, filter: "grayscale(1)" }} />
                    <div style={{ position: "absolute", top: 16, left: 16, background: "#888", color: "white", borderRadius: 50, padding: "3px 14px", fontSize: "0.78rem", fontWeight: 700 }}>בקרוב</div>
                    <div style={{ padding: "24px 20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                        <span style={{ background: "#ddd", color: "#999", borderRadius: 50, padding: "3px 12px", fontSize: "0.78rem", fontWeight: 700 }}>{a.tag}</span>
                        <span style={{ color: "#bbb", fontSize: "0.8rem" }}>{a.date}</span>
                      </div>
                      <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#aaa", lineHeight: 1.4, marginBottom: 10 }}>{a.title}</h2>
                      <p style={{ fontSize: "0.88rem", color: "#bbb", lineHeight: 1.7 }}>{a.excerpt}</p>
                    </div>
                  </div>
                ) : (
                  <Link key={a.slug} href={`/articles/${a.slug}`}
                    style={{ background: "white", borderRadius: 20, overflow: "hidden", border: "2px solid #21F0B033", display: "block", transition: "transform 0.2s, box-shadow 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(33,240,176,0.15)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                  >
                    {a.slug === "har-hakessef" ? (
                      <div style={{ background: "radial-gradient(ellipse at 50% 40%, #1535B5 0%, #060D3C 80%)", height: 160, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                        <video src="/guides/har-hakessef/video.mp4" autoPlay loop muted playsInline style={{ height: "100%", width: "100%", objectFit: "contain" }} />
                      </div>
                    ) : a.slug === "bitcoin-guide" ? (
                      <div style={{ background: "radial-gradient(ellipse at 50% 40%, #1535B5 0%, #060D3C 80%)", height: 160, overflow: "hidden", position: "relative" }}>
                        <video src="/guides/bitcoin-guide/video.mp4" autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%, #1535B5 0%, #060D3C 80%)", WebkitMaskImage: "linear-gradient(to right, black 0%, black 20%, transparent 28%, transparent 72%, black 80%, black 100%)", maskImage: "linear-gradient(to right, black 0%, black 20%, transparent 28%, transparent 72%, black 80%, black 100%)" }} />
                      </div>
                    ) : a.slug === "mashkanta-check" ? (
                      <div style={{ background: "radial-gradient(ellipse at 50% 40%, #1535B5 0%, #060D3C 80%)", height: 160, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
                        <video src="/guides/mashkanta-video.mp4" autoPlay loop muted playsInline style={{ height: "100%", width: "100%", objectFit: "contain" }} />
                        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%, #1535B5 0%, #060D3C 80%)", WebkitMaskImage: "linear-gradient(to right, black 0%, black 15%, transparent 25%, transparent 75%, black 85%, black 100%)", maskImage: "linear-gradient(to right, black 0%, black 15%, transparent 25%, transparent 75%, black 85%, black 100%)" }} />
                      </div>
                    ) : a.slug === "open-trading-account" ? (
                      <div style={{ background: "radial-gradient(ellipse at 50% 40%, #1535B5 0%, #060D3C 80%)", height: 160, overflow: "hidden", position: "relative" }}>
                        <video src="/guides/open-account-video.mp4" autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block" }} />
                        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%, #1535B5 0%, #060D3C 80%)", WebkitMaskImage: "linear-gradient(to right, black 0%, black 15%, transparent 25%, transparent 75%, black 85%, black 100%)", maskImage: "linear-gradient(to right, black 0%, black 15%, transparent 25%, transparent 75%, black 85%, black 100%)" }} />
                      </div>
                    ) : (
                      <div style={{ background: "linear-gradient(135deg, #F4F7FF, #e8edff)", height: 160 }} />
                    )}
                    <div style={{ padding: "24px 20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        {a.tag ? <span style={{ background: a.tagColor, color: a.tagColor === "#21F0B0" ? "#124AF0" : "white", borderRadius: 50, padding: "3px 12px", fontSize: "0.78rem", fontWeight: 700 }}>{a.tag}</span> : <span />}
                        {(a as { views?: number }).views ? <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#999", fontSize: "0.78rem" }}><EyeIcon />{(a as { views?: number }).views}</span> : <span style={{ color: "#999", fontSize: "0.8rem" }}>{a.date}</span>}
                      </div>
                      <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#292929", lineHeight: 1.4, marginBottom: 10 }}>{a.title}</h2>
                      <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.7 }}>{a.excerpt}</p>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
