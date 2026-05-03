"use client";

import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Provider } from "@/lib/api";
import { buildBookingUrl, featuredDoctors } from "@/lib/site-content";

type Props = {
  providers?: Provider[];
};

export function DoctorsCarousel({ providers }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cards =
    providers?.length
      ? providers.map((provider) => ({
          name: provider.name,
          image: provider.photo || "/legacy-assets/doctors/doc-1.png",
          specialty: [provider.credentials, provider.title].filter(Boolean).join(" • "),
          experience: provider.personalNote || provider.bio || "Altmed Medical Center",
          cta: "Book with this provider"
        }))
      : featuredDoctors;

  const scroll = (direction: "left" | "right") => {
    scrollerRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth"
    });
  };

  return (
    <section className="bg-[var(--color-surface-alt)]">
      <div className="container-shell py-16 md:py-24">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="section-label">Provider expertise</div>
          <h2 className="mt-3 text-4xl font-semibold text-[var(--color-text-primary)]">Meet the Altmed Care Team</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            The original site leaned heavily on provider trust. We kept that emphasis and presented
            the team in a cleaner, more modern format.
          </p>
        </div>
        <div className="hidden gap-3 md:flex">
          <button className="focus-ring rounded-md border border-[var(--color-border)] bg-white p-3" onClick={() => scroll("left")}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="focus-ring rounded-md border border-[var(--color-border)] bg-white p-3" onClick={() => scroll("right")}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div ref={scrollerRef} className="mt-8 flex snap-x gap-5 overflow-x-auto pb-2">
        {cards.map((doctor) => (
          <article key={doctor.name} className="grid min-w-[300px] snap-start gap-5 rounded-lg border border-[var(--color-border)] bg-white p-5 md:min-w-[520px] md:grid-cols-[160px_1fr]">
            <div className="relative min-h-[190px] overflow-hidden rounded-lg border border-[var(--color-border)]">
              <Image src={doctor.image} alt={doctor.name} fill className="site-photo object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">{doctor.name}</h3>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">{doctor.specialty}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["MD", "PhD", "Board Certified"].map((badge) => (
                  <span key={badge} className="rounded-full bg-[var(--color-surface-alt)] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">
                    {badge}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-secondary)]">{doctor.experience}</p>
              <a href={buildBookingUrl("doctor_card", doctor.name.toLowerCase().replace(/\s+/g, "-"))} className="mt-5 inline-block text-sm font-semibold text-[var(--color-primary)]">
                {doctor.cta} →
              </a>
            </div>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
