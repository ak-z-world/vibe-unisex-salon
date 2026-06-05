import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: "https://vibe-unisex-salon.vercel.app/sitemap.xml",

    host: "https://vibe-unisex-salon.vercel.app",
  };
}