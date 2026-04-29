"use client";
import { useState } from "react";

const stages = [
  {
    num: "01",
    title: "להבין את התמונה הגדולה",
    icon: "🔭",
    desc: "מבט מקיף על עולם הכסף — איפה הכסף שלך נמצא ולאן הוא אמור ללכת. נבין יחד את המפה הפיננסית שלך.",
    topics: ["מהו שוק ההון ולמה זה רלוונטי אלייך?", "ביטוחים, פנסיה, השתלמות — סדר בבלגן", "הר הכסף — איך מוצאים כסף שאינך יודעת שיש לך"],
  },
  {
    num: "02",
    title: "לעשות סדר בחיסכון ובכספים הקיימים",
    icon: "🗂️",
    desc: "נעבור על כל מה שיש לך כבר — ונוודא שהוא עובד בשבילך ולא נגדך.",
    topics: ["דמי ניהול — כמה זה עולה לך באמת?", "השוואה ומשא ומתן מול גופים פיננסיים", "חיסכון לכל ילד — מה עושים נכון?"],
  },
  {
    num: "03",
    title: "ביטחון, תכנון והשקעות לעתיד",
    icon: "🚀",
    desc: "הצעד הראשון לעצמאות פיננסית — כיצד מתחילות להשקיע בביטחון, גם ללא ניסיון קודם.",
    topics: ["פתיחת חשבון מסחר — שלב אחרי שלב", "מדדים, קרנות, ומה קונים ראשון", "תיק השקעות שמתאים לך — לא לאף אחד אחר"],
  },
];

export default function Syllabus() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ background: "white", padding: "80px 1.5rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.9rem", letterSpacing: 1, marginBottom: 8, background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50 }}>
            סילבוס מפורט
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#124AF0", marginTop: 12, marginBottom: 12 }}>
            3 שלבים לעצמאות פיננסית
          </h2>
        </div>

        {/* Stages */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
          {stages.map((stage, i) => (
            <div
              key={i}
              style={{
                border: open === i ? "2px solid #124AF0" : "2px solid #E8EDFF",
                borderRadius: 16,
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              {/* Header row */}
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  background: open === i ? "#F4F7FF" : "white",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  textAlign: "right",
                  transition: "background 0.2s",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: open === i ? "#124AF0" : "#E8EDFF",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                >
                  {stage.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#124AF0",
                      fontWeight: 700,
                      marginBottom: 2,
                    }}
                  >
                    שלב {stage.num}
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "1.02rem",
                      color: "#292929",
                    }}
                  >
                    {stage.title}
                  </div>
                </div>
                <div
                  style={{
                    color: "#124AF0",
                    fontSize: "1.2rem",
                    transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  ▾
                </div>
              </button>

              {/* Content */}
              {open === i && (
                <div style={{ padding: "0 24px 24px", background: "#F4F7FF" }}>
                  <p style={{ color: "#555", lineHeight: 1.7, marginBottom: 16, fontSize: "0.97rem" }}>
                    {stage.desc}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {stage.topics.map((topic, j) => (
                      <li
                        key={j}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          fontSize: "0.95rem",
                          color: "#292929",
                        }}
                      >
                        <span style={{ color: "#21F0B0", fontWeight: 700, marginTop: 2 }}>✦</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bonuses teaser */}
        <div
          style={{
            background: "#F4F7FF",
            border: "2px dashed #21F0B0",
            borderRadius: 16,
            padding: "20px 24px",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>🎁</span>
          <p style={{ fontWeight: 700, color: "#124AF0", marginTop: 8, marginBottom: 4 }}>
            + בונוסים ומדריכים נלווים
          </p>
          <p style={{ color: "#555", fontSize: "0.92rem" }}>
            כלים נוספים שתקבלי כחלק מהתוכנית — בלי תוספת מחיר
          </p>
        </div>
      </div>
    </section>
  );
}
