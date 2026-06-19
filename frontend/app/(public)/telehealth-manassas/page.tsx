import type { Metadata } from "next";
import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { SchemaOrg } from "@/components/public/SchemaOrg";
import { buildPageMetadata } from "@/lib/metadata";
import { buildFaqSchema } from "@/lib/schema";
import { aiAssets, buildBookingUrl, clinic } from "@/lib/site-content";

export const metadata: Metadata = buildPageMetadata({
  title: "Telehealth Manassas VA | Virtual Doctor Visits | Altmed Medical Center",
  description:
    "Virtual doctor visits from Altmed Medical Center in Manassas VA. See a board-certified provider from home for urgent care, primary care, weight loss, and prescription refills. Book online.",
  path: "/telehealth-manassas",
  image: aiAssets.primaryCareConsultation
});

const telehealthUseCases = [
  "Colds, allergies, mild infections, and everyday urgent concerns that can be discussed safely by video",
  "Follow-up visits after an in-person appointment",
  "Medication questions, chronic-condition check-ins, and routine primary care conversations",
  "Selected weight-loss and addiction-treatment follow-up for eligible established patients"
];

const inPersonCases = [
  "Chest pain, severe shortness of breath, uncontrolled bleeding, or any emergency symptoms",
  "Broken bones, deep cuts, or injuries that may need procedures or imaging",
  "Vaccinations, annual physicals, and visits that clearly require an exam in the clinic"
];

const telehealthSteps = [
  "Book online or call Altmed and ask whether telehealth is appropriate for your concern.",
  "Complete any needed intake or consent forms before the visit.",
  "Join from a private place using a phone, tablet, or computer with camera and audio.",
  "Review symptoms, medications, follow-up needs, and next steps with the provider."
];

const telehealthFit = [
  {
    title: "Follow-up after an in-person visit",
    body:
      "Telehealth is often a good fit when the provider already knows the issue and needs to review progress, medication response, home readings, or next steps after a recent clinic visit."
  },
  {
    title: "Primary care questions that do not need a hands-on exam",
    body:
      "Some routine conversations about chronic conditions, refills, lab follow-up, lifestyle changes, and care planning can start virtually when the provider decides a video visit is clinically appropriate."
  },
  {
    title: "Local care with an in-person backup",
    body:
      "Because Altmed is a real Manassas clinic, a virtual visit can connect back to in-person exams, lab testing, vaccines, DOT physicals, or occupational paperwork when a screen is not enough."
  }
];

const telehealthFaqs = [
  {
    question: "Can a new patient use telehealth at Altmed?",
    answer:
      "Some concerns may start by telehealth, but new patients may still need an in-person exam, vitals, labs, or paperwork depending on the visit reason. Call the clinic if you are unsure."
  },
  {
    question: "Can I get prescriptions through a telehealth visit?",
    answer:
      "When clinically appropriate, the provider may discuss medication options or refills. Some medications, symptoms, and safety checks require an in-person visit before prescribing."
  },
  {
    question: "Is telehealth good for urgent care?",
    answer:
      "Telehealth can help with selected minor urgent concerns, follow-up questions, and symptom guidance. Chest pain, severe breathing problems, major injuries, and emergencies should be handled in person or by calling 911."
  },
  {
    question: "Do I need a camera for telehealth?",
    answer:
      "A smartphone, tablet, or computer with camera, microphone, speaker, and reliable internet is best. A private, well-lit space helps the provider evaluate the concern more clearly."
  },
  {
    question: "Which consent form should I complete?",
    answer:
      "Use the standard telehealth consent for adult visits. Use the minor telehealth consent when a parent or guardian is involved in care for a minor patient."
  }
];

