import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildBookingUrl, clinic, legacyAssets, publicRoutes } from "@/lib/site-content";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(10,26,43,0.95)_0%,rgba(11,41,70,0.88)_42%,rgba(12,118,128,0.72)_100%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <Image
          src={legacyAssets.heroClinic}
          alt="Altmed Medical Center clinic exterior in Manassas"
          fill
          className="object-cover opacity-35 mix-blend-screen"
          priority
        />
      </div>
      <div className="container-shell relative grid gap-10 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div className="max-w-3xl">
          <div className="inline-flex rounded-[10px] border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-teal-100">
            Walk-In Clinic Manassas VA
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
            Same-Day Medical Care in Manassas, VA
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Walk-ins welcome. No appointment needed for urgent care. Altmed brings local,
            physician-led care to Northern Virginia with urgent care, primary care, DOT
            physicals, weight loss support, and addiction treatment under one roof.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={buildBookingUrl("hero", "homepage")}
              className="rounded-[12px] bg-white px-6 py-3 font-semibold text-slate-950"
            >
              Book Appointment
            </a>
            <a
              href={`tel:${clinic.phone}`}
              className="rounded-[12px] border border-white/30 px-6 py-3 font-semibold"
            >
              Call {clinic.phone}
            </a>
            <Link
              href={publicRoutes.service("telehealth") as Route}
              className="rounded-[12px] border border-white/30 px-6 py-3 font-semibold"
            >
              Telehealth Available
            </Link>
          </div>
          <div className="mt-8 grid max-w-3xl gap-3 text-sm text-slate-100 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[12px] border border-white/10 bg-white/10 px-4 py-3">Board-Certified Physician</div>
            <div className="rounded-[12px] border border-white/10 bg-white/10 px-4 py-3">Walk-Ins Welcome</div>
            <div className="rounded-[12px] border border-white/10 bg-white/10 px-4 py-3">Occupational Health</div>
            <div className="rounded-[12px] border border-white/10 bg-white/10 px-4 py-3">Telehealth Available</div>
          </div>
        </div>
        <div className="lg:pl-8">
          <div className="relative overflow-hidden rounded-[14px] border border-white/10 bg-white/10 p-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[12px]">
              <Image
                src={legacyAssets.heroDoctor}
                alt="Professional healthcare hero image"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="relative mt-4 grid gap-3 rounded-[12px] bg-white/95 p-5 text-slate-900">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Trusted Local Care
              </div>
              <p className="text-sm leading-7 text-neutral-700">
                Convenient access near Bull Run Plaza with fast scheduling, same-day care, and
                a wider service mix than a typical urgent care chain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
