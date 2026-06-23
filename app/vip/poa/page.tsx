"use client";
import { useEffect, useRef, useState } from "react";

const POA_PARAGRAPHS: string[] = [
  'ממנה ומיפה בזה את כוחו של מצב צבירה (עוסק פטור) 311127716 ו/או כל מי שעובד בעסק ו/או כל מי שבא מכוחה, כבא כוחי החוקי והמורשה מטעמם, לעשות ולדבר בשמי, עבורי ובמקומי את כל הפעולות הבאות להלן, וכל אחת מהן בנפרד כדלהלן:',
  'להיכנס בשמי ובמקומי לאזור האישי שלי ממשלתי ו/או לאזור אישי שלי ברשויות המס למדינה ו/או לאזור אישי ברשויות המקומיות (עיריות) וכן לכל אזור אישי בכל חברה ו/או נותן שירות מסויים באשר הוא ולשמור את הסיסמא והפרטים של אזור האישי שלי בצורה מאובטחת ואחראית.',
  'להיכנס בשמי ובמקומי במוסדות פיננסים למיניהם וזאת לרבות בנקים ו/או ביטוחים ו/או ביטוח לאומי ו/או כל גוף אחר.',
  'ולחתום בו ו/או בהם בשמי ובמקומי ו/או לצרף את חתימתי עליהם, ועל כל מסמך/ים ו/או טפסים ו/או בקשות ולרבות טפסים מקוונים ו/או דיגיטליים, וכן על כל מה שדרוש לבצע כל שירות עבורי כמפורט להלן.',
  'וזאת בכדי לבצע עבורי את כל הפעולות שבקשתי / אבקש בעתיד.',
  'ואני מרשה לב"כ הנ"ל לפעול בשמי ולעיין בכל מידע ו/או מסמכים ו/או חומר ממוחשב ו/או דיגיטלי ולהשתמש בהם לצורך השירות אותו אני מזמין מב"כ לבצע בשמי מעת לעת לפי הצורך וזאת לרבות שמירתן בצורה ממוחשבת ואחראית, ואני מוותר בזאת על זכויות שלי מכוח חוק הגנת הפרטיות, תשמ"א-1981 (נוסח עדכני 14-11-2021).',
  'ואני מרשה לב"כ הנ"ל לשלם בשמי ובמקומי על חשבונו את כל התשלומים, המיסים, האגרות, הארנונות והיטלים ו/או תשלומי חובה למיניהם וכל הוצאה מכל מין וסוג שהוא החלים עלינו בגין כל סיבה, ושידרשו לצורך השגת כל אישור ו/או תעודה ו/או מסמך שיידרש לצורך ביצוע ו/או רישום כל הפעולות הנזכרות ביפוי כוח זה ו/או שיידרשו אם במישרין ואם בעקיפין.',
  'יפוי כוח זה יפורש באופן המרחיב ביותר כדי שבאי כוחנו הנ"ל יוכלו לעשות בשמנו ובמקומנו את כל אשר אנו רשאים ו/או מחוייבים לעשות בעצמנו ברשויות השונות ו/או מוסדות השונות.',
  'כל מעשה שיעשו באי כוחנו הנ"ל או כל מי שייגרם על-ידם בכל הנוגע לפעולות לפי יפוי כוח זה, יחייב אותנו, את יורשינו, את חליפינו ואת כל הבאים מכוחנו והרנו מסכימים מראש לכל מעשיהם של באי כוחנו הנ"ל שייעשו בתוקף יפוי כוח זה.',
  'יפוי כוח זה לשון יחיד רבים במשמע ולהיפך, ולשון זכר גם לשון נקבה במשמע ולהיפך, הכל לפי המקרה.',
  'בורר מוסכם בין הצדדים יהיה הרב ב"ד היושר והטוב סניף בית שמש, מזכיר הדיינים יקבע את הרכב הבוררים שידונו בתיק, הבוררות תתנהל בהתאם לשטר הבוררות הנהוג אצל הבורר הנ"ל.',
  'כדי להימנע מאיסור ריבית, הצדדים מסכימים בזה כי כל תנאי השירות כפוף לתנאי היתר עיסקא המובא בספר ברית פנחס.',
  'כמו"כ אני מתחייב בזאת שכל המסמכים שאגיש יהיו תקינים ואמינים, ואני מודע לכך ששליחת מסמכים שאינם תקינים או שאינם אמינים מהווה עבירה ואשא בכל ההשלכות המשפטיות הנובעות מכך.',
];

