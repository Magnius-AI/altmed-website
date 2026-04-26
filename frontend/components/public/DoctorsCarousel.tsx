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
    <section className="container-shell py-20">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-semibold text-neutral-900">Meet the Altmed Care Team</h2>
          <p className="mt-4 max-w-2xl text-lg text-neutral-700">
            The original site leaned heavily on provider trust. We kept that emphasis and presented
            the team in a cleaner, more modern format.
          </p>
        </div>
        <div className="hidden gap-3 md:flex">
          <button className="focus-ring rounded-full border border-slate-200 p-3" onClick={() => scroll("left")}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="focus-ring rounded-full border border-slate-200 p-3" onClick={() => scroll("right")}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div ref={scrollerRef} className="mt-8 flex snap-x gap-5 overflow-x-auto pb-2">
        {cards.map((doctor) => (
          <article key={doctor.name} className="min-w-[280px] snap-start rounded-xl border border-slate-200 bg-white p-6">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border border-slate-200">
              <Image src={doctor.image} alt={doctor.name} fill className="object-cover" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-neutral-900">{doctor.name}</h3>
            <p className="mt-1 text-sm text-primary">{doctor.specialty}</p>
            <p className="mt-3 text-sm text-neutral-400">{doctor.experience}</p>
            <a href={buildBookingUrl("doctor_card", doctor.name.toLowerCase().replace(/\s+/g, "-"))} className="mt-5 inline-block text-sm font-semibold text-primary">
              {doctor.cta} →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
