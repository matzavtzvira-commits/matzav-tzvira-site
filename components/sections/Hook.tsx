"use client";
import { motion } from "framer-motion";

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
            גידלה ילדים, חתנה אותם, הגיעה לקצה המסלול.
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
            כ&quot;כ הרבה שנות עבודה. כ&quot;כ הרבה כסף שאבד. כ&quot;כ פשוט למנוע.
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

        {/* Bridge */}
        <div style={{ textAlign: "center", margin: "32px 0 28px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, rgba(33,240,176,0), rgba(33,240,176,0.7))" }} />
          <span style={{ fontSize: "0.92rem", color: "#21F0B0", fontWeight: 700, letterSpacing: 2 }}>
            ועכשיו - בואי נדבר עלייך
          </span>
          <div style={{ width: 1, height: 24, background: "linear-gradient(to bottom, rgba(33,240,176,0.7), rgba(33,240,176,0))" }} />
        </div>

        {/* White card */}
        <div style={{ marginBottom: 36, borderRadius: 40, overflow: "hidden", boxShadow: "0 16px 56px rgba(0,0,0,0.35)", border: "1.5px solid rgba(255,255,255,0.18)" }}>
          <div style={{ background: "#ffffff", padding: "48px 64px 56px", textAlign: "right" }}>

            {/* Yes Set */}
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#124AF0", marginBottom: 16 }}>תני לי לנחש.</p>
              {[
                "את עובדת קשה — וכל שקל בא ממאמץ",
                "בסוף החודש יש תמיד יותר חודש מכסף",
                "יש לך פנסיה, השתלמות, חיסכון לכל ילד — אבל מושג אין מה קורה שם",
                "ואת לא בטוחה שיש לך מי שבאמת מסביר לך",
              ].map((q, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10, textAlign: "right" }}>
                  <span style={{ background: "#124AF0", color: "#fff", fontSize: "0.72rem", fontWeight: 800, padding: "3px 10px", borderRadius: 50, whiteSpace: "nowrap", marginTop: 3, flexShrink: 0 }}>כן</span>
                  <p style={{ fontSize: "1rem", color: "#222", lineHeight: 1.6, margin: 0 }}>{q}</p>
                </div>
              ))}
              <p style={{ fontSize: "1rem", fontWeight: 700, color: "#124AF0", marginTop: 16, marginBottom: 0 }}>
                אם ענית כן — המשך הדף הזה כתוב בשבילך.
              </p>
            </div>

            {/* Part 1 */}
            <span style={{ display: "inline-block", marginBottom: 20 }}>
              <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "#124AF0", display: "block" }}>
                תני לי לנחש איך היום שלך נראה
              </span>
              <svg viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block", marginTop: 3 }} preserveAspectRatio="none">
                <defs>
                  <filter id="blueSketch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
                <motion.path d="M4 5 Q75 3 150 6 Q225 9 296 5" stroke="#124AF0" strokeWidth="2" strokeLinecap="round" fill="none" filter="url(#blueSketch)" opacity="0.95" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }} />
                <motion.path d="M8 8 Q80 6 155 9 Q230 11 292 7" stroke="#124AF0" strokeWidth="1.2" strokeLinecap="round" fill="none" filter="url(#blueSketch)" opacity="0.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }} />
              </svg>
            </span>
            <p style={{ fontSize: "1rem", color: "#222", lineHeight: 2.2, marginBottom: 32 }}>
              את עובדת קשה.
              <br />
              כל שקל שמכניסה <span style={{ fontSize: "0.75em" }}>-</span> בא ממאמץ.
              <br />
              ובינתיים, יש לך כסף שכבר עובד <span style={{ fontSize: "0.75em" }}>-</span> רק לא בשבילך.
              <br />
              <strong>לא כי את לא חכמה <span style={{ fontSize: "0.75em" }}>-</span> כי אף אחד לא לימד אותך לנהל אותו.</strong>
            </p>

            {/* Part 2 */}
            <span style={{ display: "inline-block", marginBottom: 16 }}>
              <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "#FA5C5C", display: "block" }}>
                הסוד שאף אחד לא אמר לך
              </span>
              <svg viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block", marginTop: 3 }} preserveAspectRatio="none">
                <defs>
                  <filter id="redSketch2">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed="9" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
                <motion.path d="M4 5 Q75 3 150 6 Q225 9 296 5" stroke="#FA5C5C" strokeWidth="2" strokeLinecap="round" fill="none" filter="url(#redSketch2)" opacity="0.95" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }} />
                <motion.path d="M8 8 Q80 6 155 9 Q230 11 292 7" stroke="#FA5C5C" strokeWidth="1.2" strokeLinecap="round" fill="none" filter="url(#redSketch2)" opacity="0.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }} />
              </svg>
            </span>
            <p style={{ fontSize: "1rem", color: "#222", lineHeight: 2.2, marginBottom: 36 }}>
              יש לך פנסיה? קרן השתלמות? חיסכון לכל ילד? גמל?
              <br />
              <em style={{ color: "#666", fontSize: "0.95rem" }}>זה לא קנסות <span style={{ fontSize: "0.75em" }}>-</span> זה הכסף הכי טוב שיש לך. ואת לא מנהלת אותו.</em>
            </p>

            {/* Highlight */}
            <span style={{ display: "inline-block", marginBottom: 32 }}>
              <strong style={{ fontSize: "1.4rem", display: "block", color: "#111" }}>
                שבוע של ידע <span style={{ fontSize: "0.75em" }}>-</span> מאות אלפי שקלים רווח.
                <br />
                <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#124AF0" }}>
                  ותצאי עם תיק ההשקעות שלך <span style={{ fontSize: "0.75em" }}>-</span> בנוי. מותאם. מתחיל לעבוד.
                </span>
              </strong>
              <svg viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block", marginTop: 4 }} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="triColor" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FA5C5C" />
                    <stop offset="50%" stopColor="#124AF0" />
                    <stop offset="100%" stopColor="#21F0B0" />
                  </linearGradient>
                  <filter id="triSketch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed="11" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
                <motion.path d="M4 5 Q75 3 150 6 Q225 9 296 5" stroke="url(#triColor)" strokeWidth="2.5" strokeLinecap="round" fill="none" filter="url(#triSketch)" opacity="0.95" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }} />
                <motion.path d="M8 8 Q80 6 155 9 Q230 11 292 7" stroke="url(#triColor)" strokeWidth="1.2" strokeLinecap="round" fill="none" filter="url(#triSketch)" opacity="0.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }} />
              </svg>
            </span>

            {/* Closing punch */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ borderTop: "1px solid #E8EDFF", paddingTop: 28, textAlign: "center" }}
            >
              <p style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontWeight: 900, color: "#111", lineHeight: 1.6, margin: 0 }}>
                הזמן הכי טוב להתחיל היה אתמול.
                <br />
                <span style={{ color: "#124AF0" }}>ההזדמנות השנייה היא היום.</span>
              </p>
            </motion.div>

          </div>
        </div>

        <a
          href="#about"
          style={{ position: "relative", display: "inline-block", textDecoration: "none", transition: "transform 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-blue-new.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 43%" }} />
          <span style={{ position: "relative", zIndex: 1, color: "#FFFFFF", padding: "16px 52px", fontWeight: 700, fontSize: "1.05rem", display: "block" }}>
            אז מה עושים? ←
          </span>
        </a>
      </div>
    </section>
  );
}
