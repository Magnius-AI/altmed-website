"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function LoginSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="admin-action min-h-[42px] w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:saturate-50"
      disabled={pending}
      type="submit"
      aria-busy={pending}
    >
      {pending ? <Loader2 className="h-4 w-4 flex-none animate-spin" aria-hidden="true" /> : null}
      <span>{pending ? "Signing In..." : "Sign In"}</span>
    </button>
  );
}
