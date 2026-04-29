"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ExternalLink, Search } from "lucide-react";

const pageTitles: Array<{ match: (pathname: string) => boolean; title: string; description: string }> = [
  {
    match: (pathname) => pathname === "/admin/dashboard",
    title: "Admin Home",
    description: "Overview of content, publishing priorities, and editorial operations."
  },
  {
    match: (pathname) => pathname.startsWith("/admin/blog/tags"),
    title: "Blog Tags",
    description: "Manage reusable topic tags for filtering, internal linking, and editorial consistency."
  },
  {
    match: (pathname) => pathname.startsWith("/admin/blog/categories"),
    title: "Blog Categories",
    description: "Structure the blog archive with SEO-aware categories and cleaner editorial grouping."
  },
  {
    match: (pathname) => pathname.startsWith("/admin/blog"),
    title: "Blog Management",
    description: "Create, feature, organize, and publish articles with a cleaner list-first workflow."
  },
  {
    match: (pathname) => pathname.startsWith("/admin/announcements"),
    title: "Announcements",
    description: "Publish timely patient notices, clinic banners, and operational updates."
  },
  {
    match: (pathname) => pathname.startsWith("/admin/providers"),
    title: "Providers",
    description: "Maintain provider profiles, specialties, and directory visibility."
  },
  {
    match: (pathname) => pathname.startsWith("/admin/faq"),
    title: "FAQs",
    description: "Keep high-intent patient questions organized, active, and easy to update."
  },
  {
    match: (pathname) => pathname.startsWith("/admin/site-settings"),
    title: "Settings",
    description: "Review core clinic settings, NAP details, and publishing defaults."
  },
  {
    match: (pathname) => pathname.startsWith("/admin/seo-settings"),
    title: "SEO Settings",
    description: "Monitor crawl controls, redirects, and site-wide search metadata."
  },
  {
    match: (pathname) => pathname.startsWith("/admin/treatment-plans/payments"),
    title: "Payment Settings",
    description: "Configure Stripe checkout keys and webhook details."
  },
  {
    match: (pathname) => pathname.startsWith("/admin/treatment-plans/enrollments"),
    title: "Plan Enrollments",
    description: "Review patient enrollment status, payment details, and program timelines."
  },
  {
    match: (pathname) => pathname.startsWith("/admin/treatment-plans"),
    title: "Treatment Plans",
    description: "Manage treatment plan catalog, prices, durations, and public enrollment links."
  }
];

export function AdminTopbar() {
  const pathname = usePathname();
  const today = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date());

  const page = pageTitles.find((item) => item.match(pathname)) ?? pageTitles[0];

  return (
    <div className="sticky top-0 z-20 border-b border-slate-200 bg-white px-5 py-4">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
            Altmed Medical Center
          </div>
          <h1 className="mt-2 text-3xl text-neutral-900">{page.title}</h1>
          <p className="mt-1 max-w-2xl text-sm text-neutral-500">{page.description}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex h-10 min-w-0 items-center gap-2 rounded-md border border-slate-200 bg-[var(--color-bg-gray)] px-3 text-sm text-neutral-500 xl:w-[26rem]">
            <Search className="h-4 w-4 text-slate-400" />
            <span className="truncate">Search content, slugs, categories, or providers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-neutral-700">
              {today}
            </div>
            <button
              type="button"
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-neutral-600"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
            </button>
            <Link href="/" className="btn-primary h-10">
              View Site
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
