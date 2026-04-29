"use client";

export default function Magazine() {
  return (
    <section
      style={{
        background: "white",
        padding: "60px 1.5rem",
        borderTop: "1px solid #E8EDFF",
        borderBottom: "1px solid #E8EDFF",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <p
          style={{
            fontSize: "1rem",
            color: "#555",
            marginBottom: 20,
            fontWeight: 600,
          }}
        >
          אולי כבר פגשנו במגזין...
        </p>

        {/* Magazine badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            background: "#F4F7FF",
            border: "2px solid #E8EDFF",
            borderRadius: 20,
            padding: "20px 32px",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              background: "#124AF0",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.4rem",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            📰
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 700, color: "#124AF0", fontSize: "1.05rem" }}>
              טור &quot;שוות הון&quot; — רבקי וייס
            </div>
            <div style={{ color: "#555", fontSize: "0.9rem", marginTop: 2 }}>
              מגזין &quot;בתוך המשפחה&quot;
            </div>
          </div>
        </div>

        <p
          style={{
            fontSize: "1rem",
            color: "#555",
            maxWidth: 560,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          אם קראת — את כבר יודעת שאני מאמינה שכל אישה יכולה להבין כסף.
          <br />
          ואם לא — הנה מה שנשים שכן למדו איתי אומרות:
        </p>
      </div>
    </section>
  );
}
