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
  return (
    <article className="overflow-hidden rounded-[16px] border border-[rgba(18,52,77,0.08)] bg-white transition hover:-translate-y-1">
      <div className="relative h-56 bg-[var(--color-primary-light)]">
        <Image
          src={post.featuredImage ?? "/legacy-assets/homepage/clinic-front-view.jpg"}
          alt={post.title}
          fill
          className="object-cover transition duration-300 hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          {post.category ? (
            <span className="rounded-[10px] bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              {post.category}
            </span>
          ) : (
            <span />
          )}
          {("featured" in post && (post as { featured?: boolean }).featured) ? (
            <span className="rounded-[10px] bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
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
