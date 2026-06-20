import type { Metadata } from "next";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Check, ClipboardCheck, HeartPulse, MapPin, Scale, Smartphone, Star, Stethoscope } from "lucide-react";
import { BlogCard } from "@/components/public/BlogCard";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { SchemaOrg } from "@/components/public/SchemaOrg";
import { getBlogPosts, getGoogleReviews } from "@/lib/api";
import { buildPageMetadata } from "@/lib/metadata";
import { buildFaqSchema } from "@/lib/schema";
import { aiAssets, buildBookingUrl, clinic, legacyAssets, publicRoutes, serviceCards } from "@/lib/site-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Walk-In Clinic Manassas VA | Same-Day Urgent Care | Altmed Medical Center",
  description:
    "Altmed Medical Center in Manassas VA offers walk-in urgent care, DOT physicals, medical weight loss, and occupational health — no appointment needed. Board-certified providers. Call (703) 361-4357.",
  path: "/",
  image: "/assets/img/homepage/clinic-front-view.jpg"
});

const careCards = [
  {
    icon: Stethoscope,
    label: "I'm sick or injured",
    descriptor: "Infections, pain, cuts, fever - seen today",
    href: publicRoutes.service("urgent-care-manassas-va")
  },
  {
    icon: ClipboardCheck,
    label: "I need a physical or DOT exam",
    descriptor: "CDL renewals, pre-employment, annual exams",
    href: publicRoutes.service("dot-physical-manassas-va")
  },
  {
    icon: Scale,
    label: "I want to lose weight",
    descriptor: "Semaglutide, B-12, medically supervised plans",
    href: publicRoutes.service("medical-weight-loss-manassas")
  },
  {
    icon: BriefcaseBusiness,
    label: "Work injury or drug test",
    descriptor: "Same-day workers' comp and screening",
    href: publicRoutes.service("occupational-health-clinic-manassas")
  },
  {
    icon: HeartPulse,
    label: "I need ongoing care",
    descriptor: "Chronic conditions, checkups, family medicine",
    href: publicRoutes.service("primary-care-manassas-va")
  },
  {
    icon: Smartphone,
    label: "I can't come in right now",
    descriptor: "Video visits from home or work",
    href: publicRoutes.telehealth
  }
] as const;

const trustStats = [
  "25+ Years Serving Manassas",
  "Board-Certified Physicians",
  "10+ Services Under One Roof",
  "Same-Day Appointments",
  "Walk-In Friendly"
] as const;

const serviceGroups = [
  {
    label: "Patient Care",
    copy:
      "For patients and families who need care today, regular checkups, supervised weight loss, or a more connected medical home.",
    slugs: [
      "urgent-care-manassas-va",
      "primary-care-manassas-va",
      "medical-weight-loss-manassas",
      "functional-medicine-manassas",
      "suboxone-treatment-manassas",
      "telehealth-manassas"
    ]
  },
  {
    label: "Employer Services",
    copy:
      "For employers, drivers, fleet managers, and HR teams that need fast documentation, compliant exams, and workplace health support.",
    slugs: [
      "dot-physical-manassas-va",
      "occupational-health/drug-alcohol-testing-manassas",
      "occupational-health/workers-compensation-injury-care-manassas",
      "occupational-health-clinic-manassas",
      "occupational-health/vaccinations-immunizations-manassas-va",
      "third-party-administrator-service-manassas"
    ]
  }
] as const;

