"use server";

import { revalidatePath } from "next/cache";
import { adminJsonRequest } from "@/lib/admin-api";

export async function updateNavigationMenuAction(formData: FormData) {
  const rawValue = String(formData.get("menu") ?? "[]");
  const parsed = JSON.parse(rawValue) as unknown[];

  await adminJsonRequest("/api/settings/navigation", "PATCH", {
    value: {
      mainMenu: parsed
    }
  });

  revalidatePath("/admin/menus");
  revalidatePath("/", "layout");
}
