"use server";

import { revalidatePath } from "next/cache";
import { adminJsonRequest, uploadAdminImage } from "@/lib/admin-api";

function parseSpecialties(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function buildProviderPayload(formData: FormData, currentPhoto?: string) {
  const uploaded = await uploadAdminImage(formData.get("imageFile") as File | null);

  return {
    name: String(formData.get("name") ?? "").trim(),
    credentials: String(formData.get("credentials") ?? "").trim() || undefined,
    title: String(formData.get("title") ?? "").trim() || undefined,
    bio: String(formData.get("bio") ?? "").trim() || undefined,
    photo: uploaded?.url ?? (String(formData.get("photo") ?? "").trim() || currentPhoto || undefined),
    specialties: parseSpecialties(formData.get("specialties")),
    personalNote: String(formData.get("personalNote") ?? "").trim() || undefined,
    displayOrder: Number(formData.get("displayOrder") ?? 0),
    isActive: formData.get("isActive") === "on"
  };
}

export async function createProviderAction(formData: FormData) {
  await adminJsonRequest(
    "/api/providers",
    "POST",
    await buildProviderPayload(formData)
  );
  revalidatePath("/admin/providers");
  revalidatePath("/");
  revalidatePath("/about");
}

export async function updateProviderAction(id: string, formData: FormData) {
  const currentPhoto = String(formData.get("existingPhoto") ?? "").trim() || undefined;
  await adminJsonRequest(
    `/api/providers/${id}`,
    "PATCH",
    await buildProviderPayload(formData, currentPhoto)
  );
  revalidatePath("/admin/providers");
  revalidatePath("/");
  revalidatePath("/about");
}

export async function deleteProviderAction(id: string) {
  await adminJsonRequest(`/api/providers/${id}`, "DELETE");
  revalidatePath("/admin/providers");
  revalidatePath("/");
  revalidatePath("/about");
}
