// ── האקדמיה של מצבית — נתוני הרמות והסרטונים ──
// עמודים מוסתרים: לא בתפריט, לא בגוגל, מגיעים רק דרך הלינק של הבוט.
// הסרטונים מתארחים על הדומיין של האתר עצמו (public/academy/videos) כדי שייטענו
// גם מאחורי סינון כשר (נטפרי/רימון) - אותו דומיין של הדף = לא נחסם.
//
// ▸ נותר למילוי על ידי רבקי:
//   WHATSAPP_GROUP_URL - לינק קבוצת הצפייה (chat.whatsapp.com/...)

// לינק קבוע לקבוצה. מפנה דרך /join אל הקבוצה הפעילה, כדי שכשקבוצה מתמלאת
// (מקס' 1,024) פשוט מחליפים יעד במקום אחד (משתנה WHATSAPP_GROUP_URL ב-Vercel)
// והדפים לא משתנים. ראה app/join/route.ts.
export const WHATSAPP_GROUP_URL = "/join";

// "שמרי אותי ותראי אותי בסטטוס" — פותח צ'אט עם רבקי (המספר הקיים באתר).
export const WHATSAPP_STATUS_URL =
  "https://wa.me/972527065653?text=" +
  encodeURIComponent("היי רבקי! צפיתי באקדמיה ואשמח לראות אותך גם בסטטוס");

export type AcademyVideo = {
  slug: string;
  title: string;
  blurb: string;
  poster: string;
  src: string; // קובץ mp4 על הדומיין שלנו. ריק = מוצג "בקרוב"
  isBridge?: boolean;
};

export type AcademyLevel = {
  num: 1 | 2 | 3;
  slug: string; // level-1 | level-2 | level-3
  eyebrow: string;
  title: string;
  tagline: string;
  intro: string;
  accent: string; // צבע הדגשה לרמה
  next?: { slug: string; label: string };
  videos: AcademyVideo[];
};

