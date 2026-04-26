import { getAdminDashboardData } from "@/lib/api";

export default async function AdminSeoSettingsPage() {
  const data = await getAdminDashboardData();
  const seoDefaults = data.settings.find((setting) => setting.key === "seo_defaults");

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="admin-card p-6">
        <div className="admin-label">SEO Defaults</div>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900">Global metadata settings</h2>
        <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-neutral-700">
          <pre className="whitespace-pre-wrap font-sans">
            {JSON.stringify(seoDefaults?.value ?? {}, null, 2)}
          </pre>
        </div>
      </section>
      <section className="admin-card p-6">
        <div className="admin-label">Robots & Redirects</div>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-900">Migration safeguards</h2>
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-7 text-neutral-700">
            User-agent: *<br />
            Allow: /<br />
            Disallow: /admin<br />
            Disallow: /api
          </div>
          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="text-sm font-semibold text-neutral-900">
              {data.routeAudit.length} redirect mappings active
            </div>
            <p className="mt-2 text-sm leading-7 text-neutral-600">
              Legacy public and service routes are being preserved with permanent redirects to
              their new canonical URLs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
