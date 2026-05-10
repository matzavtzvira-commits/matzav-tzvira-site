"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" style={{ background: "#FFFFFF", padding: "48px 1.5rem 64px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* About Rivky */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "center" }}>
          {/* Photo */}
          <div style={{ order: 1 }}>
            <div style={{ width: "100%", maxWidth: 380, aspectRatio: "4/5", borderRadius: 24, margin: "0 auto", overflow: "hidden" }}>
              <img
                src="/rivky-salon.png"
                alt="רבקי וייס"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>

          {/* Text */}
          <div style={{ order: 2 }}>
            <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#21F0B0", background: "#124AF0", display: "inline-block", padding: "4px 14px", borderRadius: 50, marginBottom: 16 }}>
              נעים להכיר
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#124AF0", marginBottom: 8 }}>רבקי וייס</h2>
            <p style={{ fontSize: "1rem", color: "#555", marginBottom: 24, fontWeight: 600 }}>
              מייסדת מצב צבירה <span style={{ fontSize: "0.75em" }}>-</span> בעלת הקהילה הגדולה לנשים בשוק ההון
              <br />
              כותבת טור &quot;שוות הון&quot; במגזין &quot;בתוך המשפחה&quot;
            </p>

            <div style={{ borderRight: "4px solid #21F0B0", paddingRight: 20, marginBottom: 24 }}>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.9, color: "#292929" }}>
                לפני 6 שנים הייתי בדיוק כמוך <span style={{ fontSize: "0.75em" }}>-</span> פאנית מצליחה,
                <br />
                על הגז כל הזמן.
                ואז הגיע הרגע ששבר אותי, בצורה הכי טובה שיש.
              </p>
            </div>

            <div style={{ background: "#124AF0", color: "white", borderRadius: 16, padding: "20px 24px", marginBottom: 20, fontSize: "1rem", lineHeight: 1.8 }}>
              הסתכלתי על מזכירה שמרוויחה רבע ממה שאני הרווחתי.
              <br />
              וראיתי שהיא תגיע לחתונות הילדים ברווחה, לפנסיה בשלווה <span style={{ fontSize: "0.75em" }}>-</span>
              <br />
              <strong>בזמן שאני, ״העשירה״, אעבוד נון סטופ לסגור הלוואות.</strong>
              <br />
              ההבדל היחיד בינינו?
              <br />
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "inline-block", fontSize: "2rem", fontWeight: 800, color: "#FFFFFF" }}
              >
                ידע.
                <svg viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 70, display: "block", marginTop: 0 }} preserveAspectRatio="none">
                  <defs>
                    <filter id="aboutRedSketch">
                      <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed="6" result="noise" />
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                  <motion.path d="M4 5 Q75 3 150 6 Q225 9 296 5" stroke="#FA5C5C" strokeWidth="4" strokeLinecap="round" fill="none" filter="url(#aboutRedSketch)" opacity="0.95" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }} />
                  <motion.path d="M8 8 Q80 6 155 9 Q230 11 292 7" stroke="#FA5C5C" strokeWidth="2.5" strokeLinecap="round" fill="none" filter="url(#aboutRedSketch)" opacity="0.6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.65, ease: "easeOut" }} />
                </svg>
              </motion.span>
            </div>

            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#292929", marginBottom: 20 }}>
              החלטתי לצאת למסע <span style={{ fontSize: "0.75em" }}>-</span> לחקור, ללמוד, לאסוף <span style={{ fontSize: "0.75em" }}>-</span>
              ופשוט לחלוק את הכל עם כל נשות עמ&quot;י.
              שידעו. שיבינו. שלא תצא עוד אישה לחיים בלי זה.
            </p>

            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "#292929", marginBottom: 20 }}>
              זכיתי ללוות עשרות משפחות לשלווה.
              מאות נשים שהיום מבינות, יודעות <span style={{ fontSize: "0.75em" }}>-</span> <strong>וחלק מהמהפכה.</strong>
            </p>

            <a
              href="#pricing"
              style={{ position: "relative", display: "inline-block", textDecoration: "none", transition: "transform 0.2s", maxWidth: "100%" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-blue-new.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 43%" }} />
              <span style={{ position: "relative", zIndex: 1, color: "#FFFFFF", padding: "16px 44px", fontWeight: 700, fontSize: "1rem", display: "block" }}>
                אני רוצה להצטרף לתוכנית ←
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ display: "flex", justifyContent: "center", padding: "40px 0 0" }}>
        <div style={{ width: 280, height: 3, background: "linear-gradient(to right, transparent, #FA5C5C, transparent)", borderRadius: 2 }} />
      </div>
    </section>
  );
}