export default function TelehealthPage() {
  return (
    <main className="bg-[var(--color-bg-white)]">
      <SchemaOrg schema={buildFaqSchema([...telehealthFaqs])} />
      <section className="container-shell section-pad">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <div className="inline-flex rounded-full bg-[var(--color-bg-gray)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
              Telehealth
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl md:text-[3.35rem]">Telehealth Services in Manassas, VA — See a Doctor From Home</h1>
            <p className="mt-6 text-[1.03rem] leading-8 text-[var(--color-text-muted)]">
              Use virtual medicine in Manassas for convenient follow-up, selected urgent care
              questions, primary care check-ins, medical weight loss conversations, and prescription
              refill discussions when an in-person exam is not required.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={buildBookingUrl("telehealth", "book-appointment") as Route} className="btn-primary">
                Book Telehealth Visit
              </Link>
              <a href="#telehealth-consent" className="btn-outline-dark">
                Consent Forms
              </a>
              <a href={`tel:${clinic.phone}`} className="btn-outline-dark">
                Call {clinic.phone}
              </a>
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-[16px] border border-[rgba(18,52,77,0.08)] bg-[var(--color-bg-gray)]">
            <Image
              src={aiAssets.primaryCareConsultation}
              alt="Altmed provider ready for a telehealth visit"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-gray)]">
        <div className="container-shell section-pad">
          <div className="max-w-3xl">
            <div className="section-label">Virtual Medicine Manassas</div>
            <h2 className="mt-3 text-3xl">Local virtual doctor visits with a clinic you can still visit in person.</h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-text-muted)]">
              Patients searching for Manassas virtual medicine often want convenience without losing
              local accountability. Altmed telehealth connects virtual visits back to the same
              Manassas clinic for labs, exams, vaccines, DOT physicals, and follow-up when needed.
            </p>
            <p className="mt-4 text-base leading-8 text-[var(--color-text-muted)]">
              That local connection matters. A national app can answer simple questions, but it
              cannot always check your blood pressure in the clinic tomorrow, help with employer
              paperwork, compare new symptoms with your recent visit, or move you into in-person
              care when the safer next step is a physical exam.
            </p>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <article className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-7">
              <h2 className="text-3xl">What telehealth can help with</h2>
              <ul className="mt-6 space-y-4 text-[1.03rem] leading-8 text-[var(--color-text-dark)]">
                {telehealthUseCases.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-7">
              <h2 className="text-3xl">When you should still come in</h2>
              <ul className="mt-6 space-y-4 text-[1.03rem] leading-8 text-[var(--color-text-dark)]">
                {inPersonCases.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <p className="mt-6 text-base leading-7 text-[var(--color-text-muted)]">
                If you are unsure, call our office and we&apos;ll help guide you to the safest visit type.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <div className="section-label">Best Fit</div>
            <h2 className="mt-3 text-3xl">When a virtual visit makes sense</h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-text-muted)]">
              Telehealth works best when the question can be answered through conversation,
              medication review, visual inspection, home readings, or follow-up planning. It is not
              meant to replace every visit, but it can make routine care easier to keep on track.
            </p>
          </div>
          <div className="grid gap-4">
            {telehealthFit.map((item) => (
              <article key={item.title} className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-6">
                <h3 className="text-[1.35rem] font-bold text-[var(--color-text-dark)]">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-[var(--color-text-muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-bg-gray)]">
        <div className="container-shell section-pad">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="section-label">How It Works</div>
            <h2 className="mt-3 text-3xl">Four steps to a virtual visit</h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-text-muted)]">
              A little preparation makes the visit more useful. Keep your medication list nearby,
              write down the main question you want answered, and have your preferred pharmacy
              information ready in case the provider needs it.
            </p>
          </div>
          <ol className="grid gap-4">
            {telehealthSteps.map((step, index) => (
              <li key={step} className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-5">
                <span className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-primary)]">
                  Step {index + 1}
                </span>
                <p className="mt-2 text-base leading-7 text-[var(--color-text-dark)]">{step}</p>
              </li>
            ))}
          </ol>
        </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <div className="grid gap-8 lg:grid-cols-3">
          <article className="lg:col-span-2">
            <div className="section-label">What To Prepare</div>
            <h2 className="mt-3 text-3xl">Make the visit easier before you log in</h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-[var(--color-text-muted)]">
              <p>
                Choose a quiet, private place where you can speak openly. If the visit is about a
                rash, swelling, wound, or visible symptom, use good lighting and be ready to move
                the camera so the provider can see clearly. If the visit is about blood pressure,
                diabetes, weight loss, or medication side effects, write down recent readings,
                doses, symptoms, and timing before the appointment starts.
              </p>
              <p>
                Telehealth is also a good moment to talk through barriers that are easy to miss in
                a rushed visit: transportation, work schedules, pharmacy access, cost questions,
                and whether a follow-up should happen virtually or in the Manassas office. The goal
                is not just a quick video call; it is a care plan that still fits after you hang up.
              </p>
              <p>
                Patients in Manassas, Manassas Park, Gainesville, Bristow, Haymarket, Centreville,
                Woodbridge, and surrounding Prince William County communities often use telehealth
                when commuting, childcare, or work hours make an in-office visit difficult. When
                the provider decides that a hands-on exam, vaccine, lab test, imaging, or procedure
                is needed, the visit can shift back to Altmed&apos;s local clinic instead of leaving
                you to search for another office.
              </p>
              <p>
                The most useful virtual visits are specific. Before the appointment, write down the
                main symptom or question, how long it has been happening, what you have tried, and
                what outcome you need from the visit. That helps the provider decide whether video
                care is enough, whether a prescription discussion is appropriate, or whether the
                safer plan is to bring you into the Manassas office for vitals, testing, or a closer
                exam.
              </p>
            </div>
          </article>
          <article className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-6">
            <h3 className="text-[1.35rem] font-bold text-[var(--color-text-dark)]">Need help deciding?</h3>
            <p className="mt-3 text-base leading-8 text-[var(--color-text-muted)]">
              If you are not sure whether your concern belongs in telehealth, call the clinic. The
              team can help you choose between virtual care, same-day urgent care, or an in-person
              appointment.
            </p>
            <a href={`tel:${clinic.phone}`} className="btn-primary mt-5">
              Call {clinic.phone}
            </a>
          </article>
        </div>
      </section>

      <section className="bg-[var(--color-bg-gray)]">
        <div className="container-shell section-pad">
          <div className="grid gap-8 lg:grid-cols-2">
            <article>
              <h2 className="text-3xl">Technology requirements</h2>
              <p className="mt-4 text-base leading-8 text-[var(--color-text-muted)]">
                Use a smartphone, tablet, or computer with a working camera, microphone, speaker,
                and reliable internet connection. Choose a private, well-lit place and keep your
                medication list, pharmacy information, and recent vitals nearby if you have them.
              </p>
            </article>
            <article>
              <h2 className="text-3xl">Learn more about telehealth</h2>
              <p className="mt-4 text-base leading-8 text-[var(--color-text-muted)]">
                Read our guide to <Link href={"/health-blogs/telehealth-in-manassas-convenient-care-from-altmed-medical-center" as Route} className="font-semibold text-[var(--color-primary)] underline-offset-4 hover:underline">telehealth in Manassas</Link> or ask the clinic whether your concern should start virtually or in person.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <div className="section-label">Connected Follow-Up</div>
            <h2 className="mt-3 text-3xl">Virtual care should still feel connected to your clinic.</h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-[var(--color-text-muted)]">
            <p>
              A telehealth visit works best when it is tied to a provider who can see the bigger
              picture: recent visits, current medications, chronic conditions, workplace forms,
              weight-loss goals, and whether in-person care is needed next. Altmed uses telehealth
              as one doorway into local care, not as a separate service that disappears after the
              video call ends.
            </p>
            <p>
              That matters for patients managing blood pressure, diabetes, asthma, weight loss,
              addiction-treatment follow-up, or recurring urgent concerns. A virtual conversation
              can help clarify symptoms and next steps, while the Manassas office remains available
              for vitals, testing, vaccines, physical exams, DOT documentation, and employer-related
              paperwork when the visit cannot be safely completed online.
            </p>
          </div>
        </div>
      </section>

      <section className="container-shell section-pad">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <div className="section-label">Telehealth FAQ</div>
            <h2 className="mt-3 text-3xl">Questions patients ask before a virtual visit</h2>
          </div>
          <FAQAccordion items={[...telehealthFaqs]} />
        </div>
      </section>

      <section id="telehealth-consent" className="container-shell section-pad scroll-mt-28">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="section-label">Consent Forms</div>
            <h2 className="mt-3 text-3xl">Complete the right telehealth consent form before your visit.</h2>
            <p className="mt-4 text-base leading-8 text-[var(--color-text-muted)]">
              These secure forms open directly in HIPAA Jotform. Choose the standard form for adult
              patients, or the minor form when a parent or guardian is involved in the visit.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <article className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-6">
              <h3 className="text-[1.2rem] font-bold text-[var(--color-text-dark)]">Telehealth Consent</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                Use this secure form for standard adult telehealth visits.
              </p>
              <a
                href="https://hipaa.jotform.com/230412431161035"
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-5"
              >
                Open Secure Form
              </a>
            </article>
            <article className="rounded-[14px] border border-[rgba(18,52,77,0.08)] bg-white p-6">
              <h3 className="text-[1.2rem] font-bold text-[var(--color-text-dark)]">Minor Telehealth Consent</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                Use this secure form for guardian-supported minor telehealth visits.
              </p>
              <a
                href="https://hipaa.jotform.com/230412885192052"
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-5"
              >
                Open Secure Form
              </a>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
