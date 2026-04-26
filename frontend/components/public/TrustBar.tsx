const items = [
  "No Appointment Needed",
  "English & Spanish Support",
  "Accepting New Patients",
  "Board-Certified Expertise",
  "Employer Partnerships Welcome"
];

export function TrustBar() {
  return (
    <section className="border-y border-slate-200 bg-white py-4">
      <div className="container-shell flex flex-wrap gap-4 text-sm font-medium text-slate-700">
        {items.map((item) => (
          <span key={item} className="inline-flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-teal-600" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
