"use client";

import { useRef, useState } from "react";

function parseError(value: unknown) {
  if (!value || typeof value !== "object") {
    return "We could not send your message. Please call the clinic if this keeps happening.";
  }

  const message = (value as { message?: unknown }).message;
  if (typeof message === "string") {
    return message;
  }
  if (Array.isArray(message)) {
    return message.join("; ");
  }

  return "We could not send your message. Please call the clinic if this keeps happening.";
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const mountedAt = useRef(Date.now());

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
      onSubmit={async (event) => {
        event.preventDefault();
        const elapsedMs = Date.now() - mountedAt.current;
        if (elapsedMs < 2500) {
          setError("Please wait a moment before sending your message.");
          return;
        }

        const formData = new FormData(event.currentTarget);
        const payload = {
          fullName: String(formData.get("fullName") ?? "").trim(),
          phone: String(formData.get("phone") ?? "").trim(),
          email: String(formData.get("email") ?? "").trim(),
          preferredContactMethod: String(formData.get("preferredContactMethod") ?? "").trim(),
          subject: String(formData.get("subject") ?? "").trim(),
          message: String(formData.get("message") ?? "").trim(),
          website: String(formData.get("website") ?? "").trim(),
          passedTimeCheck: true
        };

        setError("");
        setSubmitting(true);

        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          });
          const responsePayload = (await response.json().catch(() => null)) as unknown;

          if (!response.ok) {
            setError(parseError(responsePayload));
            return;
          }

          setSubmitted(true);
        } catch {
          setError("The contact form is temporarily unavailable. Please call (703) 361-4357.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <div>
        <div className="mb-2 text-base font-semibold text-neutral-900">Send Us a Message</div>
        <p className="text-base leading-7 text-neutral-700">
          Use this form for general questions, employer inquiries, or appointment request follow-up.
        </p>
      </div>
      {error ? (
        <div role="alert" className="rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
          {error}
        </div>
      ) : null}
      <input name="fullName" className="rounded-[12px] border border-slate-200 px-4 py-3.5 text-base text-neutral-900" placeholder="Full Name" required />
      <input name="phone" className="rounded-[12px] border border-slate-200 px-4 py-3.5 text-base text-neutral-900" placeholder="Phone Number" required />
      <input name="email" className="rounded-[12px] border border-slate-200 px-4 py-3.5 text-base text-neutral-900" placeholder="Email Address" type="email" required />
      <select name="subject" className="rounded-[12px] border border-slate-200 px-4 py-3.5 text-base text-neutral-900">
        <option value="General Inquiry">General Inquiry</option>
        <option value="Appointment Request">Appointment Request</option>
        <option value="Occupational Health / Employer Services">Occupational Health / Employer Services</option>
        <option value="TPA Services Inquiry">TPA Services Inquiry</option>
        <option value="Patient Forms / Records Request">Patient Forms / Records Request</option>
      </select>
      <select name="preferredContactMethod" className="rounded-[12px] border border-slate-200 px-4 py-3.5 text-base text-neutral-900">
        <option value="Phone">Prefer phone call</option>
        <option value="Email">Prefer email</option>
        <option value="Either">Either is fine</option>
      </select>
      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />
      <textarea name="message" className="min-h-40 rounded-[12px] border border-slate-200 px-4 py-3.5 text-base text-neutral-900" placeholder="Message" required />
      <div className="rounded-[12px] bg-slate-50 px-4 py-3 text-sm leading-6 text-neutral-700">
        Please do not share highly sensitive medical details in this form. For emergencies, call 911.
      </div>
      <button className="btn-primary justify-center" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
