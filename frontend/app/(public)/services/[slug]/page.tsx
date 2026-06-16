import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ServicePageContent } from "@/components/public/ServicePageContent";
import { getServicePage } from "@/lib/api";
import { buildPageMetadata } from "@/lib/metadata";
import { legacyServiceRedirects, supportedServiceSlugs } from "@/lib/site-content";

export function generateStaticParams() {
  return Array.from(supportedServiceSlugs)
    .filter((slug) => !slug.includes("/"))
    .filter((slug) => !legacyServiceRedirects[slug])
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  if (!supportedServiceSlugs.has(params.slug)) {
    return {};
  }

  const page = await getServicePage(params.slug);
  const canonicalSlug = legacyServiceRedirects[params.slug] ?? params.slug;

  return buildPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.metaKeywords.split(",").map((item) => item.trim()),
    path: `/services/${canonicalSlug}`,
    image: page.featuredImage
  });
}

export default async function ServiceDynamicPage({ params }: { params: { slug: string } }) {
  if (!supportedServiceSlugs.has(params.slug)) {
    notFound();
  }

  if (legacyServiceRedirects[params.slug]) {
    redirect(`/services/${legacyServiceRedirects[params.slug]}`);
  }

  const page = await getServicePage(params.slug);

  return <ServicePageContent page={page} />;
}
