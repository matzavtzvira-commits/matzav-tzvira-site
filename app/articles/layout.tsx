import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ספרייה פיננסית | מדריכים על פנסיה, חיסכון והשקעות | מצב צבירה",
  description: "מדריכים פיננסיים בעברית קלה - חיסכון לכל ילד, דמי ניהול בפנסיה, ניוד קרן השתלמות ופתיחת חשבון מסחר. קוראים בנעלי בית, עם קפה.",
};

const articlesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "ספרייה פיננסית - מצב צבירה",
  "description": "מדריכים פיננסיים בעברית קלה - חיסכון לכל ילד, דמי ניהול בפנסיה, ניוד קרן השתלמות ופתיחת חשבון מסחר.",
  "url": "https://matzavtzvira.co.il/articles",
  "publisher": {
    "@type": "Organization",
    "name": "מצב צבירה",
    "url": "https://matzavtzvira.co.il"
  },
  "inLanguage": "he"
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articlesSchema) }}
      />
      {children}
    </>
  );
}
