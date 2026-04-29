"use server";

import { redirect } from "next/navigation";

const API_URL =
  process.env.API_URL_INTERNAL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3001";

export async function enrollInPlanAction(slug: string, formData: FormData) {
  const response = await fetch(`${API_URL}/api/treatment-plans/checkout/${slug}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim()
    }),
    cache: "no-store"
  });

  const payload = (await response.json().catch(() => null)) as { data?: { url?: string }; url?: string } | null;
  const url = payload?.data?.url ?? payload?.url;

  if (!response.ok || !url) {
    const message = extractErrorMessage(payload) ?? "Checkout could not be opened. Please call the clinic.";
    redirect(`/plans/${slug}?error=${encodeURIComponent(message)}`);
  }

  redirect(url);
}

function extractErrorMessage(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const record = payload as { message?: unknown; error?: unknown };
  const value = record.message ?? record.error;
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string").join("; ");
  }

  return null;
}
