import { BlogTaxonomyManager } from "@/components/admin/BlogTaxonomyManager";
import { getAdminBlogCategories } from "@/lib/api";
import {
  createBlogCategoryAction,
  deleteBlogCategoryAction,
  updateBlogCategoryAction
} from "../actions";

type Props = {
  searchParams?: {
    search?: string;
    status?: string;
  };
};

export default async function AdminBlogCategoriesPage({ searchParams }: Props) {
  const categories = await getAdminBlogCategories();

  return (
    <BlogTaxonomyManager
      kind="category"
      title="Category management"
      description="Define the main editorial lanes for the blog so the archive, filters, and editor stay consistent."
      items={categories}
      search={searchParams?.search}
      status={searchParams?.status}
      createAction={createBlogCategoryAction}
      updateAction={updateBlogCategoryAction}
      deleteAction={deleteBlogCategoryAction}
    />
  );
}
