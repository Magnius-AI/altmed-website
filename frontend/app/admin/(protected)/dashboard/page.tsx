import type { Route } from "next";
import Link from "next/link";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import {
  Activity,
  ArrowRight,
  Bell,
  CalendarCheck2,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  DollarSign,
  FileText,
  Inbox,
  MessageCircleQuestion,
  Settings2,
  ShieldCheck,
  Users,
  type LucideIcon
} from "lucide-react";
import { getAdminDashboardData } from "@/lib/api";
import { updateTreatmentPlansVisibilityAction } from "./actions";

const quickLinks: Array<{
  href: Route;
  label: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    href: "/admin/treatment-plans/enrollments" as Route,
    label: "Enrollments",
    description: "Review patient enrollment status and payment details.",
    icon: Users
  },
  {
    href: "/admin/announcements" as Route,
    label: "Notices & Updates",
    description: "Publish clinic notices, alerts, and homepage updates.",
    icon: Bell
  },
  {
    href: "/admin/blog" as Route,
    label: "Blog Management",
    description: "Review posts, categories, tags, and publishing status.",
    icon: FileText
  },
  {
    href: "/admin/treatment-plans" as Route,
    label: "Treatment Plans",
    description: "Manage public plans, pricing, and enrollment links.",
    icon: ClipboardList
  },
  {
    href: "/admin/contact-submissions" as Route,
    label: "Contact Inbox",
    description: "Review new messages and bot-filtered submissions.",
    icon: Inbox
  },
  {
    href: "/admin/providers" as Route,
    label: "Providers & Schedule",
    description: "Update provider names, designations, status, and appointment links.",
    icon: CalendarCheck2
  },
  {
    href: "/admin/treatment-plans/cash-inflow" as Route,
    label: "Cash Inflow",
    description: "Review collected payments, refunds, and pending value.",
    icon: DollarSign
  },
  {
    href: "/admin/treatment-plans/payments" as Route,
    label: "Payment Settings",
    description: "Update Stripe keys, webhook secret, and payment mode.",
    icon: CreditCard
  },
  {
    href: "/admin/faq" as Route,
    label: "FAQs",
    description: "Keep patient questions current and searchable.",
    icon: MessageCircleQuestion
  },
  {
    href: "/admin/site-settings" as Route,
    label: "Clinic Settings",
    description: "Update NAP, hours, social links, and defaults.",
    icon: Settings2
  }
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(cents / 100);
}

