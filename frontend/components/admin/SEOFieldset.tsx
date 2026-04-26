type Props = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  canonicalUrl?: string | null;
};

export function SEOFieldset({
  metaTitle,
  metaDescription,
  metaKeywords,
  canonicalUrl
}: Props) {
  return (
    <div className="space-y-5 rounded-xl border bg-white p-5">
      <h3 className="text-lg font-semibold text-neutral-900">SEO Checklist</h3>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-neutral-700">Meta title</span>
        <input
          type="text"
          name="metaTitle"
          defaultValue={metaTitle ?? ""}
          className="focus-ring w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          placeholder="Keyword-first page title"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-neutral-700">Meta description</span>
        <textarea
          name="metaDescription"
          defaultValue={metaDescription ?? ""}
          rows={5}
          className="focus-ring w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          placeholder="Summarize the page and end with a clear CTA"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-neutral-700">Meta keywords</span>
        <input
          type="text"
          name="metaKeywords"
          defaultValue={metaKeywords ?? ""}
          className="focus-ring w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          placeholder="Comma-separated keyword ideas"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-neutral-700">Canonical URL</span>
        <input
          type="text"
          name="canonicalUrl"
          defaultValue={canonicalUrl ?? ""}
          className="focus-ring w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-neutral-700"
          placeholder="https://altmedfirst.com/health-blogs/example"
        />
      </label>
      <ul className="mt-4 space-y-2 text-sm text-neutral-700">
        <li>Primary keyword in H1</li>
        <li>Keyword in first 100 words</li>
        <li>2+ internal links</li>
        <li>1+ external link</li>
        <li>Image has alt text</li>
        <li>Meta description has CTA</li>
      </ul>
    </div>
  );
}
