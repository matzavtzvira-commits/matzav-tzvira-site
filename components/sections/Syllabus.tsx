"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const chapters = [
  {
    num: "א",
    title: "בסיס חשיבה",
    topics: [
      "ההבדלים בפנסיה - שלוש משפחות",
      "ההבדל בין כסף להון",
      "נכסים מול הוצאות - איך להפסיק לעבוד רק בשביל לסגור מינוס",
      "מה זה בעצם שוק ההון (ולמה את כבר חלק ממנו)",
      "מצליחנית עצמאית מול שכירה פשוטה - מי באמת מנצחת במבחן התוצאה",
      "מושגים בסיסיים שכל אחת חייבת להכיר",
    ],
  },
  {
    num: "ב",
    title: "שוק ההון",
    topics: [
      "הפלא השמיני בתבל - אפקט ריבית דריבית",
      "השיטה שמנצחת את הכלכלנים הבכירים - בפשטות",
      "המדדים שמובילים את העולם",
      "ההבדלים בין מדדים - ולמה זה משנה לך",
      "המדד הכי מוצלח בעולם - ולמה דווקא הוא",
      "מחלקת צוברת - להבין מה באמת קורה שם",
    ],
    bonus: "🟢 בונוס - מדריך מסלולים כשרים: כל האפשרויות להשקיע בהתאם להלכה, בבהירות מלאה",
  },
  {
    num: "ג",
    title: "כלי השקעה מעשיים",
    topics: [
      "שלוש השקעות קצרות טווח שחייבים להכיר",
      "שיטת DCA - איך להשקיע נכון לאורך זמן",
      "חיסכון לכל ילד - איך לוודא שהוא באמת עובד",
      "פנסיה - להבין, לבחור ולשפר",
      "קרן השתלמות - המתנה הכי יקרה",
      "קרן השתלמות למורות - מה לא מספרים לכן",
      "קופות גמל - להבין מה נכון עבורך",
      "מסחר עצמאי - צעד ראשון בטוח בעולם ההשקעות",
      "הר הכסף - איך למצוא כספים רדומים בקלות",
      "הרווח הבטוח - הסוד של דמי הניהול",
    ],
  },
  {
    num: "ד",
    title: "לבנות את התיק שלך",
    topics: [
      "בניית תיק מותאם אישית - בקלות ובביטחון",
      "מס הכנסה - מה מותר, מה כדאי, ומה אפשר לנצל לטובתך",
      "סיבולת לסיכון - איך לדעת מה מתאים לך",
      "כרית ביטחון - כי שקט כלכלי מתחיל כאן",
      "פירמידת ההשקעות המומלצת",
    ],
  },
  {
    num: "ה",
    title: "מתקדמות",
    topics: [
      "השפעות המט\"ח - איך זה משפיע על ההשקעות שלך",
      "ביטוח בריאות - מה באמת חשוב לדעת",
      "ההשוואה בין שוק ההון לנדל\"ן - מה באמת עדיף",
      "סוגי סוחרים - ואיך לבחור מה נכון לך",
      "תפיסות העולם של המיליארדרים - מה הם יודעים שאנחנו שוכחים",
    ],
  },
];

export default function Syllabus() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ background: "white", padding: "48px 1.5rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.9rem", letterSpacing: 1, marginBottom: 8, background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50 }}>
            32 שיעורים
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#124AF0", marginTop: 12, marginBottom: 12 }}>
            מה תדעי שלא ידעת לפני?
          </h2>
          <p style={{ color: "#555", fontSize: "1rem" }}>5 פרקים. מהבסיס עד המתקדם. בלי לדלג על כלום.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {chapters.map((ch, i) => (
            <div key={i} style={{ border: open === i ? "2px solid #124AF0" : "2px solid #E8EDFF", borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", padding: "20px 24px", background: open === i ? "#F4F7FF" : "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, textAlign: "right", transition: "background 0.2s" }}
              >
                <div style={{ width: 64, height: 64, flexShrink: 0, borderRadius: "50%", overflow: "hidden", filter: "contrast(1.15) saturate(1.3)" }}>
                  <video autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
                    <source src="/chapter-icon.mp4" type="video/mp4" />
                  </video>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.78rem", color: "#124AF0", fontWeight: 700, marginBottom: 2 }}>פרק {i + 1}</div>
                  <div style={{ fontWeight: 700, fontSize: "1.02rem", color: "#292929" }}>{ch.title}</div>
                </div>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ color: "#124AF0", fontSize: "1.2rem", originX: "50%", originY: "50%" }}
                >▾</motion.div>
              </button>

              {open === i && (
                <div style={{ padding: "0 24px 24px", background: "#F4F7FF" }}>
                  {ch.bonus && (
                    <div style={{ background: "#E8EDFF", border: "1px solid #21F0B0", borderRadius: 10, padding: "10px 16px", marginBottom: 16, marginTop: 4, fontSize: "0.88rem", color: "#124AF0", fontWeight: 600 }}>
                      {ch.bonus}
                    </div>
                  )}
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {ch.topics.map((topic, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.95rem", color: "#292929" }}>
                        <span style={{ color: "#21F0B0", fontWeight: 700, marginTop: 3, fontSize: "0.7rem", flexShrink: 0 }}>■</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
