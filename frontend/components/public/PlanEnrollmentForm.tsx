"use client";

import { useFormStatus } from "react-dom";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary btn-lg w-full justify-center" disabled={pending}>
      {pending ? "Opening checkout..." : "Enroll Now"}
    </button>
  );
}

export function PlanEnrollmentForm({ action }: Props) {
  return (
    <form action={action} className="grid gap-3">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-neutral-700">Full Name</span>
        <input name="name" required className="input" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-neutral-700">Email</span>
        <input name="email" type="email" required className="input" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-neutral-700">Phone</span>
        <input name="phone" type="tel" className="input" />
      </label>
      <SubmitButton />
    </form>
  );
}
