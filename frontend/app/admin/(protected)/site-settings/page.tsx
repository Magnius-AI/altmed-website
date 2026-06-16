import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { AdminToast } from "@/components/admin/AdminToast";
import { getAdminSiteSettings } from "@/lib/api";
import {
  updateFeatureSettingsAction,
  updateHoursSettingsAction,
  updateNapSettingsAction,
  updateSeoDefaultsAction,
  updateSiteSettingAction,
  updateSmtpSettingsAction,
  updateSocialSettingsAction
} from "./actions";

type Props = {
  searchParams?: {
    saved?: string;
  };
};

function getString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function getRecord(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function getNumber(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function noticeMessage(saved?: string) {
  if (saved === "clinic") {
    return "Clinic information saved.";
  }
  if (saved === "hours") {
    return "Clinic hours saved.";
  }
  if (saved === "social") {
    return "Social links saved.";
  }
  if (saved === "seo") {
    return "SEO defaults saved.";
  }
  if (saved === "features") {
    return "Feature settings saved.";
  }
  if (saved === "smtp") {
    return "SMTP email settings saved.";
  }

  return null;
}

export default async function AdminSiteSettingsPage({ searchParams }: Props) {
  const settings = await getAdminSiteSettings();
  const getSetting = (key: string) =>
    getRecord(settings.find((setting) => setting.key === key)?.value);
  const nap = getSetting("nap");
  const hours = getSetting("hours");
  const social = getSetting("social");
  const seoDefaults = getSetting("seo_defaults");
  const features = getSetting("features");
  const smtp = getSetting("smtp");
  const weekdayHours = getRecord(hours.weekdays);
  const saturdayHours = getRecord(hours.saturday);
  const sundayHours = getRecord(hours.sunday);
  const advancedSettings = settings.filter(
    (setting) => !["nap", "hours", "social", "seo_defaults", "features", "smtp"].includes(setting.key)
  );
  const passwordSaved = typeof smtp.password === "string" && smtp.password.length > 0;

  return (
    <section className="space-y-5">
      <AdminToast message={noticeMessage(searchParams?.saved)} />
      <div className="admin-card p-4">
        <div className="admin-label">Site Settings</div>
        <h2 className="mt-1 text-2xl font-semibold text-neutral-900">Clinic-wide configuration</h2>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-neutral-600">
          Update public clinic details, hours, social links, SEO defaults, and contact form email alerts.
          Technical JSON settings are still available in Advanced settings below.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <form action={updateNapSettingsAction} className="admin-card p-5">
          <div className="admin-label">Public Business Info</div>
          <h3 className="mt-2 text-xl font-semibold text-neutral-900">Clinic name, address, phone</h3>
          <p className="mt-1 text-sm leading-6 text-neutral-600">
            Used across the website, contact page, local SEO schema, and footer.
          </p>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Clinic Name</span>
              <input name="clinicName" defaultValue={getString(nap.clinicName)} className="input" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Phone</span>
              <input name="phone" defaultValue={getString(nap.phone)} className="input" />
            </label>
            <label className="block lg:col-span-2">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Address</span>
              <input name="address" defaultValue={getString(nap.address)} className="input" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Email</span>
              <input name="email" type="email" defaultValue={getString(nap.email)} className="input" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Primary Site URL</span>
              <input
                name="canonicalUrl"
                type="url"
                defaultValue={getString(nap.canonicalUrl)}
                className="input"
                placeholder="Leave blank if handled by app host"
              />
            </label>
          </div>
          <AdminSubmitButton className="admin-action mt-5" pendingLabel="Saving clinic info...">
            Save clinic info
          </AdminSubmitButton>
        </form>

        <form action={updateFeatureSettingsAction} className="admin-card p-5">
          <div className="admin-label">Features</div>
          <h3 className="mt-2 text-xl font-semibold text-neutral-900">Website modules</h3>
          <p className="mt-1 text-sm leading-6 text-neutral-600">
            Turn optional public website sections on or off without editing code.
          </p>
          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <label className="flex items-start gap-3 text-sm text-neutral-700">
              <input
                type="checkbox"
                name="treatmentPlansEnabled"
                defaultChecked={getBoolean(features.treatmentPlansEnabled)}
                className="mt-1"
              />
              <span>
                <span className="block font-semibold text-neutral-900">Treatment plans and payment pages</span>
                <span className="mt-1 block leading-6">
                  Shows the public plans flow when the clinic is ready to accept plan enrollments.
                </span>
              </span>
            </label>
          </div>
          <AdminSubmitButton className="admin-action mt-5" pendingLabel="Saving features...">
            Save features
          </AdminSubmitButton>
        </form>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <form action={updateHoursSettingsAction} className="admin-card p-5">
          <div className="admin-label">Hours</div>
          <h3 className="mt-2 text-xl font-semibold text-neutral-900">Clinic schedule</h3>
          <p className="mt-1 text-sm leading-6 text-neutral-600">
            Displayed in local SEO data and public contact areas.
          </p>
          <div className="mt-5 space-y-4">
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="text-sm font-semibold text-neutral-900">Weekdays</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-neutral-700">Open</span>
                  <input name="weekdaysOpen" type="time" defaultValue={getString(weekdayHours.open, "09:00")} className="input" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-neutral-700">Close</span>
                  <input name="weekdaysClose" type="time" defaultValue={getString(weekdayHours.close, "17:00")} className="input" />
                </label>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-4">
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-900">
                  <input type="checkbox" name="saturdayClosed" defaultChecked={getBoolean(saturdayHours.closed, true)} />
                  Saturday closed
                </label>
                <div className="grid gap-3">
                  <input name="saturdayOpen" type="time" defaultValue={getString(saturdayHours.open, "09:00")} className="input" aria-label="Saturday open time" />
                  <input name="saturdayClose" type="time" defaultValue={getString(saturdayHours.close, "13:00")} className="input" aria-label="Saturday close time" />
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-900">
                  <input type="checkbox" name="sundayClosed" defaultChecked={getBoolean(sundayHours.closed, true)} />
                  Sunday closed
                </label>
                <div className="grid gap-3">
                  <input name="sundayOpen" type="time" defaultValue={getString(sundayHours.open, "09:00")} className="input" aria-label="Sunday open time" />
                  <input name="sundayClose" type="time" defaultValue={getString(sundayHours.close, "13:00")} className="input" aria-label="Sunday close time" />
                </div>
              </div>
            </div>
          </div>
          <AdminSubmitButton className="admin-action mt-5" pendingLabel="Saving hours...">
            Save hours
          </AdminSubmitButton>
        </form>

        <form action={updateSocialSettingsAction} className="admin-card p-5">
          <div className="admin-label">Social</div>
          <h3 className="mt-2 text-xl font-semibold text-neutral-900">Profile links</h3>
          <p className="mt-1 text-sm leading-6 text-neutral-600">
            Used for footer links, social proof, and structured profile references.
          </p>
          <div className="mt-5 grid gap-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Facebook URL</span>
              <input name="facebook" type="url" defaultValue={getString(social.facebook)} className="input" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Yelp URL</span>
              <input name="yelp" type="url" defaultValue={getString(social.yelp)} className="input" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Instagram Handle</span>
              <input name="instagram" defaultValue={getString(social.instagram)} className="input" placeholder="@altmed_medical" />
            </label>
          </div>
          <AdminSubmitButton className="admin-action mt-5" pendingLabel="Saving social links...">
            Save social links
          </AdminSubmitButton>
        </form>
      </div>

      <form action={updateSeoDefaultsAction} className="admin-card p-5">
        <div className="admin-label">SEO Defaults</div>
        <h3 className="mt-2 text-xl font-semibold text-neutral-900">Default search appearance</h3>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-neutral-600">
          These are fallbacks for pages that do not have custom SEO fields. Page-specific titles and
          descriptions still win when they are set.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-neutral-700">Title Suffix</span>
            <input name="titleSuffix" defaultValue={getString(seoDefaults.titleSuffix)} className="input" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-neutral-700">Default Social Image</span>
            <input name="ogImage" defaultValue={getString(seoDefaults.ogImage)} className="input" placeholder="/images/og-default.webp" />
          </label>
          <label className="block lg:col-span-2">
            <span className="mb-1 block text-sm font-medium text-neutral-700">Default Meta Description</span>
            <textarea
              name="descriptionTemplate"
              rows={3}
              defaultValue={getString(seoDefaults.descriptionTemplate)}
              className="input min-h-28"
            />
          </label>
        </div>
        <AdminSubmitButton className="admin-action mt-5" pendingLabel="Saving SEO defaults...">
          Save SEO defaults
        </AdminSubmitButton>
      </form>

      <form action={updateSmtpSettingsAction} className="admin-card p-5">
        <div className="admin-label">Email Notifications</div>
        <h3 className="mt-2 text-xl font-semibold text-neutral-900">Contact form SMTP</h3>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-neutral-600">
          Send clinic email alerts when a real contact inquiry is submitted. If this is disabled or
          incomplete, the contact inbox still stores submissions and the backend falls back to env SMTP settings.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 lg:col-span-2">
            <input type="checkbox" name="enabled" defaultChecked={getBoolean(smtp.enabled)} />
            Enable SMTP notifications
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-neutral-700">SMTP Host</span>
            <input name="host" defaultValue={getString(smtp.host)} className="input" placeholder="smtp.gmail.com" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-neutral-700">SMTP Port</span>
            <input name="port" type="number" min="1" defaultValue={getNumber(smtp.port, 587)} className="input" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-neutral-700">SMTP Username</span>
            <input name="username" defaultValue={getString(smtp.username)} className="input" placeholder="info@altmedfirst.com" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-neutral-700">
              SMTP Password {passwordSaved ? "(saved)" : ""}
            </span>
            <input name="password" type="password" className="input" placeholder="Leave blank to keep saved password" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-neutral-700">From Email</span>
            <input name="fromEmail" type="email" defaultValue={getString(smtp.fromEmail)} className="input" placeholder="info@altmedfirst.com" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-neutral-700">From Name</span>
            <input name="fromName" defaultValue={getString(smtp.fromName, "Altmed Medical Center")} className="input" />
          </label>
          <label className="block lg:col-span-2">
            <span className="mb-1 block text-sm font-medium text-neutral-700">Notification Recipient</span>
            <input name="recipientEmail" type="email" defaultValue={getString(smtp.recipientEmail)} className="input" placeholder="info@altmedfirst.com" />
          </label>
          <div className="flex flex-wrap gap-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-neutral-700 lg:col-span-2">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="secure" defaultChecked={getBoolean(smtp.secure)} />
              Use SSL/TLS
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" name="replyToSender" defaultChecked={getBoolean(smtp.replyToSender, true)} />
              Set reply-to as patient email
            </label>
          </div>
        </div>
        <AdminSubmitButton className="admin-action mt-5" pendingLabel="Saving SMTP settings...">
          Save SMTP settings
        </AdminSubmitButton>
      </form>
      {advancedSettings.length ? (
        <details className="admin-card p-5">
          <summary className="cursor-pointer text-base font-semibold text-neutral-900">
            Advanced JSON settings
          </summary>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
            Developer-oriented settings such as nested navigation live here. Edit these only when
            you need the exact JSON structure.
          </p>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {advancedSettings.map((setting) => (
              <form
                key={setting.key}
                action={updateSiteSettingAction.bind(null, setting.key)}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {setting.key}
                </div>
                <textarea
                  name="value"
                  rows={12}
                  defaultValue={JSON.stringify(setting.value, null, 2)}
                  className="focus-ring mt-3 w-full rounded-lg border border-slate-200 px-3 py-2.5 font-mono text-sm leading-6 text-neutral-700"
                />
                <AdminSubmitButton
                  className="admin-action mt-3"
                  pendingLabel="Saving setting..."
                >
                  Save JSON
                </AdminSubmitButton>
              </form>
            ))}
          </div>
        </details>
      ) : null}
    </section>
  );
}