export default function VipPoaPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [consent, setConsent] = useState(false);
  const [hasSig, setHasSig] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);

  const today = new Date().toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" });

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setName(p.get("name") || "");
    setEmail(p.get("email") || "");
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(ratio, ratio);
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#0D1B3E";
    }
  }, []);

  function pos(e: React.PointerEvent) {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function down(e: React.PointerEvent) {
    e.preventDefault();
    drawing.current = true;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = pos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
  function move(e: React.PointerEvent) {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = pos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSig(true);
  }
  function up() { drawing.current = false; }
  function clearSig() {
    const c = canvasRef.current!;
    c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    setHasSig(false);
  }

  async function submit() {
    setErrMsg("");
    if (!name.trim()) return setErrMsg("יש למלא שם מלא");
    if (!consent) return setErrMsg("יש לאשר את ייפוי הכוח");
    if (!hasSig) return setErrMsg("יש לחתום במקום המיועד");
    setStatus("loading");
    try {
      const signature = canvasRef.current!.toDataURL("image/png");
      const res = await fetch("https://matzavtzvira.co.il/api/vip-poa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), idNumber: idNumber.trim(), signature, signedDate: today }),
      });
      const data = await res.json();
      setStatus(data.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  const card: React.CSSProperties = { background: "#fff", borderRadius: 20, boxShadow: "0 4px 24px rgba(18,74,240,0.08)" };
  const input: React.CSSProperties = { width: "100%", padding: "12px 14px", border: "1.5px solid #E8EDFF", borderRadius: 12, fontFamily: "inherit", fontSize: 15, color: "#292929", outline: "none", marginTop: 6 };

  if (status === "done") {
    return (
      <main style={{ minHeight: "100vh", background: "#F4F7FF", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "Heebo, Arial, sans-serif", direction: "rtl" }}>
        <div style={{ ...card, maxWidth: 460, width: "100%", padding: "44px 28px", textAlign: "center" }}>
          <div style={{ fontSize: 52, marginBottom: 14 }}>✅</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: "#060D3C", marginBottom: 10 }}>ייפוי הכוח נחתם, תודה!</h2>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7 }}>סיימת את כל התהליך. מכאן אני לוקחת מכאן את הביורוקרטיה על עצמי. בהצלחה רבה!</p>
          <p style={{ fontSize: 16, color: "#124AF0", fontWeight: 800, marginTop: 18 }}>רבקי</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#F4F7FF", padding: "28px 16px 60px", fontFamily: "Heebo, Arial, sans-serif", direction: "rtl" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#124AF0", letterSpacing: 2, marginBottom: 6 }}>שלב אחרון</p>
          <h1 style={{ fontSize: 25, fontWeight: 900, color: "#060D3C", margin: 0 }}>חתימה על ייפוי כוח</h1>
          <p style={{ fontSize: 14, color: "#666", marginTop: 8 }}>קראי את ייפוי הכוח, מלאי את הפרטים וחתמי למטה</p>
        </div>

        {/* נוסח */}
        <div style={{ ...card, padding: "24px 22px", marginBottom: 18 }}>
          <p style={{ textAlign: "center", fontWeight: 700, color: "#888", margin: "0 0 4px" }}>בס"ד</p>
          <h2 style={{ textAlign: "center", fontSize: 20, fontWeight: 900, color: "#060D3C", margin: "0 0 18px" }}>ייפוי כח</h2>
          {POA_PARAGRAPHS.map((p, i) => (
            <p key={i} style={{ fontSize: 14.5, color: "#333", lineHeight: 1.85, margin: "0 0 12px" }}>{p}</p>
          ))}
        </div>

        {/* פרטים */}
        <div style={{ ...card, padding: "22px 22px", marginBottom: 18 }}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 14, fontWeight: 700, color: "#060D3C" }}>שם מלא <span style={{ color: "#124AF0" }}>*</span></label>
            <input style={input} value={name} onChange={e => setName(e.target.value)} placeholder="שם החותמת" />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 14, fontWeight: 700, color: "#060D3C" }}>תעודת זהות</label>
            <input style={input} value={idNumber} onChange={e => setIdNumber(e.target.value)} inputMode="numeric" placeholder="מספר ת״ז" dir="ltr" />
          </div>
          <div>
            <label style={{ fontSize: 14, fontWeight: 700, color: "#060D3C" }}>תאריך</label>
            <div style={{ ...input, background: "#F8F9FC", color: "#555" }}>{today}</div>
          </div>
        </div>

        {/* חתימה */}
        <div style={{ ...card, padding: "22px 22px", marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 700, color: "#060D3C" }}>חתימה <span style={{ color: "#124AF0" }}>*</span></label>
            <button onClick={clearSig} type="button" style={{ background: "none", border: "none", color: "#124AF0", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>נקה</button>
          </div>
          <canvas
            ref={canvasRef}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerLeave={up}
            style={{ width: "100%", height: 180, border: "2px dashed #C9D4FF", borderRadius: 14, background: "#fff", touchAction: "none", cursor: "crosshair", display: "block" }}
          />
          <p style={{ fontSize: 12, color: "#aaa", marginTop: 8, textAlign: "center" }}>חתמי כאן עם האצבע או העכבר</p>
        </div>

        {/* אישור */}
        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 18, cursor: "pointer" }}>
          <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} style={{ width: 20, height: 20, accentColor: "#124AF0", marginTop: 2, flexShrink: 0 }} />
          <span style={{ fontSize: 14, color: "#333", lineHeight: 1.6 }}>קראתי את ייפוי הכוח, אני מבינה את תוכנו, ומאשרת אותו בחתימתי.</span>
        </label>

        {errMsg && <p style={{ color: "#FA5C5C", fontSize: 14, marginBottom: 12, textAlign: "center" }}>{errMsg}</p>}
        {status === "error" && <p style={{ color: "#FA5C5C", fontSize: 14, marginBottom: 12, textAlign: "center" }}>משהו השתבש, נסי שוב</p>}

        <button
          onClick={submit}
          disabled={status === "loading"}
          style={{ width: "100%", padding: 16, background: "#124AF0", color: "#fff", border: "none", borderRadius: 14, fontFamily: "inherit", fontSize: 17, fontWeight: 800, cursor: "pointer" }}
        >
          {status === "loading" ? "שולחת..." : "אני חותמת ←"}
        </button>
      </div>
    </main>
  );
}
