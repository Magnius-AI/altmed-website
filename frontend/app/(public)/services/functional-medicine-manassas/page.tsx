import type { Metadata } from "next";
import { ServicePageContent } from "@/components/public/ServicePageContent";
import { getServicePage } from "@/lib/api";
import { buildPageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";


export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicePage("functional-medicine-manassas");
  return buildPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: "/services/functional-medicine-manassas",
    image: page.featuredImage
  });
}

export default async function Page() {

  // Temporary: service disabled
  notFound();

  // later we re-enable this page when the service is available
  return <ServicePageContent page={await getServicePage("functional-medicine-manassas")} />;
}
