"use client";

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: "#F4F7FF",
        padding: "80px 1.5rem",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 56,
            alignItems: "center",
          }}
        >
          {/* Photo placeholder */}
          <div style={{ order: 1 }}>
            <div
              style={{
                width: "100%",
                maxWidth: 380,
                aspectRatio: "4/5",
                background: "linear-gradient(135deg, #E8EDFF 0%, #d0dbff 100%)",
                borderRadius: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ textAlign: "center", color: "#124AF0", opacity: 0.5 }}>
                <div style={{ fontSize: "4rem" }}>👩</div>
                <p style={{ fontSize: "0.85rem", marginTop: 8 }}>תמונת רבקי וייס</p>
              </div>
              {/* Decorative mint accent */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 80,
                  height: 80,
                  background: "#21F0B0",
                  borderRadius: "24px 0 24px 0",
                  opacity: 0.7,
                }}
              />
            </div>
          </div>

          {/* Text */}
          <div style={{ order: 2 }}>
            <p
              style={{
                fontSize: "0.88rem",
                fontWeight: 600,
                color: "#21F0B0",
                background: "#124AF0",
                display: "inline-block",
                padding: "4px 14px",
                borderRadius: 50,
                marginBottom: 16,
                letterSpacing: 1,
              }}
            >
              נעים להכיר
            </p>

            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                color: "#124AF0",
                marginBottom: 8,
              }}
            >
              רבקי וייס ✉️
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "#555",
                marginBottom: 24,
                fontWeight: 600,
              }}
            >
              מתכננת פיננסית ומייסדת ״מצב צבירה״
              <br />
              כותבת טור &quot;שוות הון&quot; במגזין &quot;בתוך המשפחה&quot;
            </p>

            <div
              style={{
                borderRight: "4px solid #21F0B0",
                paddingRight: 20,
                marginBottom: 24,
              }}
            >
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "#292929",
                }}
              >
                עד לפני ארבע שנים, סביר להניח שהיינו נפגשות כשאני עם מברשת ופן ביד.
                הייתי פאנית מצליחה, עובדת שעות על הרגליים, במירוץ שמעולם לא נגמר.
                אבל אז הגיעה התובנה ששינתה את חיי:
              </p>
            </div>

            <div
              style={{
                background: "#124AF0",
                color: "white",
                borderRadius: 16,
                padding: "20px 24px",
                marginBottom: 24,
                fontSize: "1.05rem",
                lineHeight: 1.7,
              }}
            >
              <strong>הבנתי שביום שהידיים שלי לא בפעולה — אין הכנסה.</strong>
              <br />
              אם לא אעצור ואעשה סדר, אשאר משועבדת לעבודה אינסופית.
            </div>

            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "#292929",
                marginBottom: 16,
              }}
            >
              ראיתי איך מזכירה שמרוויחה רבע ממה שאני הרווחתי כפאנית, יכולה להגיע
              לחתונות הילדים ולפנסיה כשהיא עשירה, רגועה ושמחה — פשוט כי היא תכננה נכון.
            </p>

            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "#292929",
                marginBottom: 28,
              }}
            >
              היום, השליחות שלי היא שאת לא תצטרכי &quot;להפוך את העולם&quot;.
              זיקקתי את כל הידע הקריטי הזה לתוכנית <strong>&quot;שוות הון&quot;</strong>.
              אני כאן כדי לצעוק לכל מי שמוכנה לשמוע — יש דרך, והיא לא עוברת בעוד שעת עבודה על הרגליים.
            </p>

            <a
              href="#pricing"
              style={{
                background: "#124AF0",
                color: "white",
                padding: "14px 32px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: "1rem",
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
              אני מצטרפת לתוכנית ←
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
