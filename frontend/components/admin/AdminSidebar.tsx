"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import {
  Bell,
  ClipboardList,
  CreditCard,
  DollarSign,
  FileText,
  FolderTree,
  Home,
  LayoutDashboard,
  Megaphone,
  MessageCircleQuestion,
  Settings,
  ShieldCheck,
  Tags,
  Users
} from "lucide-react";
import { adminNav } from "@/lib/site-content";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Home,
  "Dashboard Overview": LayoutDashboard,
  "Services Management": ClipboardList,
  "Provider Profiles": Users,
  "Blog Posts": FileText,
  Categories: FolderTree,
  Tags,
  FAQs: MessageCircleQuestion,
  Announcements: Megaphone,
  Settings,
  SEO: ShieldCheck,
  "Contact Inbox": Bell,
  "Treatment Plans": ClipboardList,
  "Cash Inflow": DollarSign,
  Enrollments: Users,
  Payments: CreditCard
};

export function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(`${href}/`));

  return (
    <aside className="hidden w-72 shrink-0 border-r border-[var(--admin-border)] bg-white/95 px-4 py-5 shadow-[10px_0_30px_rgba(16,42,58,0.04)] lg:block">
      <div className="rounded-lg border border-[var(--admin-border)] bg-[linear-gradient(135deg,#ffffff_0%,var(--color-primary-soft)_100%)] p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[var(--color-primary)] shadow-sm ring-1 ring-[rgba(22,122,91,0.12)]">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
              Altmed CMS
            </div>
            <div className="mt-1 text-lg font-semibold text-[var(--color-text-dark)]">Publishing Console</div>
          </div>
        </div>
      </div>
      <nav className="mt-5 space-y-5 text-sm">
        {adminNav.map((group) => (
          <div key={group.label}>
            <div className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              {group.label}
            </div>
            <div className="mt-2 grid gap-1">
              {group.items.map((item) => {
                const Icon = iconMap[item.label] ?? FileText;
                return (
                  <Link
                    key={item.href}
                    href={item.href as Route}
                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 transition ${
                      isActive(item.href)
                        ? "bg-[var(--color-primary)] text-white shadow-sm"
                        : "text-neutral-700 hover:bg-[var(--color-bg-gray)] hover:text-neutral-900"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="mt-6 rounded-lg border border-[var(--admin-border)] bg-[var(--color-bg-warm)] p-4 text-sm leading-6 text-neutral-600 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
          Workflow Goals
        </div>
        <ul className="mt-3 space-y-2">
          <li>List-first content management</li>
          <li>Editorial taxonomy control</li>
          <li>Featured content and media visibility</li>
        </ul>
      </div>
    </aside>
  );
}
