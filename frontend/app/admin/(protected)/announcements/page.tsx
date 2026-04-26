import {
  createAnnouncementAction,
  deleteAnnouncementAction,
  updateAnnouncementAction
} from "./actions";
import { getAdminAnnouncements } from "@/lib/api";

function toDateTimeLocal(value?: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60_000);
  return localDate.toISOString().slice(0, 16);
}

export default async function AdminAnnouncementsPage() {
  const announcements = await getAdminAnnouncements();

  return (
    <div className="space-y-6">
      <section className="admin-card p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="admin-label">Announcements</div>
            <h2 className="mt-2 text-3xl font-semibold text-neutral-900">Clinic notices</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-neutral-600">
              Publish banners, operational notices, and time-sensitive patient messaging with clear
              status and priority.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="admin-pill">{announcements.length} notices</span>
            <a href="#new-announcement" className="admin-action">
              Add announcement
            </a>
          </div>
        </div>
      </section>

      <section id="new-announcement" className="admin-card p-6">
        <div className="admin-label">New Announcement</div>
        <form action={createAnnouncementAction} className="mt-6 grid gap-4 lg:grid-cols-2">
          <input
            type="text"
            name="title"
            required
            placeholder="Headline"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <input
            type="text"
            name="type"
            defaultValue="General"
            placeholder="Type"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <textarea
            name="body"
            rows={4}
            required
            placeholder="Announcement body"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700 lg:col-span-2"
          />
          <select
            name="priority"
            defaultValue="Normal"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          >
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
          <input
            type="datetime-local"
            name="startDate"
            defaultValue={toDateTimeLocal(new Date().toISOString())}
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <input
            type="datetime-local"
            name="endDate"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <div className="flex flex-wrap gap-4">
            {[
              ["showOnHomepageBanner", "Show in homepage banner"],
              ["pinned", "Pin this notice"],
              ["isActive", "Active"]
            ].map(([name, label]) => (
              <label key={name} className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700">
                <input type="checkbox" name={name} defaultChecked={name === "isActive"} />
                {label}
              </label>
            ))}
          </div>
          <button type="submit" className="admin-action justify-center lg:col-span-2">
            Save announcement
          </button>
        </form>
      </section>

      <section className="admin-card overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="admin-label">Announcement List</div>
          <div className="mt-1 text-sm text-neutral-500">Edit, pin, or retire published notices</div>
        </div>
        <div className="divide-y divide-slate-200">
          {announcements.map((announcement) => (
            <form
              key={announcement.id}
              action={updateAnnouncementAction.bind(null, announcement.id!)}
              className="space-y-4 px-6 py-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="admin-pill">{announcement.type ?? "General"}</span>
                <span className="admin-pill">{announcement.priority ?? "Normal"}</span>
                {announcement.pinned ? <span className="admin-pill">Pinned</span> : null}
                {announcement.isActive ? <span className="admin-pill">Active</span> : <span className="admin-pill">Inactive</span>}
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <input
                  type="text"
                  name="title"
                  defaultValue={announcement.title ?? ""}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    name="type"
                    defaultValue={announcement.type ?? "General"}
                    className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                  />
                  <select
                    name="priority"
                    defaultValue={announcement.priority ?? "Normal"}
                    className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                  >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <textarea
                  name="body"
                  rows={4}
                  defaultValue={announcement.body ?? ""}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700 lg:col-span-2"
                />
                <input
                  type="datetime-local"
                  name="startDate"
                  defaultValue={toDateTimeLocal(announcement.startDate)}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                />
                <input
                  type="datetime-local"
                  name="endDate"
                  defaultValue={toDateTimeLocal(announcement.endDate ?? undefined)}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                {[
                  {
                    name: "showOnHomepageBanner",
                    label: "Show in homepage banner",
                    checked: announcement.showOnHomepageBanner
                  },
                  { name: "pinned", label: "Pinned", checked: announcement.pinned },
                  { name: "isActive", label: "Active", checked: announcement.isActive }
                ].map((item) => (
                  <label key={item.name} className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700">
                    <input type="checkbox" name={item.name} defaultChecked={Boolean(item.checked)} />
                    {item.label}
                  </label>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <button type="submit" className="admin-secondary-action">
                  Save changes
                </button>
                <button
                  formAction={deleteAnnouncementAction.bind(null, announcement.id!)}
                  className="focus-ring inline-flex items-center rounded-full border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700"
                >
                  Delete
                </button>
              </div>
            </form>
          ))}
        </div>
      </section>
    </div>
  );
}
