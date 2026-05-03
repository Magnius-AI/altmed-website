"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, ChevronDown, ChevronUp, MapPin, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { buildBookingUrl, clinic, legacyAssets, publicRoutes, serviceCards, type NavigationMenuItem } from "@/lib/site-content";

type Props = {
  menu: NavigationMenuItem[];
  showTreatmentPlans?: boolean;
};

const patientServiceSlugs = new Set([
  "urgent-care-manassas-va",
  "primary-care-manassas-va",
  "medical-weight-loss-manassas",
  "telehealth-manassas",
  "suboxone-treatment-manassas",
  "functional-medicine-manassas"
]);

const employerServiceSlugs = new Set([
  "dot-physical-manassas-va",
  "occupational-health-clinic-manassas",
  "occupational-health/drug-alcohol-testing-manassas",
  "occupational-health/workers-compensation-injury-care-manassas",
  "third-party-administrator-service-manassas",
  "mro-services-manassas"
]);

const infoLinks = [
  { href: publicRoutes.faq, label: "FAQ" },
  { href: publicRoutes.forms, label: "Patient Forms" },
  { href: publicRoutes.blog, label: "Health Blog" },
  { href: "/plans", label: "Treatment Plans" }
] as const;

export function Navbar({ menu, showTreatmentPlans = true }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const infoMenuRef = useRef<HTMLDivElement>(null);
  const patientServices = serviceCards.filter((service) => patientServiceSlugs.has(service.slug));
  const employerServices = serviceCards.filter((service) => employerServiceSlugs.has(service.slug));
  const serviceGroups = [
    { label: "Patient Services", services: patientServices },
    { label: "Employer Services", services: employerServices }
  ];

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 12);
      setScrollProgress(scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!servicesOpen && !infoOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!servicesMenuRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
      if (!infoMenuRef.current?.contains(event.target as Node)) {
        setInfoOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setInfoOpen(false);
      }
    };
    const onResize = () => {
      setServicesOpen(false);
      setInfoOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [infoOpen, servicesOpen]);

  return (
    <header className="sticky top-0 z-40">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <div className="hidden bg-[var(--color-primary)] text-white lg:block">
        <div className="container-shell flex h-10 items-center justify-between gap-6 text-sm">
          <div className="flex flex-wrap items-center gap-4 text-white/95">
            <span>Mon - Fri · 9 AM - 5 PM · Walk-ins Welcome</span>
          </div>
          <div className="flex items-center gap-3">
            <a href={`tel:${clinic.phone}`} className="focus-ring inline-flex items-center gap-2 font-semibold text-white transition hover:text-white/82">
              <Phone className="h-4 w-4" />
              {clinic.phone}
            </a>
            <a href={clinic.mapUrl} className="focus-ring inline-flex items-center gap-2 font-semibold text-white transition hover:text-white/82">
              <MapPin className="h-4 w-4" />
              Get Directions
            </a>
          </div>
        </div>
      </div>

      <div
        className={`border-b transition-all duration-200 ${
          scrolled
            ? "border-[var(--color-border)] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)]"
            : "border-[var(--color-border)] bg-white"
        }`}
      >
        <div className="container-shell grid h-[78px] grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[auto_1fr_auto] lg:gap-8">
          <Link href="/" className="focus-ring inline-flex items-center" aria-label="Altmed home">
            <Image
              src={legacyAssets.logo}
              alt="Altmed Medical Center"
              width={68}
              height={68}
              className="h-14 w-24 object-cover"
              priority
            />
          </Link>

          <nav className="hidden items-center justify-center gap-7 lg:flex">
            <div ref={servicesMenuRef} className="relative">
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => {
                  setServicesOpen((value) => !value);
                  setInfoOpen(false);
                }}
                className={`nav-link focus-ring inline-flex cursor-pointer list-none items-center gap-1 px-1.5 py-1 text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] ${pathname?.startsWith("/services") ? "nav-link-active text-[var(--color-primary)]" : ""}`}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                role="menu"
                className={`absolute left-1/2 top-full z-50 mt-5 max-h-[min(72vh,680px)] w-[min(920px,calc(100vw-2rem))] -translate-x-1/2 overflow-y-auto rounded-b-xl border border-t border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[0_16px_48px_rgba(0,0,0,0.10)] ${
                  servicesOpen ? "block" : "hidden"
                }`}
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  {serviceGroups.map(({ label, services }) => (
                    <div key={label} className="p-1">
                      <div className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-primary)]">
                        {label.replace(" Services", " Services").toUpperCase()}
                      </div>
                      <div className="mt-3 grid gap-2">
                        {services.map((service) => (
                          <Link
                            key={service.slug}
                            href={publicRoutes.service(service.slug) as Route}
                            onClick={() => setServicesOpen(false)}
                            role="menuitem"
                            className="focus-ring border-l-[3px] border-l-transparent px-3 py-2.5 text-sm text-[var(--color-text-secondary)] transition hover:border-l-[var(--color-primary)] hover:bg-[var(--color-surface-alt)]"
                          >
                            <span className="block font-semibold text-[var(--color-text-primary)]">{service.title}</span>
                            <span className="mt-1 block text-xs leading-5">{service.shortDescription}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-4 border-t border-[var(--color-border)] pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    href={publicRoutes.services as Route}
                    onClick={() => setServicesOpen(false)}
                    className="focus-ring inline-flex items-center text-sm font-bold text-[var(--color-primary)] hover:underline"
                  >
                    Not sure? Browse all services
                  </Link>
                  <Link href={buildBookingUrl("nav_mega", "book-appointment") as Route} className="btn-primary">
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href={publicRoutes.service("occupational-health-clinic-manassas") as Route}
              className={`nav-link focus-ring px-1.5 py-1 text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] ${pathname?.includes("occupational-health") ? "nav-link-active text-[var(--color-primary)]" : ""}`}
            >
              For Employers
            </Link>
            <Link
              href={publicRoutes.telehealth as Route}
              className={`nav-link focus-ring px-1.5 py-1 text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] ${pathname === publicRoutes.telehealth ? "nav-link-active text-[var(--color-primary)]" : ""}`}
            >
              Telehealth
            </Link>
            <div ref={infoMenuRef} className="relative">
              <button
                type="button"
                aria-expanded={infoOpen}
                aria-haspopup="true"
                onClick={() => {
                  setInfoOpen((value) => !value);
                  setServicesOpen(false);
                }}
                className={`nav-link focus-ring inline-flex cursor-pointer items-center gap-1 px-1.5 py-1 text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-primary)] ${["/faq", "/health-blogs", "/patient-forms"].some((href) => pathname?.startsWith(href)) ? "nav-link-active text-[var(--color-primary)]" : ""}`}
              >
                Resources
                <ChevronDown className={`h-4 w-4 transition ${infoOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                role="menu"
                className={`absolute left-1/2 top-full z-50 mt-5 w-64 -translate-x-1/2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[0_18px_46px_rgba(28,43,39,0.14)] ${
                  infoOpen ? "block" : "hidden"
                }`}
              >
                {infoLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href as Route}
                    onClick={() => setInfoOpen(false)}
                    role="menuitem"
                    className="focus-ring block rounded-md px-3 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-primary)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="hidden items-center justify-end gap-4 lg:flex">
            <Link
              href={buildBookingUrl("nav", "book-appointment") as Route}
              className="btn-primary min-w-[168px] justify-center px-6"
            >
              Book Appointment
            </Link>
          </div>

          <button
            type="button"
            className="focus-ring ml-auto inline-flex h-12 w-12 items-center justify-center rounded-[10px] border border-[color:rgba(44,44,44,0.12)] bg-white lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className={`fixed inset-0 z-50 lg:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <button
          type="button"
          className={`absolute inset-0 bg-[rgba(30,30,26,0.45)] transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          aria-label="Close menu overlay"
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-[rgba(18,52,77,0.08)] bg-[var(--color-bg-white)] px-6 py-6 transition-transform ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center" onClick={() => setMobileOpen(false)}>
              <Image src={legacyAssets.logo} alt="Altmed Medical Center" width={56} height={56} className="h-12 w-12 object-contain" />
            </Link>
            <button
              type="button"
              className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-[color:rgba(44,44,44,0.12)] bg-white"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 rounded-lg bg-[var(--color-surface-alt)] p-4">
            <div className="grid gap-3 text-sm text-[var(--color-text-dark)]">
              <a href={`tel:${clinic.phone}`} className="utility-link">
                <Phone className="h-4 w-4 text-[var(--color-primary)]" />
                {clinic.phone}
              </a>
              <Link href={publicRoutes.forms as Route} className="utility-link" onClick={() => setMobileOpen(false)}>
                Patient Forms
              </Link>
              <Link href={publicRoutes.telehealth as Route} className="utility-link" onClick={() => setMobileOpen(false)}>
                Telehealth
              </Link>
              <a href={clinic.mapUrl} className="utility-link">
                <MapPin className="h-4 w-4 text-[var(--color-primary)]" />
                Directions
              </a>
            </div>
          </div>

          <div className="mt-8 grid gap-2">
            <details className="rounded-md bg-[var(--color-surface-alt)] px-4 py-3">
              <summary className="cursor-pointer list-none text-base font-semibold text-[var(--color-text-dark)]">Services</summary>
              <div className="mt-4 grid gap-4">
                {serviceGroups.map(({ label, services }) => (
                  <div key={label}>
                    <div className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-primary)]">{label}</div>
                    <div className="mt-2 grid gap-1">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={publicRoutes.service(service.slug) as Route}
                          className="rounded-md py-2 text-sm font-semibold text-[var(--color-text-muted)]"
                          onClick={() => setMobileOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </details>
            <Link
              href={publicRoutes.service("occupational-health-clinic-manassas") as Route}
              className="rounded-md px-4 py-4 text-base font-semibold text-[var(--color-text-dark)] transition hover:bg-[var(--color-surface-alt)]"
              onClick={() => setMobileOpen(false)}
            >
              For Employers
            </Link>
            <Link
              href={publicRoutes.telehealth as Route}
              className="rounded-md px-4 py-4 text-base font-semibold text-[var(--color-text-dark)] transition hover:bg-[var(--color-surface-alt)]"
              onClick={() => setMobileOpen(false)}
            >
              Telehealth
            </Link>
            {infoLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href as Route}
                className="rounded-md px-4 py-4 text-base font-semibold text-[var(--color-text-dark)] transition hover:bg-[var(--color-surface-alt)]"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            <a href={`tel:${clinic.phone}`} className="block text-sm font-semibold text-[var(--color-text-dark)]">
              Call {clinic.phone}
            </a>
            <Link
              href={buildBookingUrl("mobile_nav", "book-appointment") as Route}
              className="btn-primary w-full justify-center text-sm"
              onClick={() => setMobileOpen(false)}
            >
              Book Appointment
            </Link>
          </div>
        </aside>
      </div>
      <div className="mobile-action-bar fixed inset-x-0 bottom-0 z-40 grid h-[68px] grid-cols-3 items-center gap-2 bg-[var(--color-primary)] px-2 text-white shadow-[0_-8px_24px_rgba(28,43,39,0.16)] lg:hidden">
        <a href={`tel:${clinic.phone}`} className="flex h-11 items-center justify-center gap-1.5 rounded-md text-sm font-bold">
          <Phone className="h-4 w-4" />
          Call
        </a>
        <Link href={buildBookingUrl("mobile_bottom", "book-appointment") as Route} className="flex h-11 items-center justify-center gap-1.5 rounded-md bg-[var(--color-accent)] text-sm font-bold">
          <CalendarDays className="h-4 w-4" />
          Book
        </Link>
        <a href={clinic.mapUrl} className="flex h-11 items-center justify-center gap-1.5 rounded-md text-sm font-bold">
          <MapPin className="h-4 w-4" />
          Directions
        </a>
      </div>
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-24 right-5 z-40 hidden h-11 w-11 items-center justify-center rounded-md bg-[var(--color-primary)] text-white shadow-soft transition lg:flex ${
          scrollProgress > 14 ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </header>
  );
}
