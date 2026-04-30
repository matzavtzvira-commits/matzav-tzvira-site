"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

const features = [
  { icon: "🎯", title: "תוכנית אישית", desc: "לא קורס גנרי — תוכנית שבנויה בשבילך בלבד, לפי המצב הפיננסי שלך" },
  { icon: "📞", title: "פגישות אחד-על-אחד", desc: "פגישות וידאו אישיות עם רבקי, בזמן שנוח לך" },
  { icon: "💬", title: "ליווי שוטף", desc: "גישה לרבקי בין הפגישות — שאלות, תקיעויות, החלטות שצריך לקבל" },
  { icon: "📊", title: "ניתוח תיק אישי", desc: "בדיקה מעמיקה של הפנסיה, הביטוחים והחיסכון שלך" },
];

const q1Options = [
  { value: "zero", label: "מתחילה מאפס — עוד לא חסכתי כמעט כלום" },
  { value: "has-savings", label: "יש לי חיסכון אבל לא יודעת מה לעשות איתו" },
  { value: "investing", label: "כבר משקיעה, רוצה לייעל ולשפר" },
];
const q2Options = [
  { value: "portfolio", label: "לבנות תיק השקעות" },
  { value: "pension", label: "לסדר פנסיה וביטוחים" },
  { value: "kids", label: "להכין כסף לחתונות ולילדים" },
  { value: "all", label: "הכל — צריכה סדר כללי" },
];
const q3Options = [
  { value: "hour", label: "שעה בשבוע — יש לי מעט זמן" },
  { value: "few", label: "2-3 שעות בשבוע" },
  { value: "whatever", label: "כמה שצריך — אני מחויבת" },
];
const q4Options = [
  { value: "lose", label: "לאבד כסף בהשקעה שגויה" },
  { value: "understand", label: "לא להבין ולהיראות טיפשה" },
  { value: "advice", label: "לקבל עצה שאינה מתאימה לי" },
  { value: "time", label: "אין לי זמן — לא אצליח להתמיד" },
];

type Answers = { q1: string; q2: string; q3: string; q4: string };

