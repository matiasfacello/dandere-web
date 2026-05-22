import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

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
