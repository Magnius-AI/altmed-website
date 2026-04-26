import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { FileCheck2, MonitorSmartphone, ShieldCheck } from "lucide-react";
import { buildBookingUrl, clinic, publicRoutes } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Telehealth Consent Form | Altmed",
  description:
    "Telehealth consent information for Altmed Medical Center patients using virtual visits in Manassas, VA.",
  alternates: {
    canonical: "/telehealth-consent-forms"
  }
};

export default function TelehealthConsentPage() {
  return (
    <main className="bg-[var(--color-bg-white)]">
      <section className="container-shell section-pad">
        <div className="max-w-4xl reading-flow">
          <div className="inline-flex rounded-full bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Telehealth Consent
          </div>
          <h1 className="mt-6 text-4xl text-neutral-900 md:text-[3.35rem]">
            Telehealth consent for virtual visits at Altmed Medical Center
          </h1>
          <p className="text-[1.08rem] leading-8 text-neutral-700">
            This route preserves the telehealth-consent entry point from the live site while
            making the instructions clearer. Patients should complete telehealth paperwork before a
            scheduled virtual visit whenever possible.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-bg-gray)]">
        <div className="container-shell py-12">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: MonitorSmartphone,
                title: "What telehealth covers",
                body: "The consent explains how virtual visits work, what care can be handled remotely, and when an in-person visit may still be needed."
              },
              {
                icon: ShieldCheck,
                title: "Privacy and security",
                body: "Patients receive clear notice about privacy protections, communication expectations, and responsibilities during video or phone visits."
              },
              {
                icon: FileCheck2,
                title: "Before your appointment",
                body: "If you need help getting the correct telehealth paperwork, call the clinic before your visit so the team can guide you."
              }
            ].map((item) => (
              <article key={item.title} className="rounded-[16px] border border-slate-200 bg-white p-6">
                <item.icon className="h-6 w-6 text-primary" />
                <h2 className="mt-4 text-[1.5rem] text-neutral-900">{item.title}</h2>
                <p className="mt-3 text-base leading-7 text-neutral-700">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-14 md:py-16">
        <div className="rounded-[20px] border border-slate-200 bg-white p-7 md:p-9">
          <div className="max-w-3xl reading-flow">
            <h2 className="text-[2rem] text-neutral-900 md:text-[2.35rem]">Next steps</h2>
            <p className="text-[1rem] leading-7 text-neutral-700">
              If you already have an appointment scheduled, keep this page for reference and call{" "}
              <a href={`tel:${clinic.phone}`} className="font-semibold text-primary underline underline-offset-4">
                {clinic.phone}
              </a>{" "}
              if you need the current telehealth packet sent to you.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={buildBookingUrl("telehealth_consent", "book-appointment") as Route} className="btn-primary">
              Book Telehealth Visit
            </Link>
            <Link href={publicRoutes.telehealthMinorConsent as Route} className="btn-outline-dark">
              Minor Consent Form
            </Link>
            <a href={`tel:${clinic.phone}`} className="btn-outline-dark">
              Call Clinic
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
