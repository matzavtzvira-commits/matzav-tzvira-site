import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// עמודים מוסתרים: לא מקושרים משום מקום, לא נכנסים לגוגל.
export const metadata: Metadata = {
  title: "האקדמיה של מצבית | מצב צבירה",
  robots: { index: false, follow: false, nocache: true },
};

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
