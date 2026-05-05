import type { MetadataRoute } from "next";

const SITE_URL = "https://www.matzav-tzvira.co.il"; // עדכני לדומיין האמיתי

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL,                                                   lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/course`,                                       lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/calculators`,                                  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.85 },
    { url: `${SITE_URL}/calculators/compound-interest`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/articles`,                                     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.75 },
  ];
}
