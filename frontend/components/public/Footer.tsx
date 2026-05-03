import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock3, MapPin, Phone } from "lucide-react";
import { clinic, legacyAssets, publicRoutes, serviceCards } from "@/lib/site-content";

const resourceLinks = [
  { href: publicRoutes.faq, label: "FAQ" },
  { href: publicRoutes.forms, label: "Patient Forms" },
  { href: publicRoutes.blog, label: "Health Blog" },
  { href: "/plans", label: "Treatment Plans" }
] as const;

const companyLinks = [
  { href: publicRoutes.about, label: "About" },
  { href: publicRoutes.contact, label: "Contact" },
  { href: publicRoutes.telehealth, label: "Telehealth" },
  { href: publicRoutes.appointment, label: "Book Appointment" }
] as const;

export function Footer() {
  return (
    <footer className="bg-[var(--c-dark)] text-[#c5d2ce]">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image src={legacyAssets.logo} alt="Altmed Medical Center" width={56} height={56} className="h-12 w-12 rounded-md bg-white object-contain p-1" />
            <div>
              <div className="font-semibold text-white">{clinic.name}</div>
              <div className="text-sm text-[#9fb1ad]">Walk-in care in Manassas, VA</div>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-[#c5d2ce]">
            Urgent care, primary care, DOT physicals, weight loss, telehealth, and employer health
            services at 8551 Rixlew Lane.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">Services</h2>
          <div className="mt-5 grid gap-3 text-sm">
            {serviceCards.slice(0, 7).map((service) => (
              <Link key={service.slug} href={publicRoutes.service(service.slug) as Route} className="hover-link">
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">Resources</h2>
          <div className="mt-5 grid gap-3 text-sm">
            {resourceLinks.map((link) => (
              <Link key={link.href} href={link.href as Route} className="hover-link">
                {link.label}
              </Link>
            ))}
          </div>
          <h2 className="mt-8 text-sm font-bold uppercase tracking-[0.16em] text-white">Company</h2>
          <div className="mt-5 grid gap-3 text-sm">
            {companyLinks.map((link) => (
              <Link key={link.href} href={link.href as Route} className="hover-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">Visit Us</h2>
          <div className="mt-5 grid gap-3 text-sm leading-7">
            <a href={clinic.mapUrl} className="inline-flex items-start gap-2 hover-link">
              <MapPin className="mt-1 h-4 w-4 shrink-0" />
              <span>{clinic.address}</span>
            </a>
            <a href={`tel:${clinic.phone}`} className="inline-flex items-center gap-2 hover-link">
              <Phone className="h-4 w-4" />
              {clinic.phone}
            </a>
            <div className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              Monday - Friday · 9 AM - 5 PM
            </div>
            <a href={clinic.mapUrl} className="hover-link">
              Google Maps
            </a>
          </div>
          <a
            href={clinic.mapUrl}
            aria-label="Open Altmed Medical Center on Google Maps"
            className="mt-5 flex min-h-[132px] items-center justify-center rounded-md border border-white/10 bg-[#182a26] text-center text-sm font-semibold text-white/80"
          >
            <span>
              <MapPin className="mx-auto mb-2 h-6 w-6 text-[var(--c-accent)]" />
              8551 Rixlew Lane, Suite 140
            </span>
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-3 py-5 text-xs text-[#8A9E9A] md:flex-row md:items-center md:justify-between">
          <p>© 2026 Altmed Medical Center</p>
          <div className="flex flex-wrap gap-5">
            <Link href={publicRoutes.privacy as Route} className="hover-link">
              Privacy Policy
            </Link>
            <Link href={publicRoutes.tpaAgreement as Route} className="hover-link">
              TPA Service Agreement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
