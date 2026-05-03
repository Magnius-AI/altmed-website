import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ServicePageContent } from "@/components/public/ServicePageContent";
import { getServicePage } from "@/lib/api";
import { legacyServiceRedirects, supportedServiceSlugs } from "@/lib/site-content";

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

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.metaKeywords.split(",").map((item) => item.trim()),
    alternates: {
      canonical: `https://stage.altmedfirst.com/services/${canonicalSlug}`
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `https://stage.altmedfirst.com/services/${canonicalSlug}`,
      images: [
        {
          url: page.featuredImage,
          alt: `${page.name} at Altmed Medical Center in Manassas`
        }
      ]
    }
  };
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
