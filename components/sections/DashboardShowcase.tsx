"use client";
import { motion } from "framer-motion";

const dashboards = [
  {
    title: "מחשבון ריבית דריבית",
    desc: "ראי איך 500 ₪ בחודש הופכים למיליון שקל - בזמן ובתשואה שאת בוחרת",
    tag: "הכי פופולרי",
    color: "#21F0B0",
  },
  {
    title: "השוואת דמי ניהול",
    desc: "הכניסי 2 הצעות מסוכן - המחשבון אומר לך מיד מי עדיף בשבילך",
    tag: null,
    color: "#124AF0",
  },
  {
    title: "צבירה מול הפקדה",
    desc: "כמה יש לך בצבירה קובע הכל. המחשבון מראה איפה תחסכי יותר",
    tag: null,
    color: "#FA5C5C",
  },
  {
    title: "מחשבון אינפלציה",
    desc: "כמה הכסף שלך שווה באמת? ראי את הפגיעה השקטה שעובדת עלייך כל שנה",
    tag: null,
    color: "#124AF0",
  },
  {
    title: "סדר בתיק הפיננסי",
    desc: "כל החסכונות, הביטוחים, הפנסיה - בתמונה אחת ברורה",
    tag: null,
    color: "#21F0B0",
  },
  {
    title: "מחשבון חתונת ילדים",
    desc: "כמה בדיוק לחסוך כל חודש כדי להגיע לחתונה של הילדים - שמחה בלב שמח ובשלווה",
    tag: "חדש",
    color: "#FA5C5C",
  },
];

function DashIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="2" y="14" width="5" height="12" rx="1.5" fill={color} opacity="0.9" />
      <rect x="10" y="8" width="5" height="18" rx="1.5" fill={color} opacity="0.7" />
      <rect x="18" y="3" width="5" height="23" rx="1.5" fill={color} opacity="0.5" />
      <path d="M3 13 L12 7 L20 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function DashboardShowcase() {
  return (
    <section className="dash-section" style={{ background: "#F4F7FF", padding: "72px 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.9rem", letterSpacing: 1, marginBottom: 8, background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50 }}>
            14 דשבורדים דיגיטליים
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#124AF0", marginTop: 12, marginBottom: 12 }}>
            לא רק ידע - כלים שעובדים בשבילך
          </h2>
          <p style={{ color: "#555", fontSize: "1.05rem", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            מבוססי בינה מלאכותית. מחשבים לך הכל בזמן אמת.
            <br />
            הידע הופך לפעולה - לא לנייר שנשכח במגירה.
          </p>
        </motion.div>

        <div className="dash-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
          {dashboards.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(18,74,240,0.12)", transition: { duration: 0.18 } }}
              style={{
                background: "#FFFFFF",
                borderRadius: 16,
                padding: "24px 24px 20px",
                border: "1px solid #E8EDFF",
                position: "relative",
                cursor: "default",
                ...(dashboards.length % 3 !== 0 && i === dashboards.length - 1
                  ? { gridColumn: "2 / 3" }
                  : {}),
              }}
            >
              {d.tag && (
                <div style={{
                  position: "absolute", top: -11, right: 20,
                  background: "#21F0B0", color: "#070C24",
                  fontSize: "0.75rem", fontWeight: 800,
                  padding: "3px 12px", borderRadius: 50,
                }}>
                  {d.tag}
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: "#F4F7FF",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <DashIcon color={d.color} />
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#070C24", margin: 0 }}>{d.title}</h3>
              </div>

              <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.7, margin: 0 }}>{d.desc}</p>

              <div style={{ marginTop: 14, height: 3, borderRadius: 2, background: `linear-gradient(to left, ${d.color}33, ${d.color})` }} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: "center" }}
        >
          <p style={{ fontSize: "0.9rem", color: "#888", fontStyle: "italic" }}>
            ועוד 8 דשבורדים נוספים - אחד לכמעט כל נושא בתוכנית
          </p>
        </motion.div>

      </div>
      <style>{`
        @media(max-width:768px){
          .dash-grid { grid-template-columns: 1fr 1fr !important; }
          .dash-grid > div:last-child { grid-column: auto !important; }
          .dash-section { padding: 48px 1.5rem !important; }
        }
        @media(max-width:480px){
          .dash-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
