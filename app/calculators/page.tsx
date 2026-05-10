"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

function SketchLine({ id, maxWidth = 460, delay = 0.3 }: { id: string; maxWidth?: number; delay?: number }) {
  return (
    <svg viewBox="0 0 400 14" fill="none" style={{ width: "100%", maxWidth, display: "block", margin: "6px auto 0" }} preserveAspectRatio="none">
      <defs>
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <motion.path
        d="M4 6 Q100 3 200 7 Q300 10 396 6"
        stroke="#21F0B0" strokeWidth="2.6" strokeLinecap="round" fill="none"
        filter={`url(#${id})`} opacity="0.95"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.0, delay, ease: "easeOut" }}
      />
      <motion.path
        d="M8 9 Q105 7 205 10 Q305 13 392 9"
        stroke="#21F0B0" strokeWidth="1.4" strokeLinecap="round" fill="none"
        filter={`url(#${id})`} opacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.0, delay: delay + 0.18, ease: "easeOut" }}
      />
    </svg>
  );
}

const CALCULATORS = [
  {
    href: "/calculators/compound-interest",
    title: "ריבית דריבית",
    desc: "הפלא השמיני בתבל - תראי איך 500 ₪ בחודש הופכים לסכום שתתפלאי עליו. כולל דמי ניהול ודמי צבירה.",
    color: "#124AF0",
    badge: "הכי פופולרי",
    ready: true,
  },
  {
    href: null,
    title: "חיסכון לכל ילד",
    desc: "כמה יהיה לילד שלך בגיל 18 לפי המסלול שתבחרי - מנייתי מול ברירת מחדל.",
    color: "#21F0B0",
    badge: "בקרוב",
    ready: false,
  },
  {
    href: null,
    title: "מחשבון דמי ניהול",
    desc: "כמה כסף תחסכי אם תורידי 0.5% דמי ניהול בפנסיה? התשובה תפתיע אותך.",
    color: "#FA5C5C",
    badge: "בקרוב",
    ready: false,
  },
];

export default function CalculatorsPage() {
  return (
    <>
      <Navigation />
      <main style={{ paddingTop: 80 }}>

        {/* Hero */}
        <section style={{
          background: "radial-gradient(ellipse at 50% 30%, #1535B5 0%, #060D3C 65%)",
          padding: "80px 1.5rem 96px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(33,240,176,0.06)", filter: "blur(80px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(18,74,240,0.12)", filter: "blur(60px)", pointerEvents: "none" }} />
          <style>{`
            @keyframes slippersFloat {
              0%   { transform: translateY(0px) rotate(-4deg); }
              25%  { transform: translateY(-10px) rotate(2deg); }
              50%  { transform: translateY(-14px) rotate(-2deg); }
              75%  { transform: translateY(-6px) rotate(3deg); }
              100% { transform: translateY(0px) rotate(-4deg); }
            }
          `}</style>

          <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>

            {/* Slippers row */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 24, marginBottom: 28, flexWrap: "wrap" }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginBottom: 8 }}>
                <span style={{ color: "#21F0B0", fontWeight: 700, fontSize: "1rem", letterSpacing: 1.5 }}>
                  שוק ההון בנעלי בית
                </span>
                <SketchLine id="sketch-slippers-label" maxWidth={220} delay={0.5} />
              </div>
              <motion.img
                src="/slippers.svg"
                alt="נעלי בית אדומות"
                initial={{ scale: 0.5, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.7, type: "spring", stiffness: 220, damping: 14 }}
                style={{
                  height: 110,
                  width: "auto",
                  filter: "drop-shadow(0 10px 24px rgba(250,92,92,0.5)) drop-shadow(0 2px 6px rgba(0,0,0,0.2))",
                  animation: "slippersFloat 3.2s ease-in-out infinite",
                  transformOrigin: "center bottom",
                  flexShrink: 0,
                  marginBottom: 6,
                }}
              />
            </motion.div>

            <h1 style={{
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 900,
              color: "white",
              lineHeight: 1.15,
              marginBottom: 8,
              textShadow: "0 0 40px rgba(33,240,176,0.15)",
            }}>
              מחשבונים פיננסיים
            </h1>
            <SketchLine id="sketch-calc-title" maxWidth={460} delay={0.35} />
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", lineHeight: 1.85, marginTop: 24 }}>
              כלים אינטראקטיביים שיעזרו לך לקבל החלטות פיננסיות מושכלות
              <br />
              בלי חישובים מסובכים. עם נעלי בית.
            </p>
          </div>
        </section>

        {/* Cards grid */}
        <section style={{ background: "#F4F7FF", padding: "72px 1.5rem 88px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 28 }}>
              {CALCULATORS.map((c, i) => {
                const inner = (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                      <div style={{ width: 52, height: 52, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                      <span style={{
                        background: c.ready ? "#124AF0" : "#F4F7FF",
                        color: c.ready ? "#21F0B0" : "#999",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        padding: "4px 14px",
                        borderRadius: 50,
                        border: c.ready ? "none" : "1px solid #E8EDFF",
                      }}>
                        {c.badge}
                      </span>
                    </div>
                    <h2 style={{ fontWeight: 800, color: "#070C24", fontSize: "1.2rem", marginBottom: 10 }}>{c.title}</h2>
                    <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: 1.8, marginBottom: 20, flexGrow: 1 }}>{c.desc}</p>
                    {c.ready && (
                      <span style={{ color: c.color, fontWeight: 700, fontSize: "0.9rem" }}>
                        למחשבון ←
                      </span>
                    )}
                  </>
                );

                const cardStyle: React.CSSProperties = {
                  background: "white",
                  borderRadius: 24,
                  padding: "32px 28px",
                  border: "2px solid #E8EDFF",
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
                  cursor: c.ready ? "pointer" : "default",
                  opacity: c.ready ? 1 : 0.7,
                };

                return c.href ? (
                  <Link key={i} href={c.href} style={cardStyle}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = c.color;
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${c.color}22`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#E8EDFF";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={i} style={cardStyle}>{inner}</div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: "#124AF0", padding: "72px 1.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(33,240,176,0.08)", filter: "blur(60px)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 580, margin: "0 auto", position: "relative" }}>
            <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1, marginBottom: 16 }}>
              רוצה ללמוד יותר?
            </p>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", color: "white", fontWeight: 700, marginBottom: 16, textShadow: "0 0 12px rgba(255,255,255,0.15)" }}>
              מהמחשבונים <span style={{ fontSize: "0.75em" }}>-</span> לידע אמיתי
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.85, marginBottom: 36 }}>
              תוכנית MUSTרית מלמדת את כל הנושאים האלה לעומק
              <span style={{ fontSize: "0.75em" }}> - </span>
              עם דוגמאות, תרגולים ותכנית פעולה אישית.
            </p>
            <Link href="/course" style={{ position: "relative", display: "inline-block", textDecoration: "none" }}>
              <div style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                backgroundImage: "url('/btn-blue-new.svg?v=2')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "110% 560%",
                backgroundPosition: "center 41%",
              }} />
              <span style={{
                position: "relative",
                zIndex: 1,
                color: "#FFFFFF",
                padding: "20px 64px",
                fontWeight: 800,
                fontSize: "1.05rem",
                display: "block",
                whiteSpace: "nowrap",
                textShadow: "0 0 12px rgba(255,255,255,0.8)",
              }}>
                לפרטי התוכנית ←
              </span>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
