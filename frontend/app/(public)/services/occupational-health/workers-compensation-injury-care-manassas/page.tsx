import type { Metadata } from "next";
import { ServicePageContent } from "@/components/public/ServicePageContent";
import { getServicePage } from "@/lib/api";

const slug = "occupational-health/workers-compensation-injury-care-manassas";

export const metadata: Metadata = {
  title: "Workers' Compensation for Injury Care | Medical Clinic | Same-Day Appointments",
  description:
    "Workers' compensation injury care in Manassas with same-day evaluation, documentation, and return-to-work support."
};

export default async function WorkersCompPage() {
  const page = await getServicePage(slug);
  return <ServicePageContent page={page} />;
}
