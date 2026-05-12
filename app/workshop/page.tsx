"use client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedUnderline({ color = "#FA5C5C", delay = 0.5 }: { color?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.span
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      style={{
        display: "block",
        height: 3,
        background: color,
        borderRadius: 2,
        marginTop: 6,
        transformOrigin: "right",
      }}
    />
  );
}

const brushMap: Record<string, string> = {
  "#124AF0": "/brush-blue.svg",
  "#21F0B0": "/brush-green.svg",
  "#FA5C5C": "/brush-red.svg",
  "#070C24": "/brush-dark.svg",
};

function BrushBtn({
  href,
  onClick,
  children,
  color = "#124AF0",
  textColor = "white",
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  color?: string;
  textColor?: string;
}) {
  const inner = (
    <span style={{
      display: "block",
      background: "white",
      color: color,
      fontWeight: 700,
      fontSize: "1rem",
      padding: "16px 24px",
      borderRadius: 50,
      border: `2px solid ${color}`,
      textAlign: "center",
      textDecoration: "none",
      transition: "all 0.15s",
      cursor: "pointer",
    }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#F0F4FF"; el.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "white"; el.style.transform = "translateY(0)"; }}>
      {children}
    </span>
  );
  return (
    <div onClick={onClick}>
      {href ? <a href={href} style={{ textDecoration: "none" }}>{inner}</a> : inner}
    </div>
  );
}

const lectureTopics = [
  {
    title: "איפה שוק ההון פוגש אותך - ולמה זה קשור אלייך ביג טיים",
    desc: "הפנסיה שלך, חיסכון לכל ילד, השתלמות, גמל - את כבר מושקעת בשוק ההון ולא ידעת. נבין יחד מה זה אומר, למה השקעה פאסיבית מנצחת לטווח הארוך, ולמה זה הכי רלוונטי לחיים שלך ממש עכשיו.",
  },
  {
    title: "דמי ניהול וריבית דריבית - הפלא השמיני שחייבות להכיר",
    desc: "דמי ניהול של חצי אחוז נשמעים כמו כלום - ועולים לך עשרות אלפי שקלים לאורך השנים. נראה מספרים אמיתיים, נבין את כוח הריבית דריבית, ונדע בדיוק מה לשנות.",
  },
  {
    title: "צעדים קונקרטיים למחר בבוקר - שיוויחו לך מאות אלפי שקלים",
    desc: "יוצאות עם רשימה ברורה של מה עושים עכשיו. פשוט, מעשי, בלי ז'רגון - כי ידע בלי פעולה הוא סתם מידע.",
  },
];

const workshopTopics = [
  {
    title: "מה כבר יש לך - ואיפה הכסף שלך עכשיו",
    desc: "פנסיה, השתלמות, גמל, חיסכון לכל ילד - בודקות יחד מה יש לך, מה דמי הניהול שאת משלמת, ואיפה את מפסידה בלי לדעת. יוצאת עם תמונה מלאה על הכסף שלך.",
  },
  {
    title: "בונות את התיק שלך - בדיוק בשבילך",
    desc: "מבינות מה זה מדד, למה השקעה פאסיבית מנצחת, ואיך מדד DCA עושה את כל העבודה. בונות יחד תיק מותאם לחיים שלך - לפי סיבולת הסיכון, המטרות והזמן שיש לך.",
  },
  {
    title: "פותחות תיק ביחד - ויוצאות עם תיק עובד",
    desc: "כל אחת פותחת תיק מסחר עצמאי בזמן אמת, מגדירה הוראת קבע אוטומטית ויוצאת עם תיק פאסיבי פעיל ועובד. לא תיאוריה - תיק אמיתי.",
  },
];

const audiences = [
  { label: "ארגוני רווחה ועובדות סוציאליות" },
  { label: "עיריות ורשויות מקומיות" },
  { label: "ימי גיבוש ארגוניים" },
  { label: "ימי העשרה לעובדות" },
  { label: "חברות ומעסיקים" },
  { label: "מוסדות חינוך ובתי ספר" },
  { label: "ארגוני נשים ועמותות" },
  { label: "מסגרות לנשים ובנות" },
];

const testimonials = [
  {
    badge: "לא האמנתי שהמורות ככה יהיו מרותקות",
    quote: "הזמנתי את רבקי ליום הערכות לצוות. חיפשתי משהו שונה ומעניין - לא האמנתי שהמורות ככה נהנו והיו מרותקות. לרבקי יש כשרון לרתק ולפשט כל מושג פיננסי למובן. חבל שלא הכרתי את המושגים עד היום. הצוות שלי הרוויח בזכות המדריך של רבקי עשרות אלפי שקלים. תמשיכי בשליחות.",
    name: "ר. טורג'מן",
    org: "",
    type: "הרצאה",
  },
  {
    badge: "יצאנו עם ידע - ותכלס עם תיק השקעות פעיל",
    quote: "רבקי העבירה את הסדנה - היה מרתק, מעשי ופרקטי. כולנו יצאנו עם ידע ותכלס עם תיק השקעות פעיל. מינפנו את כל מה שיש לנו. רבקי מקצועית ואנושית - פשוט מומלץ.",
    name: "",
    org: "מחלקת רווחה",
    type: "סדנה",
  },
];

export default function WorkshopPage() {
  const [activeProduct, setActiveProduct] = useState<"lecture" | "workshop">("lecture");
  const [form, setForm] = useState({ name: "", phone: "", org: "", type: "הרצאה", participants: "", date: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.org) {
      setError("נא למלא שם, טלפון ושם ארגון");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/workshop-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("משהו השתבש. נסי שוב או צרי קשר ישירות.");
    } finally {
      setLoading(false);
    }
  };

  const topics = activeProduct === "lecture" ? lectureTopics : workshopTopics;

  return (
    <>
      <Navigation />
      <main style={{ paddingTop: 160 }}>

        {/* Hero */}
        <section style={{ background: "#070C24", padding: "80px 1.5rem 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          {/* decorative circles */}
          <motion.div animate={{ y: [0, -18, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: 40, right: 60, width: 90, height: 90, borderRadius: "50%", background: "#FA5C5C", pointerEvents: "none", opacity: 0.9 }} />
          <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            style={{ position: "absolute", bottom: 30, left: 80, width: 70, height: 70, borderRadius: "50%", background: "#21F0B0", pointerEvents: "none", opacity: 0.9 }} />
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            style={{ position: "absolute", top: 80, left: 40, width: 50, height: 50, borderRadius: "50%", background: "#070C24", border: "3px solid rgba(255,255,255,0.15)", pointerEvents: "none" }} />
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            style={{ position: "absolute", bottom: 50, right: 120, width: 38, height: 38, borderRadius: "50%", background: "#124AF0", pointerEvents: "none", opacity: 0.7 }} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ position: "relative", maxWidth: 740, margin: "0 auto" }}>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20, position: "relative", zIndex: 1 }}>לארגונים ומוסדות</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.4rem)", color: "white", fontWeight: 900, marginBottom: 8, lineHeight: 1.25, textShadow: "0 0 12px rgba(255,255,255,0.8)", position: "relative", zIndex: 1 }}>
              שוק ההון בשפה שלנו
            </motion.h1>
            <AnimatedUnderline color="#FA5C5C" delay={0.5} />
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
              style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.05rem", lineHeight: 2, maxWidth: 580, margin: "28px auto 0" }}>
              את כבר מושקעת בשוק ההון. השאלה היא <span style={{ fontSize: "0.75em" }}>-</span> כמה את מפסידה כי אף אחד לא הסביר לך איך זה עובד.
            </motion.p>
          </motion.div>
        </section>

        {/* Red divider */}
        <div style={{ height: 3, background: "#FA5C5C" }} />

        {/* WOW Hook */}
        <section style={{ background: "white", padding: "80px 1.5rem" }}>
          <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
            <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p style={{ color: "#FA5C5C", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 32 }}>למה דווקא ההרצאה הזו</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 40 }}>
                <p style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.4rem)", color: "#292929", fontWeight: 700, lineHeight: 1.7, margin: 0 }}>
                  אין הרבה הרצאות שעושות אפקט של WOW ויכולות להיות משנות חיים.
                </p>
                <p style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.4rem)", color: "#292929", fontWeight: 700, lineHeight: 1.7, margin: 0 }}>
                  קשה גם לבחור נושא מרתק שכולן יתחברו אליו.
                </p>
                <p style={{ fontSize: "clamp(1.3rem, 3vw, 1.65rem)", color: "#124AF0", fontWeight: 900, lineHeight: 1.6, margin: "12px 0 0" }}>
                  כסף <span style={{ fontSize: "0.75em" }}>-</span> זה הנושא שנוגע לכולן, אבל כמעט אף אחת לא למדה אותו באמת.
                </p>
              </div>
              <AnimatedUnderline color="#FA5C5C" delay={0.3} />
              <p style={{ color: "#555", fontSize: "1.03rem", lineHeight: 2.1, marginTop: 36, maxWidth: 720, marginInline: "auto" }}>
                שוק ההון דוהר, הפנסיה שלך כבר שם <span style={{ fontSize: "0.75em" }}>-</span> והצורך להבין ולנהל את הכסף שלך הוא קריטי לכולן, לא רק לכלכלניות ולמשקיעות מנוסות.
                את השיעור החשוב שלא לימדו אותנו בבית ספר <span style={{ fontSize: "0.75em" }}>-</span> כי הגיע הזמן שגם הכסף שלנו יעשה השתדלות.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Red divider */}
        <div style={{ height: 3, background: "#FA5C5C" }} />

        {/* Two products */}
        <section style={{ background: "#F4F7FF", padding: "80px 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 14 }}>שני פורמטים</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#070C24", fontWeight: 700 }}>הרצאה או סדנה <span style={{ fontSize: "0.75em" }}>-</span> מה ההבדל?</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="products-grid">

              {/* Lecture card */}
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
                style={{ background: "white", borderRadius: 28, padding: "44px 36px", border: "2px solid #E8EDFF", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, left: 0, height: 5, background: "#124AF0" }} />
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#124AF0", borderRadius: 50, padding: "6px 18px", marginBottom: 24 }}>
                  <span style={{ color: "white", fontWeight: 700, fontSize: "0.9rem" }}>הרצאה</span>
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#070C24", marginBottom: 12, lineHeight: 1.3 }}>90 דקות שמשנות תפיסה</h3>
                <p style={{ color: "#555", fontSize: "0.95rem", lineHeight: 2, marginBottom: 28 }}>
                  הרצאה חיה שמחברת בין שוק ההון לחיים שלך. תצאי עם הבנה שחוסכת לך מאות אלפי שקלים - וכלים שאפשר לעשות איתם משהו כבר מחר.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {[
                    { label: "משך", val: "90 דקות" },
                    { label: "גודל קבוצה", val: "ללא הגבלה" },
                    { label: "פורמט", val: "הרצאה + שאלות" },
                    { label: "מה מקבלות", val: "מדריך פרקטי + בדיקת פנסיה חינם" },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #F4F7FF", paddingBottom: 12 }}>
                      <span style={{ color: "#888", fontSize: "0.88rem" }}>{r.label}</span>
                      <span style={{ fontWeight: 700, color: "#292929", fontSize: "0.9rem" }}>{r.val}</span>
                    </div>
                  ))}
                </div>
                <BrushBtn href="#contact-form" onClick={() => setForm(f => ({ ...f, type: "הרצאה" }))} color="#124AF0">
                  הזמיני הרצאה ←
                </BrushBtn>
              </motion.div>

              {/* Workshop card */}
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15, ease: [0.22,1,0.36,1] }}
                style={{ background: "white", borderRadius: 28, padding: "44px 36px", border: "2px solid #E8EDFF", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, left: 0, height: 5, background: "#124AF0" }} />
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#124AF0", borderRadius: 50, padding: "6px 18px", marginBottom: 24 }}>
                  <span style={{ color: "white", fontWeight: 700, fontSize: "0.9rem" }}>סדנה</span>
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#070C24", marginBottom: 12, lineHeight: 1.3 }}>3 מפגשים שבונים תיק עובד</h3>
                <p style={{ color: "#555", fontSize: "0.95rem", lineHeight: 2, marginBottom: 28 }}>
                  שלושה מפגשים פרונטליים שבסופם יש לך תיק השקעות פאסיבי מותאם אישית <span style={{ fontSize: "0.75em" }}>-</span> פתוח, עובד, שלך.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {[
                    { label: "משך", val: "3 מפגשים × 90 דקות" },
                    { label: "גודל קבוצה", val: "קבוצה קטנה" },
                    { label: "פורמט", val: "תרגולים + אישי + מעשי" },
                    { label: "מה מקבלות", val: "תיק פאסיבי מותאם + תיק פעיל" },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #F4F7FF", paddingBottom: 12 }}>
                      <span style={{ color: "#888", fontSize: "0.88rem" }}>{r.label}</span>
                      <span style={{ fontWeight: 700, color: "#292929", fontSize: "0.9rem" }}>{r.val}</span>
                    </div>
                  ))}
                </div>
                <BrushBtn href="#contact-form" onClick={() => setForm(f => ({ ...f, type: "סדנה" }))} color="#124AF0">
                  הזמיני סדנה ←
                </BrushBtn>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Red divider */}
        <div style={{ height: 3, background: "#FA5C5C" }} />

        {/* Topics */}
        <section style={{ background: "#050d1f", padding: "80px 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <p style={{ color: "#4fc8ff", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 14 }}>נושאים</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#ffffff", fontWeight: 700, marginBottom: 28 }}>על מה מדברים</h2>
              <div style={{ display: "inline-flex", background: "#080f24", borderRadius: 50, padding: 4, gap: 4, border: "1px solid #1a3060" }}>
                {(["lecture", "workshop"] as const).map((t) => (
                  <button key={t} onClick={() => setActiveProduct(t)}
                    style={{
                      background: activeProduct === t ? "#1a6fff" : "transparent",
                      color: activeProduct === t ? "white" : "#4fc8ff",
                      border: "none", borderRadius: 50, padding: "10px 28px", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", transition: "all 0.2s",
                      boxShadow: activeProduct === t ? "0 0 18px rgba(26,111,255,0.55)" : "none",
                    }}>
                    {t === "lecture" ? "הרצאה" : "סדנה"}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28, paddingTop: 24 }}>
              {topics.map((t, i) => (
                <motion.div
                  key={activeProduct + i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{
                    background: "#080f24",
                    borderRadius: 20,
                    padding: "44px 32px 32px",
                    border: "1px solid #1a6fff",
                    boxShadow: "0 0 28px rgba(0,229,192,0.08), 0 0 60px rgba(26,111,255,0.18), inset 0 0 40px rgba(26,111,255,0.04)",
                    position: "relative",
                    overflow: "visible",
                    display: "flex",
                    flexDirection: "column",
                  }}>

                  {/* Circle icon - top right, half outside */}
                  <div style={{
                    position: "absolute",
                    top: -22,
                    right: -18,
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "#050d1f",
                    border: "2px solid #00e5c0",
                    boxShadow: "0 0 18px rgba(0,229,192,0.7), 0 0 36px rgba(0,229,192,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#00e5c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="9" cy="7" r="4" stroke="#00e5c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="#00e5c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="#00e5c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* Step label */}
                  <p style={{ fontSize: "12px", color: "#4fc8ff", letterSpacing: "0.07em", marginBottom: 12, fontWeight: 400, textAlign: "right", direction: "rtl", margin: "0 0 10px" }}>
                    שלב {["א", "ב", "ג"][i]}
                  </p>

                  {/* Title */}
                  <h3 style={{ fontSize: "clamp(1.15rem, 2vw, 1.4rem)", fontWeight: 700, color: "#ffffff", marginBottom: 14, lineHeight: 1.45, textAlign: "right", direction: "rtl" }}>
                    {t.title}
                  </h3>

                  {/* Description */}
                  <p style={{ fontSize: "0.95rem", color: "#90aec8", lineHeight: 1.95, margin: "0 0 28px", textAlign: "right", direction: "rtl", flexGrow: 1 }}>
                    {t.desc}
                  </p>

                  {/* Button */}
                  <button
                    style={{ width: "100%", background: "transparent", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 50, padding: "13px 24px", color: "white", fontWeight: 600, fontSize: "0.93rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "border-color 0.2s, box-shadow 0.2s", direction: "ltr" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#1a6fff"; el.style.boxShadow = "0 0 14px rgba(26,111,255,0.45)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.2)"; el.style.boxShadow = "none"; }}>
                    <span>←</span>
                    <span>לפרטים נוספים</span>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section style={{ background: "#F4F7FF", padding: "80px 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 14 }}>למי מתאים</p>
              <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.4rem)", color: "#070C24", fontWeight: 700 }}>לכל ארגון שרוצה לתת לנשים שלו כלים אמיתיים</h2>
            </motion.div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="audiences-grid">
              {audiences.map((a, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  style={{ background: "white", borderRadius: 16, padding: "20px", border: "1px solid #E8EDFF", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: i % 3 === 0 ? "#124AF0" : i % 3 === 1 ? "#21F0B0" : "#FA5C5C", flexShrink: 0 }} />
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#292929", margin: 0, lineHeight: 1.4 }}>{a.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ background: "white", padding: "80px 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 14 }}>ארגונים שהזמינו</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: "#070C24", fontWeight: 700 }}>מה אמרו אחרי</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 28 }}>
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ background: "#F4F7FF", borderRadius: 24, padding: "36px 36px 32px", border: "2px solid #E8EDFF", position: "relative", overflow: "hidden" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                    <span style={{ display: "inline-block", background: i === 1 ? "#21F0B0" : "#124AF0", color: i === 1 ? "#070C24" : "white", fontWeight: 700, fontSize: "0.82rem", padding: "5px 14px", borderRadius: 50 }}>
                      {t.type}
                    </span>
                    <span style={{ color: "#21F0B0", fontSize: "2.8rem", fontFamily: "Georgia, serif", lineHeight: 0.7, userSelect: "none" }}>״</span>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <span style={{ display: "inline-block", background: "white", border: "1px solid #E8EDFF", color: "#292929", fontWeight: 700, fontSize: "0.88rem", padding: "8px 18px", borderRadius: 50, lineHeight: 1.5 }}>
                      {t.badge}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.97rem", color: "#292929", lineHeight: 2, margin: "0 0 28px" }}>{t.quote}</p>
                  <div style={{ borderTop: "1px solid #E8EDFF", paddingTop: 20 }}>
                    {t.name && (
                      <div style={{ fontWeight: 700, color: "#124AF0", fontSize: "0.95rem" }}>
                        <span style={{ fontSize: "0.75em" }}>-</span> {t.name}
                      </div>
                    )}
                    {t.org && (
                      <div style={{ color: "#999", fontSize: "0.82rem", marginTop: t.name ? 4 : 0 }}>{t.org}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Red divider */}
        <div style={{ height: 3, background: "#FA5C5C" }} />

        {/* Contact Form */}
        <section id="contact-form" style={{ background: "white", padding: "88px 1.5rem" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 16 }}>הזמנה</p>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#070C24", fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>
                שלחי פרטים <span style={{ fontSize: "0.75em" }}>-</span> נחזור תוך 24 שעות
              </h2>
              <AnimatedUnderline color="#FA5C5C" delay={0.3} />
              <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.9, marginTop: 16 }}>ללא התחייבות. שיחת היכרות קצרה, סיכום הצרכים שלך ותאריך שנוח לך.</p>
            </motion.div>

            {submitted ? (
              <div style={{ background: "#070C24", borderRadius: 24, padding: "56px 40px", textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#21F0B0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "1.6rem", color: "#070C24", fontWeight: 700 }}>✓</div>
                <h3 style={{ color: "white", fontSize: "1.6rem", fontWeight: 700, marginBottom: 12, textShadow: "0 0 12px rgba(255,255,255,0.8)" }}>קיבלנו את הפרטים</h3>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 2 }}>נחזור אלייך תוך 24 שעות לתיאום שיחת היכרות.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 10 }}>מה מעניין אותך? *</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {["הרצאה", "סדנה"].map((opt) => (
                      <button key={opt} type="button" onClick={() => setForm(f => ({ ...f, type: opt }))}
                        style={{ padding: "14px", borderRadius: 14, border: `2px solid ${form.type === opt ? "#124AF0" : "#E8EDFF"}`, background: form.type === opt ? "#124AF0" : "white", color: form.type === opt ? "white" : "#555", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", transition: "all 0.15s" }}>
                        {opt === "הרצאה" ? "הרצאה - 90 דקות" : "סדנה - 3 מפגשים"}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-grid">
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>שם מלא *</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="שם מלא"
                      style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box", transition: "border-color 0.15s" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#124AF0")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E8EDFF")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>טלפון *</label>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="050-000-0000" type="tel"
                      style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box", transition: "border-color 0.15s" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#124AF0")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E8EDFF")} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>שם הארגון *</label>
                  <input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} placeholder="שם הארגון / עירייה / חברה"
                    style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box", transition: "border-color 0.15s" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#124AF0")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#E8EDFF")} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-grid">
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>מספר משתתפות (בערך)</label>
                    <input value={form.participants} onChange={(e) => setForm({ ...form, participants: e.target.value })} placeholder="לדוגמה: 30"
                      style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box", transition: "border-color 0.15s" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#124AF0")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E8EDFF")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>תאריך מבוקש (בערך)</label>
                    <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} type="date"
                      style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", boxSizing: "border-box", transition: "border-color 0.15s" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#124AF0")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E8EDFF")} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", color: "#292929", marginBottom: 8 }}>הודעה חופשית</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="ספרי על הארגון, הקהל, כל מה שרלוונטי..." rows={4}
                    style={{ width: "100%", padding: "14px 18px", borderRadius: 14, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", resize: "vertical", boxSizing: "border-box", transition: "border-color 0.15s" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#124AF0")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#E8EDFF")} />
                </div>
                {error && <p style={{ color: "#FA5C5C", fontSize: "0.88rem", margin: 0 }}>{error}</p>}
                <button type="submit"
                  style={{ width: "100%", background: "white", color: "#124AF0", border: "2px solid #124AF0", borderRadius: 50, padding: "20px", fontWeight: 700, fontSize: "1.08rem", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#F0F4FF"; el.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "white"; el.style.transform = "translateY(0)"; }}>
                  {loading ? "שולחת..." : <>שלחי <span style={{ fontSize: "0.75em" }}>-</span> נחזור אלייך תוך 24 שעות ←</>}
                </button>
                <p style={{ color: "#aaa", fontSize: "0.8rem", textAlign: "center", margin: 0 }}>המידע נשמר בסודיות. ללא התחייבות.</p>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          .audiences-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 700px) {
          .products-grid { grid-template-columns: 1fr !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .audiences-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
