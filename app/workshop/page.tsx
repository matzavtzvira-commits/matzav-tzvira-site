"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

const lectureTopics = [
  {
    title: "איך העשירים חושבים — ולמה זה לא מה שחשבת",
    desc: "לא מדובר בכישרון מיוחד או מזל. יש דרך חשיבה שאנשים עם הון מחזיקים — ואנחנו מפרקות אותה לגורמים.",
  },
  {
    title: "הטעויות הפיננסיות שכמעט כולנו עושות",
    desc: "דמי ניהול בפנסיה, כסף שישן בבנק, ריבית שעובדת נגדנו — פערי מידע שאפשר לסגור תוך שעה.",
  },
  {
    title: "מה עושים מחר בבוקר",
    desc: "כל אחת יוצאת עם 2–3 צעדים קונקרטיים שהיא יכולה לעשות כבר עכשיו, בהתאם לשלב החיים שלה.",
  },
];

const workshopTopics = [
  {
    title: "שוק ההון בעברית פשוטה",
    desc: "מהי בורסה, מה זה מניה, איך מרוויחים מהשקעות — בלי ז'רגון. עם תרגול ודוגמאות מהחיים.",
  },
  {
    title: "פנסיה ודמי ניהול",
    desc: "כיצד לבדוק את הפנסיה שלך, להוריד דמי ניהול ולהגדיל את החיסכון לגיל פרישה — בצעדים.",
  },
  {
    title: "תכנון פיננסי משפחתי",
    desc: "חיסכון לילדים, קרן חירום, תקציב חכם — בונות יחד תוכנית שתתאים לחיים האמיתיים שלך.",
  },
];

const audiences = [
  { label: "ארגוני רווחה ועובדות סוציאליות" },
  { label: "עיריות ורשויות מקומיות" },
  { label: "ימי גיבוש ארגוניים" },
  { label: "ימי העשרה לעובדות" },
  { label: "חברות ומעסיקים" },
  { label: "מוסדות חינוך ובתי ספר" },
  { label: "ארגוני נשים ועמותות" },
  { label: "מסגרות לנשים ובנות" },
];

const testimonials = [
  {
    badge: "נושא שנשמע יבש — הפך לשיחה שלא רצו לסיים",
    quote: "אמרתי לרבקי מראש — המורות שלנו עייפות, הן שמעו אלף הרצאות, אל תצפי להתלהבות. בסוף ההרצאה הן לא רצו לסיים. הנושא פתח אפיקים שהן לא ידעו שקיימים. הזמנו כבר הרצאה שנייה.",
    name: "מרים כהן",
    org: "מנהלת השתלמות, מוסד חינוכי בירושלים",
    type: "הרצאה",
  },
  {
    badge: "כולן יצאו עם דברים קונקרטיים לעשות כבר השבוע",
    quote: "ביקשנו משהו שייתן לעובדות שלנו ערך אמיתי — לא עוד יום כיף. רבקי הביאה בדיוק את זה. כולן יצאו עם צעדים ממשיים שהן יכולות לעשות כבר עכשיו. קיבלנו המון פידבק חיובי.",
    name: "שרה לוי",
    org: "מנהלת משאבי אנוש, ארגון רווחה תל אביב",
    type: "סדנה",
  },
];

