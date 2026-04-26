import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { FileCheck2, ShieldCheck, UserRound } from "lucide-react";
import { buildBookingUrl, clinic, publicRoutes } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Telehealth Consent Form - Minor | Altmed",
  description:
    "Minor telehealth consent information for Altmed Medical Center virtual visits in Manassas, VA.",
  alternates: {
    canonical: "/telehealth-consent-forms-minor"
  }
};

export default function TelehealthMinorConsentPage() {
  return (
    <main className="bg-[var(--color-bg-white)]">
      <section className="container-shell section-pad">
        <div className="max-w-4xl reading-flow">
          <div className="inline-flex rounded-full bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Minor Telehealth Consent
          </div>
          <h1 className="mt-6 text-4xl text-neutral-900 md:text-[3.35rem]">
            Telehealth consent for minors and guardian-supported visits
          </h1>
          <p className="text-[1.08rem] leading-8 text-neutral-700">
            This route preserves the minor telehealth-consent entry point from the live site. Use
            it when a parent or guardian is involved in the visit and the clinic has asked you to
            review or complete the minor telehealth paperwork.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-bg-gray)]">
        <div className="container-shell py-12">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: UserRound,
                title: "Guardian participation",
                body: "A parent or guardian should be available when required for the visit and for any questions related to consent."
              },
              {
                icon: ShieldCheck,
                title: "Privacy expectations",
                body: "The clinic may explain privacy boundaries, caregiver involvement, and what information can be reviewed during the virtual visit."
              },
              {
                icon: FileCheck2,
                title: "Need the current packet?",
                body: "Call the clinic if you need the current minor telehealth packet or want help confirming which form applies to your appointment."
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
              For help with minor telehealth consent, call{" "}
              <a href={`tel:${clinic.phone}`} className="font-semibold text-primary underline underline-offset-4">
                {clinic.phone}
              </a>{" "}
              before the appointment. The care team can confirm whether this route or the standard
              telehealth-consent route is the right fit.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={buildBookingUrl("telehealth_minor_consent", "book-appointment") as Route} className="btn-primary">
              Book Telehealth Visit
            </Link>
            <Link href={publicRoutes.telehealthConsent as Route} className="btn-outline-dark">
              Standard Consent Form
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
