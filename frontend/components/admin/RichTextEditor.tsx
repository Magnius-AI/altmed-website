"use client";

import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
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
  Pilcrow,
  Quote,
  Redo2,
  RemoveFormatting,
  Underline,
  Undo2,
  X
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

const allowedEditorTags = new Set([
  "A",
  "BLOCKQUOTE",
  "BR",
  "EM",
  "H2",
  "H3",
  "HR",
  "IMG",
  "LI",
  "OL",
  "P",
  "STRONG",
  "U",
  "UL"
]);

const discardedEditorTags = new Set(["EMBED", "IFRAME", "LINK", "META", "NOSCRIPT", "OBJECT", "SCRIPT", "STYLE"]);
const blockEditorTags = new Set(["BLOCKQUOTE", "H2", "H3", "HR", "IMG", "OL", "P", "UL"]);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function textToParagraphHtml(value: string) {
  return value
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function normalizeUrl(value: string, kind: "image" | "link") {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }

  try {
    const origin = typeof window === "undefined" ? "https://altmedfirst.com" : window.location.origin;
    const parsed = new URL(trimmed, origin);
    const allowedProtocols =
      kind === "image" ? ["http:", "https:"] : ["http:", "https:", "mailto:", "tel:"];

    return allowedProtocols.includes(parsed.protocol) ? trimmed : null;
  } catch {
    return null;
  }
}

function replaceElement(element: HTMLElement, tagName: string) {
  const replacement = document.createElement(tagName);
  while (element.firstChild) {
    replacement.appendChild(element.firstChild);
  }
  element.replaceWith(replacement);
  return replacement;
}

function unwrapElement(element: HTMLElement) {
  element.replaceWith(...Array.from(element.childNodes));
}

function cleanAttributes(element: HTMLElement) {
  const tagName = element.tagName;
  const href = tagName === "A" ? normalizeUrl(element.getAttribute("href") ?? "", "link") : null;
  const src = tagName === "IMG" ? normalizeUrl(element.getAttribute("src") ?? "", "image") : null;
  const alt = tagName === "IMG" ? element.getAttribute("alt") ?? "" : "";

  Array.from(element.attributes).forEach((attribute) => element.removeAttribute(attribute.name));

  if (tagName === "A") {
    if (!href) {
      unwrapElement(element);
      return;
    }
    element.setAttribute("href", href);
    if (/^https?:\/\//i.test(href)) {
      element.setAttribute("rel", "noopener noreferrer");
      element.setAttribute("target", "_blank");
    }
  }

  if (tagName === "IMG") {
    if (!src) {
      element.remove();
      return;
    }
    element.setAttribute("src", src);
    element.setAttribute("alt", alt.trim());
  }
}

function normalizeElement(element: HTMLElement) {
  Array.from(element.childNodes).forEach((child) => sanitizeNode(child));

  const tagName = element.tagName;
  if (discardedEditorTags.has(tagName)) {
    element.remove();
    return;
  }

  if (tagName === "B") {
    cleanAttributes(replaceElement(element, "strong"));
    return;
  }

  if (tagName === "I") {
    cleanAttributes(replaceElement(element, "em"));
    return;
  }

  if (tagName === "H1") {
    cleanAttributes(replaceElement(element, "h2"));
    return;
  }

  if (["H4", "H5", "H6"].includes(tagName)) {
    cleanAttributes(replaceElement(element, "h3"));
    return;
  }

  if (tagName === "DIV") {
    if (element.querySelector("blockquote,h1,h2,h3,h4,h5,h6,hr,ol,p,ul")) {
      unwrapElement(element);
      return;
    }
    cleanAttributes(replaceElement(element, "p"));
    return;
  }

  if (!allowedEditorTags.has(tagName)) {
    unwrapElement(element);
    return;
  }

  cleanAttributes(element);
}

function sanitizeNode(node: Node) {
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return;
  }

  normalizeElement(node as HTMLElement);
}

