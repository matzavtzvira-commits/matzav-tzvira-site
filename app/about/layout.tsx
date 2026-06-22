import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מי אני - רבקי וייס, מתכננת פיננסית | מצב צבירה",
  description: "רבקי וייס - מתכננת פיננסית לנשים חרדיות. עוזרת לנשים עסוקות ללמוד להשקיע בשוק ההון בשפה פשוטה, בלי פחד ובלי ז'רגון. הכירי אותי.",
  alternates: { canonical: "https://matzavtzvira.co.il/about" },
  openGraph: {
    title: "מי אני - רבקי וייס, מתכננת פיננסית",
    description: "רבקי וייס - מתכננת פיננסית לנשים חרדיות. עוזרת לנשים ללמוד להשקיע בשוק ההון בשפה פשוטה.",
    url: "https://matzavtzvira.co.il/about",
    siteName: "מצב צבירה",
    locale: "he_IL",
    type: "profile",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
