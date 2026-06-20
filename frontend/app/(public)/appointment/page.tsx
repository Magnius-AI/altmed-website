import type { Metadata } from "next";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  ClipboardCheck,
  Clock3,
  FlaskConical,
  MapPin,
  Phone,
  Stethoscope,
  Truck,
  type LucideIcon
} from "lucide-react";
import { getProviders, type Provider } from "@/lib/api";
import { buildPageMetadata } from "@/lib/metadata";
import { clinic, publicRoutes } from "@/lib/site-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Make Appointment | Altmed Medical Center",
  description:
    "Schedule an online appointment for DOT physicals, drug and alcohol testing, and medical visits at Altmed Medical Center in Manassas, VA.",
  path: "/appointment",
  image: "/images/occupational/occ-med-3.jpg"
});

type AppointmentServiceValue = "dot-physical" | "drug-test" | "medical-visit";

type AppointmentService = {
  value: AppointmentServiceValue;
  title: string;
  shortTitle: string;
  description: string;
  detail: string;
  image: string;
  icon: LucideIcon;
  learnMoreHref: string;
  bring: string[];
};

type ProviderProfile = {
  id: string;
  name: string;
  title: string;
  credentials: string;
  image: string;
  scheduleServices: string[];
  appointmentUrl?: string | null;
  isSchedulable?: boolean;
};

const appointmentNotice = [
  "Please submit one scheduling request per visit so our team can avoid conflicts.",
  "A $25 missed appointment fee may apply without proper cancellation.",
  "Cancel or reschedule more than 24 hours in advance whenever possible."
];

const appointmentOptions: AppointmentService[] = [
  {
    value: "dot-physical",
    title: "DOT Physical",
    shortTitle: "DOT Physical",
    description: "CDL and FMCSA medical exams for commercial drivers.",
    detail:
      "Use a provider scheduling link and bring your license, medication list, glasses or contacts, and any condition-specific clearance paperwork.",
    image: "/images/drug_and_alcohol_test/truck_driver.jpg",
    icon: Truck,
    learnMoreHref: publicRoutes.service("dot-physical-manassas-va"),
    bring: ["Photo ID or CDL", "Medication list", "Glasses, contacts, or hearing aids if used"]
  },
  {
    value: "drug-test",
    title: "Drug & Alcohol Testing",
    shortTitle: "Drug Test",
    description: "DOT, pre-employment, random, post-accident, and workplace testing.",
    detail:
      "Schedule collection support for employer, DOT, or individual testing needs. Bring employer authorization if the visit is work-related.",
    image: "/images/drug_and_alcohol_test/drug_test.jpg",
    icon: FlaskConical,
    learnMoreHref: publicRoutes.service("occupational-health/drug-alcohol-testing-manassas"),
    bring: ["Photo ID", "Employer authorization if required", "Chain-of-custody paperwork if provided"]
  },
  {
    value: "medical-visit",
    title: "Medical Visit",
    shortTitle: "Medical Visit",
    description: "Primary care, urgent care, weight loss, functional medicine, labs, and vaccines.",
    detail:
      "Use this for routine or same-day medical care. Urgent care walk-ins are welcome, but booking can help you plan your arrival.",
    image: "/images/occupational/occ-med-3.jpg",
    icon: Stethoscope,
    learnMoreHref: publicRoutes.services,
    bring: ["Photo ID", "Insurance card if you have one", "Medication list or recent lab results"]
  }
];

const defaultScheduleProviders: ProviderProfile[] = [
  {
    id: "default-schedule-gerald-lee",
    name: "Dr. Gerald K. Lee, M.D., Ph.D.",
    title: "Medical Provider",
    credentials: "MD, PhD, MS",
    image: "/images/ai-generated/provider-generic-clinical-tools.jpg",
    scheduleServices: ["dot-physical", "medical-visit"],
    appointmentUrl: "https://www.patientfusion.com/doctor/jerry-lee-md-phd-08966",
    isSchedulable: true
  },
  {
    id: "default-schedule-simon-choi",
    name: "Simon Choi FNP-BC",
    title: "Family Nurse Practitioner",
    credentials: "FNP-BC",
    image: "/images/ai-generated/provider-generic-clinical-tools.jpg",
    scheduleServices: ["dot-physical", "medical-visit"],
    appointmentUrl: "https://www.patientfusion.com/doctor/simon-choi-aprn-29100",
    isSchedulable: true
  },
  {
    id: "default-schedule-garima-pokhrel",
    name: "Garima Pokhrel, DNP, FNP-C",
    title: "Family Nurse Practitioner",
    credentials: "DNP, FNP-C",
    image: "/images/ai-generated/provider-generic-clinical-tools.jpg",
    scheduleServices: ["dot-physical", "medical-visit"],
    appointmentUrl: "https://www.patientfusion.com/doctor/garima-pokhrel-fnp-c-msn-56621",
    isSchedulable: true
  },
  {
    id: "default-schedule-david-mejia",
    name: "David Mejia",
    title: "Medical Assistant",
    credentials: "Clinical Support",
    image: "/images/ai-generated/provider-generic-clinical-tools.jpg",
    scheduleServices: ["drug-test"],
    appointmentUrl: "https://www.patientfusion.com/doctor/david-mejia-55893",
    isSchedulable: true
  }
];

