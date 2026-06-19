"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminJsonRequest } from "@/lib/admin-api";

function toBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

function toCents(value: FormDataEntryValue | null) {
  const amount = Number(String(value ?? "0").replace(/[^0-9.]/g, ""));
  return Math.round(amount * 100);
}

function toOptionalCents(value: FormDataEntryValue | null) {
  const raw = String(value ?? "").trim();
  return raw ? toCents(raw) : undefined;
}

function toOptionalNumber(value: FormDataEntryValue | null) {
  const raw = String(value ?? "").trim();
  return raw ? Number(raw) : undefined;
}

function toOptionalString(value: FormDataEntryValue | null) {
  return String(value ?? "").trim() || undefined;
}

function actionErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
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
  redirect("/admin/treatment-plans?saved=created");
}

export async function updateTreatmentPlanAction(id: string, formData: FormData) {
  await adminJsonRequest(`/api/treatment-plans/${id}`, "PATCH", buildPlanPayload(formData));
  revalidatePath("/admin/treatment-plans");
  revalidatePath("/plans");
  redirect("/admin/treatment-plans?saved=updated");
}

export async function deleteTreatmentPlanAction(id: string) {
  await adminJsonRequest(`/api/treatment-plans/${id}`, "DELETE");
  revalidatePath("/admin/treatment-plans");
  revalidatePath("/plans");
  redirect("/admin/treatment-plans?saved=deleted");
}

export async function createEnrollmentAction(formData: FormData) {
  await adminJsonRequest("/api/treatment-plans/admin/enrollments", "POST", {
    planId: String(formData.get("planId") ?? "").trim(),
    patientName: toOptionalString(formData.get("patientName")),
    patientEmail: String(formData.get("patientEmail") ?? "").trim(),
    patientPhone: toOptionalString(formData.get("patientPhone")),
    status: String(formData.get("status") ?? "active").trim(),
    amountPaidCents: toOptionalCents(formData.get("amountPaid")),
    paymentMethod: toOptionalString(formData.get("paymentMethod")),
    startsAt: toOptionalString(formData.get("startsAt")),
    endsAt: toOptionalString(formData.get("endsAt")),
    visitCount: toOptionalNumber(formData.get("visitCount")),
    lastVisitAt: toOptionalString(formData.get("lastVisitAt")),
    nextVisitAt: toOptionalString(formData.get("nextVisitAt")),
    notes: toOptionalString(formData.get("notes"))
  });
  revalidatePath("/admin/treatment-plans/enrollments");
  revalidatePath("/admin/treatment-plans/attendance");
  revalidatePath("/admin/treatment-plans/cash-inflow");
  revalidatePath("/admin/dashboard");
  redirect("/admin/treatment-plans/enrollments?saved=created");
}

export async function updateEnrollmentAction(id: string, formData: FormData) {
  await adminJsonRequest(`/api/treatment-plans/admin/enrollments/${id}`, "PATCH", {
    status: String(formData.get("status") ?? "").trim(),
    patientName: toOptionalString(formData.get("patientName")),
    patientPhone: toOptionalString(formData.get("patientPhone")),
    amountPaidCents: toOptionalCents(formData.get("amountPaid")),
    paymentMethod: toOptionalString(formData.get("paymentMethod")),
    startsAt: toOptionalString(formData.get("startsAt")),
    endsAt: toOptionalString(formData.get("endsAt")),
    visitCount: toOptionalNumber(formData.get("visitCount")),
    lastVisitAt: toOptionalString(formData.get("lastVisitAt")),
    nextVisitAt: toOptionalString(formData.get("nextVisitAt")),
    notes: toOptionalString(formData.get("notes"))
  });
  revalidatePath("/admin/treatment-plans/enrollments");
  revalidatePath("/admin/treatment-plans/attendance");
  revalidatePath("/admin/treatment-plans/cash-inflow");
  revalidatePath("/admin/dashboard");
}

export async function recordAttendanceAction(formData: FormData) {
  const enrollmentCode = String(formData.get("enrollmentCode") ?? "").trim().toUpperCase();
  const codeParam = encodeURIComponent(enrollmentCode);

  try {
    await adminJsonRequest("/api/treatment-plans/admin/attendance", "POST", {
      enrollmentCode,
      visitedAt: toOptionalString(formData.get("visitedAt")),
      staffName: toOptionalString(formData.get("staffName")),
      notes: toOptionalString(formData.get("notes"))
    });
  } catch (error) {
    const message = actionErrorMessage(error, "Could not record this visit");
    redirect(`/admin/treatment-plans/attendance?error=${encodeURIComponent(message)}&code=${codeParam}`);
  }

  revalidatePath("/admin/treatment-plans/attendance");
  revalidatePath("/admin/treatment-plans/enrollments");
  revalidatePath("/admin/dashboard");
  redirect(`/admin/treatment-plans/attendance?saved=attendance&code=${codeParam}`);
}

export async function updateStripeSettingsAction(formData: FormData) {
  await adminJsonRequest("/api/treatment-plans/admin/stripe-settings", "PATCH", {
    stripePublishableKey: String(formData.get("stripePublishableKey") ?? "").trim() || undefined,
    stripeSecretKey: String(formData.get("stripeSecretKey") ?? "").trim() || undefined,
    stripeWebhookSecret: String(formData.get("stripeWebhookSecret") ?? "").trim() || undefined,
    stripeWebhookEndpointUrl: String(formData.get("stripeWebhookEndpointUrl") ?? "").trim() || undefined,
    isLiveMode: toBoolean(formData.get("isLiveMode"))
  });
  revalidatePath("/admin/treatment-plans/payments");
  redirect("/admin/treatment-plans/payments?saved=settings");
}

export async function testStripeConnectionAction(formData: FormData) {
  await adminJsonRequest("/api/treatment-plans/admin/stripe-settings/test", "POST", {
    stripeSecretKey: String(formData.get("stripeSecretKey") ?? "").trim() || undefined
  });
  revalidatePath("/admin/treatment-plans/payments");
}
