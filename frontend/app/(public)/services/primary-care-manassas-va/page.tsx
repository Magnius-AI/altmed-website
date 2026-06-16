import type { Metadata } from "next";
import { ServicePageContent } from "@/components/public/ServicePageContent";
import { getServicePage } from "@/lib/api";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicePage("primary-care-manassas-va");
  return buildPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: "/services/primary-care-manassas-va",
    image: page.featuredImage
  });
}

export default async function Page() {
  return <ServicePageContent page={await getServicePage("primary-care-manassas-va")} />;
}
