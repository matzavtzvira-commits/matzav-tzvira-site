import puppeteer from "puppeteer-core";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const html = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Assistant', Arial, sans-serif;
    font-size: 13px;
    line-height: 1.75;
    color: #1a1a2e;
    background: #ffffff;
    direction: rtl;
  }

  /* Cover Page */
  .cover {
    height: 100vh;
    background: linear-gradient(160deg, #0a1a6e 0%, #060D3C 60%, #0d2a5c 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 60px 40px;
    page-break-after: always;
  }

  .cover-badge {
    background: rgba(33,240,176,0.15);
    border: 1px solid rgba(33,240,176,0.4);
    border-radius: 50px;
    padding: 6px 22px;
    color: #21F0B0;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.5px;
    margin-bottom: 32px;
  }

  .cover h1 {
    color: #ffffff;
    font-size: 34px;
    font-weight: 900;
    line-height: 1.3;
    margin-bottom: 16px;
  }

  .cover h1 span {
    color: #21F0B0;
  }

  .cover-subtitle {
    color: rgba(255,255,255,0.65);
    font-size: 16px;
    margin-bottom: 48px;
    line-height: 1.6;
  }

  .cover-divider {
    width: 60px;
    height: 3px;
    background: #21F0B0;
    margin: 0 auto 40px;
    border-radius: 2px;
  }

  .cover-author {
    color: rgba(255,255,255,0.5);
    font-size: 13px;
  }

  .cover-author strong {
    color: #21F0B0;
    font-size: 15px;
    display: block;
    margin-bottom: 4px;
  }

  /* Content pages */
  .content {
    padding: 50px 60px;
    max-width: 750px;
    margin: 0 auto;
  }

  .content-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #124AF0;
    padding-bottom: 12px;
    margin-bottom: 36px;
  }

  .content-header-brand {
    color: #124AF0;
    font-weight: 800;
    font-size: 13px;
  }

  .content-header-title {
    color: #888;
    font-size: 11px;
  }

  .intro-box {
    background: #f0f4ff;
    border-right: 4px solid #124AF0;
    border-radius: 0 8px 8px 0;
    padding: 20px 24px;
    margin-bottom: 36px;
    color: #1a1a2e;
    font-size: 13.5px;
    line-height: 1.8;
  }

  .section {
    margin-bottom: 32px;
  }

  .section h2 {
    font-size: 17px;
    font-weight: 800;
    color: #124AF0;
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 1px solid #e8eeff;
  }

  .section p {
    color: #2d2d44;
    font-size: 13px;
    line-height: 1.85;
    white-space: pre-line;
  }

  .highlight-box {
    background: linear-gradient(135deg, #f0f4ff, #e8fff8);
    border: 1px solid #21F0B0;
    border-radius: 10px;
    padding: 18px 22px;
    margin: 16px 0;
  }

  .highlight-box p {
    font-weight: 700;
    color: #124AF0;
    font-size: 13.5px;
  }

  .cta-section {
    background: linear-gradient(135deg, #124AF0, #0a2fa0);
    border-radius: 12px;
    padding: 28px 32px;
    text-align: center;
    margin-top: 40px;
    page-break-inside: avoid;
  }

  .cta-section h3 {
    color: #ffffff;
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 10px;
  }

  .cta-section p {
    color: rgba(255,255,255,0.8);
    font-size: 13px;
    margin-bottom: 18px;
  }

  .cta-link {
    display: inline-block;
    background: #21F0B0;
    color: #060D3C;
    font-weight: 800;
    font-size: 14px;
    padding: 12px 32px;
    border-radius: 50px;
    text-decoration: none;
  }

  .disclaimer {
    margin-top: 36px;
    padding: 16px 20px;
    background: #f7f7f7;
    border-radius: 8px;
    color: #888;
    font-size: 10.5px;
    line-height: 1.6;
    page-break-inside: avoid;
  }

  .page-break { page-break-before: always; }
</style>
</head>
<body>

<!-- COVER -->
<div class="cover">
  <div class="cover-badge">מדריך חינמי | מצב צבירה</div>
  <h1>המדריך הפרקטי<br>ל<span>ביטקוין</span></h1>
  <p class="cover-subtitle">לעשות סדר בבלאגן<br>בלי פחד ובלי ז'רגון</p>
  <div class="cover-divider"></div>
  <div class="cover-author">
    <strong>רבקי וייס</strong>
    מתכננת פיננסית | matzavtzvira.co.il
  </div>
</div>

<!-- CONTENT -->
<div class="content">

  <div class="content-header">
    <span class="content-header-brand">מצב צבירה | רבקי וייס</span>
    <span class="content-header-title">המדריך הפרקטי לביטקוין</span>
  </div>

  <div class="intro-box">
בשנים האחרונות אי אפשר לברוח מזה: בחדשות, בעיתונות - כולם מדברים על ביטקוין.
חלק רואים בו את עתיד הכסף, חלק בטוחים שמדובר בבועה שתתפוצץ, והרוב? פשוט מרגישות שזה סינית.

אז החלטתי לעשות לנו סדר. בלי מושגים טכנולוגיים מסובכים, בלי גרפים מפחידים. פשוט, ברור, ומנקודת מבט חכמה ואחראית.
  </div>

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

אבל - ואת חייבת לשמוע את ה"אבל" הזה:</p>
    <div class="highlight-box">
      <p>ביטקוין הוא נכס תנודתי בצורה קיצונית. הוא יכול לזנק ב-20% בשבוע, ואז להתרסק ב-50% תוך חודשים ספורים. מי שמשקיעה בו צריכה להיות קרה כקרח.</p>
    </div>
  </div>

  <div class="section">
    <h2>מה אומרים עליו הגדולים?</h2>
    <p>כדי להבין כמה העולם חלוק, תראי את שני המשפטים האלה:

המפרגן:
"ביטקוין הוא הישג טכנולוגי מדהים... היכולת לייצר משהו שאי אפשר לשכפל בעולם הדיגיטלי היא בעלת ערך עצום."
- ביל גייטס, מייסד מייקרוסופט

המפקפק:
"ביטקוין הוא כנראה רעל עכברים בריבוע... הוא לא מייצר כלום, הוא פשוט נכס ספקולטיבי."
- וורן באפט, מאילני ההשקעות הגדולים בעולם

שני אנשים חכמים. שתי דעות הפוכות לגמרי. זה אומר לך משהו על מורכבות הנכס הזה.</p>
  </div>

  <div class="page-break"></div>

  <div class="content-header">
    <span class="content-header-brand">מצב צבירה | רבקי וייס</span>
    <span class="content-header-title">המדריך הפרקטי לביטקוין</span>
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

הסיכון: רגולציה ממשלתית, תקלות טכנולוגיות, או פשוט איבוד עניין של הציבור שיגרום למחיר לקרוס.</p>
    <div class="highlight-box">
      <p>הכלל המוזהב: משקיעות רק כסף שאם תקומי מחר בבוקר ותגלי שהוא נעלם - זה לא ישנה לך את רמת החיים, ולא יפגע בשום תוכנית עתידית שלך.

עבור אחת זה 100 ₪ חד-פעמי, ועבור אחרת זה 20,000 ₪. כל אחת והכיס שלה.</p>
    </div>
  </div>

  <div class="section">
    <h2>שתי הדרכים להשקיע - ומה ההבדל ביניהן</h2>
    <p>אם החלטת שאת רוצה חשיפה לביטקוין, יש שתי דרכים:

דרך א' - ארנק דיגיטלי (בעלות מלאה על המטבע)
את קונה את המטבע עצמו ומחזיקה אותו בארנק דיגיטלי.
היתרון: המטבע אצלך. החיסרון: אם איבדת את הסיסמה - הכסף הלך לנצח. אין שירות לקוחות.

דרך ב' - קרן סל דרך פלטפורמת מסחר ישראלית
את לא קונה ביטקוין, אלא קרן סל שעוקבת אחרי מחירו.
היתרון: פשוט, מאובטח, מפוקח, הכל בשקלים.
החיסרון: אין בעלות אמיתית על המטבע.

הקרן הפופולרית: תכלית TTF ביטקוין - כשר ב"ד העדה החרדית
מספר קרן: 5139787</p>
  </div>

  <div class="section">
    <h2>אבל הכסף שלי בטוח? ומה אם החברה נסגרת?</h2>
    <p>מיטב, פייר ו-IBI הן חברות מוסדרות על ידי רשות ניירות ערך הישראלית. יש גוף ממשלתי שמפקח עליהן ומחייב אותן להיות שקופות.

הדבר הכי חשוב: הכסף שלך לא נמצא "אצלן".

בחוק הישראלי, כסף של לקוחות חייב להיות מופרד לחלוטין מהכסף של החברה. כאילו שיש לך כספת נפרדת עם שמך עליה.

אם מחר אחת מהן נסגרת? הכסף שלך לא נעלם - הוא יועבר לבית השקעות אחר. זו חובה חוקית.

הסיכון הוא בשוק. לא בפלטפורמה.</p>
  </div>

  <div class="cta-section">
    <h3>מוכנה לצעד הבא?</h3>
    <p>לפתוח חשבון מסחר ולקנות קרן סל ביטקוין - בשקלים, בקלות, ב-10 דקות</p>
    <a class="cta-link" href="https://matzavtzvira.co.il/articles/meitav-vs-fair">
      מיטב, פייר או IBI - מה מתאים לך?
    </a>
  </div>

  <div class="disclaimer">
    כל האמור הוא למטרת העשרה והדרכה בלבד, ואינו מהווה ייעוץ פיננסי, המלצה להשקעה או תחליף לייעוץ מקצועי. כל פעולה בשוק ההון הינה על אחריותך בלבד. | matzavtzvira.co.il
  </div>

</div>
</body>
</html>`;

const outputPath = join(__dirname, "..", "public", "guides", "bitcoin-guide.pdf");

console.log("מפעיל Chrome...");
const browser = await puppeteer.launch({
  executablePath: CHROME_PATH,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle0" });

console.log("יוצר PDF...");
await page.pdf({
  path: outputPath,
  format: "A4",
  printBackground: true,
  margin: { top: "0", bottom: "0", left: "0", right: "0" },
});

await browser.close();
console.log(`PDF נוצר בהצלחה: ${outputPath}`);
