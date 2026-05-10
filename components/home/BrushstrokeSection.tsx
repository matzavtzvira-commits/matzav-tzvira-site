"use client";
import React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

function AnimatedIcon({ index }: { index: number }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const p = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    transition: { duration: 0.7, delay, ease: "easeInOut" as const },
  });
  const stroke = "#21F0B0";
  const base = { fill: "none" as const, stroke, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  return (
    <span ref={ref}>
      {index === 0 && (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <motion.path {...base} d="M19 9a7 7 0 1 0-7 7h1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-1-1.73V9z" {...p(0)} />
          <motion.path {...base} d="M12 6V4M9.5 9.5a2.5 2.5 0 0 1 5 0" {...p(0.25)} />
          <motion.circle cx="20" cy="7" r="1" fill={stroke} stroke="none" initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : { scale: 0 }} transition={{ delay: 0.5, duration: 0.2 }} />
        </svg>
      )}
      {index === 1 && (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <motion.rect x="4" y="2" width="16" height="20" rx="2" {...base} {...p(0)} />
          <motion.line x1="8" y1="6" x2="16" y2="6" {...base} {...p(0.2)} />
          <motion.line x1="8" y1="10" x2="16" y2="10" {...base} strokeWidth={2} {...p(0.32)} />
          <motion.line x1="8" y1="14" x2="16" y2="14" {...base} strokeWidth={2} {...p(0.44)} />
          <motion.line x1="8" y1="18" x2="13" y2="18" {...base} strokeWidth={2} {...p(0.56)} />
        </svg>
      )}
      {index === 2 && (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <motion.polyline points="22 12 18 12 15 21 9 3 6 12 2 12" {...base} {...p(0)} />
        </svg>
      )}
      {index === 3 && (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <motion.path {...base} d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" {...p(0)} />
          <motion.circle cx="9" cy="7" r="4" {...base} {...p(0.2)} />
          <motion.path {...base} d="M23 21v-2a4 4 0 0 0-3-3.87" {...p(0.35)} />
          <motion.path {...base} d="M16 3.13a4 4 0 0 1 0 7.75" {...p(0.45)} />
        </svg>
      )}
    </span>
  );
}

const cards = [
  {
    letter: "א",
    title: "חיסכון לכל ילד",
    text: "איך למנף את ההשקעה שלך בכמה לחיצות כפתור ולהרוויח עוד כ-₪40,000 לכל ילד - כפול מספר הילדים שלך.",
    cta: "אני רוצה",
    href: "/articles",
  },
  {
    letter: "ב",
    title: "מחשבון ריבית דריבית",
    text: "הפלא השמיני - מי שמבין מרוויח ומי שלא עובד כל חייו.",
    cta: "למחשבון",
    href: "/calculators/compound-interest",
  },
  {
    letter: "ג",
    title: "פתיחת חשבון מסחר",
    text: "מדריך יד ביד לפתיחת חשבון השקעות - טיפים והמלצות לבחירה נכונה.",
    cta: "למדריך",
    href: "/articles",
  },
  {
    letter: "ד",
    title: "קהילת צוברות פיננסיות",
    text: "תצטרפי למהפכה - לאלפי נשים שיודעות, מתעדכנות ומרוויחות.",
    cta: "הצטרפי עכשיו",
    href: "https://chat.whatsapp.com/KUc5iTtqUdm85W6Fnf3Tcx",
  },
];

export default function BrushstrokeSection() {
  return (
    <section style={{ background: "radial-gradient(ellipse at 50% 30%, #1535B5 0%, #060D3C 65%)", padding: "88px 1.5rem" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.4, margin: "0 0 16px" }}>
            רוצה לדעת איך להרוויח מההשקעות שלך?
          </h2>
          <motion.p
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.15 }}
            style={{ fontSize: "1.1rem", color: "#21F0B0", fontWeight: 600, margin: 0, display: "inline-block" }}>
            אגלה לך סוד <span style={{ fontSize: "0.75em" }}>-</span> את כבר מושקעת בשוק ההון ביג טיים.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }} className="brush-grid">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{
              background: "#070C24",
              border: "1px solid #124AF0",
              borderRadius: 16,
              padding: "32px 24px 32px 24px",
              paddingTop: 48,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              position: "relative",
              overflow: "visible",
              transition: "border-color 0.2s, transform 0.2s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#4070FF"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#124AF0"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              {/* floating icon */}
              <div className="brush-icon" style={{
                position: "absolute",
                top: -28,
                right: -28,
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "#070C24",
                border: "2px solid #124AF0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(33,240,176,0.35)",
                zIndex: 2,
              }}>
                <AnimatedIcon index={i} />
              </div>
              <span style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.85rem" }}>שלב {card.letter}</span>
              <p style={{ fontWeight: 800, color: "#FFFFFF", fontSize: "1rem", margin: 0, lineHeight: 1.4 }}>
                {card.title}
              </p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.88rem", lineHeight: 1.8, margin: 0, flex: 1 }}>
                {card.text}
              </p>
              {card.href.startsWith("http") ? (
                <a href={card.href} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-block",
                border: "1px solid #124AF0",
                color: "#124AF0",
                padding: "10px 20px",
                borderRadius: 16,
                fontWeight: 700,
                fontSize: "0.88rem",
                textDecoration: "none",
                textAlign: "center",
                transition: "background 0.2s, color 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#124AF0"; (e.currentTarget as HTMLElement).style.color = "#070C24"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#124AF0"; }}
              >
                {card.cta} <span className="arrow-anim">←</span>
              </a>
              ) : (
                <Link href={card.href} style={{
                  display: "inline-block",
                  border: "1px solid #124AF0",
                  color: "#124AF0",
                  padding: "10px 20px",
                  borderRadius: 16,
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  textDecoration: "none",
                  textAlign: "center",
                  transition: "background 0.2s, color 0.2s",
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#124AF0"; (e.currentTarget as HTMLElement).style.color = "#070C24"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#124AF0"; }}
                >
                  {card.cta} <span className="arrow-anim">←</span>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

      </div>
      <style>{`
        @media(max-width:900px){.brush-grid{grid-template-columns:1fr 1fr!important;}}
        @media(max-width:560px){.brush-grid{grid-template-columns:1fr!important;}}
        @media(max-width:900px){.brush-icon{right:12px!important;top:-20px!important;}}
      `}</style>
    </section>
  );
}
