"use client";
import { useState } from "react";

const faqs = [
  {
    q: "אני לא מבינה כלום בכסף. זה בכלל בשבילי?",
    a: "זה בדיוק בשבילך! התוכנית תוכננה במיוחד לנשים שלא עסקו בעולם הפיננסי קודם. אנחנו מתחילות מאפס, בשפה ברורה ונגישה, בלי ז'רגון מיותר.",
  },
  {
    q: "כמה זמן זה ייקח לי?",
    a: "התוכנית בנויה כך שתוכלי להתקדם בקצב שלך. ניתן לסיים את הליבה של התוכנית תוך 4-6 שעות, ויש לך גישה לשנה שלמה חזרה לחומר.",
  },
  {
    q: "אני עובדת כל היום. איך אמצא לזה זמן?",
    a: "כל שיעור קצר וממוקד — ניתן ללמוד בנסיעה, בהפסקת הצהריים, או בערב. הכל זמין 24/7 בגישה מלאה לשנה.",
  },
  {
    q: "אני חוששת שזה יהיה מסובך מדי, או מלא במספרים.",
    a: "הכל הוסבר בגובה העיניים, עם דוגמאות מהחיים. הדשבורדים הדיגיטליים עושים את החישובים — את רק צריכה להבין מה לעשות עם התוצאות.",
  },
  {
    q: "יש לי סוכן שדואג להכל.",
    a: "מצוין שיש לך סוכן. אבל ידע זה כוח — כשתבוני את השפה הפיננסית, תוכלי לבקר, לשאול ולוודא שהכסף שלך נמצא במקום הכי נכון לו.",
  },
  {
    q: "המחשב שלי חסום ואני מפחדת שהקורס לא יפתח.",
    a: "התוכנית נגישה מכל מכשיר — מחשב, טאבלט, טלפון. אם יש בעיה טכנית, צוות התמיכה שלנו זמין לעזור.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ background: "#F4F7FF", padding: "80px 1.5rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.9rem", letterSpacing: 1, marginBottom: 8, background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50 }}>
            מתלבטת? זה טבעי
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.3rem)", color: "#124AF0", marginTop: 12 }}>
            בואי נעבור אחד אחד
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                background: "white",
                borderRadius: 16,
                border: open === i ? "2px solid #124AF0" : "2px solid #E8EDFF",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  textAlign: "right",
                }}
              >
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: "1.2rem" }}>💭</span>
                  <span style={{ fontWeight: 700, color: "#292929", fontSize: "1rem" }}>
                    {faq.q}
                  </span>
                </div>
                <span
                  style={{
                    color: "#124AF0",
                    fontSize: "1.2rem",
                    transform: open === i ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.2s",
                    flexShrink: 0,
                  }}
                >
                  ▾
                </span>
              </button>
              {open === i && (
                <div
                  style={{
                    padding: "0 24px 20px 24px",
                    borderTop: "1px solid #E8EDFF",
                    paddingTop: 16,
                  }}
                >
                  <p style={{ color: "#555", lineHeight: 1.75, fontSize: "0.97rem" }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a
            href="#pricing"
            style={{
              background: "#124AF0",
              color: "white",
              padding: "16px 40px",
              borderRadius: 50,
              fontWeight: 700,
              fontSize: "1.1rem",
              display: "inline-block",
              transition: "background 0.2s, transform 0.1s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#21F0B0";
              e.currentTarget.style.color = "#292929";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#124AF0";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            לרכישת התוכנית ←
          </a>
          <p style={{ color: "#555", fontSize: "0.88rem", marginTop: 12 }}>
            🔒 תשלום מאובטח | אחריות 14 יום להחזר כספי מלא
          </p>
        </div>
      </div>
    </section>
  );
}
