import Link from "next/link";
import { Banknote, CheckCircle2, ClipboardList, CreditCard, PackagePlus, Users } from "lucide-react";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { AdminToast } from "@/components/admin/AdminToast";
import { TreatmentPlanForm } from "@/components/admin/TreatmentPlanForm";
import { getAdminTreatmentPlans } from "@/lib/api";
import {
  createTreatmentPlanAction,
  deleteTreatmentPlanAction,
  updateTreatmentPlanAction
} from "./actions";

function formatMoney(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);
}

export default async function AdminTreatmentPlansPage({
  searchParams
}: {
  searchParams?: { search?: string; status?: string; edit?: string; saved?: string };
}) {
  const plans = await getAdminTreatmentPlans();
  const search = searchParams?.search?.trim().toLowerCase() ?? "";
  const status = searchParams?.status ?? "all";
  const editing = plans.find((plan) => plan.id === searchParams?.edit);
  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      !search ||
      [plan.name, plan.slug, plan.category, plan.description].filter(Boolean).some((value) => String(value).toLowerCase().includes(search));
    const matchesStatus = status === "all" || (status === "active" && plan.isActive) || (status === "inactive" && !plan.isActive);
    return matchesSearch && matchesStatus;
  });
  const activePlans = plans.filter((plan) => plan.isActive);
  const totalEnrollments = plans.reduce((sum, plan) => sum + (plan.summary?.enrollmentCount ?? 0), 0);
  const totalRevenueCents = plans.reduce((sum, plan) => sum + (plan.summary?.revenueCents ?? 0), 0);
  const stripeReady = plans.filter((plan) => Boolean(plan.stripePriceId)).length;
  const categories = Array.from(new Set(plans.map((plan) => plan.category).filter(Boolean)));
  const catalogStats = [
    {
      label: "Active Plans",
      value: activePlans.length,
      detail: `${plans.length - activePlans.length} inactive or draft`,
      icon: ClipboardList
    },
    {
      label: "Patient Enrollments",
      value: totalEnrollments,
      detail: "Paid, active, or completed",
      icon: Users
    },
    {
      label: "Collected Revenue",
      value: formatMoney(totalRevenueCents),
      detail: "Across all treatment plans",
      icon: Banknote
    },
    {
      label: "Stripe Ready",
      value: stripeReady,
      detail: `${categories.length || 1} plan categories`,
      icon: CreditCard
    }
  ];

  const notice =
    searchParams?.saved === "created"
      ? "Treatment plan created successfully."
      : searchParams?.saved === "updated"
        ? "Treatment plan saved successfully."
        : searchParams?.saved === "deleted"
          ? "Treatment plan deleted successfully."
          : null;

  return (
    <div className="grid gap-5">
      <AdminToast message={notice} />
      <section className="admin-card p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="admin-label">Treatment Plans</div>
            <h2 className="mt-1.5 text-xl font-semibold text-neutral-900">Plan catalog and package builder</h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-neutral-600">
              Manage public programs, pricing, duration, Stripe checkout readiness, and enrollment flow in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/treatment-plans/cash-inflow" className="btn btn-secondary">
              Cash Inflow
            </Link>
            <Link href="/admin/treatment-plans/enrollments" className="btn btn-secondary">
              Enrollments
            </Link>
            <Link href="/admin/treatment-plans/attendance" className="btn btn-secondary">
              Attendance
            </Link>
            <Link href="/admin/treatment-plans/payments" className="btn btn-secondary">
              Payments
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {catalogStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="admin-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="admin-label">{stat.label}</div>
                  <div className="mt-2 text-2xl font-semibold leading-none text-neutral-950">{stat.value}</div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-bg-gray)] text-[var(--color-primary)]">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{stat.detail}</p>
            </div>
          );
        })}
      </section>

      <section className="admin-card p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-bg-gray)] text-[var(--color-primary)]">
            <PackagePlus className="h-4 w-4" />
          </div>
          <div>
            <div className="admin-label">{editing ? "Edit Plan" : "New Plan"}</div>
            <h3 className="mt-1.5 text-lg font-semibold text-neutral-900">
              {editing ? `Editing ${editing.name}` : "Create a clinic-ready treatment package"}
            </h3>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-neutral-600">
              Keep names patient-friendly, set a clear duration, and use checklist items for what staff should explain before enrollment.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <TreatmentPlanForm
            plan={editing}
            action={editing ? updateTreatmentPlanAction.bind(null, editing.id) : createTreatmentPlanAction}
            submitLabel={editing ? "Save plan" : "Create plan"}
          />
        </div>
      </section>

      <section className="admin-card p-4">
        <form className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
          <input name="search" defaultValue={searchParams?.search ?? ""} placeholder="Search plans..." className="input" />
          <select name="status" defaultValue={status} className="input select">
            <option value="all">All plans</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <AdminSubmitButton className="btn btn-primary" pendingLabel="Filtering...">
            Filter
          </AdminSubmitButton>
        </form>
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {filteredPlans.map((plan) => (
            <article key={plan.id} className="card">
              <div className="flex h-full flex-col gap-4">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-neutral-900">{plan.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="admin-pill">{plan.isActive ? "Active" : "Inactive"}</span>
                      <span className="admin-pill">{plan.stripePriceId ? "Stripe linked" : "Needs Stripe"}</span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">
                    {plan.category ?? "Treatment"} · {formatMoney(plan.priceCents, plan.currency)} · {plan.durationLabel ?? `${plan.durationDays ?? 0} days`}
                  </p>
                  {plan.description ? <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-600">{plan.description}</p> : null}
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-600">
                    <span className="inline-flex items-center gap-1">
                      <ClipboardList className="h-4 w-4 text-primary" />
                      {plan.summary?.enrollmentCount ?? 0} enrolled
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Banknote className="h-4 w-4 text-primary" />
                      {formatMoney(plan.summary?.revenueCents ?? 0, plan.currency)} received
                    </span>
                  </div>
                  {plan.checklist?.length ? (
                    <div className="mt-4 grid gap-2 text-sm text-neutral-700">
                      {plan.checklist.slice(0, 3).map((item) => (
                        <div key={item} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="mt-auto flex flex-wrap gap-2 border-t border-slate-200 pt-4">
                  <Link href={`/plans/${plan.slug}`} className="btn btn-secondary">
                    Public link
                  </Link>
                  <Link href={`/admin/treatment-plans?edit=${plan.id}`} className="btn btn-secondary">
                    Edit
                  </Link>
                  <form action={deleteTreatmentPlanAction.bind(null, plan.id)}>
                    <AdminSubmitButton className="btn btn-danger" pendingLabel="Deleting...">
                      Delete
                    </AdminSubmitButton>
                  </form>
                </div>
              </div>
            </article>
          ))}
          {!filteredPlans.length ? <p className="py-8 text-center text-sm text-neutral-500">No treatment plans match your filters.</p> : null}
        </div>
      </section>
    </div>
  );
}
