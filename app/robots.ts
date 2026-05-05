import type { MetadataRoute } from "next";

const SITE_URL = "https://www.matzav-tzvira.co.il"; // עדכני לדומיין האמיתי

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
