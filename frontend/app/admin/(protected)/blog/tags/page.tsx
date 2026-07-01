import { BlogTaxonomyManager } from "@/components/admin/BlogTaxonomyManager";
import { getAdminBlogTags } from "@/lib/api";
import { createBlogTagAction, deleteBlogTagAction, updateBlogTagAction } from "../actions";

type Props = {
  searchParams?: {
    search?: string;
    status?: string;
  };
};

export default async function AdminBlogTagsPage({ searchParams }: Props) {
  const tags = await getAdminBlogTags();

  return (
    <BlogTaxonomyManager
      kind="tag"
      title="Tag library"
      description="Maintain reusable keywords and topics that editors can apply directly from the post form."
      items={tags}
      search={searchParams?.search}
      status={searchParams?.status}
      createAction={createBlogTagAction}
      updateAction={updateBlogTagAction}
      deleteAction={deleteBlogTagAction}
    />
  );
}
