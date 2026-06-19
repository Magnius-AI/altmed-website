import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { getAdminGoogleReviews } from "@/lib/api";
import {
  createGoogleReviewAction,
  deleteGoogleReviewAction,
  updateGoogleReviewAction
} from "./actions";

function toDateInput(value?: string | null) {
  if (!value) {
    return "";
  }

  return new Date(value).toISOString().slice(0, 10);
}

function RatingSelect({ defaultValue = 5 }: { defaultValue?: number }) {
  return (
    <select
      name="rating"
      defaultValue={defaultValue}
      className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
    >
      <option value={5}>5 stars</option>
      <option value={4}>4 stars</option>
    </select>
  );
}

export default async function AdminGoogleReviewsPage() {
  const reviews = await getAdminGoogleReviews();

  return (
    <div className="space-y-6">
      <section className="admin-card p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="admin-label">Google Reviews</div>
            <h2 className="mt-2 text-3xl font-semibold text-neutral-900">Manual Google review manager</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-neutral-600">
              Add only real Google reviews you have verified on the public Google listing. The
              homepage displays active reviews rated 4 or 5 stars.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="admin-pill">{reviews.length} reviews</span>
            <a href="#new-google-review" className="admin-action">
              Add review
            </a>
          </div>
        </div>
      </section>

      <section id="new-google-review" className="admin-card p-6">
        <div className="admin-label">New Google Review</div>
        <form action={createGoogleReviewAction} className="mt-6 grid gap-4 lg:grid-cols-2">
          <input
            type="text"
            name="reviewerName"
            required
            placeholder="Reviewer name as shown on Google"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <RatingSelect />
          <textarea
            name="reviewText"
            rows={5}
            required
            placeholder="Paste the Google review text"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700 lg:col-span-2"
          />
          <input
            type="date"
            name="reviewDate"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <input
            type="number"
            name="displayOrder"
            defaultValue={reviews.length + 1}
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <input
            type="url"
            name="sourceUrl"
            placeholder="Optional Google review or maps URL"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700 lg:col-span-2"
          />
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700">
            <input type="checkbox" name="isActive" defaultChecked />
            Show on public site
          </label>
          <AdminSubmitButton className="admin-action justify-center lg:col-span-2" pendingLabel="Adding review...">
            Add Google review
          </AdminSubmitButton>
        </form>
      </section>

      <section className="admin-card overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="admin-label">Review List</div>
          <div className="mt-1 text-sm text-neutral-500">
            Keep only verified 4-5 star Google reviews active for the homepage.
          </div>
        </div>
        <div className="divide-y divide-slate-200">
          {reviews.map((review) => (
            <form
              key={review.id}
              action={updateGoogleReviewAction.bind(null, review.id)}
              className="space-y-4 px-6 py-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="admin-pill">{review.rating} stars</span>
                {review.isActive ? <span className="admin-pill">Active</span> : <span className="admin-pill">Hidden</span>}
                <span className="admin-pill">Google review</span>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <input
                  type="text"
                  name="reviewerName"
                  defaultValue={review.reviewerName}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                />
                <RatingSelect defaultValue={review.rating} />
                <textarea
                  name="reviewText"
                  rows={5}
                  defaultValue={review.reviewText}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700 lg:col-span-2"
                />
                <input
                  type="date"
                  name="reviewDate"
                  defaultValue={toDateInput(review.reviewDate)}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                />
                <input
                  type="number"
                  name="displayOrder"
                  defaultValue={review.displayOrder ?? 0}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                />
                <input
                  type="url"
                  name="sourceUrl"
                  defaultValue={review.sourceUrl ?? ""}
                  placeholder="Optional Google review or maps URL"
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700 lg:col-span-2"
                />
              </div>
              <label className="inline-flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700">
                <input type="checkbox" name="isActive" defaultChecked={Boolean(review.isActive)} />
                Show on public site
              </label>
              <div className="flex flex-wrap gap-3">
                <AdminSubmitButton className="admin-secondary-action" pendingLabel="Saving changes...">
                  Save changes
                </AdminSubmitButton>
                <AdminSubmitButton
                  formAction={deleteGoogleReviewAction.bind(null, review.id)}
                  className="focus-ring inline-flex items-center rounded-full border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700"
                  pendingLabel="Deleting..."
                >
                  Delete
                </AdminSubmitButton>
              </div>
            </form>
          ))}
        </div>
      </section>
    </div>
  );
}
