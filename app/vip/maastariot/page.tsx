"use client";
import { useState } from "react";
import { usePostHog } from "posthog-js/react";

// ─── Colors ───────────────────────────────────────────────────────────────────
const navy  = "#060D3C";
const blue  = "#124AF0";
const green = "#21F0B0";
const gold  = "#E7C66B";
const white = "#FFFFFF";


export default function VipMaastariotPage() {
  const posthog = usePostHog();
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/vip-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "maastariot" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      try { posthog?.capture("vip_maastariot_signup"); } catch { /* silent */ }
      setSubmitted(true);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  const fields = [
    { key: "name",  placeholder: "שם מלא", type: "text"  },
    { key: "phone", placeholder: "טלפון",  type: "tel"   },
    { key: "email", placeholder: "מייל",   type: "email" },
  ];

  const card: React.CSSProperties = {
    background: `linear-gradient(160deg, ${blue} 0%, #0a38c4 100%)`,
    borderRadius: 26,
    padding: "40px 34px",
    boxShadow: "0 20px 60px rgba(18,74,240,0.3)",
  };

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
        @keyframes msRise { 0% { opacity:0; transform: translateY(18px); } 100% { opacity:1; transform: translateY(0); } }
        @keyframes msPop  { 0% { opacity:0; transform: scale(0.6); } 70% { transform: scale(1.1); } 100% { opacity:1; transform: scale(1); } }
        .ms-rise { opacity:0; animation: msRise 0.6s ease forwards; }
        .ms-d1 { animation-delay: 0.1s; } .ms-d2 { animation-delay: 0.22s; }
        .ms-d3 { animation-delay: 0.34s; } .ms-d4 { animation-delay: 0.46s; } .ms-d5 { animation-delay: 0.58s; }
        @keyframes msLogoIn {
          0%   { opacity:0; transform: translateY(14px) scale(0.72) rotate(-6deg); filter: blur(6px); }
          60%  { opacity:1; transform: translateY(-3px) scale(1.06) rotate(1deg); filter: blur(0); }
          100% { opacity:1; transform: translateY(0) scale(1) rotate(0); filter: blur(0); }
        }
        @keyframes msFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes msGlow {
          0%,100% { box-shadow: 0 10px 30px rgba(0,0,0,0.35), 0 0 0 1px rgba(231,198,107,0.35), 0 0 22px rgba(33,240,176,0.18); }
          50%     { box-shadow: 0 14px 34px rgba(0,0,0,0.35), 0 0 0 1px rgba(231,198,107,0.6),  0 0 34px rgba(33,240,176,0.32); }
        }
        @keyframes msShine { 0%, 62% { transform: translateX(-160%) skewX(-20deg); } 82%, 100% { transform: translateX(260%) skewX(-20deg); } }
        @keyframes msRing { 0% { opacity:0.55; transform: translate(-50%,-50%) scale(0.85); } 100% { opacity:0; transform: translate(-50%,-50%) scale(1.55); } }
        .ms-logo-wrap { position: relative; width: 132px; height: 132px; margin: 8px auto 38px; animation: msFloat 5s ease-in-out 1.1s infinite; }
        .ms-logo { position: relative; width: 100%; height: 100%; border-radius: 32px; overflow: hidden; background: #fff;
          opacity: 0; animation: msLogoIn 0.95s cubic-bezier(.2,.8,.2,1) 0.05s forwards, msGlow 4s ease-in-out 1.1s infinite; }
        .ms-logo img { width: 100%; height: 100%; object-fit: contain; display: block; }
        .ms-logo::after { content: ""; position: absolute; top: -20%; bottom: -20%; left: 0; width: 45%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent);
          mix-blend-mode: overlay; animation: msShine 4.5s ease-in-out 1.2s infinite; transform: translateX(-160%) skewX(-20deg); }
        @keyframes msHalo { 0%,100% { opacity:0.55; transform: translate(-50%,-50%) scale(1); } 50% { opacity:0.85; transform: translate(-50%,-50%) scale(1.08); } }
        .ms-logo-halo { position: absolute; top: 50%; left: 50%; width: 230%; height: 230%; border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(231,198,107,0.28) 0%, rgba(33,240,176,0.12) 38%, rgba(18,74,240,0) 68%);
          transform: translate(-50%,-50%); opacity: 0; animation: msHalo 6s ease-in-out 0.6s infinite; }
        .ms-logo-ring2 { animation-delay: 2.6s !important; }
        .ms-logo-ring { position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; border-radius: 36px;
          border: 1.5px solid rgba(231,198,107,0.7); opacity: 0; animation: msRing 3s ease-out 1.1s infinite; animation-duration: 3s; pointer-events: none; }
        @media (prefers-reduced-motion: reduce) {
          .ms-logo-wrap, .ms-logo, .ms-logo::after, .ms-logo-ring, .ms-logo-halo { animation: none !important; }
          .ms-logo-halo { opacity: 0.6; }
          .ms-logo { opacity: 1; }
        }
        .ms-card input::placeholder { color: rgba(255,255,255,0.65); }
        @media(max-width:520px){ .ms-logo-wrap{ width:116px!important; height:116px!important; margin-bottom:32px!important; } .ms-card{ padding:32px 20px!important; border-radius:20px!important; } }
      `}</style>

      <div style={{ maxWidth: 540, width: "100%", margin: "0 auto", textAlign: "center" }}>

        {/* לוגו */}
        <div className="ms-logo-wrap">
          <span className="ms-logo-halo" />
          <span className="ms-logo-ring" />
          <span className="ms-logo-ring ms-logo-ring2" />
          <div className="ms-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vip-logo-tile.png" alt="מצב צבירה - ליווי VIP" />
          </div>
        </div>

        {submitted ? (
          /* ─── אחרי שליחה ─────────────────────────────────────────────── */
          <div className="ms-card" style={{ ...card, padding: "48px 38px" }}>
            <div style={{ fontSize: "2.6rem", marginBottom: 14, animation: "msPop 0.55s ease forwards" }}>☂️</div>
            <h1 style={{ color: white, fontSize: "1.5rem", fontWeight: 800, marginBottom: 14, lineHeight: 1.4 }}>
              קיבלתי, איזה כיף!
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.85, margin: 0 }}>
              בימים הקרובים, בעזרת השם, נחזור אלייך
              <br />
              לשיחת טלפון קצרה.
              <br />
              <br />
              בלי תשלום. בלי הרשמה. בלי שום התחייבות.
            </p>
            <p style={{ color: green, fontWeight: 700, fontSize: "0.95rem", marginTop: 24, marginBottom: 0 }}>
              רבקי 🤍
            </p>
          </div>
        ) : (
          <>
            <h1 className="ms-rise ms-d2" style={{ color: white, fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 800, lineHeight: 1.35, marginBottom: 14 }}>
              <span style={{ display: "block", color: gold, fontSize: "0.7em", marginBottom: 6 }}>מאסטרית יקרה,</span>
              את כבר עשית את הצעד הראשון.
              <br />
              <span style={{ color: green }}>עכשיו נעשה את הסדר - ביחד.</span>
            </h1>

            <p className="ms-rise ms-d3" style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.02rem", lineHeight: 1.85, marginBottom: 26 }}>
              למדת, הבנת, ואת יודעת מה צריך לעשות.
              <br />
              ואז הגיע היום-יום.
              <br />
              הבית, העבודה, הילדים, הסידורים -
              <br />
              והסדר בכסף נדחה שוב לשבוע הבא.
              <br />
              <strong style={{ color: white }}>וזה בסדר גמור. בשביל זה אני כאן.</strong>
            </p>

            <p className="ms-rise ms-d4" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.97rem", lineHeight: 1.8, marginBottom: 26 }}>
              דווקא כשהכל מרגיש בסדר, הכסף נשחק בשקט.
            </p>

            <div className="ms-card ms-rise ms-d5" style={card}>
              {/* הטבת מאסטריות */}
              <div style={{ border: `1.5px dashed ${gold}`, borderRadius: 14, padding: "14px 16px", marginBottom: 24 }}>
                <p style={{ color: gold, fontWeight: 800, fontSize: "1.02rem", margin: "0 0 4px" }}>
                  ✨ מחיר מיוחד למאסטריות
                </p>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.92rem", lineHeight: 1.7, margin: 0 }}>
                  בגלל שאת כבר מאסטרית, מחכה לך מחיר שלא פתוח לאף אחת אחרת.
                </p>
              </div>

              <p style={{ color: white, fontWeight: 700, fontSize: "1.02rem", lineHeight: 1.7, margin: "0 0 18px" }}>
                את כבר משתדלת מספיק.
                <br />
                הגיע הזמן שגם הכסף שלך ישתדל בשבילך.
              </p>

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
                    {loading ? "שולחת..." : "אני רוצה שיחה קצרה"}
                  </span>
                </button>

                {error && (
                  <p style={{ color: "#FFD0D0", fontSize: "0.9rem", margin: 0 }}>
                    משהו לא נשלח. אפשר לנסות שוב בעוד רגע.
                  </p>
                )}
              </form>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.14)", marginTop: 26, paddingTop: 20, textAlign: "center" }}>
                <p style={{ color: green, fontWeight: 700, fontSize: "0.92rem", marginBottom: 10 }}>
                  השיחה לא מחייבת אותך בכלום.
                </p>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.88rem", lineHeight: 1.8, margin: 0 }}>
                  אין תשלום ואין הרשמה בשלב הזה.
                  <br />
                  במקרה הטוב - תצאי עם שלווה, בהירות וסדר.
                  <br />
                  במקרה הגרוע - עם כמה תובנות שלא היו לך קודם.
                </p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", lineHeight: 1.8, margin: "14px 0 0" }}>
                  רבקי
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
