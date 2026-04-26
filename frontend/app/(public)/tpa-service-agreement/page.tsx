export default function TpaAgreementPage() {
  return (
    <main className="container-shell py-20">
      <div className="max-w-5xl">
        <div className="inline-flex rounded-full bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Employer Agreement
        </div>
        <h1 className="mt-6 text-4xl font-semibold text-neutral-900">
          Agreement Between Altmed Medical Center, Inc. (C/TPA) and Employers
        </h1>
        <p className="mt-4 text-lg leading-8 text-neutral-700">
          This page preserves the legacy TPA service agreement route that employers may still have
          bookmarked or linked in compliance documentation.
        </p>
      </div>
      <div className="mt-8 max-w-5xl rounded-xl border border-slate-200 bg-white p-8 text-neutral-700">
        <div className="space-y-8 leading-7">
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900">Program overview</h2>
            <p className="mt-3">
              Altmed Medical Center administers consortium and third-party administrator services
              designed to support drug and alcohol testing programs for businesses and regulated
              entities with safety-sensitive employees.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5">
              <li>Programs are intended to align with applicable DOT and agency requirements.</li>
              <li>Altmed can administer drug and alcohol testing programs for employer compliance.</li>
              <li>
                Safety-sensitive employees remain subject to the employer’s governing policy and
                the applicable regulatory framework.
              </li>
            </ol>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900">Altmed responsibilities</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Maintain qualified random testing pools where applicable</li>
              <li>Manage random selection and notification workflows</li>
              <li>Coordinate collection sites, certified laboratory access, and MRO review support</li>
              <li>Maintain participation records and provide compliance information on request</li>
              <li>Release program history and testing information when authorized and required</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900">Employer responsibilities</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Maintain and implement a compliant drug and alcohol testing policy</li>
              <li>Train supervisors as required for reasonable-suspicion situations</li>
              <li>Keep company and employee enrollment information current</li>
              <li>Ensure new safety-sensitive employees complete required pre-employment testing</li>
              <li>Remove covered employees from service when notified of disqualifying results</li>
              <li>Promptly pay invoices and service-related fees under the agreement</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900">Services commonly included</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Random pool administration</li>
              <li>DOT and non-DOT testing coordination</li>
              <li>MRO review support</li>
              <li>Breath alcohol testing program support</li>
              <li>Return-to-duty and follow-up workflow support</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900">Terms notice</h2>
            <p className="mt-3">
              The original agreement included agency references, membership fees, billing terms,
              indemnification language, and compliance responsibilities. Employers should contact
              Altmed directly for the current executable version and any updated pricing or program
              terms.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
