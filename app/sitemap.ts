import type { MetadataRoute } from "next";
import { SALON_BRANCHES } from "@/lib/branches";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vibeunisexsalon.com";

  const branchUrls = SALON_BRANCHES.map((branch) => ({
    url: `${baseUrl}/branches/${branch.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/branches`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    ...branchUrls,
  ];
}