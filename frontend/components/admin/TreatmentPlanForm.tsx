"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { TreatmentPlan } from "@/lib/api";

type Props = {
  plan?: TreatmentPlan;
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
};

function dollars(cents?: number) {
  return cents ? (cents / 100).toFixed(2) : "";
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function TreatmentPlanForm({ plan, action, submitLabel }: Props) {
  const [name, setName] = useState(plan?.name ?? "");
  const [slug, setSlug] = useState(plan?.slug ?? "");
  const [items, setItems] = useState<string[]>(plan?.checklist?.length ? plan.checklist : [""]);

  return (
    <form action={action} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-neutral-700">Plan Name</span>
          <input
            name="name"
            required
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (!plan) {
                setSlug(slugify(event.target.value));
              }
            }}
            className="input"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-neutral-700">Slug</span>
          <input name="slug" required value={slug} onChange={(event) => setSlug(event.target.value)} className="input" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-neutral-700">Category</span>
          <input name="category" defaultValue={plan?.category ?? "Weight Loss"} className="input" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-neutral-700">Duration Label</span>
          <input name="durationLabel" defaultValue={plan?.durationLabel ?? ""} placeholder="3 months" className="input" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-neutral-700">Duration Days</span>
          <input name="durationDays" type="number" min="1" defaultValue={plan?.durationDays ?? ""} className="input" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-neutral-700">Price</span>
          <input name="price" required inputMode="decimal" defaultValue={dollars(plan?.priceCents)} className="input" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-neutral-700">Description</span>
        <textarea name="description" rows={4} defaultValue={plan?.description ?? ""} className="input min-h-[110px]" />
      </label>
      <input type="hidden" name="currency" value={plan?.currency ?? "usd"} />
      <div className="card bg-slate-50">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-neutral-900">Checklist Items</div>
          <button
            type="button"
            onClick={() => setItems((values) => [...values, ""])}
            className="btn btn-secondary btn-sm"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
        <div className="grid gap-2">
          {items.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                name="checklist"
                value={item}
                onChange={(event) => setItems((values) => values.map((value, itemIndex) => (itemIndex === index ? event.target.value : value)))}
                className="input"
              />
              <button
                type="button"
                onClick={() => setItems((values) => (values.length > 1 ? values.filter((_, itemIndex) => itemIndex !== index) : [""]))}
                className="btn btn-danger btn-sm"
                title="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
        <input type="checkbox" name="isActive" defaultChecked={plan?.isActive ?? true} />
        Active
      </label>
      <button type="submit" className="btn btn-primary w-fit">
        {submitLabel}
      </button>
    </form>
  );
}
