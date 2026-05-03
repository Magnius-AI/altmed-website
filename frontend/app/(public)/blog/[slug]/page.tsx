import type { Metadata } from "next";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { FAQAccordion } from "@/components/public/FAQAccordion";
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
  const blogFaqs = (post.faqs ?? []).filter((faq) => faq.question && faq.answer);
  const readTime = Math.max(4, Math.ceil(post.body.replace(/<[^>]+>/g, " ").split(/\s+/).length / 180));

  return (
    <main className="bg-[var(--color-bg)]">
      <div className="container-shell py-16 md:py-24">
      <SchemaOrg
        schema={buildBreadcrumbSchema([
          { name: "Home", item: "https://stage.altmedfirst.com" },
          { name: "Health Blogs", item: `https://stage.altmedfirst.com${publicRoutes.blog}` },
          { name: post.title, item: `https://stage.altmedfirst.com${publicRoutes.blogPost(post.slug)}` }
        ])}
      />
      {blogFaqs.length ? (
        <SchemaOrg
          schema={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: blogFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          }}
        />
      ) : null}
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="section-label">
            {post.category ?? "Health Article"}
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.14] text-[var(--color-text-primary)] md:text-[3rem]">{post.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)]">{post.excerpt}</p>
          <div className="mt-6 text-xs uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
            {post.author ? `${post.author} • ` : ""}
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            }) : "Updated recently"} • Last updated recently • {readTime} min read
          </div>
        </div>
        <div className="relative min-h-[340px] overflow-hidden rounded-lg border border-[var(--color-border)]">
          <Image
            src={post.featuredImage ?? "/legacy-assets/homepage/clinic-front-view.jpg"}
            alt={post.featuredImageAlt ?? post.title}
            fill
            className="site-photo object-cover"
          />
        </div>
      </section>
      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
        <article className="prose-lite rounded-lg border border-[var(--color-border)] bg-white p-8">
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
          <div className="mt-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5">
            <h2 className="text-2xl">Care connected to this topic</h2>
            <p className="mt-3 text-base leading-8 text-[var(--color-text-secondary)]">
              Altmed Medical Center offers urgent care, primary care, occupational health,
              telehealth, and medical weight-loss services in Manassas. If this article matches
              what you are dealing with, our team can help you choose the right service.
            </p>
            <a href={buildBookingUrl("blog_post_topic_cta", post.slug)} className="btn-primary mt-5">
              Book Appointment
            </a>
          </div>
        </article>
        <aside className="space-y-5">
          {headings.length ? (
            <div className="rounded-lg border border-[var(--color-border)] bg-white p-6">
              <div className="section-label">
                In This Article
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--color-text-secondary)]">
                {headings.map((heading) => (
                  <li key={heading}>• {heading}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="rounded-lg bg-[var(--color-primary)] px-6 py-6 text-white">
            <h2 className="text-2xl font-semibold">Need care now?</h2>
            <p className="mt-3 text-sm leading-7 text-white/82">
              If this article matches what you&apos;re dealing with, our Manassas team can help you
              choose the right next step.
            </p>
            <a
              href={buildBookingUrl("blog_post", post.slug)}
              className="btn-primary mt-5"
            >
              Book Appointment
            </a>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-white p-6 text-sm leading-7 text-[var(--color-text-secondary)]">
            This article is for general educational purposes only and does not replace an in-person
            medical evaluation.
          </div>
        </aside>
      </section>
      {blogFaqs.length ? (
        <section className="mt-12 rounded-lg border border-[var(--color-border)] bg-white p-6 md:p-8">
          <div className="section-label">
            Article FAQ
          </div>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-[var(--color-text-primary)]">
            Questions related to this article
          </h2>
          <div className="mt-6">
            <FAQAccordion items={blogFaqs} />
          </div>
        </section>
      ) : null}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Related Posts</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {related.map((item: { slug: string; title: string }) => (
            <Link
              key={item.slug}
              href={publicRoutes.blogPost(item.slug) as Route}
              className="rounded-lg border border-[var(--color-border)] bg-white p-5 text-[var(--color-text-primary)]"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>
      </div>
    </main>
  );
}
