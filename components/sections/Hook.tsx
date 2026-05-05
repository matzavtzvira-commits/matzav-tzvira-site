"use client";
import { motion } from "framer-motion";

export default function Hook() {
  return (
    <section style={{ background: "#124AF0", padding: "48px 1.5rem", textAlign: "center" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#21F0B0", marginBottom: 20, letterSpacing: 1 }}>
          רגע של כנות <span style={{ fontSize: "0.75em" }}>—</span>
        </p>
        <h2 style={{
          fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
          fontWeight: 900,
          fontFamily: "'Rubik', sans-serif",
          lineHeight: 1.15,
          color: "#FFFFFF",
          marginBottom: 16,
        }}>
          כשאת חושבת על לחתן
          <br />
          את מירי שלך <span style={{ fontSize: "0.75em" }}>—</span>
        </h2>
        <p style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.35rem)", color: "rgba(255,255,255,0.88)", lineHeight: 1.9, marginBottom: 36 }}>
          יש לך מושג מאיפה יבוא הכסף?
          <br />
          <span style={{ color: "#21F0B0", fontWeight: 700, display: "inline-block" }}>
            את ראויה לחגוג את השמחה <span style={{ fontSize: "0.75em" }}>—</span>
            <br />
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block", fontSize: "1.4em", fontWeight: 900 }}
            >
              בשמחה.
              <svg viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block", marginTop: 2 }} preserveAspectRatio="none">
                <defs>
                  <filter id="hookSketch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed="7" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
                <motion.path d="M4 5 Q75 3 150 6 Q225 9 296 5" stroke="#21F0B0" strokeWidth="2" strokeLinecap="round" fill="none" filter="url(#hookSketch)" opacity="0.95" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }} />
                <motion.path d="M8 8 Q80 6 155 9 Q230 11 292 7" stroke="#21F0B0" strokeWidth="1.2" strokeLinecap="round" fill="none" filter="url(#hookSketch)" opacity="0.6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }} />
              </svg>
            </motion.span>
          </span>
        </p>

        {/* White card */}
        <div style={{ marginBottom: 36, borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}>
          <div style={{ background: "#124AF0", height: 14 }} />
          <div style={{ background: "#ffffff", padding: "48px 64px 56px", textAlign: "right" }}>

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
              בית, ילדים, עבודה, שוב בית.
              <br />
              עד שנזכרת לנשום <span style={{ fontSize: "0.75em" }}>—</span> כבר ערב.
              <br />
              ובינתיים <span style={{ fontSize: "0.75em" }}>—</span> מאות אלפי שקלים שלך עובדים בשביל מישהו אחר.
              <br />
              <strong>לא כי את לא חכמה <span style={{ fontSize: "0.75em" }}>—</span> כי אף אחד לא לימד אותך.</strong>
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
              <em style={{ color: "#666", fontSize: "0.95rem" }}>זה לא קנסות <span style={{ fontSize: "0.75em" }}>—</span> זה הכסף הכי טוב שיש לך. ואת לא מנהלת אותו.</em>
            </p>

            {/* Highlight */}
            <span style={{ display: "inline-block", marginBottom: 32 }}>
              <strong style={{ fontSize: "1.4rem", display: "block", color: "#111" }}>
                שבוע של ידע <span style={{ fontSize: "0.75em" }}>—</span> מאות אלפי שקלים רווח.
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
          <span style={{ position: "relative", zIndex: 1, color: "#FFFFFF", padding: "16px 52px", fontWeight: 700, fontSize: "1.05rem", display: "block", whiteSpace: "nowrap" }}>
            אז מה עושים? ←
          </span>
        </a>
      </div>
    </section>
  );
}
