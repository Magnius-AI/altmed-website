"use server";

import { revalidatePath } from "next/cache";
import { adminJsonRequest } from "@/lib/admin-api";

function buildAnnouncementPayload(formData: FormData) {
  const endDate = String(formData.get("endDate") ?? "").trim();

  return {
    title: String(formData.get("title") ?? "").trim(),
    body: String(formData.get("body") ?? "").trim(),
    type: String(formData.get("type") ?? "General").trim(),
    priority: String(formData.get("priority") ?? "Normal").trim(),
    startDate: new Date(String(formData.get("startDate") ?? new Date().toISOString())).toISOString(),
    endDate: endDate ? new Date(endDate).toISOString() : undefined,
    showOnHomepageBanner: formData.get("showOnHomepageBanner") === "on",
    pinned: formData.get("pinned") === "on",
    isActive: formData.get("isActive") === "on"
  };
}

export async function createAnnouncementAction(formData: FormData) {
  await adminJsonRequest("/api/announcements", "POST", buildAnnouncementPayload(formData));
  revalidatePath("/admin/announcements");
  revalidatePath("/updates");
}

export async function updateAnnouncementAction(id: string, formData: FormData) {
  await adminJsonRequest(`/api/announcements/${id}`, "PATCH", buildAnnouncementPayload(formData));
  revalidatePath("/admin/announcements");
  revalidatePath("/updates");
}

export async function deleteAnnouncementAction(id: string) {
  await adminJsonRequest(`/api/announcements/${id}`, "DELETE");
  revalidatePath("/admin/announcements");
  revalidatePath("/updates");
}
