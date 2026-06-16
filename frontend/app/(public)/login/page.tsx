import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { LockKeyhole, Phone, UserRound } from "lucide-react";
import { clinic, publicRoutes } from "@/lib/site-content";

export const metadata: Metadata = {
  title: {
    absolute: "Patient Portal Login | Altmed Medical Center"
  },
  description:
    "Patient portal and login support for Altmed Medical Center in Manassas VA.",
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: `${clinic.canonicalUrl}/login`
  }
};

export default function LoginPage() {
  return (
    <main className="container-shell py-20">
      <div className="max-w-4xl">
        <div className="section-label">Patient Portal</div>
        <h1 className="mt-5">Login and portal support</h1>
        <p className="mt-5 text-lg leading-8 text-[var(--color-text-muted)]">
          This route is preserved for patients who used the legacy login link. For patient portal,
          records, billing, or appointment access questions, contact Altmed Medical Center and our
          team will direct you to the correct secure workflow.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          {
            icon: UserRound,
            title: "Patient portal help",
            copy: "Get help with records, results, visit follow-up, or account access questions."
          },
          {
            icon: LockKeyhole,
            title: "Admin login",
            copy: "Staff and site administrators should use the secure admin sign-in route."
          },
          {
            icon: Phone,
            title: "Call the clinic",
            copy: `For immediate assistance during clinic hours, call ${clinic.phone}.`
          }
        ].map(({ icon: Icon, title, copy }) => (
          <article key={title} className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-6">
            <Icon className="h-6 w-6 text-[var(--color-primary)]" />
            <h2 className="mt-4 text-xl">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">{copy}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <a href={`tel:${clinic.phone}`} className="btn-primary">
          Call {clinic.phone}
        </a>
        <Link href={publicRoutes.contact as Route} className="btn-outline-dark">
          Contact Us
        </Link>
        <Link href={"/admin/login" as Route} className="btn-outline-dark">
          Staff Login
        </Link>
      </div>
    </main>
  );
}
