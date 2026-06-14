"use client";
import { useEffect, useState } from "react";

const PAYMENT_URL = "https://secure.cardcom.solutions/EA/EA5/dKoPGzcdZEqxgTyXuRf8lA/PaymentSP";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      <a
        href={PAYMENT_URL}
        aria-label="עבור לרכישת התוכנית"
        className="floating-cta"
        style={{
          position: "fixed",
          bottom: 32,
          left: 24,
          zIndex: 999,
          background: "#FFFFFF",
          color: "#124AF0",
          border: "2.5px solid #124AF0",
          padding: "14px 28px",
          borderRadius: 50,
          fontWeight: 800,
          fontSize: "0.95rem",
          textDecoration: "none",
          boxShadow: "0 6px 28px rgba(18,74,240,0.25)",
          whiteSpace: "nowrap",
          animation: "floatBtn 3s ease-in-out infinite",
        }}
      >
        אני מצטרפת ←
      </a>
      <style>{`
        @keyframes floatBtn { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @media(max-width:480px){
          .floating-cta { bottom: 16px !important; left: 50% !important; transform: translateX(-50%); font-size: 0.88rem !important; padding: 12px 22px !important; }
        }
      `}</style>
    </>
  );
}
