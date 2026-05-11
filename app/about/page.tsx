"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FadeInView from "@/components/FadeInView";
import Link from "next/link";
import { useId } from "react";
import { motion } from "framer-motion";

const C = {
  dark: "#070C24",
  blue: "#124AF0",
  teal: "#21F0B0",
  red: "#FA5C5C",
  white: "#FFFFFF",
  text: "#292929",
  soft: "#F4F7FF",
};

function DiagonalDivider({ from, to }: { from: string; to: string }) {
  return (
    <div style={{ position: "relative", height: 64, background: to, overflow: "hidden" }}>
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "100%", position: "absolute", inset: 0 }}
      >
        <polygon points="0,0 1440,0 1440,16 0,64" fill={from} />
      </svg>
    </div>
  );
}

function OrnamentDivider({ color = C.teal }: { color?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, padding: "16px 0", background: C.white }}>
      <div style={{ width: 40, height: 1.5, background: color, borderRadius: 1, opacity: 0.35 }} />
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, opacity: 0.7 }} />
      <div style={{ width: 40, height: 1.5, background: color, borderRadius: 1, opacity: 0.35 }} />
    </div>
  );
}

function StoryImg({ src, alt, bg = C.white }: { src: string; alt: string; bg?: string }) {
  return (
    <div style={{ background: bg, padding: "48px 1.5rem" }}>
      <FadeInView>
        <img
          src={src}
          alt={alt}
          style={{
            display: "block",
            maxWidth: 620,
            width: "100%",
            margin: "0 auto",
            borderRadius: 20,
            objectFit: "cover",
            maxHeight: 420,
            boxShadow: "0 8px 40px rgba(7,12,36,0.13)",
          }}
        />
      </FadeInView>
    </div>
  );
}

function InlineImg({ src, alt }: { src: string; alt: string }) {
  return (
    <FadeInView>
      <div style={{ padding: "8px 0 16px", textAlign: "center" }}>
        <img
          src={src}
          alt={alt}
          style={{
            display: "inline-block",
            maxWidth: 480,
            width: "100%",
            borderRadius: 16,
            objectFit: "cover",
            maxHeight: 320,
            boxShadow: "0 4px 24px rgba(7,12,36,0.1)",
          }}
        />
      </div>
    </FadeInView>
  );
}

function Line({
  children,
  size = "md",
  color = C.text,
  weight = 500,
  mb = 0,
}: {
  children: React.ReactNode;
  size?: "xl" | "lg" | "md" | "sm";
  color?: string;
  weight?: number;
  mb?: number;
}) {
  const sizes = {
    xl: "clamp(2.2rem, 5vw, 3.6rem)",
    lg: "clamp(1.5rem, 3.5vw, 2.4rem)",
    md: "clamp(1.1rem, 2.5vw, 1.35rem)",
    sm: "clamp(0.88rem, 2vw, 1rem)",
  };
  return (
    <p
      style={{
        fontSize: sizes[size],
        color,
        fontWeight: weight,
        margin: 0,
        marginBottom: mb,
        lineHeight: size === "xl" || size === "lg" ? 1.25 : 1.9,
        textAlign: "center",
        fontFamily: size === "xl" || size === "lg" ? "'Heebo', sans-serif" : "'Rubik', sans-serif",
      }}
    >
      {children}
    </p>
  );
}

function Pause({ h = 32 }: { h?: number }) {
  return <div style={{ height: h }} />;
}

function SketchyUnderline({ color = C.red, delay = 0.3 }: { color?: string; delay?: number }) {
  const uid = useId().replace(/:/g, "s");
  return (
    <svg
      viewBox="0 0 300 12"
      fill="none"
      style={{ width: "100%", display: "block", marginTop: -8 }}
      preserveAspectRatio="none"
    >
      <defs>
        <filter id={`sk-${uid}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <motion.path
        d="M4 5 Q75 3 150 6 Q225 9 296 5"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none"
        filter={`url(#sk-${uid})`} opacity={0.95}
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease: "easeOut" } as object}
      />
      <motion.path
        d="M8 8 Q80 6 155 9 Q230 11 292 7"
        stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none"
        filter={`url(#sk-${uid})`} opacity={0.55}
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: delay + 0.15, ease: "easeOut" } as object}
      />
    </svg>
  );
}

function Underlined({ children, color = C.red, delay = 0.3 }: {
  children: React.ReactNode;
  color?: string;
  delay?: number;
}) {
  return (
    <div style={{ display: "inline-block", textAlign: "center" }}>
      {children}
      <SketchyUnderline color={color} delay={delay} />
    </div>
  );
}

