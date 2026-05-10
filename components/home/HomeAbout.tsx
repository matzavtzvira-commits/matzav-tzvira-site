"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeAbout() {
  return (
    <section
      id="about"
      style={{
        position: "relative",
        padding: "56px 1.5rem 48px",
        overflow: "hidden",
        background: "#FFFFFF",
      }}
    >

      <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 40, display: "inline-block" }}>
          <h2 style={{ color: "#070C24", fontSize: "clamp(1.9rem, 4vw, 2.8rem)", fontWeight: 800, margin: 0 }}>
            השליחות שלי
          </h2>
          <svg
            viewBox="0 0 300 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", display: "block", marginTop: -10 }}
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="sketch-about">
                <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed="5" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
            <motion.path d="M4 5 Q75 3 150 6 Q225 9 296 5" stroke="#FA5C5C" strokeWidth="2.5" strokeLinecap="round" fill="none" filter="url(#sketch-about)" opacity="0.95"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }} />
            <motion.path d="M8 8 Q80 6 155 9 Q230 11 292 7" stroke="#FA5C5C" strokeWidth="1.4" strokeLinecap="round" fill="none" filter="url(#sketch-about)" opacity="0.6"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }} />
          </svg>
        </motion.div>

        {/* story + mission text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: 22 }}>

          <div style={{ borderRight: "4px solid #E8EDFF", paddingRight: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ fontSize: "1.05rem", color: "#292929", lineHeight: 1.8, margin: 0, fontWeight: 700 }}>
              מוצאי שבת. חורף. 9 בערב.
            </p>
            <p style={{ fontSize: "1rem", color: "#444", lineHeight: 2, margin: 0 }}>
              הילדים ישנו. הבית מסודר. יש זמן.
              <br />
              החלטתי לנצל - פתחתי את הקלסר עם הדוחות של תוכנית החיסכון לחתונת הילדים.
              <br />
              רציתי פשוט לדעת מה אני משלמת ומה אני מקבלת.
            </p>
            <p style={{ fontSize: "1rem", color: "#444", lineHeight: 2, margin: 0 }}>
              לקחתי דף ועט. התחלתי לחשב.
              <br />
              <strong style={{ color: "#292929" }}>מחשבת ימינה, מחשבת שמאלה - ואז ראיתי משהו שהטריף אותי.</strong>
            </p>
            <p style={{ fontSize: "1rem", color: "#444", lineHeight: 2, margin: 0 }}>
              1,200 שקל כל חודש. 18 שנה. בשביל מה?
              <br />
              בשביל שבעוד 18 שנה - אוכל לקחת הלוואה בריבית &quot;טובה&quot;.
              <br />
              <em style={{ color: "#666" }}>שילמתי שנים כדי להיכנס לחוב.</em>
            </p>
            <p style={{ fontSize: "1rem", color: "#444", lineHeight: 2, margin: 0 }}>
              רגע. יש לי אותו כסף, אותה הוראת קבע - ואם אני מפנה אותו למדדים רחבים,
              בתשואה של כ-10% שנתי, אחרי 18 שנה הכסף הזה פשוט... שלי. בלי החזרים. רק שלי.
            </p>
            <p style={{ fontSize: "1rem", color: "#444", lineHeight: 2, margin: 0 }}>
              עשיתי שוב את החשבון. ועוד פעם. התוצאה לא השתנתה.
              <br />
              <strong style={{ color: "#124AF0" }}>באותו לילה שיניתי את ההוראת קבע.</strong>
            </p>
            <p style={{ fontSize: "0.88rem", color: "#999", lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>
              כל מקרה לגופו - זה היה הנכון בשבילי. המטרה שלי היא שגם את תדעי לשבת עם הנתונים שלך ולהחליט בעצמך.
            </p>
          </div>

          <div style={{ borderRight: "4px solid #21F0B0", paddingRight: 20 }}>
            <p style={{ fontSize: "1.13rem", fontWeight: 800, color: "#070C24", lineHeight: 2, margin: 0 }}>
              פעם ידע = כוח
              <br />
              היום ידע = כסף
              <br />
              ואת הידע הזה?
              <br />
              אף אחד לא נתן לנו
            </p>
          </div>

          <p style={{ fontSize: "1.08rem", color: "#292929", lineHeight: 1.9, margin: 0, fontWeight: 500 }}>
            השליחות שלי היא לשנות את זה. לתת לכל אישה שסוחבת כל כך הרבה על הכתפיים
            <br />
            <span style={{ fontSize: "0.75em" }}>-</span> את הכלים שיאפשרו לה להוריד את הרגל מהגז. לנשום. ולחזור לאמהות שלה.
          </p>

          <p style={{ fontSize: "1.2rem", fontWeight: 800, color: "#124AF0", lineHeight: 1.6, margin: 0 }}>
            אני פה לצעוק שכולן ידעו.
          </p>
        </motion.div>

        {/* name + button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="about-bottom"
          style={{ marginTop: 48, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>

          <div>
            <p style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, color: "#070C24", margin: 0, lineHeight: 1.1 }}>
              רבקי וייס
            </p>
            <div style={{ marginTop: 8, height: 4, width: "100%", borderRadius: 4, background: "linear-gradient(to left, #21F0B0, #124AF0)" }} />
            <p style={{ marginTop: 8, fontSize: "0.88rem", color: "#666", fontWeight: 600 }}>
              מייסדת מצב צבירה <span style={{ fontSize: "0.75em" }}>-</span> בעלת הקהילה הגדולה לנשים בשוק ההון
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
            <p style={{ fontSize: "0.95rem", color: "#555", margin: 0 }}>
              329 נשים כבר השלימו את השיעור.
            </p>
            <Link href="/course" className="about-btn" style={{ position: "relative", display: "inline-block", textDecoration: "none", maxWidth: "100%" }}>
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-blue-new.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 41%" }} />
              <span style={{ position: "relative", zIndex: 1, color: "#FFFFFF", padding: "20px 64px", fontWeight: 800, fontSize: "1.05rem", display: "block", textShadow: "0 0 12px rgba(255,255,255,0.8)" }}>
                אני רוצה ללמוד גם <span className="arrow-anim">←</span>
              </span>
            </Link>
          </div>

        </motion.div>

      </div>
      <style>{`
        @media(max-width:640px){
          .about-bottom { justify-content: flex-start !important; }
          .about-btn span { padding: 14px 36px !important; white-space: normal !important; font-size: 0.95rem !important; }
        }
      `}</style>
    </section>
  );
}
