const items = [
  "Board-Certified Providers",
  "Same-Day Appointments",
  "Accepting New Patients",
  "Telehealth Available",
  "Walk-ins Welcome"
];

export function TrustBar() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-alt)] py-4">
      <div className="container-shell flex flex-wrap gap-5 text-sm font-bold uppercase tracking-[0.06em] text-[var(--color-text-primary)]">
        {items.map((item) => (
          <span key={item} className="inline-flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
