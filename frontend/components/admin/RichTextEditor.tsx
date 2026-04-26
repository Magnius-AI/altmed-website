"use client";

type Props = {
  name?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  rows?: number;
};

export function RichTextEditor({
  name,
  value,
  label = "Content",
  placeholder = "Write here...",
  rows = 14
}: Props) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-neutral-700">{label}</span>
      <textarea
        name={name}
        defaultValue={value}
        rows={rows}
        placeholder={placeholder}
        className="focus-ring min-h-[220px] w-full rounded-xl border border-slate-200 bg-white p-4 text-sm text-neutral-700"
      />
    </label>
  );
}
