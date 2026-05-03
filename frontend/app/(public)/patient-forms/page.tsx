import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowDownToLine, ExternalLink, FileStack, FolderOpen, ShieldCheck } from "lucide-react";
import {
  clinic,
  formsSections,
  legacyAssets,
  liveFormsLibraryUrl,
  publicRoutes
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Patient Forms | Download Medical Forms | Altmed",
  description:
    "Download patient, occupational health, DOT clearance, telehealth, addiction, and medical-release forms from Altmed Medical Center in Manassas, VA.",
  alternates: {
    canonical: "/patient-forms"
  },
  openGraph: {
    title: "Patient Forms | Altmed Medical Center",
    description:
      "Access patient forms, workplace forms, telehealth consent, DOT paperwork, and records-request links from Altmed Medical Center."
  }
};

export default function PatientFormsPage() {
  return (
    <main className="bg-[var(--color-bg-white)]">
      <section className="container-shell section-pad">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="reading-flow max-w-4xl">
            <div className="inline-flex rounded-full bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Forms & Downloads
            </div>
            <h1 className="mt-6 text-4xl text-neutral-900 md:text-[3.45rem]">
              Forms for patients, employees, drivers, and employer accounts
            </h1>
            <p className="text-[1.08rem] leading-8 text-neutral-700">
              The live Altmed site treats forms as a major resource area, so this page now mirrors
              that better. Verified live PDFs download directly where available, and the remaining
              live-library forms stay visible here so patients and employer clients can still find
              them quickly.
            </p>
            <p className="text-[1.02rem] leading-8 text-neutral-700">
              If you are not sure which form you need, call{" "}
              <a href={`tel:${clinic.phone}`} className="font-semibold text-primary underline underline-offset-4">
                {clinic.phone}
              </a>{" "}
              before your visit and our team can guide you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={liveFormsLibraryUrl} target="_blank" rel="noreferrer" className="btn-outline-dark">
                Open Live Forms Library
              </a>
              <Link href={publicRoutes.appointment as Route} className="btn-primary">
                Book Appointment
              </Link>
              <a href={`tel:${clinic.phone}`} className="btn-outline-dark">
                Call Clinic
              </a>
            </div>
          </div>
          <div className="relative min-h-[380px] overflow-hidden rounded-[18px] border border-[rgba(18,52,77,0.08)]">
            <Image
              src={legacyAssets.doctorsOverview}
              alt="Altmed Medical Center care team and patient services"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-gray)]">
        <div className="container-shell py-10">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: FileStack,
                title: "Direct Downloads",
                body: "Verified live PDFs now download directly from the forms page instead of being buried."
              },
              {
                icon: FolderOpen,
                title: "Live Library Access",
                body: "Forms still listed on the live site but not individually verified are linked through the live forms library."
              },
              {
                icon: ShieldCheck,
                title: "Secure Release Routes",
                body: "Medical records and telehealth consent routes stay easy to reach without losing the current URLs."
              }
            ].map((item) => (
              <article key={item.title} className="rounded-[16px] border border-[rgba(18,52,77,0.08)] bg-white p-6">
                <item.icon className="h-6 w-6 text-primary" />
                <h2 className="mt-4 text-[1.55rem] text-neutral-900">{item.title}</h2>
                <p className="mt-3 text-base leading-7 text-neutral-700">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-14 md:py-16">
        <div className="space-y-8">
          {formsSections.map((section) => (
            <section key={section.title} className="rounded-[20px] border border-slate-200 bg-white p-6 md:p-8">
              <div className="max-w-3xl reading-flow">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {section.title}
                </div>
                <h2 className="text-[2rem] text-neutral-900 md:text-[2.4rem]">{section.title}</h2>
                <p className="text-[1rem] leading-7 text-neutral-700">{section.description}</p>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {section.items.map((item) => {
                  const isInternal = item.href.startsWith("/");
                  const isPdf = item.actionLabel === "Download PDF";
                  return (
                    <article
                      key={`${section.title}-${item.title}`}
                      className="flex h-full flex-col rounded-[16px] border border-[rgba(18,52,77,0.08)] bg-[var(--color-bg-gray)] p-5"
                    >
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] bg-white">
                        {isPdf ? (
                          <ArrowDownToLine className="h-5 w-5 text-primary" />
                        ) : (
                          <ExternalLink className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <h3 className="mt-4 text-[1.4rem] text-neutral-900">{item.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-7 text-neutral-700">{item.description}</p>
                      {isInternal ? (
                        <Link
                          href={item.href as Route}
                          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4"
                        >
                          {item.actionLabel}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4"
                        >
                          {item.actionLabel}
                        </a>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="container-shell pb-20">
        <div className="rounded-[20px] border border-slate-200 bg-[var(--color-footer-bg)] p-7 text-white md:p-9">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="reading-flow">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                Need Something Else?
              </div>
              <h2 className="text-[2rem] text-white md:text-[2.4rem]">
                Still looking for a form that used to be on the live site?
              </h2>
              <p className="max-w-3xl text-[1rem] leading-7 text-white/78">
                Some live-site forms are still best accessed through Altmed’s full forms library or
                by contacting the clinic directly. We kept both options one click away here.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href={liveFormsLibraryUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                Live Forms Library
              </a>
              <Link href={publicRoutes.contact as Route} className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
