"use client";

const items = [
  { icon: "🎓", title: "שיעורים קלילים בגובה העיניים", desc: "תכנים מעשיים שמדברים בגובה העיניים — בלי ז'רגון מיותר" },
  { icon: "📋", title: "מדריכים פרקטיים", desc: "יד ביד לתכלס — מדריכים שמלווים אותך צעד אחרי צעד" },
  { icon: "📊", title: "דשבורדים דיגיטליים", desc: "להנפשת הידע — כלים חכמים שהופכים תיאוריה לפעולה" },
  { icon: "💬", title: "ליווי צמוד", desc: "לכל שאלה — מענה אישי ותמיכה לאורך כל הדרך" },
  { icon: "🗓️", title: "גישה לשנה שלמה", desc: "הגישה לתוכנית פתוחה לשנה שלמה — ללמוד בקצב שלך" },
  { icon: "📈", title: "שיטת השקעה מוכחת", desc: "שיטה פשוטה ומוכחת מחקרית — תוצאות שמדברות בעד עצמן" },
  { icon: "🔍", title: "בדיקת תיק פיננסי אישית", desc: "סוכן ביטוח מקצועי בודק לך חינם את כל התיק — ביטוחים, פנסיה, השתלמות והר הכסף" },
  { icon: "👑", title: "קהילת המאסטריות", desc: "קהילה בלעדית עם תכנים מיוחדים, טיפים והדרכות שבועיות לכל נישות החיים" },
];

export default function WhatsIncluded() {
  return (
    <section style={{ background: "#F4F7FF", padding: "80px 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: "#21F0B0", fontWeight: 700, fontSize: "0.9rem", letterSpacing: 1, marginBottom: 8, background: "#124AF0", display: "inline-block", padding: "4px 16px", borderRadius: 50 }}>
            הכל כלול
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#124AF0", marginTop: 12, marginBottom: 12 }}>
            מה כלול בתוכנית?
          </h2>
          <p style={{ color: "#555", fontSize: "1.05rem" }}>
            כל הכלים, הליווי והתמיכה שצריך כדי לקחת אחריות על הכסף שלך
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
            marginBottom: 32,
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                background: "white",
                borderRadius: 16,
                padding: "24px 20px",
                border: "1px solid #E8EDFF",
                transition: "box-shadow 0.2s, transform 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(18,74,240,0.1)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>{item.icon}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#124AF0", marginBottom: 8 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "0.92rem", color: "#555", lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Zoom session — highlighted separately */}
        <div
          style={{
            background: "linear-gradient(135deg, #124AF0, #0a38c4)",
            color: "white",
            borderRadius: 20,
            padding: "28px 32px",
            display: "flex",
            gap: 20,
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontSize: "2.5rem" }}>🤝</div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8 }}>
              פגישת זום אישית אחד על אחד
            </h3>
            <p style={{ opacity: 0.9, lineHeight: 1.7, fontSize: "0.97rem" }}>
              אחרי שתסיימי את הקורס ותביני איך המערכת עובדת, נפגשות לזום אישי (1:1).
              נפתח יחד את הנתונים שלך, נדייק את התוכנית, ונוודא שכל שקל נמצא במקום הנכון.
              <br />
              <strong>קיים במסלול המלא בלבד.</strong>
            </p>
          </div>
          <div
            style={{
              background: "#21F0B0",
              color: "#124AF0",
              borderRadius: 10,
              padding: "8px 18px",
              fontWeight: 700,
              fontSize: "0.88rem",
              whiteSpace: "nowrap",
              alignSelf: "center",
            }}
          >
            כלול במסלול המלא
          </div>
        </div>
      </div>
    </section>
  );
}
