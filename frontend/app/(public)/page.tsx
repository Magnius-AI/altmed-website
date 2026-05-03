import type { Metadata } from "next";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Check, ClipboardCheck, HeartPulse, Scale, Smartphone, Star, Stethoscope } from "lucide-react";
import { BlogCard } from "@/components/public/BlogCard";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { SchemaOrg } from "@/components/public/SchemaOrg";
import { getBlogPosts } from "@/lib/api";
import { buildFaqSchema } from "@/lib/schema";
import { buildBookingUrl, clinic, legacyAssets, publicRoutes, serviceCards } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Walk-In Urgent Care, DOT Physicals & Primary Care | Altmed Medical Center Manassas VA",
  description:
    "Same-day urgent care, primary care, DOT physicals, medical weight loss, telehealth, and employer health services in Manassas, VA.",
  alternates: {
    canonical: "https://stage.altmedfirst.com/"
  },
  openGraph: {
    title: "Altmed Medical Center | Walk-In Clinic in Manassas VA",
    description:
      "Walk-ins welcome for urgent care, primary care, DOT physicals, medical weight loss, telehealth, and occupational health in Manassas.",
    url: "https://stage.altmedfirst.com/",
    images: [
      {
        url: legacyAssets.departmentThree,
        width: 1200,
        height: 630,
        alt: "Altmed Medical Center clinic team in Manassas VA"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Altmed Medical Center | Walk-In Clinic in Manassas VA",
    description: "Same-day care and employer health services at 8551 Rixlew Lane in Manassas, VA.",
    images: [legacyAssets.departmentThree]
  }
};

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
  "15+ Years Serving Manassas",
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
    image: legacyAssets.departmentThree,
    body:
      "Most patients are seen the same day, without an appointment. We treat respiratory infections, sprains, lacerations, UTIs, rashes, and over 50 common conditions so you can get care without a three-hour ER wait.",
    stat: "50+ common conditions treated"
  },
  {
    slug: "dot-physical-manassas-va",
    title: "DOT Physicals",
    image: legacyAssets.departmentFive,
    body:
      "Our FMCSA-certified medical examiner conducts CDL physicals, vision and hearing tests, and urinalysis on-site. Most drivers are in and out in under an hour with their medical certificate in hand.",
    stat: "FMCSA-certified examiner"
  },
  {
    slug: "medical-weight-loss-manassas",
    title: "Medical Weight Loss",
    image: legacyAssets.doctorsOverview,
    body:
      "We prescribe FDA-approved semaglutide and tirzepatide injections alongside a coached nutrition plan, not a one-size-fits-all diet sheet. Patients average 10-15% body weight reduction within six months.",
    stat: "10-15% average body weight reduction"
  }
] as const;

const providerBadges = ["MD", "PhD", "Obesity Medicine", "Addiction Medicine", "Pain Management", "Preventive Care"] as const;

const testimonials = [
  {
    quote:
      "I came in without an appointment on a Tuesday morning and was seen within 20 minutes. The doctor actually explained my diagnosis instead of just handing me a prescription.",
    name: "Maria S.",
    city: "Manassas, VA"
  },
  {
    quote:
      "We send our CDL drivers here for DOT physicals. The turnaround is fast, the paperwork is always in order, and the staff is easy to coordinate with.",
    name: "James R.",
    city: "Fleet Manager, Prince William County"
  },
  {
    quote:
      "I'd tried losing weight on my own for years. The semaglutide program here came with actual check-ins, not just a prescription and a goodbye. Down 22 lbs in four months.",
    name: "Tanya P.",
    city: "Gainesville, VA"
  }
] as const;

const serviceAreas = ["Manassas", "Manassas Park", "Gainesville", "Bristow", "Haymarket", "Centreville", "Woodbridge", "Prince William County"] as const;

