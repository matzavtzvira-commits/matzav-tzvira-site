import type { MetadataRoute } from "next";

const SITE_URL = "https://matzavtzvira.co.il";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL,                                                   lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/course`,                                       lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/calculators`,                                  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.85 },
    { url: `${SITE_URL}/calculators/compound-interest`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/articles`,                                     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.75 },
    { url: `${SITE_URL}/articles/har-hakessef`,                        lastModified: new Date("2026-05-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/articles/pension-management-fees`,             lastModified: new Date("2025-01-01"), changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/articles/savings-for-kids`,                    lastModified: new Date("2026-05-01"), changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/vip`,                                          lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/workshop`,                                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
