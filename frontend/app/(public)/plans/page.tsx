import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
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
    url: "https://altmedfirst.com/plans",
    type: "website"
  }
};

function formatMoney(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);
}

export default async function PlansPage() {
  const [features, plans] = await Promise.all([getPublicFeatures(), getTreatmentPlans()]);
  const showPlans = features.treatmentPlansEnabled;

  return (
    <main className="container-shell py-14">
      <SchemaOrg
        schema={buildBreadcrumbSchema([
          { name: "Home", item: clinic.canonicalUrl },
          { name: "Treatment Plans", item: `${clinic.canonicalUrl}/plans` }
        ])}
      />
      <section className="max-w-4xl">
        <div className="eyebrow">Available Plans</div>
        <h1 className="mt-4 text-page-title text-neutral-900">
          Available Treatment Plans at Altmed
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-700">
          Explore bundled treatment plans with clear pricing, duration, and enrollment details. Choose a plan to review what is included and start checkout online.
        </p>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {showPlans ? plans.map((plan) => (
          <article key={plan.id} className="card flex flex-col">
            <div className="text-sm font-semibold text-primary">{plan.category ?? "Treatment Plan"}</div>
            <h2 className="mt-2 text-section-title text-neutral-900">{plan.name}</h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">{plan.description}</p>
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
              <Link href={`/plans/${plan.slug}` as Route} className="btn btn-primary">
                Enroll Now
              </Link>
            </div>
          </article>
        )) : null}
        {!showPlans || !plans.length ? (
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
