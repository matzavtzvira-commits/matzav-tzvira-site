"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const AVATAR = "/academy/mitzbit-avatar.jpg";
const NAVY = "#060D3C";
const NAVY_2 = "#0B1338";

const OPENING = [
  "היי יקרה 🤍 אני מצבית.",
  "הכנתי לך קורס קצר וקליל על שוק ההון.",
  "ורגע לפני שאני שולחת אותך פנימה, נעשה מבחן קטן 😉",
  "אל תילחצי. זה בלי תעודות ובלי ציונים. רק כדי לכוון אותך בדיוק לרמה שמתאימה לך.",
  '"שוק ההון" נשמע לך מלחיץ? נכון? אז לא. אני כאן להראות לך כמה זה מעניין, וכמה כסף מסתובב שם בשקט.',
  "כי הגיע הזמן שגם הכסף שלך יעשה השתדלות. לא רק את. 🤍",
  "יאללה, מתחילות 👇",
];

type Option = { t: string; p: number };
const QUESTIONS: { q: string; options: Option[] }[] = [
  {
    q: "שוק ההון. מה הכי עולה לך בראש?",
    options: [
      { t: "הימור אחד גדול, לא בשבילי", p: 1 },
      { t: "רק למומחים ואנליסטים עם חליפות", p: 2 },
      { t: "אפשר להצליח עם ידע בסיסי, בלי להיות גאון", p: 3 },
      { t: "אני כבר בפנים ומרגישה בבית 💅", p: 4 },
    ],
  },
  {
    q: '"S&P 500". מה זה בשבילך?',
    options: [
      { t: "קשור לשוק ההון... משהו... נכון? 😅", p: 1 },
      { t: "שמעתי, לא יודעת מה זה בדיוק", p: 2 },
      { t: "מדד של 500 החברות הגדולות באמריקה", p: 3 },
      { t: "מכירה, ואפילו יש לי אותו בתיק", p: 4 },
    ],
  },
  {
    q: "יש לך פנסיה, קרן השתלמות, אולי חיסכון לכל ילד. ידעת שכל זה כבר מושקע בשוק ההון?",
    options: [
      { t: "מה?! לא היה לי מושג 😱", p: 1 },
      { t: "יש לי אותם, לא ידעתי שהם שם", p: 2 },
      { t: "ידעתי, ויודעת בגדול מה יש לי", p: 3 },
      { t: "יודעת בדיוק איפה כל שקל יושב", p: 4 },
    ],
  },
  {
    q: 'הפנסיה שלך יושבת ב"מסלול", ודמי ניהול יכולים לעלות לך מיליון שקל.',
    options: [
      { t: "מסלול? דמי ניהול? פעם ראשונה שומעת", p: 1 },
      { t: "שמעתי, אבל לא נגעתי ולא בדקתי", p: 2 },
      { t: "בדקתי, אולי אפילו שיניתי משהו", p: 3 },
      { t: "עוקבת ומעדכנת לפי הגיל שלי", p: 4 },
    ],
  },
  {
    q: "לפתוח חשבון מסחר משלך ולקנות קרן סל לבד, בלי מתווך.",
    options: [
      { t: "נשמע רק למקצועניות, לא אני", p: 1 },
      { t: "מסקרן, אבל קודם בסיס וסדר", p: 2 },
      { t: "בול מה שאני רוצה, אני מוכנה", p: 3 },
    ],
  },
  {
    q: "מחר בבוקר השוק צונח 20%. את...",
    options: [
      { t: "נכנסת ללחץ ורוצה לברוח", p: 1 },
      { t: "לא נעים, אבל לא בורחים... נכון?", p: 2 },
      { t: "רגועה לגמרי, זו הזדמנות 💅", p: 3 },
    ],
  },
];

