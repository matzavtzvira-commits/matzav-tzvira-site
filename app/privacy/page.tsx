import Link from "next/link";

export const metadata = {
  title: "מדיניות פרטיות | מצב צבירה",
  description: "מדיניות הפרטיות של מצב צבירה — כיצד אנו אוספים ומשתמשים במידע שלך.",
};

export default function PrivacyPage() {
  return (
    <main style={{ background: "#FFFFFF", minHeight: "100vh", paddingTop: 80 }}>
      {/* Hero */}
      <div style={{ background: "#124AF0", padding: "56px 1.5rem 48px", textAlign: "center" }}>
        <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.85rem", letterSpacing: 1, marginBottom: 12 }}>
          מצב צבירה
        </p>
        <h1 style={{ color: "#FFFFFF", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, margin: 0 }}>
          מדיניות פרטיות
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", marginTop: 12, fontSize: "0.9rem" }}>
          עודכן לאחרונה: מאי 2026
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 1.5rem 80px" }}>

        <Section title="1. כללי">
          <p>
            מצב צבירה, בבעלות רבקי וייס ("החברה", "אנחנו"), מכבדת את פרטיותך ומחויבת להגן על המידע האישי שאת מוסרת לנו בעת השימוש באתר{" "}
            <strong>matzavtzvira.co.il</strong> ובשירותים השונים המוצעים בו.
          </p>
          <p>
            מדיניות פרטיות זו מסבירה אילו נתונים נאספים, כיצד הם משמשים ומה זכויותייך בנוגע אליהם.
            השימוש באתר מהווה הסכמה למדיניות זו.
          </p>
        </Section>

        <Section title="2. איזה מידע אנחנו אוספים">
          <ul>
            <li><strong>פרטי הרשמה:</strong> שם ושדה מייל בעת הרשמה לניוזלטר.</li>
            <li><strong>פרטי יצירת קשר:</strong> שם, מייל וטלפון בעת מילוי טופס ליצירת קשר או בקשת ליווי VIP.</li>
            <li><strong>פרטי רכישה:</strong> בעת רכישת קורס או שירות — פרטי תשלום מועברים ישירות לספק התשלומים ואינם נשמרים אצלנו.</li>
            <li><strong>נתוני גלישה:</strong> כתובת IP, סוג דפדפן, דפים שנצפו — באמצעות כלי ניתוח אנונימיים (Google Analytics).</li>
          </ul>
        </Section>

        <Section title="3. למה אנחנו משתמשים במידע">
          <ul>
            <li>שליחת ניוזלטר דו-שבועי ועדכונים רלוונטיים.</li>
            <li>מענה לפניות ובקשות ליווי.</li>
            <li>שיפור חוויית השימוש באתר.</li>
            <li>עמידה בחובות חוקיות.</li>
          </ul>
          <p>
            <strong>לא נמכור ולא נשתף את המידע שלך עם צדדים שלישיים לצרכי שיווק.</strong>
          </p>
        </Section>

        <Section title="4. צדדים שלישיים">
          <p>אנחנו עובדים עם ספקי שירות חיצוניים לצרכים מוגדרים:</p>
          <ul>
            <li>
              <strong>רב מסר</strong> — פלטפורמת דיוור לשליחת ניוזלטר. המידע שלך מועבר אליהם לצורך זה בלבד, בהתאם{" "}
              <a href="https://www.ravmesser.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#124AF0" }}>למדיניות הפרטיות שלהם</a>.
            </li>
            <li>
              <strong>WhatsApp / Meta</strong> — קהילת הווטסאפ פועלת תחת תנאי השימוש של WhatsApp. ההצטרפות לקבוצה היא רשות ואינה חלק מהרישום לאתר.
            </li>
            <li>
              <strong>Google Analytics</strong> — נתוני גלישה אנונימיים לניתוח תנועה באתר.
            </li>
          </ul>
        </Section>

        <Section title="5. עוגיות (Cookies)">
          <p>
            האתר משתמש בעוגיות טכניות ואנליטיות. ניתן לנטרל עוגיות דרך הגדרות הדפדפן, אך חלק מהתכונות עלולות שלא לפעול כראוי.
          </p>
        </Section>

        <Section title="6. אחסון ואבטחת מידע">
          <p>
            המידע נשמר על שרתים מאובטחים. אנחנו נוקטים אמצעי אבטחה מקובלים אך לא יכולים להבטיח אבטחה מוחלטת.
            מומלץ לא לשתף פרטי סיסמה עם גורם כלשהו.
          </p>
        </Section>

        <Section title="7. זכויותייך">
          <p>בהתאם לחוק הגנת הפרטיות, התשמ"א-1981, את זכאית ל:</p>
          <ul>
            <li>קבלת מידע על הנתונים שנשמרו אצלנו.</li>
            <li>תיקון מידע שגוי.</li>
            <li>מחיקת המידע שלך ("הזכות להישכח").</li>
            <li>ביטול הסכמה לקבלת דיוור בכל עת — דרך קישור ההסרה בכל ניוזלטר או בפנייה ישירה.</li>
          </ul>
          <p>
            לפנייה:{" "}
            <a href="mailto:matzavtzvira@gmail.com" style={{ color: "#124AF0", fontWeight: 700 }}>
              matzavtzvira@gmail.com
            </a>
          </p>
        </Section>

        <Section title="8. שינויים במדיניות">
          <p>
            אנחנו שומרים לעצמנו את הזכות לעדכן מדיניות זו מעת לעת. שינויים מהותיים יפורסמו באתר ויישלחו לרשימת התפוצה.
          </p>
        </Section>

        <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid #E8EDFF", display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
            ← חזרה לדף הבית
          </Link>
          <Link href="/terms" style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
            תקנון האתר
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
