import Link from "next/link";
import { BlogFaqEditor } from "@/components/admin/BlogFaqEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { SEOFieldset } from "@/components/admin/SEOFieldset";
import type { BlogPost, BlogTaxonomy } from "@/lib/api";

type Props = {
  title: string;
  description: string;
  submitLabel: string;
  action: (formData: FormData) => void | Promise<void>;
  post?: BlogPost | null;
  categories?: BlogTaxonomy[];
  tags?: BlogTaxonomy[];
};

function toDateTimeLocal(value?: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60_000);
  return localDate.toISOString().slice(0, 16);
}

export function BlogEditorForm({
  title,
  description,
  submitLabel,
  action,
  post,
  categories = [],
  tags = []
}: Props) {
  return (
    <form action={action} className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-5">
        <section className="admin-card p-5">
          <div className="admin-label">Blog Editor</div>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-900">{title}</h2>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-neutral-600">{description}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-700">Title</span>
              <input
                type="text"
                name="title"
                required
                defaultValue={post?.title ?? ""}
                className="focus-ring w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-neutral-700"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-700">Slug</span>
              <input
                type="text"
                name="slug"
                required
                defaultValue={post?.slug ?? ""}
                className="focus-ring w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-neutral-700"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-700">Category</span>
              <select
                name="category"
                defaultValue={post?.category ?? ""}
                className="focus-ring w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-neutral-700"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Link href="/admin/blog/categories" className="mt-2 inline-block text-xs font-semibold text-primary">
                Manage categories
              </Link>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-700">Author</span>
              <input
                type="text"
                name="author"
                defaultValue={post?.author ?? ""}
                className="focus-ring w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-neutral-700"
              />
            </label>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-700">Excerpt</span>
              <textarea
                name="excerpt"
                rows={4}
                defaultValue={post?.excerpt ?? ""}
                className="focus-ring w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-neutral-700"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-700">Tags</span>
              <select
                name="tags"
                multiple
                defaultValue={post?.tags ?? []}
                className="focus-ring min-h-[120px] w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-neutral-700"
              >
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </select>
              <input type="hidden" name="tagsCsv" value={post?.tags?.join(", ") ?? ""} />
              <p className="mt-2 text-xs text-neutral-500">
                Hold Command/Ctrl to select multiple tags.
              </p>
              <Link href="/admin/blog/tags" className="mt-2 inline-block text-xs font-semibold text-primary">
                Manage tags
              </Link>
            </label>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5">
              <input type="checkbox" name="featured" defaultChecked={post?.featured ?? false} />
              <span className="text-sm font-medium text-neutral-700">Featured post</span>
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5">
              <input type="checkbox" name="published" defaultChecked={post?.published ?? false} />
              <span className="text-sm font-medium text-neutral-700">Published</span>
            </label>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-700">Publish date</span>
              <input
                type="datetime-local"
                name="publishedAt"
                defaultValue={toDateTimeLocal(post?.publishedAt)}
                className="focus-ring w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-neutral-700"
              />
            </label>
          </div>
          <input type="hidden" name="existingFeaturedImage" value={post?.featuredImage ?? ""} />
        </section>

        <section className="admin-card p-5">
          <RichTextEditor
            name="body"
            label="Article body"
            value={post?.body ?? ""}
            rows={18}
            placeholder="Write the full article body in HTML or rich text-friendly markup."
          />
        </section>

        <BlogFaqEditor defaultFaqs={post?.faqs} />
      </div>

      <div className="space-y-5">
        <ImageUpload
          fileInputName="imageFile"
          urlInputName="featuredImage"
          altInputName="featuredImageAlt"
          defaultUrl={post?.featuredImage}
          defaultAlt={post?.featuredImageAlt}
        />
        <SEOFieldset
          metaTitle={post?.metaTitle}
          metaDescription={post?.metaDescription}
          metaKeywords={post?.metaKeywords}
          canonicalUrl={post?.canonicalUrl}
        />
        <section className="admin-card p-5">
          <div className="space-y-3">
            <button
              type="submit"
              className="focus-ring w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"
            >
              {submitLabel}
            </button>
            <Link
              href="/admin/blog"
              className="focus-ring block w-full rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-neutral-700"
            >
              Back to blog manager
            </Link>
          </div>
        </section>
      </div>
    </form>
  );
}
