import Link from "next/link";
import { ArrowDownCircle, Banknote, CalendarDays, CreditCard, ReceiptText, RotateCcw } from "lucide-react";
import { getAdminPlanEnrollments } from "@/lib/api";

const RECEIVED_STATUSES = new Set(["paid", "active", "completed"]);

function formatMoney(cents?: number | null, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0
  }).format((cents ?? 0) / 100);
}

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "-";
}

function isThisMonth(value?: string | null) {
  if (!value) {
    return false;
  }

  const date = new Date(value);
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
}

export default async function CashInflowPage() {
  const enrollments = await getAdminPlanEnrollments();
  const received = enrollments.filter((enrollment) => RECEIVED_STATUSES.has(enrollment.status));
  const refunded = enrollments.filter((enrollment) => enrollment.status === "refunded");
  const pending = enrollments.filter((enrollment) => enrollment.status === "pending");
  const failed = enrollments.filter((enrollment) => enrollment.status === "failed");

  const totalReceivedCents = received.reduce((sum, enrollment) => sum + (enrollment.amountPaidCents ?? 0), 0);
  const monthReceivedCents = received
    .filter((enrollment) => isThisMonth(enrollment.enrolledAt ?? enrollment.updatedAt ?? enrollment.createdAt))
    .reduce((sum, enrollment) => sum + (enrollment.amountPaidCents ?? 0), 0);
  const refundedCents = refunded.reduce((sum, enrollment) => sum + (enrollment.amountPaidCents ?? 0), 0);
  const pendingCents = pending.reduce((sum, enrollment) => sum + (enrollment.plan?.priceCents ?? 0), 0);
  const netReceivedCents = totalReceivedCents - refundedCents;

  const paidByPlan = Array.from(
    received.reduce((map, enrollment) => {
      const planName = enrollment.plan?.name ?? "Unknown plan";
      const current = map.get(planName) ?? { name: planName, count: 0, cents: 0, currency: enrollment.plan?.currency ?? "usd" };
      current.count += 1;
      current.cents += enrollment.amountPaidCents ?? 0;
      map.set(planName, current);
      return map;
    }, new Map<string, { name: string; count: number; cents: number; currency: string }>())
  )
    .map(([, value]) => value)
    .sort((a, b) => b.cents - a.cents);

  const recentPayments = received
    .slice()
    .sort(
      (a, b) =>
        new Date(b.enrolledAt ?? b.updatedAt ?? b.createdAt ?? 0).getTime() -
        new Date(a.enrolledAt ?? a.updatedAt ?? a.createdAt ?? 0).getTime()
    )
    .slice(0, 8);

  const stats = [
    {
      label: "Net Received",
      value: formatMoney(netReceivedCents),
      detail: `${received.length} paid patient enrollments`,
      icon: Banknote
    },
    {
      label: "This Month",
      value: formatMoney(monthReceivedCents),
      detail: "Payments marked paid, active, or completed",
      icon: CalendarDays
    },
    {
      label: "Pending",
      value: formatMoney(pendingCents),
      detail: `${pending.length} checkout sessions not paid yet`,
      icon: ArrowDownCircle
    },
    {
      label: "Refunded",
      value: formatMoney(refundedCents),
      detail: `${refunded.length} refunded enrollments, ${failed.length} failed`,
      icon: RotateCcw
    }
  ];

  return (
    <div className="grid gap-5">
      <section className="admin-card p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="admin-label">Cash Inflow</div>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900">Patient payment overview</h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-neutral-600">
              Track collected treatment-plan payments, pending checkout value, refunds, and recent patient receipts.
            </p>
          </div>
          <Link href="/admin/treatment-plans/enrollments" className="btn btn-secondary">
            View enrollments
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="admin-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="admin-label">{stat.label}</div>
                  <div className="mt-3 text-3xl font-semibold text-neutral-900">{stat.value}</div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)]">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{stat.detail}</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="admin-card p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="admin-label">Plan Revenue</div>
              <h3 className="mt-2 text-xl font-semibold text-neutral-900">Collected by plan</h3>
            </div>
            <ReceiptText className="h-5 w-5 text-[var(--color-primary)]" />
          </div>
          <div className="mt-4 divide-y divide-slate-200">
            {paidByPlan.map((plan) => (
              <div key={plan.name} className="grid gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <div className="font-semibold text-neutral-900">{plan.name}</div>
                  <div className="mt-1 text-sm text-neutral-500">{plan.count} paid enrollments</div>
                </div>
                <div className="font-semibold text-neutral-900">{formatMoney(plan.cents, plan.currency)}</div>
              </div>
            ))}
            {!paidByPlan.length ? <p className="py-6 text-sm text-neutral-500">No paid patient payments recorded yet.</p> : null}
          </div>
        </div>

        <div className="admin-card overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 p-5">
            <div>
              <div className="admin-label">Recent Payments</div>
              <h3 className="mt-2 text-xl font-semibold text-neutral-900">Patient receipts</h3>
            </div>
            <CreditCard className="h-5 w-5 text-[var(--color-primary)]" />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-neutral-900">
                <tr>
                  {["Patient", "Plan", "Amount", "Date"].map((column) => (
                    <th key={column} className="px-4 py-3 font-semibold">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-neutral-900">{payment.patientName ?? "Patient"}</div>
                      <div className="text-xs text-neutral-500">{payment.patientEmail}</div>
                    </td>
                    <td className="px-4 py-3 text-neutral-700">{payment.plan?.name ?? payment.planId}</td>
                    <td className="px-4 py-3 font-semibold text-neutral-900">
                      {formatMoney(payment.amountPaidCents, payment.plan?.currency)}
                    </td>
                    <td className="px-4 py-3 text-neutral-700">
                      {formatDate(payment.enrolledAt ?? payment.updatedAt ?? payment.createdAt)}
                    </td>
                  </tr>
                ))}
                {!recentPayments.length ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-neutral-500">
                      No paid patient payments found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
