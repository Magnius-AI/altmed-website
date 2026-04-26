import { ChevronDown } from "lucide-react";

type Props = {
  items: Array<{ id?: string; question: string; answer: string }>;
};

export function FAQAccordion({ items }: Props) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <details
          key={item.id ?? index}
          className="group overflow-hidden rounded-[14px] border border-slate-200 bg-white"
        >
          <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-neutral-900">
            <span>{item.question}</span>
            <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="border-t border-slate-100 px-6 pb-5 pt-4 text-base leading-7 text-neutral-700">
            <div dangerouslySetInnerHTML={{ __html: item.answer }} />
          </div>
        </details>
      ))}
    </div>
  );
}