export default async function AdminDashboardPage() {
  const data = await getAdminDashboardData();
  const publishedPosts = data.blogPosts.filter((post) => post.published).length;
  const activeFaqs = data.faqs.filter((faq) => faq.isActive !== false).length;
  const activeAnnouncements = data.announcements.filter((announcement) => announcement.isActive !== false).length;
  const unreadMessages = data.contactStats.unreviewed;
  const botBlocked = data.contactStats.botBlocked;
  const planMetrics = data.treatmentPlanMetrics;
  const featuresSetting = data.settings.find((setting) => setting.key === "features");
  const treatmentPlansEnabled = featuresSetting?.value?.treatmentPlansEnabled !== false;

  const stats = [
    {
      label: "Active Plans",
      value: planMetrics.activePlans,
      detail: "Public treatment plans accepting enrollment",
      icon: ClipboardList
    },
    {
      label: "Total Enrolled",
      value: planMetrics.totalEnrolled,
      detail: "Paid, active, or completed enrollments",
      icon: Users
    },
    {
      label: "Active Members",
      value: planMetrics.activeMembers,
      detail: `${formatMoney(planMetrics.revenueMtdCents)} revenue this month`,
      icon: DollarSign
    },
    {
      label: "Published Posts",
      value: publishedPosts,
      detail: `${data.blogPosts.length} total drafts and posts`,
      icon: FileText
    },
    {
      label: "Active FAQs",
      value: activeFaqs,
      detail: "Patient-facing answers in rotation",
      icon: MessageCircleQuestion
    },
    {
      label: "Notices",
      value: activeAnnouncements,
      detail: "Active notices and homepage banners",
      icon: Bell
    },
    {
      label: "Contact Queue",
      value: unreadMessages,
      detail: `${botBlocked} bot submissions blocked`,
      icon: Inbox
    }
  ];

  const recentPosts = data.blogPosts.slice(0, 5);
  const recentMessages = data.contactSubmissions.slice(0, 5);

  return (
    <div className="grid gap-4">
      <section className="admin-card overflow-hidden">
        <div className="grid gap-5 bg-[linear-gradient(135deg,#ffffff_0%,var(--color-bg-gray)_62%,#fff4eb_100%)] p-6 lg:grid-cols-[minmax(0,1fr)_minmax(380px,520px)] lg:items-center">
          <div>
            <div className="admin-label">Operations Dashboard</div>
            <h2 className="mt-2 font-heading text-[2.2rem] font-normal leading-tight text-neutral-950">Welcome{data.user?.name ? `, ${data.user.name}` : ""}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
              A focused control room for enrollments, payments, notices, blog content, provider scheduling, and clinic operations.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-white/95 p-4 shadow-sm ring-1 ring-[var(--admin-border)]">
              <div className="flex items-center justify-between gap-3">
                <Users className="h-5 w-5 text-[var(--color-primary)]" />
                <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-neutral-500">Enrollments</div>
              </div>
              <div className="mt-3 text-3xl font-semibold leading-none text-neutral-950">{formatNumber(planMetrics.totalEnrolled)}</div>
            </div>
            <div className="rounded-lg bg-white/95 p-4 shadow-sm ring-1 ring-[var(--admin-border)]">
              <div className="flex items-center justify-between gap-3">
                <Bell className="h-5 w-5 text-[var(--color-accent)]" />
                <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-neutral-500">Notices</div>
              </div>
              <div className="mt-3 text-3xl font-semibold leading-none text-neutral-950">{formatNumber(activeAnnouncements)}</div>
            </div>
            <div className="rounded-lg bg-white/95 p-4 shadow-sm ring-1 ring-[var(--admin-border)]">
              <div className="flex items-center justify-between gap-3">
                <Activity className="h-5 w-5 text-[var(--color-primary-dark)]" />
                <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-neutral-500">Posts</div>
              </div>
              <div className="mt-3 text-3xl font-semibold leading-none text-neutral-950">{formatNumber(publishedPosts)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} className="admin-card group flex min-h-[132px] flex-col justify-between p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[var(--admin-shadow)]">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-bg-gray)] text-[var(--color-primary)] transition group-hover:bg-[var(--color-primary)] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowRight className="mt-1 h-4 w-4 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]" />
              </div>
              <div>
                <div className="font-semibold text-neutral-950">{link.label}</div>
                <p className="mt-1.5 text-sm leading-6 text-neutral-600">{link.description}</p>
              </div>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const tone =
            index % 3 === 1
              ? "bg-[var(--color-accent-light)] text-[var(--color-accent)]"
              : index % 3 === 2
                ? "bg-[var(--color-bg-gray)] text-[var(--color-primary-dark)]"
                : "bg-[var(--color-primary)] text-white";
          return (
            <div key={stat.label} className="admin-card group p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[var(--admin-shadow)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="admin-label">{stat.label}</div>
                  <div className="mt-2 font-heading text-[2rem] font-normal leading-none text-neutral-950">{formatNumber(stat.value)}</div>
                </div>
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${tone}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{stat.detail}</p>
            </div>
          );
        })}
      </section>

      <section className="admin-card p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="admin-label">Public Treatment Plans</div>
            <h3 className="mt-1 font-heading text-2xl font-normal text-neutral-900">
              {treatmentPlansEnabled ? "Treatment plans are visible" : "Treatment plans are hidden"}
            </h3>
            <p className="mt-1 max-w-3xl text-xs leading-5 text-neutral-600">
              Toggle public plan pages and navigation visibility. If there are no active plans, the
              public page shows a not-available message.
            </p>
          </div>
          <form action={updateTreatmentPlansVisibilityAction} className="flex items-center gap-2">
            <label className="flex items-center gap-2 rounded-md border border-[var(--admin-border)] bg-[var(--color-bg-gray)] px-3 py-2 text-sm font-semibold text-neutral-700 shadow-inner">
              <input type="checkbox" name="treatmentPlansEnabled" defaultChecked={treatmentPlansEnabled} className="h-4 w-4 accent-[var(--color-primary)]" />
              Show plans
            </label>
            <AdminSubmitButton className="btn btn-primary btn-sm" pendingLabel="Saving...">
              Save
            </AdminSubmitButton>
          </form>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <div className="admin-card p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="admin-label">Recent Blog Posts</div>
              <h3 className="mt-1 font-heading text-[1.5rem] font-normal text-neutral-950">Publishing Activity</h3>
            </div>
            <Link href={"/admin/blog" as Route} className="btn-secondary btn-sm">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-2 divide-y divide-[var(--admin-border)]">
            {recentPosts.length ? (
              recentPosts.map((post) => (
                <div key={post.id} className="grid gap-2 py-2.5 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <div className="font-semibold leading-6 text-neutral-950">{post.title}</div>
                    <div className="mt-0.5 text-xs text-neutral-500">{post.category ?? "Uncategorized"}</div>
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${post.published ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-accent-light)] text-[var(--color-accent-dark)]"}`}>
                    {post.published ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
              ))
            ) : (
              <p className="py-5 text-sm text-neutral-500">No blog posts found yet.</p>
            )}
          </div>
        </div>

        <div className="admin-card p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="admin-label">Operations</div>
              <h3 className="mt-1 font-heading text-[1.5rem] font-normal text-neutral-950">Contact Queue</h3>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-2 divide-y divide-[var(--admin-border)]">
            {recentMessages.length ? (
              recentMessages.map((message) => (
                <div key={message.id} className="py-2.5">
                  <div className="font-semibold text-neutral-950">{message.fullName}</div>
                  <div className="mt-0.5 text-xs text-neutral-500">{message.subject ?? message.email}</div>
                </div>
              ))
            ) : (
              <p className="py-5 text-sm text-neutral-500">No contact submissions waiting.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
