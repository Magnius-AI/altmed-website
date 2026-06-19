import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";
import {
  ArrowRight,
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
  aiAssets,
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

const priorityDepthSections: Record<string, Array<{ title: string; body: string; points?: string[] }>> = {
  "dot-physical-manassas-va": [
    {
      title: "How to avoid DOT physical delays",
      body:
        "The fastest DOT physicals happen when drivers bring the right documentation the first time. Blood pressure history, sleep apnea treatment, diabetes monitoring, cardiac notes, medication lists, glasses, contacts, hearing aids, and employer paperwork can all affect how smoothly the certification process goes. If a condition needs clearance, the examiner may need supporting records before issuing a medical certificate."
    },
    {
      title: "Clearance forms drivers commonly need",
      body:
        "Altmed keeps the common DOT clearance PDFs easy to reach because those forms already help drivers and treating clinicians move faster. Cardiac clearance, hypertension clearance, sleep apnea documentation, diabetes assessment, vision reports, return-to-duty notes, and medication review forms are all preserved on the site. Bringing the right form to your specialist can reduce back-and-forth after the exam."
    },
    {
      title: "Pricing, timing, and employer needs",
      body:
        "Drivers searching for a low-cost DOT physical usually want two things: a fair price and a visit that does not disrupt work. Current pricing can vary by promotion, employer requirements, add-on services, or documentation needs, so calling before the visit is the safest way to confirm. Employers can also send workers with authorization paperwork when billing or specific testing is required."
    },
    {
      title: "What to bring to a CDL medical exam",
      body:
        "Bring a photo ID, current driver information, glasses or contacts if you use them, hearing aids if needed, a medication list, and any recent records related to chronic conditions. Drivers with high blood pressure, diabetes, heart history, sleep apnea, neurologic history, mental-health medication, controlled substances, or recent procedures should bring supporting notes from the treating clinician when available. The goal is to help the medical examiner make a complete decision without delaying certification for missing paperwork.",
      points: [
        "Medication list with doses and prescribing clinician names",
        "CPAP compliance report or sleep specialist note when sleep apnea applies",
        "Cardiology, diabetes, hypertension, or vision clearance paperwork when requested",
        "Employer authorization if the visit is being billed through a company account"
      ]
    },
    {
      title: "What can affect DOT certification",
      body:
        "A DOT physical is not just a routine checkup. The examiner must decide whether the driver can safely operate a commercial vehicle under FMCSA medical standards. Blood pressure, vision, hearing, medication side effects, substance-use history, untreated sleep apnea, cardiac symptoms, uncontrolled diabetes, and incomplete specialist documentation can all affect the length of certification or require follow-up. Altmed explains what is missing and points drivers to the correct clearance form when additional documentation is needed."
    },
    {
      title: "Same-day certificates and follow-up decisions",
      body:
        "Many drivers can complete the exam and leave with next steps the same day, but the certificate depends on the medical findings and required documentation. If the examiner needs a specialist note, updated treatment record, or clearance form, Altmed explains the issue clearly so the driver can resolve it quickly. That helps commercial drivers, owner-operators, and fleet managers reduce downtime without cutting corners on safety."
    },
    {
      title: "Why local DOT access matters",
      body:
        "A nearby DOT clinic matters when a certificate is expiring, a new employer needs onboarding completed, or a driver is trying to return to work after medical follow-up. Altmed gives Manassas-area drivers a local place to ask questions, complete the exam, download forms, and connect follow-up paperwork to the same clinic team. That practical access can make the difference between a smooth renewal and days of avoidable delay."
    }
  ],
  "medical-weight-loss-manassas": [
    {
      title: "Why physician-supervised weight loss matters",
      body:
        "Patients comparing weight-loss injections, online programs, and clinic-based care need more than a prescription. A safer plan starts with medical history, current medications, blood pressure, weight-related risks, prior attempts, side-effect discussion, and follow-up. Altmed focuses on whether a treatment is appropriate for the patient, not just whether the medication is popular."
    },
    {
      title: "GLP-1 medication is one part of the plan",
      body:
        "Semaglutide, tirzepatide, Ozempic, Wegovy, Mounjaro, and Zepbound are names patients often hear before they understand the clinical differences. These medications can help qualified patients, but results depend on nutrition, activity, dose tolerance, side effects, refill access, and realistic long-term planning. Follow-up visits help the plan adjust instead of leaving patients alone with questions."
    },
    {
      title: "Cost, insurance, and candidacy conversations",
      body:
        "Insurance coverage for weight-loss medication can vary widely by diagnosis, plan, pharmacy benefit, and prior authorization rules. Some patients need self-pay options or a different medical strategy. Altmed can discuss candidacy, medication safety, visit costs, prescription considerations, and next steps so patients understand the financial and medical side before committing."
    },
    {
      title: "Semaglutide, tirzepatide, and realistic expectations",
      body:
        "Patients often arrive asking for Ozempic, Wegovy, Mounjaro, Zepbound, semaglutide, or tirzepatide by name. The right conversation starts with safety and fit. A provider reviews medical history, current prescriptions, prior weight-loss attempts, appetite patterns, side-effect risks, pregnancy plans, gallbladder or pancreas history, and whether labs or primary-care follow-up are needed. Some patients may qualify for a GLP-1 plan. Others may need blood pressure control, diabetes evaluation, nutrition structure, or a different medication discussion before injections make sense."
    },
    {
      title: "B-12 injections, phentermine, and non-GLP-1 options",
      body:
        "Not every patient needs or qualifies for GLP-1 medication. Some visits focus on energy, meal timing, cravings, metabolic health, B-12 injections, appetite-control medication, or a gradual plan that avoids unnecessary cost. Phentermine and similar appetite medications require extra caution because blood pressure, heart history, sleep, anxiety, and medication interactions matter. Altmed can explain when these options may be reasonable and when a safer alternative should come first.",
      points: [
        "B-12 support may be discussed when symptoms, history, or nutrition patterns make it relevant",
        "Phentermine requires provider judgment and is not appropriate for every patient",
        "Nutrition and follow-up planning are part of the program, not an afterthought",
        "Telehealth may be appropriate for some follow-ups after the initial medical review"
      ]
    },
    {
      title: "How to know if you are ready to start",
      body:
        "A strong medical weight-loss visit should leave patients with a plan they understand. Before booking, think about your goals, previous diets or medications, current prescriptions, sleep, stress, work schedule, eating patterns, and budget. Bring recent lab results if you have them. If you do not, Altmed can discuss what information may be useful before starting. The best candidates are not looking for a quick transaction; they are ready for monitoring, honest expectations, and adjustments when the first plan needs refinement."
    },
    {
      title: "What the first visit should accomplish",
      body:
        "The first medical weight-loss appointment is where the plan becomes personal. Patients should expect to talk about weight history, appetite cues, cravings, meal timing, exercise limitations, prior medication response, family history, sleep, stress, and medical risks. This is also the right time to discuss whether labs, primary-care follow-up, blood pressure monitoring, diabetes screening, thyroid concerns, or medication interactions should be addressed before treatment starts. A thoughtful first visit prevents the program from becoming a generic injection purchase."
    },
    {
      title: "Follow-up after medication begins",
      body:
        "Follow-up visits are where safer weight loss happens. The provider can review appetite changes, nausea, constipation, hydration, protein intake, dose questions, prescription access, plateaus, and whether weight loss is moving too quickly or too slowly. Patients using semaglutide or tirzepatide may need dose adjustments or side-effect guidance. Patients using non-GLP-1 options may need blood pressure checks, symptom review, or a different plan. The point is to keep the treatment medically supervised instead of leaving patients to guess."
    },
    {
      title: "A local alternative to one-time online weight-loss care",
      body:
        "Online programs can be convenient, but many patients still want a Manassas clinic that can connect weight loss with primary care, urgent care, lab testing, blood pressure review, and medication follow-up. Altmed gives patients a local place to ask questions when side effects, insurance delays, prescription availability, or health changes come up. That local connection is especially important for patients who have prediabetes, diabetes, high blood pressure, sleep apnea, high cholesterol, PCOS symptoms, thyroid concerns, or other weight-related risks."
    },
    {
      title: "Weight loss that supports the rest of your health",
      body:
        "The best weight-loss plan should support more than the number on the scale. Patients may be trying to lower blood pressure, reduce diabetes risk, improve mobility, prepare for a procedure, sleep better, reduce joint pain, or feel more confident in daily life. Altmed can connect those goals to practical follow-up, including primary-care monitoring, lab review, medication adjustments, and lifestyle planning. That broader medical context is what separates physician-supervised care from short-term dieting."
    },
    {
      title: "Questions to ask before choosing a program",
      body:
        "Before starting any medical weight-loss program, ask who monitors side effects, how often follow-up happens, what happens if medication is out of stock, whether labs are recommended, what costs are expected, and how the plan changes if progress slows. A good clinic should be able to answer those questions clearly. Altmed uses the visit to set expectations before patients invest time, money, and hope into a treatment plan."
    }
  ]
};

function extractHeroTitle(heroContent: string, fallback: string) {
  const match = heroContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
  return (match?.[1] ?? `${fallback} in Manassas, VA`).replace(/<[^>]+>/g, "").trim();
}

export function ServicePageContent({ page }: Props) {
  const related = serviceCards.filter((item) => item.slug !== page.slug).slice(0, 3);
  const experience = serviceExperienceContent[page.slug];
  const shouldShowFeatureImage = (index: number) => index === 0;
  const resourceLinks = getServiceResourceLinks(page.slug);
  const faqs = servicePageFaqs[page.slug] ?? [];
  const pageUrl = `${clinic.canonicalUrl}/services/${page.slug}`;
  const serviceDescription =
    page.metaDescription ??
    page.heroContent.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const prioritySections = priorityDepthSections[page.slug] ?? [];
  const heroIntroHtml = page.heroContent.replace(/<h1[^>]*>.*?<\/h1>/i, "").trim();
  const heroTitle = extractHeroTitle(page.heroContent, page.name);
  const audienceItems = getAudienceItems(page.slug, page.name);
  const expectationSteps = getExpectationSteps(page.slug);

  return (
    <main className="overflow-x-clip bg-[var(--color-bg)]">
      <SchemaOrg
        schema={buildBreadcrumbSchema([
          { name: "Home", item: clinic.canonicalUrl },
          { name: "Services", item: `${clinic.canonicalUrl}${publicRoutes.services}` },
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
          <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:gap-10">
            <div className="min-w-0">
              <div className="section-label">
                {experience?.eyebrow ?? page.name}
              </div>
              <h1 className="mt-6 max-w-2xl break-words text-[1.9rem] leading-[1.1] [text-wrap:pretty] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem]">
                {heroTitle}
              </h1>
              <div className="prose-lite mt-5 max-w-none" dangerouslySetInnerHTML={{ __html: heroIntroHtml }} />
              <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
                <a href={buildBookingUrl("service_page", page.slug)} className="btn-primary justify-center sm:w-auto">
                  Book This Service
                </a>
                <a href={`tel:${clinic.phone}`} className="btn-outline-dark justify-center sm:w-auto">
                  Call {clinic.phone}
                </a>
              </div>

              {experience ? (
                <div className="mt-8 grid min-w-0 gap-3 sm:grid-cols-3 md:gap-4">
                  {experience.stats.map((item, index) => {
                    const Icon = featureIcons[index % featureIcons.length];
                    return (
                      <div key={item.label} className="min-w-0 rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-4 sm:p-5">
                        <Icon className="h-5 w-5 text-[var(--color-primary)]" />
                        <div className="mt-3 break-words text-[clamp(1.16rem,2.4vw,1.55rem)] font-semibold leading-tight text-[var(--color-text-dark)]">
                          {item.value}
                        </div>
                        <div className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{item.label}</div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <div className="relative min-w-0">
              <div className="relative min-h-[280px] overflow-hidden rounded-[16px] border border-[rgba(18,52,77,0.08)] bg-white sm:min-h-[360px] lg:min-h-[440px]">
                <Image
                  src={page.featuredImage ?? aiAssets.primaryCareConsultation}
                  alt={`${page.name} care at Altmed Medical Center in Manassas, Virginia`}
                  fill
                  className="site-photo object-cover"
                  priority
                />
              </div>
              <div className="mt-4 min-w-0 rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-5 sm:p-6">
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

      <section className="container-shell py-12 md:py-16">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,320px)] lg:items-start">
          <div className="min-w-0 space-y-6">
            <article className="prose-lite max-w-none rounded-[16px] border border-[rgba(18,52,77,0.08)] bg-white p-6 md:p-8">
              <div dangerouslySetInnerHTML={{ __html: page.bodyContent }} />
              {prioritySections.map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                  {section.points?.length ? (
                    <ul>
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
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
              <section className="not-prose mt-10 grid min-w-0 gap-5 md:grid-cols-2">
                <div className="min-w-0 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5">
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
                <div className="min-w-0 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5">
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
                <div className="min-w-0 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5">
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
                <div className="min-w-0 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-5">
                  <h2 className="text-2xl">Cost & Insurance</h2>
                  <p className="mt-3 text-base leading-8 text-[var(--color-text-secondary)]">
                    We accept most major insurances including Aetna, CareFirst, Cigna, and United.
                    Self-pay rates available.
                  </p>
                  <a href={buildBookingUrl("service_specific_cta", page.slug)} className="btn-primary mt-5 justify-center sm:w-auto">
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

            <section className="min-w-0 rounded-[16px] border border-[rgba(18,52,77,0.08)] bg-[var(--color-bg-gray)] p-5 sm:p-6">
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
                      className="min-w-0 rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-5 transition hover:border-[rgba(0,166,166,0.22)]"
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
              <section className="min-w-0 rounded-[16px] border border-[rgba(18,52,77,0.08)] bg-white p-6 md:p-8">
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

          <aside className="min-w-0 space-y-5 lg:sticky lg:top-28">
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
                <a
                  href={`tel:${clinic.phone}`}
                  className="focus-ring inline-flex min-h-[44px] items-center justify-center rounded-md border border-[var(--color-accent)] bg-[var(--color-accent)] px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-white shadow-[0_10px_22px_rgba(217,123,58,0.22)] transition hover:border-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)]"
                >
                  Call {clinic.phone}
                </a>
                <Link
                  href={publicRoutes.contact as Route}
                  className="focus-ring inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/70 bg-transparent px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-white hover:text-[var(--color-footer-bg)]"
                >
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
                    className={`grid min-w-0 gap-6 rounded-[16px] border border-[rgba(18,52,77,0.08)] bg-white p-5 sm:p-6 lg:items-center lg:gap-8 ${
                      shouldShowFeatureImage(index) ? "lg:grid-cols-[0.95fr_1.05fr]" : ""
                    }`}
                  >
                    <div className={`min-w-0 ${shouldShowFeatureImage(index) && index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                        Service Focus
                      </div>
                      <div className="mt-4 inline-flex h-11 w-11 items-center justify-center rounded-[12px] bg-[var(--color-primary)] text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="mt-3 break-words text-[1.7rem] leading-tight sm:text-3xl">{section.title}</h2>
                      <p className="mt-4 text-[1.12rem] leading-8 text-[var(--color-text-dark)]">{section.body}</p>
                      <ul className="mt-6 space-y-4 text-[1.05rem] leading-8 text-[var(--color-text-dark)]">
                        {section.points.map((point) => (
                          <li key={point}>• {point}</li>
                        ))}
                      </ul>
                    </div>
                    {shouldShowFeatureImage(index) ? (
                      <div className={`relative min-h-[240px] overflow-hidden rounded-[12px] sm:min-h-[320px] ${index % 2 === 1 ? "lg:order-1" : ""}`}>
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                Explore More Care
              </div>
              <h2 className="mt-2 text-3xl text-[var(--color-text-dark)]">Related Services</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[var(--color-text-muted)]">
              Altmed connects same-day visits, follow-up care, forms, and employer health services
              under one local Manassas clinic.
            </p>
          </div>
          <div className="mt-7 grid min-w-0 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((service) => (
              <Link
                key={service.slug}
                href={publicRoutes.service(service.slug) as Route}
                className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-[rgba(18,52,77,0.09)] bg-white shadow-soft transition hover:-translate-y-1 hover:border-[rgba(26,107,90,0.25)]"
              >
                <div className="relative aspect-[16/9] bg-[var(--color-bg-gray)]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="site-photo object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="text-sm font-semibold leading-6 text-[var(--color-primary)]">
                    {service.shortDescription.replace(/\.$/, "")}
                  </div>
                  <div className="mt-2 text-lg font-semibold text-[var(--color-text-dark)]">{service.title}</div>
                  <p className="mt-3 flex-1 text-[0.98rem] leading-7 text-[var(--color-text-muted)]">
                    {service.description}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
