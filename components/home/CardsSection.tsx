"use client";
import { useEffect, useRef, useState } from "react";
import { LazyVideo } from "@/components/LazyVideo";

const badges = [
  { label: "קורס ה-MUSTריות", href: "#must", color: "rgba(255,255,255,0.15)", text: "#FFFFFF", border: "2px solid rgba(255,255,255,0.6)" },
  { label: "ליווי VIP אישי", href: "#vip", color: "rgba(255,255,255,0.15)", text: "#FFFFFF", border: "2px solid rgba(255,255,255,0.6)" },
  { label: "ספרייה פיננסית", href: "#library", color: "rgba(255,255,255,0.15)", text: "#FFFFFF", border: "2px solid rgba(255,255,255,0.6)" },
  { label: "הרצאות וסדנאות", href: "/workshop", color: "rgba(255,255,255,0.15)", text: "#FFFFFF", border: "2px solid rgba(255,255,255,0.6)" },
  { label: "קהילת צוברות", href: "#community", color: "rgba(255,255,255,0.15)", text: "#FFFFFF", border: "2px solid rgba(255,255,255,0.6)" },
];

export default function CardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ position: "relative", minHeight: 520, overflow: "hidden" }}>
      {/* solid blue base */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, #061035 0%, #0c1d6a 100%)" }} />

      {/* video - animates in on scroll */}
      <LazyVideo
        src="/umbrella-section-2.mp4"
        style={{
          position: "absolute",
          top: "-8%", right: "-4%",
          height: "118%",
          width: "62%",
          objectFit: "contain",
          objectPosition: "right center",
          display: "block",
          transformOrigin: "right center",
          transform: visible
            ? "rotate(-15deg) translateX(0px) scale(1)"
            : "rotate(-30deg) translateX(120px) scale(0.82)",
          opacity: visible ? 1 : 0,
          transition: "transform 1.3s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.9s ease",
        }}
      />

      {/* seamless gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, #061035 0%, #061035 28%, rgba(6,16,53,0.88) 46%, rgba(6,16,53,0.35) 62%, transparent 78%)",
      }} />
      {/* bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "28%", background: "linear-gradient(to bottom, transparent, rgba(6,16,53,0.9))" }} />

      {/* content */}
      <div className="cards-content" style={{ position: "relative", zIndex: 2, maxWidth: 860, margin: "0 auto", padding: "72px 1.5rem 64px", textAlign: "center", width: "100%", boxSizing: "border-box" }}>

        <h2 className="cards-h2" style={{ color: "#FFFFFF", fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.3, margin: "0 0 16px 0", textShadow: "0 2px 20px rgba(0,0,0,0.4)", wordBreak: "break-word" }}>
          מה יש תחת המטריה?
        </h2>
        <p className="cards-p" style={{ color: "#21F0B0", fontSize: "1.15rem", fontWeight: 600, margin: "0 0 40px", textShadow: "0 0 20px rgba(33,240,176,0.5)", wordBreak: "break-word" }}>
          מצב צבירה הוא לא עוד קורס אחד <span style={{ fontSize: "0.75em" }}>-</span> זה הבית הפיננסי שלך.
        </p>

        <div className="cards-badges">
          {badges.map((b, i) => (
            <a
              key={i}
              href={b.href}
              style={{
                background: b.color,
                color: b.text,
                border: b.border,
                padding: "11px 20px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                whiteSpace: "nowrap",
                backdropFilter: "blur(8px)",
                transition: "transform 0.15s, background 0.2s",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              {b.label} <span className="arrow-anim">←</span>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        .cards-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        @media(max-width:640px){
          .cards-content { padding: 56px 1.25rem 48px; }
          .cards-h2 { font-size: 1.75rem; }
          .cards-p { font-size: 0.95rem; }
          .cards-badges {
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 8px !important;
            width: 100% !important;
          }
          .cards-badges a {
            font-size: 0.82rem !important;
            padding: 8px 12px !important;
            white-space: normal !important;
            text-align: center !important;
            justify-content: center !important;
            flex-shrink: 1 !important;
            max-width: calc(50% - 4px) !important;
          }
        }
      `}</style>
    </section>
  );
}
