"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Navigation from "@/components/Navigation";

// ─── Colors ───────────────────────────────────────────────────────────────────
const navy  = "#060D3C";
const blue  = "#124AF0";
const green = "#21F0B0";
const red   = "#FA5C5C";
const white = "#FFFFFF";
const light = "#F4F7FF";

// ─── SVG Divider ──────────────────────────────────────────────────────────────
function Divider({ from, to, flip = false, h = 110 }: { from: string; to: string; flip?: boolean; h?: number }) {
  return (
    <div style={{ position: "relative", height: h, background: from, overflow: "hidden" }}>
      <div style={{
        position: "absolute",
        inset: 0,
        background: to,
        clipPath: flip ? "polygon(0 0, 100% 100%, 0 100%)" : "polygon(100% 0, 100% 100%, 0 100%)",
      }} />
    </div>
  );
}

// ─── Brush Button ─────────────────────────────────────────────────────────────
function BrushBtn({ href, onClick, children, variant = "blue" }: {
  href?: string; onClick?: () => void; children: React.ReactNode; variant?: "blue" | "green";
}) {
  const svgUrl   = variant === "green" ? "/btn-green.svg?v=2" : "/btn-blue-new.svg?v=2";
  const txtColor = variant === "green" ? navy : white;
  const content  = (
    <span style={{ position: "relative", display: "inline-block" }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: "-64px", right: "-64px", pointerEvents: "none", backgroundImage: `url('${svgUrl}')`, backgroundRepeat: "no-repeat", backgroundSize: "100% 560%", backgroundPosition: "center 43%" }} />
      <span style={{ position: "relative", zIndex: 1, color: txtColor, padding: "16px 48px", fontWeight: 800, fontSize: "1.05rem", display: "block" }}>
        {children}
      </span>
    </span>
  );
  return (
    <span onClick={onClick} style={{ display: "inline-block", cursor: "pointer", transition: "transform 0.2s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
      {href ? <a href={href} style={{ textDecoration: "none" }}>{content}</a> : content}
    </span>
  );
}

// ─── Pill Badge ───────────────────────────────────────────────────────────────
function Pill({ children, bg = blue }: { children: React.ReactNode; bg?: string }) {
  return (
    <span style={{ color: green, fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1, background: bg, display: "inline-block", padding: "4px 16px", borderRadius: 50, marginBottom: 12 }}>
      {children}
    </span>
  );
}

// ─── Animated SVG Underline ───────────────────────────────────────────────────
function Underline({ color = red, delay = 0.3, seed = "5" }: { color?: string; delay?: number; seed?: string }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const id    = `sk${seed}${color.replace("#", "")}`;
  return (
    <svg ref={ref} viewBox="0 0 300 12" fill="none" style={{ width: "100%", display: "block", marginTop: 3 }} preserveAspectRatio="none">
      <defs>
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed={seed} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <motion.path d="M4 5 Q75 3 150 6 Q225 9 296 5" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" filter={`url(#${id})`} initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 0.9, delay, ease: "easeOut" }} />
      <motion.path d="M8 8 Q80 6 155 9 Q230 11 292 7" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" filter={`url(#${id})`} opacity={0.5} initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}} transition={{ duration: 0.9, delay: delay + 0.15, ease: "easeOut" }} />
    </svg>
  );
}

// ─── STICKY CTA ──────────────────────────────────────────────────────────────
function StickyBtn() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const fn = () => setVis(window.scrollY > 700);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <a href="#contact-form" style={{ position: "fixed", bottom: 24, left: 20, zIndex: 999, background: blue, color: white, borderRadius: 50, padding: "13px 22px", fontWeight: 800, fontSize: "0.88rem", textDecoration: "none", boxShadow: "0 4px 24px rgba(18,74,240,0.45)", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)", pointerEvents: vis ? "auto" : "none", transition: "opacity 0.3s, transform 0.3s", whiteSpace: "nowrap", direction: "rtl" }}>
      בדקי אם יש מקום
    </a>
  );
}

