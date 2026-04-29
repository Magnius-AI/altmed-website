type Props = {
  fileInputName?: string;
  urlInputName?: string;
  altInputName?: string;
  defaultUrl?: string | null;
  defaultAlt?: string | null;
  label?: string;
};

export function ImageUpload({
  fileInputName = "imageFile",
  urlInputName = "featuredImage",
  altInputName = "featuredImageAlt",
  defaultUrl,
  defaultAlt,
  label = "Featured image"
}: Props) {
  return (
    <div className="rounded-[14px] border border-slate-200 bg-white p-5">
      <div className="text-sm font-semibold text-neutral-900">{label}</div>
      <p className="mt-1 text-sm text-neutral-500">
        Upload an image file or keep a hosted image URL.
      </p>
      <div className="mt-4 grid gap-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-neutral-700">Upload file</span>
          <input
            type="file"
            name={fileInputName}
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="focus-ring block w-full rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3 text-sm text-neutral-600"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-neutral-700">Image URL</span>
          <input
            type="text"
            name={urlInputName}
            defaultValue={defaultUrl ?? ""}
            className="focus-ring w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-neutral-700"
            placeholder="/uploads/example.webp"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-neutral-700">Alt text</span>
          <input
            type="text"
            name={altInputName}
            defaultValue={defaultAlt ?? ""}
            className="focus-ring w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-neutral-700"
            placeholder="Describe the image for accessibility and SEO"
          />
        </label>
        {defaultUrl ? (
          <div className="rounded-lg bg-slate-50 p-3 text-sm text-neutral-600">
            Current image: <span className="font-mono text-xs">{defaultUrl}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
