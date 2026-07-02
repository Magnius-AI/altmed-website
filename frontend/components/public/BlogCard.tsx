import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aiAssets, publicRoutes } from "@/lib/site-content";

type Props = {
  post: {
    slug: string;
    title: string;
    excerpt?: string;
    category?: string;
    publishedAt?: string;
    author?: string;
    featuredImage?: string | null;
    tags?: string[] | null;
    featured?: boolean;
  };
};

function tagHref(tag: string) {
  return `/health-blogs?tag=${encodeURIComponent(tag)}#articles`;
}

export function BlogCard({ post }: Props) {
  const readTime = Math.max(3, Math.ceil(`${post.title} ${post.excerpt ?? ""}`.split(/\s+/).length / 90));
  const tags = (post.tags ?? []).slice(0, 3);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-white transition hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(28,43,39,0.08)]">
      <div className="relative h-48 bg-white md:h-52 xl:h-56">
        <Image
          src={post.featuredImage ?? aiAssets.primaryCareConsultation}
          alt={`${post.title} from Altmed Medical Center in Manassas VA`}
          fill
          className="site-photo object-cover object-top"
        />
        {("featured" in post && (post as { featured?: boolean }).featured) ? (
          <div className="absolute right-4 top-4">
            <span className="rounded-md border border-white/80 bg-white/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)] shadow-[0_8px_18px_rgba(18,48,40,0.12)] backdrop-blur-sm">
              Featured
            </span>
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        {post.category ? (
          <div className="-ml-1 mb-4 flex">
            <span className="inline-flex max-w-full items-center rounded-md border border-[rgba(183,90,29,0.16)] bg-[rgba(255,243,233,0.72)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-[var(--color-accent)]">
              {post.category}
            </span>
          </div>
        ) : null}
        <h3 className="text-[1.35rem] font-semibold leading-[1.2] text-[var(--color-text-dark)] md:text-[1.45rem]">{post.title}</h3>
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
        {tags.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={tagHref(tag) as Route}
                className="focus-ring -mb-1 rounded-full border border-[rgba(18,93,75,0.16)] bg-[rgba(18,93,75,0.06)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)] shadow-[0_5px_14px_rgba(18,93,75,0.08)] transition hover:bg-[var(--color-primary)] hover:text-white"
              >
                #{tag}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      <Link
        href={publicRoutes.blogPost(post.slug) as Route}
        className="mx-6 mb-6 inline-flex items-center gap-2 font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline md:mx-7 md:mb-7"
      >
        Read article
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}
