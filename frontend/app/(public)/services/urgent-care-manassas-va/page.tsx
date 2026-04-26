import type { Metadata } from "next";
import { ServicePageContent } from "@/components/public/ServicePageContent";
import { getServicePage } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicePage("urgent-care-manassas-va");
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function Page() {
  return <ServicePageContent page={await getServicePage("urgent-care-manassas-va")} />;
}
