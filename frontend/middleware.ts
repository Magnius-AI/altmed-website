import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCanonicalHost, isLocalHost, shouldNoIndexHost } from "@/lib/site-url";

const NOINDEX_HEADER = "noindex, nofollow, noarchive";
const HEALTH_CHECK_PATH = "/healthz";

function getJwtExpiry(token: string) {
  try {
    const [, payload] = token.split(".");
    if (!payload) {
      return null;
    }

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    const decoded = JSON.parse(atob(padded)) as { exp?: number };

    return decoded.exp ?? null;
  } catch {
    return null;
  }
}

function getCloudflareVisitorScheme(request: NextRequest) {
  const value = request.headers.get("cf-visitor");

  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as { scheme?: string };
    return parsed.scheme ?? null;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const host =
    (request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
      request.headers.get("host")?.split(",")[0]?.trim() ||
      request.nextUrl.host).toLowerCase();
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = getCloudflareVisitorScheme(request) || forwardedProto || request.nextUrl.protocol.replace(":", "");
  const canonicalHost = getCanonicalHost(host);
  const shouldNoIndex = shouldNoIndexHost(host);
  const shouldCanonicalizeHost = host !== canonicalHost;
  const shouldCanonicalizeProtocol = protocol !== "https" && !isLocalHost(host);

  if (request.nextUrl.pathname === HEALTH_CHECK_PATH) {
    return NextResponse.next();
  }

  if (shouldNoIndex && request.nextUrl.pathname === "/sitemap.xml") {
    return new NextResponse("Not found", {
      status: 404,
      headers: {
        "X-Robots-Tag": NOINDEX_HEADER
      }
    });
  }

  if (shouldCanonicalizeHost || shouldCanonicalizeProtocol) {
    const canonicalUrl = request.nextUrl.clone();
    const [hostname, port] = canonicalHost.split(":");
    canonicalUrl.hostname = hostname;
    canonicalUrl.port = port ?? "";
    canonicalUrl.protocol = isLocalHost(host) ? request.nextUrl.protocol : "https";
    const response = NextResponse.redirect(canonicalUrl, 301);
    if (shouldNoIndex) {
      response.headers.set("X-Robots-Tag", NOINDEX_HEADER);
    }
    return response;
  }

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    request.nextUrl.pathname !== "/admin/login"
  ) {
    const accessToken = request.cookies.get("altmed_admin_access_token")?.value;
    const refreshToken = request.cookies.get("altmed_admin_refresh_token")?.value;

    if (!accessToken && refreshToken) {
      const refreshUrl = new URL("/api/admin/refresh", request.url);
      refreshUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(refreshUrl);
    }

    if (!accessToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const expiry = getJwtExpiry(accessToken);
    if (expiry && expiry * 1000 <= Date.now() && refreshToken) {
      const refreshUrl = new URL("/api/admin/refresh", request.url);
      refreshUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(refreshUrl);
    }
  }

  const response = NextResponse.next();
  if (shouldNoIndex) {
    response.headers.set("X-Robots-Tag", NOINDEX_HEADER);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
