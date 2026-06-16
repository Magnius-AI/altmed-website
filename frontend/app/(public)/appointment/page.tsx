import type { Metadata } from "next";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowRight, CalendarCheck2, CheckCircle2, Clock3, Phone } from "lucide-react";
import { buildPageMetadata } from "@/lib/metadata";
import { clinic, publicRoutes } from "@/lib/site-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Make Appointment | Altmed Medical Center",
  description:
    "Schedule an online appointment for DOT physicals, drug and alcohol testing, and medical visits at Altmed Medical Center in Manassas, VA.",
  path: "/appointment",
  image: "/images/occupational/occ-med-3.jpg"
});

const appointmentNotice = [
  {
    title: "Single scheduling",
    body: "Please do not submit schedule requests more than once. Multiple submissions may lead to scheduling conflicts."
  },
  {
    title: "Missed appointment fee",
    body: "A missed appointment fee of $25.00 may apply for appointments missed without proper cancellation."
  },
  {
    title: "Cancellation or rescheduling",
    body: "Cancel or reschedule more than 24 hours in advance whenever possible to avoid the missed appointment fee."
  }
];

const appointmentOptions = [
  {
    title: "DOT Physical",
    description:
      "A DOT physical evaluates a driver's vision, blood pressure, medical history, and ability to safely operate a commercial vehicle.",
    image: "/images/drug_and_alcohol_test/truck_driver.jpg",
    scheduleHref: "/providers?service=dot-physical",
    learnMoreHref: publicRoutes.service("dot-physical-manassas-va"),
    featuresTitle: "Different parts of a DOT physical exam",
    features: ["Vision test", "Hearing test", "Urinalysis", "Blood pressure and pulse rate", "Physical exam"]
  },
  {
    title: "Drug and Alcohol Testing",
    description:
      "Schedule routine, pre-employment, DOT, and workplace testing with clear collection protocols and documentation support.",
    image: "/images/drug_and_alcohol_test/drug_test.jpg",
    scheduleHref: "/providers?service=drug-test",
    learnMoreHref: publicRoutes.service("occupational-health/drug-alcohol-testing-manassas"),
    featuresTitle: "Types of screening",
    features: ["Pre-employment drug test", "Random drug test", "Breath alcohol test", "Post-accident", "Return to work"]
  },
  {
    title: "Medical Visits",
    description:
      "Book care for urgent needs, primary care, addiction medicine, weight management, functional medicine, workers comp, labs, and vaccines.",
    image: "/images/occupational/occ-med-3.jpg",
    scheduleHref: "/providers?service=medical-visit",
    learnMoreHref: publicRoutes.services,
    featuresTitle: "Services offered",
    features: [
      "Addiction management",
      "Primary care",
      "Urgent care",
      "Weight management",
      "Functional medicine",
      "Worker's compensation",
      "Lab tests",
      "Immunizations and vaccinations"
    ]
  }
] as const;

export default function AppointmentPage() {
  return (
    <main className="bg-[var(--color-bg-white)]">
      <section className="container-shell py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="max-w-4xl">
            <div className="section-label">Make Appointment</div>
            <h1 className="mt-5 text-[2.45rem] leading-tight md:text-[3.35rem]">
              Make online appointment
            </h1>
            <p className="mt-4 max-w-3xl text-[1.05rem] leading-8 text-neutral-700">
              Schedule an online appointment for the medical service you need with Altmed Medical
              Center providers in Manassas.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={`tel:${clinic.phone}`} className="btn-primary">
                <Phone className="h-4 w-4" />
                Call {clinic.phone}
              </a>
              <Link href={publicRoutes.contact as Route} className="btn-outline-dark">
                Ask a Question
              </Link>
            </div>
          </div>

          <aside className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-gray)] p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-[var(--color-accent)] shadow-sm">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-ui text-base font-bold text-neutral-950">
                  Important scheduling notice
                </h2>
                <p className="mt-1 text-sm leading-6 text-neutral-600">
                  These rules help us keep appointments available and reduce scheduling conflicts.
                </p>
              </div>
            </div>
            <ol className="mt-4 grid gap-3">
              {appointmentNotice.map((item, index) => (
                <li key={item.title} className="grid grid-cols-[1.75rem_1fr] gap-3 text-sm leading-6 text-neutral-700">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-xs font-bold text-[var(--color-primary)]">
                    {index + 1}
                  </span>
                  <span>
                    <strong className="text-neutral-950">{item.title}:</strong> {item.body}
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="bg-[var(--color-bg-gray)] py-10 md:py-12">
        <div className="container-shell">
          <div className="grid gap-5">
            {appointmentOptions.map((option) => (
              <article key={option.title} className="grid overflow-hidden rounded-lg border border-[var(--color-border)] bg-white shadow-sm lg:grid-cols-[minmax(0,1fr)_340px]">
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-primary)]">
                    <CalendarCheck2 className="h-4 w-4" />
                    Schedule Online
                  </div>
                  <h2 className="mt-3 font-heading text-[2rem] font-normal leading-tight text-neutral-950">
                    {option.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-[0.98rem] leading-7 text-neutral-700">
                    {option.description}
                  </p>
                  <div className="mt-5 rounded-md border border-[var(--admin-border)] bg-[var(--color-bg-gray)] p-4">
                    <h3 className="font-ui text-sm font-bold text-neutral-950">{option.featuresTitle}</h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {option.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm leading-6 text-neutral-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href={option.scheduleHref as Route} className="btn-primary">
                      Schedule Online
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href={option.learnMoreHref as Route} className="btn-outline-dark">
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="relative min-h-[230px] bg-neutral-100 lg:min-h-full">
                  <Image
                    src={option.image}
                    alt={`${option.title} appointment at Altmed Medical Center`}
                    fill
                    className="site-photo object-cover"
                    sizes="(min-width: 1024px) 340px, 100vw"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-10 md:py-12">
        <div className="grid gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-footer-bg)] p-5 text-white md:grid-cols-[1fr_auto] md:items-center md:p-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/70">
              <Clock3 className="h-4 w-4" />
              Need help choosing?
            </div>
            <h2 className="mt-2 font-heading text-[1.8rem] font-normal text-white">
              Call the clinic before scheduling if you are unsure.
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/75">
              The team can confirm which appointment type, paperwork, or employer authorization is
              needed before your visit.
            </p>
          </div>
          <a href={`tel:${clinic.phone}`} className="btn-outline-light">
            Call {clinic.phone}
          </a>
        </div>
      </section>
    </main>
  );
}
