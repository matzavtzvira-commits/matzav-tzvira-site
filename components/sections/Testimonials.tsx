"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote: "ביום שאחרי השיעור על כספים אבודים גיליתי פנסיה רדומה בסכום של 23,000 ש״ח - שלא ידעתי בכלל על קיומה. בהמלצת רבקי, שיניתי את המסלול, והיום אני צפויה לקבל מעל 750,000 ש״ח יותר! בלי להשקיע שקל נוסף - רק בזכות ידע ולחיצת כפתור אחת.",
    name: "משתתפת בתוכנית",
    highlight: "750,000 ₪ יותר לפנסיה",
  },
  {
    quote: "האמת? חשבתי שכבר מאוחר מדי לשנות משהו. בגיל 52, אחרי הקורס, הבנתי סוף־סוף כמה דמי הניהול גוזלים ממני בכל חודש. נכנסתי לפעולה, השוויתי, ביקשתי הצעות חדשות - והצלחתי להוריד את דמי הניהול ביותר מ-70%. המשמעות? רווח של כ-675,000 ₪ לפנסיה שלי.",
    name: "טובי ל, אם לשבעה",
    highlight: "675,000 ₪ חיסכון בדמי ניהול",
  },
  {
    quote: "הפסקתי לפחד מהמספרים. היום אני מבינה, שואלת, משווה, ומתמקחת בלי לחשוש. התחושה הזו - לדעת שהכסף שלי באמת עובד בשבילי - זו מתנה שלא תסולא בפז.",
    name: "חני ר, אם לחמישה",
    highlight: "עצמאות פיננסית מלאה",
  },
  {
    quote: "שוק ההון, S&P 500, אינפלציה... הכל נשמע לי כמו סינית. רבקי הפכה את הכי מורכב לפשוט וברור. כשעשיתי את החשבון והבנתי שהרווחתי לטווח הארוך קרוב למיליון ש\"ח - לא האמנתי למראה עיניי.",
    name: "שרית לוין",
    highlight: "מסינית למיליון שקלים",
  },
  {
    quote: "כשגיליתי כמה כסף איבדתי בקרן ההשתלמות הישנה שלי - פשוט כאב. היום אין מורה בצוות שאני לא עוצרת להסביר לה איך ההשקעות שלנו עובדות. זה לא יאומן כמה אנחנו מתאמצות להגדיל הכנסה, כשבאותו זמן אנחנו מאבדות מאות אלפי שקלים.",
    name: "יהודית הלר",
    highlight: "השיעור שהיינו חייבות לקבל כבר מזמן",
  },
  {
    quote: "אנחנו משקיעות שנים בלימודים ובעבודה, אבל שוכחות להשקיע מינימום זמן כדי להבין איפה הכסף שלנו נמצא. כל בחורה שיוצאת לחיים חייבת את הקורס הזה. ההבדל בין לדעת לבין בורות - שווה מאות אלפי שקלים.",
    name: "מיכל שרעבי",
    highlight: "ההשקעה הכי משתלמת בקריירה שלך",
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start 0.3"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section ref={sectionRef} style={{ background: "white", padding: "48px 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <motion.p style={{ scale, opacity, color: "#21F0B0", fontWeight: 700, fontSize: "0.9rem", letterSpacing: 1, marginBottom: 8, background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50 }}>
            תוצאות אמיתיות
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#124AF0", marginTop: 12 }}
          >
            זה לא סיסמה.
            <br />
            זה מה שקורה כשעושים את זה נכון.
          </motion.h2>
        </div>

        {/* Testimonials grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            marginBottom: 40,
          }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 240, damping: 22, delay: (i % 3) * 0.12 }}
              whileHover={{ y: -8, boxShadow: "0 20px 48px rgba(18,74,240,0.16)", transition: { duration: 0.22 } }}
              style={{
                background: "#FFFFFF",
                borderRadius: 20,
                padding: "28px 24px",
                border: "1px solid #124AF0",
                position: "relative",
                cursor: "default",
              }}
            >
              {/* Decorative circle */}
              <motion.img
                src="/testimonial-circle.png"
                alt=""
                animate={{ rotate: 360, scale: [1, 1.18, 0.92, 1.12, 1] }}
                transition={{ rotate: { duration: 6, repeat: Infinity, ease: "linear" }, scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } }}
                style={{ position: "absolute", top: 12, left: 12, width: 48, height: 48, opacity: 0.65, pointerEvents: "none", userSelect: "none" }}
              />

              {/* Quote mark */}
              <div style={{ fontSize: "3.5rem", color: "#21F0B0", lineHeight: 0.7, fontFamily: "Georgia, serif", marginBottom: 12 }}>״</div>

              {/* Highlight */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.12 + 0.2, duration: 0.4 }}
                style={{
                  background: "#124AF0",
                  color: "white",
                  borderRadius: 8,
                  padding: "6px 14px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  display: "inline-block",
                  marginBottom: 16,
                }}
              >
                {t.highlight}
              </motion.div>

              <p style={{ fontSize: "0.98rem", lineHeight: 1.8, color: "#292929", marginBottom: 20 }}>
                {t.quote}
              </p>

              <div style={{ fontWeight: 700, color: "#124AF0", fontSize: "0.9rem" }}>
                <span style={{ fontSize: "0.75em" }}>-</span> {t.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expert recommendation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          style={{ position: "relative", borderRadius: 28, overflow: "hidden", marginTop: 8, background: "#060D3C" }}
        >
          {/* Animated glow border */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 28, padding: 2, background: "linear-gradient(135deg, #21F0B0, #124AF0, #FA5C5C, #21F0B0)", animation: "borderGlow 3s linear infinite", backgroundSize: "300% 300%", zIndex: 0 }}>
            <div style={{ background: "#060D3C", borderRadius: 26, width: "100%", height: "100%" }} />
          </div>

          <div style={{ position: "relative", zIndex: 1, padding: "40px 48px", display: "flex", gap: 36, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                style={{ position: "relative", display: "inline-block", marginBottom: 16 }}
              >
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-green.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 43%" }} />
                <span style={{ position: "relative", zIndex: 1, color: "#070C24", padding: "10px 28px", fontWeight: 700, fontSize: "0.9rem", display: "block", whiteSpace: "nowrap" }}>
                  המלצה מקצועית
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{ fontSize: "1.05rem", lineHeight: 2, color: "rgba(255,255,255,0.88)", marginBottom: 20, textShadow: "0 0 30px rgba(33,240,176,0.15)" }}
              >
                ״נהניתי מאד מהאופן שבו הקורס הזה מצליח להעביר את החומר בשפה קלילה ונעימה ובמקביל אינו מתפשר על מקצועיות ודיוק. השימוש בדאשבורדים דיגיטליים ובכלים מבוססי בינה מלאכותית הופכת את התיאוריה לתוכנית פעולה יעילה ומניבה.״
              </motion.p>

              <span style={{ display: "inline-block" }}>
                <div style={{ fontWeight: 800, color: "#21F0B0", fontSize: "1rem" }}>נחום ברוק</div>
                <svg viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 100, display: "block", marginTop: 2 }} preserveAspectRatio="none">
                  <defs>
                    <filter id="expertSketch">
                      <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed="4" result="noise" />
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                  <motion.path d="M4 5 Q75 3 150 6 Q225 9 296 5" stroke="#21F0B0" strokeWidth="2" strokeLinecap="round" fill="none" filter="url(#expertSketch)" opacity="0.95" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }} />
                  <motion.path d="M8 8 Q80 6 155 9 Q230 11 292 7" stroke="#21F0B0" strokeWidth="1.2" strokeLinecap="round" fill="none" filter="url(#expertSketch)" opacity="0.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }} />
                </svg>
              </span>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", marginTop: 3 }}>יועץ פיננסי מומחה | מצב צבירה</div>
            </div>
          </div>
        </motion.div>

        <style>{`
          @keyframes borderGlow {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    </section>
  );
}