function Dot() {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "8px 0" }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: C.red, opacity: 0.5 }} />
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" style={{ paddingTop: 80, fontFamily: "'Rubik', sans-serif" }}>

        {/* ─── HERO ─── */}
        <section style={{ background: C.dark, padding: "80px 1.5rem 72px", textAlign: "center" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <FadeInView>
              <Line size="sm" color="rgba(255,255,255,0.5)" weight={400} mb={32}>
                הסיפור שלא העזתי לכתוב עד היום<span style={{ fontSize: "0.75em" }}> ...</span>
              </Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="xl" color={C.white} weight={900}>
                הייתי פאנית מצליחה
              </Line>
            </FadeInView>
            <FadeInView delay={0.2}>
              <Line size="xl" color={C.teal} weight={900}>
                עד שגיליתי אמת אחת
              </Line>
            </FadeInView>
            <FadeInView delay={0.3}>
              <div style={{ textAlign: "center" }}>
                <Underlined color={C.teal} delay={0.5}>
                  <Line size="xl" color={C.white} weight={900}>ששינתה לי את החיים</Line>
                </Underlined>
              </div>
            </FadeInView>
            <Pause h={48} />
            <FadeInView delay={0.45}>
              <Line size="sm" color="rgba(255,255,255,0.6)" weight={400}>
                את כל מה שלא סיפרו לי על כסף
              </Line>
            </FadeInView>
          </div>
        </section>

        <DiagonalDivider from={C.dark} to={C.white} />

        {/* ─── פרק א': ההצלחה ─── */}
        <section style={{ background: C.white, padding: "72px 1.5rem 64px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 6 }}>

            <FadeInView>
              <Line size="sm" color="#999" weight={400}>לפני שבע שנים</Line>
            </FadeInView>
            <FadeInView delay={0.05}>
              <Line size="lg" color={C.dark} weight={800}>
                הייתי <span style={{ color: C.blue }}>"ההצלחה"</span>
              </Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="lg" color={C.dark} weight={800}>של השכונה</Line>
            </FadeInView>

            <Pause h={28} />

            <FadeInView>
              <Line size="md" color={C.text} weight={500}>התורים היו מלאים,</Line>
            </FadeInView>
            <FadeInView delay={0.05}>
              <Line size="md" color={C.text} weight={500}>הלקוחות מרוצות,</Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="md" color={C.text} weight={500}>המחמאות זורמות,</Line>
            </FadeInView>

            <Pause h={16} />

            <FadeInView>
              <Line size="md" color={C.text} weight={700}>העבודה?</Line>
            </FadeInView>
            <FadeInView delay={0.05}>
              <div style={{ textAlign: "center" }}>
                <Underlined color={C.red} delay={0.2}>
                  <Line size="lg" color={C.red} weight={800}>לא נגמרת<span style={{ fontSize: "0.75em" }}> - - -</span></Line>
                </Underlined>
              </div>
            </FadeInView>

            <Pause h={32} />
            <Dot />
            <Pause h={32} />

            <FadeInView>
              <Line size="md" color="#666" weight={500}>אבל מבפנים?</Line>
            </FadeInView>

            <Pause h={16} />

            <FadeInView>
              <Line size="lg" color={C.dark} weight={800}>רבקי של אז</Line>
            </FadeInView>
            <FadeInView delay={0.05}>
              <Line size="lg" color={C.red} weight={900}>מותשת.</Line>
            </FadeInView>

            <Pause h={28} />

            <FadeInView>
              <Line size="md" color={C.text} weight={500}>כמו אמא אחרי יום של סידורים בלי הפסקה</Line>
            </FadeInView>
            <FadeInView delay={0.05}>
              <Line size="md" color={C.text} weight={500}>כשאין דקה לשבת,</Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="md" color={C.text} weight={500}>אפילו לא לכוס מים.</Line>
            </FadeInView>

            <Pause h={28} />

            <FadeInView>
              <Line size="md" color="#888" weight={500}>8 שעות ביום <span style={{ fontSize: "0.75em" }}>+</span> 3 בערב</Line>
            </FadeInView>
            <FadeInView delay={0.05}>
              <Line size="md" color={C.text} weight={600}>בין פן לפן</Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="md" color={C.text} weight={600}>עמידה <span style={{ fontSize: "0.75em" }}>-</span> חום <span style={{ fontSize: "0.75em" }}>-</span> מאמץ</Line>
            </FadeInView>

            <Pause h={16} />

            <FadeInView>
              <Line size="lg" color={C.dark} weight={700}>והלב?</Line>
            </FadeInView>
            <FadeInView delay={0.08}>
              <Line size="md" color="#666" weight={500}>מתחיל לשכוח איך זה לנשום.</Line>
            </FadeInView>

            <Pause h={32} />

            <FadeInView>
              <div style={{
                background: C.soft,
                borderRight: `4px solid ${C.teal}`,
                borderRadius: 12,
                padding: "24px 28px",
                textAlign: "center",
              }}>
                <Line size="md" color={C.dark} weight={700}>הילדים בבית</Line>
                <Pause h={6} />
                <Line size="md" color={C.dark} weight={700}>באמת צריכים אותי,</Line>
                <Pause h={6} />
                <Line size="md" color={C.blue} weight={800}>הרבה יותר מהפאות.</Line>
              </div>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <Line size="md" color={C.text} weight={500}>והמשכורת? דווקא "בסדר".</Line>
            </FadeInView>
            <FadeInView delay={0.05}>
              <Line size="md" color={C.text} weight={500}>אבל כשהזמינות שלי ללקוחות</Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="md" color={C.text} weight={500}>היא אינסופית</Line>
            </FadeInView>
            <FadeInView delay={0.15}>
              <Line size="md" color="#888" weight={500}>המציאות מתבהרת בשקט עמוק:</Line>
            </FadeInView>
            <FadeInView delay={0.2}>
              <Line size="lg" color={C.red} weight={800}>המאמץ לא באמת משתלם.</Line>
            </FadeInView>

          </div>
        </section>

        {/* ─── IMAGE 1: פאנית ─── */}
        <StoryImg src="/about-hairdresser.jpg" alt="רבקי וייס בתקופת הפאנות" bg={C.white} />

        <DiagonalDivider from={C.white} to={C.soft} />

        {/* ─── פרק ב': המכולת ─── */}
        <section style={{ background: C.soft, padding: "72px 1.5rem 64px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 6 }}>

            <FadeInView>
              <Line size="sm" color="#999" weight={400}>ואז הגיע</Line>
            </FadeInView>
            <FadeInView delay={0.05}>
              <Line size="xl" color={C.dark} weight={900}>"החודש הכי טוב"</Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="md" color="#666" weight={500}>מבחינת המשכורת.</Line>
            </FadeInView>
            <FadeInView delay={0.15}>
              <Line size="md" color="#888" weight={500}>החודש שכולם חושבים שהוא חלום.</Line>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <Line size="lg" color={C.red} weight={800}>אבל אני?</Line>
            </FadeInView>
            <FadeInView delay={0.08}>
              <Line size="md" color={C.dark} weight={600}>הלב שלי הלך ונסדק.</Line>
            </FadeInView>
            <FadeInView delay={0.12}>
              <Line size="md" color={C.text} weight={500}>הרגשתי כמו מישהי שעובדת על אוטומט</Line>
            </FadeInView>
            <FadeInView delay={0.16}>
              <Line size="md" color={C.text} weight={500}>שכבר שכחה למה היא עושה את כל זה.</Line>
            </FadeInView>

            <Pause h={32} />
            <Dot />
            <Pause h={32} />

            <FadeInView>
              <Line size="lg" color={C.dark} weight={900}>ואז זה קרה.</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <div style={{ textAlign: "center" }}>
                <Underlined color={C.blue} delay={0.2}>
                  <Line size="xl" color={C.blue} weight={900}>המכולת.</Line>
                </Underlined>
              </div>
            </FadeInView>
            <Pause h={16} />
            <InlineImg src="/about-kids.jpg" alt="ילדים בוכים" />

            <Pause h={24} />

            <FadeInView>
              <Line size="md" color={C.text} weight={500}>סתם עוד יום.</Line>
            </FadeInView>
            <FadeInView delay={0.05}>
              <Line size="md" color={C.text} weight={500}>אני עם עגלת תאומים</Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="md" color={C.text} weight={500}>שקיות כבדות בידיים,</Line>
            </FadeInView>
            <FadeInView delay={0.15}>
              <Line size="md" color={C.text} weight={500}>ילד שמנסה להוציא חבילת קליק.</Line>
            </FadeInView>

            <Pause h={16} />

            <FadeInView>
              <Line size="md" color="#777" weight={500}>המוח בערפל.</Line>
            </FadeInView>
            <FadeInView delay={0.05}>
              <Line size="md" color="#777" weight={500}>עד 4 לפנות בוקר הייתי ערה.</Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="md" color="#777" weight={500}>ב-6:30 קמתי לילד עם חום.</Line>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <Line size="lg" color={C.dark} weight={700}>ואז</Line>
            </FadeInView>
            <FadeInView delay={0.08}>
              <Line size="md" color={C.text} weight={500}>קול מאחור.</Line>
            </FadeInView>

            <Pause h={16} />

            <FadeInView>
              <div style={{
                background: C.white,
                border: `2px solid #E0E8FF`,
                borderRadius: 16,
                padding: "24px 28px",
                textAlign: "center",
              }}>
                <Line size="md" color={C.dark} weight={800}>'רבקי?'</Line>
                <Pause h={12} />
                <Line size="md" color="#555" weight={500}>לקוחה ותיקה.</Line>
                <Pause h={4} />
                <Line size="md" color="#555" weight={500}>חיוך גדול על הפנים.</Line>
                <Pause h={12} />
                <Line size="md" color={C.text} weight={600}>"איזה נס שפגשתי אותך!"</Line>
                <Pause h={4} />
                <Line size="md" color={C.text} weight={500}>"אני מנסה לתפוס אותך ואת לא עונה..."</Line>
              </div>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <Line size="md" color={C.text} weight={500}>ואני?</Line>
            </FadeInView>
            <FadeInView delay={0.05}>
              <Line size="md" color={C.text} weight={500}>פוזלת לשני הקטנים,</Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="md" color={C.text} weight={500}>מנסה לייצב את השקיות,</Line>
            </FadeInView>
            <FadeInView delay={0.15}>
              <Line size="md" color={C.text} weight={500}>לחייך <span style={{ fontSize: "0.75em" }}>-</span> להתנצל <span style={{ fontSize: "0.75em" }}>-</span> לגמגם.</Line>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <div style={{ background: `linear-gradient(135deg, ${C.dark} 0%, #1a2a5e 100%)`, borderRadius: 16, padding: "28px 32px", textAlign: "center" }}>
                <Line size="sm" color="rgba(255,255,255,0.5)" weight={400}>מבפנים עולה בי צרחה:</Line>
                <Pause h={12} />
                <Line size="md" color={C.white} weight={700}>לא ישנתי כלום הלילה!</Line>
                <Pause h={4} />
                <Line size="md" color={C.teal} weight={700}>הילד עם חום!</Line>
                <Pause h={4} />
                <Line size="md" color={C.white} weight={700}>אני עוד דקה קורסת!</Line>
              </div>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <Line size="md" color={C.text} weight={500}>אבל היא לא מחכה לתשובה.</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="md" color={C.text} weight={500}>והמשפט הבא שלה יוצא בלי פילטרים:</Line>
            </FadeInView>

            <Pause h={16} />

            <FadeInView>
              <div style={{ borderRight: `5px solid ${C.red}`, paddingRight: 24, textAlign: "right" }}>
                <Line size="lg" color={C.red} weight={800}>
                  "כבר ראיתי אמהות לשני ילדים שעובדות ומסתדרות מצוין."
                </Line>
              </div>
            </FadeInView>

            <Pause h={32} />

            <FadeInView>
              <Line size="md" color={C.dark} weight={700}>והלב?</Line>
            </FadeInView>
            <FadeInView delay={0.05}>
              <Line size="lg" color={C.dark} weight={900}>כמו שיעור פתאומי</Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="lg" color={C.red} weight={900}>באכזבה.</Line>
            </FadeInView>

            <Pause h={32} />

            <FadeInView>
              <Line size="md" color="#666" weight={500}>רציתי להיעלם.</Line>
            </FadeInView>
            <FadeInView delay={0.05}>
              <Line size="md" color="#666" weight={500}>לברוח.</Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="md" color={C.text} weight={600}>אבל רק שתקתי.</Line>
            </FadeInView>
            <FadeInView delay={0.15}>
              <Line size="md" color={C.text} weight={600}>בלעתי.</Line>
            </FadeInView>
            <FadeInView delay={0.2}>
              <Line size="md" color={C.text} weight={600}>והלכתי הביתה.</Line>
            </FadeInView>

            <Pause h={32} />

            <FadeInView>
              <Line size="md" color="#888" weight={500}>ה"פשע" היחיד שלי?</Line>
            </FadeInView>
            <FadeInView delay={0.08}>
              <Line size="md" color={C.text} weight={600}>שלא הייתי מספיק זמינה.</Line>
            </FadeInView>

            <Pause h={32} />
            <Dot />
            <Pause h={32} />

            <FadeInView>
              <div style={{ textAlign: "center" }}>
                <Line size="lg" color={C.dark} weight={900}>אם נסכם ב-2 מילים:</Line>
              </div>
            </FadeInView>

            <Pause h={16} />

            <FadeInView>
              <div style={{ background: C.dark, borderRadius: 16, padding: "28px 24px", textAlign: "center" }}>
                <p style={{ color: C.white, fontSize: "clamp(0.9rem, 2vw, 1.05rem)", fontWeight: 500, lineHeight: 2.2, margin: 0, fontFamily: "'Rubik', sans-serif" }}>
                  <span style={{ color: C.teal }}>אישה</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75em" }}> + </span>
                  <span style={{ color: C.teal }}>אמא</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75em" }}> + </span>
                  <span style={{ color: C.teal }}>מפרנסת</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75em" }}> + </span>
                  <span style={{ color: C.teal }}>עצמאית</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75em" }}> + </span>
                  <span style={{ color: C.teal }}>מותג מצליח</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75em" }}> + </span>
                  <span style={{ color: C.teal }}>שירות מקסימלי</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75em" }}> + </span>
                  <span style={{ color: C.teal }}>משכורת סבירה</span>
                </p>
                <Pause h={16} />
                <Underlined color={C.red} delay={0.3}>
                  <Line size="lg" color={C.red} weight={900}>ועדיין לא שווה.</Line>
                </Underlined>
              </div>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <Line size="md" color={C.red} weight={700}>והכי גרוע?</Line>
            </FadeInView>
            <FadeInView delay={0.08}>
              <Line size="lg" color={C.dark} weight={800}>התחלתי להאמין לזה.</Line>
            </FadeInView>

          </div>
        </section>

        {/* ─── IMAGE 2: לב נשבר ─── */}
        <StoryImg src="/about-broken-heart.jpg" alt="לב נשבר" bg={C.soft} />

        <DiagonalDivider from={C.soft} to={C.blue} />

        {/* ─── פרק ג': ההבנה ─── */}
        <section style={{ background: C.blue, padding: "72px 1.5rem 64px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 6 }}>

            <FadeInView>
              <Line size="sm" color="rgba(255,255,255,0.6)" weight={400}>אחרי הבכי</Line>
            </FadeInView>
            <FadeInView delay={0.05}>
              <Line size="sm" color="rgba(255,255,255,0.6)" weight={400}>כשהלב נרגע</Line>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <Line size="lg" color={C.white} weight={800}>עשיתי סיכום קטן עם עצמי:</Line>
            </FadeInView>

            <Pause h={32} />

            <FadeInView>
              <Line size="md" color="rgba(255,255,255,0.85)" weight={500}>כמה עוד אשען על לקוחות כצינור היחיד לכסף?</Line>
            </FadeInView>
            <FadeInView delay={0.08}>
              <Line size="lg" color={C.teal} weight={900}>אם אין לקוחות <span style={{ fontSize: "0.75em" }}>-</span> אין כסף.</Line>
            </FadeInView>
            <Pause h={16} />
            <InlineImg src="/about-money-pipe.jpg" alt="צינור כסף" />

            <Pause h={32} />
            <Dot />
            <Pause h={32} />

            <FadeInView>
              <div style={{ textAlign: "center" }}>
                <Underlined color={C.teal} delay={0.25}>
                  <Line size="xl" color={C.white} weight={900}>נפל לי האסימון.</Line>
                </Underlined>
              </div>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <Line size="lg" color={C.teal} weight={800}>אני חייבת להבין כסף!</Line>
            </FadeInView>
            <FadeInView delay={0.08}>
              <Line size="md" color={C.white} weight={500}>לא עוד לרדוף אחריו.</Line>
            </FadeInView>
            <FadeInView delay={0.12}>
              <Line size="md" color={C.white} weight={500}>לא רק לעבוד בשבילו יום וליל.</Line>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <Line size="lg" color={C.white} weight={800}>רציתי לדעת</Line>
            </FadeInView>
            <FadeInView delay={0.08}>
              <Line size="xl" color={C.teal} weight={900}>איך כסף יעבוד בשבילי.</Line>
            </FadeInView>

            <Pause h={40} />

            <FadeInView>
              <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 16, padding: "28px 32px", textAlign: "center" }}>
                <Line size="md" color={C.white} weight={600}>האמנתי,</Line>
                <Pause h={8} />
                <Line size="md" color={C.white} weight={500}>שאם אנשים מצליחים יש להם כסף</Line>
                <Pause h={4} />
                <Line size="md" color={C.white} weight={500}>לא רק על בסיס שעת עבודה</Line>
                <Pause h={12} />
                <Line size="lg" color={C.teal} weight={900}>אני רוצה להיות מהאנשים האלה.</Line>
              </div>
            </FadeInView>

          </div>
        </section>

        <DiagonalDivider from={C.blue} to={C.white} />

        {/* ─── פרק ד': המסע ─── */}
        <section style={{ background: C.white, padding: "72px 1.5rem 64px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 6 }}>

            <FadeInView>
              <Line size="lg" color={C.dark} weight={900}>ושם?</Line>
            </FadeInView>
            <FadeInView delay={0.08}>
              <Line size="lg" color={C.blue} weight={800}>יצאתי למסע שלא דמיינתי.</Line>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <Line size="md" color={C.text} weight={500}>ממש נכנסתי לעומק.</Line>
            </FadeInView>
            <FadeInView delay={0.05}>
              <Line size="md" color={C.text} weight={600}>למדתי. חקרתי. קראתי ספרים</Line>
            </FadeInView>
            <Pause h={12} />
            <InlineImg src="/about-graphs.jpg" alt="מחשב גרפים" />
            <Pause h={8} />
            <FadeInView delay={0.1}>
              <Line size="md" color="#888" weight={500}>בסוד <span style={{ fontSize: "0.75em" }}>-</span> בעלי לא האמין שאני מסוגלת</Line>
            </FadeInView>
            <FadeInView delay={0.15}>
              <Line size="md" color="#888" weight={500}>לשבת כ"כ הרבה שעות ולטחון חומר.</Line>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <Line size="md" color={C.text} weight={500}>לא היה פה ריכוז.</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="lg" color={C.blue} weight={800}>הייתה תשוקה.</Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="md" color={C.text} weight={500}>לחיי רווחה ובשלווה.</Line>
            </FadeInView>

            <Pause h={32} />
            <Dot />
            <Pause h={32} />

            <FadeInView>
              <Line size="md" color={C.text} weight={500}>כחלק מהחיפוש</Line>
            </FadeInView>
            <FadeInView delay={0.05}>
              <Line size="md" color={C.text} weight={500}>נחשפתי גם לעולם ההשקעות והמסחר</Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="md" color={C.blue} weight={700}>בשוק ההון.</Line>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <Line size="md" color="#888" weight={400}>(אל תיבהלי... תמשיכי)</Line>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <Line size="md" color={C.text} weight={500}>כמו כל מתחילה מלאת מוטיבציה</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="md" color={C.text} weight={600}>הרגשתי שאני בדרך להפוך ל"סוחרת על".</Line>
            </FadeInView>

            <Pause h={16} />

            <FadeInView>
              <Line size="md" color={C.text} weight={500}>בהתחלה? הצלחתי. הרווחתי כסף.</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="lg" color={C.blue} weight={800}>הרגשתי שגיליתי את אמריקה!</Line>
            </FadeInView>

            <Pause h={16} />
            <InlineImg src="/about-america.jpg" alt="דגל אמריקה - גילוי" />
            <Pause h={8} />

            <FadeInView>
              <Line size="md" color={C.text} weight={500}>ואז</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="xl" color={C.red} weight={900}>בום.</Line>
            </FadeInView>
            <FadeInView delay={0.12}>
              <Line size="lg" color={C.dark} weight={800}>חטפתי הפסד.</Line>
            </FadeInView>
            <Pause h={16} />
            <InlineImg src="/about-boom.jpg" alt="בום - הפסד" />
            <Pause h={8} />
            <FadeInView delay={0.16}>
              <Line size="md" color={C.text} weight={500}>הפסד של הרבה כסף.</Line>
            </FadeInView>

            <Pause h={32} />

            <FadeInView>
              <div style={{ background: C.soft, borderRight: `4px solid ${C.red}`, borderRadius: 12, padding: "24px 28px" }}>
                <Line size="md" color={C.dark} weight={700}>המסקנה שלי הייתה:</Line>
                <Pause h={12} />
                <Line size="md" color={C.text} weight={600}>להיות סוחרת זה מקצוע.</Line>
                <Pause h={4} />
                <Line size="md" color={C.text} weight={600}>מקצוע אמיתי. קשה. תובעני.</Line>
                <Pause h={4} />
                <Line size="md" color={C.red} weight={700}>מסוכן למי שלא חיה את זה ביום-יום.</Line>
              </div>
            </FadeInView>

            <Pause h={32} />

            <FadeInView>
              <Line size="md" color={C.text} weight={500}>אבל מתוך האכזבה</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="lg" color={C.dark} weight={800}>הגיעה מחשבה</Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="lg" color={C.blue} weight={900}>ששינתה לי את כל התמונה.</Line>
            </FadeInView>

            <Pause h={32} />

            <FadeInView>
              <div style={{ background: C.dark, borderRadius: 20, padding: "36px 28px", textAlign: "center" }}>
                <Line size="lg" color={C.white} weight={800}>כל אחת מאיתנו</Line>
                <Pause h={8} />
                <Line size="xl" color={C.teal} weight={900}>נמצאת בשוק ההון!</Line>
                <Pause h={16} />
                <Line size="md" color="rgba(255,255,255,0.75)" weight={500}>המדינה מפקידה לנו את הפנסיה</Line>
                <Pause h={4} />
                <Line size="md" color="rgba(255,255,255,0.75)" weight={500}>בשוק ההון עצמו.</Line>
                <Pause h={16} />
                <Line size="md" color={C.teal} weight={700}>כנראה שיש דרך בטוחה,</Line>
                <Pause h={4} />
                <Line size="md" color={C.white} weight={700}>דרך מקצועית, שקטה, יציבה</Line>
                <Pause h={4} />
                <Line size="lg" color={C.teal} weight={900}>שאנחנו חייבות להכיר.</Line>
              </div>
            </FadeInView>

          </div>
        </section>

        <OrnamentDivider color={C.teal} />

        {/* ─── פרק ה': הגילוי ─── */}
        <section style={{ background: C.white, padding: "72px 1.5rem 64px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 6 }}>

            <FadeInView>
              <Line size="md" color={C.text} weight={500}>אחרי 7 שנים של בדיקה לעומק</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="md" color={C.text} weight={500}>אני יכולה בוודאות לומר:</Line>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <Line size="lg" color={C.dark} weight={800}>הדרך מתאימה לכל אחת.</Line>
            </FadeInView>
            <FadeInView delay={0.08}>
              <Line size="sm" color="#888" weight={400}>הדרך נקראת:</Line>
            </FadeInView>
            <Pause h={8} />
            <FadeInView delay={0.12}>
              <div style={{ background: `linear-gradient(135deg, ${C.blue} 0%, #0a35c8 100%)`, borderRadius: 16, padding: "28px 32px", textAlign: "center" }}>
                <Line size="lg" color={C.white} weight={900}>'השקעות פאסיביות</Line>
                <Pause h={4} />
                <Line size="lg" color={C.teal} weight={900}>במדדים רחבים'</Line>
                <Pause h={16} />
                <Line size="sm" color="rgba(255,255,255,0.7)" weight={400}>(בהמשך אסביר בדיוק למה הכוונה...)</Line>
              </div>
            </FadeInView>

            <Pause h={40} />

            <FadeInView>
              <Line size="md" color={C.text} weight={600}>אנחנו עובדות קשה.</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="lg" color={C.red} weight={800}>עוד שעת עבודה לא תעשה שפע.</Line>
            </FadeInView>

            <Pause h={16} />

            <FadeInView>
              <Line size="lg" color={C.blue} weight={900}>הכסף הגדול נמצא</Line>
            </FadeInView>
            <FadeInView delay={0.08}>
              <Line size="xl" color={C.dark} weight={900}>בניהול נכון</Line>
            </FadeInView>
            <FadeInView delay={0.12}>
              <Line size="xl" color={C.dark} weight={900}>של הכסף שלנו.</Line>
            </FadeInView>

            <Pause h={40} />
            <Dot />
            <Pause h={40} />

            <FadeInView>
              <Line size="md" color={C.text} weight={500}>הבנתי שאני לא צריכה להיות "סוחרת".</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="lg" color={C.blue} weight={800}>התחלתי לחשוב כמו משקיעה.</Line>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <Line size="md" color={C.text} weight={500}>לא לרדוף אחרי כל שינוי קטנטן.</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="md" color={C.text} weight={500}>לא להיבהל מכל תזוזה בשוק.</Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="md" color={C.text} weight={600}>אלא להשקיע במדדים רחבים,</Line>
            </FadeInView>
            <FadeInView delay={0.14}>
              <Line size="lg" color={C.blue} weight={800}>בשקט. בעקביות.</Line>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <div style={{ background: C.soft, borderRadius: 16, padding: "24px 28px", textAlign: "center" }}>
                <Line size="md" color={C.text} weight={500}>וזה קרה.</Line>
                <Pause h={12} />
                <Line size="md" color={C.text} weight={600}>בלי עוד שעות עבודה</Line>
                <Pause h={4} />
                <Line size="lg" color={C.blue} weight={900}>התיק שלי גדל.</Line>
                <Pause h={12} />
                <Line size="md" color="#666" weight={500}>לא בענק <span style={{ fontSize: "0.75em" }}>-</span> אבל אמיתי ובטוח.</Line>
              </div>
            </FadeInView>

            <Pause h={32} />

            <FadeInView>
              <Line size="md" color="#888" weight={500}>המשכתי ללמוד, להבין, לדייק.</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="lg" color={C.dark} weight={900}>הפאזל התחיל להתחבר.</Line>
            </FadeInView>
            <Pause h={16} />

            <FadeInView>
              <div style={{ background: C.soft, borderRight: `4px solid ${C.blue}`, borderRadius: 12, padding: "20px 24px" }}>
                <Line size="md" color={C.dark} weight={700}>הדבר המשמעותי שלמדתי:</Line>
                <Pause h={16} />
                <Line size="md" color={C.text} weight={600}>אם אני משקיעה לטווח הארוך</Line>
                <Pause h={4} />
                <Line size="md" color={C.blue} weight={800}>אז אני לא בודקת בטווח הקצר.</Line>
                <Pause h={16} />
                <Line size="sm" color="#888" weight={400}>(קראי את 2 השורות האחרונות שוב <span style={{ fontSize: "0.75em" }}>-</span> זה מפתח להכל)</Line>
              </div>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <div style={{ textAlign: "center" }}>
                <Underlined color={C.blue} delay={0.25}>
                  <Line size="lg" color={C.dark} weight={900}>הכסף שלי עובד.</Line>
                </Underlined>
              </div>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="lg" color={C.blue} weight={800}>נקודה.</Line>
            </FadeInView>

            <Pause h={16} />

            <FadeInView>
              <Line size="md" color={C.text} weight={500}>תיקונים (ירידות) תמיד יהיו.</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="md" color={C.text} weight={500}>הם לא ענין של 'האם' <span style={{ fontSize: "0.75em" }}>-</span> הם ענין של 'מתי'.</Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="md" color={C.text} weight={600}>וסטטיסטית השוק, בהסתכלות רחבה,</Line>
            </FadeInView>
            <FadeInView delay={0.14}>
              <Line size="lg" color={C.blue} weight={900}>תמיד בעלייה בטווח הארוך.</Line>
            </FadeInView>

          </div>
        </section>

        <DiagonalDivider from={C.white} to={C.dark} />

        {/* ─── פרק ו': הסיום / המסר ─── */}
        <section style={{ background: C.dark, padding: "72px 1.5rem 64px" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 6 }}>

            <FadeInView>
              <Line size="sm" color="rgba(255,255,255,0.5)" weight={400}>אם את עדיין כאן איתי</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="sm" color="rgba(255,255,255,0.5)" weight={400}>קודם תודה :)</Line>
            </FadeInView>

            <Pause h={40} />

            <FadeInView>
              <Line size="md" color={C.white} weight={600}>רק רוצה להוסיף לך,</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="md" color={C.white} weight={500}>שאני אישית בחרתי לפנות זמן</Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="md" color={C.teal} weight={700}>ולעזור לנשים אחרות.</Line>
            </FadeInView>

            <Pause h={16} />

            <FadeInView>
              <Line size="md" color="rgba(255,255,255,0.7)" weight={400}>את לא צריכה לשנות כיוון.</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="md" color="rgba(255,255,255,0.7)" weight={400}>בטח לא לעזוב עבודה.</Line>
            </FadeInView>

            <Pause h={32} />

            <FadeInView>
              <Line size="md" color={C.white} weight={600}>אבל דבר אחד בטוח:</Line>
            </FadeInView>

            <Pause h={8} />

            <FadeInView>
              <Line size="lg" color={C.teal} weight={900}>ההון שלך לא יגדל</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="lg" color={C.teal} weight={900}>מעוד שעות עבודה.</Line>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <Line size="md" color={C.white} weight={600}>את חייבת לנהל את ההון שלנו</Line>
            </FadeInView>
            <FadeInView delay={0.06}>
              <Line size="md" color={C.white} weight={600}>ולתת לכסף לעבוד,</Line>
            </FadeInView>
            <FadeInView delay={0.1}>
              <Line size="md" color={C.teal} weight={700}>בשקט, בעקביות.</Line>
            </FadeInView>

            <Pause h={24} />

            <FadeInView>
              <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "28px 28px", textAlign: "center" }}>
                <Line size="md" color="rgba(255,255,255,0.8)" weight={500}>כי לחסוך ולהשקיע זה לא מותרות.</Line>
                <Pause h={8} />
                <Line size="lg" color={C.white} weight={800}>זה הדרך היחידה</Line>
                <Pause h={4} />
                <Line size="lg" color={C.teal} weight={900}>להגדיל הון באמת.</Line>
              </div>
            </FadeInView>

            <Pause h={48} />

            <FadeInView>
              <Line size="sm" color="rgba(255,255,255,0.5)" weight={400}>בשליחות</Line>
            </FadeInView>
            <FadeInView delay={0.08}>
              <Line size="lg" color={C.white} weight={800}>רבקי</Line>
            </FadeInView>

            <Pause h={48} />

            <FadeInView>
              <div style={{ borderRight: `3px solid rgba(255,255,255,0.2)`, paddingRight: 24 }}>
                <Line size="sm" color="rgba(255,255,255,0.5)" weight={600} mb={12}>נ.ב</Line>
                <Line size="md" color="rgba(255,255,255,0.75)" weight={500}>שוק ההון מסוכן</Line>
                <Pause h={4} />
                <Line size="md" color={C.teal} weight={700}>רק למי שלא מבינה מה היא עושה.</Line>
                <Pause h={24} />
                <Line size="md" color="rgba(255,255,255,0.65)" weight={500}>הדבר המסוכן האמיתי?</Line>
                <Pause h={8} />
                <Line size="md" color="rgba(255,255,255,0.85)" weight={600}>הלוואות שנגררות שנים.</Line>
                <Pause h={4} />
                <Line size="md" color="rgba(255,255,255,0.85)" weight={600}>חיסכון שלא מניב.</Line>
                <Pause h={4} />
                <Line size="md" color="rgba(255,255,255,0.85)" weight={600}>חוסר ידיעה ששוחק את הכסף בשקט.</Line>
                <Pause h={24} />
                <Line size="md" color={C.red} weight={700}>כל יום שהכסף לא עובד</Line>
                <Pause h={4} />
                <Line size="md" color={C.red} weight={700}>זה הפסד קטן, קטן</Line>
                <Pause h={4} />
                <Line size="lg" color={C.white} weight={900}>אבל מצטבר.</Line>
              </div>
            </FadeInView>

          </div>
        </section>

        <DiagonalDivider from={C.dark} to={C.blue} />

        {/* ─── CTA ─── */}
        <section style={{ background: C.blue, padding: "64px 1.5rem" }}>
          <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
            <FadeInView>
              <Underlined color={C.white} delay={0.2}>
                <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 900, color: C.white, margin: 0, fontFamily: "'Heebo', sans-serif", textShadow: "0 0 12px rgba(255,255,255,0.8)" }}>
                  אישה רגילה עם ידע נכון
                </p>
              </Underlined>
              <Pause h={12} />
              <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 900, color: C.teal, margin: "0 0 32px", fontFamily: "'Heebo', sans-serif" }}>
                מגיעה לצמתים בחיים עם הון.
              </p>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.8)", margin: "0 0 40px", fontFamily: "'Rubik', sans-serif", fontWeight: 500, lineHeight: 1.7 }}>
                אני המרוויחה שעובדת כל היום בלי ידע
                <br />
                <span style={{ fontSize: "0.75em" }}>-</span> תגיע בלי שקל.
              </p>
              <Link
                href="/course"
                style={{
                  display: "inline-block",
                  background: C.white,
                  color: C.blue,
                  fontWeight: 900,
                  fontSize: "1.1rem",
                  padding: "18px 56px",
                  borderRadius: 60,
                  textDecoration: "none",
                  fontFamily: "'Heebo', sans-serif",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  transition: "transform 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                אני רוצה להתחיל ←
              </Link>
            </FadeInView>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
