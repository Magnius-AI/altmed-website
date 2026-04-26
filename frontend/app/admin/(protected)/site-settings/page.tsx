import { getAdminSiteSettings } from "@/lib/api";
import { updateSiteSettingAction } from "./actions";

export default async function AdminSiteSettingsPage() {
  const settings = await getAdminSiteSettings();

  return (
    <section className="space-y-4">
      <div className="admin-card p-6">
        <div className="admin-label">Site Settings</div>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900">Clinic-wide configuration</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-neutral-600">
          Update hours, NAP data, SEO defaults, social profiles, and any other structured settings
          stored in the CMS.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {settings.map((setting) => (
          <form
            key={setting.key}
            action={updateSiteSettingAction.bind(null, setting.key)}
            className="admin-card p-5"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              {setting.key}
            </div>
            <textarea
              name="value"
              rows={16}
              defaultValue={JSON.stringify(setting.value, null, 2)}
              className="focus-ring mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm leading-7 text-neutral-700"
            />
            <button
              type="submit"
              className="focus-ring mt-4 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
            >
              Save setting
            </button>
          </form>
        ))}
      </div>
    </section>
  );
}
