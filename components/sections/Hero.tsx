"use client";
import { motion } from "framer-motion";

const PAYMENT_URL = "https://secure.cardcom.solutions/EA/EA5/dKoPGzcdZEqxgTyXuRf8lA/PaymentSP";

export default function Hero() {
  return (
    <section style={{
      background: "radial-gradient(ellipse at 50% 30%, #1535B5 0%, #060D3C 65%)",
      paddingTop: 100,
      paddingBottom: 64,
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", width: "100%" }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56, alignItems: "center" }}>

          {/* RIGHT - text */}
          <div className="hero-text" style={{ textAlign: "right" }}>

            {/* MUST */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ color: "#FFFFFF", fontSize: "0.9rem", fontWeight: 700, marginBottom: 0, letterSpacing: 2 }}>תוכנית</p>
              <div style={{ display: "flex", justifyContent: "flex-end", lineHeight: 1, direction: "ltr" }}>
                {[
                  { letter: "M", color: "#FFFFFF" },
                  { letter: "U", color: "#21F0B0" },
                  { letter: "S", color: "#FA5C5C" },
                  { letter: "T", color: "#FFFFFF" },
                ].map(({ letter, color }, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: "inline-block", fontSize: "clamp(2.2rem, 4.8vw, 4rem)", fontWeight: 900, color, fontFamily: "'Rubik', sans-serif", letterSpacing: "0.04em" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.4 }}
                style={{ color: "#FFFFFF", fontSize: "0.95rem", fontWeight: 700, marginTop: 2, letterSpacing: 1 }}
              >
                לכל אישה
              </motion.p>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800, lineHeight: 1.35, margin: "0 0 12px", color: "#FFFFFF" }}>
              הגיע הזמן שגם הכסף שלך
              <br />
              יעשה השתדלות <span style={{ fontSize: "0.75em" }}>-</span>
              <br />
              <span style={{ color: "#FA5C5C", display: "inline-block" }}>
                לא רק את.
                <svg viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 140, display: "block", marginTop: 1 }} preserveAspectRatio="none">
                  <defs>
                    <filter id="heroSketch">
                      <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed="5" result="noise" />
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                  </defs>
                  <motion.path d="M4 5 Q75 3 150 6 Q225 9 296 5" stroke="#FA5C5C" strokeWidth="2" strokeLinecap="round" fill="none" filter="url(#heroSketch)" opacity="0.95" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 1.0, ease: "easeOut" }} />
                  <motion.path d="M8 8 Q80 6 155 9 Q230 11 292 7" stroke="#FA5C5C" strokeWidth="1.2" strokeLinecap="round" fill="none" filter="url(#heroSketch)" opacity="0.6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 1.15, ease: "easeOut" }} />
                </svg>
              </span>
            </h1>

            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 16 }}>
              הידע הפיננסי שהיה צריך ללמד אותנו בבית הספר.
              <br />
              שוק ההון, פנסיה, השקעות, דמי ניהול <span style={{ fontSize: "0.75em" }}>-</span> בשפה שלנו, פעם אחת ולתמיד.
            </p>
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "#21F0B0", lineHeight: 1.7, marginBottom: 16, textShadow: "0 0 12px rgba(33,240,176,0.5)" }}>
              תיכנסי ללא ידע.
              <br />
              תצאי עם תיק השקעות שבנית בעצמך <span style={{ fontSize: "0.75em" }}>-</span> מותאם לך, מתחיל לעבוד.
            </p>

            <span style={{ display: "inline-block", marginBottom: 24 }}>
              <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: "0 0 4px", fontStyle: "italic" }}>
                הכל מהספה. בנעלי בית. בקצב שלך.
              </p>
              <svg viewBox="0 0 300 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }} preserveAspectRatio="none">
                <defs>
                  <filter id="slipSketch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed="7" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                  <linearGradient id="slipGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#21F0B0" />
                    <stop offset="100%" stopColor="#FA5C5C" />
                  </linearGradient>
                </defs>
                <motion.path d="M4 4 Q75 2 150 4 Q225 6 296 4" stroke="url(#slipGrad)" strokeWidth="2" strokeLinecap="round" fill="none" filter="url(#slipSketch)" opacity="0.85" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 1.3, ease: "easeOut", repeat: Infinity, repeatDelay: 3 }} />
              </svg>
            </span>

            {/* CTAs */}
            <div className="hero-cta" style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "flex-start", marginBottom: 28, transform: "translateX(40px)" }}>
              <a
                href={PAYMENT_URL}
                style={{ position: "relative", display: "inline-block", textDecoration: "none", transition: "transform 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-blue-new.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 43%" }} />
                <span style={{ position: "relative", zIndex: 1, color: "#FFFFFF", padding: "14px 40px", fontWeight: 800, fontSize: "0.95rem", display: "block" }}>
                  אני רוצה להפסיק לעבוד לבד ←
                </span>
              </a>
            </div>

          </div>

          {/* LEFT - slippers image */}
          <div className="hero-video" style={{ overflow: "hidden", borderRadius: 24, position: "relative", height: 420 }}>
            <img
              src="/slippers-hero.jpg"
              alt="שוק ההון - בנעלי בית"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

        </div>
      </div>

      {/* Scroll arrow */}
      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        {[0, 1, 2].map((i) => (
          <svg key={i} width="32" height="18" viewBox="0 0 32 18" fill="none"
            style={{ animation: `arrowBounce 1.5s ease-in-out ${i * 0.3}s infinite` }}>
            <polyline points="2,2 16,14 30,2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ))}
      </div>

      <style>{`
        @media(max-width:768px){
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-text { order: 1; }
          .hero-video { order: 2; height: 260px !important; }
          .hero-cta { transform: none !important; }
        }
        @keyframes arrowBounce {
          0%   { opacity: 0; transform: translateY(-10px); }
          50%  { opacity: 1; transform: translateY(0px); }
          100% { opacity: 0; transform: translateY(10px); }
        }
      `}</style>
    </section>
  );
}
