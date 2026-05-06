"use client";
import { useState, useEffect, useRef } from "react";

async function subscribeToList(email: string, name?: string) {
  await fetch("/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name }),
  });
}

function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown.current) {
        shown.current = true;
        setVisible(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
      onClick={() => setVisible(false)}
    >
      <div
        style={{
          background: "white",
          borderRadius: 24,
          padding: "40px 36px",
          maxWidth: 480,
          width: "100%",
          position: "relative",
          textAlign: "center",
          direction: "rtl",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setVisible(false)}
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: "none",
            border: "none",
            fontSize: "1.4rem",
            cursor: "pointer",
            color: "#999",
            lineHeight: 1,
          }}
        >
          ×
        </button>

        <p style={{ color: "#124AF0", fontWeight: 700, fontSize: "0.88rem", background: "#F4F7FF", display: "inline-block", padding: "4px 16px", borderRadius: 50, marginBottom: 16 }}>
          רגע לפני שאת הולכת —
        </p>

        <h3 style={{ fontSize: "clamp(1.2rem, 3vw, 1.5rem)", color: "#124AF0", lineHeight: 1.4, marginBottom: 8 }}>
          קבלי חינם סרטון:
        </h3>
        <p style={{ fontWeight: 700, color: "#292929", fontSize: "1rem", marginBottom: 8 }}>
          &ldquo;5 הטעויות הנפוצות שנשים עושות בשוק ההון&rdquo;
        </p>
        <p style={{ color: "#888", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: 24 }}>
          (סרטון קצר. ישר לעניין. יכול לחסוך לך עשרות אלפי שקלים.)
        </p>

        {submitted ? (
          <div style={{ background: "#21F0B0", color: "#124AF0", borderRadius: 16, padding: "16px 24px", fontWeight: 700, fontSize: "1rem" }}>
            שלחנו! בדקי את תיבת הדואר שלך
          </div>
        ) : (
          <form
            onSubmit={async (e) => { e.preventDefault(); if (!email) return; setLoading(true); await subscribeToList(email); setLoading(false); setSubmitted(true); }}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="הכתובת המייל שלך"
              required
              style={{ padding: "14px 20px", borderRadius: 50, border: "2px solid #E8EDFF", fontSize: "1rem", outline: "none", direction: "rtl", color: "#292929" }}
            />
            <button
              type="submit"
              style={{
                background: "#21F0B0",
                color: "#124AF0",
                border: "none",
                borderRadius: 50,
                padding: "15px",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              {loading ? "שולחת..." : "שלחי לי את הסרטון ←"}
            </button>
          </form>
        )}

        <button
          onClick={() => setVisible(false)}
          style={{ background: "none", border: "none", color: "#bbb", fontSize: "0.82rem", marginTop: 16, cursor: "pointer" }}
        >
          לא תודה, אני מסתדרת לבד
        </button>
      </div>
    </div>
  );
}

function ScrollPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    let timeReady = false;
    let scrollReady = false;
    const tryShow = () => {
      if (timeReady && scrollReady && !shown.current) {
        shown.current = true;
        setVisible(true);
      }
    };
    const timer = setTimeout(() => { timeReady = true; tryShow(); }, 60000);
    const handleScroll = () => {
      if (shown.current) return;
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled >= 0.7) { scrollReady = true; tryShow(); }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", handleScroll); };
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9998,
        width: 300,
        background: "white",
        borderRadius: 20,
        boxShadow: "0 8px 40px rgba(18,74,240,0.18)",
        padding: "24px 20px",
        direction: "rtl",
        border: "2px solid #E8EDFF",
      }}
    >
      <button
        onClick={() => setDismissed(true)}
        style={{ position: "absolute", top: 12, left: 12, background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#bbb" }}
      >
        ×
      </button>

      <p style={{ fontWeight: 900, color: "#124AF0", fontSize: "1.05rem", marginBottom: 4 }}>
        5 טעויות. מאות אלפי שקלים.
      </p>
      <p style={{ color: "#555", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: 14 }}>
        את עושה לפחות אחת מהן <span style={{ fontSize: "0.75em" }}>—</span> ואת לא יודעת.
        <br />
        קבלי את המדריך בחינם.
      </p>

      {submitted ? (
        <div style={{ background: "#21F0B0", color: "#124AF0", borderRadius: 12, padding: "12px", fontWeight: 700, fontSize: "0.88rem", textAlign: "center" }}>
          נרשמת! נהיה בקשר
        </div>
      ) : (
        <form
          onSubmit={async (e) => { e.preventDefault(); if (!email) return; setLoading(true); await subscribeToList(email); setLoading(false); setSubmitted(true); }}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="האימייל שלך"
            required
            style={{ padding: "11px 16px", borderRadius: 50, border: "2px solid #E8EDFF", fontSize: "0.92rem", outline: "none", direction: "rtl", color: "#292929" }}
          />
          <button
            type="submit"
            style={{
              background: "#124AF0",
              color: "white",
              border: "none",
              borderRadius: 50,
              padding: "12px",
              fontWeight: 700,
              fontSize: "0.92rem",
              cursor: "pointer",
            }}
          >
            שלחי לי ←
          </button>
        </form>
      )}
    </div>
  );
}

export default function Popups() {
  return (
    <>
      <ExitIntentPopup />
      <ScrollPopup />
    </>
  );
}
