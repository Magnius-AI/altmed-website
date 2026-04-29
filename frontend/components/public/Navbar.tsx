"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { buildBookingUrl, clinic, legacyAssets, publicRoutes, serviceCards, type NavigationMenuItem } from "@/lib/site-content";

type Props = {
  menu: NavigationMenuItem[];
  showTreatmentPlans?: boolean;
};

const navLinks = [
  { href: publicRoutes.faq, label: "FAQ" },
  { href: publicRoutes.services, label: "Services" },
  { href: publicRoutes.blog, label: "Blog" },
  { href: publicRoutes.about, label: "About Us" },
  { href: publicRoutes.contact, label: "Contact Us" }
] as const;

export function Navbar({ menu, showTreatmentPlans = true }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const visibleNavLinks = showTreatmentPlans
    ? [
        ...navLinks.slice(0, 2),
        { href: publicRoutes.plans, label: "Treatment Plans" },
        ...navLinks.slice(2)
      ]
    : navLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
    if (!servicesOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!servicesMenuRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
      }
    };
    const onResize = () => setServicesOpen(false);

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [servicesOpen]);

  return (
    <header className="sticky top-0 z-40">
      <div className="hidden border-b border-[rgba(255,255,255,0.12)] bg-[var(--color-text-dark)] text-white lg:block">
        <div className="container-shell flex min-h-[48px] items-center justify-between gap-6 text-sm">
          <div className="flex flex-wrap items-center gap-5 text-white/90">
            <a href={`mailto:${clinic.email}`} className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white">
              <Mail className="h-4 w-4 text-[var(--color-primary-light)]" />
              {clinic.email}
            </a>
            <a href={`tel:${clinic.phone}`} className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white">
              <Phone className="h-4 w-4 text-[var(--color-primary-light)]" />
              {clinic.phone}
            </a>
            <a href={clinic.mapUrl} className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white">
              <MapPin className="h-4 w-4 text-[var(--color-primary-light)]" />
              8551 Rixlew Lane Suite 140, Manassas, VA 20109
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={publicRoutes.telehealth as Route}
              className="focus-ring inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-white"
            >
              Telehealth
            </Link>
            <Link
              href={"/admin/login" as Route}
              className="focus-ring inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-[var(--color-text-dark)]"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`border-b transition-all duration-200 ${
          scrolled
            ? "border-[color:rgba(18,52,77,0.08)] bg-[rgba(255,255,255,0.98)] shadow-[0_10px_30px_rgba(18,52,77,0.08)]"
            : "border-transparent bg-[rgba(255,255,255,0.97)]"
        }`}
      >
        <div className="container-shell grid h-[84px] grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[auto_1fr_auto] lg:gap-8">
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
                onClick={() => setServicesOpen((value) => !value)}
                className="focus-ring inline-flex cursor-pointer list-none items-center gap-1 px-1.5 py-1 text-[15px] font-semibold tracking-[-0.01em] text-[var(--color-text-dark)] hover:text-[var(--color-primary)]"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`absolute left-0 top-full z-50 mt-5 max-h-[min(72vh,680px)] w-[min(720px,calc(100vw-2rem))] overflow-y-auto rounded-[18px] border border-[color:rgba(18,52,77,0.08)] bg-white p-6 shadow-[0_22px_60px_rgba(18,52,77,0.16)] ${
                  servicesOpen ? "block" : "hidden"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)]">
                      Explore care
                    </div>
                    <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                      Fast links to the services patients and employers use most.
                    </p>
                  </div>
                  <Link
                    href={publicRoutes.services as Route}
                    onClick={() => setServicesOpen(false)}
                    className="focus-ring text-sm font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline"
                  >
                    View all services
                  </Link>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {serviceCards.slice(0, 10).map((service) => (
                    <Link
                      key={service.slug}
                      href={publicRoutes.service(service.slug) as Route}
                      onClick={() => setServicesOpen(false)}
                      className="focus-ring rounded-[10px] border border-[color:rgba(44,44,44,0.07)] px-4 py-3 text-sm text-[var(--color-text-muted)] transition hover:border-[color:rgba(46,125,107,0.2)] hover:bg-[var(--color-bg-gray)] hover:text-[var(--color-text-dark)]"
                    >
                      <span className="block font-semibold text-[var(--color-text-dark)]">{service.title}</span>
                      <span className="mt-1 block text-xs leading-5">{service.shortDescription}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {visibleNavLinks.filter((item) => item.href !== publicRoutes.services).map((item) => (
              <Link
                key={item.href}
                href={item.href as Route}
                className="focus-ring px-1.5 py-1 text-[15px] font-semibold tracking-[-0.01em] text-[var(--color-text-dark)] hover:text-[var(--color-primary)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center justify-end gap-4 lg:flex">
            <a
              href={`tel:${clinic.phone}`}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-[rgba(18,52,77,0.08)] px-4 py-2 text-[15px] font-semibold tracking-[-0.02em] text-[var(--color-text-dark)] hover:text-[var(--color-primary)]"
            >
              <Phone className="h-4 w-4" />
              {clinic.phone}
            </a>
            <Link
              href={buildBookingUrl("nav", "book-appointment") as Route}
              className="btn-primary min-w-[156px] justify-center rounded-full px-6"
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

          <div className="mt-8 rounded-[16px] bg-[var(--color-bg-gray)] p-4">
            <div className="grid gap-3 text-sm text-[var(--color-text-dark)]">
              <a href={`tel:${clinic.phone}`} className="utility-link">
                <Phone className="h-4 w-4 text-[var(--color-primary)]" />
                {clinic.phone}
              </a>
              <Link href={"/admin/login" as Route} className="utility-link" onClick={() => setMobileOpen(false)}>
                Login
              </Link>
              <Link href={publicRoutes.forms as Route} className="utility-link" onClick={() => setMobileOpen(false)}>
                Patient Forms
              </Link>
              <Link href={publicRoutes.telehealth as Route} className="utility-link" onClick={() => setMobileOpen(false)}>
                Telehealth
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-2">
            <Link
              href={publicRoutes.services as Route}
              className="rounded-[10px] bg-[var(--color-bg-gray)] px-4 py-4 text-base font-semibold text-[var(--color-text-dark)]"
              onClick={() => setMobileOpen(false)}
            >
              Services
            </Link>
            {visibleNavLinks.filter((item) => item.href !== publicRoutes.services).map((item) => (
              <Link
                key={item.href}
                href={item.href as Route}
                className="rounded-[10px] px-4 py-4 text-base font-semibold text-[var(--color-text-dark)] transition hover:bg-[var(--color-bg-gray)]"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {serviceCards.slice(0, 8).map((service) => (
              <Link
                key={service.slug}
                href={publicRoutes.service(service.slug) as Route}
                className="rounded-[10px] px-4 py-3 text-sm text-[var(--color-text-muted)] transition hover:bg-[var(--color-bg-gray)] hover:text-[var(--color-text-dark)]"
                onClick={() => setMobileOpen(false)}
              >
                {service.title}
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
    </header>
  );
}
