import type { Metadata } from "next";
import { ServicePageContent } from "@/components/public/ServicePageContent";
import { getServicePage } from "@/lib/api";
import { buildPageMetadata } from "@/lib/metadata";
import { redirect } from "next/navigation";

// 🔧 Toggle this single flag to enable/disable the page. Nothing else needs to change.
const SERVICE_ENABLED = false;
const SERVICE_SLUG = "functional-medicine-manassas";
const FALLBACK_PATH = "/services";

export async function generateMetadata(): Promise<Metadata> {
  if (!SERVICE_ENABLED) return {};

  const page = await getServicePage(SERVICE_SLUG);
  return buildPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/services/${SERVICE_SLUG}`,
    image: page.featuredImage
  });
}

export default async function Page() {
  if (!SERVICE_ENABLED) {
    redirect(FALLBACK_PATH);
  }

  const page = await getServicePage(SERVICE_SLUG);
  return <ServicePageContent page={page} />;
}