import type { Route } from "next";
import Link from "next/link";
import { AlertCircle, Banknote, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, ClipboardCheck, Search, Users } from "lucide-react";
import { AdminConfirmDeleteButton } from "@/components/admin/AdminConfirmDeleteButton";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { AdminToast } from "@/components/admin/AdminToast";
import { getAdminPlanEnrollments, getAdminTreatmentPlans, type PlanEnrollment, type TreatmentPlan } from "@/lib/api";
import { createEnrollmentAction, deleteEnrollmentAction, updateEnrollmentAction } from "../actions";

const PAID_STATUSES = new Set(["paid", "active", "completed"]);
const UNPAID_STATUSES = new Set(["pending", "failed"]);
const STATUS_OPTIONS = ["pending", "paid", "active", "completed", "cancelled", "refunded", "failed"];
const PAGE_SIZE_OPTIONS = [10, 25, 50];

function formatMoney(cents?: number | null, currency = "usd") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format((cents ?? 0) / 100);
}

function dollarsInput(cents?: number | null) {
  return cents ? (cents / 100).toFixed(2) : "";
}

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "-";
}

function dateInputValue(value?: string | null) {
  return value ? new Date(value).toISOString().slice(0, 10) : "";
}

function enrollmentCode(enrollment: PlanEnrollment) {
  return enrollment.enrollmentCode ?? enrollment.id;
}

function planLabel(plan?: TreatmentPlan | null) {
  if (!plan) {
    return "Unknown plan";
  }
  return `${plan.name} · ${formatMoney(plan.priceCents, plan.currency)}`;
}

function paymentState(status: string) {
  if (PAID_STATUSES.has(status)) {
    return { label: "Paid", className: "border-emerald-200 bg-emerald-50 text-emerald-800" };
  }
  if (UNPAID_STATUSES.has(status)) {
    return { label: "Unpaid", className: "border-amber-200 bg-amber-50 text-amber-800" };
  }
  return { label: status, className: "border-slate-200 bg-slate-50 text-slate-700" };
}

function toPositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function matchesSearch(enrollment: PlanEnrollment, query: string) {
  if (!query) {
    return true;
  }

  const haystack = [
    enrollmentCode(enrollment),
    enrollment.patientName,
    enrollment.patientEmail,
    enrollment.patientPhone,
    enrollment.status,
    enrollment.paymentMethod,
    enrollment.notes,
    enrollment.plan?.name,
    enrollment.plan?.category
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function savedMessage(saved?: string) {
  if (saved === "created") {
    return "Patient enrollment added. Welcome/admin emails are sent when the enrollment is paid or active.";
  }
  if (saved === "updated") {
    return "Enrollment updated.";
  }
  if (saved === "deleted") {
    return "Enrollment deleted.";
  }
  return null;
}

export default async function PlanEnrollmentsPage({
  searchParams
}: {
  searchParams?: { planId?: string; status?: string; saved?: string; query?: string; page?: string; pageSize?: string; error?: string };
}) {
  const [plans, enrollments] = await Promise.all([
    getAdminTreatmentPlans(),
    getAdminPlanEnrollments({ planId: searchParams?.planId, status: searchParams?.status })
  ]);

  const query = searchParams?.query?.trim() ?? "";
  const pageSizeValue = toPositiveInt(searchParams?.pageSize, 10);
  const pageSize = PAGE_SIZE_OPTIONS.includes(pageSizeValue) ? pageSizeValue : 10;
  const filteredEnrollments = enrollments.filter((enrollment) => matchesSearch(enrollment, query));
  const totalPages = Math.max(1, Math.ceil(filteredEnrollments.length / pageSize));
  const currentPage = Math.min(toPositiveInt(searchParams?.page, 1), totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  const visibleEnrollments = filteredEnrollments.slice(pageStart, pageEnd);
  const showingStart = filteredEnrollments.length ? pageStart + 1 : 0;
  const showingEnd = Math.min(pageEnd, filteredEnrollments.length);
  const paidEnrollments = filteredEnrollments.filter((enrollment) => PAID_STATUSES.has(enrollment.status));
  const unpaidEnrollments = filteredEnrollments.filter((enrollment) => UNPAID_STATUSES.has(enrollment.status));
  const followUpsDue = filteredEnrollments.filter((enrollment) => {
    if (!enrollment.nextVisitAt || !["paid", "active"].includes(enrollment.status)) {
      return false;
    }
    return new Date(enrollment.nextVisitAt).getTime() <= Date.now() + 7 * 86_400_000;
  });
  const totalCollected = paidEnrollments.reduce((sum, enrollment) => sum + (enrollment.amountPaidCents ?? 0), 0);

  const stats = [
    { label: "Paid / Active", value: paidEnrollments.length, detail: "Ready for attendance", icon: Users },
    { label: "Unpaid", value: unpaidEnrollments.length, detail: "Needs payment follow-up", icon: AlertCircle },
    { label: "Follow-Ups Due", value: followUpsDue.length, detail: "Next visit within 7 days", icon: CalendarDays },
    { label: "Collected", value: formatMoney(totalCollected), detail: "Visible in cash inflow", icon: Banknote }
  ];

  const buildHref = (overrides: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams();
    if (searchParams?.planId && searchParams.planId !== "all") {
      params.set("planId", searchParams.planId);
    }
    if (searchParams?.status && searchParams.status !== "all") {
      params.set("status", searchParams.status);
    }
    if (query) {
      params.set("query", query);
    }
    params.set("pageSize", String(pageSize));
    params.set("page", String(currentPage));

    Object.entries(overrides).forEach(([key, value]) => {
      if (value === undefined || value === "" || value === "all") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    const suffix = params.toString();
    return (suffix ? `/admin/treatment-plans/enrollments?${suffix}` : "/admin/treatment-plans/enrollments") as Route;
  };
  const toastMessage = searchParams?.error ?? savedMessage(searchParams?.saved);

  return (
    <div className="grid gap-4">
      <AdminToast message={toastMessage} variant={searchParams?.error ? "error" : "success"} />

      <section className="admin-card p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="admin-label">Plan Enrollments</div>
            <h2 className="mt-1.5 text-xl font-semibold text-neutral-900">Patients, codes, and payment status</h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-neutral-600">
              Keep this page for enrollment and payment visibility. Use the attendance page when a patient arrives with their code.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/treatment-plans/attendance" className="btn btn-primary">
              Record attendance
            </Link>
            <Link href="/admin/treatment-plans/cash-inflow" className="btn btn-secondary">
              Payment tracking
            </Link>
            <Link href="/admin/treatment-plans" className="btn btn-secondary">
              Plan catalog
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
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

      <details className="admin-card group overflow-hidden">
        <summary className="cursor-pointer list-none p-4 transition hover:bg-[var(--color-bg-gray)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="admin-label">Add Enrollment</div>
              <h3 className="mt-1.5 flex flex-wrap items-center gap-2 text-lg font-semibold text-neutral-900">
                Manual clinic enrollment
                <span className="rounded-md border border-[var(--admin-border)] bg-white px-2 py-0.5 text-xs font-semibold text-[var(--color-primary)]">
                  Open form
                </span>
              </h3>
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                Use this for in-person payments or phone enrollments. Paid/active records trigger welcome and admin emails.
              </p>
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--admin-border)] bg-white text-[var(--color-primary)] transition group-open:bg-[var(--color-primary)] group-open:text-white">
              <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
            </div>
          </div>
        </summary>
        <form action={createEnrollmentAction} className="grid gap-3 border-t border-[var(--admin-border)] p-4">
          <div className="flex items-center gap-2 rounded-md border border-[var(--admin-border)] bg-white px-3 py-2 text-sm font-semibold text-[var(--color-primary)]">
            <ClipboardCheck className="h-4 w-4" />
            New enrollment details
          </div>
          <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr_0.8fr]">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Plan</span>
              <select name="planId" required className="input select">
                <option value="">Select plan</option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Patient Name</span>
              <input name="patientName" className="input" placeholder="Patient name" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Email</span>
              <input name="patientEmail" type="email" required className="input" placeholder="patient@email.com" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Phone</span>
              <input name="patientPhone" className="input" placeholder="(703) 000-0000" />
            </label>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Status</span>
              <select name="status" defaultValue="active" className="input select">
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Amount Paid</span>
              <input name="amountPaid" inputMode="decimal" className="input" placeholder="0.00" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Payment Method</span>
              <input name="paymentMethod" className="input" placeholder="Cash, card, check" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Start</span>
              <input name="startsAt" type="date" className="input" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Next Visit</span>
              <input name="nextVisitAt" type="date" className="input" />
            </label>
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Notes</span>
              <input name="notes" className="input" placeholder="Dose, supplies, follow-up instructions, staff notes" />
            </label>
            <AdminSubmitButton className="btn btn-primary" pendingLabel="Adding...">
              Add enrollment
            </AdminSubmitButton>
          </div>
        </form>
      </details>

      <section className="admin-card p-4">
        <form className="grid gap-3 xl:grid-cols-[minmax(240px,1.2fr)_minmax(180px,0.8fr)_180px_140px_auto]">
          <input type="hidden" name="page" value="1" />
          <div className="search-wrapper">
            <Search className="search-icon" />
            <input
              name="query"
              defaultValue={query}
              placeholder="Search name, email, phone, code, plan..."
              className="input"
            />
          </div>
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
            <option value="paid">Paid / active</option>
            <option value="unpaid">Unpaid / pending</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select name="pageSize" defaultValue={pageSize} className="input select">
            {PAGE_SIZE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option} / page
              </option>
            ))}
          </select>
          <AdminSubmitButton className="btn btn-primary" pendingLabel="Filtering...">
            <Search className="h-4 w-4" />
            Search
          </AdminSubmitButton>
        </form>
        <div className="mt-4 flex flex-col gap-3 border-t border-[var(--admin-border)] pt-4 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
          <div>
            Showing <span className="font-semibold text-neutral-900">{showingStart}-{showingEnd}</span> of{" "}
            <span className="font-semibold text-neutral-900">{filteredEnrollments.length}</span> enrollments
            {query ? <> matching <span className="font-semibold text-neutral-900">{query}</span></> : null}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={buildHref({ page: Math.max(1, currentPage - 1) })}
              aria-disabled={currentPage <= 1}
              className={`btn btn-secondary ${currentPage <= 1 ? "pointer-events-none opacity-50" : ""}`}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Link>
            <span className="rounded-md border border-[var(--admin-border)] bg-white px-2.5 py-1.5 font-semibold text-neutral-900">
              Page {currentPage} of {totalPages}
            </span>
            <Link
              href={buildHref({ page: Math.min(totalPages, currentPage + 1) })}
              aria-disabled={currentPage >= totalPages}
              className={`btn btn-secondary ${currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}`}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-3">
        {visibleEnrollments.map((enrollment) => {
          const code = enrollmentCode(enrollment);
          const payment = paymentState(enrollment.status);
          return (
            <article key={enrollment.id} className="admin-card p-4">
              <div className="grid gap-3 xl:grid-cols-[minmax(0,1.4fr)_minmax(460px,0.9fr)] xl:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-[var(--color-primary)] px-2.5 py-1 font-mono text-xs font-semibold tracking-[0.08em] text-white">
                      {code}
                    </span>
                    <span className={`rounded-md border px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] ${payment.className}`}>
                      {payment.label}
                    </span>
                    <span className="admin-pill capitalize">{enrollment.status}</span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-neutral-950">{enrollment.patientName ?? "Patient"}</h3>
                  <div className="mt-1 text-sm text-neutral-600">
                    {enrollment.patientEmail}
                    {enrollment.patientPhone ? ` · ${enrollment.patientPhone}` : ""}
                  </div>
                  <div className="mt-3 text-sm font-semibold text-neutral-900">{planLabel(enrollment.plan)}</div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-[var(--color-bg-gray)] p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Payment</div>
                    <div className="mt-1 font-semibold text-neutral-950">{formatMoney(enrollment.amountPaidCents, enrollment.plan?.currency)}</div>
                    <div className="text-xs text-neutral-500">{enrollment.paymentMethod ?? "method not set"}</div>
                  </div>
                  <div className="rounded-lg bg-[var(--color-bg-gray)] p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Attendance</div>
                    <div className="mt-1 font-semibold text-neutral-950">{enrollment.visitCount ?? 0} visits</div>
                    <div className="text-xs text-neutral-500">last {formatDate(enrollment.lastVisitAt)}</div>
                  </div>
                  <div className="rounded-lg bg-[var(--color-bg-gray)] p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Next Visit</div>
                    <div className="mt-1 font-semibold text-neutral-950">{formatDate(enrollment.nextVisitAt)}</div>
                    <div className="text-xs text-neutral-500">follow-up target</div>
                  </div>
                  <div className="rounded-lg bg-[var(--color-bg-gray)] p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Enrollment</div>
                    <div className="mt-1 font-semibold text-neutral-950">{formatDate(enrollment.enrolledAt ?? enrollment.createdAt)}</div>
                    <div className="text-xs text-neutral-500">code sent by email</div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 border-t border-[var(--admin-border)] pt-3">
                <Link href={`/admin/treatment-plans/attendance?code=${encodeURIComponent(code)}`} className="btn btn-primary">
                  Record visit
                </Link>
                <details className="w-full rounded-lg border border-[var(--admin-border)] bg-white p-3 xl:w-auto xl:flex-1">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--color-primary)]">
                    Edit payment or follow-up
                  </summary>
                  <form action={updateEnrollmentAction.bind(null, enrollment.id)} className="mt-3 grid gap-3 xl:grid-cols-6 xl:items-end">
                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">Status</span>
                      <select name="status" defaultValue={enrollment.status} className="input select">
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">Amount</span>
                      <input name="amountPaid" inputMode="decimal" defaultValue={dollarsInput(enrollment.amountPaidCents)} className="input" />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">Method</span>
                      <input name="paymentMethod" defaultValue={enrollment.paymentMethod ?? ""} className="input" />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">Next Visit</span>
                      <input name="nextVisitAt" type="date" defaultValue={dateInputValue(enrollment.nextVisitAt)} className="input" />
                    </label>
                    <label className="block xl:col-span-2">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">Notes</span>
                      <input name="notes" defaultValue={enrollment.notes ?? ""} className="input" />
                    </label>
                    <AdminSubmitButton className="btn btn-secondary xl:col-start-6" pendingLabel="Saving...">
                      Save
                    </AdminSubmitButton>
                  </form>
                </details>
                <AdminConfirmDeleteButton
                  action={deleteEnrollmentAction.bind(null, enrollment.id)}
                  title="Delete this enrollment?"
                  description={`This removes enrollment ${code} for ${enrollment.patientName ?? enrollment.patientEmail}, along with their attendance history. This cannot be undone.`}
                />
              </div>
            </article>
          );
        })}
        {!visibleEnrollments.length ? (
          <div className="admin-card p-6 text-center text-neutral-500">
            No enrollments match the current filters.
          </div>
        ) : null}
      </section>
    </div>
  );
}
