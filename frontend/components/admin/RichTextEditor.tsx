"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bold,
  CheckCircle2,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo2,
  RemoveFormatting,
  Underline,
  Undo2
} from "lucide-react";

type Props = {
  name?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  rows?: number;
};

const commands = [
  { label: "Bold", icon: Bold, command: "bold" },
  { label: "Italic", icon: Italic, command: "italic" },
  { label: "Underline", icon: Underline, command: "underline" },
  { label: "Bulleted list", icon: List, command: "insertUnorderedList" },
  { label: "Numbered list", icon: ListOrdered, command: "insertOrderedList" },
  { label: "Quote", icon: Quote, command: "formatBlock", value: "blockquote" }
];

export function RichTextEditor({
  name,
  value,
  label = "Content",
  placeholder = "Write here..."
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [html, setHtml] = useState(value ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== (value ?? "")) {
      editorRef.current.innerHTML = value ?? "";
      setHtml(value ?? "");
    }
  }, [value]);

  const sync = () => {
    setHtml(editorRef.current?.innerHTML ?? "");
  };

  const runCommand = (command: string, commandValue?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    sync();
  };

  const insertImage = (url: string, alt = "") => {
    editorRef.current?.focus();
    document.execCommand("insertHTML", false, `<img src="${url}" alt="${alt.replace(/"/g, "&quot;")}" />`);
    sync();
  };

  const addLink = () => {
    const url = window.prompt("Paste the link URL");
    if (!url) {
      return;
    }
    runCommand("createLink", url);
  };

  const addImage = () => {
    const url = window.prompt("Paste the image URL");
    if (!url) {
      return;
    }
    insertImage(url);
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData
      });
      const payload = (await response.json().catch(() => null)) as
        | { data?: { url?: string }; url?: string; message?: string }
        | null;
      const url = payload?.data?.url ?? payload?.url;

      if (!response.ok || !url) {
        throw new Error(payload?.message ?? "Image upload failed");
      }

      insertImage(url, file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
      setUploadSuccess("Image inserted");
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Image upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="block">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-medium text-neutral-700">{label}</span>
        <span className="text-xs text-neutral-500">Headings, links, lists, quotes, and images</span>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2">
          <button
            type="button"
            title="Heading 2"
            onClick={() => runCommand("formatBlock", "h2")}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 hover:bg-white"
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Heading 3"
            onClick={() => runCommand("formatBlock", "h3")}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 hover:bg-white"
          >
            <Heading3 className="h-4 w-4" />
          </button>
          {commands.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                title={item.label}
                onClick={() => runCommand(item.command, item.value)}
                className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 hover:bg-white"
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
          <button
            type="button"
            title="Link"
            onClick={addLink}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 hover:bg-white"
          >
            <LinkIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Image URL"
            onClick={addImage}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 hover:bg-white"
          >
            <ImageIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Upload image"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="focus-ring inline-flex h-9 items-center justify-center gap-2 rounded-lg px-3 text-xs font-semibold text-neutral-700 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ImageIcon className="h-4 w-4" />
            {uploading ? "Uploading" : "Upload"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            hidden
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void uploadImage(file);
              }
            }}
          />
          <button
            type="button"
            title="Undo"
            onClick={() => runCommand("undo")}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 hover:bg-white"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Redo"
            onClick={() => runCommand("redo")}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 hover:bg-white"
          >
            <Redo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Clear formatting"
            onClick={() => runCommand("removeFormat")}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 hover:bg-white"
          >
            <RemoveFormatting className="h-4 w-4" />
          </button>
        </div>
        {uploadError || uploadSuccess ? (
          <div
            className={`flex items-center gap-2 border-b px-4 py-2 text-xs font-medium ${
              uploadError
                ? "border-rose-100 bg-rose-50 text-rose-700"
                : "border-emerald-100 bg-emerald-50 text-emerald-700"
            }`}
          >
            {!uploadError ? <CheckCircle2 className="h-4 w-4" /> : null}
            {uploadError || uploadSuccess}
          </div>
        ) : null}
        <div
          ref={editorRef}
          contentEditable
          role="textbox"
          aria-multiline="true"
          data-placeholder={placeholder}
          onInput={sync}
          onBlur={sync}
          className="rich-editor prose-lite min-h-[460px] max-w-none p-5 text-sm text-neutral-700 outline-none"
          suppressContentEditableWarning
        />
      </div>
      <textarea name={name} value={html} readOnly hidden />
    </div>
  );
}
