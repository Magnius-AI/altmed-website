import Link from "next/link";
import { AlertCircle, CalendarCheck2, CheckCircle2, Clock3, Search } from "lucide-react";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { AdminToast } from "@/components/admin/AdminToast";
import { getAdminPlanAttendance, type PlanAttendance } from "@/lib/api";
import { recordAttendanceAction } from "../actions";

const PAID_STATUSES = new Set(["paid", "active", "completed"]);

function todayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

function formatDateTime(value?: string | null) {
  return value
    ? new Date(value).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
      })
    : "-";
}

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "-";
}

function isToday(value?: string | null) {
  if (!value) {
    return false;
  }
  return new Date(value).toDateString() === new Date().toDateString();
}

function isThisMonth(value?: string | null) {
  if (!value) {
    return false;
  }
  const date = new Date(value);
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
}

function paymentBadge(record: PlanAttendance) {
  const status = record.enrollment?.status ?? "unknown";
  if (PAID_STATUSES.has(status)) {
    return { label: "Paid", className: "border-emerald-200 bg-emerald-50 text-emerald-800" };
  }
  return { label: "Check payment", className: "border-amber-200 bg-amber-50 text-amber-800" };
}

function savedMessage(saved?: string) {
  return saved === "attendance" ? "Attendance recorded successfully." : null;
}

export default async function AttendancePage({
  searchParams
}: {
  searchParams?: { code?: string; saved?: string; error?: string };
}) {
  const code = searchParams?.code?.trim() ?? "";
  const attendance = await getAdminPlanAttendance({ code });
  const visitsToday = attendance.filter((record) => isToday(record.visitedAt)).length;
  const visitsThisMonth = attendance.filter((record) => isThisMonth(record.visitedAt)).length;
  const paymentWarnings = attendance.filter((record) => !PAID_STATUSES.has(record.enrollment?.status ?? "")).length;

  const stats = [
    { label: "Visits Today", value: visitsToday, detail: "Recorded attendance rows", icon: CalendarCheck2 },
    { label: "This Month", value: visitsThisMonth, detail: "Recent treatment visits", icon: Clock3 },
    { label: "Payment Warnings", value: paymentWarnings, detail: "Attendance with unpaid status", icon: AlertCircle }
  ];
  const toastMessage = searchParams?.error ?? savedMessage(searchParams?.saved);

  return (
    <div className="grid gap-4">
      <AdminToast message={toastMessage} variant={searchParams?.error ? "error" : "success"} />

      <section className="admin-card p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="admin-label">Attendance</div>
            <h2 className="mt-1.5 text-xl font-semibold text-neutral-900">Record a treatment visit by enrollment code</h2>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-neutral-600">
              Ask for the enrollment ID from the welcome email, enter it here, and record the visit. Payment status remains visible before staff proceed.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/treatment-plans/enrollments?status=unpaid" className="btn btn-secondary">
              Unpaid enrollments
            </Link>
            <Link href="/admin/treatment-plans/enrollments" className="btn btn-secondary">
              All enrollments
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="admin-card p-4">
          <div className="admin-label">Quick Check-In</div>
          <form action={recordAttendanceAction} className="mt-3 grid gap-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Enrollment ID</span>
              <input
                name="enrollmentCode"
                defaultValue={code}
                required
                autoFocus
                className="input font-mono text-sm font-semibold tracking-[0.06em]"
                placeholder="AM-1234-ABCD"
              />
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-neutral-700">Visit Date</span>
                <input name="visitedAt" type="date" defaultValue={todayInputValue()} className="input" />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-neutral-700">Staff</span>
                <input name="staffName" className="input" placeholder="Optional" />
              </label>
            </div>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-neutral-700">Visit Note</span>
              <input name="notes" className="input" placeholder="Optional note, dose, or next instruction" />
            </label>
            <AdminSubmitButton className="btn btn-primary w-fit" pendingLabel="Recording...">
              <CheckCircle2 className="h-4 w-4" />
              Record visit
            </AdminSubmitButton>
          </form>
        </div>

        <div className="grid gap-4">
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
        </div>
      </section>

      <section className="admin-card p-4">
        <form className="grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="search-wrapper">
            <Search className="search-icon" />
            <input name="code" defaultValue={code} placeholder="Filter by enrollment ID" className="input font-mono tracking-[0.06em]" />
          </div>
          <AdminSubmitButton className="btn btn-secondary" pendingLabel="Searching...">
            <Search className="h-4 w-4" />
            Search visits
          </AdminSubmitButton>
        </form>
      </section>

      <section className="grid gap-3">
        {attendance.map((record) => {
          const payment = paymentBadge(record);
          const enrollment = record.enrollment;
          return (
            <article key={record.id} className="admin-card p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-[var(--color-primary)] px-2.5 py-1 font-mono text-xs font-semibold tracking-[0.08em] text-white">
                      {record.enrollmentCode}
                    </span>
                    <span className={`rounded-md border px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] ${payment.className}`}>
                      {payment.label}
                    </span>
                    {enrollment ? <span className="admin-pill capitalize">{enrollment.status}</span> : null}
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-neutral-950">{enrollment?.patientName ?? "Patient"}</h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    {enrollment?.plan?.name ?? "Unknown plan"}
                    {enrollment?.patientPhone ? ` · ${enrollment.patientPhone}` : ""}
                  </p>
                  {record.notes ? <p className="mt-3 text-sm leading-6 text-neutral-600">{record.notes}</p> : null}
                </div>
                <div className="grid min-w-[240px] gap-2 rounded-lg bg-[var(--color-bg-gray)] p-3 text-sm">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Visit</div>
                    <div className="font-semibold text-neutral-950">{formatDateTime(record.visitedAt)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Patient Visit Count</div>
                    <div className="font-semibold text-neutral-950">{enrollment?.visitCount ?? 0} visits</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Next Visit</div>
                    <div className="font-semibold text-neutral-950">{formatDate(enrollment?.nextVisitAt)}</div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
        {!attendance.length ? (
          <div className="admin-card p-6 text-center text-neutral-500">
            No attendance records found.
          </div>
        ) : null}
      </section>
    </div>
  );
}
