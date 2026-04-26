import { NextRequest, NextResponse } from "next/server";

const API_URL =
  process.env.API_URL_INTERNAL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3001";
const secureCookies = process.env.NODE_ENV === "production";

function clearAuthCookies(response: NextResponse) {
  response.cookies.set("altmed_admin_access_token", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookies,
    maxAge: 0,
    path: "/"
  });
  response.cookies.set("altmed_admin_refresh_token", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookies,
    maxAge: 0,
    path: "/"
  });
}

function getTokenPayload(payload: unknown) {
  const responsePayload = payload as
    | {
        data?: {
          access_token?: string;
          refresh_token?: string;
        };
        access_token?: string;
        refresh_token?: string;
      }
    | undefined;

  return responsePayload?.data ?? responsePayload;
}

async function refreshSession(request: NextRequest) {
  const refreshToken = request.cookies.get("altmed_admin_refresh_token")?.value;
  const redirectPath = request.nextUrl.searchParams.get("redirect") ?? "/admin/dashboard";

  if (!refreshToken) {
    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    clearAuthCookies(response);
    return response;
  }

  try {
    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store"
    });

    const payload = await response.json();

    if (!response.ok) {
      const loginResponse = NextResponse.redirect(new URL("/admin/login", request.url));
      clearAuthCookies(loginResponse);
      return loginResponse;
    }

    const appResponse = NextResponse.redirect(new URL(redirectPath, request.url));
    const tokenPayload = getTokenPayload(payload);
    const accessToken = tokenPayload?.access_token;
    const rotatedRefreshToken = tokenPayload?.refresh_token;

    if (accessToken) {
      appResponse.cookies.set("altmed_admin_access_token", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: secureCookies,
        maxAge: 15 * 60,
        path: "/"
      });
    }

    if (rotatedRefreshToken) {
      appResponse.cookies.set("altmed_admin_refresh_token", rotatedRefreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: secureCookies,
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
      });
    }

    return appResponse;
  } catch {
    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    clearAuthCookies(response);
    return response;
  }
}

export async function GET(request: NextRequest) {
  return refreshSession(request);
}

export async function POST(request: NextRequest) {
  return refreshSession(request);
}
