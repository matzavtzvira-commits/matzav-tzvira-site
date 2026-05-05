import Link from "next/link";

export const metadata = {
  title: "הצהרת נגישות | מצב צבירה",
  description: "הצהרת הנגישות של אתר מצב צבירה בהתאם לתקן ישראלי 5568.",
};

export default function AccessibilityPage() {
  return (
    <main id="main-content" tabIndex={-1} style={{ background: "#FFFFFF", minHeight: "100vh", paddingTop: 80 }}>
      {/* Hero */}
      <div style={{ background: "#124AF0", padding: "56px 1.5rem 48px", textAlign: "center" }}>
        <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.85rem", letterSpacing: 1, marginBottom: 12 }}>
          מצב צבירה
        </p>
        <h1 style={{ color: "#FFFFFF", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, margin: 0 }}>
          הצהרת נגישות
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", marginTop: 12, fontSize: "0.9rem" }}>
          עודכן לאחרונה: מאי 2026
        </p>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "64px 1.5rem 80px" }}>

        <Section title="מחויבות לנגישות">
          <p>
            מצב צבירה שואפת להנגיש את האתר לכלל המשתמשות, לרבות אנשים עם מוגבלויות.
            אנו פועלות בהתאם לתקן ישראלי 5568 הנסמך על הנחיות{" "}
            <strong>WCAG 2.1 רמה AA</strong>.
          </p>
        </Section>

        <Section title="מה כבר נגיש באתר">
          <ul>
            <li>האתר מוגדר בשפה עברית (<code>lang=&quot;he&quot;</code>) וכיוון ימין-לשמאל (<code>dir=&quot;rtl&quot;</code>).</li>
            <li>ניתן לדלג לתוכן הראשי באמצעות מקש <strong>Tab</strong> בכניסה לדף (קישור "דלג לתוכן הראשי").</li>
            <li>כל הכפתורים הפעילים כוללים תיאור טקסטואלי (<code>aria-label</code>).</li>
            <li>שדות הטופס מקושרים לתוויות נגישות (<code>&lt;label&gt;</code>).</li>
            <li>תמונות מלוות בתיאור חלופי (<code>alt</code>).</li>
            <li>ניווט מקלדת מלא — כל האלמנטים הלחיצים נגישים דרך <strong>Tab</strong>.</li>
            <li>פוקוס ויזואלי ברור על כל האלמנטים הנגישים.</li>
            <li>אנימציות מבוטלות אוטומטית עבור משתמשים שהגדירו "הפחת תנועה" במערכת ההפעלה.</li>
            <li>היררכיית כותרות תקינה (H1 → H2 → H3).</li>
            <li>ניגודיות צבע עומדת בדרישות WCAG AA בחלקים המרכזיים.</li>
          </ul>
        </Section>

        <Section title="מה עדיין בשיפור">
          <p>
            אנו עובדות על שיפור מתמיד. ידוע לנו על האתגרים הבאים:
          </p>
          <ul>
            <li>חלק מהסרטונים טרם כוללים כתוביות — אנו מתכננות להוסיפן.</li>
            <li>ייתכנו בעיות ניגודיות צבע בטקסטים משניים מסוימים.</li>
          </ul>
        </Section>

        <Section title="כיצד ניתן לנווט באתר עם מקלדת">
          <ul>
            <li><strong>Tab</strong> — מעבר לאלמנט הבא</li>
            <li><strong>Shift + Tab</strong> — מעבר לאלמנט הקודם</li>
            <li><strong>Enter / רווח</strong> — הפעלת כפתורים וקישורים</li>
            <li><strong>Esc</strong> — סגירת תפריטים קופצים</li>
          </ul>
        </Section>

        <Section title="קוראי מסך מומלצים">
          <ul>
            <li><strong>NVDA</strong> — חינמי, Windows</li>
            <li><strong>VoiceOver</strong> — מובנה ב-Mac ו-iPhone</li>
            <li><strong>TalkBack</strong> — מובנה ב-Android</li>
            <li><strong>JAWS</strong> — Windows (בתשלום)</li>
          </ul>
        </Section>

        <Section title="פנייה בנושא נגישות">
          <p>
            נתקלת בבעיית נגישות? נשמח לשמוע ולתקן.
          </p>
          <p>
            <strong>רכזת נגישות:</strong> רבקי וייס
            <br />
            <strong>מייל:</strong>{" "}
            <a href="mailto:matzavtzvira@gmail.com" style={{ color: "#124AF0", fontWeight: 700 }}>
              matzavtzvira@gmail.com
            </a>
            <br />
            <strong>טלפון:</strong>{" "}
            <a href="tel:0527065653" style={{ color: "#124AF0", fontWeight: 700, direction: "ltr", display: "inline-block" }}>
              052-706-5653
            </a>
          </p>
          <p style={{ marginTop: 16 }}>
            נשתדל לטפל בפניות נגישות תוך <strong>7 ימי עסקים</strong>.
          </p>
        </Section>

        <div style={{ marginTop: 56, paddingTop: 32, borderTop: "1px solid #E8EDFF", display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
            ← חזרה לדף הבית
          </Link>
          <Link href="/privacy" style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none" }}>
            מדיניות פרטיות
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
