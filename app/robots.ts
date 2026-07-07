import type { MetadataRoute } from "next";
import { SITE_URL, AI_CRAWLERS } from "@/lib/seo-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/admin/*",
          "/api/",
          "/api/*",
          "/_next/",
          "/*.json$",
        ],
      },
      // Explicitly welcome known AI / LLM / answer-engine crawlers so the
      // brand can be discovered and cited by generative search products.
      ...AI_CRAWLERS.map((agent) => ({
        userAgent: agent,
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/", "/api/*"],
      })),
      // Explicitly block scraping bots with no SEO/AEO/GEO value.
      {
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot", "DotBot"],
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}