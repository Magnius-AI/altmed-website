import { notFound } from "next/navigation";
import { BlogEditorForm } from "@/components/admin/BlogEditorForm";
import { getAdminBlogCategories, getAdminBlogPost, getAdminBlogTags } from "@/lib/api";
import { updateBlogPostAction } from "../../actions";

type Props = {
  params: {
    id: string;
  };
};

export default async function AdminBlogEditPage({ params }: Props) {
  const [post, categories, tags] = await Promise.all([
    getAdminBlogPost(params.id),
    getAdminBlogCategories(),
    getAdminBlogTags()
  ]);

  if (!post) {
    notFound();
  }

  return (
    <BlogEditorForm
      title="Edit blog post"
      description="Update content, publication status, SEO metadata, and the featured image for this article."
      submitLabel="Save changes"
      action={updateBlogPostAction.bind(null, params.id)}
      post={post}
      categories={categories}
      tags={tags}
    />
  );
}
