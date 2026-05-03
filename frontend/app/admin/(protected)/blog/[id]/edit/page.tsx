import { notFound } from "next/navigation";
import { AdminToast } from "@/components/admin/AdminToast";
import { BlogEditorForm } from "@/components/admin/BlogEditorForm";
import { getAdminBlogCategories, getAdminBlogPost, getAdminBlogTags } from "@/lib/api";
import { updateBlogPostAction } from "../../actions";

type Props = {
  params: {
    id: string;
  };
  searchParams?: {
    saved?: string;
  };
};

function noticeMessage(saved?: string) {
  if (saved === "created") {
    return "Blog post created successfully.";
  }

  if (saved === "updated") {
    return "Blog post saved successfully.";
  }

  return null;
}

export default async function AdminBlogEditPage({ params, searchParams }: Props) {
  const [post, categories, tags] = await Promise.all([
    getAdminBlogPost(params.id),
    getAdminBlogCategories(),
    getAdminBlogTags()
  ]);

  if (!post) {
    notFound();
  }

  return (
    <>
      <AdminToast message={noticeMessage(searchParams?.saved)} />
      <BlogEditorForm
        title="Edit blog post"
        description="Update content, publication status, SEO metadata, and the featured image for this article."
        submitLabel="Save changes"
        action={updateBlogPostAction.bind(null, params.id)}
        post={post}
        categories={categories}
        tags={tags}
      />
    </>
  );
}