type ResultKey = "beginner" | "advanced" | "champion";
const RESULTS: Record<ResultKey, { emoji: string; tier: string; slug: string; accent: string; lines: string[] }> = {
  beginner: {
    emoji: "🌱", tier: "מתחילות", slug: "level-1", accent: "#21F0B0",
    lines: [
      "קלטתי אותך, ואת בדיוק במקום הנכון 🤍",
      "את במסלול המתחילות, וזאת החוכמה הכי גדולה להתחיל מכאן. נפרק יחד את שוק ההון לשפה שרק אנחנו מבינות.",
    ],
  },
  advanced: {
    emoji: "💪", tier: "מתקדמות", slug: "level-2", accent: "#124AF0",
    lines: [
      "וואו, את מבינה יותר ממה שחשבת על עצמך 💪",
      "את במסלול המתקדמות. היסודות ברורים לך, עכשיו נעשה סדר בכסף שכבר יש לך: פנסיה, השתלמות, גמל, חיסכון לכל ילד. הרבה פעמים דווקא שם נשחק הכי הרבה כסף, בשקט.",
    ],
  },
  champion: {
    emoji: "👑", tier: "אלופות", slug: "level-3", accent: "#FA5C5C",
    lines: [
      "אשת חיל, את אלופה 👑",
      "את במסלול האלופות, מוכנה לקחת את ההגה. את כבר יודעת מה יש לך, עכשיו נדבר על השליטה: תיק מסחר עצמאי, פיזור, הוראת קבע, ואיך נשארות רגועות גם כשהמסך אדום.",
    ],
  },
};

function resultFor(score: number): ResultKey {
  if (score <= 11) return "beginner";
  if (score <= 16) return "advanced";
  return "champion";
}

