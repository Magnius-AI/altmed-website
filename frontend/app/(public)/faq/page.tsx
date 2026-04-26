import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { SchemaOrg } from "@/components/public/SchemaOrg";
import { FaqItem, getFaqSchema, getFaqs } from "@/lib/api";
import { buildBookingUrl, publicRoutes } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "FAQs | Altmed Medical Center in Manassas, VA",
  description:
    "Read frequently asked questions about Altmed Medical Center, including urgent care, appointments, occupational health, insurance, and services in Manassas, Virginia."
};

export default async function FaqPage() {
  const [faqs, schema] = await Promise.all([getFaqs(), getFaqSchema()]);
  const categories = Object.keys(faqs);
  const categoryId = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <main className="bg-[var(--color-bg-white)]">
      <SchemaOrg schema={schema} />
      <section className="container-shell section-pad">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <div>
            <div className="inline-flex rounded-[10px] bg-[#eef4fb] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Common Questions
            </div>
            <h1 className="mt-5 text-4xl md:text-[3.35rem]">Frequently Asked Questions</h1>
            <p className="mt-5 text-[1.03rem] leading-8 text-neutral-700">
              These answers come directly from the FAQ manager in the admin dashboard, so the
              public page stays aligned with the latest clinic information for patients, families,
              drivers, and employer clients.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={buildBookingUrl("faq_page", "book-appointment") as Route} className="btn-primary">
                Book Appointment
              </Link>
              <Link href={publicRoutes.contact as Route} className="btn-outline-dark">
                Contact Us
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <a key={category} href={`#${categoryId(category)}`} className="pill-tag">
                  {category}
                </a>
              ))}
            </div>
          </div>

          <aside className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-[var(--color-bg-gray)] p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
              Helpful next steps
            </div>
            <div className="mt-4 grid gap-3 text-[1rem] leading-7 text-[var(--color-text-dark)]">
              <Link href={publicRoutes.services as Route} className="hover-link">
                Browse services
              </Link>
              <Link href={publicRoutes.forms as Route} className="hover-link">
                Patient forms and telehealth consent
              </Link>
              <Link href={publicRoutes.about as Route} className="hover-link">
                Learn more about Altmed Medical Center
              </Link>
              <Link href={publicRoutes.blog as Route} className="hover-link">
                Read health articles
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-[rgba(18,52,77,0.08)] bg-[var(--color-bg-gray)]">
        <div className="container-shell py-16">
          <div className="grid gap-10">
            {Object.entries(faqs).map(([category, items]) => (
              <section key={category} id={categoryId(category)} className="scroll-mt-28">
                <h2 className="mb-5 text-[1.9rem] md:text-[2.35rem] text-neutral-900">{category}</h2>
                <FAQAccordion items={items as FaqItem[]} />
              </section>
            ))}
          </div>
          <div className="mt-12 rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white px-6 py-5 text-base leading-7 text-neutral-700">
            For personalized medical guidance, please <Link href={buildBookingUrl("faq_disclaimer", "book-appointment") as Route} className="text-[var(--color-primary)] underline-offset-4 hover:underline">book a visit</Link> or <Link href={publicRoutes.contact as Route} className="text-[var(--color-primary)] underline-offset-4 hover:underline">contact our team</Link> rather than relying only on website information.
          </div>
        </div>
      </section>
    </main>
  );
}
