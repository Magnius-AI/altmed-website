"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import {
  Bell,
  FileText,
  FolderTree,
  Home,
  LayoutDashboard,
  Megaphone,
  MenuSquare,
  MessageCircleQuestion,
  Settings,
  ShieldCheck,
  Tags,
  Users
} from "lucide-react";
import { adminNav } from "@/lib/site-content";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Home,
  "Blog Posts": FileText,
  Categories: FolderTree,
  Tags,
  FAQs: MessageCircleQuestion,
  Announcements: Megaphone,
  Providers: Users,
  Menus: MenuSquare,
  Settings,
  SEO: ShieldCheck,
  "Contact Inbox": Bell
};

export function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(`${href}/`));

  return (
    <aside className="hidden w-80 shrink-0 border-r border-slate-200 bg-white px-5 py-6 lg:block">
      <div className="rounded-[1.5rem] border border-slate-200 bg-[var(--color-bg-gray)] p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-text-dark)]">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
              Altmed CMS
            </div>
            <div className="mt-1 text-xl font-semibold text-[var(--color-text-dark)]">Publishing Console</div>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">
          Clean publishing workflows for posts, announcements, providers, FAQs, and SEO-critical
          content.
        </p>
      </div>
      <nav className="mt-8 space-y-6 text-sm">
        {adminNav.map((group) => (
          <div key={group.label}>
            <div className="px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              {group.label}
            </div>
            <div className="mt-2 grid gap-2">
              {group.items.map((item) => {
                const Icon = iconMap[item.label] ?? FileText;
                return (
                  <Link
                    key={item.href}
                    href={item.href as Route}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                      isActive(item.href)
                        ? "bg-[var(--color-primary-light)] text-[var(--color-text-dark)]"
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
      <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-[var(--color-bg-gray)] p-5 text-sm leading-7 text-neutral-600">
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
