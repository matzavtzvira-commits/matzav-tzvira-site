"use client";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(18,74,240,0.08)" : "none",
        transition: "all 0.3s",
        padding: "0 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 70,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Toggle icon — mint ball in blue capsule */}
          <div
            style={{
              width: 44,
              height: 24,
              background: "#124AF0",
              borderRadius: 12,
              position: "relative",
              display: "flex",
              alignItems: "center",
              padding: "0 3px",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#21F0B0",
                marginRight: "auto",
              }}
            />
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: "1.15rem",
              color: "#124AF0",
              letterSpacing: "-0.3px",
            }}
          >
            מצב צבירה
          </span>
        </div>

        {/* CTA */}
        <a
          href="#pricing"
          style={{
            background: "#124AF0",
            color: "white",
            padding: "10px 24px",
            borderRadius: 50,
            fontWeight: 700,
            fontSize: "0.95rem",
            transition: "background 0.2s",
            display: "inline-block",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#21F0B0")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#124AF0")}
        >
          להצטרפות לתוכנית ←
        </a>
      </div>
    </nav>
  );
}
