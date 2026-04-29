"use client";

const testimonials = [
  {
    quote:
      "ביום שאחרי השיעור על כספים אבודים גיליתי פנסיה רדומה בסכום של 23,000 ש״ח — שלא ידעתי בכלל על קיומה. בהמלצת רבקי, שיניתי את המסלול, והיום אני צפויה לקבל מעל 750,000 ש״ח יותר! בלי להשקיע שקל נוסף — רק בזכות ידע ולחיצת כפתור אחת.",
    name: "משתתפת בתוכנית",
    highlight: "750,000 ₪ יותר לפנסיה",
  },
  {
    quote:
      "האמת? חשבתי שכבר מאוחר מדי לשנות משהו. בגיל 52, אחרי הקורס, הבנתי סוף־סוף כמה דמי הניהול גוזלים ממני בכל חודש. נכנסתי לפעולה, השוויתי, ביקשתי הצעות חדשות — והצלחתי להוריד את דמי הניהול ביותר מ-70%. המשמעות? רווח של כ-675,000 ₪ לפנסיה שלי.",
    name: "טובי ל., אם לשבעה",
    highlight: "675,000 ₪ חיסכון בדמי ניהול",
  },
  {
    quote:
      "הפסקתי לפחד מהמספרים. היום אני מבינה, שואלת, משווה, ומתמקחת בלי לחשוש. התחושה הזו — לדעת שהכסף שלי באמת עובד בשבילי — זו מתנה שלא תסולא בפז.",
    name: "חני ר., אם לחמישה",
    highlight: "עצמאות פיננסית מלאה",
  },
];

export default function Testimonials() {
  return (
    <section style={{ background: "white", padding: "80px 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.9rem", letterSpacing: 1, marginBottom: 8, background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50 }}>
            תוצאות אמיתיות
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#124AF0", marginTop: 12 }}>
            זה לא סיסמה. זה מה שקורה כשעושים את זה נכון.
          </h2>
        </div>

        {/* Testimonials grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            marginBottom: 40,
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                background: "#F4F7FF",
                borderRadius: 20,
                padding: "28px 24px",
                borderTop: "4px solid #21F0B0",
                position: "relative",
              }}
            >
              {/* Green dot */}
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#21F0B0",
                  marginBottom: 16,
                }}
              />

              {/* Highlight */}
              <div
                style={{
                  background: "#124AF0",
                  color: "white",
                  borderRadius: 8,
                  padding: "6px 14px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  display: "inline-block",
                  marginBottom: 16,
                }}
              >
                ✅ {t.highlight}
              </div>

              <p
                style={{
                  fontSize: "0.98rem",
                  lineHeight: 1.8,
                  color: "#292929",
                  marginBottom: 20,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div
                style={{
                  fontWeight: 700,
                  color: "#124AF0",
                  fontSize: "0.9rem",
                }}
              >
                — {t.name}
              </div>
            </div>
          ))}
        </div>

        {/* Expert recommendation */}
        <div
          style={{
            background: "linear-gradient(135deg, #124AF0 0%, #0a38c4 100%)",
            color: "white",
            borderRadius: 20,
            padding: "32px 36px",
            display: "flex",
            gap: 24,
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              background: "#21F0B0",
              borderRadius: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              flexShrink: 0,
            }}
          >
            👨‍💼
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                opacity: 0.95,
                marginBottom: 16,
              }}
            >
              &ldquo;נהניתי מאד מהאופן שבו הקורס הזה מצליח להעביר את החומר בשפה קלילה ונעימה ובמקביל אינו מתפשר על מקצועיות ודיוק. השימוש בדאשבורדים דיגיטליים ובכלים מבוססי בינה מלאכותית הופכת את התיאוריה לתוכנית פעולה יעילה ומניבה.&rdquo;
            </p>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1rem" }}>נחום ברוק</div>
              <div style={{ opacity: 0.8, fontSize: "0.88rem" }}>יועץ פיננסי מומחה | מצב צבירה</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
