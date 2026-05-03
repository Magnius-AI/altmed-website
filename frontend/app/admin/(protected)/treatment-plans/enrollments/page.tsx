import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { getAdminPlanEnrollments, getAdminTreatmentPlans } from "@/lib/api";
import { updateEnrollmentAction } from "../actions";

function formatMoney(cents?: number | null, currency = "usd") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format((cents ?? 0) / 100);
}

function daysLeft(value?: string | null) {
  if (!value) {
    return "-";
  }
  const diff = new Date(value).getTime() - Date.now();
  return `${Math.max(0, Math.ceil(diff / 86_400_000))} days`;
}

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleDateString("en-US") : "-";
}

export default async function PlanEnrollmentsPage({
  searchParams
}: {
  searchParams?: { planId?: string; status?: string };
}) {
  const [plans, enrollments] = await Promise.all([
    getAdminTreatmentPlans(),
    getAdminPlanEnrollments({ planId: searchParams?.planId, status: searchParams?.status })
  ]);

  return (
    <div className="grid gap-5">
      <section className="admin-card p-5">
        <form className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
          <select name="planId" defaultValue={searchParams?.planId ?? "all"} className="input select">
            <option value="all">All plans</option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>
          <select name="status" defaultValue={searchParams?.status ?? "all"} className="input select">
            <option value="all">All statuses</option>
            {["pending", "paid", "active", "completed", "cancelled", "refunded", "failed"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <AdminSubmitButton className="btn btn-primary" pendingLabel="Filtering...">
            Filter
          </AdminSubmitButton>
        </form>
      </section>

      <section className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-neutral-900">
              <tr>
                {["Patient", "Plan", "Status", "Amount", "Days Left", "Enrolled", "Update"].map((column) => (
                  <th key={column} className="px-4 py-3 font-semibold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {enrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-neutral-900">{enrollment.patientName ?? "Patient"}</div>
                    <div className="text-xs text-neutral-500">{enrollment.patientEmail}</div>
                  </td>
                  <td className="px-4 py-3 text-neutral-700">{enrollment.plan?.name ?? enrollment.planId}</td>
                  <td className="px-4 py-3">
                    <span className="admin-pill capitalize">{enrollment.status}</span>
                  </td>
                  <td className="px-4 py-3 text-neutral-700">{formatMoney(enrollment.amountPaidCents, enrollment.plan?.currency)}</td>
                  <td className="px-4 py-3 text-neutral-700">{daysLeft(enrollment.endsAt)}</td>
                  <td className="px-4 py-3 text-neutral-700">{formatDate(enrollment.enrolledAt ?? enrollment.createdAt)}</td>
                  <td className="px-4 py-3">
                    <form action={updateEnrollmentAction.bind(null, enrollment.id)} className="flex min-w-[250px] gap-2">
                      <select name="status" defaultValue={enrollment.status} className="input select">
                        {["pending", "paid", "active", "completed", "cancelled", "refunded", "failed"].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <AdminSubmitButton className="btn btn-secondary" pendingLabel="Saving...">
                        Save
                      </AdminSubmitButton>
                    </form>
                  </td>
                </tr>
              ))}
              {!enrollments.length ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-neutral-500">
                    No enrollments match the current filters.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
