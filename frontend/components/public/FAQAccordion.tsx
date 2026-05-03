import { Plus } from "lucide-react";

type Props = {
  items: Array<{ id?: string; question: string; answer: string }>;
};

export function FAQAccordion({ items }: Props) {
  return (
    <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
      {items.map((item, index) => (
        <details
          key={item.id ?? index}
          className="group bg-transparent"
        >
          <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold text-[var(--color-text-primary)] transition group-open:text-[var(--color-primary)]">
            <span>{item.question}</span>
            <Plus className="h-5 w-5 shrink-0 text-[var(--color-primary)] transition-transform duration-200 group-open:rotate-45" />
          </summary>
          <div className="pb-5 text-base leading-7 text-[var(--color-text-secondary)] transition-opacity duration-200 group-open:opacity-100">
            <div dangerouslySetInnerHTML={{ __html: item.answer }} />
          </div>
        </details>
      ))}
    </div>
  );
}
