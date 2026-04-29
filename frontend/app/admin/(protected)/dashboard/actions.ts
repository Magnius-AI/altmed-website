"use server";

import { revalidatePath } from "next/cache";
import { adminJsonRequest } from "@/lib/admin-api";

function toBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

export async function updateTreatmentPlansVisibilityAction(formData: FormData) {
  await adminJsonRequest("/api/settings/features", "PATCH", {
    value: {
      treatmentPlansEnabled: toBoolean(formData.get("treatmentPlansEnabled"))
    }
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/site-settings");
  revalidatePath("/", "layout");
  revalidatePath("/plans");
}
