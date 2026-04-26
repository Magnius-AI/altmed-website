import type { Metadata } from "next";
import { ServicePageContent } from "@/components/public/ServicePageContent";
import { getServicePage } from "@/lib/api";

const slug = "occupational-health/vaccinations-immunizations-manassas-va";

export const metadata: Metadata = {
  title: "Vaccinations & Immunizations Manassas VA | Walk-In Flu Shots",
  description:
    "Walk-in vaccinations and immunizations in Manassas, VA including flu shots and routine preventive vaccines at Altmed Medical Center."
};

export default async function VaccinationsPage() {
  const page = await getServicePage(slug);
  return <ServicePageContent page={page} />;
}
