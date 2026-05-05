"use client";
import { motion } from "framer-motion";

const cards = [
  {
    title: "המרוץ לא נגמר",
    color: "#FA5C5C",
    lines: [
      "בית, עבודה, ילדים. עד שנזכרת לנשום — כבר ערב.",
      "וכשיש שקט?",
      "את רוצה רק שקט. שש — שקט.",
      "לא לחשוב. לא לעשות. לא לקרוא. לא לתכנן.",
      "פשוט לנשום.",
      "לכסף אין מקום בסדר היום — גם אם את יודעת כמה זה חשוב.",
    ],
  },
  {
    title: '"אני יודעת שצריך... רק לא עכשיו"',
    color: "#21F0B0",
    lines: [
      "כמה פעמים אמרת את זה לעצמך?",
      "לא עכשיו, אחרי החגים, אחרי הקיץ, אחרי שיירגע.",
      "ובינתיים? הכסף מחכה. הזמן לא.",
    ],
  },
  {
    title: "נראה מפחיד ומסובך",
    color: "#124AF0",
    lines: [
      "ריביות, תיקי השקעות, מדד, תשואות.",
      "מרגיש כמו שפה אחרת לגמרי.",
      "אז את מורידה יד — ומחכה שמישהו אחר יטפל בזה.",
      "רק שאותו מישהו אחר לא תמיד עובד בשבילך.",
    ],
  },
];

