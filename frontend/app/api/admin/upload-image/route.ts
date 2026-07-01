import { NextRequest, NextResponse } from "next/server";
import { getServerApiUrl } from "@/lib/server-api-url";

const API_URL = getServerApiUrl();
const secureCookies = process.env.NODE_ENV === "production";

type TokenRefresh = {
  accessToken?: string;
  refreshToken?: string;
};

function formatError(value: unknown) {
  if (!value) {
    return "Image upload failed";
  }

  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    const record = value as { message?: unknown; error?: unknown };
    return formatError(record.message ?? record.error ?? JSON.stringify(value));
  }

  return String(value);
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

async function refreshAccessToken(refreshToken?: string): Promise<TokenRefresh | null> {
  if (!refreshToken) {
    return null;
  }

  const response = await fetch(`${API_URL}/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store"
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    return null;
  }

  const tokenPayload = getTokenPayload(payload);
  return {
    accessToken: tokenPayload?.access_token,
    refreshToken: tokenPayload?.refresh_token
  };
}

function applyRefreshedCookies(response: NextResponse, tokens: TokenRefresh | null) {
  if (tokens?.accessToken) {
    response.cookies.set("altmed_admin_access_token", tokens.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: secureCookies,
      maxAge: 15 * 60,
      path: "/"
    });
  }

  if (tokens?.refreshToken) {
    response.cookies.set("altmed_admin_refresh_token", tokens.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: secureCookies,
      maxAge: 30 * 24 * 60 * 60,
      path: "/"
    });
  }
}

async function uploadImage(file: File, accessToken: string) {
  const uploadFormData = new FormData();
  uploadFormData.append("file", file);

  return fetch(`${API_URL}/api/uploads/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: uploadFormData,
    cache: "no-store"
  });
}

export async function POST(request: NextRequest) {
  let accessToken = request.cookies.get("altmed_admin_access_token")?.value;
  const refreshToken = request.cookies.get("altmed_admin_refresh_token")?.value;
  let refreshedTokens: TokenRefresh | null = null;

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  if (!accessToken) {
    refreshedTokens = await refreshAccessToken(refreshToken);
    accessToken = refreshedTokens?.accessToken;
  }

  if (!accessToken) {
    return NextResponse.json({ message: "Admin session expired. Please log in again." }, { status: 401 });
  }

  let response = await uploadImage(file, accessToken);

  if (response.status === 401 && refreshToken) {
    refreshedTokens = await refreshAccessToken(refreshToken);
    if (refreshedTokens?.accessToken) {
      response = await uploadImage(file, refreshedTokens.accessToken);
    }
  }

  const payload = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    const errorResponse = NextResponse.json({ message: formatError(payload) }, { status: response.status });
    applyRefreshedCookies(errorResponse, refreshedTokens);
    return errorResponse;
  }

  const successResponse = NextResponse.json(payload);
  applyRefreshedCookies(successResponse, refreshedTokens);
  return successResponse;
}