function normalizeRootBlocks(container: DocumentFragment) {
  const fragment = document.createDocumentFragment();
  let paragraph = document.createElement("p");
  let hasInlineContent = false;

  const flushParagraph = () => {
    if (!hasInlineContent) {
      return;
    }
    fragment.appendChild(paragraph);
    paragraph = document.createElement("p");
    hasInlineContent = false;
  };

  Array.from(container.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && !node.textContent?.trim()) {
      node.remove();
      return;
    }

    if (node.nodeType === Node.ELEMENT_NODE && blockEditorTags.has((node as HTMLElement).tagName)) {
      flushParagraph();
      fragment.appendChild(node);
      return;
    }

    hasInlineContent = true;
    paragraph.appendChild(node);
  });

  flushParagraph();
  container.replaceChildren(fragment);
}

function removeEmptyBlocks(container: DocumentFragment) {
  container.querySelectorAll("blockquote,h2,h3,li,p").forEach((element) => {
    if (!element.textContent?.trim() && !element.querySelector("br,img")) {
      element.remove();
    }
  });
}

function sanitizeEditorHtml(value: string) {
  if (typeof document === "undefined" || !value.trim()) {
    return value.trim();
  }

  const template = document.createElement("template");
  template.innerHTML = value;
  Array.from(template.content.childNodes).forEach((child) => sanitizeNode(child));
  normalizeRootBlocks(template.content);
  removeEmptyBlocks(template.content);
  return template.innerHTML.trim();
}

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
  const [editorError, setEditorError] = useState("");
  const [editorSuccess, setEditorSuccess] = useState("");
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  useEffect(() => {
    const nextHtml = sanitizeEditorHtml(value ?? "");
    if (editorRef.current && editorRef.current.innerHTML !== nextHtml) {
      editorRef.current.innerHTML = nextHtml;
      setHtml(nextHtml);
    }
  }, [value]);

  const sync = ({ sanitize = false } = {}) => {
    const editor = editorRef.current;
    if (!editor) {
      setHtml("");
      return;
    }

    let nextHtml = editor.innerHTML;
    if (sanitize) {
      const sanitizedHtml = sanitizeEditorHtml(nextHtml);
      if (sanitizedHtml !== nextHtml) {
        editor.innerHTML = sanitizedHtml;
        nextHtml = sanitizedHtml;
      }
    }

    setHtml(nextHtml);
  };

  const runCommand = (command: string, commandValue?: string, sanitize = false) => {
    setEditorError("");
    setEditorSuccess("");
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    sync({ sanitize });
  };

  const cleanFormatting = () => {
    editorRef.current?.focus();
    document.execCommand("removeFormat");
    sync({ sanitize: true });
    setEditorError("");
    setEditorSuccess("Formatting cleaned");
  };

  const insertImage = (url: string, alt = "") => {
    const safeUrl = normalizeUrl(url, "image");
    if (!safeUrl) {
      setEditorError("Enter a valid image URL.");
      setEditorSuccess("");
      return false;
    }

    editorRef.current?.focus();
    document.execCommand(
      "insertHTML",
      false,
      `<img src="${escapeHtml(safeUrl)}" alt="${escapeHtml(alt.trim())}" />`
    );
    sync({ sanitize: true });
    return true;
  };

  const addLink = () => {
    const url = window.prompt("Paste the link URL");
    if (!url) {
      return;
    }

    const safeUrl = normalizeUrl(url, "link");
    if (!safeUrl) {
      setEditorError("Enter a valid link URL.");
      setEditorSuccess("");
      return;
    }

    runCommand("createLink", safeUrl, true);
  };

  const addImage = () => {
    setEditorError("");
    setEditorSuccess("");
    setImageUrl("");
    setImageAlt("");
    setImageDialogOpen(true);
  };

  const submitImageUrl = () => {
    if (insertImage(imageUrl, imageAlt)) {
      setImageDialogOpen(false);
      setImageUrl("");
      setImageAlt("");
      setEditorError("");
      setEditorSuccess("Image inserted");
    }
  };

  const handleImageDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setImageDialogOpen(false);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      submitImageUrl();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    const clipboard = event.clipboardData;
    const pastedHtml = clipboard.getData("text/html");
    const pastedText = clipboard.getData("text/plain");
    const sanitizedHtml = pastedHtml ? sanitizeEditorHtml(pastedHtml) : "";
    const fallbackHtml = pastedText.includes("\n") ? textToParagraphHtml(pastedText) : escapeHtml(pastedText);
    const htmlToInsert = sanitizedHtml || fallbackHtml;

    if (!htmlToInsert) {
      return;
    }

    event.preventDefault();
    document.execCommand("insertHTML", false, htmlToInsert);
    sync({ sanitize: true });
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    setEditorError("");
    setEditorSuccess("");

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
      setEditorSuccess("Image inserted");
    } catch (error) {
      setEditorError(error instanceof Error ? error.message : "Image upload failed");
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
        <span className="text-xs text-neutral-500">Paragraphs, headings, links, lists, quotes, and images</span>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap gap-1 border-b border-slate-200 bg-slate-50 p-2">
          <button
            type="button"
            title="Paragraph"
            onClick={() => runCommand("formatBlock", "p", true)}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 hover:bg-white"
          >
            <Pilcrow className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Heading 2"
            onClick={() => runCommand("formatBlock", "h2", true)}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 hover:bg-white"
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Heading 3"
            onClick={() => runCommand("formatBlock", "h3", true)}
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
            title="Clean formatting"
            onClick={cleanFormatting}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg text-neutral-700 hover:bg-white"
          >
            <RemoveFormatting className="h-4 w-4" />
          </button>
        </div>
        {editorError || editorSuccess ? (
          <div
            className={`flex items-center gap-2 border-b px-4 py-2 text-xs font-medium ${
              editorError
                ? "border-rose-100 bg-rose-50 text-rose-700"
                : "border-emerald-100 bg-emerald-50 text-emerald-700"
            }`}
          >
            {!editorError ? <CheckCircle2 className="h-4 w-4" /> : null}
            {editorError || editorSuccess}
          </div>
        ) : null}
        <div
          ref={editorRef}
          contentEditable
          role="textbox"
          aria-multiline="true"
          data-placeholder={placeholder}
          onInput={() => sync()}
          onPaste={handlePaste}
          onBlur={() => sync({ sanitize: true })}
          className="rich-editor prose-lite min-h-[460px] max-w-none p-5 text-sm text-neutral-700 outline-none"
          suppressContentEditableWarning
        />
      </div>
      <textarea name={name} value={html} readOnly hidden />
      {imageDialogOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/45 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="image-url-dialog-title"
          onKeyDown={handleImageDialogKeyDown}
        >
          <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="image-url-dialog-title" className="text-lg font-semibold text-neutral-900">
                  Insert image URL
                </h3>
                <p className="mt-1 text-sm leading-6 text-neutral-500">
                  Add a hosted image link and optional alt text.
                </p>
              </div>
              <button
                type="button"
                className="focus-ring rounded-md p-1.5 text-neutral-500 hover:bg-slate-100 hover:text-neutral-900"
                onClick={() => setImageDialogOpen(false)}
                aria-label="Close image URL dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-neutral-700">Image URL</span>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
                  autoFocus
                  placeholder="https://example.com/image.jpg"
                  className="focus-ring w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-neutral-700"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-neutral-700">Alt text</span>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(event) => setImageAlt(event.target.value)}
                  placeholder="Describe the image"
                  className="focus-ring w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-neutral-700"
                />
              </label>
            </div>
            <div className="mt-5 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                className="focus-ring rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-neutral-700"
                onClick={() => setImageDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="focus-ring rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white"
                onClick={submitImageUrl}
              >
                Insert image
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
