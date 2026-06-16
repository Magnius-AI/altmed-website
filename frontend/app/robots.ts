import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getOriginFromHeaders } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const origin = getOriginFromHeaders(headers());

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/login", "/login/", "/wp-admin/"]
    },
    sitemap: `${origin}/sitemap.xml`
  };
}