// ─── SECTION 1: HERO ─────────────────────────────────────────────────────────
function VipHero() {
  return (
    <section style={{ background: `radial-gradient(ellipse at 50% 30%, #1535B5 0%, ${navy} 65%)`, paddingTop: 100, paddingBottom: 110, position: "relative", overflow: "hidden" }}>
      {/* Ambient glows */}
      <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(33,240,176,0.07)", filter: "blur(90px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 340, height: 340, borderRadius: "50%", background: "rgba(250,92,92,0.06)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", left: "15%", width: 200, height: 200, borderRadius: "50%", background: "rgba(18,74,240,0.12)", filter: "blur(60px)", pointerEvents: "none" }} />
      {/* Mesh grid overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(33,240,176,0.055) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 1.5rem", textAlign: "center", position: "relative" }}>

        {/* Hook */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} style={{ marginBottom: 28 }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", lineHeight: 1.7, margin: "0 0 2px" }}>יש לך מאות אלפי שקלים שמחכים לך.</p>
          <p style={{ color: white, fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>הם פשוט לא יודעים שאת קיימת.</p>
        </motion.div>

        {/* Tagline */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} style={{ color: green, fontSize: "0.88rem", fontWeight: 700, letterSpacing: 2, margin: "0 0 24px" }}>
          אנחנו נכנסות לנעליים שלך. ועושות.
        </motion.p>

        {/* VIP letters */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ color: white, fontSize: "0.9rem", fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>מצב צבירה</p>
          <div style={{ display: "flex", justifyContent: "center", lineHeight: 1, direction: "ltr" }}>
            {[{ l: "V", c: white }, { l: "I", c: green }, { l: "P", c: red }].map(({ l, c }, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "inline-block", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 900, color: c, fontFamily: "'Rubik', sans-serif", letterSpacing: "0.04em" }}>
                {l}
              </motion.span>
            ))}
          </div>
        </div>

        {/* H1 */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }}
          style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.3rem)", fontWeight: 800, lineHeight: 1.5, color: white, maxWidth: 680, margin: "0 auto 10px" }}>
          הכסף שמגיע לך?
          <br />
          <span style={{ color: green }}>כבר שם.</span>
          <br />
          רק צריך מישהי
          <br />
          שתלך לקחת אותו.
        </motion.h1>

        {/* Sub */}
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.7 }}
          style={{ color: "rgba(255,255,255,0.72)", fontSize: "1rem", lineHeight: 1.9, maxWidth: 560, margin: "0 auto 24px" }}>
          אנחנו נכנסות לנעליים שלך, עושות את כל הביורוקרטיה המעצבנת -
          <br />
          ואת יוצאת עם מאות אלפי שקלים שחיכו לך בשקט.
        </motion.p>

        {/* What we do chips */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.78, duration: 0.5 }}
          style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
          {["בלי ללמוד", "בלי לחפור בדוחות", "בלי שעות על הטלפון"].map((t, i) => (
            <span key={i} style={{ background: "rgba(33,240,176,0.1)", border: "1px solid rgba(33,240,176,0.28)", color: green, fontSize: "0.83rem", fontWeight: 700, padding: "6px 18px", borderRadius: 50 }}>
              ✓ {t}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.9 }} style={{ marginBottom: 40 }}>
          <BrushBtn href="#contact-form">בדקי אם יש לך מקום במחזור הקרוב</BrushBtn>
          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.8rem", marginTop: 10 }}>
            ללא התחייבות - שיחת היכרות קצרה, בלי לחץ
          </p>
        </motion.div>

        {/* SOLD OUT badges */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.5 }}
          style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { t: "מחזור ראשון - SOLD OUT", sold: true },
            { t: "מחזור שני - SOLD OUT",   sold: true },
            { t: "מחזור שלישי - SOLD OUT", sold: true },
            { t: "מחזור רביעי - SOLD OUT", sold: true },
            { t: "מחזור חמישי - הרשמה פתוחה", sold: false },
          ].map(({ t, sold }, i) => (
            <span key={i} style={{ background: sold ? "rgba(250,92,92,0.12)" : "rgba(33,240,176,0.12)", border: `1px solid ${sold ? "rgba(250,92,92,0.35)" : "rgba(33,240,176,0.35)"}`, color: sold ? red : green, fontSize: "0.78rem", fontWeight: 700, padding: "5px 14px", borderRadius: 50 }}>
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll arrows */}
      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        {[0, 1, 2].map(i => (
          <svg key={i} width="32" height="18" viewBox="0 0 32 18" fill="none" style={{ animation: `arrowBounce 1.5s ease-in-out ${i * 0.3}s infinite` }}>
            <polyline points="2,2 16,14 30,2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ))}
      </div>
      <style>{`@keyframes arrowBounce { 0%{opacity:0;transform:translateY(-10px)} 50%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(10px)} }`}</style>
    </section>
  );
}

// ─── SECTION 2: PROBLEM STATS ─────────────────────────────────────────────────
function ProblemStats() {
  const stats = [
    "הפרש של 1% בדמי ניהול יכול להסתכם בעד 400,000 ש\"ח פחות בפנסיה שלך לאורך 30 שנה.",
    "כסף שיושב בעו\"ש נשחק ב-3.5% בשנה - גם בלי לגעת בו.",
    "מעל מיליארד ש\"ח של כספי ביטוח ופנסיה לא נתבעו בישראל (רשות שוק ההון). הכסף רשום על שמך - הוא פשוט מחכה שתדעי לאתר אותו.",
    "מרבית הציבור בישראל מעולם לא בדק אם דמי הניהול שלו ניתנים להורדה. (רשות שוק ההון)",
  ];
  return (
    <section style={{ background: blue, padding: "56px 1.5rem", textAlign: "center" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <Pill>60 שניות שישנו לך הכל</Pill>
        <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 900, color: white, lineHeight: 1.3, marginBottom: 8 }}>
          עד היום - 2 אפשרויות.
          <br />
          <span style={{ color: green }}>שתיהן גרועות.</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", marginBottom: 40 }}>ולכן רוב הנשים שאני פוגשת לא עושות כלום.</p>

        {/* 2 bad options */}
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40, textAlign: "right" }}>
          {[
            { num: "1", title: "לסמוך על הסוכן הפנסיוני", desc: "הוא 'מסדר לך' - ואת לא שואלת שאלות. מה שאת לא יודעת: בכל שנה שעוברת, דמי הניהול גוזרים ממך עשרות אלפי שקלים בשקט מוחלט.", tag: "ביטחון מדומה" },
            { num: "2", title: "לנסות לנהל לבד", desc: "לפתוח טאב, להיתקע בביורוקרטיה, לא להבין את הז'רגון, ולסגור את הטאב אחרי 20 דקות מתוסכלות.", tag: "עוני בזמן" },
          ].map((opt, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i === 0 ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.12 }}
              style={{ background: "rgba(0,0,0,0.25)", borderRadius: 16, padding: "24px 28px", borderRight: `4px solid ${red}`, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: red, letterSpacing: 1, marginBottom: 6 }}>אפשרות {opt.num}</p>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: white, marginBottom: 10, lineHeight: 1.4 }}>{opt.title}</h3>
              <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: 12 }}>{opt.desc}</p>
              <span style={{ background: "rgba(250,92,92,0.18)", border: "1px solid rgba(250,92,92,0.4)", color: red, fontSize: "0.78rem", fontWeight: 700, padding: "4px 12px", borderRadius: 50 }}>{opt.tag}</span>
            </motion.div>
          ))}
        </div>

        {/* Pillars */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ background: "rgba(0,0,0,0.25)", borderRadius: 20, padding: "28px 36px", marginBottom: 40, borderTop: `3px solid ${green}` }}>
          <p style={{ color: green, fontWeight: 800, fontSize: "1rem", marginBottom: 16 }}>ולכן בניתי את מצב צבירה VIP.</p>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.95rem", marginBottom: 16 }}>הדרך השלישית - שבה אני עושה הכל במקומך.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "right" }}>
            {["✦ מאחדת קופות ומורידה דמי ניהול", "✦ פותחת תיק השקעות ומנהלת אותו", "✦ בונה תוכנית השקעה מותאמת לך אישית"].map((p, i) => (
              <p key={i} style={{ color: white, fontSize: "0.98rem", fontWeight: 600, margin: 0 }}>{p}</p>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ display: "flex", gap: 16, alignItems: "flex-start", textAlign: "right", background: "rgba(0,0,0,0.18)", borderRadius: 12, padding: "14px 20px" }}>
              <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>{s}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
          <BrushBtn href="#contact-form">בדקי אם יש לך מקום במחזור הקרוב</BrushBtn>
        </div>
      </div>
      <style>{`@media(max-width:600px){ .stats-grid{ grid-template-columns:1fr!important; } }`}</style>
    </section>
  );
}

