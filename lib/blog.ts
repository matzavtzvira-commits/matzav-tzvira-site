import allPosts from "./blog-posts.generated.json";

export type BlogPost = {
  slug: string;
  title: string;
  subject: string;
  description: string;
  category: string;
  originalDate: string; // YYYY-MM-DD - the day the email went out
  publishDate: string; // YYYY-MM-DD - the day the post goes live on the site (Israel time)
  readMinutes: number;
  body: string;
};

const posts = allPosts as BlogPost[];

/** Today's date in Israel as YYYY-MM-DD. Posts release at midnight Israel time. */
export function todayInIsrael(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jerusalem", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

export function isPublished(post: BlogPost, today: string = todayInIsrael()): boolean {
  return post.publishDate <= today;
}

/** Published posts, newest first. */
export function getPublishedPosts(): BlogPost[] {
  const today = todayInIsrael();
  return posts
    .filter((p) => isPublished(p, today))
    .sort((a, b) => (a.publishDate === b.publishDate ? b.originalDate.localeCompare(a.originalDate) : b.publishDate.localeCompare(a.publishDate)));
}

export function getPublishedPost(slug: string): BlogPost | undefined {
  const post = posts.find((p) => p.slug === slug);
  return post && isPublished(post) ? post : undefined;
}

/** "2026-07-06" -> "6.7.2026" */
export function formatHebrewDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}.${m}.${y}`;
}

export const CATEGORY_COLORS: Record<string, string> = {
  "הכסף שלך": "#124AF0",
  "חלון לעולם": "#C8973A",
};