const featuredServices = [
  {
    slug: "urgent-care-manassas-va",
    title: "Urgent Care",
    image: aiAssets.primaryCareConsultation,
    body:
      "Most patients are seen the same day, without an appointment. We treat respiratory infections, sprains, lacerations, UTIs, rashes, and over 50 common conditions so you can get care without a three-hour ER wait.",
    stat: "50+ common conditions treated"
  },
  {
    slug: "dot-physical-manassas-va",
    title: "DOT Physicals",
    image: aiAssets.occupationalHealthExam,
    body:
      "Our FMCSA-certified medical examiner conducts CDL physicals, vision and hearing tests, and urinalysis on-site. Most drivers are in and out in under an hour with their medical certificate in hand.",
    stat: "FMCSA-certified examiner"
  },
  {
    slug: "medical-weight-loss-manassas",
    title: "Medical Weight Loss",
    image: aiAssets.medicalWeightLossConsult,
    body:
      "We discuss GLP-1 options such as semaglutide and tirzepatide when clinically appropriate, alongside nutrition planning, safety review, and follow-up visits.",
    stat: "Physician-guided follow-up"
  }
] as const;

const providerBadges = ["MD", "PhD", "Obesity Medicine", "Addiction Medicine", "Pain Management", "Preventive Care"] as const;

const serviceAreas = ["Manassas", "Manassas Park", "Gainesville", "Bristow", "Haymarket", "Centreville", "Woodbridge", "Prince William County"] as const;

const localCarePoints = [
  {
    title: "Care today, follow-up tomorrow",
    body:
      "Patients often come to Altmed because they need care today, but they do not want a disconnected one-time visit. A sore throat, UTI, rash, blood pressure concern, DOT certificate, drug test, or weight-loss question can all create the same problem: you need clear answers, useful documentation, and a provider who can explain the next step."
  },
  {
    title: "One clinic for the next step",
    body:
      "Our Manassas clinic connects walk-in urgent care with primary care follow-up, medical weight loss, telehealth, and occupational health services. A same-day visit can lead into lab review, medication support, chronic-condition management, or specialist paperwork when the situation calls for it."
  },
  {
    title: "Paperwork handled carefully",
    body:
      "Employers and drivers use Altmed because speed matters, but accuracy matters too. DOT physicals, clearance forms, pre-employment exams, workers' compensation visits, and drug testing need careful handling so patients, supervisors, and HR teams know what happens next."
  },
  {
    title: "Built for real weekday schedules",
    body:
      "Altmed can help with follow-up questions, preventive care, telehealth when appropriate, and records or forms that support school, work, driving, or employer requirements."
  }
] as const;

const homeFaqs = [
  {
    question: "Do you accept walk-ins?",
    answer:
      "Walk-ins are welcome Monday through Friday for many urgent care and same-day services. Booking ahead is still helpful for physicals, weight loss consultations, and employer services so we can prepare the right paperwork."
  },
  {
    question: "What insurance do you take?",
    answer:
      "We accept most major insurances including Aetna, CareFirst, Cigna, and United. Please bring your insurance card and photo ID, and call ahead if you want our team to confirm details before your visit."
  },
  {
    question: "What are your hours?",
    answer:
      "Altmed Medical Center is open Monday through Friday, 9 AM to 5 PM. Hours can change around holidays, so call before coming in if timing is tight."
  },
  {
    question: "Do you do DOT physicals?",
    answer:
      "Yes. Altmed performs DOT and CDL physical exams in Manassas with FMCSA-certified medical examiners and same-day availability when the schedule allows."
  },
  {
    question: "Do you offer telehealth?",
    answer:
      "Yes. Telehealth is available for appropriate follow-up visits, medication discussions, and concerns that do not require an in-person exam or testing."
  },
  {
    question: "How much does a DOT physical cost?",
    answer:
      "DOT physical pricing can change by promotion, employer requirements, and add-on services. Call (703) 361-4357 for the current DOT physical price before your visit."
  }
] as const;

function serviceBySlug(slug: string) {
  return serviceCards.find((service) => service.slug === slug);
}

function serviceChip(slug: string) {
  if (slug === "telehealth-manassas") {
    return { title: "Telehealth", href: publicRoutes.telehealth };
  }

  const service = serviceBySlug(slug);
  return service ? { title: service.title, href: publicRoutes.service(slug) } : null;
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatReviewDate(value?: string | null) {
  if (!value) {
    return "Google review";
  }

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric"
  });
}

