import type { Metadata } from "next";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarRange, Clock3, MapPin, ShieldCheck, Star } from "lucide-react";
import { BlogCard } from "@/components/public/BlogCard";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { getBlogPosts, getFaqs } from "@/lib/api";
import { buildBookingUrl, clinic, legacyAssets, publicRoutes, serviceCards } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Walk-In Clinic Manassas VA | Urgent & Primary Care | Altmed",
  description:
    "Walk-in clinic in Manassas, VA for urgent care, primary care, occupational health, DOT physicals, medical weight loss, telehealth, and employer services.",
  keywords: [
    "walk in clinic Manassas VA",
    "urgent care Manassas VA",
    "primary care Manassas VA",
    "occupational health Manassas",
    "DOT physical Manassas",
    "medical weight loss Manassas"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Walk-In Clinic Manassas VA | Altmed Medical Center",
    description:
      "Same-day urgent care, primary care, occupational health, DOT physicals, telehealth, and physician-guided weight loss in Manassas.",
    url: clinic.canonicalUrl
  }
};

const slices = [
  {
    title: "Manassas walk-in care that feels calm, local, and actually helpful",
    body:
      "Patients come to Altmed for the same-day access they need, but they stay because the experience feels more personal than a large urgent care chain. We treat everyday illnesses, mild injuries, infections, rashes, and time-sensitive concerns without turning the visit into a maze.",
    image: legacyAssets.heroClinic,
    href: publicRoutes.service("urgent-care-manassas-va"),
    label: "Explore urgent care"
  },
  {
    title: "Primary care that stays connected after the urgent visit is over",
    body:
      "The legacy site emphasized that Altmed is more than a quick-stop clinic. We kept that direction and made it clearer: annual physicals, chronic disease follow-up, preventive care, and family medicine all live here too, so patients can build a longer-term relationship instead of starting over somewhere else.",
    image: legacyAssets.departmentThree,
    href: publicRoutes.service("primary-care-manassas-va"),
    label: "See primary care"
  },
  {
    title: "Occupational health built around employers, drivers, and workplace compliance",
    body:
      "DOT physicals, drug and alcohol testing, work injury follow-up, vaccinations, lab services, and return-to-work documentation remain a core part of Altmed's identity. We preserved that business-facing content and organized it into a cleaner service structure for employers across Prince William County.",
    image: legacyAssets.heroBackdrop,
    href: publicRoutes.service("occupational-health-clinic-manassas"),
    label: "View employer services"
  }
];

const featureCards = [
  {
    title: "Same-day access",
    body: "Walk-ins are welcome for urgent care, with online booking available for services that benefit from a scheduled visit."
  },
  {
    title: "Board-certified leadership",
    body: "Dr. Gerald K. Lee leads programs spanning obesity medicine, addiction medicine, pain management, and preventive care."
  },
  {
    title: "One connected clinic",
    body: "Urgent care, primary care, weight loss, occupational health, telehealth, and employer support are designed to work together."
  }
];

const quickActions = [
  {
    title: "Find the right service",
    body: "Start with urgent care, primary care, telehealth, or employer services without hunting through the whole site.",
    href: publicRoutes.services,
    label: "Browse services"
  },
  {
    title: "Book or call quickly",
    body: "Use the booking flow, tap to call the clinic, or get local directions near Rixlew Lane.",
    href: buildBookingUrl("home", "quick-book"),
    label: "Book appointment"
  },
  {
    title: "Get forms and answers",
    body: "Patient forms, telehealth consent, FAQs, and service details are all easier to reach from one place.",
    href: publicRoutes.forms,
    label: "Open resources"
  }
] as const;

const testimonials = [
  {
    name: "Maria S.",
    location: "Manassas, VA",
    quote:
      "The visit felt organized and personal. We got same-day care, clear answers, and follow-up instructions that actually made sense.",
    image: "/legacy-assets/testimonials/testimonial-1.jpg"
  },
  {
    name: "James R.",
    location: "Prince William County",
    quote:
      "We use Altmed for DOT physicals and workplace testing because the team is responsive and easy for our employees to work with.",
    image: "/legacy-assets/doctors/doctors-2.jpg"
  },
  {
    name: "Tanya P.",
    location: "Gainesville, VA",
    quote:
      "The weight-loss program felt medically supervised instead of generic. I appreciated the realistic plan and regular check-ins.",
    image: "/legacy-assets/doctors/doc-2.jpg"
  }
];

