import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מחשבונים פיננסיים חינמיים - ריבית דריבית ועוד | מצב צבירה",
  description: "מחשבון ריבית דריבית חינמי - גלי כמה הכסף שלך יצמח לאורך שנים. מחשבונים פיננסיים פשוטים לנשים שרוצות להבין את הכסף שלהן.",
  alternates: { canonical: "https://matzavtzvira.co.il/calculators" },
  openGraph: {
    title: "מחשבונים פיננסיים חינמיים - ריבית דריבית ועוד",
    description: "מחשבון ריבית דריבית חינמי - גלי כמה הכסף שלך יצמח לאורך שנים.",
    url: "https://matzavtzvira.co.il/calculators",
    siteName: "מצב צבירה",
    locale: "he_IL",
    type: "website",
  },
};

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
