import type { Metadata } from "next";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { BlogCard } from "@/components/public/BlogCard";
import { BlogPost, getBlogPosts } from "@/lib/api";
import { buildPageMetadata } from "@/lib/metadata";
import { aiAssets, buildBookingUrl, publicRoutes } from "@/lib/site-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Health Blog | Medical Tips & Manassas VA Health News | Altmed Medical Center",
  description:
    "Patient-friendly articles on urgent care, weight loss, occupational health, telehealth, and preventive care from Altmed Medical Center in Manassas.",
  path: "/health-blogs",
  image: aiAssets.primaryCareConsultation
});

const PAGE_SIZE = 6;

type BlogPageProps = {
  searchParams?: {
    search?: string;
    category?: string;
    tag?: string;
    page?: string;
  };
};

type BlogQuery = {
  search?: string;
  category?: string;
  tag?: string;
  page?: number;
};

function normalize(value?: string | null) {
  return String(value ?? "").trim().toLowerCase();
}

function postText(post: BlogPost) {
  return [
    post.title,
    post.excerpt
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function getTaxonomyCounts(posts: BlogPost[], getValues: (post: BlogPost) => Array<string | null | undefined>) {
  const counts = new Map<string, number>();

  posts.forEach((post) => {
    getValues(post).forEach((value) => {
      const name = value?.trim();
      if (!name) {
        return;
      }
      counts.set(name, (counts.get(name) ?? 0) + 1);
    });
  });

  return [...counts.entries()].sort((first, second) => {
    const countDiff = second[1] - first[1];
    return countDiff || first[0].localeCompare(second[0]);
  });
}

function findSelected(values: string[], requested?: string) {
  const normalized = normalize(requested);
  if (!normalized) {
    return "";
  }

  return values.find((value) => normalize(value) === normalized) ?? "";
}

function parsePage(value?: string) {
  const page = Number(value);
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

function buildBlogHref(current: BlogQuery, updates: BlogQuery = {}) {
  const next = { ...current, ...updates };
  const params = new URLSearchParams();

  if (next.search?.trim()) {
    params.set("search", next.search.trim());
  }
  if (next.category?.trim()) {
    params.set("category", next.category.trim());
  }
  if (next.tag?.trim()) {
    params.set("tag", next.tag.trim());
  }
  if (next.page && next.page > 1) {
    params.set("page", String(next.page));
  }

  const query = params.toString();
  return `/health-blogs${query ? `?${query}` : ""}#articles`;
}

function pageNumbers(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
  return [...pages].filter((page) => page >= 1 && page <= totalPages).sort((first, second) => first - second);
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const posts = await getBlogPosts();
  const categoryEntries = getTaxonomyCounts(posts, (post) => [post.category]);
  const tagEntries = getTaxonomyCounts(posts, (post) => post.tags ?? []);
  const categories = categoryEntries.map(([category]) => category);
  const tags = tagEntries.map(([tag]) => tag);
  const search = searchParams?.search?.trim() ?? "";
  const selectedCategory = findSelected(categories, searchParams?.category);
  const selectedTag = findSelected(tags, searchParams?.tag);
  const activeFilters = Boolean(search || selectedCategory || selectedTag);
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const searchablePosts = activeFilters ? posts : posts.filter((post) => post.slug !== featured?.slug);
  const filteredPosts = searchablePosts.filter((post) => {
    const matchesSearch = !search || postText(post).includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || normalize(post.category) === normalize(selectedCategory);
    const matchesTag =
      !selectedTag || (post.tags ?? []).some((tag) => normalize(tag) === normalize(selectedTag));

    return matchesSearch && matchesCategory && matchesTag;
  });
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const currentPage = Math.min(parsePage(searchParams?.page), totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageEnd = pageStart + PAGE_SIZE;
  const visiblePosts = filteredPosts.slice(pageStart, pageEnd);
  const currentQuery: BlogQuery = {
    search,
    category: selectedCategory,
    tag: selectedTag,
    page: currentPage
  };
  const shownStart = filteredPosts.length ? pageStart + 1 : 0;
  const shownEnd = Math.min(pageEnd, filteredPosts.length);

  return (
    <main className="bg-[var(--color-bg)]">
      <div className="container-shell py-16 md:py-24">
        <div className="max-w-4xl">
          <div className="section-label">
            Health Education
          </div>
          <h1 className="mt-5 text-4xl leading-[1.14] text-[var(--color-text-primary)]">Articles written for patients, not search engines.</h1>
          <p className="mt-4 text-lg leading-8 text-[var(--color-text-secondary)]">
            Explore educational articles on urgent care, primary care, DOT health, weight loss,
            occupational medicine, addiction management, telehealth, and preventive wellness from Altmed Medical Center.
          </p>
        </div>
        {featured && !activeFilters ? (
          <section className="mt-10 grid gap-8 rounded-lg border border-[var(--color-border)] bg-white p-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="section-label">
                Featured Article
              </div>
              <h2 className="mt-3 text-3xl font-semibold leading-[1.16] text-[var(--color-text-primary)] md:text-4xl">{featured.title}</h2>
              <p className="mt-4 text-base leading-8 text-[var(--color-text-secondary)]">{featured.excerpt}</p>
              <div className="mt-5 text-xs uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                {featured.category} • {featured.author} • {featured.publishedAt ? new Date(featured.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                }) : "Recent"} • Updated recently • 4 min read
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href={`/health-blogs/${featured.slug}` as Route}
                  className="btn-outline-dark"
                >
                  Read Featured Article
                </Link>
                <a
                  href={buildBookingUrl("blog_index", "featured_cta")}
                  className="btn-accent"
                >
                  Book Appointment
                </a>
              </div>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] lg:min-h-[360px]">
              <Image
                src={featured.featuredImage ?? aiAssets.primaryCareConsultation}
                alt={featured.featuredImageAlt ?? `${featured.title} from Altmed Medical Center`}
                fill
                className="site-photo object-cover object-top"
                sizes="(min-width: 1024px) 45vw, 100vw"
                priority
              />
            </div>
          </section>
        ) : null}

        <section id="articles" className="mt-12 scroll-mt-28">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div aria-label="Article categories" className="flex flex-wrap justify-center gap-4 xl:justify-start">
            <Link
              href={buildBlogHref(currentQuery, { category: "", tag: "", page: 1 }) as Route}
              aria-current={!selectedCategory ? "page" : undefined}
              className={
                !selectedCategory
                  ? "focus-ring inline-flex min-h-14 items-center rounded-lg bg-[var(--color-primary)] px-7 text-lg font-semibold text-white shadow-[0_12px_24px_rgba(18,93,75,0.18)]"
                  : "focus-ring inline-flex min-h-14 items-center rounded-lg bg-[rgba(18,93,75,0.06)] px-7 text-lg font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-primary)] hover:text-white"
              }
            >
              All
            </Link>
            {categoryEntries.map(([category]) => (
              <Link
                key={category}
                href={buildBlogHref(currentQuery, { category, tag: "", page: 1 }) as Route}
                aria-current={selectedCategory === category ? "page" : undefined}
                className={
                  selectedCategory === category
                    ? "focus-ring inline-flex min-h-14 items-center rounded-lg bg-[var(--color-primary)] px-7 text-lg font-semibold text-white shadow-[0_12px_24px_rgba(18,93,75,0.18)]"
                    : "focus-ring inline-flex min-h-14 items-center rounded-lg bg-[rgba(18,93,75,0.06)] px-7 text-lg font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-primary)] hover:text-white"
                }
              >
                {category}
              </Link>
            ))}
            </div>
            <div className="flex w-full max-w-sm flex-col gap-2 self-center xl:self-auto">
              <form action="/health-blogs#articles" className="flex w-full gap-2">
                {selectedCategory ? <input type="hidden" name="category" value={selectedCategory} /> : null}
                {selectedTag ? <input type="hidden" name="tag" value={selectedTag} /> : null}
                <label className="sr-only" htmlFor="blog-search">
                  Search articles
                </label>
                <input
                  id="blog-search"
                  type="search"
                  name="search"
                  defaultValue={search}
                  placeholder="Search title or excerpt"
                  className="focus-ring h-12 min-w-0 flex-1 rounded-lg border border-[var(--color-border)] bg-white px-4 text-sm text-[var(--color-text-primary)] shadow-sm"
                />
                <button
                  type="submit"
                  className="focus-ring inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white shadow-[0_10px_20px_rgba(18,93,75,0.16)] transition hover:bg-[var(--color-text-primary)]"
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </button>
              </form>
              {activeFilters ? (
                <Link
                  href={"/health-blogs#articles" as Route}
                  className="focus-ring inline-flex w-fit items-center gap-2 self-end rounded-md px-2 py-1 text-sm font-semibold text-[var(--color-primary)] underline-offset-4 transition hover:underline"
                >
                  <X className="h-4 w-4" />
                  Clear filters
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="section-label">Article Results</div>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              Showing {shownStart}-{shownEnd} of {filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"}
            </p>
          </div>
          {activeFilters ? (
            <p className="text-sm text-[var(--color-text-secondary)]">
              Filtered from {posts.length} published article{posts.length === 1 ? "" : "s"}
            </p>
          ) : null}
        </div>

        {visiblePosts.length ? (
          <div className="mt-7 grid gap-8 lg:grid-cols-2">
            {visiblePosts.map((post: BlogPost) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-lg border border-[var(--color-border)] bg-white p-8 text-center">
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">No articles found</h2>
            <p className="mt-2 text-[var(--color-text-secondary)]">Try a different search, category, or tag.</p>
            <Link href={"/health-blogs#articles" as Route} className="btn-outline-dark mt-5">
              Reset blog filters
            </Link>
          </div>
        )}

        {totalPages > 1 ? (
          <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Blog pagination">
            <Link
              href={buildBlogHref(currentQuery, { page: Math.max(1, currentPage - 1) }) as Route}
              aria-disabled={currentPage === 1}
              className={`focus-ring inline-flex h-11 items-center gap-1 rounded-md border border-[var(--color-border)] px-4 text-sm font-semibold transition ${
                currentPage === 1 ? "pointer-events-none opacity-45" : "hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Link>
            {pageNumbers(currentPage, totalPages).map((page, index, pages) => (
              <span key={page} className="inline-flex items-center gap-2">
                {index > 0 && page - pages[index - 1] > 1 ? (
                  <span className="px-1 text-sm text-[var(--color-text-secondary)]">...</span>
                ) : null}
                <Link
                  href={buildBlogHref(currentQuery, { page }) as Route}
                  aria-current={page === currentPage ? "page" : undefined}
                  className={`focus-ring inline-flex h-11 min-w-11 items-center justify-center rounded-md border px-3 text-sm font-semibold transition ${
                    page === currentPage
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                      : "border-[var(--color-border)] bg-white text-[var(--color-text-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  {page}
                </Link>
              </span>
            ))}
            <Link
              href={buildBlogHref(currentQuery, { page: Math.min(totalPages, currentPage + 1) }) as Route}
              aria-disabled={currentPage === totalPages}
              className={`focus-ring inline-flex h-11 items-center gap-1 rounded-md border border-[var(--color-border)] px-4 text-sm font-semibold transition ${
                currentPage === totalPages ? "pointer-events-none opacity-45" : "hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              }`}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Link>
          </nav>
        ) : null}

        <div className="mt-10">
          <Link href={publicRoutes.services as Route} className="inline-flex items-center font-bold text-[var(--color-primary)] underline-offset-4 hover:underline">
            Browse care services
          </Link>
        </div>
      </div>
    </main>
  );
}