const trustLogos = ["FMCSA", "DOT Programs", "Employer Accounts", "Telehealth", "Patient Forms", "Local Primary Care"];

export default async function HomePage() {
  const [posts, faqGroups] = await Promise.all([getBlogPosts(), getFaqs()]);
  const featuredPosts = posts.slice(0, 3);
  const homeFaqs = Object.entries(faqGroups)
    .flatMap(([category, items]) =>
      items.slice(0, 2).map((item) => ({
        ...item,
        category
      }))
    )
    .slice(0, 6);

  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={legacyAssets.heroClinic}
            alt="Altmed Medical Center in Manassas"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,30,26,0.84)_0%,rgba(30,30,26,0.68)_42%,rgba(30,30,26,0.34)_100%)]" />
        </div>

        <div className="container-shell relative section-pad">
          <div className="max-w-3xl py-10">
            <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Walk-In Clinic, Urgent Care, and Specialty Services in Manassas
            </div>
            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.08] text-white md:text-6xl">
              Your trusted walk-in clinic in Manassas for same-day care, long-term support, and employer services.
            </h1>
            <p className="mt-6 text-lg leading-8 text-white">
              Altmed Medical Center brings together urgent care, primary care, occupational health,
              DOT physicals, weight management, telehealth, and confidential addiction support in
              one local clinic just off Rixlew Lane for patients across Manassas, Sudley,
              Gainesville, Bristow, and Prince William County, with clear pathways to{" "}
              <Link href={publicRoutes.about as Route} className="underline underline-offset-4">About Us</Link>,{" "}
              <Link href={publicRoutes.contact as Route} className="underline underline-offset-4">Contact Us</Link>, and the most common{" "}
              <Link href={publicRoutes.faq as Route} className="underline underline-offset-4">patient questions</Link>.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={buildBookingUrl("home_hero", "book-appointment") as Route} className="btn-primary">
                Book Appointment
              </Link>
              <Link href={publicRoutes.services as Route} className="btn-secondary">
                Explore Services
              </Link>
              <a href={`tel:${clinic.phone}`} className="btn-secondary">
                Call {clinic.phone}
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-white">
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                Monday to Friday, 9 AM to 5 PM
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <a href={clinic.mapUrl} className="underline underline-offset-4">
                  8551 Rixlew Lane, Suite 140, Manassas, VA
                </a>
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarRange className="h-4 w-4" />
                Walk-ins welcome
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10 bg-transparent">
        <div className="container-shell">
          <div className="grid gap-5 md:grid-cols-3">
            {quickActions.map((item) => (
              <Link
                key={item.title}
                href={item.href as Route}
                className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-7 transition hover:-translate-y-1"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
                  Quick action
                </div>
                <h2 className="mt-3 text-[30px] leading-[1.12]">{item.title}</h2>
                <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{item.body}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-text-dark)] underline-offset-4 hover:underline">
                  {item.label}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {slices.map((slice, index) => (
        <section
          key={slice.title}
          className={index % 2 === 0 ? "bg-[var(--color-bg-white)]" : "bg-[var(--color-bg-gray)]"}
        >
          <div className="container-shell py-24 md:py-28">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className={index % 2 === 0 ? "" : "lg:order-2"}>
                <div className="relative min-h-[390px] overflow-hidden rounded-[14px] border border-[rgba(18,52,77,0.08)]">
                  <Image src={slice.image} alt={slice.title} fill className="object-cover" />
                </div>
              </div>
              <div className={index % 2 === 0 ? "" : "lg:order-1"}>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
                  {index === 0 ? "Walk-in care" : index === 1 ? "Primary care" : "Employer services"}
                </div>
                <h2 className="mt-3 max-w-xl text-3xl md:text-[2.6rem]">{slice.title}</h2>
                <p className="mt-5 text-[1.03rem] leading-8 text-[var(--color-text-muted)]">{slice.body}</p>
                <Link
                  href={slice.href as Route}
                  className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline"
                >
                  {slice.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-[var(--color-bg-white)]">
        <div className="container-shell py-24 md:py-28">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-[2.6rem]">Care built around clarity, speed, and practical next steps</h2>
            <p className="mt-5 text-[1.03rem] leading-8 text-[var(--color-text-muted)]">
              The redesign keeps Altmed&apos;s local, multi-service identity intact while making the
              site easier to scan for patients, employers, and new visitors coming from search.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featureCards.map((card) => (
              <article key={card.title} className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-8">
                <ShieldCheck className="h-8 w-8 text-[var(--color-primary)]" />
                <h3 className="mt-5 text-[30px] leading-[1.14]">{card.title}</h3>
                <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-gray)]">
        <div className="container-shell py-24 md:py-28">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl md:text-[2.6rem]">Browse every service</h2>
              <p className="mt-4 text-[1.03rem] text-[var(--color-text-muted)]">
                Fast links to the legacy service topics now organized into the new app.
              </p>
            </div>
            <Link href={publicRoutes.services as Route} className="btn-outline-dark text-sm">
              View all service pages
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            {serviceCards.map((service) => (
              <Link key={service.slug} href={publicRoutes.service(service.slug) as Route} className="pill-tag px-5 py-3">
                {service.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-white)]">
        <div className="container-shell py-24 md:py-28">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-[2.6rem]">Patients and employers keep coming back for the same reason</h2>
            <p className="mt-5 text-[1.03rem] text-[var(--color-text-muted)]">
              Local care works better when the clinic is easy to reach, easy to understand, and
              consistent from one visit to the next.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-8">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex gap-1 text-[var(--color-accent)]">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star key={starIndex} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-[var(--color-text-dark)]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)]">{testimonial.location}</p>
                  </div>
                </div>
                <p className="mt-6 text-base leading-8 text-[var(--color-text-muted)]">&ldquo;{testimonial.quote}&rdquo;</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-gray)]">
        <div className="container-shell py-24 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
                FAQ
              </div>
              <h2 className="mt-3 text-3xl md:text-[2.6rem]">Common questions, answered clearly</h2>
              <p className="mt-5 text-[1.03rem] leading-8 text-[var(--color-text-muted)]">
                This section is pulled from the admin-managed FAQ library so patients and employer
                clients can quickly skim the answers people ask most often.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={publicRoutes.faq as Route} className="btn-primary">
                  Visit FAQ Page
                </Link>
                <Link href={publicRoutes.contact as Route} className="btn-outline-dark">
                  Contact Us
                </Link>
              </div>
              <div className="mt-8 grid gap-3 text-[1rem] leading-7 text-[var(--color-text-dark)]">
                <Link href={publicRoutes.services as Route} className="hover-link">
                  Browse services before your visit
                </Link>
                <Link href={publicRoutes.forms as Route} className="hover-link">
                  Open patient forms and telehealth consent
                </Link>
                <Link href={publicRoutes.blog as Route} className="hover-link">
                  Read health blog articles
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <FAQAccordion items={homeFaqs} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(44,44,44,0.08)] bg-[var(--color-bg-gray)]">
        <div className="container-shell py-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {trustLogos.map((logo) => (
              <div
                key={logo}
                className="flex min-h-[72px] items-center justify-center rounded-[10px] border border-[rgba(44,44,44,0.08)] bg-white px-4 text-center text-sm font-semibold uppercase tracking-[0.16em] text-[rgba(44,44,44,0.46)]"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-white)]">
        <div className="container-shell py-24 md:py-28">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl md:text-[2.6rem]">Latest health articles</h2>
              <p className="mt-4 text-[1.03rem] text-[var(--color-text-muted)]">
                Legacy blog topics preserved and presented as cleaner, more useful reading paths.
              </p>
            </div>
            <Link href={publicRoutes.blog as Route} className="btn-outline-dark text-sm">
              Visit the blog
            </Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-footer-bg)] text-white">
        <div className="container-shell py-10">
          <div className="flex flex-col gap-6 rounded-[14px] border border-white/10 bg-white/5 px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div>
              <h2 className="text-3xl text-white md:text-4xl">Stay connected with clinic updates and health tips</h2>
              <p className="mt-3 max-w-2xl text-white/72">
                Get occasional updates about new services, seasonal care reminders, and local
                wellness articles from Altmed Medical Center.
              </p>
            </div>
            <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row" action={publicRoutes.contact}>
              <input
                type="email"
                placeholder="Enter your email"
                className="min-h-[54px] flex-1 rounded-[12px] border border-white/16 bg-white px-5 text-[var(--color-text-dark)] outline-none"
              />
              <button type="submit" className="rounded-[12px] bg-[var(--color-accent)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--color-accent-dark)]">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
