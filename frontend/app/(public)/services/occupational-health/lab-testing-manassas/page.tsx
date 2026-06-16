import type { Metadata } from "next";
import { ServicePageContent } from "@/components/public/ServicePageContent";
import { getServicePage } from "@/lib/api";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const slug = "occupational-health/lab-testing-manassas";
  const page = await getServicePage(slug);
  return buildPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/services/${slug}`,
    image: page.featuredImage
  });
}

export default async function Page() {
  return <ServicePageContent page={await getServicePage("occupational-health/lab-testing-manassas")} />;
}
