import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/admin/login", "/dashboard/", "/login", "/api/"]
    },
    sitemap: "https://stage.altmedfirst.com/sitemap.xml"
  };
}
