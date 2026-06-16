import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { CreditCard, FileText, Phone, ShieldCheck } from "lucide-react";
import { buildPageMetadata } from "@/lib/metadata";
import { clinic, publicRoutes } from "@/lib/site-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Insurance Accepted Manassas VA | Self-Pay Pricing | Altmed Medical Center",
  description:
    "Insurance and self-pay information for Altmed Medical Center in Manassas VA, including urgent care, primary care, DOT physicals, weight loss, and employer accounts.",
  path: "/insurance-accepted-manassas",
  image: "/assets/img/homepage/clinic-front-view.jpg"
});

const insuranceItems = ["Aetna", "CareFirst", "Cigna", "UnitedHealthcare", "Employer Accounts", "Workers' Compensation"];

export default function InsuranceAcceptedPage() {
  return (
    <main className="bg-[var(--color-bg-white)]">
      <section className="container-shell section-pad">
        <div className="max-w-4xl">
          <div className="section-label">Insurance & Pricing</div>
          <h1 className="mt-5">Insurance accepted and self-pay pricing in Manassas, VA</h1>
          <p className="mt-5 text-lg leading-8 text-[var(--color-text-muted)]">
            Patients often want to understand cost before choosing a clinic. Altmed Medical Center
            accepts many major insurance plans, supports self-pay visits, and works with employer
            accounts for occupational health services.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Accepted insurance",
              copy: "Bring your insurance card and photo ID. Coverage varies by plan, service, deductible, and eligibility."
            },
            {
              icon: CreditCard,
              title: "Self-pay options",
              copy: "Self-pay pricing may be available for urgent care, DOT physicals, vaccines, and selected visits."
            },
            {
              icon: FileText,
              title: "Employer accounts",
              copy: "Businesses can set up account workflows for DOT exams, drug tests, physicals, and injury care."
            }
          ].map(({ icon: Icon, title, copy }) => (
            <article key={title} className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-6">
              <Icon className="h-6 w-6 text-[var(--color-primary)]" />
              <h2 className="mt-4 text-2xl">{title}</h2>
              <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">{copy}</p>
            </article>
          ))}
        </div>

        <section className="mt-12 rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-[var(--color-bg-gray)] p-7">
          <h2 className="text-3xl">Plans and payment types commonly discussed</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {insuranceItems.map((item) => (
              <span key={item} className="rounded-md bg-white px-4 py-2 text-sm font-bold text-[var(--color-text-dark)]">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-6 text-base leading-8 text-[var(--color-text-muted)]">
            This list is not a guarantee of coverage. Call the clinic or your insurance plan before
            your visit if you need confirmation for a specific service.
          </p>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl">Common self-pay and pricing questions</h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-text-muted)]">
              DOT physicals, drug testing, medical weight loss, vaccines, and employer services may
              have different pricing than insurance-billed visits. Call for current pricing before
              coming in, especially if your employer requires add-on testing or forms.
            </p>
          </div>
          <div className="rounded-[14px] bg-[var(--color-footer-bg)] p-7 text-white">
            <Phone className="h-7 w-7 text-[var(--color-accent)]" />
            <h2 className="mt-4 text-3xl text-white">Confirm before your visit</h2>
            <p className="mt-3 text-base leading-7 text-white/80">
              Call {clinic.phone} for current pricing, accepted insurance questions, employer
              account setup, or documentation requirements.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <a href={`tel:${clinic.phone}`} className="btn-primary">
                Call {clinic.phone}
              </a>
              <Link href={publicRoutes.appointment as Route} className="btn-outline-light">
                Book Appointment
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
