"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const links: { label: string; href: string; disabled?: boolean }[] = [
  { label: "מי אני?", href: "/about" },
  { label: "מדריכים", href: "/articles" },
  { label: "מחשבונים", href: "/calculators" },
  { label: "הרצאות וסדנאות", href: "/workshop" },
  { label: "הקהילה", href: "/#community" },
  { label: "MUSTריות", href: "/course" },
  { label: "ליווי VIP", href: "/vip" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, right: 0, left: 0,
        zIndex: 100,
        background: "#FFFFFF",
        borderBottom: "3px solid #FA5C5C",
        padding: "0 1.5rem",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.3s ease",
      }}
    >
      <div
        className="nav-inner"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 80,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <img
            src="/logo-new.png"
            alt="מצב צבירה"
            className="nav-logo"
            style={{ height: 72, width: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexWrap: "nowrap",
          }}
          className="nav-desktop"
        >
          {links.map((l) =>
            l.disabled ? (
              <span
                key={l.label}
                style={{
                  color: "#BBBBBB",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  padding: "8px 14px",
                  borderRadius: 50,
                  whiteSpace: "nowrap",
                  border: "2px solid transparent",
                  cursor: "default",
                }}
              >
                {l.label}
              </span>
            ) : (
            <Link
              key={l.label}
              href={l.href}
              style={{
                color: l.label === "ליווי VIP" ? "#FFFFFF" : "#292929",
                background: l.label === "ליווי VIP" ? "#124AF0" : "transparent",
                fontWeight: l.label === "MUSTריות" || l.label === "ליווי VIP" ? 700 : 500,
                fontSize: "0.9rem",
                padding: "8px 14px",
                borderRadius: 50,
                whiteSpace: "nowrap",
                transition: "all 0.15s",
                border: l.label === "MUSTריות" ? "2px solid #124AF0" : "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                if (l.label === "ליווי VIP") {
                  el.style.background = "#21F0B0";
                  el.style.color = "#124AF0";
                } else if (l.label === "MUSTריות") {
                  el.style.background = "#124AF0";
                  el.style.color = "#FFFFFF";
                } else {
                  el.style.color = "#124AF0";
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                if (l.label === "ליווי VIP") {
                  el.style.background = "#124AF0";
                  el.style.color = "#FFFFFF";
                } else if (l.label === "MUSTריות") {
                  el.style.background = "transparent";
                  el.style.color = "#292929";
                } else {
                  el.style.color = "#292929";
                }
              }}
            >
              {l.label}
            </Link>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-hamburger"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
            flexDirection: "column",
            gap: 5,
            padding: 8,
            minHeight: 44,
            minWidth: 44,
            justifyContent: "center",
            alignItems: "center",
          }}
          aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span style={{ width: 24, height: 2, background: "#292929", display: "block", transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ width: 24, height: 2, background: "#292929", display: "block", opacity: menuOpen ? 0 : 1, transition: "all 0.2s" }} />
          <span style={{ width: 24, height: 2, background: "#292929", display: "block", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="תפריט ניווט נייד"
          style={{
            background: "#FFFFFF",
            borderTop: "1px solid #E8EDFF",
            padding: "16px 1.5rem 24px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
          className="nav-mobile"
        >
          {links.map((l) =>
            l.disabled ? (
              <span
                key={l.label}
                style={{
                  color: "#BBBBBB",
                  fontWeight: 500,
                  fontSize: "1rem",
                  padding: "14px 0",
                  borderBottom: "1px solid #F4F7FF",
                  display: "block",
                  cursor: "default",
                }}
              >
                {l.label}
              </span>
            ) : (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: l.label === "ליווי VIP" ? "#124AF0" : "#292929",
                fontWeight: l.label === "MUSTריות" || l.label === "ליווי VIP" ? 700 : 500,
                fontSize: "1rem",
                padding: "14px 0",
                borderBottom: "1px solid #F4F7FF",
                display: "block",
              }}
            >
              {l.label}
            </Link>
            )
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-inner { height: 64px !important; }
          .nav-logo { height: 52px !important; }
        }
      `}</style>
    </nav>
  );
}
