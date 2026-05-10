import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

const articles: Record<string, {
  title: string;
  date: string;
  tag: string;
  tagColor: string;
  emoji: string;
  readTime: string;
  intro: string;
  sections: { heading: string; body: string }[];
}> = {
  "pension-management-fees": {
    title: "איך לבדוק את דמי הניהול בפנסיה שלך",
    date: "ינואר 2025",
    tag: "פנסיה",
    tagColor: "#124AF0",
    emoji: "",
    readTime: "7 דקות קריאה",
    intro: "רוב הנשים לא יודעות כמה הן משלמות בפנסיה - ואחרי שהן מגלות, הן לא מאמינות. דמי ניהול בפנסיה הם אחת הגניבות הכי שקטות שקיימות. לא רואים אותם בשכר, לא מרגישים אותם מדי חודש - אבל הם שם, אוכלים מהחיסכון שלך שנה אחרי שנה.",
    sections: [
      {
        heading: "מה זה בכלל דמי ניהול?",
        body: "דמי ניהול בפנסיה הם עמלה שאת משלמת לחברת הפנסיה תמורת ניהול הכסף שלך. יש שני סוגים: דמי ניהול מהפקדה (נגבים מכל סכום שמופקד - עד 6%) ודמי ניהול מצבירה (נגבים מהסכום הכולל שצברת - עד 1.05%). דמי הניהול מהצבירה הם הקריטיים יותר - כי הם גדלים ככל שהחיסכון שלך גדל.",
      },
      {
        heading: "כמה זה שווה בפועל?",
        body: "נניח שיש לך 200,000 ₪ בפנסיה: בדמי ניהול של 1.05% תשלמי 2,100 ₪ בשנה, ובדמי ניהול של 0.5% - רק 1,000 ₪. הפרש של 1,100 ₪ בשנה. על פני 30 שנה עם ריבית דריבית, ההפרש הזה יכול להגיע ל-150,000–200,000 ₪.",
      },
      {
        heading: "איך בודקים?",
        body: "3 צעדים: (1) כנסי לאתר 'הפנסיה שלי' (pensiya.mof.gov.il) - כל הפנסיות שלך במקום אחד. (2) חפשי את הכרטיסייה 'דמי ניהול' - תראי בדיוק כמה את משלמת. (3) השווי לממוצע בשוק - הממוצע עומד על כ-0.7% מהצבירה.",
      },
      {
        heading: "איך מורידים?",
        body: "הסוד הוא פשוט לבקש. חברות הפנסיה לא מפרסמות את זה, אבל כמעט כל אחת מוכנה להוריד דמי ניהול למי שמבקש. שלחי מייל או התקשרי ואמרי: 'אני רוצה לבדוק אפשרות להורדת דמי ניהול.' ברוב המקרים יציעו הפחתה מיידית.",
      },
      {
        heading: "טיפ אחרון",
        body: "אל תסתפקי בהורדה חד פעמית. כל שנה-שנתיים, בדקי שוב. השוק משתנה, הכוח המיקוח שלך גדל ככל שהצבירה שלך גדלה. זה אולי המהלך הפיננסי הכי פשוט שיש - ויכול לשנות את גודל הפנסיה שלך ב-6 ספרות.",
      },
    ],
  },
  "har-hakessef": {
    title: "הר הכסף - כך תמצאי כסף שלא ידעת שיש לך",
    date: "פברואר 2025",
    tag: "חדש",
    tagColor: "#FA5C5C",
    emoji: "",
    readTime: "6 דקות קריאה",
    intro: "מיליארדים ממתינים לבעליהם. כל מה שצריך זה לדעת לחפש. 'הר הכסף' הוא מאגר ממשלתי שמכיל כספים שאנשים שכחו - קרנות פנסיה ישנות, ביטוחי חיים, חשבונות בנק לא פעילים, וכסף מגופים פיננסיים שונים.",
    sections: [
      {
        heading: "כמה כסף שם?",
        body: "נכון ל-2024, מאגר 'הר הכסף' מכיל מעל 8 מיליארד ₪ שמחכים לבעליהם. מי שמחפש - מוצא. מירי שיינר, אחת הלקוחות שלי, מצאה 67,000 ₪ בקרנות שלא ידעה שקיימות - שעה אחת של עבודה.",
      },
      {
        heading: "מי מחזיק את הכסף?",
        body: "קרנות פנסיה ממקומות עבודה ישנים, ביטוחי מנהלים מעסקים קודמים, פוליסות ביטוח חיים ישנות, חשבונות בנק לא פעילים, קופות גמל ישנות, פיצויי פיטורין שלא נמשכו.",
      },
      {
        heading: "איך מחפשים?",
        body: "שלב 1: כנסי לאתר הר הכסף (hr-hakesef.gov.il). הכניסי תעודת זהות - תקבלי רשימה של כל הנכסים הפיננסיים שלא נדרשו. שלב 2: פני ישירות לגופי הפנסיה הגדולים - מנורה, הפניקס, הראל, מגדל ומיטב דש. שלב 3: שלחי פניה לכל בנק שעבדת איתו.",
      },
      {
        heading: "מה עושים אחרי שמוצאים?",
        body: "ממלאים טפסי משיכה או העברה. בדרך כלל כדאי לא למשוך - אלא להעביר לחשבון הפנסיה הנוכחי שלך. כך הכסף ממשיך לצמוח ונשמרים הטבות מס. החיפוש לוקח שעה אחת. הביורוקרטיה - 2-6 שבועות. השכר? יכול להיות עשרות אלפי שקלים.",
      },
    ],
  },
  "savings-for-kids": {
    title: "חיסכון לכל ילד - מ-20,000 ל-70,000 ₪",
    date: "מרץ 2025",
    tag: "ילדים",
    tagColor: "#21F0B0",
    emoji: "",
    readTime: "5 דקות קריאה",
    intro: "החיסכון שהממשלה פותחת לכל ילד יכול להפוך להון אמיתי - אם בוחרים נכון. מרגע לידתו של כל ילד בישראל, המדינה מפקידה 60 ₪ בחודש בחשבון חיסכון על שמו. עד גיל 18 - זה 12,960 ₪ בלי לעשות כלום. אבל עם בחירה נכונה, זה יכול להגיע ל-70,000 ₪.",
    sections: [
      {
        heading: "שני מסלולים - הבדל של 50,000 ₪",
        body: "ברירת המחדל: הכסף מנוהל על ידי ביטוח לאומי בתשואה נמוכה של כ-2.5% בשנה. תוצאה: כ-20,000 ₪ בגיל 18. המסלול הטוב יותר: העברה לקרן השתלמות או לפנסיה בניהול אישי, עם מסלול מנייתי שמניב כ-7-8% בשנה. תוצאה: 60,000-70,000 ₪ בגיל 18.",
      },
      {
        heading: "איך עושים את זה?",
        body: "פונים לאחת מחברות הפנסיה הגדולות (מנורה, הראל, הפניקס) ומבקשים פתיחת חיסכון לכל ילד במסלול מנייתי. ממלאים טופס, מצרפים תעודת זהות ותעודת לידה של הילד - וזהו. התהליך לוקח פחות משעה.",
      },
      {
        heading: "מה המסלול הנכון?",
        body: "לילד מתחת לגיל 10 - מסלול מנייתי מלא (100% מניות). יש זמן להתאושש מירידות שוק. לילד מעל גיל 14 - מסלול מעורב עם יותר אגרות חוב. ככלל: ככל שיש יותר זמן - מסלול יותר אגרסיבי.",
      },
      {
        heading: "נקודה חשובה",
        body: "הכסף הזה שייך לילד בגיל 18. אם לא רוצים שהוא ימשוך אותו מיד, ניתן לעזור לו להבין את ערך ההמשכה. חיסכון של 70,000 ₪ שממשיך להיות מושקע עוד 10 שנים - יגיע ל-130,000-150,000 ₪.",
      },
    ],
  },
  "open-trading-account": {
    title: "פתיחת חשבון מסחר - מדריך שלב אחרי שלב",
    date: "אפריל 2025",
    tag: "השקעות",
    tagColor: "#124AF0",
    emoji: "",
    readTime: "8 דקות קריאה",
    intro: "פתיחת חשבון מסחר נשמעת מסובכת - אבל זה תהליך של פחות מ-20 דקות. הנה כל מה שצריך לדעת לפני שמתחילים.",
    sections: [
      {
        heading: "מה זה חשבון מסחר?",
        body: "חשבון מסחר הוא חשבון שדרכו ניתן לקנות ולמכור ניירות ערך - מניות, אגרות חוב, קרנות סל (ETF) ועוד. בניגוד לפנסיה שמנוהלת בשבילך, פה את שולטת.",
      },
      {
        heading: "איפה פותחים?",
        body: "שתי אפשרויות עיקריות: (1) דרך הבנק שלך - פשוט יותר, אך עמלות גבוהות יותר. (2) דרך בית השקעות (מיטב טריידר, IBI, אקסלנס) - עמלות נמוכות יותר, ממשק מקצועי יותר. למתחילות, מומלץ להתחיל דרך הבנק - ואז לעבור לבית השקעות כשמרגישים נוח.",
      },
      {
        heading: "מה צריך לפתיחה?",
        body: "תעודת זהות, ספח תעודת זהות, מספר חשבון בנק, כתובת מייל ומספר טלפון. זהו. לא צריך ניסיון, לא צריך סכום מינימלי (ברוב הבנקים), לא צריך אישורים מיוחדים.",
      },
      {
        heading: "שלב אחרי שלב",
        body: "שלב 1: כנסי לאתר הבנק/בית ההשקעות → שלב 2: חפשי 'פתיחת חשבון מסחר בניירות ערך' → שלב 3: מלאי את הפרטים ← שלב 4: העלי תמונות מסמכים → שלב 5: חכי 1-3 ימי עסקים לאישור. זהו. גמרתי.",
      },
      {
        heading: "מה עושים אחרי?",
        body: "לפני שקונים כלום - לומדים. הטעות הנפוצה היא לפתוח חשבון ולקנות משהו אקראי. במקום זה, הכירי קרנות סל על מדדים (כמו ת'א 125 או S&P 500). הן פשוטות, מגוונות, וזולות.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return { title: "מאמר לא נמצא" };
  return { title: `${article.title} | מצב צבירה`, description: article.intro };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: 160 }}>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg, #124AF0, #0a38c4)", padding: "72px 1.5rem 60px", textAlign: "center" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: 20 }}>{article.emoji}</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <span style={{
              background: article.tagColor,
              color: article.tagColor === "#21F0B0" ? "#124AF0" : "white",
              borderRadius: 50,
              padding: "4px 14px",
              fontSize: "0.82rem",
              fontWeight: 700,
            }}>{article.tag}</span>
            <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", display: "flex", alignItems: "center" }}>{article.date}</span>
            <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", display: "flex", alignItems: "center" }}>• {article.readTime}</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: "white", fontWeight: 700, lineHeight: 1.3, maxWidth: 700, margin: "0 auto" }}>
            {article.title}
          </h1>
        </section>

        {/* Article body */}
        <section style={{ background: "#F4F7FF", padding: "64px 1.5rem" }}>
          <div style={{ maxWidth: 740, margin: "0 auto" }}>
            {/* Intro card */}
            <div style={{ background: "white", borderRadius: 20, padding: "32px 36px", border: "1px solid #E8EDFF", marginBottom: 32 }}>
              <p style={{ fontSize: "1.1rem", color: "#292929", lineHeight: 2.0, fontWeight: 500, margin: 0 }}>{article.intro}</p>
            </div>

            {/* Sections */}
            {article.sections.map((s, i) => (
              <div key={i} style={{ background: "white", borderRadius: 20, padding: "32px 36px", border: "1px solid #E8EDFF", marginBottom: 20 }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#124AF0", marginBottom: 16, lineHeight: 1.3 }}>{s.heading}</h2>
                <p style={{ fontSize: "1rem", color: "#444", lineHeight: 2.0, margin: 0 }}>{s.body}</p>
              </div>
            ))}

            {/* CTA */}
            <div style={{ background: "linear-gradient(135deg, #124AF0, #0a38c4)", borderRadius: 20, padding: "40px 36px", textAlign: "center", marginTop: 12 }}>
              <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", marginBottom: 12 }}>רוצה ללמוד יותר?</p>
              <h3 style={{ color: "white", fontSize: "1.4rem", fontWeight: 700, marginBottom: 20 }}>
                הצטרפי לתוכנית MUSTרית
              </h3>
              <Link
                href="/course"
                style={{
                  display: "inline-block",
                  background: "#21F0B0",
                  color: "#124AF0",
                  borderRadius: 50,
                  padding: "14px 36px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  transition: "transform 0.15s",
                }}
              >
                לפרטי הקורס ←
              </Link>
            </div>

            {/* Back link */}
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <Link href="/articles" style={{ color: "#124AF0", fontWeight: 600, fontSize: "0.95rem", borderBottom: "2px solid #21F0B0", paddingBottom: 2 }}>
                ← לכל המאמרים
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