// ─── SECTION 3: PAIN / COUCH ──────────────────────────────────────────────────
function PainCouch() {
  const badOpts = [
    { title: "לנהל לבד?",               consequence: "שעות של ביורוקרטיה שפשוט אין לך. וגם אם תפתחי טאב - לא ברור שתדעי מה לעשות." },
    { title: "לסמוך על הסוכן?",          consequence: "הוא לא רואה את התמונה המלאה שלך. ובינתיים דמי הניהול גוזרים ממך בשקט. כל שנה." },
    { title: "לדחות לשנה הבאה?",         consequence: "כל שנה שעוברת = עוד עשרות אלפי שקלים בעלות הזדמנות שלא תחזור. השנה הבאה לא תהיה יותר קלה." },
  ];
  return (
    <section style={{ background: `radial-gradient(ellipse at 50% 20%, #1535B5 0%, ${navy} 70%)`, padding: "72px 1.5rem", textAlign: "center" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <Pill bg="rgba(33,240,176,0.12)">שיחת ספה</Pill>

        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, color: white, lineHeight: 1.25, marginBottom: 16 }}>
          תגידי -
          <br />
          את מכירה את התחושה הזו?
        </h2>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: "rgba(0,0,0,0.28)", borderRadius: 20, padding: "36px 40px", marginBottom: 28, textAlign: "right", borderRight: `4px solid ${green}`, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>

          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 2, marginBottom: 16 }}>
            חוזרת הביתה אחרי יום שלא עצרת לרגע.
            <br />
            העסק דופק. הכנסת סכומים שפעם רק חלמת עליהם.
            <br />
            <strong style={{ color: white }}>ובלב יש לך אבן.</strong>
          </p>

          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.85)", lineHeight: 2, marginBottom: 16 }}>
            כי בינינו - רק שתינו פה - את יודעת את האמת.
            <br />
            את יודעת שגם ההכנסה שהתגאית בה
            <br />
            פשוט לא מספיקה מול מה שמחכה מעבר לפינה.
          </p>

          <div style={{ background: "rgba(33,240,176,0.08)", border: "1px solid rgba(33,240,176,0.2)", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
            <p style={{ fontSize: "1rem", fontWeight: 800, color: green, marginBottom: 6 }}>
              אני קוראת לזה "צונאמי החתונות".
            </p>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, margin: 0 }}>
              את מסתכלת על הילדים המתוקים שלך ויודעת שבעוד כמה שנים כל חיתון יעלה כמו דירה.
              <br />
              ועם כל הכבוד לעבודה הקשה - בחיסכון רגיל זה פשוט לא יקרה.
            </p>
          </div>

          <div style={{ background: "rgba(250,92,92,0.08)", border: "1px solid rgba(250,92,92,0.2)", borderRadius: 12, padding: "16px 20px", marginBottom: 24 }}>
            <p style={{ fontSize: "1rem", fontWeight: 800, color: red, marginBottom: 6 }}>
              אני קוראת לזה "עוני בזמן".
            </p>
            <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, margin: 0 }}>
              את צבא של אישה אחת. גם מנהלת, גם אמא, גם בלבוסטה.
              <br />
              בגלל העומס הזה - הכסף שלך פשוט שוכב בעו"ש ונשחק,
              <br />
              ואת ב"מצב הישרדות" פיננסי בזמן שבחוץ את נראית ההצלחה של השכונה.
            </p>
          </div>

          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "20px 24px", marginBottom: 20 }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, color: green, letterSpacing: 1, marginBottom: 10 }}>מה שהמחקר מוכיח</p>
            <p style={{ fontSize: "1rem", color: white, fontWeight: 800, marginBottom: 10, lineHeight: 1.6 }}>
              המוח שלך מעדיף לעבוד 12 שעות על לפתוח דוח פנסיה.
            </p>
            <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.9, marginBottom: 14 }}>
              זה לא עצלות. זה ביולוגיה.
              <br />
              פרופ' מולינתן (הרווארד) ושפיר (פרינסטון) הוכיחו: מוח עמוס נכנס ל<strong style={{ color: white }}>"מנהור"</strong> - ורואה רק מה דחוף, לא מה חשוב.
              <br />
              עבודה = תגמול מיידי. ניהול כסף = מאמץ עכשיו, תועלת בעוד 20 שנה.
              <br />
              <strong style={{ color: white }}>המוח שלך בחר נכון לפי הכללים שלו. הבעיה היא שהכללים האלה עולים לך הון.</strong>
            </p>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", fontStyle: "italic", margin: 0 }}>
              מקור: Mullainathan & Shafir, Scarcity, 2013
            </p>
          </div>

          <p style={{ fontSize: "1rem", color: white, fontWeight: 700, lineHeight: 1.8, marginBottom: 0 }}>
            את לא אשמה. בכלל לא.
            <br />
            <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 400 }}>את פשוט עסוקה מדי בלהרוויח כדי לנהל את מה שכבר הרווחת.</span>
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
          style={{ background: "rgba(33,240,176,0.08)", border: `1px solid rgba(33,240,176,0.2)`, borderRadius: 16, padding: "20px 28px", textAlign: "center" }}>
          <p style={{ color: green, fontWeight: 800, fontSize: "1rem", marginBottom: 4 }}>
            אין לך זמן לנהל לבד.
          </p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", lineHeight: 1.8, margin: 0 }}>
            אין לך אמון עיוור לסוכן שלא רואה את התמונה המלאה.
            <br />
            ואין לך עוד שנה לדחות.
            <br />
            <strong style={{ color: white }}>יש דרך אחרת. וזה בדיוק מה שבניתי.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION 4: TURNING POINT ─────────────────────────────────────────────────
function TurningPoint() {
  return (
    <section style={{ background: white, padding: "72px 1.5rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Pill bg={blue}>הרגע שהחליט הכל</Pill>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: blue, marginTop: 8, lineHeight: 1.3 }}>
            הבנתי שהבעיה
            <br />
            היא לא ידע.
            <br />
            <span style={{ color: red }}>הבעיה היא זמן.</span>
          </h2>
        </div>

        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: white, borderRadius: 24, padding: "36px 40px", border: `1px solid rgba(18,74,240,0.15)`, boxShadow: "0 8px 40px rgba(18,74,240,0.08)", textAlign: "right", marginBottom: 28 }}>

          <p style={{ fontSize: "1rem", color: "#444", lineHeight: 2, marginBottom: 16 }}>
            בשש השנים האחרונות ישבתי מול עשרות נשים.
            <br />
            כולן שונות. רופאות, עורכות דין, בעלות עסקים, מנהלות.
            <br />
            הכנסות שונות. גילאים שונות.
          </p>

          <p style={{ fontSize: "1.05rem", fontWeight: 700, color: blue, marginBottom: 24 }}>
            אבל אותה תמונה בדיוק.
            <br />
            <span style={{ fontWeight: 400, color: "#555" }}>מצליחות בחוץ. ריקות פיננסית בפנים.</span>
          </p>

          <div style={{ borderRight: `4px solid ${green}`, paddingRight: 20, marginBottom: 28 }}>
            <p style={{ fontSize: "0.95rem", color: "#555", lineHeight: 2, margin: "0 0 4px", fontStyle: "italic" }}>כולן אמרו לי בדיוק אותו דבר:</p>
            {['"רבקי, אין לי זמן לזה."', '"רבקי, אני לא מבינה בזה."', '"רבקי, אני סומכת על הסוכן שלי."'].map((q, i) => (
              <p key={i} style={{ fontSize: "1rem", fontWeight: 700, color: "#292929", lineHeight: 1.8, margin: "0 0 4px" }}>{q}</p>
            ))}
          </div>

          {/* The moment */}
          <div style={{ background: blue, borderRadius: 16, padding: "24px 28px", marginBottom: 20 }}>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 12 }}>
              ישבתי עם לקוחה. עצמאית מצליחה. מכניסה יפה.
              <br />
              ושאלתי אותה שאלה אחת פשוטה:
            </p>
            <p style={{ color: white, fontSize: "1.05rem", fontWeight: 800, marginBottom: 16 }}>
              "כמה דמי ניהול את משלמת בפנסיה?"
            </p>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 16 }}>
              היא לא ידעה.
              <br />
              פתחנו ביחד את הדוח האחרון.
              <br />
              גילינו שהיא משלמת 1.83% במקום 0.1%.
            </p>
            <p style={{ fontSize: "2.2rem", fontWeight: 900, color: green, margin: "0 0 4px", lineHeight: 1.1 }}>431,000 ש"ח</p>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", fontStyle: "italic", margin: "0 0 12px" }}>ההפרש לאורך 25 שנה.</p>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", lineHeight: 1.8, margin: 0 }}>
              היא הסתכלה בי.
              <br />
              <strong style={{ color: white }}>לא אמרה כלום.</strong>
            </p>
          </div>

          <p style={{ fontSize: "1.05rem", fontWeight: 800, color: blue, lineHeight: 1.6, margin: 0 }}>
            זה הרגע שבו החלטתי לבנות משהו אחר לגמרי.
            <br />
            <span style={{ fontWeight: 400, fontSize: "0.98rem", color: "#555" }}>לא הסברים שתצטרכי לממש לבד. לא ייעוץ שמשאיר אותך עם שיעורי בית.</span>
            <br />
            <span style={{ color: blue }}>לעשות. בפועל. במקומך.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION 5: AUTHORITY ─────────────────────────────────────────────────────
