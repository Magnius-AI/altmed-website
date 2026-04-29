import "server-only";

import { cookies } from "next/headers";

const API_URL =
  process.env.BACKEND_URL_INTERNAL ??
  process.env.API_URL_INTERNAL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3001";

function formatErrorMessage(value: unknown): string {
  if (!value) {
    return "Request failed";
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(formatErrorMessage).join("; ");
  }

  if (typeof value === "object") {
    const record = value as { message?: unknown; error?: unknown; statusCode?: unknown };
    const details = record.message ?? record.error;
    if (details) {
      return formatErrorMessage(details);
    }
    return JSON.stringify(value);
  }

  return String(value);
}

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json().catch(() => null)) as { data?: T; message?: unknown; error?: unknown } | null;

  if (!response.ok) {
    throw new Error(formatErrorMessage(payload?.message ?? payload?.error ?? payload));
  }

  return payload?.data ?? (payload as T);
}

export async function adminRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const accessToken = cookies().get("altmed_admin_access_token")?.value;

  if (!accessToken) {
    throw new Error("Admin session expired");
  }

  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${accessToken}`);

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store"
  });

  return parseResponse<T>(response);
}

export async function adminJsonRequest<T>(
  path: string,
  method: string,
  body?: Record<string, unknown>
): Promise<T> {
  return adminRequest<T>(path, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });
}

export async function uploadAdminImage(file: File | null | undefined) {
  if (!file || file.size === 0) {
    return null;
  }

  const formData = new FormData();
  formData.append("file", file);

  return adminRequest<{ url: string; filename: string }>("/api/uploads/image", {
    method: "POST",
    body: formData
  });
}
