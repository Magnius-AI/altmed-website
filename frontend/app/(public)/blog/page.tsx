import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/public/BlogCard";
import { BlogPost, getBlogPosts } from "@/lib/api";
import { blogCategories, buildBookingUrl, legacyAssets } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Health Blogs | Medical Tips & Manassas Healthcare News | Altmed",
  description:
    "Health tips, urgent care advice, weight loss news, and occupational medicine updates from Altmed Medical Center."
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const remaining = posts.filter((post) => post.slug !== featured?.slug);
  const categoryPills = Array.from(
    new Set([
      ...blogCategories,
      ...posts.map((post) => post.category).filter((value): value is string => Boolean(value))
    ])
  );

  return (
    <main className="container-shell py-16">
      <div className="max-w-4xl">
        <div className="inline-flex rounded-full bg-[#eef4fb] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Health Education
        </div>
        <h1 className="mt-5 text-4xl font-bold leading-[1.14] text-neutral-900">Health Insights from Your Manassas Medical Team</h1>
        <p className="mt-4 text-lg leading-8 text-neutral-700">
          Explore educational articles on urgent care, primary care, DOT health, weight loss,
          occupational medicine, addiction management, telehealth, and preventive wellness from Altmed Medical Center.
        </p>
      </div>
      {featured ? (
        <section className="mt-10 grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Featured Article
            </div>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.16] text-neutral-900 md:text-4xl">{featured.title}</h2>
            <p className="mt-4 text-base leading-8 text-neutral-700">{featured.excerpt}</p>
            <div className="mt-5 text-xs uppercase tracking-[0.14em] text-neutral-400">
              {featured.category} • {featured.author} • {featured.publishedAt ? new Date(featured.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              }) : "Recent"}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href={`/health-blogs/${featured.slug}` as Route}
                className="rounded-full bg-accent px-5 py-3 font-semibold text-white transition hover:bg-accent-dark"
              >
                Read Featured Article
              </Link>
              <a
                href={buildBookingUrl("blog_index", "featured_cta")}
                className="rounded-full border border-primary px-5 py-3 font-semibold text-primary"
              >
                Book Appointment
              </a>
            </div>
          </div>
          <div
            className="min-h-[340px] rounded-[1.5rem] border border-slate-200 bg-cover bg-center"
            style={{ backgroundImage: `url(${featured.featuredImage ?? legacyAssets.heroClinic})` }}
          />
        </section>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-3">
        {categoryPills.map((category) => (
          <span key={category} className="rounded-full bg-neutral-100 px-4 py-2 text-sm">
            {category}
          </span>
        ))}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {(remaining.length ? remaining : posts).map((post: BlogPost) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
