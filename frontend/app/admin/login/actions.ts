"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL =
  process.env.API_URL_INTERNAL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3001";
const secureCookies = process.env.NODE_ENV === "production";

function buildLoginUrl(email: string, error: string) {
  const params = new URLSearchParams();
  if (email) {
    params.set("email", email);
  }
  params.set("error", error);
  return `/admin/login?${params.toString()}`;
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

export async function loginAdminAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect(buildLoginUrl(email, "missing"));
  }

  let response: Response;
  let payload:
    | {
        data?: {
          access_token?: string;
          refresh_token?: string;
        };
      }
    | undefined;

  try {
    response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store"
    });
    payload = (await response.json()) as {
      data?: {
        access_token?: string;
        refresh_token?: string;
      };
    };
  } catch {
    redirect(buildLoginUrl(email, "offline"));
  }

  if (!response.ok) {
    redirect(buildLoginUrl(email, "invalid"));
  }

  const tokenPayload = getTokenPayload(payload);
  const accessToken = tokenPayload?.access_token;
  const refreshToken = tokenPayload?.refresh_token;

  if (!accessToken || !refreshToken) {
    redirect(buildLoginUrl(email, "session"));
  }

  cookies().set("altmed_admin_access_token", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookies,
    maxAge: 15 * 60,
    path: "/"
  });
  cookies().set("altmed_admin_refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: secureCookies,
    maxAge: 30 * 24 * 60 * 60,
    path: "/"
  });

  redirect("/admin/dashboard");
}
