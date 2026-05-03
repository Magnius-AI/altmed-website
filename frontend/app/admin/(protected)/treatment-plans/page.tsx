import Link from "next/link";
import { ClipboardList, Copy, DollarSign } from "lucide-react";
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
      <section className="admin-card p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="admin-label">Treatment Plans</div>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900">Plan catalog</h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-neutral-600">
              Manage public treatment programs, enrollment pricing, duration, and Stripe checkout links.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/treatment-plans/cash-inflow" className="btn btn-secondary">
              Cash Inflow
            </Link>
            <Link href="/admin/treatment-plans/enrollments" className="btn btn-secondary">
              Enrollments
            </Link>
            <Link href="/admin/treatment-plans/payments" className="btn btn-secondary">
              Payments
            </Link>
          </div>
        </div>
      </section>

      <section className="admin-card p-5">
        <div className="admin-label">{editing ? "Edit Plan" : "New Plan"}</div>
        <div className="mt-4">
          <TreatmentPlanForm
            plan={editing}
            action={editing ? updateTreatmentPlanAction.bind(null, editing.id) : createTreatmentPlanAction}
            submitLabel={editing ? "Save plan" : "Create plan"}
          />
        </div>
      </section>

      <section className="admin-card p-5">
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
        <div className="mt-5 grid gap-3">
          {filteredPlans.map((plan) => (
            <article key={plan.id} className="card">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-neutral-900">{plan.name}</h3>
                    <span className="admin-pill">{plan.isActive ? "Active" : "Inactive"}</span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">
                    {plan.category ?? "Treatment"} · {formatMoney(plan.priceCents, plan.currency)} · {plan.durationLabel ?? `${plan.durationDays ?? 0} days`}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-600">
                    <span className="inline-flex items-center gap-1">
                      <ClipboardList className="h-4 w-4 text-primary" />
                      {plan.summary?.enrollmentCount ?? 0} enrolled
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-primary" />
                      {formatMoney(plan.summary?.revenueCents ?? 0, plan.currency)} received
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/plans/${plan.slug}`} className="btn btn-secondary">
                    Public link
                  </Link>
                  <Link href={`/admin/treatment-plans?edit=${plan.id}`} className="btn btn-secondary">
                    Edit
                  </Link>
                  <button type="button" className="btn btn-ghost" title={`Copy /plans/${plan.slug}`}>
                    <Copy className="h-4 w-4" />
                  </button>
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
