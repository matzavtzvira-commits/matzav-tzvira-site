"use client";
import { useState } from "react";

export default function VipInvitePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function send() {
    if (!name || !email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/send-vip-onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await res.json();
      setStatus(data.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  const input: React.CSSProperties = {
    width: "100%", padding: "13px 15px", border: "1.5px solid #E8EDFF",
    borderRadius: 12, fontFamily: "inherit", fontSize: 15, color: "#292929",
    outline: "none", background: "#fff", marginTop: 7,
  };

  return (
    <main style={{ minHeight: "100vh", background: "#F4F7FF", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "Heebo, Arial, sans-serif", direction: "rtl" }}>
      <div style={{ maxWidth: 460, width: "100%" }}>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#124AF0", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>מצב צבירה - פנימי</p>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "#060D3C", margin: 0 }}>שליחת טופס קבלת מידע VIP</h1>
          <p style={{ fontSize: 14, color: "#666", marginTop: 8 }}>ממלאים פרטי הלקוחה - ויוצא לה מייל עם הלינק לטופס</p>
        </div>

        {status === "done" ? (
          <div style={{ background: "#fff", borderRadius: 20, padding: "40px 28px", textAlign: "center", boxShadow: "0 4px 24px rgba(18,74,240,0.08)" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "#060D3C", marginBottom: 8 }}>נשלח בהצלחה!</h2>
            <p style={{ fontSize: 15, color: "#555" }}>המייל יצא ל-{email}</p>
            <button
              onClick={() => { setName(""); setEmail(""); setPhone(""); setStatus("idle"); }}
              style={{ marginTop: 24, padding: "12px 28px", background: "#124AF0", color: "#fff", border: "none", borderRadius: 12, fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer" }}
            >
              שלחי ללקוחה נוספת
            </button>
          </div>
        ) : (
          <div style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", boxShadow: "0 4px 24px rgba(18,74,240,0.08)" }}>

            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 14, fontWeight: 700, color: "#060D3C" }}>שם מלא <span style={{ color: "#124AF0" }}>*</span></label>
              <input style={input} value={name} onChange={e => setName(e.target.value)} placeholder="שרה לוי" />
            </div>

            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 14, fontWeight: 700, color: "#060D3C" }}>כתובת מייל <span style={{ color: "#124AF0" }}>*</span></label>
              <input style={input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="sarah@example.com" />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 14, fontWeight: 700, color: "#060D3C" }}>טלפון (אופציונלי)</label>
              <input style={input} type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="050-0000000" />
            </div>

            {status === "error" && (
              <p style={{ color: "#FA5C5C", fontSize: 14, marginBottom: 12 }}>משהו השתבש - נסי שוב</p>
            )}

            <button
              onClick={send}
              disabled={!name || !email || status === "loading"}
              style={{
                width: "100%", padding: "15px", background: !name || !email ? "#ccc" : "#124AF0",
                color: "#fff", border: "none", borderRadius: 14, fontFamily: "inherit",
                fontSize: 16, fontWeight: 800, cursor: !name || !email ? "not-allowed" : "pointer",
              }}
            >
              {status === "loading" ? "שולחת..." : "שלחי מייל ללקוחה ←"}
            </button>

          </div>
        )}

        <p style={{ textAlign: "center", fontSize: 12, color: "#aaa", marginTop: 20 }}>
          הדף הזה לא מקושר מהאתר - שמרי את הכתובת
        </p>
      </div>
    </main>
  );
}
