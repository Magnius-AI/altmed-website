import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { createProviderAction, deleteProviderAction, updateProviderAction } from "./actions";
import { getAdminProviders } from "@/lib/api";

export default async function AdminProvidersPage() {
  const providers = await getAdminProviders();

  return (
    <div className="space-y-6">
      <section className="admin-card p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="admin-label">Providers</div>
            <h2 className="mt-2 text-3xl font-semibold text-neutral-900">Provider directory</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-neutral-600">
              Keep public provider details and schedule cards current. Appointment links, status,
              designation, and service keys control what appears on the scheduling page.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="admin-pill">{providers.length} providers</span>
            <a href="#new-provider" className="admin-action">
              Add provider
            </a>
          </div>
        </div>
      </section>

      <section id="new-provider" className="admin-card p-6">
        <div className="admin-label">New Provider</div>
        <form action={createProviderAction} className="mt-6 grid gap-4 lg:grid-cols-2">
          <input
            type="text"
            name="name"
            required
            placeholder="Name"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <input
            type="text"
            name="credentials"
            placeholder="Credentials"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <input
            type="text"
            name="title"
            placeholder="Designation / title"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <input
            type="text"
            name="specialties"
            placeholder="Specialties, comma separated"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <textarea
            name="bio"
            rows={4}
            placeholder="Bio"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700 lg:col-span-2"
          />
          <textarea
            name="personalNote"
            rows={3}
            placeholder="Personal note"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700 lg:col-span-2"
          />
          <input
            type="url"
            name="appointmentUrl"
            placeholder="Appointment link"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <input
            type="text"
            name="scheduleStatus"
            defaultValue="Available"
            placeholder="Schedule status"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <input
            type="text"
            name="scheduleServices"
            placeholder="Schedule services: dot-physical, drug-test, medical-visit"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700 lg:col-span-2"
          />
          <input
            type="number"
            name="displayOrder"
            defaultValue={providers.length + 1}
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700">
              <input type="checkbox" name="isActive" defaultChecked />
              Active profile
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700">
              <input type="checkbox" name="isSchedulable" defaultChecked />
              Show on schedule
            </label>
          </div>
          <input
            type="text"
            name="photo"
            placeholder="/uploads/provider-photo.webp"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <input
            type="file"
            name="imageFile"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="focus-ring rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-neutral-700"
          />
          <AdminSubmitButton className="admin-action justify-center lg:col-span-2" pendingLabel="Adding provider...">
            Add provider
          </AdminSubmitButton>
        </form>
      </section>

      <section className="admin-card overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="admin-label">Provider List</div>
          <div className="mt-1 text-sm text-neutral-500">Update public profile details and media</div>
        </div>
        <div className="divide-y divide-slate-200">
          {providers.map((provider, index) => (
            <form
              key={provider.id}
              action={updateProviderAction.bind(null, provider.id)}
              className="space-y-4 px-6 py-5"
            >
              <input type="hidden" name="existingPhoto" value={provider.photo ?? ""} />
              <div className="flex flex-wrap items-center gap-2">
                <span className="admin-pill">{provider.isActive ? "Active profile" : "Inactive profile"}</span>
                <span className="admin-pill">{provider.isSchedulable ? "Shown on schedule" : "Hidden from schedule"}</span>
                {provider.scheduleStatus ? <span className="admin-pill">{provider.scheduleStatus}</span> : null}
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  defaultValue={provider.name}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                />
                <input
                  type="text"
                  name="credentials"
                  defaultValue={provider.credentials ?? ""}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                />
                <input
                  type="text"
                  name="title"
                  defaultValue={provider.title ?? ""}
                  placeholder="Designation / title"
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                />
                <input
                  type="text"
                  name="specialties"
                  defaultValue={provider.specialties?.join(", ") ?? ""}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                />
                <textarea
                  name="bio"
                  rows={4}
                  defaultValue={provider.bio ?? ""}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700 lg:col-span-2"
                />
                <textarea
                  name="personalNote"
                  rows={3}
                  defaultValue={provider.personalNote ?? ""}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700 lg:col-span-2"
                />
                <input
                  type="url"
                  name="appointmentUrl"
                  defaultValue={provider.appointmentUrl ?? ""}
                  placeholder="Appointment link"
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                />
                <input
                  type="text"
                  name="scheduleStatus"
                  defaultValue={provider.scheduleStatus ?? ""}
                  placeholder="Schedule status"
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                />
                <input
                  type="text"
                  name="scheduleServices"
                  defaultValue={provider.scheduleServices?.join(", ") ?? ""}
                  placeholder="Schedule services: dot-physical, drug-test, medical-visit"
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700 lg:col-span-2"
                />
                <input
                  type="text"
                  name="photo"
                  defaultValue={provider.photo ?? ""}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                />
                <input
                  type="file"
                  name="imageFile"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="focus-ring rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-neutral-700"
                />
                <input
                  type="number"
                  name="displayOrder"
                  defaultValue={provider.displayOrder ?? index + 1}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700">
                    <input type="checkbox" name="isActive" defaultChecked={provider.isActive ?? true} />
                    Active
                  </label>
                  <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700">
                    <input type="checkbox" name="isSchedulable" defaultChecked={provider.isSchedulable ?? false} />
                    Show on schedule
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <AdminSubmitButton className="admin-secondary-action" pendingLabel="Saving changes...">
                  Save changes
                </AdminSubmitButton>
                <AdminSubmitButton
                  formAction={deleteProviderAction.bind(null, provider.id)}
                  className="focus-ring inline-flex items-center rounded-full border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700"
                  pendingLabel="Deleting..."
                >
                  Delete
                </AdminSubmitButton>
              </div>
            </form>
          ))}
        </div>
      </section>
    </div>
  );
}
