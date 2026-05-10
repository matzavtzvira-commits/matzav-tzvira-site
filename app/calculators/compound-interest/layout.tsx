import type { Metadata } from "next";

const SITE_URL = "https://www.matzav-tzvira.co.il"; // עדכני לדומיין האמיתי שלך

export const metadata: Metadata = {
  title: "מחשבון ריבית דריבית חינמי - כולל דמי ניהול | מצב צבירה",
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
    "compound interest calculator",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "מחשבון ריבית דריבית חינמי | מצב צבירה",
    description:
      "חשבי כמה הכסף שלך יגדל לאורך שנים - כולל הנזק האמיתי של דמי הניהול",
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
  return <>{children}</>;
}
