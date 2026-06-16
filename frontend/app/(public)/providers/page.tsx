import type { Metadata } from "next";
import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";
import { CalendarCheck2, CheckCircle2, MapPin } from "lucide-react";
import { SchemaOrg } from "@/components/public/SchemaOrg";
import { getProviders, type Provider } from "@/lib/api";
import { buildPageMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { clinic, legacyAssets, publicRoutes } from "@/lib/site-content";

type ProviderProfile = {
  id: string;
  name: string;
  aliases: string;
  title: string;
  credentials: string;
  specialties: string[];
  education: string;
  statement: string;
  image: string;
  scheduleServices: string[];
  appointmentUrl?: string | null;
  scheduleStatus?: string | null;
  isSchedulable?: boolean;
};

type ProvidersPageProps = {
  searchParams?: {
    service?: string;
  };
};

export const metadata: Metadata = buildPageMetadata({
  title: "Providers & Doctors Manassas VA | Altmed Medical Center",
  description:
    "Meet Altmed Medical Center providers in Manassas VA and schedule DOT physicals, drug testing, or medical visits with the right provider.",
  path: "/providers",
  image: legacyAssets.doctorOne
});

const serviceOptions = [
  { value: "dot-physical", label: "DOT Physical" },
  { value: "drug-test", label: "Drug & Alcohol Test" },
  { value: "medical-visit", label: "Medical Visit" }
] as const;

function providerFromApi(provider: Provider): ProviderProfile {
  return {
    id: provider.id,
    name: provider.name,
    aliases: provider.title ?? "Altmed Medical Center provider",
    title: provider.title ?? "Medical Provider",
    credentials: provider.credentials ?? "Clinical provider",
    specialties: provider.specialties?.length ? provider.specialties : ["Primary Care"],
    education: "Credential details are maintained by the Altmed team.",
    statement: provider.personalNote || provider.bio || "Provider profile details are maintained by the Altmed team.",
    image: provider.photo || legacyAssets.doctorOne,
    scheduleServices: provider.scheduleServices ?? [],
    appointmentUrl: provider.appointmentUrl,
    scheduleStatus: provider.scheduleStatus,
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

function buildProviderSchema(provider: ProviderProfile) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: provider.name,
    jobTitle: provider.title,
    image: provider.image.startsWith("http") ? provider.image : `${clinic.canonicalUrl}${provider.image}`,
    worksFor: {
      "@type": "MedicalBusiness",
      name: clinic.name,
      url: clinic.canonicalUrl
    },
    medicalSpecialty: provider.specialties,
    url: `${clinic.canonicalUrl}/providers`
  };
}

export default async function ProvidersPage({ searchParams }: ProvidersPageProps) {
  const apiProviders = dedupeProviders((await getProviders()).filter((provider) => provider.isActive !== false).map(providerFromApi));
  const selectedService = serviceOptions.some((option) => option.value === searchParams?.service)
    ? searchParams?.service
    : undefined;
  const selectedServiceLabel = serviceOptions.find((option) => option.value === selectedService)?.label;
  const scheduleProviders = apiProviders.filter(
    (provider) =>
      provider.isSchedulable &&
      Boolean(getAppointmentHref(provider.appointmentUrl)) &&
      (!selectedService || provider.scheduleServices.includes(selectedService))
  );
  const providers = apiProviders;
  const schemaProviders = selectedService ? scheduleProviders : providers;

  return (
    <main className="bg-[var(--color-bg-white)]">
      <SchemaOrg
        schema={buildBreadcrumbSchema([
          { name: "Home", item: clinic.canonicalUrl },
          { name: "Providers", item: `${clinic.canonicalUrl}/providers` }
        ])}
      />
      {schemaProviders.map((provider) => (
        <SchemaOrg key={provider.id} schema={buildProviderSchema(provider)} />
      ))}

      <section className="container-shell section-pad">
        <div className="max-w-4xl">
          <div className="section-label">Providers</div>
          <h1 className="mt-5">
            {selectedServiceLabel
              ? `Schedule ${selectedServiceLabel} with a specific provider`
              : "Meet the Altmed Medical Center providers in Manassas, VA"}
          </h1>
          <p className="mt-6 text-[1.05rem] leading-8 text-[var(--color-text-muted)]">
            {selectedServiceLabel
              ? "Choose an available provider for the service you need. Provider availability and scheduling links are maintained by Altmed."
              : "Meet the active Altmed providers maintained in the clinic dashboard, including their designations, appointment links, and current scheduling status."}
          </p>
        </div>

        {selectedService ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
            <section className="space-y-4">
              <div className="grid gap-2 sm:grid-cols-3">
                {serviceOptions.map((option) => (
                  <Link
                    key={option.value}
                    href={`/providers?service=${option.value}` as Route}
                    className={`focus-ring rounded-md border px-4 py-3 text-center text-sm font-bold transition ${
                      selectedService === option.value
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                        : "border-[var(--color-border)] bg-white text-neutral-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    }`}
                  >
                    {option.label}
                  </Link>
                ))}
              </div>

              <div className="grid gap-4">
                {scheduleProviders.length ? (
                  scheduleProviders.map((provider) => {
                  const href = getAppointmentHref(provider.appointmentUrl);
                  return (
                    <article key={provider.id} className="rounded-lg border border-[var(--color-border)] bg-white p-4 shadow-sm">
                      <div className="grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[var(--color-bg-gray)]">
                          <Image src={provider.image} alt={`${provider.name} at Altmed Medical Center`} fill className="object-cover" />
                        </div>
                        <div>
                          <h2 className="font-ui text-lg font-bold leading-tight text-neutral-950">{provider.name}</h2>
                          <p className="mt-1 text-sm font-semibold text-[var(--color-primary)]">{provider.title}</p>
                          {provider.scheduleStatus ? (
                            <span className="mt-2 inline-flex rounded-md bg-[var(--color-bg-gray)] px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">
                              {provider.scheduleStatus}
                            </span>
                          ) : null}
                        </div>
                        {href ? (
                          <a href={href} target="_blank" rel="noreferrer" className="btn-primary justify-center">
                            <CalendarCheck2 className="h-4 w-4" />
                            Schedule
                          </a>
                        ) : (
                          <a href={`tel:${clinic.phone}`} className="btn-outline-dark justify-center">
                            Call Clinic
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })
                ) : (
                  <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-gray)] p-6">
                    <h2 className="font-ui text-xl font-bold text-neutral-950">Provider scheduling is being updated</h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                      Online provider links are currently unavailable for this service. Call the clinic and the team will help you schedule the right visit.
                    </p>
                    <a href={`tel:${clinic.phone}`} className="btn-primary mt-5">
                      Call {clinic.phone}
                    </a>
                  </div>
                )}
              </div>
            </section>

            <aside className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-white shadow-sm">
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--color-primary)]">
                  <MapPin className="h-4 w-4" />
                  Altmed Medical Center
                </div>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{clinic.address}</p>
              </div>
              <iframe
                title="Altmed Medical Center map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3110.6699534680624!2d-77.50426882460079!3d38.771273354137136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b5c42b2003419f%3A0xaa6e5bca3300f8ab!2sAltmed%20Medical%20Center%20-%20Manassas!5e0!3m2!1sen!2sus!4v1755104558055!5m2!1sen!2sus"
                className="h-[420px] w-full border-0"
                allowFullScreen
                loading="lazy"
              />
            </aside>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {providers.length ? (
              providers.map((provider) => (
                <article key={provider.id} className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-6">
                  <div className="flex gap-5">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-[var(--color-bg-gray)]">
                      <Image src={provider.image} alt={`${provider.name} at Altmed Medical Center in Manassas VA`} fill className="object-cover" />
                    </div>
                    <div>
                      <h2 className="text-2xl">{provider.name}</h2>
                      <p className="mt-1 text-sm font-semibold text-[var(--color-primary)]">
                        {[provider.credentials, provider.title].filter(Boolean).join(" | ")}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{provider.aliases}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-base leading-8 text-[var(--color-text-muted)]">{provider.statement}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {provider.specialties.map((specialty) => (
                      <span key={specialty} className="rounded-md bg-[var(--color-bg-gray)] px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  {provider.isSchedulable && provider.appointmentUrl ? (
                    <a href={getAppointmentHref(provider.appointmentUrl)} target="_blank" rel="noreferrer" className="btn-primary mt-5">
                      <CalendarCheck2 className="h-4 w-4" />
                      Schedule
                    </a>
                  ) : null}
                  <p className="mt-5 text-sm leading-7 text-[var(--color-text-muted)]">{provider.education}</p>
                </article>
              ))
            ) : (
              <div className="rounded-[14px] border border-[var(--color-border)] bg-[var(--color-bg-gray)] p-7 md:col-span-2">
                <h2 className="text-3xl">Provider directory is being updated</h2>
                <p className="mt-3 max-w-3xl text-base leading-8 text-[var(--color-text-muted)]">
                  Online provider profiles are not currently listed. Call Altmed for the latest provider availability and appointment help.
                </p>
                <a href={`tel:${clinic.phone}`} className="btn-primary mt-5">
                  Call {clinic.phone}
                </a>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 rounded-[14px] bg-[var(--color-footer-bg)] p-7 text-white">
          <h2 className="text-3xl text-white">Need help choosing a provider or service?</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/80">
            Call Altmed for appointment help, DOT physical scheduling, medical weight-loss
            questions, or employer-services setup.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a href={`tel:${clinic.phone}`} className="btn-primary">
              Call {clinic.phone}
            </a>
            <Link href={publicRoutes.appointment as Route} className="btn-outline-light">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
