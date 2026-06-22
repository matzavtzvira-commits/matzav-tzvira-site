import type { Metadata } from "next";

const SITE_URL = "https://matzavtzvira.co.il";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "מחשבון ריבית דריבית",
      description: "מחשבון ריבית דריבית חינמי - חשבי כמה הכסף שלך יגדל לאורך שנים, כולל דמי ניהול ודמי צבירה",
      url: `${SITE_URL}/calculators/compound-interest`,
      applicationCategory: "FinanceApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "ILS" },
      provider: { "@type": "Organization", name: "מצב צבירה", url: SITE_URL },
      inLanguage: "he",
      operatingSystem: "Web",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "מה זה ריבית דריבית?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ריבית דריבית זה כשהרווחים שלך מתחילים גם הם לעשות רווחים. לא רק הכסף המקורי - גם הריבית עצמה מרוויחה ריבית. כמו כדור שלג שמתגלגל: ככל שמתגלגל, כך הוא גדל מהר יותר.",
          },
        },
        {
          "@type": "Question",
          name: "כמה כסף אצבור עם ריבית דריבית?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "זה תלוי בסכום ההתחלתי, ההפקדה החודשית, שיעור התשואה השנתית ומספר השנים. לדוגמה: 500 ₪ בחודש עם תשואה שנתית של 10% לאורך 30 שנה יצמחו למעל מיליון שקלים. השתמשי במחשבון החינמי שלנו לחישוב מדויק עם הנתונים שלך.",
          },
        },
        {
          "@type": "Question",
          name: "מה ההשפעה של דמי הניהול על ריבית דריבית?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "דמי ניהול של 1% נשמעים זניחים, אבל לאורך 30 שנה הם יכולים לגרום להפסד של עשרות עד מאות אלפי שקלים בגלל אפקט ריבית הדריבית. בדיוק בגלל זה חשוב להוריד דמי ניהול בפנסיה ובקרן ההשתלמות.",
          },
        },
        {
          "@type": "Question",
          name: "מה התשואה הממוצעת בשוק המניות?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "התשואה הממוצעת ההיסטורית של שוק המניות הגלובלי עומדת על כ-10% בשנה לפני אינפלציה. זה ממוצע לאורך עשרות שנים - בשנים ספציפיות יכולות להיות עליות וירידות משמעותיות.",
          },
        },
        {
          "@type": "Question",
          name: "מתי הכי כדאי להתחיל לחסוך?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ככל שמתחילים מוקדם יותר, כך ריבית הדריבית עובדת יותר זמן לטובתך. 200 ₪ בחודש מגיל 25 שווים הרבה יותר מ-500 ₪ בחודש מגיל 45, בגלל הזמן שנוסף לצמיחה.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "דף הבית", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "מחשבונים", item: `${SITE_URL}/calculators` },
        { "@type": "ListItem", position: 3, name: "מחשבון ריבית דריבית", item: `${SITE_URL}/calculators/compound-interest` },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "מחשבון ריבית דריבית חינמי | מצב צבירה",
  description:
    "מחשבון ריבית דריבית חינמי בעברית. חשבי כמה הכסף שלך יגדל לאורך שנים - כולל הנזק האמיתי של דמי הניהול. פשוט, מדויק, בלי נוסחאות.",
  keywords: [
    "מחשבון ריבית דריבית",
    "ריבית דריבית",
    "חישוב ריבית דריבית",
    "מחשבון השקעות",
    "אפקט ריבית דריבית",
    "דמי ניהול פנסיה",
    "חסכון לטווח ארוך",
    "מחשבון חיסכון",
    "ריבית דריבית מחשבון",
  ],
  alternates: {
    canonical: `${SITE_URL}/calculators/compound-interest`,
  },
  openGraph: {
    title: "מחשבון ריבית דריבית חינמי | מצב צבירה",
    description:
      "חשבי כמה הכסף שלך יגדל לאורך שנים - כולל הנזק האמיתי של דמי הניהול",
    url: `${SITE_URL}/calculators/compound-interest`,
    siteName: "מצב צבירה",
    locale: "he_IL",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/infographic-compound.png`,
        width: 1200,
        height: 630,
        alt: "מחשבון ריבית דריבית - מצב צבירה",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "מחשבון ריבית דריבית חינמי | מצב צבירה",
    description:
      "חשבי כמה הכסף שלך יגדל לאורך שנים - כולל הנזק האמיתי של דמי הניהול",
    images: [`${SITE_URL}/infographic-compound.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function CompoundInterestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
