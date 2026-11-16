"use client";
import { useState } from "react";
import Link from "next/link";

// One box at the end of every blog post: join the mailing list + the two offers.
// Change wording/links here and it updates on every post.
export default function BlogCta() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ background: "linear-gradient(135deg, #124AF0 0%, #0a38c4 100%)", borderRadius: 24, padding: "40px 32px", color: "white", textAlign: "center" }} className="blog-cta-box">
        <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.9rem", margin: "0 0 10px" }}>המייל הבא כבר בדרך</p>
        <h2 style={{ fontSize: "clamp(1.35rem, 3.5vw, 1.8rem)", fontWeight: 800, lineHeight: 1.35, margin: "0 0 12px" }}>
          רוצה לקבל את המיילים האלה ישר לתיבה?
        </h2>
        <p style={{ fontSize: "1rem", lineHeight: 1.8, opacity: 0.9, margin: "0 auto 24px", maxWidth: 460 }}>
          פעמיים בשבוע, בשני ובחמישי. מושג אחד על הכסף שלך, וחלון קטן למה שקורה בעולם. בשפה שלנו.
        </p>

        {status === "done" ? (
          <div style={{ background: "#21F0B0", color: "#124AF0", borderRadius: 16, padding: "18px 24px", fontWeight: 700, fontSize: "1.05rem" }}>
            איזה כיף! נרשמת, נתראה במייל הבא
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, maxWidth: 460, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 10, width: "100%", flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="כתובת האימייל שלך"
                required
                aria-label="כתובת האימייל שלך"
                style={{ flex: 1, minWidth: 210, padding: "14px 20px", borderRadius: 50, border: "none", fontSize: "1rem", outline: "none", textAlign: "right", color: "#292929", direction: "rtl" }}
              />
              <button
                type="submit"
                disabled={!consent || status === "loading"}
                style={{ background: consent ? "#21F0B0" : "#a0b4e8", color: "#124AF0", border: "none", borderRadius: 50, padding: "14px 26px", fontWeight: 700, fontSize: "1rem", cursor: consent ? "pointer" : "not-allowed", whiteSpace: "nowrap" }}
              >
                {status === "loading" ? "רושמת..." : "אני רוצה ←"}
              </button>
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: "0.82rem", opacity: 0.85 }}>
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} style={{ width: 15, height: 15, accentColor: "#21F0B0" }} />
              אני מאשרת קבלת דיוורים ותכנים ממצב צבירה
            </label>
            {status === "error" && <p style={{ fontSize: "0.88rem", margin: 0, color: "#FFD6D6" }}>משהו השתבש. אפשר לנסות שוב בעוד רגע.</p>}
          </form>
        )}
        <p style={{ opacity: 0.6, fontSize: "0.8rem", margin: "14px 0 0" }}>בלי ספאם. אפשר להסיר בכל עת.</p>
      </div>

      <div className="blog-offers" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
        <Link href="/course" style={{ display: "block", background: "white", border: "1px solid #E8EDFF", borderRadius: 20, padding: "24px 22px", textDecoration: "none", color: "#292929" }}>
          <p style={{ fontWeight: 800, color: "#124AF0", fontSize: "1.05rem", margin: "0 0 6px" }}>רוצה ללמוד לעשות את זה לבד?</p>
          <p style={{ fontSize: "0.92rem", lineHeight: 1.7, margin: "0 0 12px", color: "#555" }}>שוק ההון בנעלי בית: התוכנית הדיגיטלית שמורידה את הפחד ומלמדת לבנות לעצמך הון.</p>
          <span style={{ fontWeight: 700, color: "#124AF0", fontSize: "0.92rem" }}>לפרטים על התוכנית ←</span>
        </Link>
        <Link href="/vip#contact-form" style={{ display: "block", background: "white", border: "1px solid #E8EDFF", borderRadius: 20, padding: "24px 22px", textDecoration: "none", color: "#292929" }}>
          <p style={{ fontWeight: 800, color: "#124AF0", fontSize: "1.05rem", margin: "0 0 6px" }}>מעדיפה שמישהי תעשה את זה בשבילך?</p>
          <p style={{ fontSize: "0.92rem", lineHeight: 1.7, margin: "0 0 12px", color: "#555" }}>בליווי VIP אני נכנסת לנעליים שלך ועושה סדר בכל הכסף: פנסיה, השתלמות, חיסכון לילדים ודמי ניהול.</p>
          <span style={{ fontWeight: 700, color: "#124AF0", fontSize: "0.92rem" }}>לשיחת היכרות לא מחייבת ←</span>
        </Link>
      </div>
      <style>{`
        @media(max-width:600px){
          .blog-cta-box { padding: 32px 18px !important; }
          .blog-offers { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
