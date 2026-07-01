import Link from "next/link";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import type { BlogTaxonomy } from "@/lib/api";

type TaxonomyKind = "category" | "tag";

type Props = {
  kind: TaxonomyKind;
  title: string;
  description: string;
  items: BlogTaxonomy[];
  search?: string;
  status?: string;
  createAction: (formData: FormData) => void | Promise<void>;
  updateAction: (id: string, formData: FormData) => void | Promise<void>;
  deleteAction: (id: string) => void | Promise<void>;
};

const labels = {
  category: {
    eyebrow: "Blog Categories",
    item: "category",
    itemTitle: "Category",
    plural: "categories",
    placeholder: "Search categories",
    add: "Add category",
    newLabel: "New Category"
  },
  tag: {
    eyebrow: "Blog Tags",
    item: "tag",
    itemTitle: "Tag",
    plural: "tags",
    placeholder: "Search tags",
    add: "Add tag",
    newLabel: "New Tag"
  }
};

function matchesSearch(item: BlogTaxonomy, search: string) {
  if (!search) {
    return true;
  }

  return [item.name, item.slug, item.description]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(search));
}

function matchesStatus(item: BlogTaxonomy, status: string) {
  if (status === "active") {
    return item.isActive ?? true;
  }

  if (status === "inactive") {
    return !(item.isActive ?? true);
  }

  return true;
}

export function BlogTaxonomyManager({
  kind,
  title,
  description,
  items,
  search = "",
  status = "all",
  createAction,
  updateAction,
  deleteAction
}: Props) {
  const copy = labels[kind];
  const normalizedSearch = search.trim().toLowerCase();
  const filteredItems = items.filter(
    (item) => matchesSearch(item, normalizedSearch) && matchesStatus(item, status)
  );
  const activeCount = items.filter((item) => item.isActive ?? true).length;
  const usedCount = items.filter((item) => (item.usageCount ?? 0) > 0).length;

  return (
    <div className="space-y-5">
      <section className="admin-card p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="admin-label">{copy.eyebrow}</div>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900">{title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/blog" className="admin-secondary-action">
              Back to posts
            </Link>
            <a href="#new-taxonomy" className="admin-action">
              {copy.add}
            </a>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <div className="admin-label">Total</div>
            <div className="mt-1 text-xl font-semibold text-neutral-900">{items.length}</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <div className="admin-label">Active</div>
            <div className="mt-1 text-xl font-semibold text-neutral-900">{activeCount}</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <div className="admin-label">Used</div>
            <div className="mt-1 text-xl font-semibold text-neutral-900">{usedCount}</div>
          </div>
        </div>
      </section>

      <section id="new-taxonomy" className="admin-card p-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="admin-label">{copy.newLabel}</div>
            <div className="mt-1 text-sm text-neutral-500">Name is enough. Slug can auto-generate.</div>
          </div>
        </div>
        <form action={createAction} className="mt-4 grid items-start gap-3 lg:grid-cols-[1fr_1.4fr_auto_auto]">
          <input type="text" name="name" required placeholder={`${copy.itemTitle} name`} className="input" />
          <input type="text" name="description" placeholder="Short description" className="input" />
          <label className="admin-check h-10">
            <input type="checkbox" name="isActive" defaultChecked />
            Active
          </label>
          <AdminSubmitButton className="admin-action h-10 justify-center" pendingLabel="Saving...">
            Save
          </AdminSubmitButton>
          <details className="lg:col-span-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-neutral-600">
            <summary className="cursor-pointer font-semibold text-neutral-700">Optional slug</summary>
            <input type="text" name="slug" placeholder="Slug (optional)" className="input mt-3 bg-white" />
          </details>
        </form>
      </section>

      <section className="admin-card overflow-hidden">
        <div className="border-b border-slate-200 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="admin-label">Saved {copy.plural}</div>
              <div className="mt-1 text-sm text-neutral-500">
                {filteredItems.length} shown of {items.length}
              </div>
            </div>
            <form className="grid gap-3 sm:grid-cols-[minmax(180px,280px)_150px_auto]">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.11em] text-neutral-500">
                  Search
                </span>
                <input
                  type="search"
                  name="search"
                  defaultValue={search}
                  placeholder={copy.placeholder}
                  className="input"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.11em] text-neutral-500">
                  Status
                </span>
                <select name="status" defaultValue={status} className="input">
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>
              <div className="flex items-end">
                <AdminSubmitButton className="admin-action h-10 justify-center" pendingLabel="Searching...">
                  Search
                </AdminSubmitButton>
              </div>
            </form>
          </div>
        </div>

        <div className="divide-y divide-slate-200">
          {filteredItems.map((item) => (
            <form
              key={item.id}
              action={updateAction.bind(null, item.id)}
              className="grid gap-3 px-5 py-4 xl:grid-cols-[minmax(180px,1.2fr)_96px_110px_180px] xl:items-start"
            >
              <div className="min-w-0">
                <input type="text" name="name" defaultValue={item.name} className="input font-semibold" />
                <details className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-neutral-600">
                  <summary className="cursor-pointer font-semibold text-neutral-700">
                    Slug and description
                  </summary>
                  <div className="mt-3 grid gap-3">
                    <input type="text" name="slug" defaultValue={item.slug} className="input bg-white" />
                    <textarea
                      name="description"
                      rows={2}
                      defaultValue={item.description ?? ""}
                      className="input min-h-[4.25rem] bg-white"
                      placeholder={`${copy.itemTitle} description`}
                    />
                  </div>
                </details>
              </div>
              <div className="admin-pill h-9 w-fit">{item.usageCount ?? 0} posts</div>
              <label className="admin-check h-9">
                <input type="checkbox" name="isActive" defaultChecked={item.isActive ?? true} />
                Active
              </label>
              <div className="flex flex-wrap gap-2 xl:justify-end">
                <AdminSubmitButton className="admin-secondary-action h-9" pendingLabel="Saving...">
                  Save
                </AdminSubmitButton>
                <AdminSubmitButton
                  formAction={deleteAction.bind(null, item.id)}
                  className="focus-ring inline-flex h-9 items-center rounded-md border border-rose-200 px-3 text-sm font-semibold text-rose-700"
                  pendingLabel="Deleting..."
                >
                  Delete
                </AdminSubmitButton>
              </div>
            </form>
          ))}
          {!filteredItems.length ? (
            <div className="px-6 py-10 text-center text-sm text-neutral-500">
              No {copy.plural} match the current search.
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
