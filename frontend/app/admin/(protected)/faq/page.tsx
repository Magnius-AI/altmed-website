import { createFaqAction, deleteFaqAction, updateFaqAction } from "./actions";
import { getAdminFaqs } from "@/lib/api";

export default async function AdminFaqPage() {
  const faqs = await getAdminFaqs();

  return (
    <div className="space-y-6">
      <section className="admin-card p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="admin-label">FAQs</div>
            <h2 className="mt-2 text-3xl font-semibold text-neutral-900">Question library</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-neutral-600">
              Keep high-intent patient questions organized by category, order, and activity state.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="admin-pill">{faqs.length} FAQs</span>
            <a href="#new-faq" className="admin-action">
              Add FAQ
            </a>
          </div>
        </div>
      </section>

      <section id="new-faq" className="admin-card p-6">
        <div className="admin-label">New FAQ</div>
        <form action={createFaqAction} className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_1.4fr_0.8fr_auto]">
          <input
            type="text"
            name="question"
            required
            placeholder="Question"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <textarea
            name="answer"
            rows={3}
            required
            placeholder="Answer"
            className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          />
          <div className="grid gap-3">
            <input
              type="text"
              name="category"
              required
              placeholder="Category"
              className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
            />
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700">
              <input type="checkbox" name="isActive" defaultChecked />
              Active
            </label>
          </div>
          <button type="submit" className="admin-action h-fit justify-center">
            Add FAQ
          </button>
        </form>
      </section>

      <section className="admin-card overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4">
          <div className="admin-label">FAQ List</div>
          <div className="mt-1 text-sm text-neutral-500">Update copy, ordering, or activity per question</div>
        </div>
        <div className="divide-y divide-slate-200">
          {faqs.map((faq, index) => (
            <form
              key={faq.id}
              action={updateFaqAction.bind(null, faq.id!)}
              className="grid gap-4 px-6 py-5 lg:grid-cols-[1fr_1.3fr_0.8fr_auto]"
            >
              <div className="grid gap-3">
                <input
                  type="text"
                  name="question"
                  defaultValue={faq.question}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                />
                <input
                  type="number"
                  name="displayOrder"
                  defaultValue={faq.displayOrder ?? index}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                />
              </div>
              <textarea
                name="answer"
                rows={4}
                defaultValue={faq.answer}
                className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
              />
              <div className="grid gap-3">
                <input
                  type="text"
                  name="category"
                  defaultValue={faq.category ?? "General"}
                  className="focus-ring rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
                />
                <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700">
                  <input type="checkbox" name="isActive" defaultChecked={faq.isActive ?? true} />
                  Active
                </label>
              </div>
              <div className="flex flex-col gap-3">
                <button type="submit" className="admin-secondary-action justify-center">
                  Save
                </button>
                <button
                  formAction={deleteFaqAction.bind(null, faq.id!)}
                  className="focus-ring inline-flex items-center justify-center rounded-full border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700"
                >
                  Delete
                </button>
              </div>
            </form>
          ))}
        </div>
      </section>
    </div>
  );
}
