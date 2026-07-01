"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import type { BlogTaxonomy } from "@/lib/api";

type CategoryPickerProps = {
  categories: BlogTaxonomy[];
  defaultValue?: string | null;
};

type TagPickerProps = {
  tags: BlogTaxonomy[];
  defaultValues?: string[] | null;
};

function uniqueValues(values: string[]) {
  return values
    .map((value) => value.trim())
    .filter(Boolean)
    .filter((value, index, list) => list.findIndex((item) => item.toLowerCase() === value.toLowerCase()) === index);
}

function taxonomyNames(items: BlogTaxonomy[], selectedValues: string[] = []) {
  return uniqueValues([
    ...items
      .filter((item) => item.isActive ?? true)
      .map((item) => item.name),
    ...selectedValues
  ]).sort((a, b) => a.localeCompare(b));
}

export function BlogCategoryPicker({ categories, defaultValue }: CategoryPickerProps) {
  const [query, setQuery] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const categoryOptions = useMemo(() => taxonomyNames(categories, defaultValue ? [defaultValue] : []), [
    categories,
    defaultValue
  ]);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredCategories = categoryOptions
    .filter((category) => !normalizedQuery || category.toLowerCase().includes(normalizedQuery))
    .slice(0, 8);

  return (
    <div className="block">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-neutral-700">Category</span>
        <Link href="/admin/blog/categories" className="text-xs font-semibold text-primary">
          Manage
        </Link>
      </div>
      <input type="hidden" name="category" value={query.trim()} />
      <div className="relative">
        <div className="focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:ring-offset-2 flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
          <Search className="h-4 w-4 flex-none text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => window.setTimeout(() => setOpen(false), 120)}
            placeholder="Search or type category"
            className="!min-h-0 min-w-0 flex-1 !rounded-none !border-0 !bg-transparent !p-0 text-sm text-neutral-700 !shadow-none outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setOpen(false);
              }}
              className="focus-ring inline-flex h-7 w-7 flex-none items-center justify-center rounded-md text-neutral-500 hover:bg-slate-100"
              aria-label="Clear category"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        {open && filteredCategories.length ? (
          <div className="absolute z-30 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
            {filteredCategories.map((category) => (
              <button
                key={category}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setQuery(category);
                  setOpen(false);
                }}
                className="focus-ring flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-neutral-700 hover:bg-slate-50"
              >
                {category}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function BlogTagPicker({ tags, defaultValues = [] }: TagPickerProps) {
  const [selectedTags, setSelectedTags] = useState(() => uniqueValues(defaultValues ?? []));
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const tagOptions = useMemo(() => taxonomyNames(tags, selectedTags), [selectedTags, tags]);
  const normalizedQuery = query.trim().toLowerCase();
  const selectedLookup = useMemo(
    () => new Set(selectedTags.map((tag) => tag.toLowerCase())),
    [selectedTags]
  );
  const filteredTags = tagOptions
    .filter((tag) => !selectedLookup.has(tag.toLowerCase()))
    .filter((tag) => !normalizedQuery || tag.toLowerCase().includes(normalizedQuery))
    .slice(0, 10);

  const addTag = (value: string) => {
    const nextTag = value.trim();
    if (!nextTag) {
      return;
    }
    setSelectedTags((currentTags) => uniqueValues([...currentTags, nextTag]));
    setQuery("");
    setOpen(false);
  };

  const removeTag = (value: string) => {
    setSelectedTags((currentTags) => currentTags.filter((tag) => tag !== value));
  };

  return (
    <div className="block">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-neutral-700">Tags</span>
        <Link href="/admin/blog/tags" className="text-xs font-semibold text-primary">
          Manage
        </Link>
      </div>
      {selectedTags.map((tag) => (
        <input key={tag} type="hidden" name="tags" value={tag} />
      ))}
      <div className="relative">
        <div className="focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:ring-offset-2 flex min-h-[7.5rem] w-full flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3">
          <div className="flex min-h-[2.25rem] flex-wrap gap-2">
            {selectedTags.length ? (
              selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex max-w-full items-center gap-1.5 rounded-md bg-[var(--color-accent-light)] px-2.5 py-1 text-xs font-semibold text-[var(--color-accent-dark)]"
                >
                  <span className="truncate">{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="focus-ring rounded-sm text-[var(--color-accent-dark)] hover:bg-white/70"
                    aria-label={`Remove ${tag}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))
            ) : (
              <span className="text-sm text-neutral-400">No tags selected</span>
            )}
          </div>
          <div className="flex items-center gap-2 border-t border-slate-100 pt-3">
            <Search className="h-4 w-4 flex-none text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => window.setTimeout(() => setOpen(false), 120)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addTag(query);
                }
              }}
              placeholder="Search tags or type a new one"
              className="!min-h-0 min-w-0 flex-1 !rounded-none !border-0 !bg-transparent !p-0 text-sm text-neutral-700 !shadow-none outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => addTag(query)}
                className="focus-ring inline-flex h-8 items-center gap-1 rounded-md border border-slate-200 px-2 text-xs font-semibold text-neutral-700 hover:bg-slate-50"
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
            ) : null}
          </div>
        </div>
        {open && filteredTags.length ? (
          <div className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
            {filteredTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => addTag(tag)}
                className="focus-ring flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-neutral-700 hover:bg-slate-50"
              >
                {tag}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
