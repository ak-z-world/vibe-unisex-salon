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
          "/admin/*",
          "/api",
          "/api/*",
        ],
      },

      ...AI_CRAWLERS.map((agent) => ({
        userAgent: agent,
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api",
          "/api/*",
        ],
      })),

      {
        userAgent: [
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
          "DotBot",
        ],
        disallow: "/",
      },
    ],

    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}