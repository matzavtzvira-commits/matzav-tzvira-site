"use client";
import Navigation from "@/components/Navigation";

export default function ThankYouPage() {
  return (
    <>
      <Navigation />
      <main style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 30%, #1535B5 0%, #060D3C 70%)", padding: "120px 1.5rem 80px", textAlign: "center" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>


          {/* כותרת */}
          <h1 style={{ fontSize: "clamp(1.7rem, 4vw, 2.5rem)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.5, marginBottom: 12 }}>
            תודה שנתת בי אמון
          </h1>
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "1.05rem", marginBottom: 36 }}>
            גישה לתוכנית מחכה לך במייל
          </p>

          {/* סרטון */}
          <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 40, boxShadow: "0 12px 48px rgba(0,0,0,0.4)" }}>
            <video
              autoPlay loop muted playsInline
              style={{ width: "100%", display: "block" }}
            >
              <source src="/must-video.mp4" type="video/mp4" />
            </video>
          </div>

          {/* הודעה */}
          <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "1.05rem", lineHeight: 2, marginBottom: 4 }}>
            ואני מחכה לפידבק שלך.
          </p>
          <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "1.05rem", lineHeight: 1.9, marginBottom: 4 }}>
            ואל תשכחי כוס קפה רותח ושוקולד מפנק ☕
          </p>
          <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "1.05rem", lineHeight: 1.9, marginBottom: 4 }}>
            תוך כדי הצפייה
          </p>
          {/* מתנה */}
          <style>{`
            @keyframes floatA {
              0%, 100% { transform: translateY(0px) rotate(-5deg); }
              50% { transform: translateY(-14px) rotate(5deg); }
            }
            @keyframes floatB {
              0%, 100% { transform: translateY(0px) rotate(8deg); }
              50% { transform: translateY(-18px) rotate(-6deg); }
            }
            @keyframes floatC {
              0%, 100% { transform: translateY(0px) scale(1); }
              50% { transform: translateY(-10px) scale(1.2); }
            }
            @keyframes popIn {
              0% { opacity: 0; transform: scale(0.3) translateY(20px); }
              70% { transform: scale(1.15) translateY(-4px); }
              100% { opacity: 1; transform: scale(1) translateY(0); }
            }
            .wow-float-a { display: inline-block; animation: floatA 2.2s ease-in-out infinite; font-size: 1.7rem; }
            .wow-float-b { display: inline-block; animation: floatB 2.6s ease-in-out infinite; animation-delay: 0.5s; font-size: 1.4rem; }
            .wow-float-c { display: inline-block; animation: floatC 1.9s ease-in-out infinite; animation-delay: 0.9s; font-size: 1.5rem; }
            .wow-popin { animation: popIn 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards; }
          `}</style>
          <div style={{ background: "rgba(33,240,176,0.08)", border: "1px solid rgba(33,240,176,0.25)", borderRadius: 20, padding: "28px 16px 16px", marginBottom: 24 }}>
            <p style={{ color: "#21F0B0", fontWeight: 800, fontSize: "1.05rem", marginBottom: 12 }}>
              מחכה לך מתנה
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/gift-must.png"
              alt="מתנה מאסטרית"
              style={{ width: "100%", maxWidth: 460, display: "block", margin: "0 auto" }}
            />
          </div>

          <p style={{ color: "#21F0B0", fontWeight: 900, fontSize: "1.15rem", marginBottom: 0 }}>
            תהני, רבקי ❤️
          </p>

          {/* ספאם */}
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", marginTop: 40 }}>
            לא קיבלת מייל? בדקי בתיקיית ספאם או שלחי ל-
            <a href="mailto:matzavtzvira@gmail.com" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
              matzavtzvira@gmail.com
            </a>
          </p>

        </div>
      </main>
    </>
  );
}
