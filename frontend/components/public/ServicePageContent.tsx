import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";
import {
  BookOpen,
  Building2,
  Clock3,
  FileText,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope
} from "lucide-react";
import { FAQAccordion } from "./FAQAccordion";
import { SchemaOrg } from "./SchemaOrg";
import { buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from "@/lib/schema";
import {
  buildBookingUrl,
  clinic,
  clinicHighlights,
  publicRoutes,
  serviceCards,
  serviceExperienceContent,
  servicePageFaqs
} from "@/lib/site-content";

type Props = {
  page: {
    slug: string;
    name: string;
    heroContent: string;
    bodyContent: string;
    featuredImage?: string;
    metaDescription?: string;
  };
};

const featureIcons = [Stethoscope, ShieldCheck, Building2];
const keyPointIcons = [ShieldCheck, Clock3, MapPin];

function getAudienceItems(slug: string, serviceName: string) {
  if (
    slug.includes("occupational") ||
    slug.includes("dot") ||
    slug.includes("tpa") ||
    slug.includes("mro") ||
    slug.includes("corporate-wellness")
  ) {
    return [
      "Local employers setting up occupational health services",
      "Drivers and safety-sensitive workers who need compliant documentation",
      "Employees who need work injury, testing, or return-to-work support"
    ];
  }

  if (slug.includes("weight")) {
    return [
      "Patients looking for medically supervised weight management",
      "Adults who want follow-up, monitoring, and practical coaching",
      "People comparing medication-supported programs with lifestyle changes"
    ];
  }

  if (slug.includes("telehealth")) {
    return [
      "Patients who cannot come into the clinic",
      "Follow-up visits that can be handled virtually",
      "People who need convenient access to a local Manassas care team"
    ];
  }

  return [
    `Patients looking for ${serviceName.toLowerCase()} close to Manassas`,
    "Families who want same-day access and clear next steps",
    "New patients who want one clinic for urgent and ongoing care"
  ];
}

function getExpectationSteps(slug: string) {
  if (slug.includes("dot")) {
    return ["Bring your CDL or photo ID and medication list", "Complete the required medical history review", "Finish vision, hearing, blood pressure, and urinalysis screening", "Receive next-step guidance or documentation when you qualify"];
  }

  if (slug.includes("drug") || slug.includes("alcohol")) {
    return ["Check in with your employer or program paperwork", "Confirm the required test type and collection protocol", "Complete the collection under the correct chain-of-custody process", "Receive rapid results or lab-based result routing based on the program"];
  }

  if (slug.includes("weight")) {
    return ["Review your health history, goals, and prior weight-loss attempts", "Complete baseline measurements and medication safety screening", "Discuss nutrition planning, monitoring, and medication support when appropriate", "Schedule follow-up visits to adjust the plan over time"];
  }

  return ["Check in online, by phone, or as a walk-in when appropriate", "Meet with the Altmed care team for evaluation and recommendations", "Complete any needed testing, documentation, or treatment planning", "Leave with treatment guidance, follow-up instructions, or referrals when needed"];
}

function getServiceResourceLinks(slug: string) {
  const common = [
    {
      href: publicRoutes.faq,
      label: "Read frequently asked questions",
      description: "Quick answers for patients, families, and employer clients.",
      icon: BookOpen
    },
    {
      href: publicRoutes.forms,
      label: "Open patient forms",
      description: "Find forms, telehealth consent, and next-step resources.",
      icon: FileText
    },
    {
      href: publicRoutes.contact,
      label: "Contact our team",
      description: "Ask about scheduling, service fit, or employer setup.",
      icon: Phone
    }
  ];

  if (
    slug.includes("occupational") ||
    slug.includes("dot") ||
    slug.includes("tpa") ||
    slug.includes("mro") ||
    slug.includes("corporate-wellness")
  ) {
    return [
      {
        href: publicRoutes.service("occupational-health-clinic-manassas"),
        label: "See occupational health overview",
        description: "Browse the full employer and workplace-services hub.",
        icon: Building2
      },
      ...common
    ];
  }

  if (slug.includes("telehealth")) {
    return [
      {
        href: publicRoutes.telehealth,
        label: "See telehealth options",
        description: "Understand when a virtual visit may be the better next step.",
        icon: Stethoscope
      },
      ...common
    ];
  }

  return [
    {
      href: publicRoutes.service("primary-care-manassas-va"),
      label: "Explore primary care",
      description: "Continue care beyond the urgent or one-time visit.",
      icon: Stethoscope
    },
    ...common
  ];
}

export function ServicePageContent({ page }: Props) {
  const related = serviceCards.filter((item) => item.slug !== page.slug).slice(0, 3);
  const experience = serviceExperienceContent[page.slug];
  const shouldShowFeatureImage = (index: number) => index === 0;
  const resourceLinks = getServiceResourceLinks(page.slug);
  const faqs = servicePageFaqs[page.slug] ?? [];
  const pageUrl = `https://stage.altmedfirst.com/services/${page.slug}`;
  const serviceDescription =
    page.metaDescription ??
    page.heroContent.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const heroIntroHtml = page.heroContent.replace(/<h1[^>]*>.*?<\/h1>/i, "").trim();
  const audienceItems = getAudienceItems(page.slug, page.name);
  const expectationSteps = getExpectationSteps(page.slug);

  return (
    <main className="bg-[var(--color-bg)]">
      <SchemaOrg
        schema={buildBreadcrumbSchema([
          { name: "Home", item: "https://stage.altmedfirst.com" },
          { name: "Services", item: `https://stage.altmedfirst.com${publicRoutes.services}` },
          { name: page.name, item: pageUrl }
        ])}
      />
      <SchemaOrg
        schema={buildServiceSchema({
          name: page.name,
          description: serviceDescription,
          url: pageUrl
        })}
      />
      {faqs.length ? <SchemaOrg schema={buildFaqSchema(faqs)} /> : null}

      <section className="bg-[var(--color-surface-alt)]">
        <div className="container-shell py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div>
              <div className="section-label">
                {experience?.eyebrow ?? page.name}
              </div>
              <h1 className="mt-6 max-w-2xl">{page.name} in Manassas, VA</h1>
              <div className="prose-lite mt-5 max-w-none" dangerouslySetInnerHTML={{ __html: heroIntroHtml }} />
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={buildBookingUrl("service_page", page.slug)} className="btn-primary">
                  Book This Service
                </a>
                <a href={`tel:${clinic.phone}`} className="btn-outline-dark">
                  Call {clinic.phone}
                </a>
              </div>

              {experience ? (
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {experience.stats.map((item, index) => {
                    const Icon = featureIcons[index % featureIcons.length];
                    return (
                      <div key={item.label} className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-5">
                        <Icon className="h-5 w-5 text-[var(--color-primary)]" />
                        <div className="mt-3 text-[2rem] font-semibold tracking-[-0.03em] text-[var(--color-text-dark)]">
                          {item.value}
                        </div>
                        <div className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{item.label}</div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <div className="relative">
              <div className="relative min-h-[440px] overflow-hidden rounded-[16px] border border-[rgba(18,52,77,0.08)] bg-white">
                <Image
                  src={page.featuredImage ?? "/legacy-assets/homepage/top.jpg"}
                  alt={`${page.name} care at Altmed Medical Center in Manassas, Virginia`}
                  fill
                  className="site-photo object-cover"
                  priority
                />
              </div>
              <div className="mt-4 rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
                  Why patients choose Altmed
                </div>
                <ul className="mt-4 space-y-4 text-[1.08rem] leading-8 text-[var(--color-text-dark)]">
                  {(experience?.keyPoints ?? clinicHighlights).slice(0, 3).map((item, index) => {
                    const Icon = keyPointIcons[index % keyPointIcons.length];
                    return (
                      <li key={item} className="flex items-start gap-3">
                        <Icon className="mt-1 h-5 w-5 shrink-0 text-[var(--color-primary)]" />
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="space-y-6">
            <article className="prose-lite max-w-none rounded-[16px] border border-[rgba(18,52,77,0.08)] bg-white p-8 md:p-12">
              <h2>{page.name} in Manassas, VA</h2>
              <p>
                {page.name} at Altmed Medical Center gives patients and employers a clear local
                path for care, documentation, and follow-up. The service is provided by a
                physician-led team at our Manassas clinic, with walk-in access for many visits and
                scheduled appointments when a service needs preparation.
              </p>
              <p>
                Altmed is built for people who want practical answers without being bounced between
                disconnected offices. Because urgent care, primary care, occupational health,
                telehealth, and specialty programs share one roof, your visit can connect to the
                next right step instead of ending with vague instructions.
              </p>
              <section className="not-prose mt-10 grid gap-5 md:grid-cols-2">
                <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5">
                  <h2 className="text-2xl">What it is</h2>
                  <p className="mt-3 text-base leading-8 text-[var(--color-text-secondary)]">
                    {page.name} at Altmed Medical Center is designed for patients and employers who
                    need practical local care in Manassas, VA. The visit focuses on clear
                    evaluation, documentation when needed, and next steps that fit the reason you
                    came in.
                  </p>
                  <p className="mt-3 text-base leading-8 text-[var(--color-text-secondary)]">
                    Because Altmed combines urgent care, primary care, occupational health,
                    telehealth, and specialty programs, many patients can stay connected to one
                    clinic after the first visit instead of starting over elsewhere.
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5">
                  <h2 className="text-2xl">Who it is for</h2>
                  <ul className="mt-4 space-y-3 text-base leading-7 text-[var(--color-text-secondary)]">
                    {audienceItems.map((item) => (
                      <li key={item} className="flex gap-2">
                        <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5">
                  <h2 className="text-2xl">What to expect</h2>
                  <ol className="mt-4 space-y-3 text-base leading-7 text-[var(--color-text-secondary)]">
                    {expectationSteps.map((item, index) => (
                      <li key={item} className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-[var(--color-primary)]">
                          {index + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5">
                  <h2 className="text-2xl">Cost & Insurance</h2>
                  <p className="mt-3 text-base leading-8 text-[var(--color-text-secondary)]">
                    We accept most major insurances including Aetna, CareFirst, Cigna, and United.
                    Self-pay rates available.
                  </p>
                  <a href={buildBookingUrl("service_specific_cta", page.slug)} className="btn-primary mt-5">
                    Book This Service
                  </a>
                </div>
              </section>
              <div className="mt-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5 text-base leading-8 text-[var(--color-text-primary)]">
                Our {page.name.toLowerCase()} clinic serves patients from Manassas, Manassas Park,
                Gainesville, Bristow, Haymarket, Centreville, Woodbridge, and Prince William
                County. We are located at 8551 Rixlew Lane, just off Route 28, with easy parking
                and walk-in access.
              </div>
              <div className="mt-6 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
                Last updated: April 2026
              </div>
            </article>

            <section className="rounded-[16px] border border-[rgba(18,52,77,0.08)] bg-[var(--color-bg-gray)] p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                Continue Exploring
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {resourceLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href as Route}
                      className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-5 transition hover:border-[rgba(0,166,166,0.22)]"
                    >
                      <Icon className="h-5 w-5 text-[var(--color-primary)]" />
                      <div className="mt-3 text-lg font-semibold text-[var(--color-text-dark)]">{item.label}</div>
                      <p className="mt-2 text-[0.98rem] leading-7 text-[var(--color-text-muted)]">
                        {item.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>

            {faqs.length ? (
              <section className="rounded-[16px] border border-[rgba(18,52,77,0.08)] bg-white p-6 md:p-8">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  Service FAQs
                </div>
                <h2 className="mt-3 text-[1.9rem] leading-[1.1] text-[var(--color-text-dark)]">
                  Questions about {page.name.toLowerCase()} in Manassas
                </h2>
                <p className="mt-4 text-[1rem] leading-7 text-[var(--color-text-muted)]">
                  These answers cover common visit questions for patients, families, drivers, and
                  employer clients. For personalized medical guidance, please call the clinic or
                  book an appointment.
                </p>
                <div className="mt-6">
                  <FAQAccordion items={faqs} />
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-[16px] border border-[rgba(18,52,77,0.08)] bg-white p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                Quick details
              </div>
              <div className="mt-4 space-y-4 text-[1.05rem] leading-8 text-[var(--color-text-dark)]">
                <p className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[var(--color-primary)]" />
                  <span>
                    <strong>Address:</strong> {clinic.address}
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <Clock3 className="mt-1 h-5 w-5 shrink-0 text-[var(--color-primary)]" />
                  <span>
                    <strong>Hours:</strong> Monday to Friday, 9 AM to 5 PM
                  </span>
                </p>
                <p className="flex items-start gap-3">
                  <Stethoscope className="mt-1 h-5 w-5 shrink-0 text-[var(--color-primary)]" />
                  <span>
                    <strong>Booking:</strong> Walk-ins are welcome for many services. Scheduled visits are available when preferred.
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-[16px] bg-[var(--color-footer-bg)] px-6 py-7 text-white">
              <h2 className="text-[1.9rem] leading-[1.1] text-white">Need help choosing the right service?</h2>
              <p className="mt-3 text-[1rem] leading-7 text-white/78">
                Call our team for scheduling help, employer setup questions, or guidance on whether
                your visit is better handled in clinic or through another Altmed service.
              </p>
              <div className="mt-5 flex flex-wrap gap-4">
                <a href={`tel:${clinic.phone}`} className="btn-outline-dark border-white text-white hover:bg-white hover:text-[var(--color-text-primary)]">
                  Call {clinic.phone}
                </a>
                <Link href={publicRoutes.contact as Route} className="btn-secondary">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="rounded-[16px] border border-[rgba(18,52,77,0.08)] bg-white p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                Helpful links
              </div>
              <div className="mt-4 grid gap-3 text-[1rem] leading-7">
                <Link href={publicRoutes.forms as Route} className="flex items-center gap-3 hover-link text-[var(--color-text-dark)]">
                  <FileText className="h-4 w-4 text-[var(--color-primary)]" />
                  Patient forms
                </Link>
                <Link href={publicRoutes.faq as Route} className="flex items-center gap-3 hover-link text-[var(--color-text-dark)]">
                  <BookOpen className="h-4 w-4 text-[var(--color-primary)]" />
                  Frequently asked questions
                </Link>
                <Link href={publicRoutes.blog as Route} className="flex items-center gap-3 hover-link text-[var(--color-text-dark)]">
                  <BookOpen className="h-4 w-4 text-[var(--color-primary)]" />
                  Health blog
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {experience ? (
        <section className="bg-[var(--color-bg-gray)]">
          <div className="container-shell section-pad">
            <div className="space-y-8">
              {experience.featureSections.map((section, index) => {
                const Icon = featureIcons[index % featureIcons.length];
                return (
                  <div
                    key={section.title}
                    className={`grid gap-8 rounded-[16px] border border-[rgba(18,52,77,0.08)] bg-white p-6 lg:items-center ${
                      shouldShowFeatureImage(index) ? "lg:grid-cols-[0.95fr_1.05fr]" : ""
                    }`}
                  >
                    <div className={shouldShowFeatureImage(index) && index % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                        Service Focus
                      </div>
                      <div className="mt-4 inline-flex h-11 w-11 items-center justify-center rounded-[12px] bg-[var(--color-primary)] text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="mt-3 text-3xl">{section.title}</h2>
                      <p className="mt-4 text-[1.12rem] leading-8 text-[var(--color-text-dark)]">{section.body}</p>
                      <ul className="mt-6 space-y-4 text-[1.05rem] leading-8 text-[var(--color-text-dark)]">
                        {section.points.map((point) => (
                          <li key={point}>• {point}</li>
                        ))}
                      </ul>
                    </div>
                    {shouldShowFeatureImage(index) ? (
                      <div className={`relative min-h-[320px] overflow-hidden rounded-[12px] ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                        <Image
                          src={section.image}
                          alt={`${section.title} for ${page.name.toLowerCase()} in Manassas, Virginia`}
                          fill
                          className="site-photo object-cover"
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="container-shell pb-20">
        <section>
          <h2 className="text-2xl text-[var(--color-text-dark)]">Related Services</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((service) => (
              <Link
                key={service.slug}
                href={publicRoutes.service(service.slug) as Route}
                className="group overflow-hidden rounded-[16px] border border-[rgba(18,52,77,0.08)] bg-white transition hover:-translate-y-1"
              >
                <div className="relative h-40 bg-[var(--color-bg-gray)]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="site-photo object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    {service.shortDescription}
                  </div>
                  <div className="mt-2 text-lg font-semibold text-[var(--color-text-dark)]">{service.title}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
