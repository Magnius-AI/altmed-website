import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getOriginFromHeaders, shouldNoIndexHost } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const headersList = headers();
  const host =
    headersList.get("x-forwarded-host")?.split(",")[0]?.trim() ??
    headersList.get("host")?.split(",")[0]?.trim();

  if (host && shouldNoIndexHost(host)) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/"
      }
    };
  }

  const origin = getOriginFromHeaders(headersList);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/login", "/login/", "/wp-admin/"]
    },
    sitemap: `${origin}/sitemap.xml`
  };
}