function Authority() {
  const creds = [
    "ליוויתי עשרות משפחות לשלווה פיננסית אמיתית",
    "329 נשים בוגרות התוכנית שלי - שהיום יודעות, מבינות, ומנהלות",
    "כותבת טור \"שוות הון\" במגזין \"בתוך המשפחה\"",
    "מייסדת הקהילה הגדולה של צוברות פיננסיות - נשים שמדברות שוק ההון",
  ];
  return (
    <section style={{ background: white, padding: "0 1.5rem 72px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 56, alignItems: "center" }}>

          {/* Photo placeholder with VIP badge */}
          <div style={{ order: 1 }}>
            <div style={{ width: "100%", maxWidth: 380, aspectRatio: "4/5", borderRadius: 24, margin: "0 auto", overflow: "hidden", background: `radial-gradient(ellipse at 50% 30%, #1535B5, ${navy})`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <img src="/rivky-salon.png" alt="רבקי וייס" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>

          {/* Text */}
          <div style={{ order: 2, textAlign: "right" }}>
            <Pill bg={blue}>נעים להכיר</Pill>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: blue, marginBottom: 6 }}>רבקי וייס</h2>
            <p style={{ fontSize: "1rem", color: "#555", marginBottom: 24, fontWeight: 600 }}>
              מייסדת מצב צבירה
              <br />
              כותבת טור "שוות הון" במגזין "בתוך המשפחה"
            </p>

            <div style={{ borderRight: `4px solid ${green}`, paddingRight: 20, marginBottom: 24 }}>
              <p style={{ fontSize: "1.02rem", lineHeight: 1.9, color: "#292929" }}>
                לפני שבניתי את מצב צבירה - הייתי פאנית.
                <br />
                על הגז, מרוויחה, ולא נוגעת לכסף.
              </p>
            </div>

            <div style={{ background: blue, color: white, borderRadius: 16, padding: "20px 24px", marginBottom: 24, fontSize: "1rem", lineHeight: 1.8 }}>
              הסתכלתי על מזכירה שמרוויחה שליש ממני.
              <br />
              וראיתי שהיא תגיע לחתונות הילדים ברווחה, לפנסיה בשלווה -
              <br />
              <strong>בזמן שאני, "העשירה", אעבוד נון סטופ לסגור הלוואות.</strong>
              <br />
              ההבדל היחיד בינינו?
              <br />
              <motion.span initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "inline-block", fontSize: "2rem", fontWeight: 800, color: white }}>
                ידע.
                <Underline color={red} delay={0.5} seed="6" />
              </motion.span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {creds.map((c, i) => (
                <motion.p key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}
                  style={{ fontSize: "0.95rem", color: "#292929", margin: 0, lineHeight: 1.6 }}>
                  {c}
                </motion.p>
              ))}
            </div>

            <div style={{ borderRight: `3px solid ${green}`, paddingRight: 16, marginBottom: 28 }}>
              <p style={{ fontSize: "1rem", fontWeight: 700, color: blue, lineHeight: 1.8, margin: 0 }}>
                הסמכות שלי לא נמדדת בתואר.
                <br />
                <span style={{ color: "#292929", fontWeight: 400 }}>היא נמדדת ב-311,000 שקל שחזרו ללקוחה שלי בשנה אחת - ובעשרות נשים שיאמרו לך שחייהן הפיננסיים השתנו.</span>
              </p>
            </div>

            <BrushBtn href="#contact-form">בדקי אם יש לך מקום במחזור הקרוב</BrushBtn>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 48 }}>
        <div style={{ width: 280, height: 3, background: `linear-gradient(to right, transparent, ${red}, transparent)`, borderRadius: 2 }} />
      </div>
      <style>{`@media(max-width:768px){ .about-grid{ grid-template-columns:1fr!important; } }`}</style>
    </section>
  );
}

// ─── SECTION 6: SOLUTION REVEAL ──────────────────────────────────────────────
function SolutionReveal() {
  const services = [
    { n: 1, name: "מסלול היעדים",    sub: "תוכנית השקעה מותאמת אישית",    desc: "בונות לך מסלול השקעה מותאם ליעדים שלך - חיתונות, דירה, פנסיה בכבוד. את מקבלת תוכנית. אנחנו פותחות את החשבונות." },
    { n: 2, name: "כרית הנשימה",     sub: "רזרבת ביטחון פסיכית",            desc: "בונות לך רזרבת ביטחון בקרן כספית - כסף נזיל שצומח בצד, שיחזיק אותך גם ביום שהעסק מתנדנד או שתרצי לעצור. את ממשיכה לישון." },
    { n: 3, name: "ניתוח המשכנתא",  sub: "איפה הבנק חוגג עלייך",           desc: "יועצת משכנתא בכירה שאני עובדת איתה תבדוק אם יש מה למחזר - מסלולים, ריביות, הפרשים. אם יש פוטנציאל - היא עובדת איתך ישירות. התשלום אליה נפרד." },
    { n: 4, name: "ניקוי הרעלים",   sub: "ביטוחים ועמלות מיותרות",         desc: "סורקות, מוציאות כפילויות, ומשאירות רק מה שצריך. את משלמת פחות. מכוסה יותר." },
    { n: 5, name: "ציד האוצרות",    sub: "כספים אבודים שחיכו לך",          desc: "מאתרות כספים שנחים ולא פעילים בחברות ביטוח - ומעבירות אותם לעבוד בשבילך." },
    { n: 6, name: "החזר המס שלך",  sub: "כסף שכבר שילמת - חוזר אלייך",   desc: "יועצת מס שאני עובדת איתה תבדוק אם מגיע לך החזר מס - עד 6 שנים אחורה. 8 מתוך 10 נשים זכאיות ולא יודעות. אם יש החזר - היא מטפלת ישירות מולך. התשלום אליה נפרד." },
  ];
  return (
    <section style={{ background: `radial-gradient(ellipse at 50% 20%, #1535B5 0%, ${navy} 70%)`, padding: "72px 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: 56 }}>
          <Pill bg="rgba(33,240,176,0.12)">הפתרון</Pill>
          <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 900, color: white, lineHeight: 1.15, marginBottom: 8 }}>
            מצב צבירה <span style={{ color: green }}>VIP</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 580, margin: "0 auto 12px" }}>
            ליווי פיננסי אישי - שבו אנחנו נכנסות לנעליים שלך, עושות את כל העבודה, ואת יוצאת עם הון שעובד בשבילך.
          </p>
          <p style={{ color: red, fontWeight: 700, fontSize: "0.95rem" }}>זה לא לימוד עצמי. זה לא ייעוץ מרחוק. אנחנו פשוט עושות.</p>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", marginTop: 8 }}>הליווי מתבצע בשיתוף נותני שירות מורשים ומוסמכים בכל תחום.</p>
        </motion.div>

        <div className="solution-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {services.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ type: "spring", stiffness: 240, damping: 24, delay: (i % 3) * 0.08 }}
              whileHover={{ scale: 1.02, boxShadow: `0 0 30px rgba(33,240,176,0.18)`, transition: { duration: 0.18 } }}
              style={{ background: "rgba(10,20,60,0.7)", border: `1px solid rgba(33,240,176,0.22)`, borderRadius: 16, padding: "24px 28px", backdropFilter: "blur(8px)", cursor: "default", textAlign: "right" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: "50%", background: "#0D1B4A", border: `2px solid ${green}`, boxShadow: `0 0 12px rgba(33,240,176,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", color: green, fontSize: "1rem", fontWeight: 900 }}>
                  {s.n}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.02rem", fontWeight: 800, color: white, margin: "0 0 2px" }}>{s.name}</h3>
                  <p style={{ fontSize: "0.8rem", color: green, margin: 0, fontWeight: 600 }}>{s.sub}</p>
                </div>
              </div>
              <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){ .solution-grid{ grid-template-columns:1fr 1fr!important; } } @media(max-width:600px){ .solution-grid{ grid-template-columns:1fr!important; } }`}</style>
    </section>
  );
}

