import type { MetadataRoute } from "next";
import { portfolioConfig } from "@/config/portfolio";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${portfolioConfig.personal.fullName} — Systems & Web Developer`,
    short_name: portfolioConfig.personal.fullName,
    description: `Systems, Web Architecture & Game Engineering Portfolio of ${portfolioConfig.personal.fullName}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}

