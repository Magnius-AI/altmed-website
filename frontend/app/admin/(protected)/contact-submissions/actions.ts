"use server";

import { revalidatePath } from "next/cache";
import { adminJsonRequest } from "@/lib/admin-api";

export async function markContactSubmissionReviewedAction(id: string) {
  await adminJsonRequest(`/api/contact/${id}/reviewed`, "PATCH");
  revalidatePath("/admin/contact-submissions");
}

export async function deleteContactSubmissionAction(id: string) {
  await adminJsonRequest(`/api/contact/${id}`, "DELETE");
  revalidatePath("/admin/contact-submissions");
}