export default async function HomePage() {
  const [posts, googleReviews] = await Promise.all([getBlogPosts(), getGoogleReviews()]);
  const featuredPosts = posts.slice(0, 3);
  const visibleReviews = googleReviews.filter((review) => review.rating >= 4).slice(0, 6);

  return (
    <main>
      <SchemaOrg schema={buildFaqSchema([...homeFaqs])} />

      <section className="overflow-hidden bg-[var(--c-bg)]">
        <div className="container-shell grid gap-10 py-10 md:py-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(380px,0.88fr)] lg:items-center lg:py-16">
          <div className="w-full max-w-[22rem] sm:max-w-[700px]">
            <div className="section-label">Walk-In Clinic in Manassas, VA</div>
            <h1 className="mt-5 max-w-full break-words text-[2.05rem] leading-[1.08] text-dark-800 [text-wrap:pretty] sm:text-[2.25rem] md:max-w-2xl md:text-[3.35rem] lg:text-[3.95rem]">
              <span className="block sm:inline">Same-Day Urgent Care and </span>
              <span className="block sm:inline">Primary Care in </span>
              <span className="block sm:inline">Manassas, VA</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] md:text-[1.08rem] md:leading-8">
              Walk in for urgent care, DOT physicals, primary care, medical weight loss,
              telehealth, and employer health services at Altmed Medical Center on Rixlew Lane.
              No referral needed.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Link href={buildBookingUrl("home_hero", "book-appointment") as Route} className="btn-primary w-full justify-center sm:w-auto">
                Book Appointment <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:${clinic.phone}`} className="btn-outline-dark w-full justify-center sm:w-auto">
                Call {clinic.phone}
              </a>
            </div>
            <a href={clinic.mapUrl} className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-[var(--color-text)]">
              <MapPin className="h-4 w-4 text-[var(--color-primary)]" />
              View Altmed on Google Maps
            </a>
            <div className="mt-7 grid gap-x-5 gap-y-3 text-sm font-semibold text-[var(--color-text)] sm:grid-cols-2 lg:flex lg:flex-wrap">
              {["Board-Certified Providers", "Walk-Ins Welcome", "Same-Day Availability", "Telehealth Options"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-[var(--color-primary)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-bg-gray)] shadow-[0_22px_60px_rgba(17,30,27,0.12)] md:min-h-[460px] lg:min-h-[540px]">
            <Image
              src={legacyAssets.heroClinic}
              alt="Altmed Medical Center walk-in clinic exterior at 8551 Rixlew Lane in Manassas VA"
              fill
              className="site-photo object-cover object-center"
              priority
              sizes="(min-width: 1024px) 44vw, 100vw"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-[var(--radius-sm)] border border-[rgba(28,43,39,0.08)] bg-white p-4 shadow-[0_14px_34px_rgba(17,30,27,0.14)] sm:right-auto sm:w-[min(520px,calc(100%-2.5rem))]">
              <div className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-primary)]">Altmed Medical Center</div>
              <div className="mt-1 font-semibold leading-6 text-[var(--color-text-dark)]">8551 Rixlew Lane, Suite 140 · Manassas, VA</div>
              <div className="text-sm font-medium text-[var(--color-text-muted)]">Open Monday-Friday, 9 AM-5 PM</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--c-surface-tint)]">
        <div className="container-shell section-pad">
          <div className="max-w-3xl">
            <div className="section-label">Find Your Care</div>
            <h2 className="mt-3">Tell us what you need. We&apos;ll take it from there.</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
            {careCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link key={card.label} href={card.href as Route} className="quick-select-card min-h-32 md:min-h-40">
                  <Icon className="h-7 w-7 text-[var(--c-muted)] transition" />
                  <span>
                    <span className="block text-sm font-bold text-[var(--c-text)] md:text-base">{card.label}</span>
                    <span className="mt-2 block text-xs leading-5 text-[var(--c-muted)] md:text-sm">{card.descriptor}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--c-primary)] py-8 text-white">
        <div className="container-shell grid gap-4 text-center text-[13px] font-bold uppercase tracking-[0.1em] md:grid-cols-5">
          {trustStats.map((stat) => (
            <div key={stat}>{stat}</div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--c-bg)]">
        <div className="container-shell section-pad">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="max-w-xl">
              <div className="section-label">Local Medical Care</div>
              <h2 className="mt-3 max-w-lg text-[2rem] leading-[1.13] md:text-[2.35rem]">
                A practical clinic for real-life visits, paperwork, and follow-up.
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--c-muted)]">
                One local team for common medical visits, work requirements, and the follow-up that
                often happens after the first appointment.
              </p>
            </div>
            <div className="grid gap-5">
              {localCarePoints.map((item) => (
                <article key={item.title} className="border-l-2 border-[var(--c-border)] pl-5">
                  <h3 className="text-[1rem]">{item.title}</h3>
                  <p className="mt-2 max-w-[78ch] text-[0.98rem] leading-7 text-[var(--c-muted)] md:text-base">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--c-bg)]">
        <div className="container-shell section-pad">
          <div className="max-w-3xl">
            <div className="section-label">What We Treat</div>
            <h2 className="mt-3">One clinic. Every care need your family or business has.</h2>
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            {serviceGroups.map((group) => (
              <div key={group.label}>
                <h3>{group.label}</h3>
                <p className="mt-3 text-base leading-8 text-[var(--c-muted)]">{group.copy}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {group.slugs.map((slug) => {
                    const service = serviceChip(slug);
                    return service ? (
                      <Link key={slug} href={service.href as Route} className="pill-tag">
                        {service.title}
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--c-surface-tint)]">
        <div className="container-shell section-pad">
          <div className="max-w-3xl">
            <div className="section-label">Featured Services</div>
            <h2 className="mt-3">Fast answers for the visits patients book most.</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <article key={service.slug} className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--c-border)] bg-white">
                <div className="relative h-52">
                  <Image
                    src={service.image}
                    alt={`${service.title} care at Altmed Medical Center in Manassas VA`}
                    fill
                    className="clinic-img object-cover"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                </div>
                <div className="p-6">
                  <h3>{service.title}</h3>
                  <p className="mt-4 text-base leading-8 text-[var(--c-muted)]">{service.body}</p>
                  <div className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--c-primary)]">{service.stat}</div>
                  <Link href={publicRoutes.service(service.slug) as Route} className="mt-5 inline-flex items-center gap-2 font-bold text-[var(--c-primary)] hover:underline">
                    Learn more about {service.title} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--c-bg)]">
        <div className="container-shell section-pad">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative min-h-[430px] overflow-hidden rounded-[var(--radius-lg)]">
              <Image
                src={aiAssets.providerFallback}
                alt="Clinical tools representing the Altmed care team in Manassas VA"
                fill
                className="clinic-img object-cover"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </div>
            <div>
              <div className="section-label">Your Care Team</div>
              <h2 className="mt-3">Led by a board-certified physician with over two decades of experience.</h2>
              <p className="mt-5 text-base leading-8 text-[var(--c-muted)]">
                Dr. Gerald K. Lee, M.D., Ph.D., leads Altmed Medical Center with board
                certifications in Obesity Medicine, Addiction Medicine, and Pain Management. His
                background spans family practice, occupational health, chronic disease management,
                Suboxone treatment, senior preventive care, and evidence-based medicine.
              </p>
              <p className="mt-4 text-base leading-8 text-[var(--c-muted)]">
                Dr. Lee earned his M.D. from The Chicago Medical School, a Ph.D. in Biostatistics
                from The Ohio State University, and a master&apos;s degree in Epidemiology from Harvard
                University. His research background includes publications in breast cancer, chronic
                pain, diabetes, and elder abuse, which supports Altmed&apos;s model of combining science
                with compassionate, whole-person care.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {providerBadges.map((badge) => (
                  <span key={badge} className="rounded-md bg-[var(--c-surface-tint)] px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[var(--c-primary)]">
                    {badge}
                  </span>
                ))}
              </div>
              <a href="https://www.patientfusion.com/doctor/jerry-lee-md-phd-08966" target="_blank" rel="noreferrer" className="mt-7 inline-flex font-bold text-[var(--c-primary)] underline-offset-4 hover:underline">
                Schedule with Dr. Lee
              </a>
            </div>
          </div>
        </div>
      </section>

      {visibleReviews.length ? (
        <section className="bg-[var(--c-surface-tint)]">
          <div className="container-shell section-pad">
            <div className="max-w-3xl">
              <div className="section-label">Google Reviews</div>
              <h2 className="mt-3">What patients say on Google.</h2>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {visibleReviews.map((review) => (
                <article key={review.id} className="rounded-[var(--radius-md)] border border-[var(--c-border)] border-l-4 border-l-[var(--c-primary)] bg-white p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--c-surface-tint)] text-sm font-bold text-[var(--c-primary)]">
                      {getInitials(review.reviewerName)}
                    </div>
                    <div className="flex gap-1 text-[var(--c-accent)]" aria-label={`${review.rating} star Google review`}>
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-5 font-heading text-lg italic leading-8 text-[var(--c-text)]">&ldquo;{review.reviewText}&rdquo;</p>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--c-muted)]">
                    {review.reviewerName} · {formatReviewDate(review.reviewDate)}
                  </p>
                  {review.sourceUrl ? (
                    <a href={review.sourceUrl} className="mt-4 inline-flex text-sm font-bold text-[var(--c-primary)] hover:underline">
                      View on Google
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
            <a href={clinic.mapUrl} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--c-primary)] hover:underline">
              <MapPin className="h-4 w-4" />
              View Altmed on Google Maps
            </a>
          </div>
        </section>
      ) : null}

      <section className="bg-[var(--c-bg)]">
        <div className="container-shell section-pad">
          <div className="max-w-4xl">
            <div className="section-label">Serving Northern Virginia</div>
            <h2 className="mt-3">Convenient care for patients across Prince William County.</h2>
            <p className="mt-5 text-base leading-8 text-[var(--c-muted)]">
              Altmed Medical Center is located at 8551 Rixlew Lane, Suite 140, just off Route 28 in
              Manassas with easy parking and no referral needed. We serve patients from{" "}
              {serviceAreas.map((area, index) => (
                <span key={area}>
                  <Link href={publicRoutes.contact as Route} className="font-semibold text-[var(--c-primary)] underline-offset-4 hover:underline">
                    {area}
                  </Link>
                  {index < serviceAreas.length - 1 ? ", " : "."}
                </span>
              ))}{" "}
              Whether you&apos;re searching for urgent care near Sudley, a DOT physical in Gainesville,
              or a walk-in clinic in Bristow, our team is here Monday through Friday, 9 AM to 5 PM.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-[var(--radius-md)] border border-[var(--c-border)] bg-white">
            <iframe
              title="Altmed Medical Center location map"
              src="https://www.google.com/maps?q=8551%20Rixlew%20Lane%20Suite%20140%20Manassas%20VA%2020109&output=embed"
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="bg-[var(--c-surface-tint)]">
        <div className="container-shell section-pad">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <div className="section-label">Common Questions</div>
              <h2 className="mt-3">Quick answers before your visit.</h2>
            </div>
            <FAQAccordion items={[...homeFaqs]} />
          </div>
        </div>
      </section>

      <section className="bg-[var(--c-bg)]">
        <div className="container-shell section-pad">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="section-label">Health Resources</div>
              <h2 className="mt-3">Articles written for patients, not search engines.</h2>
            </div>
            <Link href={publicRoutes.blog as Route} className="inline-flex items-center gap-2 font-bold text-[var(--c-primary)] hover:underline">
              Browse all health articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
