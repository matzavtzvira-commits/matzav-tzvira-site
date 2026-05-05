"use client";
import { motion } from "framer-motion";

const bonuses = [
  { title: 'מדריך "הר הכסף"', desc: "שלב אחר שלב לאיתור כספים רדומים שאת לא יודעת שיש לך" },
  { title: 'מדריך "חיסכון לכל ילד"', desc: "איך למקסם את התשואה על כל ילד — כפול מספר הילדים שלך" },
  { title: 'מדריך "קרן כספית וקרנות סל"', desc: "להבין ולהשתמש נכון — בלי לאבד דרך" },
  { title: "מדריך מסלולים כשרים", desc: "כל האפשרויות להשקיע בהתאם להלכה, בבהירות מלאה" },
  { title: "מדריך הלכתי", desc: "השקעות וניהול כסף על פי ההלכה" },
  { title: "שאלון התאמת תיק השקעות אישי", desc: "כדי שתדעי בדיוק מה מתאים לך — לא לאף אחד אחר" },
  { title: "שאלון למדידת סיבולת תנודתיות", desc: "כי לא כולן אותו דבר, ולא צריך להיות" },
  { title: "מדריך פתיחת חשבון מסחר", desc: "יד ביד, בלי לפחד, בלי לטעות" },
  { title: "דאשבורד דיגיטלי מבוסס בינה מלאכותית", desc: "שמבטיח שהידע הופך לפעולה אמיתית — לא לנייר שנשכח" },
  { title: "מדריך + מחשבון AI לחתונות ילדים", desc: "כיצד להגיע ליום הגדול בשלווה ובלי הלוואות" },
];

export default function Bonus() {
  return (
    <section style={{ background: "#FFFFFF", padding: "48px 1.5rem" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.9rem", letterSpacing: 1, marginBottom: 8, background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50 }}>
            בונוסים בלעדיים
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#124AF0", marginTop: 12, marginBottom: 12 }}>
            וזה עוד לפני שדיברנו על הבונוסים.
          </h2>
          <p style={{ color: "#555", fontSize: "1.05rem" }}>
            כל אלה כלולים בתוכנית <span style={{ fontSize: "0.75em" }}>—</span> בלי תוספת מחיר.
          </p>
        </div>

        <div className="bonus-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {bonuses.map((b, i) => (
            <div
              key={i}
              style={{ background: "#FFFFFF", borderRadius: 16, padding: "20px", border: "1px solid #D0DCFF", display: "flex", gap: 14, alignItems: "flex-start", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(18,74,240,0.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
            >
              <motion.span
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: i * 0.06 }}
                style={{ color: "#21F0B0", fontWeight: 900, fontSize: "1.6rem", flexShrink: 0, marginTop: 2, display: "inline-block", animation: "checkPulse 2s ease-in-out infinite", filter: "drop-shadow(0 0 8px rgba(33,240,176,0.8))" }}
              >✔</motion.span>
              <div>
                <div style={{ fontWeight: 700, color: "#124AF0", fontSize: "0.95rem", marginBottom: 4 }}>{b.title}</div>
                <div style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.6 }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes checkPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.25); }
        }
        @media (max-width: 640px) {
          .bonus-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
