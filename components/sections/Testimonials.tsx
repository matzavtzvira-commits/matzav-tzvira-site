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
    quoteOverride: "אנחנו משקיעות שנים בלימודים ובעבודה, אבל שוכחות להשקיע מינימום זמן כדי להבין איפה הכסף שלנו נמצא. כל בחורה שיוצאת לחיים חייבת את התוכנית הזו. ההבדל בין לדעת לבין בורות - שווה מאות אלפי שקלים.",
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
                {(t as { quoteOverride?: string }).quoteOverride ?? t.quote}
              </p>

              <div style={{ fontWeight: 700, color: "#124AF0", fontSize: "0.9rem" }}>
                <span style={{ fontSize: "0.75em" }}>-</span> {t.name}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
