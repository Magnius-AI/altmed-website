import Image from "next/image";
import Link from "next/link";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { AdminToast } from "@/components/admin/AdminToast";
import { deleteBlogPostAction } from "./actions";
import { getAdminBlogCategories, getAdminBlogPosts } from "@/lib/api";

type Props = {
  searchParams?: {
    status?: string;
    category?: string;
    search?: string;
    saved?: string;
  };
};

function formatDate(value?: string) {
  if (!value) {
    return "Draft";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export default async function AdminBlogPage({ searchParams }: Props) {
  const [posts, categories] = await Promise.all([getAdminBlogPosts(), getAdminBlogCategories()]);
  const search = searchParams?.search?.trim().toLowerCase() ?? "";
  const status = searchParams?.status ?? "all";
  const category = searchParams?.category ?? "all";

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      !search ||
      [post.title, post.slug, post.author, post.category, ...(post.tags ?? [])]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search));

    const matchesStatus =
      status === "all" ||
      (status === "published" && post.published) ||
      (status === "draft" && !post.published) ||
      (status === "featured" && post.featured);

    const matchesCategory = category === "all" || post.category === category;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const featuredCount = posts.filter((post) => post.featured).length;

  return (
    <div className="space-y-6">
      <AdminToast message={searchParams?.saved === "deleted" ? "Blog post deleted successfully." : null} />
      <section className="admin-card p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="admin-label">Blog Manager</div>
            <h2 className="mt-2 text-3xl font-semibold text-neutral-900">Editorial inventory</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-neutral-600">
              Review posts, feature key articles, and keep categories and tags clean enough for a
              modern clinic CMS.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/blog/categories" className="admin-secondary-action">
              Categories
            </Link>
            <Link href="/admin/blog/tags" className="admin-secondary-action">
              Tags
            </Link>
            <Link href="/admin/blog/new" className="admin-action">
              Add post
            </Link>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="admin-label">Total Posts</div>
            <div className="mt-2 text-3xl font-semibold text-neutral-900">{posts.length}</div>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="admin-label">Published</div>
            <div className="mt-2 text-3xl font-semibold text-neutral-900">
              {posts.filter((post) => post.published).length}
            </div>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="admin-label">Featured</div>
            <div className="mt-2 text-3xl font-semibold text-neutral-900">{featuredCount}</div>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="admin-label">Taxonomies</div>
            <div className="mt-2 text-3xl font-semibold text-neutral-900">
              {categories.length}
            </div>
          </article>
        </div>
      </section>

      <section className="admin-card p-6">
        <form className="grid gap-4 lg:grid-cols-[1.3fr_0.8fr_0.9fr_auto]">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-neutral-700">Search</span>
            <input
              type="search"
              name="search"
              defaultValue={searchParams?.search ?? ""}
              placeholder="Search title, slug, author, or tag"
              className="focus-ring w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-neutral-700">Status</span>
            <select
              name="status"
              defaultValue={status}
              className="focus-ring w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
            >
              <option value="all">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="featured">Featured</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-neutral-700">Category</span>
            <select
              name="category"
              defaultValue={category}
              className="focus-ring w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-end">
            <AdminSubmitButton className="admin-action w-full justify-center" pendingLabel="Filtering...">
              Apply filters
            </AdminSubmitButton>
          </div>
        </form>
      </section>

      <section className="admin-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <div className="admin-label">Post List</div>
            <div className="mt-1 text-sm text-neutral-500">
              {filteredPosts.length} of {posts.length} posts shown
            </div>
          </div>
        </div>
        <div className="divide-y divide-slate-200">
          {filteredPosts.map((post) => (
            <article key={post.id} className="grid gap-5 px-6 py-5 xl:grid-cols-[120px_1.5fr_0.8fr_0.7fr_220px] xl:items-center">
              <div className="relative h-24 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                {post.featuredImage ? (
                  <Image
                    src={post.featuredImage}
                    alt={post.featuredImageAlt ?? post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    No image
                  </div>
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {post.featured ? <span className="admin-pill">Featured</span> : null}
                  <span className="admin-pill">{post.published ? "Published" : "Draft"}</span>
                  {post.category ? <span className="admin-pill">{post.category}</span> : null}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-neutral-900">{post.title}</h3>
                <p className="mt-1 font-mono text-xs text-slate-400">{post.slug}</p>
                <p className="mt-2 line-clamp-2 text-sm text-neutral-600">{post.excerpt || post.metaDescription || "No excerpt yet."}</p>
              </div>
              <div className="space-y-2 text-sm text-neutral-600">
                <div>
                  <div className="admin-label">Author</div>
                  <div className="mt-1 font-medium text-neutral-900">{post.author ?? "Altmed Team"}</div>
                </div>
                <div>
                  <div className="admin-label">Publish Date</div>
                  <div className="mt-1 font-medium text-neutral-900">{formatDate(post.publishedAt)}</div>
                </div>
              </div>
              <div>
                <div className="admin-label">Tags</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(post.tags ?? []).length ? (
                    post.tags?.map((tag) => (
                      <span key={tag} className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-neutral-400">No tags</span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-3 xl:justify-end">
                <Link href={`/health-blogs/${post.slug}`} className="admin-secondary-action">
                  Preview
                </Link>
                <Link href={`/admin/blog/${post.id}/edit`} className="admin-secondary-action">
                  Edit
                </Link>
                <form action={deleteBlogPostAction.bind(null, post.id)}>
                  <AdminSubmitButton
                    className="focus-ring inline-flex items-center rounded-full border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700"
                    pendingLabel="Deleting..."
                  >
                    Delete
                  </AdminSubmitButton>
                </form>
              </div>
            </article>
          ))}
          {!filteredPosts.length ? (
            <div className="px-6 py-12 text-center text-sm text-neutral-500">
              No posts match the current filters.
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
