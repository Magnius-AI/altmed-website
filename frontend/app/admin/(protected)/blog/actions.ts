"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { adminJsonRequest, uploadAdminImage } from "@/lib/admin-api";

function toBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

function toStringArray(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toMultiStringArray(formData: FormData, name: string) {
  const values = formData
    .getAll(name)
    .map((value) => String(value).trim())
    .filter(Boolean);

  if (values.length > 0) {
    return values;
  }

  return toStringArray(formData.get(`${name}Csv`));
}

function parseBlogFaqs(formData: FormData) {
  const rawFaqs = String(formData.get("faqsJson") ?? "").trim();
  if (!rawFaqs) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawFaqs) as Array<{ question?: string; answer?: string }>;
    return parsed
      .map((faq) => ({
        question: String(faq.question ?? "").trim(),
        answer: String(faq.answer ?? "").trim()
      }))
      .filter((faq) => faq.question && faq.answer);
  } catch {
    return [];
  }
}

async function resolveImageUrl(formData: FormData) {
  const uploaded = await uploadAdminImage(formData.get("imageFile") as File | null);
  return uploaded?.url ?? (String(formData.get("featuredImage") ?? "").trim() || undefined);
}

function buildBlogPayload(
  formData: FormData,
  featuredImage?: string | null,
  options: { clearFeaturedImage?: boolean } = {}
) {
  const published = toBoolean(formData.get("published"));
  const publishedAtValue = String(formData.get("publishedAt") ?? "").trim();

  return {
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim() || undefined,
    category: String(formData.get("category") ?? "").trim() || undefined,
    author: String(formData.get("author") ?? "").trim() || undefined,
    body: String(formData.get("body") ?? "").trim(),
    featuredImage,
    featuredImageAlt: options.clearFeaturedImage
      ? null
      : String(formData.get("featuredImageAlt") ?? "").trim() || undefined,
    metaTitle: String(formData.get("metaTitle") ?? "").trim() || undefined,
    metaDescription: String(formData.get("metaDescription") ?? "").trim() || undefined,
    metaKeywords: String(formData.get("metaKeywords") ?? "").trim() || undefined,
    canonicalUrl: String(formData.get("canonicalUrl") ?? "").trim() || undefined,
    tags: toMultiStringArray(formData, "tags"),
    faqs: parseBlogFaqs(formData),
    featured: toBoolean(formData.get("featured")),
    published,
    publishedAt: publishedAtValue ? new Date(publishedAtValue).toISOString() : undefined
  };
}

function revalidateBlogContent(slug?: string, previousSlug?: string) {
  const slugs = [slug, previousSlug].filter((value): value is string => Boolean(value));

  revalidateTag("blog-posts");
  revalidatePath("/");
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/health-blogs");

  Array.from(new Set(slugs)).forEach((value) => {
    revalidatePath(`/blog/${value}`);
    revalidatePath(`/health-blogs/${value}`);
  });
}

function savedRedirect(path: string, saved: string): never {
  redirect(`${path}?saved=${saved}&toast=${Date.now()}`);
}

export async function createBlogPostAction(formData: FormData) {
  const featuredImage = await resolveImageUrl(formData);
  const payload = buildBlogPayload(formData, featuredImage);
  const post = await adminJsonRequest<{ id: string; slug?: string }>("/api/blog", "POST", payload);

  revalidateBlogContent(post.slug ?? payload.slug);
  savedRedirect(`/admin/blog/${post.id}/edit`, "created");
}

export async function updateBlogPostAction(id: string, formData: FormData) {
  const existingImage = String(formData.get("existingFeaturedImage") ?? "").trim() || undefined;
  const removeFeaturedImage = toBoolean(formData.get("removeFeaturedImage"));
  const resolvedImage = await resolveImageUrl(formData);
  const featuredImage = resolvedImage ?? (removeFeaturedImage ? null : existingImage);
  const previousSlug = String(formData.get("existingSlug") ?? "").trim() || undefined;
  const payload = buildBlogPayload(formData, featuredImage, {
    clearFeaturedImage: featuredImage === null
  });

  await adminJsonRequest(`/api/blog/${id}`, "PATCH", payload);

  revalidateBlogContent(payload.slug, previousSlug);
  revalidatePath(`/admin/blog/${id}/edit`);
  savedRedirect(`/admin/blog/${id}/edit`, "updated");
}

export async function deleteBlogPostAction(id: string) {
  await adminJsonRequest(`/api/blog/${id}`, "DELETE");
  revalidateBlogContent();
  savedRedirect("/admin/blog", "deleted");
}

function buildTaxonomyPayload(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim() || undefined,
    description: String(formData.get("description") ?? "").trim() || undefined,
    isActive: toBoolean(formData.get("isActive"))
  };
}

export async function createBlogCategoryAction(formData: FormData) {
  await adminJsonRequest("/api/blog/admin/categories", "POST", buildTaxonomyPayload(formData));
  revalidatePath("/admin/blog/categories");
  revalidatePath("/admin/blog");
}

export async function updateBlogCategoryAction(id: string, formData: FormData) {
  await adminJsonRequest(`/api/blog/admin/categories/${id}`, "PATCH", buildTaxonomyPayload(formData));
  revalidatePath("/admin/blog/categories");
  revalidatePath("/admin/blog");
}

export async function deleteBlogCategoryAction(id: string) {
  await adminJsonRequest(`/api/blog/admin/categories/${id}`, "DELETE");
  revalidatePath("/admin/blog/categories");
  revalidatePath("/admin/blog");
}

export async function createBlogTagAction(formData: FormData) {
  await adminJsonRequest("/api/blog/admin/tags", "POST", buildTaxonomyPayload(formData));
  revalidatePath("/admin/blog/tags");
  revalidatePath("/admin/blog");
}

export async function updateBlogTagAction(id: string, formData: FormData) {
  await adminJsonRequest(`/api/blog/admin/tags/${id}`, "PATCH", buildTaxonomyPayload(formData));
  revalidatePath("/admin/blog/tags");
  revalidatePath("/admin/blog");
}

export async function deleteBlogTagAction(id: string) {
  await adminJsonRequest(`/api/blog/admin/tags/${id}`, "DELETE");
  revalidatePath("/admin/blog/tags");
  revalidatePath("/admin/blog");
}
