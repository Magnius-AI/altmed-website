import type { Metadata } from "next";
import Image from "next/image";
import { Award, HeartHandshake, ShieldCheck } from "lucide-react";
import { getProviders } from "@/lib/api";
import { clinic, legacyAssets } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About Altmed Medical Center | Medical Clinic Manassas VA",
  description:
    "Learn about Altmed Medical Center in Manassas, VA, including Dr. Gerald K. Lee, the care team, clinic services, and local patient-focused approach.",
  alternates: {
    canonical: "/about-us"
  },
  openGraph: {
    title: "About Altmed Medical Center | Manassas, VA",
    description:
      "Meet the Altmed Medical Center team and learn how the clinic supports patients, families, employers, and drivers in Manassas."
  }
};

const highlights = [
  {
    icon: HeartHandshake,
    title: "Community-centered care",
    body: "Altmed was built to serve local families, working adults, commercial drivers, and employers who want a clinic that feels personal and practical."
  },
  {
    icon: ShieldCheck,
    title: "Clinical breadth",
    body: "Urgent care, primary care, occupational health, DOT physicals, telehealth, weight management, and addiction medicine all sit under one roof."
  },
  {
    icon: Award,
    title: "Evidence-based leadership",
    body: "Dr. Gerald K. Lee brings advanced training in obesity medicine, addiction medicine, pain management, epidemiology, and biostatistics."
  }
];

export default async function AboutPage() {
  const providers = await getProviders();

  return (
    <main className="bg-[var(--color-bg-white)]">
      <section className="container-shell section-pad">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <div className="inline-flex rounded-[10px] bg-[var(--color-bg-gray)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
              About Us
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl md:text-[3.35rem]">
              Local medical care that blends same-day access with long-term support.
            </h1>
            <p className="mt-6 text-[1.03rem] leading-8 text-[var(--color-text-muted)]">
              Altmed Medical Center serves {clinic.address} with a wider mix of services than a
              typical walk-in clinic. The legacy site positioned Altmed as both a family-facing
              medical practice and a dependable occupational health partner, and this version of
              the site keeps both of those strengths front and center.
            </p>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[16px] border border-[rgba(18,52,77,0.08)]">
            <Image src={legacyAssets.aboutPhoto} alt="Altmed Medical Center exterior" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-gray)]">
        <div className="container-shell section-pad">
          <div className="grid gap-6 lg:grid-cols-3">
            {highlights.map((item) => (
              <article key={item.title} className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-7">
                <item.icon className="h-8 w-8 text-[var(--color-primary)]" />
                <h2 className="mt-5 text-2xl">{item.title}</h2>
                <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="mission" className="container-shell section-pad scroll-mt-28">
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[420px] overflow-hidden rounded-[16px] border border-[rgba(18,52,77,0.08)]">
            <Image src={legacyAssets.aboutTeam} alt="Altmed team" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-3xl md:text-[2.6rem]">What patients and employer clients can expect</h2>
            <p className="mt-5 text-[1.03rem] leading-8 text-[var(--color-text-muted)]">
              The older content repeatedly emphasized convenience, affordability, employer support,
              and plainspoken medical guidance. We preserved those themes while simplifying the
              wording and organizing them into a clearer story for the new app.
            </p>
            <div className="mt-8 grid gap-4">
              {[
                "Walk-in urgent care for non-emergency illness and injury",
                "Preventive and chronic-condition primary care for all ages",
                "DOT physicals, drug testing, work injury follow-up, and business accounts",
                "Physician-guided weight loss, telehealth, and confidential addiction treatment"
              ].map((point) => (
                <div key={point} className="rounded-[12px] border border-[rgba(44,44,44,0.08)] bg-white px-5 py-4 text-[1.03rem] leading-7 text-[var(--color-text-dark)]">
                  {point}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/services" className="btn-outline-dark">Browse Services</a>
              <a href="/faq" className="btn-outline-dark">Read FAQs</a>
              <a href="/contact-us" className="btn-outline-dark">Contact Us</a>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="bg-[var(--color-bg-gray)] scroll-mt-28">
        <div className="container-shell section-pad">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-[2.6rem]">Meet the care team</h2>
            <p className="mt-5 text-[1.03rem] text-[var(--color-text-muted)]">
              Provider content now has a cleaner presentation while keeping the clinic leadership
              and credential details visible.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {providers.map((provider) => (
              <article key={provider.id} className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-7">
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                  <Image src={provider.photo || legacyAssets.doctorOne} alt={provider.name} fill className="object-cover" />
                </div>
                <h3 className="mt-5 text-2xl">{provider.name}</h3>
                <p className="mt-2 text-sm font-semibold text-[var(--color-primary)]">
                  {[provider.credentials, provider.title].filter(Boolean).join(" • ")}
                </p>
                <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">
                  {provider.personalNote || provider.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
