import type { Metadata } from "next";

// Private page for program graduates (linked only from the Maastariot email).
export const metadata: Metadata = {
  title: "ליווי VIP למאסטריות | מצב צבירה",
  robots: { index: false, follow: false },
};

export default function MaastariotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
