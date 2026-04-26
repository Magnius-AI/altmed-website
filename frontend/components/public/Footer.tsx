import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { buildBookingUrl, clinic, legacyAssets, publicRoutes, serviceCards } from "@/lib/site-content";

const resourceLinks = [
  { href: publicRoutes.blog, label: "Health Blog" },
  { href: publicRoutes.faq, label: "FAQs" },
  { href: publicRoutes.forms, label: "Patient Forms" },
  { href: publicRoutes.privacy, label: "Privacy Policy" }
] as const;

const companyLinks = [
  { href: publicRoutes.about, label: "About Us" },
  { href: publicRoutes.contact, label: "Contact Us" },
  { href: publicRoutes.telehealth, label: "Telehealth" },
  { href: publicRoutes.appointment, label: "Appointment" }
] as const;

export function Footer() {
  return (
    <footer className="bg-[var(--color-footer-bg)] text-[rgba(250,250,247,0.8)]">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image src={legacyAssets.logo} alt="Altmed Medical Center" width={52} height={52} className="h-12 w-12 rounded-[14px] bg-white object-contain p-1.5" />
            <div>
              <div className="text-lg font-semibold text-white">{clinic.name}</div>
              <div className="text-sm text-[rgba(250,250,247,0.6)]">Comprehensive Care. Convenient Access. Trusted Expertise.</div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7">
            Walk-in urgent care, primary care, occupational health, weight loss, telehealth, and
            employer services in Manassas, Virginia.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <a href={`tel:${clinic.phone}`} className="inline-flex items-center gap-2 hover-link">
              <Phone className="h-4 w-4" />
              {clinic.phone}
            </a>
            <a href={clinic.mapUrl} className="inline-flex items-start gap-2 hover-link">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{clinic.address}</span>
            </a>
          </div>
          <Link href={buildBookingUrl("footer", "book-appointment") as Route} className="btn-primary mt-6 rounded-full text-sm">
            Book Appointment
          </Link>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Services</h2>
          <div className="mt-5 grid gap-3 text-sm">
            {serviceCards.slice(0, 6).map((service) => (
              <Link key={service.slug} href={publicRoutes.service(service.slug) as Route} className="hover-link">
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Resources</h2>
          <div className="mt-5 grid gap-3 text-sm">
            {resourceLinks.map((link) => (
              <Link key={link.href} href={link.href as Route} className="hover-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Company</h2>
          <div className="mt-5 grid gap-3 text-sm">
            {companyLinks.map((link) => (
              <Link key={link.href} href={link.href as Route} className="hover-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[rgba(250,250,247,0.08)]">
        <div className="container-shell flex flex-col gap-3 py-5 text-sm text-[rgba(250,250,247,0.58)] md:flex-row md:items-center md:justify-between">
          <p>© 2026 Altmed Medical Center. All rights reserved.</p>
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
