import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { CalendarDays, CheckCircle2, CreditCard, Stethoscope } from "lucide-react";
import { SchemaOrg } from "@/components/public/SchemaOrg";
import { getPublicFeatures, getTreatmentPlans } from "@/lib/api";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { clinic } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Available Treatment Plans | Altmed Medical Center",
  description:
    "Explore available bundled treatment plans from Altmed Medical Center, including plan details, pricing, duration, and online enrollment.",
  alternates: { canonical: "/plans" },
  keywords: [
    "Altmed treatment plans",
    "available treatment plans",
    "bundled healthcare plans",
    "online treatment plan enrollment"
  ],
  openGraph: {
    title: "Available Treatment Plans | Altmed Medical Center",
    description:
      "Review available bundled treatment plans, pricing, duration, and enrollment options from Altmed Medical Center.",
    url: `${clinic.canonicalUrl}/plans`,
    type: "website"
  }
};

function formatMoney(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);
}

export default async function PlansPage() {
  const [features, plans] = await Promise.all([getPublicFeatures(), getTreatmentPlans()]);
  const showPlans = features.treatmentPlansEnabled;
  const visiblePlans = showPlans ? plans : [];
  const startingPrice = visiblePlans.length ? Math.min(...visiblePlans.map((plan) => plan.priceCents)) : 0;
  const categories = Array.from(new Set(visiblePlans.map((plan) => plan.category).filter(Boolean)));

  return (
    <main className="container-shell py-14">
      <SchemaOrg
        schema={buildBreadcrumbSchema([
          { name: "Home", item: clinic.canonicalUrl },
          { name: "Treatment Plans", item: `${clinic.canonicalUrl}/plans` }
        ])}
      />
      <section className="grid gap-8 rounded-[16px] bg-[var(--color-bg-gray)] p-6 md:p-8 lg:grid-cols-[1fr_360px] lg:items-center">
        <div>
          <div className="eyebrow">Available Plans</div>
          <h1 className="mt-4 text-page-title text-neutral-900">
            Treatment plans with clear pricing and clinic follow-up.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-700">
            Explore bundled programs with transparent pricing, duration, and next-step details. Choose a plan, enroll online, and the Altmed team will follow up with care instructions.
          </p>
        </div>
        <div className="grid gap-3 rounded-xl bg-white p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <Stethoscope className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-neutral-900">{visiblePlans.length} active plan options</span>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-neutral-900">
              {visiblePlans.length ? `Starting at ${formatMoney(startingPrice)}` : "Pricing available by phone"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-neutral-900">
              {categories.length ? `${categories.length} care categories` : "Care categories available by phone"}
            </span>
          </div>
        </div>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visiblePlans.map((plan) => (
          <article key={plan.id} className="card flex flex-col border-[var(--color-border)]">
            <div className="text-sm font-semibold text-primary">{plan.category ?? "Treatment Plan"}</div>
            <h2 className="mt-2 text-section-title text-neutral-900">{plan.name}</h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">{plan.description}</p>
            <div className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-neutral-500">Included</div>
            <ul className="mt-5 grid gap-2 text-sm text-neutral-700">
              {(plan.checklist ?? []).slice(0, 5).map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
              <div>
                <div className="text-xl font-semibold text-neutral-900">{formatMoney(plan.priceCents, plan.currency)}</div>
                <div className="text-sm text-neutral-500">{plan.durationLabel ?? `${plan.durationDays ?? 0} days`}</div>
              </div>
              <Link href={`/plans/${plan.slug}` as Route} className="btn-accent">
                Enroll Now
              </Link>
            </div>
          </article>
        ))}
        {!visiblePlans.length ? (
          <div className="card md:col-span-2 xl:col-span-3">
            <h2 className="text-section-title text-neutral-900">Treatment plans are not available right now</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Please contact the clinic for current weight loss and wellness program availability.
            </p>
          </div>
        ) : null}
      </section>
    </main>
  );
}