export default function VipPage() {
  const [step, setStep] = useState<"info" | "quiz" | "contact" | "done">("info");
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ q1: "", q2: "", q3: "", q4: "" });
  const [contact, setContact] = useState({ name: "", phone: "", time: "" });
  const [contactError, setContactError] = useState("");

  const questions = [
    { key: "q1" as keyof Answers, text: "מה המצב הפיננסי הנוכחי שלך?", options: q1Options },
    { key: "q2" as keyof Answers, text: "מה המטרה העיקרית שלך?", options: q2Options },
    { key: "q3" as keyof Answers, text: "כמה זמן את מוכנה להשקיע?", options: q3Options },
    { key: "q4" as keyof Answers, text: "מה מפחיד אותך הכי הרבה?", options: q4Options },
  ];

  const currentQ = questions[quizStep];

  const handleQuizSelect = (val: string) => {
    setAnswers({ ...answers, [currentQ.key]: val });
    if (quizStep < questions.length - 1) {
      setTimeout(() => setQuizStep(quizStep + 1), 300);
    } else {
      setTimeout(() => setStep("contact"), 300);
    }
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.name || !contact.phone) {
      setContactError("נא למלא שם וטלפון");
      return;
    }
    setContactError("");
    setStep("done");
  };

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: 270 }}>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg, #0a1a6e, #124AF0)", padding: "80px 1.5rem 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(33,240,176,0.08)", filter: "blur(70px)", pointerEvents: "none" }} />
          <span style={{ display: "inline-block", background: "#FA5C5C", color: "white", borderRadius: 50, padding: "5px 18px", fontSize: "0.82rem", fontWeight: 700, marginBottom: 20 }}>
            מקומות מוגבלים
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "white", fontWeight: 700, marginBottom: 20, lineHeight: 1.2 }}>
            ליווי VIP אישי
            <br />
            <span style={{ color: "#21F0B0" }}>שוק ההון בגובה העיניים, בשבילך בלבד</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.05rem", lineHeight: 1.9, maxWidth: 600, margin: "0 auto 36px" }}>
            לא קורס, לא קבוצה — ליווי אישי צמוד עם רבקי. תוכנית שנבנית בדיוק בשבילך, לפי המצב הפיננסי שלך, המטרות שלך, והחיים שלך.
          </p>
          <button onClick={() => setStep("quiz")}
            style={{ background: "#21F0B0", color: "#124AF0", border: "none", borderRadius: 50, padding: "18px 48px", fontWeight: 700, fontSize: "1.05rem", cursor: "pointer" }}>
            בדקי אם את מתאימה ←
          </button>
        </section>

        {/* What's included */}
        {step === "info" && (
          <section style={{ background: "#F4F7FF", padding: "72px 1.5rem" }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50, marginBottom: 12 }}>מה כולל הליווי</p>
                <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.4rem)", color: "#124AF0", fontWeight: 700 }}>לא קורס — ליווי אמיתי</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 56 }}>
                {features.map((f, i) => (
                  <div key={i} style={{ background: "white", borderRadius: 20, padding: "32px 24px", border: "1px solid #E8EDFF" }}>
                    <div style={{ fontSize: "2.2rem", marginBottom: 16 }}>{f.icon}</div>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#124AF0", marginBottom: 10 }}>{f.title}</h3>
                    <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.8 }}>{f.desc}</p>
                  </div>
                ))}
              </div>

              {/* Difference from course */}
              <div style={{ background: "linear-gradient(135deg, #124AF0, #0a38c4)", borderRadius: 24, padding: "48px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
                <div>
                  <h3 style={{ color: "#21F0B0", fontWeight: 700, fontSize: "1.1rem", marginBottom: 20 }}>הקורס הדיגיטלי</h3>
                  {["לימוד עצמי בקצב שלך", "תוכן כללי שמתאים לרוב", "קהילה תומכת", "קל לבצע בעצמך"].map((s, i) => (
                    <p key={i} style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.92rem", lineHeight: 1.8, margin: "0 0 8px", display: "flex", gap: 10 }}>
                      <span style={{ color: "#E8EDFF" }}>○</span> {s}
                    </p>
                  ))}
                </div>
                <div>
                  <h3 style={{ color: "#21F0B0", fontWeight: 700, fontSize: "1.1rem", marginBottom: 20 }}>ליווי VIP אישי</h3>
                  {["תוכנית שנבנית רק בשבילך", "ניתוח התיק הספציפי שלך", "גישה ישירה לרבקי", "תוצאות מהירות ומדויקות"].map((s, i) => (
                    <p key={i} style={{ color: "white", fontSize: "0.92rem", lineHeight: 1.8, margin: "0 0 8px", display: "flex", gap: 10 }}>
                      <span style={{ color: "#21F0B0" }}>✓</span> {s}
                    </p>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: "center", marginTop: 48 }}>
                <button onClick={() => setStep("quiz")}
                  style={{ background: "#124AF0", color: "white", border: "none", borderRadius: 50, padding: "18px 48px", fontWeight: 700, fontSize: "1.05rem", cursor: "pointer" }}>
                  בדקי אם ליווי VIP מתאים לך ←
                </button>
                <p style={{ color: "#aaa", fontSize: "0.82rem", marginTop: 16 }}>שאלון קצר של 4 שאלות — ללא התחייבות</p>
              </div>
            </div>
          </section>
        )}

        {/* Quiz */}
        {step === "quiz" && (
          <section style={{ background: "#F4F7FF", padding: "72px 1.5rem", minHeight: "50vh" }}>
            <div style={{ maxWidth: 620, margin: "0 auto" }}>
              {/* Progress */}
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ color: "#888", fontSize: "0.85rem" }}>שאלה {quizStep + 1} מתוך {questions.length}</span>
                  <span style={{ color: "#124AF0", fontWeight: 600, fontSize: "0.85rem" }}>{Math.round(((quizStep) / questions.length) * 100)}% הושלם</span>
                </div>
                <div style={{ background: "#E8EDFF", borderRadius: 10, height: 8 }}>
                  <div style={{ background: "#124AF0", borderRadius: 10, height: "100%", width: `${(quizStep / questions.length) * 100}%`, transition: "width 0.4s" }} />
                </div>
              </div>

              <div style={{ background: "white", borderRadius: 24, padding: "48px 40px", border: "1px solid #E8EDFF" }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#292929", marginBottom: 32, lineHeight: 1.4 }}>{currentQ.text}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {currentQ.options.map((opt) => (
                    <button key={opt.value} onClick={() => handleQuizSelect(opt.value)}
                      style={{
                        background: answers[currentQ.key] === opt.value ? "#EEF3FF" : "#F4F7FF",
                        border: `2px solid ${answers[currentQ.key] === opt.value ? "#124AF0" : "#E8EDFF"}`,
                        borderRadius: 14, padding: "16px 20px", textAlign: "right", fontSize: "0.97rem",
                        color: answers[currentQ.key] === opt.value ? "#124AF0" : "#333",
                        fontWeight: answers[currentQ.key] === opt.value ? 700 : 400,
                        cursor: "pointer", transition: "all 0.15s",
                      }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact form */}
        {step === "contact" && (
          <section style={{ background: "#F4F7FF", padding: "72px 1.5rem", minHeight: "50vh" }}>
            <div style={{ maxWidth: 560, margin: "0 auto" }}>
              <div style={{ background: "#21F0B0", borderRadius: 16, padding: "20px 24px", textAlign: "center", marginBottom: 32 }}>
                <p style={{ color: "#124AF0", fontWeight: 700, fontSize: "1rem", margin: 0 }}>
                  ✓ ענית על כל השאלות! רבקי תיצור איתך קשר להתאמה אישית
                </p>
              </div>
              <div style={{ background: "white", borderRadius: 24, padding: "48px 40px", border: "1px solid #E8EDFF" }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#292929", marginBottom: 8 }}>השאירי פרטים</h2>
                <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: 32 }}>רבקי תחזור אלייך עם הצעה מותאמת אישית</p>
                <form onSubmit={handleContact} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>שם מלא *</label>
                    <input value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="שם מלא"
                      style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>טלפון *</label>
                    <input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="050-000-0000" type="tel"
                      style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>זמן נוח לשיחה</label>
                    <input value={contact.time} onChange={(e) => setContact({ ...contact, time: e.target.value })} placeholder="לדוגמה: בוקר, אחר הצהריים, ערב..."
                      style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box" }} />
                  </div>
                  {contactError && <p style={{ color: "#FA5C5C", fontSize: "0.88rem", margin: 0 }}>{contactError}</p>}
                  <button type="submit"
                    style={{ background: "#21F0B0", color: "#124AF0", border: "none", borderRadius: 50, padding: "18px", fontWeight: 700, fontSize: "1.05rem", cursor: "pointer", marginTop: 8 }}>
                    שלחי — אחזור אלייך להתאמה אישית ←
                  </button>
                  <p style={{ color: "#aaa", fontSize: "0.8rem", textAlign: "center" }}>המידע נשמר בסודיות מוחלטת. לא מחויבות, רק שיחה.</p>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* Done */}
        {step === "done" && (
          <section style={{ background: "#F4F7FF", padding: "80px 1.5rem", minHeight: "50vh", display: "flex", alignItems: "center" }}>
            <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
              <div style={{ background: "linear-gradient(135deg, #124AF0, #0a38c4)", borderRadius: 24, padding: "60px 40px" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#21F0B0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 24px" }}>✓</div>
                <h2 style={{ color: "white", fontSize: "1.7rem", fontWeight: 700, marginBottom: 16 }}>קיבלנו! תודה</h2>
                <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1rem", lineHeight: 1.9, marginBottom: 8 }}>
                  רבקי תיצור איתך קשר בהקדם לשיחת היכרות אישית.
                </p>
                <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.95rem", marginBottom: 0 }}>
                  ללא לחץ, ללא מכירה — רק שיחה.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
