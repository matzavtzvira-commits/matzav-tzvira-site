import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "מצב צבירה | המטריה הפיננסית שלך",
  description: "הדרך הפשוטה והיעילה לבנות תיק השקעות שתפור עליך — בשפה שרק אנחנו מבינות.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@700;800;900&family=Rubik:wght@300;400;500;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full">
        <a href="#main-content" className="skip-link">דלג לתוכן הראשי</a>
        {children}
      </body>
    </html>
  );
}
