import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "הרצאות וסדנאות על שוק ההון | רבקי וייס - מצב צבירה",
  description: "הרצאות וסדנאות פיננסיות לקהילות ולארגונים - בשפה פשוטה ובגובה העיניים. רבקי וייס מגיעה אליכן ומסבירה את שוק ההון בלי פחד ובלי ז'רגון.",
  alternates: { canonical: "https://matzavtzvira.co.il/workshop" },
  openGraph: {
    title: "הרצאות וסדנאות על שוק ההון | רבקי וייס",
    description: "הרצאות וסדנאות פיננסיות לקהילות ולארגונים - בשפה פשוטה ובגובה העיניים.",
    url: "https://matzavtzvira.co.il/workshop",
    siteName: "מצב צבירה",
    locale: "he_IL",
    type: "website",
  },
};

export default function WorkshopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
