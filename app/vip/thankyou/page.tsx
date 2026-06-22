"use client";
import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";

export default function VipThankYouPage() {
  const posthog = usePostHog();

  useEffect(() => {
    posthog?.capture("purchase", { product: "ליווי VIP" });
  }, [posthog]);

  const steps = [
    {
      icon: "📩",
      title: "גישה לקורס",
      text: "כבר מחכה לך במייל. תיכנסי, ותתחילי לצפות בנחת, עם כוס קפה ביד.",
    },
    {
      icon: "📝",
      title: "שאלון קצר",
      text: "יגיע גם הוא למייל. כמה דקות של מילוי, וזה מה שמאפשר לי להכיר את התיק שלך לעומק.",
    },
    {
      icon: "☂️",
      title: "מתחילות לעבוד",
      text: "בעזרת השם נתחיל להריץ את התיק הפיננסי שלך, ואני לוקחת מכאן את כל הביורוקרטיה על עצמי.",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% 25%, #1535B5 0%, #060D3C 70%)",
        padding: "64px 1.5rem 72px",
        textAlign: "center",
        direction: "rtl",
      }}
    >
      <style>{`
        @keyframes vipPop { 0% { opacity:0; transform: scale(0.5); } 70% { transform: scale(1.12); } 100% { opacity:1; transform: scale(1); } }
        @keyframes vipRise { 0% { opacity:0; transform: translateY(18px); } 100% { opacity:1; transform: translateY(0); } }
        @keyframes vipDraw { 0% { stroke-dashoffset: 60; } 100% { stroke-dashoffset: 0; } }
        .vip-rise { opacity:0; animation: vipRise 0.6s ease forwards; }
        .vip-d1 { animation-delay: 0.15s; } .vip-d2 { animation-delay: 0.3s; }
        .vip-d3 { animation-delay: 0.45s; } .vip-d4 { animation-delay: 0.6s; } .vip-d5 { animation-delay: 0.75s; }
      `}</style>

      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {/* לוגו */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/vip-logo.png"
          alt="מצב צבירה - ליווי VIP"
          style={{ height: 72, width: "auto", margin: "0 auto 28px", display: "block" }}
        />

        {/* וי הצלחה */}
        <div
          style={{
            width: 84,
            height: 84,
            margin: "0 auto 24px",
            borderRadius: "50%",
            background: "rgba(33,240,176,0.12)",
            border: "2px solid rgba(33,240,176,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "vipPop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M10 21 L17 28 L31 13"
              stroke="#21F0B0"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 60, animation: "vipDraw 0.6s ease 0.4s forwards", strokeDashoffset: 60 }}
            />
          </svg>
        </div>

        {/* כותרת */}
        <h1
          className="vip-rise vip-d1"
          style={{ fontSize: "clamp(1.8rem, 5vw, 2.6rem)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.4, marginBottom: 12 }}
        >
          ברוכה הבאה לליווי
        </h1>
        <p
          className="vip-rise vip-d2"
          style={{ color: "#21F0B0", fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.7, marginBottom: 40 }}
        >
          עשית את הצעד הכי חשוב, בחרת לתת לכסף שלך לעבוד בשבילך.
        </p>

        {/* שלבים */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`vip-rise vip-d${i + 3}`}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(33,240,176,0.18)",
                borderRadius: 18,
                padding: "18px 20px",
                textAlign: "right",
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "1.6rem", lineHeight: 1, flexShrink: 0 }}>{s.icon}</span>
              <div>
                <p style={{ color: "#FFFFFF", fontWeight: 800, fontSize: "1.05rem", marginBottom: 4 }}>{s.title}</p>
                <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "0.97rem", lineHeight: 1.65 }}>{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* סגירה */}
        <p className="vip-rise vip-d5" style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: 6 }}>
          מכאן זה כבר לא רק את.
          <br />
          אני איתך, יד ביד.
        </p>
        <p className="vip-rise vip-d5" style={{ color: "#21F0B0", fontWeight: 900, fontSize: "1.2rem", marginTop: 18 }}>
          באהבה, רבקי
        </p>

        {/* ספאם */}
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", marginTop: 44, lineHeight: 1.7 }}>
          לא קיבלת את המייל תוך כמה דקות? בדקי בתיקיית הספאם, או כתבי לי ל-
          <a href="mailto:matzavtzvira@gmail.com" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
            matzavtzvira@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
