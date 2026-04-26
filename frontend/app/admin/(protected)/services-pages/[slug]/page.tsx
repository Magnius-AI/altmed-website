import { notFound } from "next/navigation";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { SEOFieldset } from "@/components/admin/SEOFieldset";
import { getServicePage } from "@/lib/api";
import { updateServicePageAction } from "./actions";

type Props = {
  params: {
    slug: string;
  };
};

export default async function AdminServicePageEditor({ params }: Props) {
  const page = await getServicePage(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <form action={updateServicePageAction.bind(null, params.slug)} className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <section className="admin-card p-6">
          <div className="admin-label">Service Page</div>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-900">{page.name}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-700">Service name</span>
              <input
                type="text"
                name="name"
                defaultValue={page.name}
                className="focus-ring w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
              />
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700">
              <input type="checkbox" name="isActive" defaultChecked={page.isActive ?? true} />
              Active page
            </label>
          </div>
          <input type="hidden" name="existingFeaturedImage" value={page.featuredImage ?? ""} />
        </section>

        <section className="admin-card p-6">
          <RichTextEditor
            name="heroContent"
            label="Hero content"
            value={page.heroContent}
            rows={8}
          />
        </section>

        <section className="admin-card p-6">
          <RichTextEditor
            name="bodyContent"
            label="Body content"
            value={page.bodyContent}
            rows={18}
          />
        </section>
      </div>

      <div className="space-y-6">
        <ImageUpload
          fileInputName="imageFile"
          urlInputName="featuredImage"
          defaultUrl={page.featuredImage}
          altInputName="serviceImageAlt"
          label="Service image"
        />
        <SEOFieldset
          metaTitle={page.metaTitle}
          metaDescription={page.metaDescription}
          metaKeywords={page.metaKeywords}
        />
        <button
          type="submit"
          className="focus-ring w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white"
        >
          Save service page
        </button>
      </div>
    </form>
  );
}
