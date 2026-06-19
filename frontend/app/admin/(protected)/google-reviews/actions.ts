"use server";

import { revalidatePath } from "next/cache";
import { adminJsonRequest } from "@/lib/admin-api";

function buildReviewPayload(formData: FormData) {
  const reviewDate = String(formData.get("reviewDate") ?? "").trim();
  const rating = Number(formData.get("rating") ?? 5);

  return {
    reviewerName: String(formData.get("reviewerName") ?? "").trim(),
    rating,
    reviewText: String(formData.get("reviewText") ?? "").trim(),
    reviewDate: reviewDate ? new Date(reviewDate).toISOString() : undefined,
    sourceUrl: String(formData.get("sourceUrl") ?? "").trim() || undefined,
    displayOrder: Number(formData.get("displayOrder") ?? 0),
    isActive: formData.get("isActive") === "on"
  };
}

export async function createGoogleReviewAction(formData: FormData) {
  await adminJsonRequest("/api/google-reviews", "POST", buildReviewPayload(formData));
  revalidatePath("/admin/google-reviews");
  revalidatePath("/");
}

export async function updateGoogleReviewAction(id: string, formData: FormData) {
  await adminJsonRequest(`/api/google-reviews/${id}`, "PATCH", buildReviewPayload(formData));
  revalidatePath("/admin/google-reviews");
  revalidatePath("/");
}

export async function deleteGoogleReviewAction(id: string) {
  await adminJsonRequest(`/api/google-reviews/${id}`, "DELETE");
  revalidatePath("/admin/google-reviews");
  revalidatePath("/");
}
