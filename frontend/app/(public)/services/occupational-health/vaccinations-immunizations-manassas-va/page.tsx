import type { Metadata } from "next";
import { ServicePageContent } from "@/components/public/ServicePageContent";
import { getServicePage } from "@/lib/api";
import { buildPageMetadata } from "@/lib/metadata";

const slug = "occupational-health/vaccinations-immunizations-manassas-va";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicePage(slug);
  return buildPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/services/${slug}`,
    image: page.featuredImage
  });
}

export default async function VaccinationsPage() {
  const page = await getServicePage(slug);
  return <ServicePageContent page={page} />;
}
