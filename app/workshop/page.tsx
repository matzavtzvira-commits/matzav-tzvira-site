"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

const topics = [
  { icon: "📈", title: "שוק ההון בעברית פשוטה", desc: "מהי בורסה, מה זה מניה, איך מרוויחים מהשקעות — בלי ז'רגון ובלי בלבול" },
  { icon: "🏦", title: "פנסיה ודמי ניהול", desc: "כיצד לבדוק את הפנסיה שלך, להוריד דמי ניהול ולהגדיל את החיסכון לגיל פרישה" },
  { icon: "🌱", title: "תכנון פיננסי משפחתי", desc: "חיסכון לילדים, קרן חירום, תקציב חכם — כיצד בונים בסיס פיננסי יציב לכל המשפחה" },
];

const audiences = [
  { icon: "🕍", label: "קהילות ובתי כנסת" },
  { icon: "🏫", label: "בתי ספר ומוסדות חינוך" },
  { icon: "👩‍💼", label: "ארגוני נשים ועמותות" },
  { icon: "🏢", label: "חברות ומעסיקים" },
  { icon: "👨‍👩‍👧", label: "כולל ובתי מדרש" },
  { icon: "🎓", label: "מסגרות לבנות ונשים" },
];

const testimonials = [
  { quote: "הסדנה של רבקי שינתה את התפיסה של העובדות שלנו. מה שנראה מסובך ומרחיק — הפך לברור ומעשי. ביקשנו כבר סדנה שנייה.", name: "שרה לוי", org: "מנהלת משאבי אנוש, חברת הייטק ירושלים" },
  { quote: "בתחילה חששנו שהנושא יהיה יבש. בסוף הסדנה הנשים לא רצו לסיים. רבקי יודעת לדבר ברמה שכולן מבינות — ממתחילה ועד מנוסה.", name: "חנה גרינברג", org: "ראש עמותת 'קהל נשים', בני ברק" },
];

export default function WorkshopPage() {
  const [form, setForm] = useState({ name: "", phone: "", org: "", participants: "", date: "", message: "" });
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

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: 270 }}>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg, #124AF0, #0a38c4)", padding: "80px 1.5rem 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(33,240,176,0.08)", filter: "blur(70px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -40, left: -40, width: 220, height: 220, borderRadius: "50%", background: "rgba(250,92,92,0.07)", filter: "blur(60px)", pointerEvents: "none" }} />
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1, marginBottom: 12 }}>הזמנת סדנה</p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", color: "white", fontWeight: 700, marginBottom: 20, lineHeight: 1.2 }}>
            סדנאות שוק ההון
            <br />
            <span style={{ color: "#21F0B0" }}>לקהילה שלך</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.05rem", lineHeight: 1.9, maxWidth: 600, margin: "0 auto" }}>
            הרצאה אחת שיכולה לשנות את הדרך שבה הנשים בארגון שלך חושבות על כסף — בשפה ברורה, נגישה ומכבדת
          </p>
        </section>

        {/* What's in the workshop */}
        <section style={{ background: "#F4F7FF", padding: "72px 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50, marginBottom: 12 }}>מה בסדנה</p>
              <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.4rem)", color: "#124AF0", fontWeight: 700 }}>נושאים עיקריים</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              {topics.map((t, i) => (
                <div key={i} style={{ background: "white", borderRadius: 20, padding: "36px 28px", border: "1px solid #E8EDFF" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>{t.icon}</div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#124AF0", marginBottom: 12 }}>{t.title}</h3>
                  <p style={{ fontSize: "0.93rem", color: "#555", lineHeight: 1.8 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section style={{ background: "white", padding: "72px 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50, marginBottom: 12 }}>למי מתאים</p>
              <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.4rem)", color: "#124AF0", fontWeight: 700 }}>לכל ארגון שמאמין בחינוך פיננסי</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
              {audiences.map((a, i) => (
                <div key={i} style={{ background: "#F4F7FF", borderRadius: 16, padding: "24px 16px", textAlign: "center", border: "1px solid #E8EDFF" }}>
                  <div style={{ fontSize: "2rem", marginBottom: 10 }}>{a.icon}</div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#292929", margin: 0 }}>{a.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ background: "#F4F7FF", padding: "72px 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50, marginBottom: 12 }}>מה אומרים</p>
              <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.4rem)", color: "#124AF0", fontWeight: 700 }}>ארגונים שכבר הזמינו</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{ background: "white", borderRadius: 20, padding: "36px 28px", border: "1px solid #E8EDFF" }}>
                  <div style={{ fontSize: "4rem", color: "#21F0B0", lineHeight: 0.7, fontFamily: "Georgia, serif", marginBottom: 16 }}>״</div>
                  <p style={{ fontSize: "1rem", color: "#292929", lineHeight: 1.9, marginBottom: 20 }}>{t.quote}</p>
                  <div style={{ fontWeight: 700, color: "#124AF0", fontSize: "0.93rem" }}>{t.name}</div>
                  <div style={{ color: "#999", fontSize: "0.82rem", marginTop: 4 }}>{t.org}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section style={{ background: "white", padding: "80px 1.5rem" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50, marginBottom: 12 }}>הזמנת סדנה</p>
              <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.4rem)", color: "#124AF0", fontWeight: 700, marginBottom: 12 }}>שלחי פרטים — נחזור תוך 24 שעות</h2>
              <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.8 }}>ללא התחייבות. רק שיחת היכרות וסיכום הצרכים שלך.</p>
            </div>

            {submitted ? (
              <div style={{ background: "linear-gradient(135deg, #124AF0, #0a38c4)", borderRadius: 24, padding: "48px 40px", textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: 20 }}>✓</div>
                <h3 style={{ color: "white", fontSize: "1.5rem", fontWeight: 700, marginBottom: 12 }}>תודה! קיבלנו את הפרטים</h3>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.8 }}>
                  נחזור אלייך תוך 24 שעות לתיאום שיחת היכרות.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>שם מלא *</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="שם מלא"
                      style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>טלפון *</label>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="050-000-0000" type="tel"
                      style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box" }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>שם הארגון *</label>
                  <input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} placeholder="שם הארגון / מוסד / חברה"
                    style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>מספר משתתפות (בערך)</label>
                    <input value={form.participants} onChange={(e) => setForm({ ...form, participants: e.target.value })} placeholder="לדוגמה: 30"
                      style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>תאריך מבוקש (בערך)</label>
                    <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} type="date"
                      style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box" }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>הודעה חופשית</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="ספרי על הארגון, הקהל, כל מה שרלוונטי..." rows={4}
                    style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", resize: "vertical", boxSizing: "border-box" }} />
                </div>
                {error && <p style={{ color: "#FA5C5C", fontSize: "0.88rem", margin: 0 }}>{error}</p>}
                <button type="submit"
                  style={{ background: "#124AF0", color: "white", border: "none", borderRadius: 50, padding: "18px", fontWeight: 700, fontSize: "1.05rem", cursor: "pointer", transition: "transform 0.15s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}>
                  שלחי — נחזור אלייך תוך 24 שעות ←
                </button>
                <p style={{ color: "#aaa", fontSize: "0.8rem", textAlign: "center" }}>המידע נשמר בסודיות. ללא התחייבות.</p>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
