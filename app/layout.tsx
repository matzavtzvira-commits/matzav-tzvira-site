import type { Metadata } from "next";
import { Heebo, Rubik } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["700", "800", "900"],
  variable: "--font-heebo",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "מצב צבירה | המטריה הפיננסית שלך",
  description: "הדרך הפשוטה והיעילה לבנות תיק השקעות שתפור עליך - בשפה שרק אנחנו מבינות.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${rubik.variable}`}>
      <head>
        <link rel="preload" href="/hero-video.mp4" as="video" type="video/mp4" />
      </head>
      <body className="min-h-full">
        <a href="#main-content" className="skip-link">דלג לתוכן הראשי</a>
        {children}
      </body>
    </html>
  );
}
