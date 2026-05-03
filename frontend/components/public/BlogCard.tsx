import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";
import { publicRoutes } from "@/lib/site-content";

type Props = {
  post: {
    slug: string;
    title: string;
    excerpt?: string;
    category?: string;
    publishedAt?: string;
    author?: string;
    featuredImage?: string | null;
  };
};

export function BlogCard({ post }: Props) {
  const readTime = Math.max(3, Math.ceil(`${post.title} ${post.excerpt ?? ""}`.split(/\s+/).length / 90));

  return (
    <article className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-white transition hover:-translate-y-1">
      <div className="relative h-48 bg-[var(--color-surface-alt)]">
        <Image
          src={post.featuredImage ?? "/legacy-assets/homepage/top.jpg"}
          alt={`${post.title} from Altmed Medical Center in Manassas VA`}
          fill
          className="site-photo object-cover transition duration-300 hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          {post.category ? (
            <span className="rounded-md bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {post.category}
            </span>
          ) : (
            <span />
          )}
          {("featured" in post && (post as { featured?: boolean }).featured) ? (
            <span className="rounded-md bg-[var(--color-primary)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              Featured
            </span>
          ) : null}
        </div>
      </div>
      <div className="p-7">
        <h3 className="mt-3 text-[1.55rem] font-semibold leading-[1.18] text-[var(--color-text-dark)]">{post.title}</h3>
        <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{post.excerpt}</p>
        <div className="mt-5 text-xs uppercase tracking-[0.14em] text-[rgba(82,102,121,0.75)]">
          {post.author ? `${post.author} • ` : ""}
          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          }) : "Updated recently"}
          {` • ${readTime} min read`}
        </div>
      </div>
      <Link
        href={publicRoutes.blogPost(post.slug) as Route}
        className="mx-7 mb-7 inline-flex font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline"
      >
        Read article
      </Link>
    </article>
  );
}
