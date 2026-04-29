import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "הכסף ישתדל, ואת תנוחי | מצב צבירה",
  description: "התוכנית הקצרה והבטוחה שלך להפוך למשקיעה בשוק ההון בביטחון מלא. קצרה, ממוקדת, אישית — בשפה שרק אנחנו מבינות.",
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
        <link href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
