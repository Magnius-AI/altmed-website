import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCanonicalHost, isLocalHost } from "@/lib/site-url";

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

export function middleware(request: NextRequest) {
  const host = request.nextUrl.host.toLowerCase();
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProto || request.nextUrl.protocol.replace(":", "");
  const canonicalHost = getCanonicalHost(host);
  const shouldCanonicalizeHost = host !== canonicalHost;
  const shouldCanonicalizeProtocol = protocol !== "https" && !isLocalHost(host);

  if (shouldCanonicalizeHost || shouldCanonicalizeProtocol) {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.host = canonicalHost;
    canonicalUrl.protocol = isLocalHost(host) ? request.nextUrl.protocol : "https";
    return NextResponse.redirect(canonicalUrl, 301);
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
