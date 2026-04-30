"use client";

const testimonials = [
  {
    quote: "נכנסתי לתוכנית בלי לדעת מה זה הר הכסף. יצאתי עם 67,000 ₪ שגיליתי בקרנות ישנות שאפילו לא ידעתי שקיימות. רבקי לימדה אותי לשאול את השאלות הנכונות — ועכשיו אני יודעת לאן כל שקל הולך.",
    name: "מירי שיינר",
    sub: "אם לשישה, ירושלים",
  },
  {
    quote: "כשהתחלתי לחשוב על חתונות הילדים, הדבר הראשון שעלה לי לראש היה גמ\"ח. רבקי פתחה לי את העיניים: אותו סכום — בשוק ההון. הכסף צומח ובעז\"ה כשיגיע הזמן הוא יהיה שלי, בלי הלוואות.",
    name: "תהילה שרעבי",
    sub: "אשת אברך",
  },
];

const expert = {
  quote: "נהניתי מאד מהאופן שבו הקורס מצליח להעביר את החומר בשפה קלילה ונעימה ובמקביל אינו מתפשר על מקצועיות ודיוק. זו דרך יעילה ללמוד ליישם ולוודא שהכסף שלכם מתחיל לעבוד.",
  name: "נחום ברוק",
  sub: "יועץ פיננסי מומחה | מצב צבירה",
};

export default function HomeTestimonials() {
  return (
    <section style={{ background: "#F4F7FF", padding: "88px 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.88rem", letterSpacing: 1, background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50, marginBottom: 10 }}>
            מה אומרות
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: "#124AF0", lineHeight: 1.2 }}>
            נשים שכבר צוברות
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 24 }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: "white", borderRadius: 20, padding: "36px 28px", border: "1px solid #E8EDFF", position: "relative" }}>
              {/* decorative quote mark */}
              <div style={{ fontSize: "5rem", color: "#21F0B0", lineHeight: 0.7, marginBottom: 12, fontFamily: "Georgia, serif" }}>״</div>
              <p style={{ fontSize: "1rem", color: "#292929", lineHeight: 2.0, marginBottom: 24, fontWeight: 500 }}>
                {t.quote}
              </p>
              <div>
                <div style={{ fontWeight: 700, color: "#124AF0", fontSize: "0.95rem" }}>{t.name}</div>
                <div style={{ color: "#999", fontSize: "0.83rem", marginTop: 2 }}>{t.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Expert card */}
        <div
          style={{
            background: "linear-gradient(135deg, #124AF0, #0a38c4)",
            borderRadius: 20,
            padding: "36px 36px",
            display: "flex",
            gap: 24,
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontSize: "5rem", color: "#21F0B0", lineHeight: 0.7, fontFamily: "Georgia, serif", flexShrink: 0 }}>״</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "1.05rem", color: "white", lineHeight: 2.0, marginBottom: 20 }}>{expert.quote}</p>
            <div style={{ fontWeight: 700, color: "#21F0B0", fontSize: "0.95rem" }}>{expert.name}</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.83rem", marginTop: 2 }}>{expert.sub}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
