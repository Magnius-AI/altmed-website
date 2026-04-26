import type { Metadata } from "next";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { SchemaOrg } from "@/components/public/SchemaOrg";
import { getBlogPost, getBlogPosts } from "@/lib/api";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { buildBookingUrl, publicRoutes } from "@/lib/site-content";

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, posts] = await Promise.all([getBlogPost(params.slug), getBlogPosts()]);
  const related = posts.filter((entry: { slug: string }) => entry.slug !== post.slug).slice(0, 3);
  const headings = Array.from(post.body.matchAll(/<h2>(.*?)<\/h2>/g)).map((match) => match[1]);

  return (
    <main className="container-shell py-16">
      <SchemaOrg
        schema={buildBreadcrumbSchema([
          { name: "Home", item: "https://altmedfirst.com" },
          { name: "Health Blogs", item: `https://altmedfirst.com${publicRoutes.blog}` },
          { name: post.title, item: `https://altmedfirst.com${publicRoutes.blogPost(post.slug)}` }
        ])}
      />
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {post.category ?? "Health Article"}
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-neutral-900 md:text-[3rem]">{post.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-700">{post.excerpt}</p>
          <div className="mt-6 text-xs uppercase tracking-[0.14em] text-neutral-400">
            {post.author ? `${post.author} • ` : ""}
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            }) : "Updated recently"}
          </div>
        </div>
        <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] border border-slate-200">
          <Image
            src={post.featuredImage ?? "/legacy-assets/homepage/clinic-front-view.jpg"}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </section>
      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
        <article className="prose-lite rounded-[2rem] border border-slate-200 bg-white p-8">
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </article>
        <aside className="space-y-5">
          {headings.length ? (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                In This Article
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-700">
                {headings.map((heading) => (
                  <li key={heading}>• {heading}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="rounded-[2rem] bg-primary px-6 py-6 text-white">
            <h2 className="text-2xl font-semibold">Need care now?</h2>
            <p className="mt-3 text-sm leading-7 text-slate-100">
              If this article matches what you&apos;re dealing with, our Manassas team can help you
              choose the right next step.
            </p>
            <a
              href={buildBookingUrl("blog_post", post.slug)}
              className="mt-5 inline-flex rounded-full bg-white px-5 py-3 font-semibold text-primary"
            >
              Schedule now
            </a>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-neutral-700">
            This article is for general educational purposes only and does not replace an in-person
            medical evaluation.
          </div>
        </aside>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-neutral-900">Related Posts</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {related.map((item: { slug: string; title: string }) => (
            <Link
              key={item.slug}
              href={publicRoutes.blogPost(item.slug) as Route}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-5"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