export default function WorkshopPage() {
  const [activeProduct, setActiveProduct] = useState<"lecture" | "workshop">("lecture");
  const [form, setForm] = useState({ name: "", phone: "", org: "", type: "הרצאה", participants: "", date: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.org) {
      setError("נא למלא שם, טלפון ושם ארגון");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const topics = activeProduct === "lecture" ? lectureTopics : workshopTopics;

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: 160 }}>

        {/* Hero */}
        <section style={{ background: "#070C24", padding: "80px 1.5rem 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(18,74,240,0.18)", filter: "blur(90px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(33,240,176,0.10)", filter: "blur(80px)", pointerEvents: "none" }} />
          <div style={{ position: "relative", maxWidth: 740, margin: "0 auto" }}>
            <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20 }}>לארגונים ומוסדות</p>
            <h1 style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.4rem)", color: "white", fontWeight: 700, marginBottom: 24, lineHeight: 1.25, textShadow: "0 0 12px rgba(255,255,255,0.8)" }}>
              ידע פיננסי לנשים <span style={{ fontSize: "0.75em" }}>—</span>
              <br />
              <span style={{ color: "#21F0B0" }}>בפורמט שמתאים לך</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.05rem", lineHeight: 2, maxWidth: 580, margin: "0 auto" }}>
              רבקי מגיעה לארגון שלך עם הרצאה כיפית וזורמת או סדנה עמוקה ומעשית <span style={{ fontSize: "0.75em" }}>—</span> תלוי מה הקהל שלך צריך.
            </p>
          </div>
        </section>

        {/* Red divider */}
        <div style={{ height: 3, background: "#FA5C5C" }} />

        {/* Two products — side by side */}
        <section style={{ background: "#F4F7FF", padding: "80px 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 14 }}>שני פורמטים</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#070C24", fontWeight: 700 }}>הרצאה או סדנה <span style={{ fontSize: "0.75em" }}>—</span> מה ההבדל?</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

              {/* Lecture card */}
              <div style={{ background: "white", borderRadius: 28, padding: "44px 36px", border: "2px solid #E8EDFF", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, left: 0, height: 5, background: "#124AF0" }} />
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#124AF0", borderRadius: 50, padding: "6px 18px", marginBottom: 24 }}>
                  <span style={{ color: "white", fontWeight: 700, fontSize: "0.9rem" }}>הרצאה</span>
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#070C24", marginBottom: 12, lineHeight: 1.3 }}>שעה שמשנה תפיסה</h3>
                <p style={{ color: "#555", fontSize: "0.95rem", lineHeight: 2, marginBottom: 28 }}>
                  הרצאה כיפית, זורמת ומקצועית. רבקי מגיעה, מדברת, הקהל מתחבר — ויוצא עם ראש אחר לגמרי על כסף. מושלם לקבוצות גדולות, ימי גיבוש וימי העשרה.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {[
                    { label: "משך", val: "60–90 דקות" },
                    { label: "גודל קבוצה", val: "ללא הגבלה" },
                    { label: "פורמט", val: "הרצאה + שאלות" },
                    { label: "מה יוצא מזה", val: "שינוי תפיסה + צעדים ראשונים" },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #F4F7FF", paddingBottom: 12 }}>
                      <span style={{ color: "#888", fontSize: "0.88rem" }}>{r.label}</span>
                      <span style={{ fontWeight: 700, color: "#292929", fontSize: "0.9rem" }}>{r.val}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact-form" onClick={() => setForm(f => ({ ...f, type: "הרצאה" }))}
                  style={{ display: "block", background: "#124AF0", color: "white", fontWeight: 700, fontSize: "1rem", padding: "16px", borderRadius: 50, textDecoration: "none", textAlign: "center", transition: "all 0.15s" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#0a38c4"; el.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#124AF0"; el.style.transform = "translateY(0)"; }}>
                  הזמיני הרצאה ←
                </a>
              </div>

              {/* Workshop card */}
              <div style={{ background: "#070C24", borderRadius: 28, padding: "44px 36px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, left: 0, height: 5, background: "#21F0B0" }} />
                <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(33,240,176,0.07)", filter: "blur(50px)", pointerEvents: "none" }} />
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#21F0B0", borderRadius: 50, padding: "6px 18px", marginBottom: 24 }}>
                  <span style={{ color: "#070C24", fontWeight: 700, fontSize: "0.9rem" }}>סדנה</span>
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "white", marginBottom: 12, lineHeight: 1.3, textShadow: "0 0 12px rgba(255,255,255,0.8)" }}>חצי יום שמשנה הרגלים</h3>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", lineHeight: 2, marginBottom: 28 }}>
                  סדנה עמוקה ואינטראקטיבית עם תרגולים אמיתיים. כל משתתפת עובדת על הנתונים שלה ממש בחדר. מושלם לקבוצות קטנות שרוצות שינוי אמיתי.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {[
                    { label: "משך", val: "חצי יום (3–4 שעות)" },
                    { label: "גודל קבוצה", val: "עד 30 משתתפות" },
                    { label: "פורמט", val: "תרגולים + דיון + אישי" },
                    { label: "מה יוצא מזה", val: "תוכנית אישית מוכנה" },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12 }}>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem" }}>{r.label}</span>
                      <span style={{ fontWeight: 700, color: "#21F0B0", fontSize: "0.9rem" }}>{r.val}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact-form" onClick={() => setForm(f => ({ ...f, type: "סדנה" }))}
                  style={{ display: "block", background: "#21F0B0", color: "#070C24", fontWeight: 700, fontSize: "1rem", padding: "16px", borderRadius: 50, textDecoration: "none", textAlign: "center", transition: "all 0.15s" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.opacity = "0.9"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.opacity = "1"; }}>
                  הזמיני סדנה ←
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* Red divider */}
        <div style={{ height: 3, background: "#FA5C5C" }} />

        {/* Topics — tabs */}
        <section style={{ background: "white", padding: "80px 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <p style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 14 }}>נושאים</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#070C24", fontWeight: 700, marginBottom: 28 }}>על מה מדברים</h2>
              {/* Toggle */}
              <div style={{ display: "inline-flex", background: "#F4F7FF", borderRadius: 50, padding: 4, gap: 4 }}>
                {(["lecture", "workshop"] as const).map((t) => (
                  <button key={t} onClick={() => setActiveProduct(t)}
                    style={{ background: activeProduct === t ? (t === "lecture" ? "#124AF0" : "#070C24") : "transparent", color: activeProduct === t ? (t === "lecture" ? "white" : "#21F0B0") : "#666", border: "none", borderRadius: 50, padding: "10px 28px", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", transition: "all 0.2s" }}>
                    {t === "lecture" ? "הרצאה" : "סדנה"}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {topics.map((t, i) => (
                <div key={i} style={{ background: "#F4F7FF", borderRadius: 24, padding: "36px 32px", border: "1px solid #E8EDFF" }}>
                  <div style={{ width: 36, height: 4, borderRadius: 4, background: activeProduct === "lecture" ? "#124AF0" : "#21F0B0", marginBottom: 20 }} />
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#070C24", marginBottom: 14, lineHeight: 1.5 }}>{t.title}</h3>
                  <p style={{ fontSize: "0.93rem", color: "#555", lineHeight: 1.9, margin: 0 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section style={{ background: "#F4F7FF", padding: "80px 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 14 }}>למי מתאים</p>
              <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.4rem)", color: "#070C24", fontWeight: 700 }}>לכל ארגון שרוצה לתת לנשים שלו כלים אמיתיים</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
              {audiences.map((a, i) => (
                <div key={i} style={{ background: "white", borderRadius: 16, padding: "20px 20px", border: "1px solid #E8EDFF", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: i % 3 === 0 ? "#124AF0" : i % 3 === 1 ? "#21F0B0" : "#FA5C5C", flexShrink: 0 }} />
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#292929", margin: 0, lineHeight: 1.4 }}>{a.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ background: "#F4F7FF", padding: "80px 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 14 }}>ארגונים שהזמינו</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: "#070C24", fontWeight: 700 }}>מה אמרו אחרי</h2>
            </div>

            <style>{`
              @keyframes logo-spin {
                0%   { transform: rotate(0deg) scale(1); }
                50%  { transform: rotate(180deg) scale(1.08); }
                100% { transform: rotate(360deg) scale(1); }
              }
              .testimonial-logo { animation: logo-spin 6s linear infinite; }
            `}</style>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 28 }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{
                  background: "white",
                  borderRadius: 24,
                  padding: "36px 36px 32px",
                  border: "2px solid #C8D8FF",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Top row: animated logo + quote mark */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                    <img
                      src="/logo-animated.gif"
                      alt=""
                      className="testimonial-logo"
                      style={{ width: 44, height: 44, objectFit: "contain" }}
                    />
                    <span style={{ color: "#21F0B0", fontSize: "2.8rem", fontFamily: "Georgia, serif", lineHeight: 0.7, userSelect: "none" }}>״</span>
                  </div>

                  {/* Badge */}
                  <div style={{ marginBottom: 20 }}>
                    <span style={{ display: "inline-block", background: "#124AF0", color: "white", fontWeight: 700, fontSize: "0.88rem", padding: "8px 18px", borderRadius: 50, lineHeight: 1.5 }}>
                      {t.badge}
                    </span>
                  </div>

                  {/* Quote */}
                  <p style={{ fontSize: "0.97rem", color: "#292929", lineHeight: 2, marginBottom: 28, margin: "0 0 28px" }}>{t.quote}</p>

                  {/* Author */}
                  <div style={{ borderTop: "1px solid #E8EDFF", paddingTop: 20 }}>
                    <div style={{ fontWeight: 700, color: "#124AF0", fontSize: "0.95rem" }}>
                      <span style={{ fontSize: "0.75em" }}>—</span> {t.name}
                    </div>
                    <div style={{ color: "#999", fontSize: "0.82rem", marginTop: 4 }}>{t.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Red divider */}
        <div style={{ height: 3, background: "#FA5C5C" }} />

        {/* Contact Form */}
        <section id="contact-form" style={{ background: "white", padding: "88px 1.5rem" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 16 }}>הזמנה</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#070C24", fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>שלחי פרטים <span style={{ fontSize: "0.75em" }}>—</span> נחזור תוך 24 שעות</h2>
              <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.9 }}>ללא התחייבות. שיחת היכרות קצרה, סיכום הצרכים שלך ותאריך שנוח לך.</p>
            </div>

            {submitted ? (
              <div style={{ background: "#070C24", borderRadius: 24, padding: "56px 40px", textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#21F0B0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "1.6rem", color: "#070C24", fontWeight: 700 }}>✓</div>
                <h3 style={{ color: "white", fontSize: "1.6rem", fontWeight: 700, marginBottom: 12, textShadow: "0 0 12px rgba(255,255,255,0.8)" }}>קיבלנו את הפרטים</h3>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 2 }}>נחזור אלייך תוך 24 שעות לתיאום שיחת היכרות.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Product selector */}
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 10 }}>מה מעניין אותך? *</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {["הרצאה", "סדנה"].map((opt) => (
                      <button key={opt} type="button" onClick={() => setForm(f => ({ ...f, type: opt }))}
                        style={{ padding: "14px", borderRadius: 14, border: `2px solid ${form.type === opt ? "#124AF0" : "#E8EDFF"}`, background: form.type === opt ? "#124AF0" : "white", color: form.type === opt ? "white" : "#555", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", transition: "all 0.15s" }}>
                        {opt === "הרצאה" ? "הרצאה — 60–90 דקות" : "סדנה — חצי יום"}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>שם מלא *</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="שם מלא"
                      style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box", transition: "border-color 0.15s" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#124AF0")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E8EDFF")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>טלפון *</label>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="050-000-0000" type="tel"
                      style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box", transition: "border-color 0.15s" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#124AF0")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E8EDFF")} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>שם הארגון *</label>
                  <input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} placeholder="שם הארגון / עירייה / חברה"
                    style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box", transition: "border-color 0.15s" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#124AF0")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#E8EDFF")} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>מספר משתתפות (בערך)</label>
                    <input value={form.participants} onChange={(e) => setForm({ ...form, participants: e.target.value })} placeholder="לדוגמה: 30"
                      style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box", transition: "border-color 0.15s" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#124AF0")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E8EDFF")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>תאריך מבוקש (בערך)</label>
                    <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} type="date"
                      style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box", transition: "border-color 0.15s" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#124AF0")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E8EDFF")} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>הודעה חופשית</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="ספרי על הארגון, הקהל, כל מה שרלוונטי..." rows={4}
                    style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", resize: "vertical", boxSizing: "border-box", transition: "border-color 0.15s" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#124AF0")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#E8EDFF")} />
                </div>
                {error && <p style={{ color: "#FA5C5C", fontSize: "0.88rem", margin: 0 }}>{error}</p>}
                <button type="submit"
                  style={{ background: "#124AF0", color: "white", border: "none", borderRadius: 50, padding: "20px", fontWeight: 700, fontSize: "1.08rem", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.background = "#0a38c4"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.background = "#124AF0"; }}>
                  שלחי <span style={{ fontSize: "0.75em" }}>—</span> נחזור אלייך תוך 24 שעות ←
                </button>
                <p style={{ color: "#aaa", fontSize: "0.8rem", textAlign: "center", margin: 0 }}>המידע נשמר בסודיות. ללא התחייבות.</p>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