// ─── SECTION 7: VALUE STACK ───────────────────────────────────────────────────
function ValueStack() {
  const items = [
    { icon: "", name: "מסלול היעדים",   action: "מדמי ניהול מקסימליים - לדמי ניהול מינימליים",  value: "הפרש של מאות אלפי שקלים לאורך הדרך", ctx: "תוצאות משתנות." },
    { icon: "", name: "ניתוח המשכנתא",  action: "יועצת משכנתא בכירה בודקת אם יש פוטנציאל מיחזור",  value: "חיסכון ממוצע של 80,000-250,000 ש\"ח",   ctx: "אם יש מה למחזר - היא עובדת ישירות מולך. התשלום אליה נפרד." },
    { icon: "", name: "ניקוי הרעלים",   action: "ביטול כפילויות ועמלות מיותרות",              value: "300-700 ש\"ח פחות בחודש = 72,000-168,000 ש\"ח לאורך 20 שנה", ctx: "" },
    { icon: "", name: "ציד האוצרות",   action: "איתור והפעלת כספים רדומים שנחים בחברות ביטוח",  value: "7,000-40,000 ש\"ח שחוזרים ישר אלייך", ctx: "" },
    { icon: "", name: "החזר המס שלך",  action: "יועצת מס בודקת זכאות עד 6 שנים אחורה",       value: "ממוצע החזר: 10,500 ש\"ח לשנה", ctx: "6 שנים אחורה = פוטנציאל של עד 63,000 ש\"ח. התשלום ליועצת נפרד." },
    { icon: "", name: "פתיחת תיק השקעות מותאם אישית", action: "אני איתך יד ביד - בונה לך תוכנית מותאמת בפיזור נכון, שתואם בדיוק לנתוני החיים והיעדים שלך",  value: "תיק שבנוי נכון מהיום הראשון", ctx: "תוצאות משתנות." },
    { icon: "", name: "בדיקת התיק הפיננסי שלך",  action: "סריקה מלאה של המסלולים שלך - מסלולים כשרים בלבד, והתאמה מקסימלית לגיל, לאופי ולרמת הסיכון שלך",  value: "התאמה מדויקת - בלי לשלם על מה שלא מתאים לך", ctx: "" },
  ];
  return (
    <section style={{ background: blue, padding: "72px 1.5rem", textAlign: "center" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <Pill>בואי נדבר מספרים</Pill>
        <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)", fontWeight: 900, color: white, lineHeight: 1.3, marginBottom: 8 }}>
          לא "כמה זה עולה" -
          <br />
          <span style={{ color: green }}>כמה עולה לך לא לעשות את זה?</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: 48 }}>כמה עולה לך כל שנה שעוברת בלי זה?</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: "rgba(0,0,0,0.25)", borderRadius: 16, padding: "20px 28px", textAlign: "right", borderRight: `4px solid ${green}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.78rem", fontWeight: 700, color: green, margin: "0 0 4px", letterSpacing: 0.5 }}>{item.icon} {item.name}</p>
                  <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", margin: "0 0 8px" }}>{item.action}</p>
                  {item.ctx && <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", margin: 0, fontStyle: "italic" }}>{item.ctx}</p>}
                </div>
                <div style={{ textAlign: "left", flexShrink: 0 }}>
                  <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.05rem)", fontWeight: 800, color: white, margin: 0, lineHeight: 1.4 }}>{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: "rgba(33,240,176,0.1)", border: `2px solid ${green}`, borderRadius: 20, padding: "28px 36px", marginBottom: 16 }}>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.88rem", marginBottom: 8 }}>כשמחברים את הכל ביחד:</p>
          <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)", fontWeight: 900, color: white, lineHeight: 1.3, marginBottom: 6 }}>
            ערך פוטנציאלי של
            <br />
            <span style={{ color: green }}>מאות אלפי שקלים</span>
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginBottom: 0 }}>שפשוט מחכים לך. בלי לעבוד יותר. בלי ללמוד כלום.</p>
        </motion.div>

        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", fontStyle: "italic", marginBottom: 32 }}>
          *התוצאות משתנות בהתאם למצב האישי של כל לקוחה. הדוגמאות מבוססות על ממוצעי שוק ואינן מהוות הבטחה.
        </p>

        <BrushBtn href="#contact-form" variant="green">בדקי אם יש לך מקום במחזור הקרוב</BrushBtn>
      </div>
    </section>
  );
}

// ─── SECTION 8: TESTIMONIALS ─────────────────────────────────────────────────
function VipTestimonials() {
  const testimonials = [
    { name: "שרי כ.", title: "מאמנת עסקית", ctx: "אמא ל-7", highlight: "311,000 ש\"ח - ההפרש לאורך הזמן", quote: "עשר שנים שילמתי לסוכן ולא שאלתי שאלות. הוא תמיד אמר 'הכל בסדר' ואני האמנתי לו. רבקי ביקשה ממני דוח פנסיה אחד. גיליתי 2% דמי ניהול. היא הסתכלה עלי ואמרה: 'את יודעת כמה זה שווה לך לאורך הזמן?' - 311,000 שקל. ישבתי דקה שלמה בשקט. לא ידעתי אם לבכות או לצחוק. תוך שבועיים הורדנו ל-0.8%. עשר שנים ישנתי. שבועיים שינו הכל." },
    { name: "מיכל ר.", title: "מנהלת שיווק", ctx: "אמא ל-4", highlight: "500,000 ש\"ח - מפנסיה לא פעילה שאוחדה", quote: "חשבתי שהסעיף של כספים אבודים לא רלוונטי לי. רבקי מצאה לי פנסיה לא פעילה שישבה שנים בלי שידעתי. אחדנו אותה, העברנו למסלול מנייתי - ומהחלטה הזו לבד הרווחתי חצי מיליון שקל. חצי מיליון. רק מזה. ובכל יום שהייתי ממשיכה לחכות - הייתי מפסידה ריבית דריבית שלא חוזרת. הרגשתי טיפשה. היא אמרה לי: 'את לא טיפשה, את עסוקה.' זה בדיוק מה שהייתי צריכה לשמוע." },
    { name: "חנה ד.", title: "גננת עצמאית", ctx: "אמא ל-5", highlight: "187,000 ש\"ח חיסכון במשכנתא", quote: "הגעתי לרבקי בגלל המשכנתא. הרגשתי שמשהו לא מסתדר בתשלומים אבל לא הבנתי מספיק כדי לשאול שאלות. היא פירקה את כל המסלולים, מצאה שאני על מסלול יקר. המחזור לקח 3 שבועות. חסכתי 187,000 ש\"ח לאורך יתרת המשכנתא. זו חתונה שלמה לילד שלי. הכסף הזה היה שם כל הזמן. רק חיכה שמישהי תשאל את השאלות הנכונות." },
    { name: "שירה ב.", title: "שכירה", ctx: "אמא ל-7, בלע\"ר", highlight: "250,000 ש\"ח - רק מחיסכון לכל ילד", quote: "כל הזמן ישב לי בראש שאני צריכה לטפל בחיסכון לכל ילד. שבעה ילדים, בלע\"ר - אז תחשבי כמה חשבונות. אבל רצונות לחוד ומעשים לחוד. הצוות של רבקי פשוט נכנס, התאים מסלולים, עשה פיזור השקעות נכון - בלי שהטרידו אותי בשאלות שלא הבנתי. במצטבר, רק מהחיסכון הזה לבד, הרווחתי 250,000 ש\"ח. זה נשמע לא הגיוני - אבל זאת האמת. לא היה לי זמן ולא סבלנות לטפל בזה. הצוות טיפל." },
    { name: "דבורה ח.", title: "", ctx: "", highlight: "פיזור השקעות נכון ובטוח - שלא הייתי מגיעה אליו לבד", quote: "הגעתי אליך כשהייתי בטוחה שאני \"מהיודעות\". שמתי את כל החיסכונות וההשקעות שלי במדד אחד - נשמע הגיוני, לא? רבקי הסתכלה על התמונה המלאה ועשתה לי פיזור נכון ובטוח. לא הייתי מגיעה לזה לבד. הכל כשר וברור - ובדיוק לכן זה עבד. תמשיכי בשליחות בכל הכח." },
  ];
  return (
    <section style={{ background: white, padding: "72px 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Pill bg={blue}>תוצאות אמיתיות</Pill>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: blue, marginTop: 8, lineHeight: 1.3 }}>
            מה אומרות הנשים
            <br />
            שכבר עברו את המחזור.
          </h2>
        </div>

        <div className="test-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 40 }}>
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 60, scale: 0.92 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ type: "spring", stiffness: 240, damping: 22, delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 48px rgba(18,74,240,0.14)", transition: { duration: 0.22 } }}
              style={{ background: white, borderRadius: 20, padding: "28px 24px", border: `1px solid ${blue}`, position: "relative", cursor: "default" }}>
              <motion.img src="/testimonial-circle.png" alt="" animate={{ rotate: 360, scale: [1, 1.18, 0.92, 1.12, 1] }} transition={{ rotate: { duration: 6, repeat: Infinity, ease: "linear" }, scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } }}
                style={{ position: "absolute", top: 12, left: 12, width: 48, height: 48, opacity: 0.65, pointerEvents: "none", userSelect: "none" }} />
              <div style={{ fontSize: "3.5rem", color: green, lineHeight: 0.7, fontFamily: "Georgia, serif", marginBottom: 12 }}>״</div>
              <div style={{ background: blue, color: white, borderRadius: 8, padding: "6px 14px", fontSize: "0.85rem", fontWeight: 700, display: "inline-block", marginBottom: 16 }}>
                {t.highlight}
              </div>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#292929", marginBottom: 20 }}>{t.quote}</p>
              <div>
                <p style={{ fontWeight: 700, color: blue, fontSize: "0.9rem", margin: "0 0 2px" }}>{t.name}</p>
                <p style={{ fontSize: "0.82rem", color: "#777", margin: 0 }}>{t.title} - {t.ctx}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ background: light, borderRadius: 16, padding: "16px 28px", display: "inline-block", marginBottom: 32 }}>
            <p style={{ color: blue, fontWeight: 700, fontSize: "0.95rem", margin: 0 }}>
              4 מחזורים SOLD OUT לפני שנפתחה ההרשמה הרשמית.
              <span style={{ color: "#555", fontWeight: 400 }}> המחזור החמישי - הרשמה פתוחה.</span>
            </p>
          </div>
          <br />
          <BrushBtn href="#contact-form">בדקי אם יש לך מקום במחזור הקרוב</BrushBtn>
          <p style={{ color: "#888", fontSize: "0.82rem", marginTop: 10 }}>ללא התחייבות - שיחת היכרות קצרה, בלי לחץ</p>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 9: URGENCY QUOTE ─────────────────────────────────────────────────
function UrgencyQuote() {
  return (
    <section style={{ background: `radial-gradient(ellipse at 50% 50%, #1535B5 0%, ${navy} 70%)`, padding: "80px 1.5rem", textAlign: "center" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", letterSpacing: 2, marginBottom: 24 }}>מציאות פיננסית</p>
          <p style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 16 }}>
            הכסף שלך לא עומד במקום.
            <br />
            הוא זז כל יום.
            <br />
            השאלה היחידה היא: לאיזה כיוון.
          </p>
          <p style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)", fontWeight: 900, color: white, lineHeight: 1.3, marginBottom: 32 }}>
            כסף שלא עובד עבורך
            <br />
            <span style={{ color: red }}>עובד נגדך.</span>
          </p>
          <div style={{ background: "rgba(33,240,176,0.1)", border: `1px solid rgba(33,240,176,0.3)`, borderRadius: 16, padding: "18px 28px", display: "inline-block" }}>
            <p style={{ color: green, fontWeight: 800, fontSize: "0.95rem", margin: "0 0 4px" }}>
              מחזור חמישי - 20 מקומות בלבד.
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", margin: 0 }}>
              ארבעת המחזורים הקודמים SOLD OUT.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION 10: WHY STORY ────────────────────────────────────────────────────
