import type { Route } from "next";
import Link from "next/link";
import {
  Activity,
  Bell,
  ClipboardList,
  DollarSign,
  FileText,
  Inbox,
  MessageCircleQuestion,
  Settings,
  ShieldCheck,
  Users
} from "lucide-react";
import { getAdminDashboardData } from "@/lib/api";
import { updateTreatmentPlansVisibilityAction } from "./actions";

const quickLinks: Array<{
  href: Route;
  label: string;
  description: string;
}> = [
  {
    href: "/admin/blog" as Route,
    label: "Manage Blog",
    description: "Review posts, categories, tags, and publishing status."
  },
  {
    href: "/admin/faq" as Route,
    label: "Manage FAQs",
    description: "Keep patient questions current and searchable."
  },
  {
    href: "/admin/contact-submissions" as Route,
    label: "Contact Inbox",
    description: "Review new messages and bot-filtered submissions."
  },
  {
    href: "/admin/treatment-plans" as Route,
    label: "Treatment Plans",
    description: "Manage public plans, pricing, and patient enrollment links."
  },
  {
    href: "/admin/treatment-plans/cash-inflow" as Route,
    label: "Cash Inflow",
    description: "Review collected patient payments, refunds, and pending checkout value."
  },
  {
    href: "/admin/treatment-plans/payments" as Route,
    label: "Payment Settings",
    description: "Update Stripe keys, webhook secret, and payment mode."
  },
  {
    href: "/admin/site-settings" as Route,
    label: "Site Settings",
    description: "Update NAP, hours, social links, and SEO defaults."
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
  const activeProviders = data.providers.filter((provider) => provider.isActive !== false).length;
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
      label: "Announcements",
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
    <div className="grid gap-6">
      <section className="admin-card p-6 lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="admin-label">JWT Secured Dashboard</div>
            <h2 className="mt-3 text-3xl text-neutral-900">Welcome{data.user?.name ? `, ${data.user.name}` : ""}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-neutral-600">
              Your admin session is authenticated with signed access and refresh tokens. Use this
              overview to jump into patient payments, publishing, SEO, provider, and operations work.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[30rem]">
            <div className="rounded-2xl border border-slate-200 bg-[var(--color-bg-gray)] p-4">
              <Users className="h-5 w-5 text-[var(--color-primary)]" />
              <div className="mt-3 text-2xl font-semibold text-neutral-900">{formatNumber(activeProviders)}</div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Providers</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-[var(--color-bg-gray)] p-4">
              <Settings className="h-5 w-5 text-[var(--color-primary)]" />
              <div className="mt-3 text-2xl font-semibold text-neutral-900">{formatNumber(data.settings.length)}</div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Settings</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-[var(--color-bg-gray)] p-4">
              <Activity className="h-5 w-5 text-[var(--color-primary)]" />
              <div className="mt-3 text-2xl font-semibold text-neutral-900">{formatNumber(data.analytics.total)}</div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Events</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="admin-card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="admin-label">{stat.label}</div>
                  <div className="mt-3 text-4xl font-semibold text-neutral-900">{formatNumber(stat.value)}</div>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary)]">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-600">{stat.detail}</p>
            </div>
          );
        })}
      </section>

      <section className="admin-card p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="admin-label">Public Treatment Plans</div>
            <h3 className="mt-2 text-xl font-semibold text-neutral-900">
              {treatmentPlansEnabled ? "Treatment plans are visible" : "Treatment plans are hidden"}
            </h3>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-neutral-600">
              Turn this on to show a Treatment Plans link in the public navigation and make the plan pages available.
              If there are no active plans, the public page will show a not-available message.
            </p>
          </div>
          <form action={updateTreatmentPlansVisibilityAction} className="flex items-center gap-3">
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-neutral-700">
              <input type="checkbox" name="treatmentPlansEnabled" defaultChecked={treatmentPlansEnabled} />
              Show plans
            </label>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="admin-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="admin-label">Recent Blog Posts</div>
              <h3 className="mt-2 text-2xl text-neutral-900">Publishing Activity</h3>
            </div>
            <Link href={"/admin/blog" as Route} className="btn-secondary">
              View All
            </Link>
          </div>
          <div className="mt-5 divide-y divide-slate-200">
            {recentPosts.length ? (
              recentPosts.map((post) => (
                <div key={post.id} className="grid gap-2 py-4 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <div className="font-semibold text-neutral-900">{post.title}</div>
                    <div className="mt-1 text-sm text-neutral-500">{post.category ?? "Uncategorized"}</div>
                  </div>
                  <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-neutral-600">
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
              ))
            ) : (
              <p className="py-6 text-sm text-neutral-500">No blog posts found yet.</p>
            )}
          </div>
        </div>

        <div className="admin-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="admin-label">Operations</div>
              <h3 className="mt-2 text-2xl text-neutral-900">Contact Queue</h3>
            </div>
            <ShieldCheck className="h-6 w-6 text-[var(--color-primary)]" />
          </div>
          <div className="mt-5 divide-y divide-slate-200">
            {recentMessages.length ? (
              recentMessages.map((message) => (
                <div key={message.id} className="py-4">
                  <div className="font-semibold text-neutral-900">{message.fullName}</div>
                  <div className="mt-1 text-sm text-neutral-500">{message.subject ?? message.email}</div>
                </div>
              ))
            ) : (
              <p className="py-6 text-sm text-neutral-500">No contact submissions waiting.</p>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href} className="admin-card block p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="font-semibold text-neutral-900">{link.label}</div>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{link.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
