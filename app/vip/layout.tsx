import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ליווי VIP - תיק השקעות אישי עם רבקי וייס | מצב צבירה",
  description: "ליווי אישי לבניית תיק השקעות מותאם לך - פגישה אחד על אחד עם רבקי וייס, מתכננת פיננסית לנשים חרדיות. כולל תוכנית MUSTריות ופגישה אישית.",
  alternates: { canonical: "https://matzavtzvira.co.il/vip" },
  openGraph: {
    title: "ליווי VIP - תיק השקעות אישי עם רבקי וייס",
    description: "ליווי אישי לבניית תיק השקעות מותאם לך - פגישה אחד על אחד עם רבקי וייס, מתכננת פיננסית לנשים חרדיות.",
    url: "https://matzavtzvira.co.il/vip",
    siteName: "מצב צבירה",
    locale: "he_IL",
    type: "website",
  },
};

export default function VipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
