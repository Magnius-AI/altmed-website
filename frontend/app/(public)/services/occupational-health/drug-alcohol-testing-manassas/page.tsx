import type { Metadata } from "next";
import { ServicePageContent } from "@/components/public/ServicePageContent";
import { getServicePage } from "@/lib/api";

const slug = "occupational-health/drug-alcohol-testing-manassas";

export const metadata: Metadata = {
  title: "Drug and Alcohol Testing in Manassas, VA | Walk-In & DOT Testing",
  description:
    "Altmed offers drug and alcohol testing in Manassas, VA including pre-employment, random, post-accident, breath alcohol, and DOT-compliant programs."
};

export default async function DrugAlcoholTestingPage() {
  const page = await getServicePage(slug);
  return <ServicePageContent page={page} />;
}
