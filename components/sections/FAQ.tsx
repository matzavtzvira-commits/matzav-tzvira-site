"use client";
import { useState } from "react";

const faqs = [
  {
    q: "בסוף התוכנית - מה יש לי שלא היה לפני?",
    a: "אסטרטגיית השקעות מותאמת לך אישית. לא כללית - שלך. תדעי בדיוק מה בתיק שלך, מה לשנות ומה לעשות מחר בבוקר. כי בשביל להשקיע בצורה פשוטה, יעילה ורווחית - צריך לקחת את המושכות בידיים שלך. ולזה בדיוק התוכנית הזו בנויה. ביטחון מלא בתיק שלך.",
  },
  {
    q: "אני לא מבינה כלום בכסף - זה בשבילי?",
    a: "בדיוק בשבילך. התוכנית נבנתה למי שמתחילה מאפס. אם את יודעת לקנות בסופר - את יכולה לעשות את זה.",
  },
  {
    q: "כמה זמן זה יקח לי?",
    a: "השיעורים קצרים וממוקדים. אפשר ללמוד בקצב שלך, בכל זמן פנוי - גם 20 דקות ביום מספיקות. הגישה פתוחה שנה שלמה.",
  },
  {
    q: "אני עובדת כל היום - איך אמצא לזה זמן?",
    a: "שבוע של השקעה - תמורת עשרות שנות שקט. הגישה פתוחה שנה שלמה, אין לחץ ואין מועד אחרון.",
  },
  {
    q: "אני חוששת שזה מסובך מדי.",
    a: '״ממצב שהייתי בטוחה שזה לא בשבילי - מצאתי את עצמי פותחת חשבון ומתחילה לפעול.״ - שושי, קהילת המאסטריות.',
  },
  {
    q: "יש לי כבר סוכן שדואג להכל.",
    a: "נהדר. אבל - האם את יודעת כמה הוא מרוויח עלייך? אחרי התוכנית תדעי לשאול את השאלות הנכונות. ותופתעי מהתשובות.",
  },
  {
    q: "המחשב שלי חסום - אני מפחדת שלא יפתח את הקורס.",
    a: "חשבנו על הכל. ב\"ה כל ההכשרים פתחו את הקורס - כל בעיה שלא תהיה, אנחנו פה ויש פתרון לכל.",
  },
  {
    q: "מה אם לא התאים לי?",
    a: "14 יום אחריות מלאה. לא מרוצה - מחזירים הכל בלי שאלות.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ background: "#F4F7FF", padding: "48px 1.5rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.9rem", letterSpacing: 1, marginBottom: 8, background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50 }}>
            שאלות שבטח עולות לך
          </p>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", color: "#124AF0", marginTop: 12, lineHeight: 1.4 }}>
            מתלבטת? זה טבעי.
            <br />
            <span style={{ fontWeight: 400, color: "#555", fontSize: "0.82em" }}>חשבנו על כל שאלה שיכולה לעלות.</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{ background: "white", borderRadius: 16, border: open === i ? "2px solid #124AF0" : "2px solid #E8EDFF", overflow: "hidden", transition: "border-color 0.2s" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "right" }}
              >
                <span style={{ fontWeight: 700, color: "#292929", fontSize: "1rem" }}>{faq.q}</span>
                <span style={{ color: "#124AF0", fontSize: "1.2rem", transform: open === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0 }}>▾</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 24px 20px", borderTop: "1px solid #E8EDFF", paddingTop: 16 }}>
                  <p style={{ color: "#555", lineHeight: 1.9, fontSize: "0.97rem" }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div style={{ textAlign: "center", marginTop: 56, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#124AF0", marginBottom: 8 }}>
            השאלה היחידה שנשארת:
            <br />
            <strong>עד מתי את מחכה?</strong>
          </h3>
          <p style={{ color: "#555", fontSize: "1rem", marginBottom: 20 }}>
            כל שנה שעוברת בלי הידע הזה <span style={{ fontSize: "0.75em" }}>-</span> זה כסף שנשאר על הרצפה.
            <br />
            329 נשים כבר קמו ואספו אותו.
          </p>
          <a
            href="/course"
            style={{ position: "relative", display: "inline-block", textDecoration: "none", transition: "transform 0.2s", maxWidth: "100%" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-green.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 43%" }} />
            <span style={{ position: "relative", zIndex: 1, color: "#070C24", padding: "18px 52px", fontWeight: 800, fontSize: "1.1rem", display: "block" }}>
              אני מצטרפת לתוכנית ←
            </span>
          </a>
          <p style={{ color: "#555", fontSize: "0.88rem" }}>תשלום מאובטח | אחריות 14 יום <span style={{ fontSize: "0.75em" }}>-</span> החזר מלא ללא שאלות</p>
        </div>
      </div>
    </section>
  );
}