function WhyStory() {
  const changes = [
    "✦ דמי ניהול - חברות ביטוח עדיין גובות 1.5%-2% ממי שלא בדקה. כל שנה = עוד עשרות אלפי שקלים שנגזרים.",
    "✦ כספים אבודים - מיליארדי שקלים ממתינים לתביעה. חלקם שייכים לנשים שלא ידעו לחפש.",
    "✦ ביטוחים כפולים - רוב הנשים שנכנסות לליווי מגלות לפחות ביטוח אחד מיותר של מאות שקלים בחודש.",
    "✦ תיקי השקעה - הפער בין תיק מנוהל בחוכמה לתיק שנשכח ברירת המחדל יכול להסתכם במיליון שקלים לאורך 30 שנה.",
  ];
  return (
    <section style={{ background: blue, padding: "72px 1.5rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "right" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Pill>למה בניתי את זה</Pill>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 900, color: white, marginTop: 8 }}>
            למה בניתי שירות שעושה -
            <br />
            <span style={{ color: green }}>ולא רק מלמד?</span>
          </h2>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
          style={{ background: "rgba(0,0,0,0.25)", borderRadius: 20, padding: "32px 36px", marginBottom: 32, borderRight: `4px solid ${green}` }}>
          <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 2, fontSize: "1rem", marginBottom: 16 }}>
            329 נשים עברו את תוכנית המאסטרית.
            <br />
            הן הבינו. ידע אמיתי. מהיסוד.
          </p>
          <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 2, fontSize: "1rem", marginBottom: 0 }}>
            אבל חלקן עצרו. לא כי הן לא הבינו.
            <br />
            כי חזרו הביתה - לילדים, ללקוחות, ללחץ.
            <br />
            <strong style={{ color: white }}>הידע נשאר. הפעולה לא קרתה.</strong>
          </p>
        </motion.div>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <p style={{ fontSize: "1.1rem", fontWeight: 800, color: white }}>הבנתי שידע לבד לא מספיק.</p>
          <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.9 }}>
            מה שמשנה חיים זה מישהי שנכנסת ועושה.
            <br />
            לכן בניתי שירות שבו אני עושה. לא מלמדת. עושה.
          </p>
        </div>

        <h3 style={{ color: white, fontWeight: 800, fontSize: "1.05rem", marginBottom: 20, textAlign: "center" }}>
          ומה שקורה בשוק עכשיו רק מחזק את זה:
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
          {changes.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ background: "rgba(0,0,0,0.2)", borderRadius: 12, padding: "14px 20px" }}>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>{c}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ background: "rgba(33,240,176,0.1)", border: `2px solid ${green}`, borderRadius: 16, padding: "20px 28px", textAlign: "center" }}>
          <p style={{ color: white, fontWeight: 800, fontSize: "1.05rem", marginBottom: 4 }}>המחזור החמישי נפתח עכשיו.</p>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", marginBottom: 12 }}>
            ארבעת המחזורים הקודמים SOLD OUT.
            <br />
            20 מקומות בלבד.
          </p>
          <BrushBtn href="#contact-form" variant="green">את מוכנה? נתחיל.</BrushBtn>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SECTION 11: FAQ ──────────────────────────────────────────────────────────
