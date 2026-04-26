"use client";

import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Baby,
  Bone,
  Brain,
  Eye,
  FlaskConical,
  Heart,
  Scan,
  Shield,
  Smile,
  Stethoscope,
  UserCheck
} from "lucide-react";
import { publicRoutes, serviceCards } from "@/lib/site-content";

const icons = [
  Stethoscope,
  Baby,
  Bone,
  Brain,
  Heart,
  Eye,
  Smile,
  Scan,
  FlaskConical,
  Activity,
  Shield,
  UserCheck,
  Shield
];

function ServiceTile({
  title,
  description,
  image,
  href,
  badge,
  Icon
}: {
  title: string;
  description: string;
  image: string;
  href: string;
  badge: string;
  Icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href as Route}
      className="group overflow-hidden rounded-[14px] border border-slate-200 bg-white transition duration-200 hover:border-primary/30"
    >
      <div className="relative h-44 border-b border-slate-200 bg-slate-50">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09131b]/45 via-transparent to-transparent" />
        <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-[12px] border border-white/60 bg-white/90">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      <div className="p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
          {badge}
        </div>
        <h3 className="mt-3 text-xl font-semibold text-neutral-900">{title}</h3>
        <p className="mt-3 text-base leading-7 text-neutral-600">{description}</p>
        <span className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
          Learn More →
        </span>
      </div>
    </Link>
  );
}

export function HomeServicesShowcase() {
  const [expanded, setExpanded] = useState(false);
  const visibleCards = useMemo(() => serviceCards.slice(0, 6), []);
  const hiddenCards = useMemo(() => serviceCards.slice(6), []);

  return (
    <section className="container-shell py-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="inline-flex rounded-full border border-primary/15 bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Core Services
          </div>
          <h2 className="mt-5 text-4xl font-semibold text-neutral-900">
            Everything Your Family & Business Needs — Under One Roof
          </h2>
          <p className="mt-4 text-lg text-neutral-700">
            From urgent visits to preventive care, DOT exams, and employer programs, Altmed is
            built to feel more coordinated, more informative, and easier to trust.
          </p>
        </div>
        <Link
          href={publicRoutes.services as Route}
          className="focus-ring inline-flex rounded-[12px] border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-800"
        >
          View All Services
        </Link>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibleCards.map((service, index) => {
          const Icon = icons[index];
          return (
            <ServiceTile
              key={service.slug}
              title={service.title}
              description={service.description}
              image={service.image}
              href={publicRoutes.service(service.slug)}
              badge={service.shortDescription}
              Icon={Icon}
            />
          );
        })}
      </div>

      <div
        className="overflow-hidden transition-[max-height] duration-500"
        style={{ maxHeight: expanded ? "1040px" : "0px" }}
      >
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {hiddenCards.map((service, index) => {
            const Icon = icons[index + 6];
            return (
              <ServiceTile
                key={service.slug}
                title={service.title}
                description={service.description}
                image={service.image}
                href={publicRoutes.service(service.slug)}
                badge={service.shortDescription}
                Icon={Icon}
              />
            );
          })}
        </div>
      </div>

      <button
        className="focus-ring mt-8 rounded-[12px] border border-primary px-5 py-3 text-sm font-semibold text-primary"
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? "Show Less" : "See More Services"}
      </button>
    </section>
  );
}
