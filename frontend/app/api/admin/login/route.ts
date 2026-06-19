import { NextRequest, NextResponse } from "next/server";
import { getServerApiUrl } from "@/lib/server-api-url";

const API_URL = getServerApiUrl();
const secureCookies = process.env.NODE_ENV === "production";

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

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      cache: "no-store"
    });

    const payload = await response.json();

    if (!response.ok) {
      return NextResponse.json(payload, { status: response.status });
    }

    const tokenPayload = getTokenPayload(payload);
    const accessToken = tokenPayload?.access_token;
    const refreshToken = tokenPayload?.refresh_token;
    const appResponse = NextResponse.json(payload, { status: response.status });

    if (accessToken) {
      appResponse.cookies.set("altmed_admin_access_token", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: secureCookies,
        maxAge: 15 * 60,
        path: "/"
      });
    }

    if (refreshToken) {
      appResponse.cookies.set("altmed_admin_refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: secureCookies,
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
      });
    }

    return appResponse;
  } catch {
    return NextResponse.json(
      {
        message: "The admin API is unavailable right now."
      },
      { status: 503 }
    );
  }
}
