"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminJsonRequest, adminRequest } from "@/lib/admin-api";

type SiteSettingResponse = {
  key: string;
  value?: Record<string, unknown>;
} | null;

function textValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function toBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

function toNumber(value: FormDataEntryValue | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

async function getSettingValue(key: string) {
  const existing = await adminRequest<SiteSettingResponse>(`/api/settings/${key}`).catch(() => null);
  return existing?.value ?? {};
}

function revalidateSiteSettings() {
  revalidatePath("/admin/site-settings");
  revalidatePath("/admin/menus");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/faq");
  revalidatePath("/services");
}

export async function updateSiteSettingAction(key: string, formData: FormData) {
  const rawValue = String(formData.get("value") ?? "{}").trim();
  const parsed = JSON.parse(rawValue || "{}") as Record<string, unknown>;

  await adminJsonRequest(`/api/settings/${key}`, "PATCH", { value: parsed });

  revalidateSiteSettings();
}

export async function updateNapSettingsAction(formData: FormData) {
  const current = await getSettingValue("nap");

  await adminJsonRequest("/api/settings/nap", "PATCH", {
    value: {
      ...current,
      clinicName: textValue(formData, "clinicName"),
      address: textValue(formData, "address"),
      phone: textValue(formData, "phone"),
      email: textValue(formData, "email"),
      canonicalUrl: textValue(formData, "canonicalUrl")
    }
  });

  revalidateSiteSettings();
  redirect("/admin/site-settings?saved=clinic");
}

export async function updateHoursSettingsAction(formData: FormData) {
  const current = await getSettingValue("hours");
  const saturdayClosed = toBoolean(formData.get("saturdayClosed"));
  const sundayClosed = toBoolean(formData.get("sundayClosed"));

  await adminJsonRequest("/api/settings/hours", "PATCH", {
    value: {
      ...current,
      weekdays: {
        open: textValue(formData, "weekdaysOpen") || "09:00",
        close: textValue(formData, "weekdaysClose") || "17:00"
      },
      saturday: saturdayClosed
        ? { closed: true }
        : {
            closed: false,
            open: textValue(formData, "saturdayOpen") || "09:00",
            close: textValue(formData, "saturdayClose") || "13:00"
          },
      sunday: sundayClosed
        ? { closed: true }
        : {
            closed: false,
            open: textValue(formData, "sundayOpen") || "09:00",
            close: textValue(formData, "sundayClose") || "13:00"
          }
    }
  });

  revalidateSiteSettings();
  redirect("/admin/site-settings?saved=hours");
}

export async function updateSocialSettingsAction(formData: FormData) {
  const current = await getSettingValue("social");

  await adminJsonRequest("/api/settings/social", "PATCH", {
    value: {
      ...current,
      facebook: textValue(formData, "facebook"),
      instagram: textValue(formData, "instagram"),
      yelp: textValue(formData, "yelp")
    }
  });

  revalidateSiteSettings();
  redirect("/admin/site-settings?saved=social");
}

export async function updateSeoDefaultsAction(formData: FormData) {
  const current = await getSettingValue("seo_defaults");

  await adminJsonRequest("/api/settings/seo_defaults", "PATCH", {
    value: {
      ...current,
      titleSuffix: textValue(formData, "titleSuffix"),
      descriptionTemplate: textValue(formData, "descriptionTemplate"),
      ogImage: textValue(formData, "ogImage")
    }
  });

  revalidateSiteSettings();
  redirect("/admin/site-settings?saved=seo");
}

export async function updateFeatureSettingsAction(formData: FormData) {
  const current = await getSettingValue("features");

  await adminJsonRequest("/api/settings/features", "PATCH", {
    value: {
      ...current,
      treatmentPlansEnabled: toBoolean(formData.get("treatmentPlansEnabled"))
    }
  });

  revalidateSiteSettings();
  redirect("/admin/site-settings?saved=features");
}

export async function updateSmtpSettingsAction(formData: FormData) {
  const current = await getSettingValue("smtp");
  const password = textValue(formData, "password");

  await adminJsonRequest("/api/settings/smtp", "PATCH", {
    value: {
      enabled: toBoolean(formData.get("enabled")),
      host: textValue(formData, "host"),
      port: toNumber(formData.get("port"), 587),
      secure: toBoolean(formData.get("secure")),
      username: textValue(formData, "username"),
      password: password || (typeof current.password === "string" ? current.password : ""),
      fromEmail: textValue(formData, "fromEmail"),
      fromName: textValue(formData, "fromName"),
      recipientEmail: textValue(formData, "recipientEmail"),
      replyToSender: toBoolean(formData.get("replyToSender"))
    }
  });

  revalidateSiteSettings();
  redirect("/admin/site-settings?saved=smtp");
}
