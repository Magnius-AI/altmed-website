"use client";

import { useFormStatus } from "react-dom";

export function LoginSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="admin-action min-h-[52px] w-full justify-center disabled:opacity-70"
      disabled={pending}
      type="submit"
    >
      {pending ? "Signing In..." : "Sign In"}
    </button>
  );
}
