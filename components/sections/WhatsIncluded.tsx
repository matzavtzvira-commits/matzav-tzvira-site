"use client";
import { motion } from "framer-motion";

const items = [
  { title: "שיעורים בגובה העיניים", desc: "בלי חליפות ועניבות. בשפה שרק אנחנו הנשים מבינות." },
  { title: "מדריכים יד-ביד", desc: "צעד אחרי צעד, אפשר לחזור כמה פעמים שרוצים - בלי לחץ ובלי שיפוטיות." },
  { title: "דשבורדים חכמים", desc: "הידע הופך לפעולה, לא לנייר שנשכח במגירה." },
  { title: "בדיקת תיק פיננסי אישית - חינם", desc: "סוכנת ביטוח מורשית תצור איתך קשר ותבדוק הכל - פנסיה, ביטוחים, דמי ניהול, מסלולים. ותמליץ על שינויים. שירות שאנשים משלמים עליו." },
  { title: "ליווי מלא במייל", desc: "שאלי, תקבלי תשובה אמיתית. אנחנו פה לכל בעיה שלא תהיה." },
  { title: "גישה לשנה שלמה", desc: "ללמוד בקצב שלך, בלי מועד אחרון. הידע שלך לתמיד." },
  { title: "קהילת המאסטריות", desc: "מאות נשים שמקבלות תוכן שוטף - ידע, השקעות, רווחים." },
];

function Icon({ index }: { index: number }) {
  const s = { width: 22, height: 22, fill: "none" as const, stroke: "#21F0B0", strokeWidth: "1.8", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (index === 0) return (
    <svg viewBox="0 0 24 24" {...s}>
      <polygon points="5,3 19,12 5,21" fill="#21F0B0" stroke="none" />
    </svg>
  );
  if (index === 1) return (
    <svg viewBox="0 0 24 24" {...s}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
  if (index === 2) return (
    <svg viewBox="0 0 24 24" {...s}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
  if (index === 3) return (
    <svg viewBox="0 0 24 24" {...s}>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
  if (index === 4) return (
    <svg viewBox="0 0 24 24" {...s}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
  if (index === 5) return (
    <svg viewBox="0 0 24 24" {...s}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
  return (
    <svg viewBox="0 0 24 24" {...s}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function WhatsIncluded() {
  return (
    <section id="included" style={{ background: "radial-gradient(ellipse at 50% 20%, #1535B5 0%, #060D3C 70%)", padding: "72px 1.5rem", scrollMarginTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.9rem", letterSpacing: 1, marginBottom: 8, background: "rgba(33,240,176,0.12)", border: "1px solid rgba(33,240,176,0.3)", display: "inline-block", padding: "4px 16px", borderRadius: 50 }}>
            הכל כלול
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#FFFFFF", marginTop: 12, marginBottom: 12 }}>
            מה בדיוק קורה בתוכנית?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem" }}>
            כל הכלים, הליווי והתמיכה <span style={{ fontSize: "0.75em" }}>-</span> כדי שתיקחי אחריות על הכסף שלך, פעם אחת ולתמיד.
          </p>
        </motion.div>

        <div className="whats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ type: "spring", stiffness: 240, damping: 24, delay: Math.floor(i / 2) * 0.12 }}
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(33,240,176,0.18)", transition: { duration: 0.18 } }}
              style={{
                background: "rgba(10,20,60,0.7)",
                border: "1px solid rgba(33,240,176,0.25)",
                borderRadius: 16,
                padding: "20px 24px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
                backdropFilter: "blur(8px)",
                cursor: "default",
                ...(i === items.length - 1 ? { gridColumn: "1 / -1", maxWidth: "50%", margin: "0 auto", width: "100%" } : {}),
              }}
            >
              <div style={{
                flexShrink: 0,
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: "#0D1B4A",
                border: "2px solid #21F0B0",
                boxShadow: "0 0 14px rgba(33,240,176,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#21F0B0",
              }}>
                <Icon index={i} />
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#FFFFFF", margin: "0 0 4px", lineHeight: 1.3 }}>{item.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .whats-grid { grid-template-columns: 1fr !important; }
          .whats-grid > div:last-child { max-width: 100% !important; margin: 0 !important; }
        }
      `}</style>
    </section>
  );
}
