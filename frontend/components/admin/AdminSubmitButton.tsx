"use client";

import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type Props = {
  children: ReactNode;
  pendingLabel?: string;
  className?: string;
  type?: "submit" | "button" | "reset";
  formAction?: string | ((formData: FormData) => void | Promise<void>);
};

export function AdminSubmitButton({
  children,
  pendingLabel = "Submitting...",
  className = "btn btn-primary",
  type = "submit",
  formAction
}: Props) {
  const { pending } = useFormStatus();
  const buttonClassName = [
    className,
    "inline-flex items-center justify-center gap-2 align-middle disabled:cursor-not-allowed disabled:opacity-60 disabled:saturate-50"
  ].join(" ");

  return (
    <button type={type} formAction={formAction} className={buttonClassName} disabled={pending} aria-busy={pending}>
      {pending ? <Loader2 className="h-4 w-4 flex-none animate-spin" aria-hidden="true" /> : null}
      <span>{pending ? pendingLabel : children}</span>
    </button>
  );
}
