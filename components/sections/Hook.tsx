"use client";
import { motion } from "framer-motion";
import posthog from "posthog-js";

const PAYMENT_URL = "https://secure.cardcom.solutions/EA/EA5/dKoPGzcdZEqxgTyXuRf8lA/PaymentSP";

export default function Hook() {
  return (
    <section id="hook" style={{ background: "#124AF0", padding: "48px 1.5rem", textAlign: "center" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#21F0B0", marginBottom: 20, letterSpacing: 1 }}>
          סיפור אמיתי
        </p>
        <h2 style={{
          fontSize: "clamp(2rem, 5vw, 3.4rem)",
          fontWeight: 900,
          fontFamily: "'Rubik', sans-serif",
          lineHeight: 1.25,
          color: "#FFFFFF",
          marginBottom: 16,
        }}>
          ישבתי מולה
          <br />
          ולא הצלחתי לשמור פנים.
        </h2>
        <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.9, marginBottom: 36 }}>
          הפגישה שגרמה לי להבין למה אני עושה את מה שאני עושה.
        </p>

        {/* Client story */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: "rgba(0,0,0,0.25)", borderRadius: 16, padding: "36px 40px", marginBottom: 20, textAlign: "right", borderRight: "4px solid #21F0B0", boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 2, margin: "0 0 16px" }}>
            אישה מקסימה. 36 שנה באותה עבודה. 8 שעות ביום.
            <br />
            גידלה ילדים, חיתנה אותם, הגיעה לקצה המסלול.
          </p>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 2, margin: "0 0 16px" }}>
            ביחד פתחנו את הדוחות של הפנסיה שלה.
          </p>
          <p style={{ fontSize: "2rem", fontWeight: 900, color: "#21F0B0", margin: "0 0 8px", lineHeight: 1.2 }}>
            320,000 ₪
          </p>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", margin: "0 0 20px", fontStyle: "italic" }}>
            במקום קרוב ל-2 מיליון שקל. אחרי 36 שנה.
          </p>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 2, margin: "0 0 16px" }}>
            הפער? לא גנב. לא רמאות. לא משבר.
            <br />
            <strong style={{ color: "#FFFFFF" }}>מחוסר ידע בלבד.</strong>
          </p>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", lineHeight: 2, margin: "0 0 20px" }}>
            היא סמכה על הבוס - שזה לא בדיוק התפקיד שלו.
            <br />
            על הסוכן - שיש לו אינטרסים משלו.
            <br />
            ועל עצמה - שלא ידעה מה לשאול.
          </p>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 2, margin: "0 0 16px" }}>
            כל כך הרבה שנות עבודה. כל כך הרבה כסף שאבד. כל כך פשוט למנוע.
          </p>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 16, marginBottom: 16 }}>
            <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 2, margin: "0 0 10px" }}>
              לצערי, כבר לא היה הרבה מה לשנות עבורה.
              <br />
              <strong style={{ color: "#FA5C5C" }}>הרכבת שלה כבר עזבה.</strong>
            </p>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.9, margin: "0 0 12px" }}>
              ריבית דריבית עובדת על דבר אחד בלבד <span style={{ fontSize: "0.75em" }}>-</span> <strong style={{ color: "#FFFFFF" }}>זמן.</strong>
              <br />
              ככל שמתחילות מוקדם יותר, הכסף עובד יותר שנים, ומכפיל את עצמו יותר פעמים.
              <br />
              כל שנה שעוברת בלי לדעת <span style={{ fontSize: "0.75em" }}>-</span> <strong style={{ color: "#21F0B0" }}>שווה מאות אלפי שקלים שלא יחזרו.</strong>
            </p>
            <p style={{ fontSize: "0.95rem", color: "#21F0B0", fontWeight: 700, margin: 0, lineHeight: 1.7 }}>
              הרכבת שלך עדיין בתחנה.
              <br />
              <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 400, fontSize: "0.9rem" }}>השאלה היחידה היא: עד מתי תמתיני לעלות?</span>
            </p>
          </div>

          <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", margin: 0, fontStyle: "italic" }}>
            כל מקרה לגופו - אבל הסיפור הזה חזר אצלי יותר מפעם אחת. ולכן אני כאן.
          </p>
        </motion.div>

        {/* Closing punch */}
        <p style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.4rem)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.6, margin: "0 0 28px" }}>
          הזמן הכי טוב להתחיל היה אתמול.
          <br />
          <span style={{ color: "#21F0B0" }}>ההזדמנות השנייה היא היום.</span>
        </p>

        <a
          href={PAYMENT_URL}
          onClick={() => posthog.capture("checkout_click", { location: "story" }, { transport: "sendBeacon" })}
          style={{ position: "relative", display: "inline-block", textDecoration: "none", transition: "transform 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-green.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 43%" }} />
          <span style={{ position: "relative", zIndex: 1, color: "#070C24", padding: "16px 52px", fontWeight: 800, fontSize: "1.05rem", display: "block" }}>
            אני עולה על הרכבת ←
          </span>
        </a>
      </div>
    </section>
  );
}
