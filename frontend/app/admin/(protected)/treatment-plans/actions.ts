"use server";

import { revalidatePath } from "next/cache";
import { adminJsonRequest } from "@/lib/admin-api";

function toBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

function toCents(value: FormDataEntryValue | null) {
  const amount = Number(String(value ?? "0").replace(/[^0-9.]/g, ""));
  return Math.round(amount * 100);
}

function checklistItems(formData: FormData) {
  return formData
    .getAll("checklist")
    .map((value) => String(value).trim())
    .filter(Boolean);
}

function buildPlanPayload(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim() || undefined,
    description: String(formData.get("description") ?? "").trim() || undefined,
    durationLabel: String(formData.get("durationLabel") ?? "").trim() || undefined,
    durationDays: Number(formData.get("durationDays") ?? 0) || undefined,
    priceCents: toCents(formData.get("price")),
    currency: String(formData.get("currency") ?? "usd").trim() || "usd",
    checklist: checklistItems(formData),
    isActive: toBoolean(formData.get("isActive"))
  };
}

export async function createTreatmentPlanAction(formData: FormData) {
  await adminJsonRequest("/api/treatment-plans", "POST", buildPlanPayload(formData));
  revalidatePath("/admin/treatment-plans");
  revalidatePath("/plans");
}

export async function updateTreatmentPlanAction(id: string, formData: FormData) {
  await adminJsonRequest(`/api/treatment-plans/${id}`, "PATCH", buildPlanPayload(formData));
  revalidatePath("/admin/treatment-plans");
  revalidatePath("/plans");
}

export async function deleteTreatmentPlanAction(id: string) {
  await adminJsonRequest(`/api/treatment-plans/${id}`, "DELETE");
  revalidatePath("/admin/treatment-plans");
  revalidatePath("/plans");
}

export async function updateEnrollmentAction(id: string, formData: FormData) {
  await adminJsonRequest(`/api/treatment-plans/admin/enrollments/${id}`, "PATCH", {
    status: String(formData.get("status") ?? "").trim(),
    notes: String(formData.get("notes") ?? "").trim() || undefined
  });
  revalidatePath("/admin/treatment-plans/enrollments");
  revalidatePath("/admin/dashboard");
}

export async function updateStripeSettingsAction(formData: FormData) {
  await adminJsonRequest("/api/treatment-plans/admin/stripe-settings", "PATCH", {
    stripePublishableKey: String(formData.get("stripePublishableKey") ?? "").trim() || undefined,
    stripeSecretKey: String(formData.get("stripeSecretKey") ?? "").trim() || undefined,
    stripeWebhookSecret: String(formData.get("stripeWebhookSecret") ?? "").trim() || undefined,
    isLiveMode: toBoolean(formData.get("isLiveMode"))
  });
  revalidatePath("/admin/treatment-plans/payments");
}

export async function testStripeConnectionAction(formData: FormData) {
  await adminJsonRequest("/api/treatment-plans/admin/stripe-settings/test", "POST", {
    stripeSecretKey: String(formData.get("stripeSecretKey") ?? "").trim() || undefined
  });
  revalidatePath("/admin/treatment-plans/payments");
}
