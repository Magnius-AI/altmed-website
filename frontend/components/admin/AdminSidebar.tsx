"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import {
  Bell,
  CalendarCheck2,
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
  Star,
  Tags,
  Users
} from "lucide-react";
import { adminNav } from "@/lib/site-content";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Home,
  "Dashboard Overview": LayoutDashboard,
  "Providers & Schedule": Users,
  "Blog Posts": FileText,
  Categories: FolderTree,
  Tags,
  FAQs: MessageCircleQuestion,
  "Google Reviews": Star,
  "Notices & Updates": Megaphone,
  Settings,
  "Contact Inbox": Bell,
  "Treatment Plans": ClipboardList,
  "Cash Inflow": DollarSign,
  Enrollments: Users,
  Attendance: CalendarCheck2,
  Payments: CreditCard
};

export function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(`${href}/`));

  return (
    <aside className="hidden w-60 shrink-0 border-r border-[var(--admin-border)] bg-white px-2.5 py-3 lg:block">
      <div className="rounded-lg border border-[var(--admin-border)] bg-white p-2.5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-bg-gray)] text-[var(--color-primary)] ring-1 ring-[rgba(22,122,91,0.12)]">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
              Altmed Admin
            </div>
            <div className="mt-0.5 text-sm font-semibold text-[var(--color-text-dark)]">Clinic Console</div>
          </div>
        </div>
      </div>
      <nav className="mt-3 space-y-3 text-sm">
        {adminNav.map((group) => (
          <div key={group.label}>
            <div className="px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              {group.label}
            </div>
            <div className="mt-1 grid gap-0.5">
              {group.items.map((item) => {
                const Icon = iconMap[item.label] ?? FileText;
                return (
                  <Link
                    key={item.href}
                    href={item.href as Route}
                    className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 transition ${
                      isActive(item.href)
                        ? "bg-[var(--color-primary)] text-white"
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
      <div className="mt-4 rounded-lg border border-[var(--admin-border)] bg-[var(--color-bg-warm)] p-2.5 text-xs leading-5 text-neutral-600">
        <div className="font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
          Backend Focus
        </div>
        <ul className="mt-2 space-y-1.5">
          <li>Enrollments and payments</li>
          <li>Notices and updates</li>
          <li>Blog and lead management</li>
        </ul>
      </div>
    </aside>
  );
}
