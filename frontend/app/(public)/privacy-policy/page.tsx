export default function PrivacyPolicyPage() {
  return (
    <main className="container-shell py-20">
      <div className="max-w-5xl">
        <div className="inline-flex rounded-full bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Privacy Policy
        </div>
        <h1 className="mt-6 text-4xl font-semibold text-neutral-900">Managing Patient Health Information</h1>
        <p className="mt-4 text-lg leading-8 text-neutral-700">
          This page preserves the original privacy-policy route from the old Altmed website and
          modernizes the presentation of the clinic’s core privacy commitments.
        </p>
      </div>
      <div className="mt-8 max-w-5xl rounded-xl border border-slate-200 bg-white p-8 text-neutral-700">
        <div className="space-y-8 leading-7">
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900">1. Policy</h2>
            <p className="mt-3">
              Altmed Medical Center is committed to safeguarding patient privacy. Information
              collected by the practice is treated as confidential and used to support medical,
              health, billing, and operational services related to patient care.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900">2. Purpose</h2>
            <p className="mt-3">
              This policy explains how personal information is collected, used, stored, and
              disclosed, and helps patients understand when information may be shared with trusted
              third parties involved in care or required by law.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900">3. What information may be collected</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Names, addresses, and contact information</li>
              <li>Healthcare identifiers and registration details</li>
              <li>Medical history, medications, allergies, and immunization records</li>
              <li>Family history, social history, and risk-factor information relevant to care</li>
              <li>Paper records, electronic records, and medically relevant images or recordings</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900">4. Collection, use, and disclosure</h2>
            <p className="mt-3">
              Information is collected for patient care, continuity of treatment, financial claims,
              and necessary administrative tasks. It may also be shared with other healthcare
              professionals involved in the patient’s care, approved business service providers,
              and agencies where disclosure is required by law.
            </p>
            <p className="mt-3">
              Altmed does not use patient information for direct marketing without explicit
              permission and works to avoid unnecessary disclosure of personal data.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900">5. Data quality and security</h2>
            <p className="mt-3">
              The clinic takes reasonable steps to keep patient information accurate, complete, and
              secure. Information is stored in protected systems or controlled physical
              environments, and staff are expected to maintain confidentiality at all times.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900">6. Access and corrections</h2>
            <p className="mt-3">
              Patients may request access to their personal information or request corrections in
              writing. Response timing, record-copying fees, and release restrictions may depend on
              the nature and scope of the request.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold text-neutral-900">7. Questions or complaints</h2>
            <p className="mt-3">
              Altmed takes privacy concerns seriously. Patients who have concerns about how their
              information is handled should contact the clinic in writing so the matter can be
              reviewed through the practice’s complaint-resolution process.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
