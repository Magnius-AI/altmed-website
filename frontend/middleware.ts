import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
  matcher: ["/admin/:path*"]
};
