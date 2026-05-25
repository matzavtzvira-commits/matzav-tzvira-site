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
    justify-content: flex-start;
    text-align: center;
    padding: 0 50px;
    padding-top: 60mm;
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
    height: 297mm;
    padding: 22mm 22mm 20mm;
    page-break-after: always;
    overflow: hidden;
    position: relative;
  }

  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #124AF0;
    padding-bottom: 10px;
    margin-bottom: 24px;
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

  .page-footer {
    position: absolute;
    bottom: 12mm;
    right: 22mm;
    left: 22mm;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #e8eeff;
    padding-top: 8px;
  }

  .page-footer span {
    color: #bbb;
    font-size: 9.5px;
  }

  .intro-box {
    background: #f0f4ff;
    border-right: 4px solid #124AF0;
    padding: 15px 20px;
    border-radius: 0 8px 8px 0;
    margin-bottom: 22px;
    font-size: 12.5px;
    line-height: 1.8;
    color: #1a1a2e;
    white-space: pre-line;
  }

  .section {
    margin-bottom: 18px;
    page-break-inside: avoid;
  }

  .section h2 {
    font-size: 14px;
    font-weight: 800;
    color: #124AF0;
    margin-bottom: 8px;
    padding-bottom: 5px;
    border-bottom: 1px solid #dde6ff;
  }

  .section p {
    font-size: 11.5px;
    line-height: 1.8;
    color: #2d2d44;
    white-space: pre-line;
  }

  .highlight-box {
    background: linear-gradient(135deg, #eef2ff, #e8fff8);
    border: 1.5px solid #21F0B0;
    border-radius: 10px;
    padding: 13px 17px;
    margin: 12px 0;
    page-break-inside: avoid;
  }

  .highlight-box p {
    font-weight: 700;
    color: #124AF0;
    font-size: 12px;
    line-height: 1.75;
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
    font-size: 11px;
  }

  .comparison-table th {
    background: #124AF0;
    color: #fff;
    padding: 7px 10px;
    font-weight: 700;
    text-align: right;
  }

  .comparison-table td {
    padding: 6px 10px;
    border-bottom: 1px solid #e8eeff;
    color: #2d2d44;
    text-align: right;
  }

  .comparison-table tr:nth-child(even) td {
    background: #f8f9ff;
  }

  .comparison-table td:first-child {
    font-weight: 700;
    color: #124AF0;
  }

  .track-tag {
    display: inline-block;
    background: #124AF0;
    color: #fff;
    font-size: 10.5px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 4px;
    margin: 3px 3px 3px 0;
  }

  .track-tag.green {
    background: #21F0B0;
    color: #060D3C;
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
  <h1>חיסכון לכל ילד<br><span class="accent">המדריך המלא</span></h1>
  <p class="cover-subtitle">מה שכולן לא ידעו - ומה שאפשר לשנות עכשיו</p>
  <div class="cover-divider"></div>
  <div class="cover-author">
    <strong>רבקי וייס</strong>
    <span>מתכננת פיננסית | matzavtzvira.co.il</span>
  </div>
  <div class="cover-bottom-line"></div>
</div>

<!-- ========== PAGE 2: פתיחה + למה הקימה + איך זה עובד ========== -->
<div class="page">
  <div class="page-header">
    <span class="page-header-brand">מצב צבירה | רבקי וייס</span>
    <span class="page-header-sub">חיסכון לכל ילד - המדריך המלא</span>
  </div>

  <div class="intro-box">מ-2017 המדינה מפקידה כסף לכל ילד - כל חודש, בלי לבקש.
הכסף נצבר בשקט. אחד לאחד.

הבעיה? ברירת המחדל מנחיתה אתכן במסלול שמניב הרבה פחות ממה שיכול.
וההפרש לאורך 21 שנה יכול להגיע ל-57,000 ₪ - לכל ילד.

זה המדריך שיכניס אתכן לתמונה המלאה.</div>

  <div class="section">
    <h2>למה הקימה המדינה את התוכנית?</h2>
    <p>התוכנית יצאה לדרך ב-1 בינואר 2017, כתוצאה מהחלטת ממשלה והסכמים קואליציוניים.
המטרה: להחזיר חלק מהקיצוצים שנעשו בעבר בקצבאות הילדים - אבל הפעם בפורמט של חיסכון לטווח ארוך, ולא כהוצאה שוטפת.

נקודה חשובה: המדינה הפקידה סכומים רטרואקטיבית עבור כל ילד שהיה זכאי לקצבת ילדים מ-מאי 2015.

שלוש מטרות מרכזיות לתוכנית:

1. צמצום פערים חברתיים - גם ילד שגדל במשפחה עם קשיים כלכליים יגיע לבגרות עם סכום כסף ראשוני שיפתח עבורו הזדמנויות.

2. עידוד אוריינות פיננסית - ההורים צריכים לבחור בין גוף מנהל ומסלול השקעה. זה מכריח את כולם להכיר מושגים כלכליים בסיסיים.

3. ניצול כוח הזמן - הממשלה מבינה שסכום קטן (כמו 58 ₪) שמופקד לאורך 18-21 שנה צובר ריבית דריבית בצורה משמעותית - דבר שקשה מאוד לשחזר בחיסכון לטווח קצר.</p>
  </div>

  <div class="section">
    <h2>איך זה עובד בפועל?</h2>
    <p>כוח ההחלטה - בידיים שלכן:

ביטוח לאומי מפקיד 58 ₪ לחודש עבור כל ילד לחשבון חיסכון ייעודי על שמו (נכון ל-2026).
כל הורה יכול לבקש להוסיף עוד 58 ₪ מקצבת הילדים - כך שיופקדו 116 ₪ בפועל כל חודש.
ההורים בוחרים היכן ינוהל הכסף: בבנק (מסלול יציב עם ריבית קבועה) או בקופת גמל (השקעות בשוק ההון).

מענקים מהמדינה לאורך הדרך:
  284 ₪ בגיל 3
  284 ₪ נוספים בגיל 12 לבנות / 13 לבנים
  568 ₪ נוספים אם מחכות עד גיל 21

החיסכון שייך לאמא בחוק. רק דרך האזור האישי שלה ניתן לצפות בנתונים ולשנות מסלול.</p>
  </div>

  <div class="page-footer">
    <span>matzavtzvira.co.il</span>
    <span>עמוד 2 מתוך 6</span>
  </div>
</div>

<!-- ========== PAGE 3: רפורמת 2025 + הפער המדהים ========== -->
<div class="page">
  <div class="page-header">
    <span class="page-header-brand">מצב צבירה | רבקי וייס</span>
    <span class="page-header-sub">חיסכון לכל ילד - המדריך המלא</span>
  </div>

  <div class="section">
    <h2>רפורמת 2025 - מה השתנה?</h2>
    <p>בתחילת 2025 נכנסו לתוקף שינויים משמעותיים בתוכנית. מטרת המדינה ברורה: שהכסף של הילדים שלכן לא ישב "ישן" בבנק, אלא יעבוד ויניב הרבה יותר.

הכסף שבבנק - "כנפיים קצוצות"
אם לילדים שלכן כבר יש חיסכון בבנק - הכסף הזה נשאר שם עד גיל 18. הרפורמה לא מאפשרת להעביר כסף שכבר הופקד בבנק לגוף אחר.

אבל (ויש כאן אבל גדול!) - ניתן להחליט שכל התשלומים החדשים יעברו לקופת גמל להשקעה. זו הזדמנות מצוינת להציל את המשך החיסכון ולתת לו פוטנציאל צמיחה גבוה יותר.

ברירת המחדל השתנתה לתינוקות חדשים
נולד לכן תינוקת? מזל טוב! עבור התינוקת החדשה, המדינה תפתח אוטומטית חשבון בקופת גמל להשקעה - גם אם לאחים הגדולים יש חיסכון בבנק.

עוברות למסלול סיכון מוגבר
שינוי נוסף ודרמטי: בעבר ברירת המחדל הייתה מסלול עם סיכון מועט. היום, המדינה קובעת שברירת המחדל בקופות הגמל היא מסלול סיכון מוגבר. הסטטיסטיקה מראה שלחיסכון של 18 שנה, מסלול מניות משיג תוצאות הרבה יותר טובות ממסלולים יציבים.</p>
  </div>

  <div class="section">
    <h2>הפער המדהים: בנק לעומת קופת גמל</h2>
    <p>תסתכלנה על המספרים: אם תפקידנה 116 ₪ בחודש - כמה יצטבר אחרי 21 שנה?</p>
    <table class="comparison-table">
      <thead>
        <tr>
          <th>מסלול</th>
          <th>סכום צפוי לאחר 21 שנה</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>בנק</td><td>38,974 ₪</td></tr>
        <tr><td>קופת גמל - סיכון נמוך</td><td>50,062 ₪</td></tr>
        <tr><td>קופת גמל - סיכון בינוני</td><td>64,697 ₪</td></tr>
        <tr><td>קופת גמל - סיכון גבוה</td><td>95,963 ₪</td></tr>
      </tbody>
    </table>
    <div class="highlight-box">
      <p>הפרש של 57,000 ₪ - לכל ילד - בין הבנק למסלול המניות.
ובלי לעשות שום דבר. הכסף עובד לבד.

(חישוב מבוסס על נתוני השנים האחרונות. אין ערובה לתשואה עתידית. כל האמור הוא למטרת העשרה בלבד.)</p>
    </div>
  </div>

  <div class="page-footer">
    <span>matzavtzvira.co.il</span>
    <span>עמוד 3 מתוך 6</span>
  </div>
</div>

<!-- ========== PAGE 4: המסלולים הקיימים + S&P 500 ========== -->
<div class="page">
  <div class="page-header">
    <span class="page-header-brand">מצב צבירה | רבקי וייס</span>
    <span class="page-header-sub">חיסכון לכל ילד - המדריך המלא</span>
  </div>

  <div class="section">
    <h2>המסלולים הקיימים - מה ההבדל?</h2>
    <p>לכל גוף מנהל יש כמה מסלולים לבחירה:

<strong>מסלול בנק</strong> - היציב ביותר, ריבית קבועה ובטוחה. אבל: אין כמעט צמיחה לאורך 18 שנה.

<strong>סיכון נמוך</strong> - קופת גמל עם השקעות שמרניות. בטוח יחסית, אבל פוטנציאל הצמיחה עדיין מוגבל.

<strong>סיכון בינוני</strong> - תמהיל של אגרות חוב ומניות. בינוני בסיכון ובתשואה.

<strong>סיכון גבוה</strong> - מסלול שנועד לצמיחה משמעותית לטווח ארוך. חשיפה גבוהה למניות.

<strong>מסלול הלכה:</strong>
מיטב הלכה - עוקב S&amp;P500. כשרות: העדה החרדית, גלאט הון, הרב דביר.
אינפיניטי הלכה - עוקב MSCI ACWI. כשרות: רבני תשואה כהלכה, גלאט הון.
הראל הלכה - הרכב ייחודי בסיכון מוגבר. כשרות: העדה החרדית, גלאט הון.
מור הלכה - שילוב בין המדד העולמי לשוק הישראלי. כשרות: הרב דביר.</p>
  </div>

  <div class="section">
    <h2>S&P 500 - הכירו את מנוע הצמיחה האמריקאי</h2>
    <p>S&P 500 הוא מדד שמאגד את 500 החברות החזקות והגדולות בארה"ב - Apple, Microsoft, Amazon, Google, Tesla ועוד.

השקעה במדד הזה אומרת שאתן קונות חלק מהכלכלה האמריקאית כולה.

למה הוא חזק לטווח הארוך?
המדד כולל מאות חברות - כך שאם אחת נפגעת, האחרות מאזנות.
מייצג את הכלכלה החזקה ביותר בעולם ובוחר באופן דינמי את המובילות.
פוטנציאל התשואה לטווח הארוך - גבוה.

"ביצועי עבר אינם מעידים על העתיד."
"ניקיונות" בשוק (ירידות זמניות) הם חלק טבעי ובריא, ולעתים מהווים הזדמנות לקנות בזול - כשהמדד נוטה לטפס חזרה.

פיזור רחב, פוטנציאל תשואה גבוה ופשטות ההשקעה - אלה שהפכו אותו לכלי ההשקעה המועדף על מיליוני משקיעים בעולם.</p>
  </div>

  <div class="page-footer">
    <span>matzavtzvira.co.il</span>
    <span>עמוד 4 מתוך 6</span>
  </div>
</div>

<!-- ========== PAGE 5: MSCI World + ת"א 125 + ריסק מול ריסק ========== -->
<div class="page">
  <div class="page-header">
    <span class="page-header-brand">מצב צבירה | רבקי וייס</span>
    <span class="page-header-sub">חיסכון לכל ילד - המדריך המלא</span>
  </div>

  <div class="section">
    <h2>MSCI World - הכירו את המדד הגלובלי</h2>
    <p>אם את מחפשת את הדרך הכי רחבה ומפוזרת להשקיע את כסף הילדים - MSCI World הוא התשובה.
זהו מדד גלובלי שמכיל אלפי חברות מובילות מהמדינות החזקות בעולם.

מה יש בתוך ה"סל" הגלובלי?
ארה"ב: ענקיות הטכנולוגיה והצריכה | אירופה: תעשייה, רכב ואופנה מובילות | אסיה ואוסטרליה: מעצמות צומחות.

למה זה נחשב לבחירה חכמה?
פיזור מקסימלי - אם יש מיתון במדינה מסוימת, השגשוג של מדינה אחרת יכול לאזן.
ביטוח מפני סיכונים מקומיים - הגנה מפני זעזועים פוליטיים או ביטחוניים.
מנגנון "עדכון עצמי" - המדד מתעדכן כל הזמן: החברה שצומחת נכנסת, הכבודה יוצאת.</p>
  </div>

  <div class="section">
    <h2>ת"א 125 - הכירו את הבורסה הישראלית</h2>
    <p>ת"א 125 הוא מדד הדגל של הבורסה לניירות ערך בתל אביב.
הוא כולל את 125 החברות בעלות שווי השוק הגבוה ביותר שנסחרות בבורסה המקומית.

מה יש בפנים?
הבנקים הגדולים (לאומי, פועלים, מזרחי) - חלק מאוד משמעותי מהמדד, יציבים ומחלקים דיבידנדים.
נדל"ן ובינוי - חברות נדל"ן מניב וחברות בנייה למגורים.
טכנולוגיה וסייבר - ייצוג גדל והולך, כולל חברות ישראליות שנסחרות גם בנאסד"ק.

מסלול מור הלכה משלב בין השוק הגלובלי לשוק הישראלי.</p>
  </div>

  <div class="section">
    <h2>ריסק מול ריסק: איך מתאימים מסלול לגיל הילד?</h2>
    <p>הכלל פשוט: זמן = ביטחון

לילדים צעירים (לידה עד גיל 12-13): כשלילד יש עוד שנים ארוכות עד גיל 18-21, יש לו "אופק השקעה" רחב. גם אם השוק ירד מחר - יש לו מספיק שנים להתאושש ולחזור לצמוח. מסלול מניות = מטרה למקסם את התשואה לטווח הארוך.

לבני נוער (קרובים לגיל 18): אם נותרו רק 3-4 שנים עד שהילד יחפוץ למשוך את הכסף - חשיפה מלאה למניות עלולה להיות מסוכנת מדי.

השורה התחתונה: לילדים קטנים - תנו לכסף לעבוד קשה. לילדים גדולים - התחילו לשמור על הקיים.</p>
  </div>

  <div class="page-footer">
    <span>matzavtzvira.co.il</span>
    <span>עמוד 5 מתוך 6</span>
  </div>
</div>

<!-- ========== PAGE 6: המסלולים המומלצים + איך בודקות ========== -->
<div class="page">
  <div class="page-header">
    <span class="page-header-brand">מצב צבירה | רבקי וייס</span>
    <span class="page-header-sub">חיסכון לכל ילד - המדריך המלא</span>
  </div>

  <div class="section">
    <h2>המסלולים המומלצים - השוואה מהירה</h2>
    <p>שלוש אפשרויות מצוינות למסלולי הלכה:</p>
    <table class="comparison-table" style="margin-top:10px;">
      <thead>
        <tr>
          <th>מסלול</th>
          <th>מה הוא עוקב</th>
          <th>כשרות</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>מיטב הלכה</td>
          <td>S&amp;P 500 - 500 החברות הגדולות בארה"ב</td>
          <td>העדה החרדית, גלאט הון, הרב דביר</td>
        </tr>
        <tr>
          <td>אינפיניטי הלכה</td>
          <td>MSCI World - אלפי חברות מ-47 מדינות</td>
          <td>תשואה כהלכה, גלאט הון</td>
        </tr>
        <tr>
          <td>מור הלכה</td>
          <td>גלובלי + ת"א 125 - שילוב מדד עולמי וישראלי</td>
          <td>הרב דביר</td>
        </tr>
      </tbody>
    </table>
    <p style="margin-top:10px; font-size:10.5px; color:#888;">כל האמור הוא למטרת העשרה בלבד ואינו מהווה ייעוץ פיננסי. תוצאות משתנות ואין ערובה לתשואה.</p>
  </div>

  <div class="section">
    <h2>איך בודקות היכן הכסף עכשיו?</h2>
    <p>שלב 1 - נכנסות לאזור האישי בביטוח לאומי
שלב 2 - לוחצות על "מידע אישי על פרטי חיסכון הילד"
שלב 3 - מזינות פרטי מקבלת קצבת הילדים (האמא)
שלב 4 - מזדהות דרך כרטיס אשראי (לא גובים כלום - זה לאימות בלבד) או דרך אימייל
שלב 5 - מקבלות קוד אישי למייל - מזינות אותו
שלב 6 - רואות את כל הפרטים של הילדים שלכן

שימו לב: יופיעו רק מיקום ההפקדה הנוכחי וגובהה - ללא הרווחים.</p>
  </div>

  <div class="section">
    <h2>הצעד הבא - ניוד</h2>
    <p>בדקתן את המסלול הנוכחי - ורוצות לשנות?

מדריך הניוד המלא - איך עוברות בין חברה לחברה ובין מסלול למסלול - מחכה לכן באתר.</p>
  </div>

  <div class="page-footer">
    <span>matzavtzvira.co.il</span>
    <span>עמוד 6 מתוך 6</span>
  </div>
</div>

<!-- ========== CTA PAGE ========== -->
<div class="cta-page">
  <div class="top-line"></div>
  <div class="cta-icon">👶</div>
  <h2>מוכנה לצעד הבא?<br><span>ניוד בקלות ובשקט</span></h2>
  <p>מדריך שלב-אחר-שלב לניוד חיסכון לכל ילד - מהגוף הנוכחי למסלול שעובד בשבילכן.</p>
  <a class="cta-btn" href="https://matzavtzvira.co.il/articles/savings-for-kids-niyud">
    למדריך הניוד המלא
  </a>
  <div class="cta-url">matzavtzvira.co.il</div>
  <div class="disclaimer-small">כל האמור הוא למטרת העשרה והדרכה בלבד, ואינו מהווה ייעוץ פיננסי, המלצה להשקעה או תחליף לייעוץ מקצועי. כל פעולה בשוק ההון הינה על אחריותך בלבד.</div>
</div>

</body>
</html>`;

const outputPath = join(__dirname, "..", "public", "guides", "savings-for-kids.pdf");

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
