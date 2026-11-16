// Converts content/blog/*.md (frontmatter + markdown-lite body) into lib/blog-posts.generated.json.
// Runs automatically before `next build` (npm "prebuild"), and can be run by hand: node scripts/build-blog.mjs
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "content", "blog");
const OUT = join(ROOT, "lib", "blog-posts.generated.json");

const REQUIRED = ["slug", "title", "subject", "description", "category", "originalDate", "publishDate", "readMinutes"];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const files = readdirSync(SRC).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
const posts = [];
const errors = [];

for (const file of files) {
  const raw = readFileSync(join(SRC, file), "utf8").replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) { errors.push(`${file}: missing frontmatter`); continue; }

  const meta = {};
  for (const line of m[1].split("\n")) {
    if (!line.trim()) continue;
    const i = line.indexOf(":");
    if (i === -1) { errors.push(`${file}: bad frontmatter line "${line}"`); continue; }
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }

  for (const k of REQUIRED) if (!meta[k]) errors.push(`${file}: missing "${k}"`);
  for (const k of ["originalDate", "publishDate"]) if (meta[k] && !DATE_RE.test(meta[k])) errors.push(`${file}: ${k} must be YYYY-MM-DD`);
  if (meta.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(meta.slug)) errors.push(`${file}: slug must be kebab-case`);

  const body = m[2].trim();
  if (/[—–]/.test(raw)) errors.push(`${file}: contains an em/en dash`);
  if (/\[(באנר|GIF|תמונה|קישור)/.test(body)) errors.push(`${file}: leftover email placeholder`);

  posts.push({
    slug: meta.slug,
    title: meta.title,
    subject: meta.subject,
    description: meta.description,
    category: meta.category,
    originalDate: meta.originalDate,
    publishDate: meta.publishDate,
    readMinutes: Number(meta.readMinutes) || 3,
    body,
  });
}

const seen = new Set();
for (const p of posts) {
  if (seen.has(p.slug)) errors.push(`duplicate slug: ${p.slug}`);
  seen.add(p.slug);
}

if (errors.length) {
  console.error("Blog build failed:\n" + errors.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}

posts.sort((a, b) => (a.publishDate === b.publishDate ? a.originalDate.localeCompare(b.originalDate) : a.publishDate.localeCompare(b.publishDate)));
writeFileSync(OUT, JSON.stringify(posts, null, 2) + "\n", "utf8");
console.log(`Blog: ${posts.length} posts -> lib/blog-posts.generated.json`);
