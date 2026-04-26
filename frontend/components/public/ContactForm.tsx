"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-[14px] border border-emerald-200 bg-emerald-50 p-6 text-base leading-7 text-emerald-900">
        Thank you for reaching out to Altmed Medical Center! We typically respond within 1
        business day.
      </div>
    );
  }

  return (
    <form
      className="grid gap-4 rounded-[14px] border border-slate-200 bg-white p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div>
        <div className="mb-2 text-base font-semibold text-neutral-900">Send Us a Message</div>
        <p className="text-base leading-7 text-neutral-700">
          Use this form for general questions, employer inquiries, or appointment request follow-up.
        </p>
      </div>
      <input className="rounded-[12px] border border-slate-200 px-4 py-3.5 text-base text-neutral-900" placeholder="Full Name" required />
      <input className="rounded-[12px] border border-slate-200 px-4 py-3.5 text-base text-neutral-900" placeholder="Phone Number" required />
      <input className="rounded-[12px] border border-slate-200 px-4 py-3.5 text-base text-neutral-900" placeholder="Email Address" type="email" required />
      <select className="rounded-[12px] border border-slate-200 px-4 py-3.5 text-base text-neutral-900">
        <option>General Inquiry</option>
        <option>Appointment Request</option>
        <option>Occupational Health / Employer Services</option>
        <option>TPA Services Inquiry</option>
        <option>Patient Forms / Records Request</option>
      </select>
      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />
      <textarea className="min-h-40 rounded-[12px] border border-slate-200 px-4 py-3.5 text-base text-neutral-900" placeholder="Message" required />
      <div className="rounded-[12px] bg-slate-50 px-4 py-3 text-sm leading-6 text-neutral-700">
        Please do not share highly sensitive medical details in this form. For emergencies, call 911.
      </div>
      <button className="rounded-[12px] bg-primary px-6 py-3.5 font-semibold text-white">Send Message</button>
    </form>
  );
}
