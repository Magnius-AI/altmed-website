import { BlogEditorForm } from "@/components/admin/BlogEditorForm";
import { getAdminBlogCategories, getAdminBlogTags } from "@/lib/api";
import { createBlogPostAction } from "../actions";

export default async function AdminBlogNewPage() {
  const [categories, tags] = await Promise.all([getAdminBlogCategories(), getAdminBlogTags()]);

  return (
    <BlogEditorForm
      title="Create blog post"
      description="Add a draft or publish immediately with SEO metadata, tags, and a featured image."
      submitLabel="Create post"
      action={createBlogPostAction}
      categories={categories}
      tags={tags}
    />
  );
}
