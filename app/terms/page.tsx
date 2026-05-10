import Link from "next/link";

export const metadata = {
  title: "תקנון האתר | מצב צבירה",
  description: "תקנון האתר ותנאי השימוש של מצב צבירה.",
};

export default function TermsPage() {
  return (
    <main style={{ background: "#FFFFFF", minHeight: "100vh", paddingTop: 80 }}>
      {/* Hero */}
      <div style={{ background: "#070C24", padding: "56px 1.5rem 48px", textAlign: "center" }}>
        <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.85rem", letterSpacing: 1, marginBottom: 12 }}>
          מצב צבירה
        </p>
        <h1 style={{ color: "#FFFFFF", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, margin: 0 }}>
          תקנון האתר
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", marginTop: 12, fontSize: "0.9rem" }}>
          עודכן לאחרונה: מאי 2026
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 1.5rem 80px" }}>

        <Section title="1. כללי">
          <p>
            ברוכה הבאה לאתר מצב צבירה (<strong>matzavtzvira.co.il</strong>), המופעל על ידי רבקי וייס ("החברה").
            השימוש באתר ובשירותים המוצעים בו מהווה הסכמה מלאה לתנאי תקנון זה.
            אם אינך מסכימה לתנאים - אנא הפסיקי את השימוש באתר.
          </p>
        </Section>

        <Section title="2. השירותים">
          <p>האתר מציע:</p>
          <ul>
            <li><strong>קורס ה-MUSTריות</strong> - תוכנית דיגיטלית ללמידה עצמית בתחום ניהול כספים והשקעות.</li>
            <li><strong>ליווי VIP אישי</strong> - שירות ליווי אישי הכולל בדיקת ביטוחים, פנסיה ותיק השקעות.</li>
            <li><strong>תכנים חינמיים</strong> - מאמרים, מחשבונים ומדריכים.</li>
            <li><strong>הרצאות וסדנאות</strong> - לארגונים ולקבוצות.</li>
          </ul>
        </Section>

        <Section title="3. רכישה ותשלום">
          <ul>
            <li>המחירים המוצגים באתר כוללים מע"מ אלא אם צוין אחרת.</li>
            <li>התשלום מתבצע באמצעות ספק תשלומים מאובטח. פרטי כרטיס האשראי אינם נשמרים על שרתי החברה.</li>
            <li>הרכישה מאושרת עם קבלת אישור תשלום במייל.</li>
            <li>החברה רשאית לשנות מחירים בכל עת, ללא הודעה מוקדמת. שינוי מחיר לאחר ביצוע רכישה לא יחול על ההזמנה שבוצעה.</li>
          </ul>
        </Section>

        <Section title="4. מדיניות ביטול והחזר כספי">
          <p>
            בהתאם לחוק הגנת הצרכן, התשמ"א-1981 ותקנות הגנת הצרכן (ביטול עסקה), התשע"א-2010:
          </p>
          <ul>
            <li>
              <strong>קורס דיגיטלי:</strong> ניתן לבטל תוך 14 יום מיום הרכישה, ובלבד שלא נצפה יותר מ-25% מהתוכן. לאחר גישה מלאה לתוכן - לא יינתן החזר.
            </li>
            <li>
              <strong>ליווי VIP:</strong> ניתן לבטל תוך 14 יום מחתימת ההסכם, בניכוי עלות השירות שניתן בפועל עד למועד הביטול.
            </li>
            <li>
              <strong>הרצאות וסדנאות:</strong> ביטול עד 7 ימי עסקים לפני מועד האירוע - החזר מלא. ביטול מאוחר יותר - בהתאם לתנאים הספציפיים שנמסרו בעת ההזמנה.
            </li>
          </ul>
          <p>
            לבקשת ביטול:{" "}
            <a href="mailto:matzavtzvira@gmail.com" style={{ color: "#124AF0", fontWeight: 700 }}>
              matzavtzvira@gmail.com
            </a>
          </p>
        </Section>

        <Section title="5. אחריות לתוכן">
          <p>
            התכנים באתר - מאמרים, מדריכים, קורסים ומחשבונים - מוצגים למטרות <strong>חינוכיות ומידעיות בלבד</strong> ואינם מהווים ייעוץ פיננסי, משפטי או מס המותאם אישית לנסיבותייך.
          </p>
          <p>
            כל החלטה פיננסית שתתקבל בהסתמך על תכני האתר נעשית על אחריותך הבלעדית.
            מומלץ להיוועץ בבעל מקצוע מוסמך לפני ביצוע פעולות פיננסיות מהותיות.
          </p>
        </Section>

        <Section title="6. קניין רוחני">
          <p>
            כל התכנים באתר - טקסטים, תמונות, סרטונים, לוגו, עיצוב ושמות - הם רכושה הבלעדי של מצב צבירה ומוגנים בזכות יוצרים.
          </p>
          <p>
            <strong>אסור</strong> להעתיק, לשכפל, להפיץ, לפרסם מחדש או לעשות שימוש מסחרי בתכנים ללא אישור כתוב מהחברה מראש.
          </p>
        </Section>

        <Section title="7. הגבלת אחריות">
          <p>
            החברה אינה אחראית לנזקים ישירים, עקיפים, מקריים או תוצאתיים הנובעים משימוש באתר או בשירותים.
            האתר מסופק "כמות שהוא" (As Is) ואין ערובה לזמינות רציפה.
          </p>
        </Section>

        <Section title="8. שינויים בתקנון">
          <p>
            החברה רשאית לעדכן תקנון זה בכל עת. המשך השימוש באתר לאחר פרסום שינויים מהווה הסכמה לתנאים המעודכנים.
          </p>
        </Section>

        <Section title="9. פנייה ויצירת קשר">
          <p>
            לכל שאלה, פנייה או בקשה - ניתן לפנות אל:{" "}
            <a href="mailto:matzavtzvira@gmail.com" style={{ color: "#124AF0", fontWeight: 700 }}>
              matzavtzvira@gmail.com
            </a>
          </p>
        </Section>

        <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid #E8EDFF", display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
            ← חזרה לדף הבית
          </Link>
          <Link href="/privacy" style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
            מדיניות פרטיות
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 44 }}>
      <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#124AF0", marginBottom: 16, paddingBottom: 8, borderBottom: "2px solid #EEF2FF" }}>
        {title}
      </h2>
      <div style={{ fontSize: "1rem", color: "#333", lineHeight: 2 }}>
        {children}
      </div>
    </div>
  );
}
