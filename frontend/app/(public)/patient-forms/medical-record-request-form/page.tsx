import Link from "next/link";
import Image from "next/image";
import { FileText, ShieldCheck } from "lucide-react";
import { clinic, legacyAssets, publicRoutes } from "@/lib/site-content";

export default function MedicalRecordRequestPage() {
  return (
    <main className="bg-[var(--color-bg-white)]">
      <section className="container-shell section-pad">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="inline-flex rounded-full bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Medical Release Forms
          </div>
          <h1 className="mt-6 text-4xl text-neutral-900 md:text-[3.2rem]">Medical Records Request Form</h1>
          <p className="mt-5 text-lg leading-8 text-neutral-700">
            The old site exposed this route directly, so we preserved it here for patients,
            employers, and authorized representatives who need records-release support.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="mt-3 text-lg font-semibold text-neutral-900">What to prepare</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-700">
                Bring identifying details, the specific records or date range requested, and the
                recipient information if records need to be released to a third party.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="mt-3 text-lg font-semibold text-neutral-900">Need help first?</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-700">
                Call {clinic.phone} if you need help confirming what form or authorization details
                are required before submitting a records request.
              </p>
            </div>
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden rounded-xl border border-slate-200">
          <Image src={legacyAssets.aboutPhoto} alt="Altmed Medical Center clinic interior" fill className="object-cover" />
        </div>
        </div>
      </section>
      <section className="container-shell pb-20">
        <section className="rounded-xl border border-slate-200 bg-white p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900">Records request access</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-700">
              The legacy site embedded a secure Google Form at this step. We’re preserving that
              workflow while keeping this route stable for search engines and returning patients.
            </p>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdnGRWIJxEQIHbIawYUjs_o3A5p2mzBNRjhzGXBnvK2nL7GOQ/viewform"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-primary px-5 py-3 font-semibold text-primary transition hover:bg-[var(--color-surface-alt)]"
          >
            Open Request Form
          </a>
        </div>
        <div className="mt-6">
          <iframe
            title="Medical record request form"
            src="https://docs.google.com/forms/d/e/1FAIpQLSdnGRWIJxEQIHbIawYUjs_o3A5p2mzBNRjhzGXBnvK2nL7GOQ/viewform?embedded=true"
            className="min-h-[960px] w-full rounded-xl border border-slate-200"
          />
        </div>
        <div className="mt-6">
          <Link href={publicRoutes.forms} className="text-sm font-semibold text-primary">
            Back to Patient Forms →
          </Link>
        </div>
        </section>
      </section>
    </main>
  );
}
