import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
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

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const remaining = posts.filter((post) => post.slug !== featured?.slug);
  const categoryPills = ["All", "Urgent Care", "Weight Loss", "DOT & Occupational", "Addiction", "Primary Care"];

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
      {featured ? (
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
          <div
            className="site-photo min-h-[340px] rounded-lg border border-[var(--color-border)] bg-cover bg-center"
            style={{ backgroundImage: `url(${featured.featuredImage ?? aiAssets.primaryCareConsultation})` }}
          />
        </section>
      ) : null}
      <div role="tablist" aria-label="Article categories" className="mt-6 flex flex-wrap gap-3">
        {categoryPills.map((category) => (
          <a key={category} href="#articles" role="tab" aria-selected={category === "All"} className="pill-tag px-4 py-2">
            {category}
          </a>
        ))}
      </div>
      <div id="articles" className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {(remaining.length ? remaining : posts).map((post: BlogPost) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-10">
        <Link href={publicRoutes.services as Route} className="inline-flex items-center font-bold text-[var(--color-primary)] underline-offset-4 hover:underline">
          Browse care services
        </Link>
      </div>
      </div>
    </main>
  );
}
