import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { CalendarCheck, MapPin, Phone, Stethoscope } from "lucide-react";
import { buildPageMetadata } from "@/lib/metadata";
import { clinic, publicRoutes } from "@/lib/site-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Clinica en Manassas VA | Altmed Medical Center",
  description:
    "Altmed Medical Center ofrece cuidado urgente, atencion primaria, examenes DOT, telemedicina y servicios medicos en Manassas VA.",
  path: "/es",
  image: "/assets/img/homepage/clinic-front-view.jpg"
});

const services = [
  { label: "Cuidado urgente sin cita", href: "/services/urgent-care-manassas-va" },
  { label: "Atencion primaria", href: "/services/primary-care-manassas-va" },
  { label: "Examen fisico DOT/CDL", href: "/services/dot-physical-manassas-va" },
  { label: "Perdida de peso medica", href: "/services/medical-weight-loss-manassas" },
  { label: "Salud ocupacional para empleadores", href: "/services/occupational-health-clinic-manassas" },
  { label: "Telemedicina", href: "/telehealth-manassas" }
];

export default function SpanishPage() {
  return (
    <main className="bg-[var(--color-bg-white)]">
      <section className="container-shell section-pad">
        <div className="max-w-4xl">
          <div className="section-label">Espanol</div>
          <h1 className="mt-5">Clinica medica en Manassas, VA</h1>
          <p className="mt-5 text-lg leading-8 text-[var(--color-text-muted)]">
            Altmed Medical Center atiende a pacientes de Manassas, Manassas Park, Gainesville,
            Haymarket, Woodbridge y Prince William County. Llame para pedir cita, preguntar por
            servicios, confirmar seguro medico o recibir ayuda con formularios.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Phone,
              title: "Llamar",
              copy: clinic.phone,
              href: `tel:${clinic.phone}`
            },
            {
              icon: CalendarCheck,
              title: "Citas",
              copy: "Programe una visita o pregunte por disponibilidad el mismo dia.",
              href: publicRoutes.appointment
            },
            {
              icon: MapPin,
              title: "Direccion",
              copy: clinic.address,
              href: publicRoutes.contact
            }
          ].map(({ icon: Icon, title, copy, href }) => (
            <a key={title} href={href} className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-6">
              <Icon className="h-6 w-6 text-[var(--color-primary)]" />
              <h2 className="mt-4 text-2xl">{title}</h2>
              <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">{copy}</p>
            </a>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-3xl">Servicios principales</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <Link key={service.href} href={service.href as Route} className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-5">
                <Stethoscope className="h-5 w-5 text-[var(--color-primary)]" />
                <span className="mt-3 block text-lg font-semibold text-[var(--color-text-dark)]">{service.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[14px] bg-[var(--color-bg-gray)] p-7">
          <h2 className="text-3xl">Antes de su visita</h2>
          <ul className="mt-5 space-y-3 text-base leading-7 text-[var(--color-text-muted)]">
            <li>Traiga identificacion con foto y tarjeta de seguro medico si tiene una.</li>
            <li>Traiga una lista de medicamentos actuales y formularios de empleador si aplican.</li>
            <li>Para emergencias, dolor de pecho, dificultad severa para respirar o sintomas de derrame cerebral, llame al 911.</li>
          </ul>
        </section>
      </section>
    </main>
  );
}