export default function ToggleSection() {
  return (
    <section style={{ background: "#124AF0", padding: "80px 1.5rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* opening */}
        <div style={{ marginBottom: 52, textAlign: "center" }}>
          <p style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.6, margin: 0, textShadow: "0 0 12px rgba(255,255,255,0.8)" }}>
            את עובדת מספיק.
            <br />
            יותר ממספיק.
          </p>
          <p style={{ fontSize: "1.08rem", color: "#FFFFFF", lineHeight: 1.9, marginTop: 16, marginBottom: 0, fontWeight: 500, textShadow: "0 0 12px rgba(255,255,255,0.8)" }}>
            השאלה היא לא כמה קשה את עובדת <span style={{ fontSize: "0.75em" }}>—</span>
            <br />
            השאלה היא לאן האנרגיה שלך הולכת.
          </p>
        </div>

        {/* cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                background: "#FFFFFF",
                borderRadius: 20,
                padding: "32px 28px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* colored circle */}
              <div style={{
                position: "absolute",
                left: -40,
                top: "50%",
                transform: "translateY(-50%)",
                width: 130,
                height: 130,
                borderRadius: "50%",
                background: card.color,
                opacity: 0.15,
              }} />
              <div style={{
                position: "absolute",
                left: -20,
                top: "50%",
                transform: "translateY(-50%)",
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: card.color,
                opacity: 0.35,
              }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "inline-block", marginBottom: 12 }}>
                  <p style={{ fontSize: "1.35rem", fontWeight: 800, color: card.color, margin: 0 }}>
                    {card.title}
                  </p>
                  <svg viewBox="0 0 300 10" fill="none" xmlns="http://www.w3.org/2000/svg"
                    style={{ width: "100%", display: "block", marginTop: 2 }} preserveAspectRatio="none">
                    <defs>
                      <filter id={`sketch-toggle-${i}`}>
                        <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed={i + 2} result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
                      </filter>
                    </defs>
                    <motion.path
                      d="M4 5 Q75 3 150 5 Q225 7 296 5"
                      stroke={card.color}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      fill="none"
                      filter={`url(#sketch-toggle-${i})`}
                      opacity="0.9"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    />
                    <motion.path
                      d="M8 7 Q80 5 155 7 Q230 9 292 6"
                      stroke={card.color}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      fill="none"
                      filter={`url(#sketch-toggle-${i})`}
                      opacity="0.5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                    />
                  </svg>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {card.lines.map((line, j) => (
                    <p key={j} style={{ margin: 0, color: "#292929", fontSize: "0.97rem", lineHeight: 1.9, fontWeight: 500 }}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* white bottom section */}
        <div style={{ background: "#FFFFFF", borderRadius: 24, padding: "48px 36px" }}>

          {/* gut punch */}
          <div style={{ marginBottom: 36 }}>
            <p style={{ fontSize: "1.35rem", fontWeight: 800, color: "#070C24", lineHeight: 1.7, margin: "0 0 20px 0" }}>
              ואת יודעת מה הכי מפתיע?
            </p>
            <p style={{ fontSize: "1.08rem", color: "#292929", lineHeight: 2, margin: "0 0 16px 0", fontWeight: 500 }}>
              את כבר מושקעת בשוק ההון. עכשיו. בלי שידעת.
              <br />
              דרך הפנסיה שלך, קרן ההשתלמות, קופת הגמל.
            </p>
            <p style={{ fontSize: "1.08rem", color: "#292929", lineHeight: 2, margin: "0 0 8px 0", fontWeight: 500 }}>
              אבל כי אף אחד לא הסביר לך איך זה עובד <span style={{ fontSize: "0.75em" }}>—</span>
            </p>
            <div style={{ display: "inline-block", margin: "0 0 6px 0" }}>
              <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#124AF0", margin: 0 }}>
                ההפרש בין לדעת ללא לדעת <span style={{ fontSize: "0.75em" }}>—</span> ₪1,300,000.
              </p>
              <svg viewBox="0 0 300 10" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", display: "block", marginTop: 2 }} preserveAspectRatio="none">
                <defs>
                  <filter id="sketch-gap">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="3" seed="7" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
                <motion.path
                  d="M4 5 Q75 3 150 5 Q225 7 296 5"
                  stroke="#124AF0"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#sketch-gap)"
                  opacity="0.9"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                />
                <motion.path
                  d="M8 7 Q80 5 155 7 Q230 9 292 6"
                  stroke="#124AF0"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#sketch-gap)"
                  opacity="0.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                />
              </svg>
            </div>
            <p style={{ fontSize: "1.05rem", color: "#292929", fontWeight: 600, margin: 0 }}>
              בתום 45 שנה. בגלל פער ידע אחד בלבד.
            </p>
          </div>

          {/* divider */}
          <div style={{ height: 2, background: "linear-gradient(to left, #21F0B0, #124AF0)", borderRadius: 2, marginBottom: 36 }} />

          {/* personal message */}
          <div style={{ marginBottom: 36 }}>
            <p style={{ fontSize: "1.08rem", color: "#292929", lineHeight: 2, margin: 0, fontWeight: 500 }}>
              אני פה לסגור את הפער הזה.
              <br />
              לא בשיעורים משעממים.
              <br />
              לא בטבלאות אקסל מפחידות.
              <br />
              כוס קפה, שוקולד <span style={{ fontSize: "0.75em" }}>—</span> ויחד, יד ביד, צעד אחד בכל פעם.
              <br />
              זה לא מפחיד כמו שזה נראה. מבטיחה.
              <br />
              <strong style={{ color: "#124AF0" }}>אני לא יותר מוכשרת ממך <span style={{ fontSize: "0.75em" }}>—</span> גם על הספה עם נעלי בית, את יכולה לבנות הון. פשוטו כמשמעו.</strong>
            </p>
          </div>

          <p style={{ fontWeight: 800, color: "#FA5C5C", fontSize: "1.15rem", marginBottom: 32 }}>
            זה לא אמור להיות ככה <span style={{ fontSize: "0.75em" }}>—</span> בואי נשנה את זה יחד.
          </p>

          <a href="/course" style={{ position: "relative", display: "inline-block", textDecoration: "none" }}>
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "url('/btn-blue-new.svg?v=2')", backgroundRepeat: "no-repeat", backgroundSize: "110% 560%", backgroundPosition: "center 41%" }} />
            <span style={{ position: "relative", zIndex: 1, color: "#FFFFFF", padding: "20px 64px", fontWeight: 800, fontSize: "1.05rem", display: "block", whiteSpace: "nowrap", textShadow: "0 0 12px rgba(255,255,255,0.8)" }}>
              אני רוצה להתחיל <span className="arrow-anim">←</span>
            </span>
          </a>

        </div>

      </div>
    </section>
  );
}