const homeFaqs = [
  {
    question: "Do I need an appointment, or can I walk in?",
    answer:
      "Walk-ins are welcome Monday through Friday for many urgent care and same-day services. Booking ahead is still helpful for physicals, weight loss consultations, and employer services so we can prepare the right paperwork."
  },
  {
    question: "What insurance does Altmed accept?",
    answer:
      "We accept most major insurances including Aetna, CareFirst, Cigna, and United. Please bring your insurance card and photo ID, and call ahead if you want our team to confirm details before your visit."
  },
  {
    question: "How long does a DOT physical take?",
    answer:
      "Most DOT physicals take about 30 to 60 minutes when you bring the required ID, medication list, and any condition-specific paperwork. If additional records are needed, our team will explain exactly what is missing."
  },
  {
    question: "Does Altmed offer telehealth visits?",
    answer:
      "Yes. Telehealth is available for appropriate follow-up visits, medication discussions, and concerns that do not require an in-person exam or testing."
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Bring a photo ID, insurance card, current medication list, and any relevant medical records or employer forms. DOT drivers should also bring glasses, hearing aids, and clearance documents when applicable."
  },
  {
    question: "Does Altmed treat children as well as adults?",
    answer:
      "Altmed sees families for many common urgent care and primary care needs. If your child has severe symptoms, trouble breathing, major injury, or a medical emergency, go to the nearest ER or call 911."
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

export default async function HomePage() {
  const posts = await getBlogPosts();
  const featuredPosts = posts.slice(0, 3);

  return (
    <main>
      <SchemaOrg schema={buildFaqSchema([...homeFaqs])} />

      <section className="bg-[var(--c-bg)]">
        <div className="container-shell section-pad">
          <div className="grid items-center gap-10 lg:grid-cols-[52fr_48fr]">
            <div>
              <div className="section-label">Manassas, VA · Walk-ins Welcome</div>
              <h1 className="mt-5 max-w-2xl text-[var(--c-text)]">
                Same-Day Care When
                <br />
                You Can&apos;t Wait.
              </h1>
              <p className="mt-6 text-lg leading-8 text-[var(--c-muted)]">
                Urgent care, primary care, DOT physicals, weight loss, and employer health services
                all under one roof at 8551 Rixlew Lane. No referral needed.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={buildBookingUrl("home_hero", "book-appointment") as Route} className="btn-primary">
                  Book Appointment <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={`tel:${clinic.phone}`} className="btn-outline-dark">
                  Call {clinic.phone}
                </a>
              </div>
              <a href={clinic.mapUrl} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[var(--c-text)]">
                <span className="inline-flex text-[var(--c-primary)]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </span>
                Rated 4.8 by 30+ patients on Google
              </a>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-[var(--c-text)]">
                {["Board-Certified Providers", "Walk-Ins Welcome", "Same-Day Availability", "Telehealth Options"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-[var(--c-primary)]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative min-h-[420px] overflow-hidden rounded-b-[80px] bg-white lg:min-h-[580px]">
              <Image
                src={legacyAssets.departmentThree}
                alt="Provider checking blood pressure at Altmed Medical Center in Manassas VA"
                fill
                className="clinic-img object-cover"
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
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
                    Learn more <ArrowRight className="h-4 w-4" />
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
                src={legacyAssets.doctorOne}
                alt="Dr. Gerald K. Lee caring for patients at Altmed Medical Center in Manassas VA"
                fill
                className="clinic-img object-cover"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            </div>
            <div>
              <div className="section-label">Your Care Team</div>
              <h2 className="mt-3">Led by a board-certified physician with 15+ years in Manassas.</h2>
              <p className="mt-5 text-base leading-8 text-[var(--c-muted)]">
                Dr. Gerald K. Lee, MD, PhD, has been caring for patients in Northern Virginia for
                over fifteen years. He is board-certified in Obesity Medicine, Addiction Medicine,
                and Pain Management, disciplines that rarely coexist in a single walk-in clinic.
                His clinical model is built around connecting the dots: treating the condition in
                front of you while addressing the patterns that keep bringing patients back. That&apos;s
                why Altmed offers weight management, addiction recovery, occupational health, and
                urgent care under the same roof.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {providerBadges.map((badge) => (
                  <span key={badge} className="rounded-md bg-[var(--c-surface-tint)] px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[var(--c-primary)]">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--c-surface-tint)]">
        <div className="container-shell section-pad">
          <div className="max-w-3xl">
            <div className="section-label">Patient Stories</div>
            <h2 className="mt-3">Hear from patients and employers across Prince William County.</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-[var(--radius-md)] border border-[var(--c-border)] border-l-4 border-l-[var(--c-primary)] bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--c-surface-tint)] text-sm font-bold text-[var(--c-primary)]">
                  {item.name.split(" ").map((part) => part[0]).join("")}
                </div>
                <p className="mt-5 font-heading text-lg italic leading-8 text-[var(--c-text)]">&ldquo;{item.quote}&rdquo;</p>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--c-muted)]">
                  {item.name} · {item.city}
                </p>
              </article>
            ))}
          </div>
          <a href={clinic.mapUrl} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[var(--c-primary)] hover:underline">
            <Star className="h-4 w-4 fill-current" />
            Based on 30+ Google Reviews
          </a>
        </div>
      </section>

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
