import { getAdminContactStats, getAdminContactSubmissions } from "@/lib/api";
import {
  deleteContactSubmissionAction,
  markContactSubmissionReviewedAction
} from "./actions";

export default async function AdminContactSubmissionsPage() {
  const [stats, submissions] = await Promise.all([
    getAdminContactStats(),
    getAdminContactSubmissions()
  ]);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Received", stats.totalReceived],
          ["Blocked as Bot", stats.botBlocked],
          ["Reviewed", stats.reviewed],
          ["Pending", stats.unreviewed]
        ].map(([label, value]) => (
          <article key={label} className="admin-card p-5">
            <div className="text-sm text-neutral-500">{label}</div>
            <div className="mt-3 text-3xl font-semibold text-neutral-900">{value}</div>
          </article>
        ))}
      </section>
      <section className="admin-card p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="admin-label">Contact Inbox</div>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900">Submitted inquiries</h2>
          </div>
          <a
            href="/api/admin/contact-export"
            className="focus-ring rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-neutral-700"
          >
            Export CSV
          </a>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Subject</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Message</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id} className="border-t border-slate-200/80">
                  <td className="px-4 py-3 font-medium text-neutral-900">{submission.fullName}</td>
                  <td className="px-4 py-3 text-neutral-600">
                    <div>{submission.phone}</div>
                    <div className="text-xs text-slate-500">{submission.email}</div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{submission.subject ?? "General Inquiry"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        submission.isBot
                          ? "bg-rose-100 text-rose-700"
                          : submission.reviewed
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {submission.isBot
                        ? "Bot Flagged"
                        : submission.reviewed
                          ? "Reviewed"
                          : "Pending"}
                    </span>
                  </td>
                  <td className="max-w-md px-4 py-3 text-neutral-600">{submission.message}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {!submission.reviewed && !submission.isBot ? (
                        <form action={markContactSubmissionReviewedAction.bind(null, submission.id)}>
                          <button
                            type="submit"
                            className="focus-ring rounded-full border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700"
                          >
                            Mark reviewed
                          </button>
                        </form>
                      ) : null}
                      <form action={deleteContactSubmissionAction.bind(null, submission.id)}>
                        <button
                          type="submit"
                          className="focus-ring rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-700"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
