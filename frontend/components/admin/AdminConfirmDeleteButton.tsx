"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  title: string;
  description: string;
  triggerLabel?: string;
  confirmLabel?: string;
  pendingLabel?: string;
  triggerClassName?: string;
};

function ConfirmSubmitButton({ pendingLabel, label }: { pendingLabel: string; label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-danger inline-flex items-center justify-center gap-2 align-middle disabled:cursor-not-allowed disabled:opacity-60 disabled:saturate-50"
      disabled={pending}
      aria-busy={pending}
    >
      {pending ? <Loader2 className="h-4 w-4 flex-none animate-spin" aria-hidden="true" /> : null}
      <span>{pending ? pendingLabel : label}</span>
    </button>
  );
}

export function AdminConfirmDeleteButton({
  action,
  title,
  description,
  triggerLabel = "Delete",
  confirmLabel = "Delete",
  pendingLabel = "Deleting...",
  triggerClassName = "btn btn-danger"
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={triggerClassName} onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-confirm-delete-title"
        >
          <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl">
            <h3 id="admin-confirm-delete-title" className="text-base font-semibold text-neutral-950">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <form action={action}>
                <ConfirmSubmitButton pendingLabel={pendingLabel} label={confirmLabel} />
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
