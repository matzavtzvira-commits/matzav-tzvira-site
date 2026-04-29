"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    setTimeout(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #F4F7FF 0%, #ffffff 60%)",
        display: "flex",
        alignItems: "center",
        paddingTop: 90,
        paddingBottom: 60,
      }}
    >
      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem", width: "100%" }}
      >
        <div ref={ref} style={{ maxWidth: 700 }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#E8EDFF",
              color: "#124AF0",
              borderRadius: 50,
              padding: "6px 16px",
              fontSize: "0.88rem",
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            <span style={{ color: "#21F0B0" }}>●</span>
            תוכנית ייחודית לנשים חרדיות
          </div>

          {/* Main headline */}
          <h1
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              color: "#124AF0",
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            הכסף ישתדל,
            <br />
            <span
              style={{
                position: "relative",
                display: "inline-block",
              }}
            >
              ואת תנוחי
              <span
                style={{
                  position: "absolute",
                  bottom: -4,
                  right: 0,
                  width: "100%",
                  height: 5,
                  background: "#21F0B0",
                  borderRadius: 3,
                }}
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
              color: "#292929",
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            התוכנית הקצרה והבטוחה שלך להפוך למשקיעה בשוק ההון בביטחון מלא.
          </p>

          <p
            style={{
              fontSize: "1.05rem",
              color: "#555",
              marginBottom: 40,
            }}
          >
            קצרה, ממוקדת, אישית — ותכל&apos;ס בשפה שרק אנחנו מבינות 💛
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a
              href="#pricing"
              style={{
                background: "#124AF0",
                color: "white",
                padding: "16px 36px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: "1.1rem",
                cursor: "pointer",
                display: "inline-block",
                transition: "background 0.2s, transform 0.1s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#21F0B0";
                e.currentTarget.style.color = "#292929";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#124AF0";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              אני רוצה להצטרף ←
            </a>
            <a
              href="#about"
              style={{
                background: "transparent",
                color: "#124AF0",
                padding: "16px 36px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: "1.05rem",
                border: "2px solid #124AF0",
                cursor: "pointer",
                display: "inline-block",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#124AF0";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#124AF0";
              }}
            >
              קראי עלי קודם
            </a>
          </div>

          {/* Trust indicators */}
          <div
            style={{
              display: "flex",
              gap: 32,
              marginTop: 48,
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "1,300+", label: "נשים בתוכנית" },
              { num: "4", label: "שנות ניסיון" },
              { num: "14 יום", label: "אחריות מלאה" },
            ].map((item) => (
              <div key={item.label} style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    color: "#124AF0",
                    lineHeight: 1,
                  }}
                >
                  {item.num}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#555", marginTop: 4 }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
