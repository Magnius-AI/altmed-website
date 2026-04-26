"use server";

import { revalidatePath } from "next/cache";
import { adminJsonRequest } from "@/lib/admin-api";

function buildFaqPayload(formData: FormData) {
  return {
    question: String(formData.get("question") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    displayOrder: Number(formData.get("displayOrder") ?? 0),
    isActive: formData.get("isActive") === "on"
  };
}

export async function createFaqAction(formData: FormData) {
  await adminJsonRequest("/api/faq", "POST", buildFaqPayload(formData));
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}

export async function updateFaqAction(id: string, formData: FormData) {
  await adminJsonRequest(`/api/faq/${id}`, "PATCH", buildFaqPayload(formData));
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}

export async function deleteFaqAction(id: string) {
  await adminJsonRequest(`/api/faq/${id}`, "DELETE");
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}