type Msg = { from: "bot" | "me"; text: string };
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function QuizPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [qIndex, setQIndex] = useState(-1); // -1 = intro not done
  const [options, setOptions] = useState<Option[] | null>(null);
  const [result, setResult] = useState<ResultKey | null>(null);
  const scoreRef = useRef(0);
  const startedRef = useRef(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const push = useCallback((m: Msg) => setMessages((prev) => [...prev, m]), []);

  const botSay = useCallback(async (text: string, thinkMs = 620) => {
    setTyping(true);
    await sleep(thinkMs);
    setTyping(false);
    push({ from: "bot", text });
    await sleep(180);
  }, [push]);

  // intro sequence + first question
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    (async () => {
      await sleep(350);
      for (const line of OPENING) await botSay(line, 520);
      await botSay(QUESTIONS[0].q, 640);
      setQIndex(0);
      setOptions(QUESTIONS[0].options);
    })();
  }, [botSay]);

  // autoscroll — scroll only inside the chat, never the window (keeps footer off-screen)
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing, options, result]);

  const answer = useCallback(async (opt: Option) => {
    setOptions(null);
    push({ from: "me", text: opt.t });
    scoreRef.current += opt.p;
    await sleep(320);
    const next = qIndex + 1;
    if (next < QUESTIONS.length) {
      await botSay(QUESTIONS[next].q, 640);
      setQIndex(next);
      setOptions(QUESTIONS[next].options);
    } else {
      const key = resultFor(scoreRef.current);
      const r = RESULTS[key];
      await botSay("רגע, סופרת... 🤍", 700);
      for (const line of r.lines) await botSay(line, 780);
      setResult(key);
    }
  }, [qIndex, push, botSay]);

  const progress = qIndex >= 0 && !result ? qIndex + 1 : result ? QUESTIONS.length : 0;
  const activeAccent = result ? RESULTS[result].accent : "#21F0B0";

  return (
    <main style={{ background: `radial-gradient(ellipse at 50% 0%, ${NAVY_2} 0%, ${NAVY} 60%)`, minHeight: "100vh", paddingTop: 80 }}>
      <div className="quiz-shell">
        {/* header */}
        <div className="quiz-head">
          <img src={AVATAR} alt="מצבית" className="quiz-head-av" />
          <div style={{ flexGrow: 1 }}>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.05rem", fontFamily: "var(--font-heading)" }}>מצבית</div>
            <div style={{ color: "#21F0B0", fontSize: "0.78rem", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#21F0B0", display: "inline-block" }} />
              מקוונת עכשיו
            </div>
          </div>
          {progress > 0 && (
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontWeight: 600 }}>{progress}/{QUESTIONS.length}</div>
          )}
        </div>

        {/* messages */}
        <div className="quiz-body" ref={bodyRef}>
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", justifyContent: m.from === "bot" ? "flex-start" : "flex-end", alignItems: "flex-end", gap: 8 }}
              >
                {m.from === "bot" && <img src={AVATAR} alt="" className="quiz-bubble-av" />}
                <div className={m.from === "bot" ? "quiz-bubble bot" : "quiz-bubble me"}>{m.text}</div>
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
              <img src={AVATAR} alt="" className="quiz-bubble-av" />
              <div className="quiz-bubble bot quiz-typing">
                <span></span><span></span><span></span>
              </div>
            </motion.div>
          )}

          {/* options */}
          <AnimatePresence>
            {options && (
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 6 }}
              >
                {options.map((opt, i) => (
                  <motion.button
                    key={i}
                    onClick={() => answer(opt)}
                    whileTap={{ scale: 0.97 }}
                    className="quiz-opt"
                  >
                    {opt.t}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* result CTA */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="quiz-result"
              style={{ borderColor: `${activeAccent}55` }}
            >
              <div style={{ fontSize: "2.6rem", lineHeight: 1 }}>{RESULTS[result].emoji}</div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.5rem", margin: "8px 0 4px", fontFamily: "var(--font-heading)" }}>
                מסלול ה{RESULTS[result].tier}
              </div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.92rem", marginBottom: 20 }}>זה המקום שלך להתחיל ממנו 🤍</div>
              <Link href={`/academy/${RESULTS[result].slug}`} className="quiz-cta" style={{ background: activeAccent, color: activeAccent === "#21F0B0" ? "#060D3C" : "#fff", boxShadow: `0 12px 30px ${activeAccent}55` }}>
                למסלול שלי ←
              </Link>
              <Link href="/academy" className="quiz-cta-sec">
                לא בטוחה שזו הרמה שלך? הצצה בכל המסלולים
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      <style>{`
        .quiz-shell {
          max-width: 480px;
          margin: 0 auto;
          height: calc(100vh - 80px);
          height: calc(100dvh - 80px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
          border-inline: 1px solid rgba(255,255,255,0.07);
        }
        .quiz-head {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 12px;
          padding: 14px 18px;
          background: ${NAVY_2};
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .quiz-head-av { width: 46px; height: 46px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(33,240,176,0.6); }
        .quiz-bubble-av { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
        .quiz-body {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 22px 16px 28px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .quiz-bubble {
          max-width: 82%;
          padding: 11px 15px;
          font-size: 0.98rem;
          line-height: 1.5;
          border-radius: 18px;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .quiz-bubble.bot { background: #fff; color: #1a2340; border-end-start-radius: 5px; }
        .quiz-bubble.me { background: #21F0B0; color: #06231b; font-weight: 600; border-end-end-radius: 5px; }
        .quiz-typing { display: inline-flex; gap: 5px; padding: 15px 16px; }
        .quiz-typing span {
          width: 8px; height: 8px; border-radius: 50%; background: #b9c2d6;
          animation: quizDot 1.2s infinite ease-in-out;
        }
        .quiz-typing span:nth-child(2) { animation-delay: 0.2s; }
        .quiz-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes quizDot { 0%,60%,100% { transform: translateY(0); opacity: .5; } 30% { transform: translateY(-5px); opacity: 1; } }

        .quiz-opt {
          text-align: start;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(33,240,176,0.35);
          color: #fff;
          font-family: inherit;
          font-size: 0.96rem;
          font-weight: 600;
          padding: 13px 17px;
          border-radius: 15px;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s, transform 0.1s;
        }
        .quiz-opt:hover { background: rgba(33,240,176,0.16); border-color: #21F0B0; }

        .quiz-result {
          margin-top: 18px;
          text-align: center;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid;
          border-radius: 24px;
          padding: 30px 24px;
          display: flex; flex-direction: column; align-items: center;
        }
        .quiz-cta {
          display: inline-block;
          font-weight: 800; font-size: 1.15rem;
          padding: 15px 40px; border-radius: 60px;
          margin-bottom: 14px;
        }
        .quiz-cta-sec {
          color: rgba(255,255,255,0.6);
          font-size: 0.88rem; font-weight: 500;
          border-bottom: 1px dashed rgba(255,255,255,0.28);
          padding-bottom: 2px;
        }
        .quiz-cta-sec:hover { color: #21F0B0; }

        @media (max-width: 520px) {
          .quiz-shell { border-inline: none; }
          .quiz-bubble { max-width: 85%; }
        }
      `}</style>
    </main>
  );
}
