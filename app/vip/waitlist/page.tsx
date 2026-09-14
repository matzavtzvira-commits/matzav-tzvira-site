"use client";
import { useState } from "react";
import { usePostHog } from "posthog-js/react";

// ─── Colors ───────────────────────────────────────────────────────────────────
const navy  = "#060D3C";
const blue  = "#124AF0";
const green = "#21F0B0";
const white = "#FFFFFF";

export default function VipWaitlistPage() {
  const posthog = usePostHog();
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/vip-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "waitlist" }),
      });
    } catch { /* silent */ }
    try { posthog?.capture("vip_waitlist_signup"); } catch { /* silent */ }
    setLoading(false);
    setSubmitted(true);
  };

  const fields = [
    { key: "name",  placeholder: "שם מלא", type: "text"  },
    { key: "phone", placeholder: "טלפון",  type: "tel"   },
    { key: "email", placeholder: "מייל",   type: "email" },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% 20%, #1535B5 0%, #060D3C 70%)",
        padding: "56px 1.5rem 64px",
        direction: "rtl",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        @keyframes wlRise { 0% { opacity:0; transform: translateY(18px); } 100% { opacity:1; transform: translateY(0); } }
        @keyframes wlPop  { 0% { opacity:0; transform: scale(0.6); } 70% { transform: scale(1.1); } 100% { opacity:1; transform: scale(1); } }
        .wl-rise { opacity:0; animation: wlRise 0.6s ease forwards; }
        .wl-d1 { animation-delay: 0.1s; } .wl-d2 { animation-delay: 0.22s; }
        .wl-d3 { animation-delay: 0.34s; } .wl-d4 { animation-delay: 0.46s; }
        .wl-card input::placeholder { color: rgba(255,255,255,0.65); }
        @media(max-width:520px){ .wl-card{ padding:32px 20px!important; border-radius:20px!important; } }
      `}</style>

      <div style={{ maxWidth: 520, width: "100%", margin: "0 auto", textAlign: "center" }}>

        {/* לוגו */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/vip-logo.png"
          alt="מצב צבירה - ליווי VIP"
          className="wl-rise"
          style={{ height: 64, width: "auto", margin: "0 auto 26px", display: "block" }}
        />

        {submitted ? (
          /* ─── אחרי שליחה ─────────────────────────────────────────────── */
          <div
            className="wl-card"
            style={{
              background: `linear-gradient(160deg, ${blue} 0%, #0a38c4 100%)`,
              borderRadius: 26,
              padding: "48px 38px",
              boxShadow: "0 20px 60px rgba(18,74,240,0.3)",
            }}
          >
            <div style={{ fontSize: "2.6rem", marginBottom: 14, animation: "wlPop 0.55s ease forwards" }}>☂️</div>
            <h1 style={{ color: white, fontSize: "1.5rem", fontWeight: 800, marginBottom: 14, lineHeight: 1.4 }}>
              רשמתי אותך ברשימה!
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.85, margin: 0 }}>
              אחרי החגים, בעזרת השם, אחזור אלייך
              <br />
              לשיחת התאמה קצרה.
              <br />
              <br />
              בלי תשלום. בלי הרשמה. בלי שום התחייבות.
            </p>
            <p style={{ color: green, fontWeight: 700, fontSize: "0.95rem", marginTop: 24, marginBottom: 0 }}>
              שיהיה לך חג שמח 🤍
            </p>
          </div>
        ) : (
          /* ─── הטופס ──────────────────────────────────────────────────── */
          <>
            <div className="wl-rise wl-d1" style={{ display: "inline-block", background: green, color: navy, borderRadius: 50, padding: "6px 22px", fontSize: "0.85rem", fontWeight: 800, marginBottom: 16 }}>
              רישום מוקדם
            </div>

            <h1 className="wl-rise wl-d2" style={{ color: white, fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 800, lineHeight: 1.35, marginBottom: 14 }}>
              רשימת המתנה
              <br />
              <span style={{ color: green }}>לליווי VIP</span>
            </h1>

            <p className="wl-rise wl-d3" style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.85, marginBottom: 30 }}>
              הליווי האישי נפתח שוב אחרי החגים, בעזרת השם.
              <br />
              המקומות מוגבלים, ואני פותחת את הרשימה כאן.
            </p>

            <div
              className="wl-card wl-rise wl-d4"
              style={{
                background: `linear-gradient(160deg, ${blue} 0%, #0a38c4 100%)`,
                borderRadius: 26,
                padding: "40px 34px",
                boxShadow: "0 20px 60px rgba(18,74,240,0.3)",
              }}
            >
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {fields.map(({ key, placeholder, type }) => (
                  <input
                    key={key}
                    type={type}
                    placeholder={placeholder}
                    required
                    value={(form as Record<string, string>)[key]}
                    onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      border: "1.5px solid rgba(255,255,255,0.25)",
                      borderRadius: 12,
                      padding: "14px 18px",
                      color: white,
                      fontSize: "1rem",
                      textAlign: "right",
                      outline: "none",
                      width: "100%",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                    onFocus={e => { e.target.style.borderColor = green; }}
                    onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.25)"; }}
                  />
                ))}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    position: "relative",
                    background: "transparent",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: "inherit",
                    display: "inline-block",
                    padding: 0,
                    marginTop: 6,
                    transition: "transform 0.2s",
                    opacity: loading ? 0.7 : 1,
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-green.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 43%" }} />
                  <span style={{ position: "relative", zIndex: 1, color: navy, padding: "17px 40px", fontWeight: 800, fontSize: "1.05rem", display: "block" }}>
                    {loading ? "שומרת לך מקום..." : "שמרי לי מקום ברשימה"}
                  </span>
                </button>
              </form>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.14)", marginTop: 26, paddingTop: 20, textAlign: "right" }}>
                <p style={{ color: green, fontWeight: 700, fontSize: "0.92rem", marginBottom: 10 }}>
                  ההרשמה לרשימה לא מחייבת אותך בכלום.
                </p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", lineHeight: 1.8, margin: 0 }}>
                  אין תשלום ואין הרשמה בשלב הזה.
                  <br />
                  אחרי החגים אחזור אלייך לשיחת התאמה קצרה,
                  <br />
                  ואם זה לא מתאים לך - נגיד את זה בכנות ונפרד בחיוך.
                </p>
              </div>
            </div>
          </>
        )}

        {/* אחריות משפטית */}
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.76rem", lineHeight: 1.7, marginTop: 24, marginBottom: 0 }}>
          כל האמור הוא למטרת העשרה והדרכה בלבד ואינו מהווה ייעוץ פיננסי,
          <br />
          המלצה להשקעה או תחליף לייעוץ מקצועי.
          <br />
          כל פעולה בשוק ההון הינה על אחריותך בלבד.
        </p>
      </div>
    </main>
  );
}
