"use client";

export default function Hook() {
  return (
    <section
      style={{
        background: "#124AF0",
        color: "white",
        padding: "80px 1.5rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <p
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            letterSpacing: 2,
            color: "#21F0B0",
            marginBottom: 16,
            textTransform: "uppercase",
          }}
        >
          רגע לפני שממשיכים —
        </p>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 700,
            marginBottom: 20,
            lineHeight: 1.2,
          }}
        >
          אני יגלה לך סוד
        </h2>
        <div
          style={{
            display: "inline-block",
            background: "#21F0B0",
            color: "#124AF0",
            borderRadius: 16,
            padding: "16px 40px",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          את = הון
        </div>
        <p
          style={{
            fontSize: "clamp(1.05rem, 2.5vw, 1.25rem)",
            lineHeight: 1.7,
            opacity: 0.92,
            maxWidth: 620,
            margin: "0 auto 24px",
          }}
        >
          את כבר מושקעת בשוק ההון — ביג טיים.
          <br />
          במשך שנים לימדו אותנו איך לחסוך, איך לעבוד עוד.
          <br />
          אבל במצב צבירה, אנחנו מדברות שפה אחרת.
        </p>
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            lineHeight: 1.7,
            opacity: 0.85,
            maxWidth: 600,
            margin: "0 auto 32px",
          }}
        >
          אנחנו לא רק שורדות את המצב הכלכלי — אנחנו יוצרות הון.
          <br />
          כי כשאת יודעת לנהל את הכסף שלך — את באמת שוות הון.
        </p>

        <a
          href="#about"
          style={{
            background: "white",
            color: "#124AF0",
            padding: "14px 36px",
            borderRadius: 50,
            fontWeight: 700,
            fontSize: "1.05rem",
            display: "inline-block",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          הכירי את רבקי ←
        </a>
      </div>
    </section>
  );
}
