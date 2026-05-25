import puppeteer from "puppeteer-core";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const html = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700;800;900&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Assistant', Arial, sans-serif;
    color: #1a1a2e;
    background: #ffffff;
    direction: rtl;
    font-size: 13px;
  }

  /* ===== COVER ===== */
  .cover {
    width: 210mm;
    height: 297mm;
    background: linear-gradient(160deg, #0a1a6e 0%, #060D3C 55%, #0d2a5c 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 50px;
    page-break-after: always;
    position: relative;
  }

  .cover-top-line {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 5px;
    background: linear-gradient(90deg, #21F0B0, #124AF0);
  }

  .cover-badge {
    background: rgba(33,240,176,0.12);
    border: 1px solid rgba(33,240,176,0.35);
    border-radius: 50px;
    padding: 7px 24px;
    color: #21F0B0;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 1.5px;
    margin-bottom: 36px;
    text-transform: uppercase;
  }

  .cover h1 {
    color: #ffffff;
    font-size: 42px;
    font-weight: 900;
    line-height: 1.25;
    margin-bottom: 20px;
  }

  .cover h1 .accent { color: #21F0B0; }

  .cover-subtitle {
    color: rgba(255,255,255,0.6);
    font-size: 15px;
    line-height: 1.7;
    margin-bottom: 50px;
  }

  .cover-divider {
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #21F0B0, #124AF0);
    margin: 0 auto 40px;
    border-radius: 2px;
  }

  .cover-author strong {
    color: #ffffff;
    font-size: 16px;
    font-weight: 800;
    display: block;
    margin-bottom: 6px;
  }

  .cover-author span {
    color: rgba(255,255,255,0.4);
    font-size: 12px;
  }

  .cover-bottom-line {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: 5px;
    background: linear-gradient(90deg, #124AF0, #21F0B0);
  }

  /* ===== CONTENT PAGES ===== */
  .page {
    width: 210mm;
    min-height: 297mm;
    padding: 14mm 18mm 18mm;
    page-break-after: always;
  }

  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #124AF0;
    padding-bottom: 10px;
    margin-bottom: 28px;
  }

  .page-header-brand {
    color: #124AF0;
    font-weight: 800;
    font-size: 12px;
  }

  .page-header-sub {
    color: #aaa;
    font-size: 10.5px;
  }

  .intro-box {
    background: #f0f4ff;
    border-right: 4px solid #124AF0;
    padding: 16px 20px;
    border-radius: 0 8px 8px 0;
    margin-bottom: 28px;
    font-size: 13px;
    line-height: 1.8;
    color: #1a1a2e;
    white-space: pre-line;
  }

  .section {
    margin-bottom: 24px;
    page-break-inside: avoid;
  }

  .section h2 {
    font-size: 15px;
    font-weight: 800;
    color: #124AF0;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid #dde6ff;
  }

  .section p {
    font-size: 12.5px;
    line-height: 1.85;
    color: #2d2d44;
    white-space: pre-line;
  }

  .quote-block {
    background: #f7f9ff;
    border-right: 3px solid #21F0B0;
    padding: 12px 16px;
    margin: 12px 0;
    border-radius: 0 6px 6px 0;
    page-break-inside: avoid;
  }

  .quote-block p {
    font-size: 12px;
    color: #333;
    line-height: 1.7;
  }

  .quote-block .quote-source {
    font-size: 11px;
    color: #124AF0;
    font-weight: 700;
    margin-top: 6px;
  }

  .rule-box {
    background: linear-gradient(135deg, #eef2ff, #e8fff8);
    border: 1.5px solid #21F0B0;
    border-radius: 10px;
    padding: 14px 18px;
    margin: 14px 0;
    page-break-inside: avoid;
  }

  .rule-box p {
    font-weight: 700;
    color: #124AF0;
    font-size: 12.5px;
    line-height: 1.7;
  }

  .fund-tag {
    display: inline-block;
    background: #124AF0;
    color: #fff;
    font-size: 11.5px;
    font-weight: 700;
    padding: 4px 14px;
    border-radius: 4px;
    margin-top: 8px;
  }

  /* ===== CTA ===== */
  .cta-page {
    width: 210mm;
    height: 297mm;
    background: linear-gradient(160deg, #0a1a6e, #060D3C);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 50px;
    position: relative;
  }

  .cta-page .top-line {
    position: absolute;
    top: 0; right: 0; left: 0;
    height: 5px;
    background: linear-gradient(90deg, #21F0B0, #124AF0);
  }

  .cta-icon {
    font-size: 48px;
    margin-bottom: 24px;
  }

  .cta-page h2 {
    color: #ffffff;
    font-size: 26px;
    font-weight: 900;
    margin-bottom: 14px;
    line-height: 1.3;
  }

  .cta-page h2 span { color: #21F0B0; }

  .cta-page p {
    color: rgba(255,255,255,0.65);
    font-size: 14px;
    line-height: 1.7;
    margin-bottom: 36px;
    max-width: 400px;
  }

  .cta-btn {
    display: inline-block;
    background: #21F0B0;
    color: #060D3C;
    font-weight: 900;
    font-size: 15px;
    padding: 14px 40px;
    border-radius: 50px;
    text-decoration: none;
    margin-bottom: 14px;
  }

  .cta-url {
    color: rgba(255,255,255,0.35);
    font-size: 11px;
    margin-top: 30px;
  }

  .disclaimer-small {
    color: rgba(255,255,255,0.25);
    font-size: 9.5px;
    line-height: 1.6;
    margin-top: 14px;
    max-width: 430px;
  }
</style>
</head>
<body>

<!-- ========== COVER PAGE ========== -->
<div class="cover">
  <div class="cover-top-line"></div>
  <div class="cover-badge">מדריך חינמי | מצב צבירה</div>
  <h1>המדריך הפרקטי<br>ל<span class="accent">ביטקוין</span></h1>
  <p class="cover-subtitle">לעשות סדר בבלאגן - בלי פחד</p>
  <div class="cover-divider"></div>
  <div class="cover-author">
    <strong>רבקי וייס</strong>
    <span>מתכננת פיננסית | matzavtzvira.co.il</span>
  </div>
  <div class="cover-bottom-line"></div>
</div>

<!-- ========== PAGE 2: פתיחה + סקשנים 1-3 ========== -->
<div class="page">
  <div class="page-header">
    <span class="page-header-brand">מצב צבירה | רבקי וייס</span>
    <span class="page-header-sub">המדריך הפרקטי לביטקוין</span>
  </div>

  <div class="intro-box">בשנים האחרונות אי אפשר לברוח מזה: בחדשות, בעיתונות - כולם מדברים על ביטקוין.
חלק רואים בו את עתיד הכסף, חלק בטוחים שמדובר בבועה שתתפוצץ, והרוב? פשוט מרגישות שזה סינית.

אז החלטתי לעשות לנו סדר. בלי מושגים טכנולוגיים מסובכים, בלי גרפים מפחידים. פשוט, ברור, ומנקודת מבט חכמה ואחראית.</div>

  <div class="section">
    <h2>מה זה בכלל ביטקוין, ומי המציא אותו?</h2>
    <p>בשתי מילים: כסף דיגיטלי.
בשלוש מילים: כסף דיגיטלי עצמאי.

בשנת 2008 - רגע אחרי המשבר הכלכלי העולמי הגדול - אדם (או קבוצת אנשים) תחת השם הבדוי סאטושי נקאמוטו פירסם מסמך שהציג לעולם את הביטקוין. עד היום אף אחד לא יודע מי זה באמת סאטושי.

המטרה הייתה לייצר מערכת פיננסית שאינה תלויה באף גורם מרכזי - לא בבנקים, לא בממשלות ולא בחברות אשראי. כסף שעובר ישירות ממני אלייך, בלי שאף בנקאי באמצע יצטרך לאשר את ההעברה, לקחת עמלה שמנה, או להחליט שהוא "מקפיא" לנו את החשבון.</p>
  </div>

  <div class="section">
    <h2>המספרים המשוגעים: התשואה והתנודתיות</h2>
    <p>בתחילת דרכו, בשנת 2010, ביטקוין היה שווה פחות מסנט אחד - כמה אגורות בודדות. נכון להיום, בשנת 2026, מטבע אחד שווה עשרות אלפי דולרים (המחיר נע באזור ה-78,000 דולר למטבע). מדובר בתשואה דמיונית של מיליוני אחוזים למי שקנתה בהתחלה.

אבל - ואת חייבת לשמוע את ה"אבל" הזה:

ביטקוין הוא נכס תנודתי בצורה קיצונית. הוא יכול לזנק ב-20% בשבוע, ואז להתרסק ב-50% תוך חודשים ספורים. מי שמשקיעה בו צריכה להיות קרה כקרח - ולא יכולה להרשות לעצמה להיכנס לפאניקה מכל ירידה.</p>
  </div>

  <div class="section">
    <h2>מה אומרים עליו הגדולים?</h2>
    <p>כדי להבין כמה העולם חלוק, תראי את שני המשפטים האלה משני אנשים שמבינים דבר או שניים בכסף:</p>
    <div class="quote-block">
      <p>"ביטקוין הוא הישג טכנולוגי מדהים... היכולת לייצר משהו שאי אפשר לשכפל בעולם הדיגיטלי היא בעלת ערך עצום."</p>
      <div class="quote-source">ביל גייטס, מייסד מייקרוסופט</div>
    </div>
    <div class="quote-block">
      <p>"ביטקוין הוא כנראה רעל עכברים בריבוע... הוא לא מייצר כלום, הוא פשוט נכס ספקולטיבי."</p>
      <div class="quote-source">וורן באפט, מאילני ההשקעות הגדולים בעולם</div>
    </div>
    <p>שני אנשים חכמים. שתי דעות הפוכות לגמרי. זה אומר לך משהו על מורכבות הנכס הזה.</p>
  </div>
</div>

<!-- ========== PAGE 3: סקשנים 4-6 ========== -->
<div class="page">
  <div class="page-header">
    <span class="page-header-brand">מצב צבירה | רבקי וייס</span>
    <span class="page-header-sub">המדריך הפרקטי לביטקוין</span>
  </div>

  <div class="section">
    <h2>מה קורה עם זה בעולם?</h2>
    <p>בעבר, ממשלות נטו להתעלם מהביטקוין או לזלזל בו. היום המצב שונה לגמרי.

בארצות הברית ובמדינות רבות - כולל כאן בישראל - אישרו לגופים הפיננסיים הגדולים ביותר להנפיק קרנות סל על ביטקוין. זהו צעד ענק שמכניס את הביטקוין למיינסטרים הפיננסי, והופך אותו מ"כסף של גיקים במחשב" לנכס לגיטימי שגם קרנות פנסיה ובנקים מתחילים לגעת בו.

הרגולטורים הבינו שהביטקוין כאן כדי להישאר - ובחרו לפקח עליו במקום להילחם בו.</p>
  </div>

  <div class="section">
    <h2>סיכויים מול סיכונים: החוק החשוב ביותר</h2>
    <p>הסיכוי: להרוויח מהצמיחה של הטכנולוגיה הזו, וליהנות מנכס שהביקוש אליו הולך וגדל - בעוד שהכמות שלו מוגבלת מראש. לעולם יהיו רק 21 מיליון ביטקוין.

הסיכון: רגולציה ממשלתית (מדינות שיחליטו להילחם בו), תקלות טכנולוגיות, או פשוט איבוד עניין של הציבור שיגרום למחיר לקרוס.</p>
    <div class="rule-box">
      <p>הכלל המוזהב של עולם הקריפטו:

משקיעות רק כסף שאם תקומי מחר בבוקר ותגלי שהוא נעלם - זה לא ישנה לך את רמת החיים, ולא יפגע בשום תוכנית עתידית שלך.

עבור אחת זה יכול להיות 100 ש"ח חד-פעמי, ועבור אחרת זה 20,000 ש"ח. כל אחת והכיס שלה, רמת הסיכון שלה, והשקט הנפשי שלה.</p>
    </div>
  </div>

  <div class="section">
    <h2>שתי הדרכים להשקיע - ומה ההבדל ביניהן</h2>
    <p>אם החלטת שאת רוצה חשיפה לביטקוין, יש שתי דרכים מרכזיות:

<strong>דרך א' - ארנק דיגיטלי (בעלות מלאה על המטבע)</strong>
בדרך זו את קונה את המטבע עצמו ומחזיקה אותו ב"ארנק דיגיטלי" משלך.
היתרון: המטבע פיזית אצלך.
החיסרון: אם איבדת את הסיסמה - הכסף הלך לנצח. אין שירות לקוחות להתקשר אליו.

<strong>דרך ב' - דרך פלטפורמות מסחר וקרנות סל</strong>
זו הדרך הפופולרית יותר. בדרך זו את לא קונה ביטקוין, אלא קרן סל שעוקבת אחרי מחיר הביטקוין.
היתרון: פשוט וקל. הכל מנוהל במקום אחד, מאובטח, מוכר - ויש גוף פיננסי מפוקח מאחוריו.
החיסרון: אין לך בעלות אמיתית על המטבע.</p>
    <div style="margin-top:14px;">
      <span class="fund-tag">הקרן הפופולרית: תכלית TTF ביטקוין - כשר ב"ד העדה החרדית | מספר קרן: 5139787</span>
    </div>
  </div>

  <div class="section">
    <h2>אבל הכסף שלי בטוח? ומה אם החברה נסגרת?</h2>
    <p>זו השאלה שכולן חושבות עליה ומעטות שואלות.

מיטב, פייר ו-IBI הן חברות מוסדרות על ידי רשות ניירות ערך הישראלית. יש גוף ממשלתי שמפקח עליהן, בודק אותן, ומחייב אותן להיות שקופות.

הדבר הכי חשוב שצריך להבין: הכסף שלך לא נמצא "אצלן".

בחוק הישראלי, כסף של לקוחות חייב להיות מופרד לחלוטין מהכסף של החברה עצמה. כאילו שיש לך כספת נפרדת, עם שמך עליה, שרק את יכולה לפתוח.

אם מחר - חלילה - אחת מהן נסגרת? הכסף שלך לא נעלם. הוא יועבר לבית השקעות אחר. זו חובה חוקית.

הסיכון הוא בשוק. לא בפלטפורמה.</p>
  </div>
</div>

<!-- ========== CTA PAGE ========== -->
<div class="cta-page">
  <div class="top-line"></div>
  <div class="cta-icon">💡</div>
  <h2>מוכנה לצעד הבא?</h2>
  <p>לפתוח חשבון מסחר ולקנות קרן סל ביטקוין - בשקלים, בקלות, ב-10 דקות.<br>השוואה מלאה בין מיטב, פייר ו-IBI - כולל הטבות בלעדיות.</p>
  <a class="cta-btn" href="https://matzavtzvira.co.il/articles/meitav-vs-fair">
    מיטב, פייר או IBI - מה מתאים לך? ←
  </a>
  <div class="cta-url">matzavtzvira.co.il</div>
  <div class="disclaimer-small">כל האמור הוא למטרת העשרה והדרכה בלבד, ואינו מהווה ייעוץ פיננסי, המלצה להשקעה או תחליף לייעוץ מקצועי. כל פעולה בשוק ההון הינה על אחריותך בלבד.</div>
</div>

</body>
</html>`;

const outputPath = join(__dirname, "..", "public", "guides", "bitcoin-guide.pdf");

console.log("מפעיל Chrome...");
const browser = await puppeteer.launch({
  executablePath: CHROME_PATH,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--font-render-hinting=none"],
});

const page = await browser.newPage();
await page.setViewport({ width: 794, height: 1123 });
await page.setContent(html, { waitUntil: "networkidle0" });
await new Promise(r => setTimeout(r, 1500));

await page.pdf({
  path: outputPath,
  format: "A4",
  printBackground: true,
  margin: { top: "0", bottom: "0", left: "0", right: "0" },
});

await browser.close();
console.log(`PDF נוצר: ${outputPath}`);