function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    { q: "אני שכירה - זה רלוונטי לי?", a: "בהחלט. רוב הלקוחות שלי הן שכירות בשכר גבוה. הפנסיה, קרן ההשתלמות וחיסכון לכל ילד שלך - אלה בדיוק הכלים שנעבד ביחד. לפעמים דווקא שכירות מפסידות יותר כי מניחות שה'מעסיק מסדר'." },
    { q: "כמה זמן לוקח הליווי?", a: "בין 4 ל-8 שבועות, תלוי במורכבות התיק שלך. את לא צריכה להיות זמינה כל הזמן - אני עושה את העבודה. את מאשרת החלטות ומקבלת עדכונים." },
    { q: "כמה עולה הליווי?", a: "המחיר המדויק נמסר בשיחת ההיכרות - לאחר שאני מבינה את התמונה שלך. מה שאני יכולה לומר בבטחה: אצל רוב הלקוחות ההשקעה בליווי מחזירה את עצמה כבר בחודשים הראשונים - מהחיסכון בדמי ניהול, מהכספים האבודים, ומביטולי הכפילויות. זה לא עלות. זה השקעה שמכניסה." },
    { q: "מה קורה אם אני לא מתקבלת?", a: "50% מהפונות לא מתקבלות - לא כי הן לא ראויות, כי הן לא במקום הנכון עבור הליווי הזה. אם זה המצב, אני אגיד לך את זה ישר, ואמליץ מה כן מתאים לך." },
    { q: "האם יש מה לעשות אם יש לי מעט חסכונות?", a: "כן. ליווי לא מתחיל מ'יש לך כסף'. הוא מתחיל ממה שיש לך כבר - פנסיה, קרן השתלמות, ביטוחים. גם עם תיק קטן, האופטימיזציה שווה עשרות אלפי שקלים לאורך הזמן." },
  ];

  return (
    <section style={{ background: light, padding: "72px 1.5rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Pill bg={blue}>שאלות שכולן שואלות</Pill>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", color: blue, marginTop: 8, lineHeight: 1.3 }}>
            לפני שתמלאי את הטופס
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10px" }} transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{ background: white, borderRadius: 14, border: `1px solid ${open === i ? blue : "#E8EDFF"}`, overflow: "hidden", transition: "border-color 0.2s" }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "right", fontFamily: "inherit" }}>
                <p style={{ fontSize: "1rem", fontWeight: 800, color: blue, margin: 0, lineHeight: 1.5, flex: 1 }}>{item.q}</p>
                <span style={{ color: blue, fontSize: "1.3rem", fontWeight: 400, flexShrink: 0, marginRight: 12, transform: open === i ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block", transition: "transform 0.25s" }}>+</span>
              </button>
              {open === i && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
                  style={{ padding: "0 24px 20px", borderTop: `1px solid #E8EDFF` }}>
                  <p style={{ fontSize: "0.92rem", color: "#444", lineHeight: 1.85, margin: "16px 0 0" }}>{item.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <BrushBtn href="#contact-form">יש לי עוד שאלה - בואי נדבר</BrushBtn>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 12: CTA FORM ─────────────────────────────────────────────────────
function CtaForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/vip-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch { /* silent */ }
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact-form" style={{ background: light, padding: "72px 1.5rem" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        {/* Not for everyone */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Pill bg={blue}>הצעד האחרון</Pill>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: blue, marginTop: 8, lineHeight: 1.3 }}>
            הליווי הזה לא מתאים לכולן.
          </h2>
          <p style={{ color: "#555", fontSize: "1rem", lineHeight: 1.8, maxWidth: 500, margin: "12px auto 0" }}>
            אם את רוצה להמשיך לדחות - לחכות לחודש שיהיה פחות עמוס - זה בסדר גמור.
          </p>
        </div>

        {/* Memorable quote */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ background: navy, borderRadius: 20, padding: "32px 36px", marginBottom: 28, textAlign: "center", boxShadow: `0 8px 32px rgba(6,13,60,0.18)` }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", marginBottom: 12 }}>תזכרי משפט אחד:</p>
          <p style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", fontWeight: 800, color: white, lineHeight: 1.6 }}>
            "ההזדמנות הכי טובה לטפל בכסף שלך
            <br />
            הייתה לפני עשור.
            <br />
            <span style={{ color: green }}>ההזדמנות השנייה הכי טובה היא עכשיו."</span>
          </p>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem", marginTop: 16 }}>
            כל שנה שעוברת היא לא ניטרלית. היא עולה לך כסף.
          </p>
        </motion.div>

        {/* For who */}
        <div style={{ background: white, borderRadius: 16, padding: "20px 28px", marginBottom: 32, borderRight: `4px solid ${blue}`, textAlign: "right" }}>
          <p style={{ fontWeight: 700, color: blue, fontSize: "1rem", marginBottom: 4 }}>מצד שני -</p>
          <p style={{ color: "#292929", fontSize: "0.98rem", lineHeight: 1.8, margin: 0 }}>
            אם את אישה שמרוויחה בכבוד, יודעת שהיא מפספסת משהו גדול,
            <br />
            ומוכנה לתת למישהי אחרת לעשות את העבודה -
            <br />
            <strong>המקום שלך איתנו.</strong>
          </p>
        </div>

        {/* 3 steps */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ textAlign: "center", fontWeight: 800, color: blue, fontSize: "1rem", marginBottom: 20 }}>כך זה עובד - פשוט מאוד:</p>
          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              { n: "1", title: "שיחת היכרות", desc: "כמה דקות. אני מבינה את התמונה שלך ואת בודקת אם הליווי מתאים לך." },
              { n: "2", title: "אנחנו עושות", desc: "הצוות נכנס לעבודה. את מאשרת החלטות. בלי שעות ביורוקרטיה." },
              { n: "3", title: "כסף שחוזר", desc: "מקבלת דוח סיכום מלא - מה הורדנו, מה מצאנו, כמה חזר אלייך." },
            ].map((s, i) => (
              <div key={i} style={{ background: white, borderRadius: 14, padding: "18px 16px", textAlign: "center", border: `1px solid rgba(18,74,240,0.18)`, boxShadow: "0 2px 12px rgba(18,74,240,0.07)" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: blue, color: white, fontWeight: 900, fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>{s.n}</div>
                <p style={{ fontWeight: 800, color: blue, fontSize: "0.92rem", marginBottom: 6 }}>{s.title}</p>
                <p style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`.steps-grid { } @media(max-width:520px){ .steps-grid{ grid-template-columns:1fr!important; } }`}</style>

        {/* Form card */}
        <div className="form-card" style={{ background: `linear-gradient(160deg, ${blue} 0%, #0a38c4 100%)`, borderRadius: 28, padding: "48px 40px", boxShadow: `0 20px 60px rgba(18,74,240,0.28)`, textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", background: green, color: navy, borderRadius: 50, padding: "6px 24px", fontSize: "0.88rem", fontWeight: 800, whiteSpace: "nowrap" }}>
            20 מקומות בלבד
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <h3 style={{ color: white, fontSize: "1.4rem", fontWeight: 800, marginBottom: 12 }}>קיבלתי את הפנייה שלך!</h3>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.8 }}>
                אחזור אלייך תוך 24 שעות לשיחת היכרות קצרה.
                <br />
                בלי לחץ, בלי התחייבות.
              </p>
            </motion.div>
          ) : (
            <>
              <h3 style={{ color: white, fontSize: "clamp(1.3rem, 3vw, 1.7rem)", fontWeight: 800, marginBottom: 8, marginTop: 8 }}>
                מוכנה שנתחיל לעשות?
              </h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem", marginBottom: 28 }}>
                להגשת מועמדות למחזור הקרוב - מלאי את הטופס ואני אחזור אלייך תוך 24 שעות.
              </p>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                {[
                  { key: "name",  placeholder: "שם מלא",    type: "text",  required: true },
                  { key: "phone", placeholder: "טלפון",      type: "tel",   required: true },
                  { key: "email", placeholder: "מייל",       type: "email", required: true },
                ].map(({ key, placeholder, type, required }) => (
                  <input key={key} type={type} placeholder={placeholder} required={required} value={(form as Record<string,string>)[key]}
                    onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                    style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: 12, padding: "14px 18px", color: white, fontSize: "1rem", textAlign: "right", outline: "none", width: "100%", boxSizing: "border-box" as const }}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = green; }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.25)"; }}
                  />
                ))}

                <button type="submit" disabled={loading}
                  style={{ position: "relative", background: "transparent", border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", display: "inline-block", padding: 0, transition: "transform 0.2s", opacity: loading ? 0.7 : 1 }}
                  onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-green.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 43%" }} />
                  <span style={{ position: "relative", zIndex: 1, color: navy, padding: "18px 48px", fontWeight: 800, fontSize: "1.1rem", display: "block" }}>
                    {loading ? "שולחת..." : "בדקי אם יש לך מקום במחזור הקרוב"}
                  </span>
                </button>
              </form>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 20 }}>
                <p style={{ color: red, fontWeight: 700, fontSize: "0.9rem", marginBottom: 4 }}>
                  כל חודש שעובר בלי זה - הזדמנות שאי אפשר להחזיר.
                </p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", lineHeight: 1.7 }}>
                  מספר המקומות מוגבל ל-20 בכל מחזור.
                  <br />
                  50% מהפונות נדחות - אני מחפשת נשים שרוצות לפעול.
                  <br />
                  אין דף סליקה אחרי הטופס - שיחת היכרות קצרה, בלי לחץ.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Legal */}
        <p style={{ textAlign: "center", color: "#999", fontSize: "0.78rem", lineHeight: 1.6, marginTop: 20 }}>
          כל האמור הוא למטרת העשרה והדרכה בלבד ואינו מהווה ייעוץ פיננסי, המלצה להשקעה או תחליף לייעוץ מקצועי.
          <br />
          כל פעולה בשוק ההון הינה על אחריותך בלבד.
        </p>
      </div>
      <style>{`
        .form-card input::placeholder { color: rgba(255,255,255,0.7); }
        @media(max-width:520px){ .form-card{ padding:36px 20px!important; border-radius:20px!important; } }
      `}</style>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function VipPage() {
  return (
    <>
      <Navigation />
      <StickyBtn />
      <main style={{ direction: "rtl", paddingTop: 80 }}>
        <VipHero />
        <Divider from={navy} to={blue} />
        <ProblemStats />
        <Divider from={blue} to={navy} />
        <PainCouch />
        <Divider from={navy} to={white} />
        <TurningPoint />
        <Authority />
        <Divider from={white} to={navy} />
        <SolutionReveal />
        <Divider from={navy} to={blue} />
        <ValueStack />
        <Divider from={blue} to={white} />
        <VipTestimonials />
        <Divider from={white} to={navy} />
        <UrgencyQuote />
        <Divider from={navy} to={blue} />
        <WhyStory />
        <Divider from={blue} to={light} flip />
        <Faq />
        <CtaForm />
      </main>
    </>
  );
}
