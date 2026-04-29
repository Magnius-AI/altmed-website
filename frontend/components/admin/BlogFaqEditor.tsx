"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

type BlogFaq = {
  question: string;
  answer: string;
};

type Props = {
  defaultFaqs?: BlogFaq[] | null;
};

export function BlogFaqEditor({ defaultFaqs }: Props) {
  const initialFaqs = defaultFaqs?.length ? defaultFaqs : [{ question: "", answer: "" }];
  const [faqs, setFaqs] = useState<BlogFaq[]>(initialFaqs);
  const serializedFaqs = useMemo(
    () =>
      JSON.stringify(
        faqs
          .map((faq) => ({ question: faq.question.trim(), answer: faq.answer.trim() }))
          .filter((faq) => faq.question || faq.answer)
      ),
    [faqs]
  );

  const updateFaq = (index: number, field: keyof BlogFaq, value: string) => {
    setFaqs((items) => items.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)));
  };

  const removeFaq = (index: number) => {
    setFaqs((items) => (items.length > 1 ? items.filter((_, itemIndex) => itemIndex !== index) : [{ question: "", answer: "" }]));
  };

  return (
    <section className="admin-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="admin-label">Article FAQ</div>
          <p className="mt-1 text-sm text-neutral-600">Add questions that belong under this blog post.</p>
        </div>
        <button
          type="button"
          onClick={() => setFaqs((items) => [...items, { question: "", answer: "" }])}
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-neutral-700 hover:bg-slate-50"
          title="Add FAQ"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <input type="hidden" name="faqsJson" value={serializedFaqs} />
      <div className="mt-4 space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-neutral-900">FAQ {index + 1}</div>
              <button
                type="button"
                onClick={() => removeFaq(index)}
                className="focus-ring inline-flex h-8 w-8 items-center justify-center rounded-lg text-rose-700 hover:bg-white"
                title="Remove FAQ"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <label className="mt-3 block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                Question
              </span>
              <input
                type="text"
                value={faq.question}
                onChange={(event) => updateFaq(index, "question", event.target.value)}
                className="focus-ring w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-neutral-700"
              />
            </label>
            <label className="mt-3 block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                Answer
              </span>
              <textarea
                rows={3}
                value={faq.answer}
                onChange={(event) => updateFaq(index, "answer", event.target.value)}
                className="focus-ring w-full rounded-lg border border-slate-200 px-3 py-2 text-sm leading-6 text-neutral-700"
              />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
