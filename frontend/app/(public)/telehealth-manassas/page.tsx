import type { Metadata } from "next";
import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";
import { buildBookingUrl, clinic, legacyAssets, publicRoutes } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Telehealth Manassas VA | Virtual Doctor Visits | Altmed",
  description:
    "Telehealth in Manassas, VA for follow-ups, minor illness, selected primary care concerns, and convenient virtual visits with Altmed Medical Center.",
  alternates: {
    canonical: "/telehealth-manassas"
  },
  openGraph: {
    title: "Telehealth Manassas VA | Altmed Medical Center",
    description:
      "Book a telehealth visit with Altmed Medical Center in Manassas for convenient virtual follow-up and everyday medical concerns."
  }
};

const telehealthUseCases = [
  "Colds, allergies, mild infections, and everyday urgent concerns that can be discussed safely by video",
  "Follow-up visits after an in-person appointment",
  "Medication questions, chronic-condition check-ins, and routine primary care conversations",
  "Selected weight-loss and addiction-treatment follow-up for eligible established patients"
];

const inPersonCases = [
  "Chest pain, severe shortness of breath, uncontrolled bleeding, or any emergency symptoms",
  "Broken bones, deep cuts, or injuries that may need procedures or imaging",
  "Vaccinations, annual physicals, and visits that clearly require an exam in the clinic"
];

export default function TelehealthPage() {
  return (
    <main className="bg-[var(--color-bg-white)]">
      <section className="container-shell section-pad">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <div className="inline-flex rounded-full bg-[var(--color-bg-gray)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
              Telehealth
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl md:text-[3.35rem]">Telehealth in Manassas that keeps care moving without the commute.</h1>
            <p className="mt-6 text-[1.03rem] leading-8 text-[var(--color-text-muted)]">
              The archived telehealth page focused on convenience, local provider access, and clear
              boundaries around what still needs an in-person visit. We kept that structure here
              and made the next steps easier to follow.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={buildBookingUrl("telehealth", "book-appointment") as Route} className="btn-primary">
                Book Telehealth Visit
              </Link>
              <a href={`tel:${clinic.phone}`} className="btn-outline-dark">
                Call {clinic.phone}
              </a>
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[16px] border border-[rgba(18,52,77,0.08)]">
            <Image src={legacyAssets.heroDoctor} alt="Altmed telehealth care" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-gray)]">
        <div className="container-shell section-pad">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-7">
              <h2 className="text-3xl">What telehealth can help with</h2>
              <ul className="mt-6 space-y-4 text-[1.03rem] leading-8 text-[var(--color-text-dark)]">
                {telehealthUseCases.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-7">
              <h2 className="text-3xl">When you should still come in</h2>
              <ul className="mt-6 space-y-4 text-[1.03rem] leading-8 text-[var(--color-text-dark)]">
                {inPersonCases.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <p className="mt-6 text-base leading-7 text-[var(--color-text-muted)]">
                If you are unsure, call our office and we&apos;ll help guide you to the safest visit type.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <div className="grid gap-6 lg:grid-cols-2">
          <Link href={publicRoutes.telehealthConsent as Route} className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-7">
            <h2 className="text-2xl">Telehealth Consent Form</h2>
            <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">
              Review the standard telehealth consent path preserved from the legacy site.
            </p>
          </Link>
          <Link href={publicRoutes.telehealthMinorConsent as Route} className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-7">
            <h2 className="text-2xl">Telehealth Consent Form - Minor</h2>
            <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">
              Use this route when a parent or guardian is involved in care for a minor patient.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
