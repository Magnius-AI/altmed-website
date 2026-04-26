import { ChevronRight } from "lucide-react";
import { departments } from "@/lib/site-content";

export default function DepartmentsPage() {
  return (
    <main className="container-shell py-20">
      <div className="max-w-3xl">
        <div className="inline-flex rounded-full bg-primary-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Departments
        </div>
        <h1 className="mt-6 text-4xl font-semibold text-neutral-900 md:text-[3rem]">Explore Our Clinical Departments</h1>
        <p className="mt-5 text-lg text-neutral-700">
          We preserved the core clinical groupings from the old site so patients and employers can
          quickly see the main care areas Altmed focuses on.
        </p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {departments.map((department) => (
          <article key={department.name} className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-semibold text-neutral-900">{department.name}</h2>
            <p className="mt-2 text-sm font-medium text-primary">Head: {department.head}</p>
            <p className="mt-4 text-neutral-700">{department.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Learn more <ChevronRight className="h-4 w-4" />
            </span>
          </article>
        ))}
      </div>
    </main>
  );
}
