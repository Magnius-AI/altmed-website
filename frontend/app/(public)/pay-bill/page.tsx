import Link from "next/link";
import { CreditCard, FileText, Phone } from "lucide-react";
import { clinic, publicRoutes } from "@/lib/site-content";

export default function PayBillPage() {
  return (
    <main className="container-shell py-20">
      <div className="max-w-4xl">
        <div className="inline-flex rounded-full bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Billing Support
        </div>
        <h1 className="mt-6 text-4xl font-semibold text-neutral-900 md:text-[3rem]">Pay Your Bill</h1>
        <p className="mt-5 text-lg text-neutral-700">
          The old site included a bill-payment intake form. This updated page preserves the route
          and guides patients to the right next step while the secure CMS-backed billing flow is
          being finalized.
        </p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {[
          {
            icon: CreditCard,
            title: "Billing help by phone",
            copy: `For bill questions or payment support, call ${clinic.phone} during clinic hours.`
          },
          {
            icon: FileText,
            title: "Have your details ready",
            copy: "Keep your full name, date of service, employer or test information, and amount due available."
          },
          {
            icon: Phone,
            title: "Need another route?",
            copy: "If this charge is related to occupational testing or a workers' compensation visit, our team can help direct it correctly."
          }
        ].map(({ icon: Icon, title, copy }) => (
          <article key={title} className="rounded-xl border border-slate-200 bg-white p-6">
            <Icon className="h-6 w-6 text-primary" />
            <h2 className="mt-4 text-xl font-semibold text-neutral-900">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-700">{copy}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-neutral-700">
          Need immediate assistance? Contact our clinic directly and we’ll help you get to the
          right billing workflow.
        </p>
        <div className="mt-5 flex flex-wrap gap-4">
          <a href={`tel:${clinic.phone}`} className="rounded-md border border-primary px-5 py-3 font-semibold text-primary">
            Call {clinic.phone}
          </a>
          <Link href={publicRoutes.contact} className="rounded-full border border-primary px-5 py-3 font-semibold text-primary">
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
