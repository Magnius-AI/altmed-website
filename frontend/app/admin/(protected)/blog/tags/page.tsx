import Link from "next/link";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { createBlogTagAction, deleteBlogTagAction, updateBlogTagAction } from "../actions";
import { getAdminBlogTags } from "@/lib/api";

export default async function AdminBlogTagsPage() {
  const tags = await getAdminBlogTags();

  return (
    <div className="space-y-6">
      <section className="admin-card p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="admin-label">Blog Tags</div>
            <h2 className="mt-2 text-3xl font-semibold text-neutral-900">Tag library</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-neutral-600">
              Maintain reusable keywords and topics that editors can apply directly from the post
              form.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/blog" className="admin-secondary-action">
              Back to posts
            </Link>
            <a href="#new-tag" className="admin-action">
              Add tag
            </a>
          </div>
        </div>
      </section>

      <section id="new-tag" className="admin-card p-6">
        <div className="admin-label">New Tag</div>
        <form action={createBlogTagAction} className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr_1.3fr_auto]">
          <input
            type="text"
            name="name"
            required
            placeholder="Tag name"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <input
            type="text"
            name="slug"
            placeholder="Slug (optional)"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <textarea
            name="description"
            rows={2}
            placeholder="Description"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700">
              <input type="checkbox" name="isActive" defaultChecked />
              Active
            </label>
            <AdminSubmitButton className="admin-action justify-center" pendingLabel="Saving...">
              Save
            </AdminSubmitButton>
          </div>
        </form>
      </section>

      <section className="admin-card overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="admin-label">Saved Tags</div>
          <div className="mt-1 text-sm text-neutral-500">{tags.length} total tags</div>
        </div>
        <div className="divide-y divide-slate-200">
          {tags.map((tag) => (
            <form
              key={tag.id}
              action={updateBlogTagAction.bind(null, tag.id)}
              className="grid gap-4 px-6 py-5 xl:grid-cols-[1fr_1fr_1.4fr_120px_220px]"
            >
              <input
                type="text"
                name="name"
                defaultValue={tag.name}
                className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
              />
              <input
                type="text"
                name="slug"
                defaultValue={tag.slug}
                className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
              />
              <textarea
                name="description"
                rows={2}
                defaultValue={tag.description ?? ""}
                className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
              />
              <div className="space-y-3">
                <div className="admin-pill">{tag.usageCount ?? 0} posts</div>
                <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700">
                  <input type="checkbox" name="isActive" defaultChecked={tag.isActive ?? true} />
                  Active
                </label>
              </div>
              <div className="flex flex-wrap gap-3 xl:justify-end">
                <AdminSubmitButton className="admin-secondary-action" pendingLabel="Saving...">
                  Save
                </AdminSubmitButton>
                <AdminSubmitButton
                  formAction={deleteBlogTagAction.bind(null, tag.id)}
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
