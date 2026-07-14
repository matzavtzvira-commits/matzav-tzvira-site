import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LEVELS, getLevel } from "../videos";
import LevelView from "../LevelView";

export function generateStaticParams() {
  return LEVELS.map((l) => ({ level: l.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const { level } = await params;
  const lv = getLevel(level);
  return {
    title: lv ? `${lv.title} · האקדמיה של מצבית | מצב צבירה` : "האקדמיה של מצבית",
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const lv = getLevel(level);
  if (!lv) notFound();
  return <LevelView level={lv} />;
}
