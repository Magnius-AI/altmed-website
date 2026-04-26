import type { Metadata } from "next";
import { buildBookingUrl } from "@/lib/site-content";
import { getActiveAnnouncements } from "@/lib/api";

export const metadata: Metadata = {
  title: "Announcements | Altmed Medical Center Updates in Manassas, VA",
  description:
    "Stay current with Altmed Medical Center announcements, clinic updates, scheduling information, and service news in Manassas, Virginia."
};

export default async function UpdatesPage() {
  const announcements = await getActiveAnnouncements();
  const visibleAnnouncements =
    announcements.length > 0
      ? announcements
      : [
          {
            title: "Welcome to Altmed Medical Center",
            body: "Now accepting new patients. Walk-ins welcome Monday through Friday, 9 AM to 5 PM.",
            priority: "Normal",
            type: "General"
          }
        ];

  return (
    <main className="container-shell py-16">
      <div className="max-w-4xl">
        <div className="inline-flex rounded-full bg-[#eef4fb] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Clinic News
        </div>
        <h1 className="mt-5 text-4xl font-bold text-neutral-900">Clinic Updates & Announcements</h1>
        <p className="mt-4 text-lg leading-8 text-neutral-700">
          Check here for scheduling updates, new services, clinic reminders, and important
          announcements from the Altmed Medical Center team.
        </p>
      </div>
      <div className="mt-8 grid gap-4">
        {visibleAnnouncements.map((announcement, index) => (
          <div key={`${announcement?.title}-${index}`} className="rounded-[2rem] bg-white p-6 shadow-md">
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {announcement?.priority ?? "Normal"}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {announcement?.type ?? "General"}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-neutral-900">
              {announcement?.title ?? "Welcome to Altmed Medical Center"}
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-700">
              {announcement?.body ??
                "Now accepting new patients. Walk-ins welcome Monday through Friday, 9 AM to 5 PM."}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-[1.75rem] bg-[#0f2550] px-6 py-6 text-white">
        <h2 className="text-2xl font-semibold">Need to schedule a visit?</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-200">
          Use our online check-in platform for the fastest scheduling experience.
        </p>
        <a
          href={buildBookingUrl("announcements_page", "cta")}
          className="mt-5 inline-flex rounded-full bg-white px-5 py-3 font-semibold text-primary"
        >
          Book Appointment
        </a>
      </div>
    </main>
  );
}
