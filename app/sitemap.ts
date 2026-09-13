import type { MetadataRoute } from "next";
import { portfolioConfig } from "@/config/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = portfolioConfig.siteUrl;

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-03-01"),
      images: [`${baseUrl}/opengraph-image`],
    },
  ];
}

