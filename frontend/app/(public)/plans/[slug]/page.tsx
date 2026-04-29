import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PlanEnrollmentForm } from "@/components/public/PlanEnrollmentForm";
import { SchemaOrg } from "@/components/public/SchemaOrg";
import { getPublicFeatures, getTreatmentPlan } from "@/lib/api";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { clinic } from "@/lib/site-content";
import { enrollInPlanAction } from "../actions";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const [features, plan] = await Promise.all([getPublicFeatures(), getTreatmentPlan(params.slug)]);
  if (!features.treatmentPlansEnabled) {
    return {
      title: "Treatment Plans Not Available | AltMedFirst",
      alternates: { canonical: "/plans" }
    };
  }
  return {
    title: `${plan?.name ?? "Treatment Plan"} | Altmed Medical Center`,
    description:
      plan?.description?.slice(0, 155) ??
      "Review plan details, pricing, duration, and online enrollment from Altmed Medical Center.",
    alternates: { canonical: `/plans/${params.slug}` }
  };
}

function formatMoney(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);
}

function checkoutErrorMessage(value?: string) {
  if (!value) {
    return null;
  }

  if (value === "checkout") {
    return "Checkout could not be opened. Please verify payment settings or call the clinic.";
  }

  return value;
}

export default async function PlanDetailPage({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams?: { error?: string };
}) {
  const [features, plan] = await Promise.all([getPublicFeatures(), getTreatmentPlan(params.slug)]);
  if (!features.treatmentPlansEnabled || !plan) {
    notFound();
  }
  const checkoutError = checkoutErrorMessage(searchParams?.error);

  return (
    <main className="container-shell py-14">
      <SchemaOrg
        schema={buildBreadcrumbSchema([
          { name: "Home", item: clinic.canonicalUrl },
          { name: "Treatment Plans", item: `${clinic.canonicalUrl}/plans` },
          { name: plan.name, item: `${clinic.canonicalUrl}/plans/${plan.slug}` }
        ])}
      />
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <section>
          <div className="eyebrow">{plan.category ?? "Treatment Plan"}</div>
          <h1 className="mt-4 text-page-title text-neutral-900">{plan.name}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-700">{plan.description}</p>
          <div className="mt-6 grid gap-3 text-sm text-neutral-700">
            {(plan.checklist ?? []).map((item) => (
              <div key={item} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
        <aside className="card h-fit">
          <div className="text-sm font-semibold uppercase tracking-[0.05em] text-neutral-500">Plan Summary</div>
          <div className="mt-3 text-3xl font-semibold text-neutral-900">{formatMoney(plan.priceCents, plan.currency)}</div>
          <div className="mt-1 text-sm text-neutral-600">{plan.durationLabel ?? `${plan.durationDays ?? 0} days`}</div>
          {checkoutError ? (
            <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
              {checkoutError}
            </div>
          ) : null}
          <div className="mt-5">
            <PlanEnrollmentForm action={enrollInPlanAction.bind(null, plan.slug)} />
          </div>
        </aside>
      </div>
    </main>
  );
}
