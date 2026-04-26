import type { Route } from "next";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  href: Route;
};

export function ServiceCard({ title, description, href }: Props) {
  return (
    <article className="group rounded-[14px] border border-slate-200 bg-white p-6 transition hover:border-primary/30">
      <div className="inline-flex rounded-[10px] bg-[#eef4fb] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Service
      </div>
      <h3 className="mt-4 text-xl font-semibold text-neutral-900">{title}</h3>
      <p className="mt-3 text-base leading-7 text-neutral-700">{description}</p>
      <Link href={href} className="mt-6 inline-flex font-semibold text-primary">
        Learn More
      </Link>
    </article>
  );
}
