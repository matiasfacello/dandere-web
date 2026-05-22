import type { MetadataRoute } from "next";

const siteUrl = process.env.BETTER_AUTH_URL ?? "https://dandere.xyz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/dashboard",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