export const LEVELS: AcademyLevel[] = [
  {
    num: 1,
    slug: "level-1",
    eyebrow: "מסלול מתחילות · רמה 1",
    title: "מתחילות מאפס",
    tagline: "בלי נוסחאות. בלי חליפות. עם נעלי בית.",
    intro:
      "שש דקות קטנות שמפרקות את שוק ההון למילים שאת כבר מכירה. בלי מושגים גבוהים, בגובה העיניים. בסוף הרמה הזאת כבר לא תרגישי שזה סינית.",
    accent: "#21F0B0",
    next: { slug: "level-2", label: "מסלול המתקדמות" },
    videos: [
      {
        slug: "already-invested",
        title: "את כבר מושקעת",
        blurb: "עוד לפני שהשקעת שקל, את כבר בפנים. בואי נגלה איפה.",
        poster: "/academy/posters/already-invested-v2.jpg",
        src: "/academy/videos/already-invested-v2.mp4",
      },
      {
        slug: "what-is-stock",
        title: "מה זה מניה",
        blurb: "בלי מילים גבוהות: מה בעצם קונים כשקונים מניה.",
        poster: "/academy/posters/what-is-stock.jpg",
        src: "/academy/videos/what-is-stock.mp4",
      },
      {
        slug: "what-is-index",
        title: "מה זה מדד",
        blurb: "למה כולם מדברים על S&P 500, ומה זה אומר עלייך.",
        poster: "/academy/posters/what-is-index.jpg",
        src: "/academy/videos/what-is-index.mp4",
      },
      {
        slug: "etf",
        title: "קרן סל",
        blurb: "הדרך הכי פשוטה להחזיק המון חברות בבת אחת.",
        poster: "/academy/posters/etf.jpg",
        src: "/academy/videos/etf.mp4",
      },
      {
        slug: "compound-interest",
        title: "ריבית דריבית",
        blurb: "הכוח השקט שגורם לכסף לגדל את עצמו.",
        poster: "/academy/posters/compound-interest.jpg",
        src: "/academy/videos/compound-interest.mp4",
      },
      {
        slug: "investing-vs-gambling",
        title: "השקעה מול הימור",
        blurb: "לא, זה לא קזינו. ההבדל שמשנה הכל.",
        poster: "/academy/posters/investing-vs-gambling.jpg",
        src: "/academy/videos/investing-vs-gambling.mp4",
      },
    ],
  },
  {
    num: 2,
    slug: "level-2",
    eyebrow: "מסלול מתקדמות · רמה 2",
    title: "הכסף שכבר יש לך",
    tagline: "פנסיה, השתלמות, גמל, חיסכון לכל ילד — הכל כבר שלך.",
    intro:
      "את חושבת שאין לך קשר לשוק ההון? יש לך, ועוד איך. ברמה הזאת נעשה סדר בכסף שכבר נצבר לך בכל האפיקים, ונבין איפה הוא עובד בשבילך ואיפה הוא נשחק בשקט.",
    accent: "#124AF0",
    next: { slug: "level-3", label: "מסלול האלופות" },
    videos: [
      {
        slug: "l2-bridge",
        title: "איפה שוק ההון פוגש אותך",
        blurb: "את חושבת שאין לך קשר לשוק ההון? יש לך, ועוד איך.",
        poster: "/academy/posters/l2-bridge.jpg",
        src: "/academy/videos/l2-bridge.mp4",
        isBridge: true,
      },
      {
        slug: "l2-pension",
        title: "הפנסיה שלך",
        blurb: "הכסף הכי גדול שיש לך, וכמעט לא הסתכלת עליו.",
        poster: "/academy/posters/l2-pension.jpg",
        src: "/academy/videos/l2-pension.mp4",
      },
      {
        slug: "l2-hishtalmut",
        title: "קרן השתלמות",
        blurb: "ההטבה שאסור לך לפספס, בשפה פשוטה.",
        poster: "/academy/posters/l2-hishtalmut.jpg",
        src: "/academy/videos/l2-hishtalmut.mp4",
      },
      {
        slug: "l2-gemel",
        title: "קופת גמל",
        blurb: "איפה זה יושב, ולמה זה חשוב דווקא לך.",
        poster: "/academy/posters/l2-gemel.jpg",
        src: "/academy/videos/l2-gemel.mp4",
      },
      {
        slug: "l2-kids",
        title: "חיסכון לכל ילד",
        blurb: "הכסף שנצבר לילדים שלך, ומה כדאי לדעת עליו.",
        poster: "/academy/posters/l2-kids.jpg",
        src: "/academy/videos/l2-kids.mp4",
      },
      {
        slug: "l2-fees",
        title: "דמי ניהול",
        blurb: "כמה עולה לך השקט הזה, בלי שבכלל ראית.",
        poster: "/academy/posters/l2-fees.jpg",
        src: "/academy/videos/l2-fees.mp4",
      },
    ],
  },
  {
    num: 3,
    slug: "level-3",
    eyebrow: "מסלול אלופות · רמה 3",
    title: "קחי את ההגה",
    tagline: "עד עכשיו למדת. עכשיו הזמן להוביל.",
    intro:
      "למדת את היסודות, עשית סדר בכסף שלך, ועכשיו את מוכנה לצעד הבא. ברמה הזאת נדבר על חשבון מסחר עצמאי, על איך פותחים אותו בפועל, ואיך נשארות רגועות גם כשהמסך אדום.",
    accent: "#FA5C5C",
    videos: [
      {
        slug: "l3-bridge",
        title: "קחי את ההגה",
        blurb: "עד עכשיו למדת. עכשיו הזמן להיכנס לנעליים ולהוביל.",
        poster: "/academy/posters/l3-bridge.jpg",
        src: "/academy/videos/l3-bridge.mp4",
        isBridge: true,
      },
      {
        slug: "l3-trading",
        title: "חשבון מסחר עצמאי",
        blurb: "מה זה, למי זה מתאים, ולמה זה פחות מפחיד ממה שנדמה.",
        poster: "/academy/posters/l3-trading.jpg",
        src: "/academy/videos/l3-trading.mp4",
      },
      {
        slug: "l3-open",
        title: "איך פותחים חשבון",
        blurb: "צעד אחרי צעד, יותר קל מלהזמין תור לרופא שיניים.",
        poster: "/academy/posters/l3-open.jpg",
        src: "/academy/videos/l3-open.mp4",
      },
      {
        slug: "l3-diversify",
        title: "פיזור בין מדדים",
        blurb: "לא לשים את הכל בסל אחד, בגובה העיניים.",
        poster: "/academy/posters/l3-diversify.jpg",
        src: "/academy/videos/l3-diversify.mp4",
      },
      {
        slug: "l3-dca",
        title: "הוראת קבע (DCA)",
        blurb: "הטייס האוטומטי שעובד בשבילך בזמן שאת חיה את החיים.",
        poster: "/academy/posters/l3-dca.jpg",
        src: "/academy/videos/l3-dca.mp4",
      },
      {
        slug: "l3-psych",
        title: "פסיכולוגיה: לא לברוח",
        blurb: "מה עושים כשהכל אדום, ואיך לא בורחים ברגע הלא נכון.",
        poster: "/academy/posters/l3-psych.jpg",
        src: "/academy/videos/l3-psych.mp4",
      },
    ],
  },
];

export function getLevel(slug: string): AcademyLevel | undefined {
  return LEVELS.find((l) => l.slug === slug);
}
