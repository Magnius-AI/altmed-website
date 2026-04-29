import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enrollment Received | AltMedFirst Treatment Plans",
  robots: { index: false, follow: false }
};

export default function PlanSuccessPage() {
  return (
    <main className="container-shell py-16">
      <section className="card max-w-2xl">
        <div className="eyebrow">Enrollment Received</div>
        <h1 className="mt-4 text-page-title text-neutral-900">Your treatment plan enrollment is confirmed</h1>
        <p className="mt-4 text-base leading-7 text-neutral-700">
          Thank you. Our Manassas care team will review your enrollment and contact you with next steps for scheduling, forms, and program onboarding.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/plans" className="btn btn-secondary">
            View plans
          </Link>
          <Link href="/contact-us" className="btn btn-primary">
            Contact clinic
          </Link>
        </div>
      </section>
    </main>
  );
}
