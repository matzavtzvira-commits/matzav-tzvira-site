import type { Metadata } from "next";

// דפי /guides הם דפי נחיתה ללכידת לידים (טופס + מייל) - מיועדים לתנועה מהמיילים והווטסאפ,
// לא לחיפוש אורגני. noindex מונע מגוגל לאנדק תוכן דל שמתחרה במאמרים האמיתיים תחת /articles.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
