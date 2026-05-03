import type { Route } from "next";
import Link from "next/link";
import { ClipboardList, ExternalLink, Search } from "lucide-react";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { AdminToast } from "@/components/admin/AdminToast";
import { getServicePage } from "@/lib/api";
import { serviceCards } from "@/lib/site-content";

type Props = {
  searchParams?: {
    search?: string;
    status?: string;
    updated?: string;
  };
};

export default async function AdminServicesManagementPage({ searchParams }: Props) {
  const pages = await Promise.all(serviceCards.map((service) => getServicePage(service.slug)));
  const search = searchParams?.search?.trim().toLowerCase() ?? "";
  const status = searchParams?.status ?? "all";

  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      !search ||
      [page.name, page.slug, page.metaTitle, page.metaDescription]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search));
    const matchesStatus =
      status === "all" ||
      (status === "published" && page.isActive !== false) ||
      (status === "hidden" && page.isActive === false);

    return matchesSearch && matchesStatus;
  });

  const publishedCount = pages.filter((page) => page.isActive !== false).length;

  return (
    <div className="space-y-6">
      <AdminToast
        message={searchParams?.updated ? "Service page saved successfully." : null}
      />
      <section className="admin-card p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="admin-label">Services Management</div>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900">Service page inventory</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-neutral-600">
              Keep each core service easy to find, locally optimized, and connected to booking or contact actions.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[28rem]">
            <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="admin-label">Pages</div>
              <div className="mt-2 text-2xl font-semibold text-neutral-900">{pages.length}</div>
            </article>
            <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="admin-label">Published</div>
              <div className="mt-2 text-2xl font-semibold text-neutral-900">{publishedCount}</div>
            </article>
            <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="admin-label">Hidden</div>
              <div className="mt-2 text-2xl font-semibold text-neutral-900">{pages.length - publishedCount}</div>
            </article>
          </div>
        </div>
      </section>

      <section className="admin-card p-5">
        <form className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              name="search"
              defaultValue={searchParams?.search ?? ""}
              placeholder="Search service, slug, or SEO metadata"
              className="input pl-9"
            />
          </label>
          <select name="status" defaultValue={status} className="input select">
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="hidden">Hidden</option>
          </select>
          <AdminSubmitButton className="btn btn-primary justify-center" pendingLabel="Filtering...">
            Filter
          </AdminSubmitButton>
        </form>
      </section>

      <section className="admin-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <div className="admin-label">Service Pages</div>
            <div className="mt-1 text-sm text-neutral-500">
              {filteredPages.length} of {pages.length} pages shown
            </div>
          </div>
        </div>
        <div className="divide-y divide-slate-200">
          {filteredPages.map((page) => (
            <article key={page.slug} className="grid gap-4 px-6 py-5 xl:grid-cols-[1.2fr_1.6fr_220px] xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="admin-pill">{page.isActive === false ? "Hidden" : "Published"}</span>
                  <span className="admin-pill">{page.slug}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-neutral-900">{page.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">{page.metaDescription}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <ClipboardList className="mt-1 h-4 w-4 flex-none text-primary" />
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">{page.metaTitle}</div>
                    <div className="mt-1 text-xs text-neutral-500">
                      H1/content, SEO fields, image, and active status are edited inside the page editor.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 xl:justify-end">
                <Link href={`/services/${page.slug}` as Route} className="btn btn-secondary">
                  Public
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <Link href={`/admin/services-pages/${page.slug}` as Route} className="btn btn-primary">
                  Edit
                </Link>
              </div>
            </article>
          ))}
          {!filteredPages.length ? (
            <div className="px-6 py-12 text-center text-sm text-neutral-500">
              No service pages match the current filters.
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
