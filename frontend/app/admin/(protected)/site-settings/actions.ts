"use server";

import { revalidatePath } from "next/cache";
import { adminJsonRequest } from "@/lib/admin-api";

export async function updateSiteSettingAction(key: string, formData: FormData) {
  const rawValue = String(formData.get("value") ?? "{}").trim();
  const parsed = JSON.parse(rawValue || "{}") as Record<string, unknown>;

  await adminJsonRequest(`/api/settings/${key}`, "PATCH", { value: parsed });

  revalidatePath("/admin/site-settings");
  revalidatePath("/admin/menus");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/faq");
}
