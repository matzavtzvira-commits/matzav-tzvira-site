"use client";
import posthog from "posthog-js";

const PAYMENT_URL = "https://secure.cardcom.solutions/EA/EA5/dKoPGzcdZEqxgTyXuRf8lA/PaymentSP";

export default function MidCTA() {
  return (
    <div style={{ background: "#124AF0", padding: "56px 1.5rem", textAlign: "center" }}>
      <div style={{ maxWidth: 520, margin: "0 auto 28px" }}>
        {[
          "את רוצה להגיע לחתונת ילדיך רגועה?",
          "את לא רוצה להיות האישה שגילתה מאוחר מדי?",
          "את מוכנה להשקיע שבוע אחד כדי לשנות את כל השאר?",
        ].map((q, i) => (
          <p key={i} style={{ fontSize: "1rem", color: "rgba(255,255,255,0.88)", margin: "0 0 10px", lineHeight: 1.7 }}>{q}</p>
        ))}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 20 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.2)" }} />
          <span style={{ background: "#21F0B0", color: "#124AF0", fontSize: "1.1rem", fontWeight: 900, padding: "8px 28px", borderRadius: 50, letterSpacing: 1 }}>כן.</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.2)" }} />
        </div>
        <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#FFFFFF", marginTop: 16, marginBottom: 0 }}>
          אז את כבר יודעת מה לעשות.
        </p>
      </div>
      <a
        href={PAYMENT_URL}
        onClick={() => posthog.capture("checkout_click", { location: "midcta" }, { transport: "sendBeacon" })}
        style={{ position: "relative", display: "inline-block", textDecoration: "none", transition: "transform 0.2s", maxWidth: "100%" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-green.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 43%" }} />
        <span style={{ position: "relative", zIndex: 1, color: "#070C24", padding: "16px 52px", fontWeight: 800, fontSize: "1.05rem", display: "block" }}>
          אני רוצה להצטרף ←
        </span>
      </a>
    </div>
  );
}
