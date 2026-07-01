"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type Props = {
  fileInputName?: string;
  urlInputName?: string;
  altInputName?: string;
  removeInputName?: string;
  defaultUrl?: string | null;
  defaultAlt?: string | null;
  label?: string;
};

export function ImageUpload({
  fileInputName = "imageFile",
  urlInputName = "featuredImage",
  altInputName = "featuredImageAlt",
  removeInputName = "removeFeaturedImage",
  defaultUrl,
  defaultAlt,
  label = "Featured image"
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectPreviewRef = useRef("");
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [alt, setAlt] = useState(defaultAlt ?? "");
  const [previewUrl, setPreviewUrl] = useState(defaultUrl ?? "");
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    return () => {
      if (objectPreviewRef.current) {
        URL.revokeObjectURL(objectPreviewRef.current);
      }
    };
  }, []);

  const replacePreview = (nextUrl: string) => {
    if (objectPreviewRef.current && objectPreviewRef.current !== nextUrl) {
      URL.revokeObjectURL(objectPreviewRef.current);
    }
    objectPreviewRef.current = nextUrl.startsWith("blob:") ? nextUrl : "";
    setPreviewUrl(nextUrl);
  };

  const clearImage = () => {
    setUrl("");
    setAlt("");
    setRemoved(true);
    replacePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-[14px] border border-slate-200 bg-white p-5">
      <div className="text-sm font-semibold text-neutral-900">{label}</div>
      <p className="mt-1 text-sm text-neutral-500">
        Upload an image file or keep a hosted image URL. In production, uploads use S3 when the backend has AWS_S3_BUCKET and AWS_REGION set; otherwise they save to /uploads locally.
      </p>
      <div className="mt-4 grid gap-4">
        {previewUrl ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="relative h-32 overflow-hidden rounded-md border border-slate-200 bg-white">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${previewUrl})` }}
                aria-label="Featured image preview"
                role="img"
              />
              <button
                type="button"
                onClick={clearImage}
                className="focus-ring absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/95 text-rose-700 shadow-sm hover:bg-rose-50"
                aria-label="Remove featured image"
                title="Remove featured image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 truncate font-mono text-xs text-neutral-500">{url || "New upload selected"}</div>
          </div>
        ) : null}
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-neutral-700">
            {previewUrl ? "Replace with upload" : "Upload file"}
          </span>
          <input
            ref={fileInputRef}
            type="file"
            name={fileInputName}
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="focus-ring block w-full rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3 text-sm text-neutral-600"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) {
                return;
              }
              setRemoved(false);
              setUrl("");
              replacePreview(URL.createObjectURL(file));
              if (!alt) {
                setAlt(file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
              }
            }}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-neutral-700">Image URL</span>
          <input
            type="text"
            name={urlInputName}
            value={url}
            onChange={(event) => {
              const nextUrl = event.target.value;
              setUrl(nextUrl);
              setRemoved(!nextUrl.trim());
              replacePreview(nextUrl.trim());
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            className="focus-ring w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-neutral-700"
            placeholder="/uploads/example.webp"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-neutral-700">Alt text</span>
          <input
            type="text"
            name={altInputName}
            value={alt}
            onChange={(event) => setAlt(event.target.value)}
            className="focus-ring w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-neutral-700"
            placeholder="Describe the image for accessibility and SEO"
          />
        </label>
        <input type="hidden" name={removeInputName} value={removed ? "true" : "false"} />
      </div>
    </div>
  );
}
