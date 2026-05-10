"use client";
const PAYMENT_URL = "https://secure.cardcom.solutions/EA/EA5/dKoPGzcdZEqxgTyXuRf8lA/PaymentSP";

const includes = [
  "32 שיעורים בגובה העיניים",
  "14 דשבורדים דיגיטליים מבוססי בינה מלאכותית",
  "מדריכים יד-ביד לכל נושא",
  "ליווי מלא לכל שאלה במייל",
  "קהילת המאסטריות",
  "גישה לשנה שלמה",
  "10 בונוסים ומדריכים בלעדיים",
  "אחריות מלאה 14 יום",
];

export default function Pricing() {
  const handleBuy = () => { window.location.href = PAYMENT_URL; };

  return (
    <section id="pricing" style={{ background: "#F4F7FF", padding: "48px 1.5rem" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.9rem", letterSpacing: 1, marginBottom: 8, background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50 }}>
            ההשקעה שלך
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#124AF0", marginTop: 12, marginBottom: 8 }}>
            כמה עולה לא לדעת?
          </h2>
          <p style={{ color: "#555", fontSize: "1rem", maxWidth: 500, margin: "0 auto" }}>
            נשים בתוכנית חסכו בממוצע מאות אלפי שקלים <span style={{ fontSize: "0.75em" }}>-</span> רק מלדעת לשאול את השאלות הנכונות.
          </p>
        </div>

        {/* Scarcity banner */}
        <div style={{ background: "#FFF3CD", border: "1.5px solid #F5A623", borderRadius: 14, padding: "14px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12, textAlign: "right" }}>
          <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>⚠️</span>
          <p style={{ margin: 0, fontSize: "0.95rem", color: "#7A4F00", fontWeight: 700, lineHeight: 1.6 }}>
            בגלל בדיקת התיק האישית שכלולה בתוכנית — אנחנו מגבילות מקומות.
            <span style={{ fontWeight: 400, display: "block", fontSize: "0.88rem", marginTop: 2 }}>לא נוכל לתת ליווי אישי לכמות בלתי מוגבלת. ברגע שהמקומות מלאים — הדלת נסגרת.</span>
          </p>
        </div>

        {/* Single plan card */}
        <div className="pricing-card" style={{ background: "linear-gradient(160deg, #124AF0 0%, #0a38c4 100%)", color: "white", borderRadius: 28, padding: "48px 40px", position: "relative", boxShadow: "0 20px 60px rgba(18,74,240,0.3)", textAlign: "center" }}>
          <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", background: "#21F0B0", color: "#124AF0", borderRadius: 50, padding: "6px 24px", fontSize: "0.88rem", fontWeight: 800, whiteSpace: "nowrap" }}>
            כולל הכל <span style={{ fontSize: "0.75em" }}>-</span> בלי הפתעות
          </div>

          <div style={{ marginBottom: 8, marginTop: 8 }}>
            <div style={{ fontSize: "3.8rem", fontWeight: 800, lineHeight: 1 }}>297 ₪</div>
            <div style={{ opacity: 0.8, fontSize: "1rem", marginTop: 8 }}>או 3 תשלומים נוחים של 99 ₪</div>
          </div>

          <div style={{ width: 60, height: 3, background: "#21F0B0", borderRadius: 2, margin: "24px auto" }} />

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "flex", flexDirection: "column", gap: 12, textAlign: "right" }}>
            {includes.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: 12, fontSize: "1rem", alignItems: "flex-start" }}>
                <span style={{ color: "#21F0B0", fontWeight: 800, flexShrink: 0 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>

          {/* Free portfolio review highlight */}
          <div style={{ background: "rgba(33,240,176,0.12)", border: "1.5px solid #21F0B0", borderRadius: 16, padding: "20px 24px", marginBottom: 28, textAlign: "right" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ background: "#21F0B0", color: "#070C24", fontSize: "0.75rem", fontWeight: 800, padding: "3px 10px", borderRadius: 50, whiteSpace: "nowrap", flexShrink: 0 }}>
                כלול בחינם
              </span>
              <p style={{ fontWeight: 800, fontSize: "1rem", color: "#FFFFFF", margin: 0 }}>
                בדיקת תיק פיננסי אישית
              </p>
            </div>
            <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.75, margin: 0 }}>
              סוכנת ביטוח מורשית תצור איתך קשר ותבדוק את כל התיק שלך <span style={{ fontSize: "0.75em" }}>-</span>
              <br />
              פנסיה, ביטוחים, דמי ניהול, מסלולים <span style={{ fontSize: "0.75em" }}>-</span> ותמליץ על שינויים.
              <br />
              <span style={{ color: "#21F0B0", fontWeight: 700 }}>שירות שאנשים משלמים עליו. כלול בתוכנית.</span>
            </p>
          </div>

          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px 18px", marginBottom: 24, textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.7 }}>
              <strong style={{ color: "#21F0B0" }}>חנוקה כלכלית? זה בדיוק בשבילך.</strong>
              <br />
              את לא צריכה כסף פנוי. את צריכה לדעת איפה הכסף שכבר יש לך הולך לאיבוד.
            </p>
          </div>

          <button
            onClick={handleBuy}
            style={{ position: "relative", background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", display: "inline-block", padding: 0, transition: "transform 0.2s", maxWidth: "100%" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-green.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 43%" }} />
            <span style={{ position: "relative", zIndex: 1, color: "#070C24", padding: "18px 56px", fontWeight: 800, fontSize: "1.15rem", display: "block" }}>
              אני מצטרפת לתוכנית ←
            </span>
          </button>

          <p style={{ opacity: 0.7, fontSize: "0.88rem", marginTop: 16 }}>
            תשלום מאובטח | אחריות 14 יום <span style={{ fontSize: "0.75em" }}>-</span> לא מרוצה? מחזירים הכל בלי שאלות
          </p>
          <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", marginTop: 8, fontStyle: "italic" }}>
            המקומות מוגבלים בגלל הבדיקה האישית. כשהם מלאים — הטופס נסגר.
          </p>
          <p style={{ fontSize: "0.9rem", color: "#21F0B0", marginTop: 10, fontWeight: 600, opacity: 0.9 }}>
            המחיר נגיש בכוונה. כי מגיעה לכל אישה לדעת.
          </p>
        </div>
      </div>
      <style>{`
        @media(max-width:520px){
          .pricing-card { padding: 36px 20px !important; border-radius: 20px !important; }
        }
      `}</style>
    </section>
  );
}
