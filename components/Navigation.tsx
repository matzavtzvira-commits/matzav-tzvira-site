"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "בית", href: "/" },
  { label: "מאמרים", href: "/articles" },
  { label: "מחשבונים", href: "/calculators" },
  { label: "סדנאות", href: "/workshop" },
  { label: "ליווי VIP", href: "/vip" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const navBg = "rgba(255,255,255,0.97)";
  const linkColor = "#292929";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, right: 0, left: 0,
        zIndex: 100,
        background: navBg,
        backdropFilter: "blur(8px)",
        boxShadow: scrolled ? "0 2px 20px rgba(18,74,240,0.1)" : "0 1px 0 rgba(18,74,240,0.08)",
        transition: "all 0.3s",
        padding: "0 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 270,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo.png"
            alt="מצב צבירה"
            style={{
              height: 256,
              width: "auto",
              objectFit: "contain",
            }}
          />
        </Link>

        {/* Desktop nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="desktop-nav">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: "0.95rem",
                fontWeight: pathname === l.href ? 700 : 500,
                color: pathname === l.href ? "#21F0B0" : linkColor,
                transition: "color 0.2s",
                borderBottom: pathname === l.href ? "2px solid #21F0B0" : "2px solid transparent",
                paddingBottom: 2,
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/course"
            style={{
              background: "#124AF0",
              color: "white",
              padding: "10px 22px",
              borderRadius: 50,
              fontWeight: 700,
              fontSize: "0.92rem",
              display: "inline-block",
              transition: "background 0.2s, color 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#21F0B0"; e.currentTarget.style.color = "#124AF0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#124AF0"; e.currentTarget.style.color = "white"; }}
          >
            לתוכנית ←
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }}
            className="hamburger"
            aria-label="תפריט"
          >
            <div style={{ width: 22, height: 2, background: scrolled || !isHome ? "#292929" : "white", marginBottom: 5, transition: "background 0.3s" }} />
            <div style={{ width: 22, height: 2, background: scrolled || !isHome ? "#292929" : "white", marginBottom: 5, transition: "background 0.3s" }} />
            <div style={{ width: 22, height: 2, background: scrolled || !isHome ? "#292929" : "white", transition: "background 0.3s" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "white",
            padding: "16px 24px 24px",
            borderTop: "1px solid #E8EDFF",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: "1rem", fontWeight: 600, color: pathname === l.href ? "#124AF0" : "#292929" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/course"
            onClick={() => setMenuOpen(false)}
            style={{ background: "#124AF0", color: "white", padding: "12px 20px", borderRadius: 50, fontWeight: 700, textAlign: "center" }}
          >
            לתוכנית ←
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
