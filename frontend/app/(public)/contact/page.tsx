import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/public/ContactForm";
import type { Route } from "next";
import { clinic, clinicCoverageAreas, legacyAssets } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact Altmed Medical Center | Manassas Medical Clinic",
  description:
    "Contact Altmed Medical Center in Manassas, VA for appointments, directions, urgent care questions, occupational health setup, and telehealth support.",
  alternates: {
    canonical: "/contact-us"
  },
  openGraph: {
    title: "Contact Altmed Medical Center | Manassas, VA",
    description:
      "Call, email, or visit Altmed Medical Center in Manassas for patient care, employer services, and appointment support."
  }
};

export default function ContactPage() {
  return (
    <main className="bg-[var(--color-bg-white)]">
      <section className="container-shell section-pad">
        <div className="max-w-4xl">
          <div className="inline-flex rounded-[10px] bg-[var(--color-bg-gray)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
            Contact Us
          </div>
          <h1 className="mt-6 text-4xl md:text-[3.35rem]">Questions about care, employer services, or booking a visit?</h1>
          <p className="mt-6 text-[1.03rem] leading-8 text-[var(--color-text-muted)]">
            Reach our team for appointment support, occupational health setup, telehealth
            questions, or general clinic information across {clinicCoverageAreas.join(", ")}.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={"/faq" as Route} className="btn-outline-dark">
              Read FAQs
            </Link>
            <Link href={"/services" as Route} className="btn-outline-dark">
              Browse Services
            </Link>
            <Link href={"/patient-forms" as Route} className="btn-outline-dark">
              Patient Forms
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <div className="relative min-h-[280px] overflow-hidden rounded-[16px] border border-[rgba(18,52,77,0.08)]">
              <Image src={legacyAssets.heroClinic} alt="Altmed Medical Center exterior" fill className="object-cover" />
            </div>

            <div className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-[var(--color-bg-gray)] p-7">
              <h2 className="text-2xl">Visit the clinic</h2>
              <div className="mt-5 space-y-3 text-base leading-7 text-[var(--color-text-muted)]">
                <p>{clinic.address}</p>
                <p><a href={`tel:${clinic.phone}`} className="underline underline-offset-4">{clinic.phone}</a></p>
                <p><a href={`mailto:${clinic.email}`} className="underline underline-offset-4">{clinic.email}</a></p>
                <p>Monday–Friday: 9:00 AM – 5:00 PM</p>
                <p><a href={clinic.mapUrl} className="underline underline-offset-4">Get directions</a></p>
              </div>
            </div>

            <iframe
              className="h-[420px] w-full rounded-[16px] border border-[rgba(44,44,44,0.08)]"
              loading="lazy"
              src={`https://www.google.com/maps?q=${clinic.coordinates.latitude},${clinic.coordinates.longitude}&z=14&output=embed`}
              title="Altmed Medical Center map"
            />
          </div>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
