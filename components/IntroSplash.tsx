"use client";
import { useEffect, useState } from "react";

export default function IntroSplash() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("splashSeen")) return;
    setVisible(true);
    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("splashSeen", "1");
    }, 2200);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0a1a6e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation: fading ? "splashFadeOut 0.4s ease forwards" : undefined,
      }}
    >
      {/* SVG Logo */}
      <svg width="260" height="80" viewBox="0 0 260 80" style={{ overflow: "visible" }}>
        {/* Capsule border */}
        <rect
          x="4" y="4" width="252" height="72" rx="36"
          fill="none"
          stroke="#124AF0"
          strokeWidth="4"
          strokeDasharray="650"
          strokeDashoffset="650"
          style={{ animation: "splashStroke 0.6s ease 0.4s forwards" }}
        />
        {/* Capsule fill */}
        <rect
          x="4" y="4" width="252" height="72" rx="36"
          fill="#124AF0"
          opacity="0"
          style={{ animation: "fadeIn 0.4s ease 0.5s forwards" }}
        />
        {/* Mint circle */}
        <circle
          cx="36" cy="40" r="24"
          fill="#21F0B0"
          transform="scale(0)"
          style={{
            transformOrigin: "36px 40px",
            animation: "splashCircleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.2s forwards",
          }}
        />
        {/* Brand text */}
        <text
          x="80" y="48"
          fill="white"
          fontSize="24"
          fontWeight="700"
          fontFamily="Assistant, Arial, sans-serif"
          opacity="0"
          style={{ animation: "splashSlideIn 0.5s ease 0.9s forwards" }}
        >
          מצב צבירה
        </text>
      </svg>

      {/* Sub-tagline */}
      <p
        style={{
          color: "#21F0B0",
          fontSize: "1rem",
          fontWeight: 600,
          marginTop: 20,
          letterSpacing: 2,
          opacity: 0,
          animation: "fadeIn 0.5s ease 1.4s forwards",
          fontFamily: "Assistant, Arial, sans-serif",
        }}
      >
        המטריה הפיננסית שלך
      </p>
    </div>
  );
}