type AppointmentPageProps = {
  searchParams?: {
    service?: string;
  };
};

function providerFromApi(provider: Provider): ProviderProfile {
  return {
    id: provider.id,
    name: provider.name,
    title: provider.title ?? "Medical Provider",
    credentials: provider.credentials ?? "Clinical provider",
    image: provider.photo || "/images/ai-generated/provider-generic-clinical-tools.jpg",
    scheduleServices: provider.scheduleServices ?? [],
    appointmentUrl: provider.appointmentUrl,
    isSchedulable: provider.isSchedulable
  };
}

function dedupeProviders(providers: ProviderProfile[]) {
  const seen = new Set<string>();
  return providers.filter((provider) => {
    const key = provider.name.toLowerCase().replace(/[^a-z0-9]+/g, "");
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function getAppointmentHref(url?: string | null) {
  if (!url) {
    return "";
  }
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
    return url;
  }
  return `https://${url}`;
}

function getServiceHref(value: AppointmentServiceValue) {
  return `/appointment?service=${value}#schedule`;
}

function getScheduleProviders(providers: ProviderProfile[], service: AppointmentServiceValue) {
  return providers.filter(
    (provider) =>
      provider.isSchedulable &&
      Boolean(getAppointmentHref(provider.appointmentUrl)) &&
      provider.scheduleServices.includes(service)
  );
}

export default async function AppointmentPage({ searchParams }: AppointmentPageProps) {
  const apiProviders = await getProviders();
  const fetchedProviders = dedupeProviders(
    apiProviders.filter((provider) => provider.isActive !== false).map(providerFromApi)
  );
  const isUsingProviderApiFallback =
    !fetchedProviders.length || apiProviders.every((provider) => provider.id.startsWith("fallback-provider-"));
  const providers = isUsingProviderApiFallback ? defaultScheduleProviders : fetchedProviders;
  const activeOption =
    appointmentOptions.find((option) => option.value === searchParams?.service) ?? appointmentOptions[0];
  const activeProviders = getScheduleProviders(providers, activeOption.value);
  const ActiveIcon = activeOption.icon;

  return (
    <main className="bg-[var(--color-bg-white)]">
      <section className="container-shell py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
          <div className="max-w-4xl">
            <div className="section-label">Make Appointment</div>
            <h1 className="mt-5 text-[2.35rem] leading-tight md:text-[3.15rem]">
              Choose the visit. Book the time.
            </h1>
            <p className="mt-4 max-w-3xl text-[1.04rem] leading-8 text-neutral-700">
              The simple path is below: pick DOT physical, drug testing, or a medical visit, then
              open the scheduling link for the right Altmed provider. Urgent care walk-ins are still
              welcome during clinic hours.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={"#schedule" as Route} className="btn-accent">
                Book Online
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:${clinic.phone}`} className="btn-outline-dark">
                <Phone className="h-4 w-4" />
                Call {clinic.phone}
              </a>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                ["1", "Choose a visit"],
                ["2", "Pick provider"],
                ["3", "Confirm time"]
              ].map(([step, label]) => (
                <div key={step} className="rounded-md border border-[var(--color-border)] bg-white px-4 py-3">
                  <div className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-primary)]">
                    Step {step}
                  </div>
                  <div className="mt-1 font-ui text-sm font-bold text-neutral-950">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <aside className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-gray)] shadow-sm">
            <div className="relative aspect-[4/3] bg-neutral-100">
              <Image
                src="/legacy-assets/homepage/clinic-front-view.jpg"
                alt="Altmed Medical Center in Manassas"
                fill
                priority
                className="site-photo object-cover"
                sizes="(min-width: 1024px) 390px, 100vw"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)]">
                <MapPin className="h-4 w-4" />
                {clinic.address}
              </div>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Mon-Fri, 9 AM-5 PM. Call if you are not sure which visit type fits.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[var(--color-bg-gray)] py-8 md:py-10">
        <div className="container-shell">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-primary)]">
            <Clock3 className="h-4 w-4" />
            Before You Book
          </div>
          <div className="mt-3 grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
            <h2 className="font-heading text-[1.55rem] font-normal leading-tight text-neutral-950">
              Quick scheduling rules
            </h2>
            <div className="grid gap-3 lg:grid-cols-3">
              {appointmentNotice.map((notice) => (
                <div key={notice} className="rounded-md border border-[var(--color-border)] bg-white p-4 text-sm leading-6 text-neutral-700">
                  {notice}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="schedule" className="container-shell scroll-mt-24 py-10 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="section-label">Book Online</div>
            <h2 className="mt-3 font-heading text-[2rem] font-normal leading-tight text-neutral-950 md:text-[2.35rem]">
              Schedule {activeOption.title}
            </h2>
            <p className="mt-3 max-w-3xl text-[0.98rem] leading-7 text-neutral-700">
              Pick a visit type below, then use the schedule button for the provider you want. If
              anything feels unclear, call the clinic and we will route you to the right visit.
            </p>
          </div>
          <a href={`tel:${clinic.phone}`} className="btn-outline-dark md:shrink-0">
            <Phone className="h-4 w-4" />
            Call for Help
          </a>
        </div>

        <div className="sticky top-16 z-30 mt-6 flex gap-2 overflow-x-auto border-y border-[var(--color-border)] bg-[var(--color-bg-white)]/95 py-3 backdrop-blur lg:top-[78px]">
          {appointmentOptions.map((option) => {
            const Icon = option.icon;
            const isActive = option.value === activeOption.value;

            return (
              <Link
                key={option.value}
                href={getServiceHref(option.value) as Route}
                className={`focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition ${
                  isActive
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                    : "border-[var(--color-border)] bg-white text-neutral-700 hover:border-[var(--color-primary)]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {option.shortTitle}
              </Link>
            );
          })}
        </div>

        <article className="mt-6 overflow-hidden rounded-lg border border-[var(--color-border)] bg-white shadow-sm">
          <div className="grid lg:grid-cols-[220px_minmax(0,1fr)]">
            <div className="relative min-h-[180px] bg-neutral-100">
              <Image
                src={activeOption.image}
                alt={`${activeOption.title} scheduling at Altmed Medical Center`}
                fill
                className="site-photo object-cover"
                sizes="(min-width: 1024px) 220px, 100vw"
              />
            </div>
            <div className="p-5 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[var(--color-bg-gray)] text-[var(--color-primary)]">
                    <ActiveIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-[1.55rem] font-normal leading-tight text-neutral-950">
                      {activeOption.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-700">
                      {activeOption.detail}
                    </p>
                  </div>
                </div>
                <Link href={activeOption.learnMoreHref as Route} className="btn-secondary md:shrink-0">
                  Learn More
                </Link>
              </div>

              {activeProviders.length ? (
                <div className="mt-5 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
                  {activeProviders.map((provider) => {
                    const href = getAppointmentHref(provider.appointmentUrl);
                    const isExternal = href.startsWith("http://") || href.startsWith("https://");

                    return (
                      <div
                        key={provider.id}
                        className="grid gap-3 py-4 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                      >
                        <div className="relative h-14 w-14 overflow-hidden rounded-full bg-[var(--color-bg-gray)]">
                          <Image
                            src={provider.image}
                            alt={`${provider.name} at Altmed Medical Center`}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                        <div>
                          <div className="font-ui text-sm font-bold leading-tight text-neutral-950">
                            {provider.name}
                          </div>
                          <div className="mt-1 text-xs font-semibold text-[var(--color-primary)]">
                            {[provider.credentials, provider.title].filter(Boolean).join(" | ")}
                          </div>
                        </div>
                        <a
                          href={href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noreferrer" : undefined}
                          className="btn-accent justify-center"
                        >
                          <CalendarCheck2 className="h-4 w-4" />
                          Schedule
                        </a>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-5 border-y border-[var(--color-border)] py-4">
                  <h4 className="font-ui text-sm font-bold text-neutral-950">
                    Online scheduling for this visit is being updated.
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    Call the clinic and we will help you choose the right provider and time.
                  </p>
                  <a href={`tel:${clinic.phone}`} className="btn-primary mt-4">
                    <Phone className="h-4 w-4" />
                    Call {clinic.phone}
                  </a>
                </div>
              )}

              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {activeOption.bring.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs font-semibold leading-5 text-neutral-600">
                    <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="container-shell py-10 md:py-12">
        <div className="grid gap-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-footer-bg)] p-5 text-white md:grid-cols-[1fr_auto] md:items-center md:p-6">
          <div>
            <h2 className="font-heading text-[1.8rem] font-normal text-white">
              Still not sure what to book?
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/75">
              Call the clinic before scheduling. The team can confirm service fit, paperwork, and
              whether walk-in care is the better option.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${clinic.phone}`} className="btn-outline-light">
              Call {clinic.phone}
            </a>
            <Link href={publicRoutes.contact as Route} className="btn-outline-light">
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
