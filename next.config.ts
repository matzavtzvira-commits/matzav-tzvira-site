import type { NextConfig } from "next";

const LOVABLE_BASE = "https://visual-vanguard-flow.lovable.app";

const lovablePaths = [
  "/compound-interest",
  "/pension",
  "/study-fund",
  "/teachers-fund",
  "/management-fees",
  "/budget",
  "/income",
  "/inflation",
  "/child-savings",
  "/dca",
  "/quiet-wealth-tax",
  "/accumulating-vs-distributing",
  "/calculator",
  "/course-dashboard",
  "/pension-dashboard",
  "/referral-dashboard",
  "/my-links",
];

const nextConfig: NextConfig = {
  async redirects() {
    return lovablePaths.map((path) => ({
      source: path,
      destination: `${LOVABLE_BASE}${path}`,
      permanent: false,
    }));
  },
  async headers() {
    const cacheImmutable = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ];
    return [
      { source: "/:path*.mp4",   headers: cacheImmutable },
      { source: "/:path*.png",   headers: cacheImmutable },
      { source: "/:path*.jpg",   headers: cacheImmutable },
      { source: "/:path*.svg",   headers: cacheImmutable },
      { source: "/:path*.webp",  headers: cacheImmutable },
      { source: "/:path*.woff2", headers: cacheImmutable },
      { source: "/:path*.ico",   headers: cacheImmutable },
    ];
  },
};

export default nextConfig;
