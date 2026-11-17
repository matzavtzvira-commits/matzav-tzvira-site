import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מאמרים | פנסיה, חיסכון והשקעות בשפה שלנו | מצב צבירה",
  description: "המיילים שרבקי וייס שולחת פעמיים בשבוע: מושג אחד על הכסף שלך, וחלון קטן למה שקורה בעולם הכלכלי. בלי פחד, בגובה העיניים.",
  alternates: { canonical: "https://matzavtzvira.co.il/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
