"use client";

const START = new Date("2026-05-17").getTime();

export function ViewCount({ base, inc }: { base: number; inc: number }) {
  const days = Math.max(0, Math.floor((Date.now() - START) / 86400000));
  return <>{(base + days * inc).toLocaleString("he-IL")}</>;
}
