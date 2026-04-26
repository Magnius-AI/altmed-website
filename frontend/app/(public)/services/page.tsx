import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { serviceCards, publicRoutes } from "@/lib/site-content";

export default function ServicesPage() {
  return (
    <main className="bg-[var(--color-bg-white)]">
      <section className="container-shell section-pad">
        <div className="max-w-4xl">
          <div className="inline-flex rounded-full bg-[var(--color-bg-gray)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
            Services
          </div>
          <h1 className="mt-6 text-4xl md:text-[3.35rem]">
            Urgent care, primary care, occupational medicine, and specialty support under one roof.
          </h1>
          <p className="mt-6 text-[1.03rem] leading-8 text-[var(--color-text-muted)]">
            The old site had strong service depth but a busy structure. This version keeps those
            routes and topics intact while making them easier to scan, compare, and navigate.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {serviceCards.map((service) => (
            <Link key={service.slug} href={publicRoutes.service(service.slug) as Route} className="pill-tag">
              {service.title}
            </Link>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {serviceCards.map((service) => (
            <Link
              key={service.slug}
              href={publicRoutes.service(service.slug) as Route}
              className="overflow-hidden rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white"
            >
              <div className="relative h-52">
                <Image src={service.image} alt={service.title} fill className="object-cover" />
              </div>
              <div className="p-7">
                <h2 className="text-2xl">{service.title}</h2>
                <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)]">{service.description}</p>
                <span className="mt-5 inline-flex text-sm font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline">
                  Read service page
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
