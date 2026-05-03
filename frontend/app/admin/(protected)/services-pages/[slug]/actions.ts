"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminJsonRequest, uploadAdminImage } from "@/lib/admin-api";

export async function updateServicePageAction(slug: string, formData: FormData) {
  const uploaded = await uploadAdminImage(formData.get("imageFile") as File | null);
  const featuredImage =
    uploaded?.url ??
    (String(formData.get("featuredImage") ?? "").trim() ||
      String(formData.get("existingFeaturedImage") ?? "").trim() ||
      undefined);

  await adminJsonRequest(`/api/services-pages/${slug}`, "PATCH", {
    name: String(formData.get("name") ?? "").trim() || undefined,
    heroContent: String(formData.get("heroContent") ?? "").trim() || undefined,
    bodyContent: String(formData.get("bodyContent") ?? "").trim() || undefined,
    metaTitle: String(formData.get("metaTitle") ?? "").trim() || undefined,
    metaDescription: String(formData.get("metaDescription") ?? "").trim() || undefined,
    metaKeywords: String(formData.get("metaKeywords") ?? "").trim() || undefined,
    featuredImage,
    isActive: formData.get("isActive") === "on"
  });

  revalidatePath(`/admin/services-pages/${slug}`);
  revalidatePath("/admin/services-pages");
  revalidatePath(`/services/${slug}`);
  revalidatePath("/services");
  redirect(`/admin/services-pages?updated=${encodeURIComponent(slug)}`);
}
