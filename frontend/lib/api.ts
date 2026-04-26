import {
  blogCategories,
  clinic,
  defaultNavigationMenu,
  legacyServiceRedirects,
  NavigationMenuItem,
  reconstructedLegacyRoutes,
  servicePageFallbackContent,
  serviceCards
} from "./site-content";
import { cookies } from "next/headers";

const API_URL =
  process.env.API_URL_INTERNAL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3001";

export type Announcement = {
  id?: string;
  title?: string;
  body?: string;
  type?: string;
  priority?: string;
  pinned?: boolean;
  isActive?: boolean;
  showOnHomepageBanner?: boolean;
  startDate?: string;
  endDate?: string | null;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  author?: string;
  published?: boolean;
  publishedAt?: string;
  body: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  canonicalUrl?: string | null;
  tags?: string[] | null;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type BlogTaxonomy = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  isActive?: boolean;
  usageCount?: number;
  updatedAt?: string;
};

export type FaqItem = {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  displayOrder?: number;
  isActive?: boolean;
};

export type FaqGroups = Record<string, FaqItem[]>;

export type ContactSubmission = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  preferredContactMethod?: string | null;
  subject?: string | null;
  message: string;
  isBot: boolean;
  botReason?: string | null;
  reviewed: boolean;
  submittedAt: string;
};

export type ContactStats = {
  totalReceived: number;
  botBlocked: number;
  reviewed: number;
  unreviewed: number;
};

export type SiteSetting = {
  id?: string;
  key: string;
  value: Record<string, unknown>;
  updatedAt?: string;
};

export type AnalyticsSummary = {
  total: number;
  byName: Record<string, number>;
};

export type AdminUser = {
  id: string;
  email: string;
  role: string;
  name?: string | null;
};

export type AdminDashboardData = {
  user: AdminUser | null;
  blogPosts: BlogPost[];
  faqs: FaqItem[];
  announcements: Announcement[];
  contactSubmissions: ContactSubmission[];
  contactStats: ContactStats;
  providers: Provider[];
  servicePages: ServicePage[];
  settings: SiteSetting[];
  analytics: AnalyticsSummary;
  routeAudit: typeof reconstructedLegacyRoutes;
};

export type Provider = {
  id: string;
  name: string;
  credentials?: string;
  title?: string;
  bio?: string;
  specialties?: string[];
  photo?: string;
  personalNote?: string | null;
  displayOrder?: number;
  isActive?: boolean;
};

export type ServicePage = {
  id?: string;
  slug: string;
  name: string;
  heroContent: string;
  bodyContent: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  featuredImage: string;
  isActive?: boolean;
};

function normalizeAssetPath(path?: string | null) {
  if (!path) {
    return path ?? undefined;
  }

  const assetMap: Record<string, string> = {
    "/images/dr-lee-placeholder.webp": "/legacy-assets/doctors/doc-1.png",
    "/images/urgent-care.webp": "/legacy-assets/homepage/clinic-front-view.jpg",
    "/images/primary-care.webp": "/legacy-assets/departments/departments-3.jpg",
    "/images/occupational-health.webp": "/legacy-assets/homepage/hero-bg.jpg",
    "/images/weight-loss.webp": "/legacy-assets/doctors/doc-2.jpg",
    "/images/addiction-medicine.webp": "/legacy-assets/homepage/top.jpg",
    "/images/telehealth.webp": "/legacy-assets/homepage/top.jpg",
    "/images/tpa-services.webp": "/legacy-assets/doctors/doctors-2.jpg",
    "/images/og-default.webp": "/legacy-assets/homepage/clinic-front-view.jpg"
  };

  return assetMap[path] ?? path;
}

function normalizeBlogPost(post: BlogPost): BlogPost {
  return {
    ...post,
    featuredImage: normalizeAssetPath(post.featuredImage)
  };
}

function normalizeProvider(provider: Provider): Provider {
  return {
    ...provider,
    photo: normalizeAssetPath(provider.photo)
  };
}

function normalizeServicePage(page: ServicePage): ServicePage {
  return {
    ...page,
    featuredImage: normalizeAssetPath(page.featuredImage) ?? "/legacy-assets/homepage/clinic-front-view.jpg"
  };
}

function stripHtmlLength(value: string) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length;
}

function shouldUseFallbackServiceCopy(apiPage: ServicePage, fallbackPage: ServicePage) {
  const apiLength = stripHtmlLength(apiPage.bodyContent);
  const fallbackLength = stripHtmlLength(fallbackPage.bodyContent);

  return apiLength < 420 || apiLength < fallbackLength * 0.6;
}

async function safeFetch<T>(path: string, fallback: T, init?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      next: { revalidate: 3600 }
    });
    if (!response.ok) {
      return fallback;
    }
    const payload = (await response.json()) as { data?: T } | T;
    return (payload as { data?: T }).data ?? (payload as T);
  } catch {
    return fallback;
  }
}

async function safeAdminFetch<T>(path: string, fallback: T, init?: RequestInit): Promise<T> {
  try {
    const accessToken = cookies().get("altmed_admin_access_token")?.value;
    if (!accessToken) {
      return fallback;
    }

    const headers = new Headers(init?.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);
    headers.set("Cookie", `altmed_admin_access_token=${accessToken}`);

    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers,
      cache: "no-store"
    });

    if (!response.ok) {
      return fallback;
    }

    const payload = (await response.json()) as { data?: T } | T;
    return (payload as { data?: T }).data ?? (payload as T);
  } catch {
    return fallback;
  }
}

export async function getAnnouncementBanner() {
  return safeFetch<Announcement | null>("/api/announcements/banner", null);
}

export async function getActiveAnnouncements() {
  return safeFetch<Announcement[]>("/api/announcements/active", []);
}

export async function getBlogPosts() {
  const posts = await safeFetch<BlogPost[]>("/api/blog", [
    {
      id: "fallback-1",
      title: "First Time Visiting a Walk-In Clinic in Manassas? What to Expect at Altmed",
      slug: "first-time-visiting-a-walk-in-clinic-in-manassas-what-to-expect-at-altmed",
      excerpt:
        "A practical guide to what to bring, how walk-ins work, and when urgent care makes more sense than the ER for common same-day needs in Manassas.",
      category: "Urgent Care Tips",
      tags: ["urgent care", "walk-in clinic"],
      author: "Dr. Gerald K. Lee",
      publishedAt: "2026-04-01T09:00:00.000Z",
      featuredImage: "/legacy-assets/homepage/clinic-front-view.jpg",
      featured: true,
      metaTitle: "First Time Visiting a Walk-In Clinic in Manassas? What to Expect at Altmed",
      metaDescription:
        "New to walk-in care in Manassas? Learn what to bring, how Altmed urgent care works, and when to choose urgent care instead of the ER.",
      body:
        "<h2>Why patients look for a walk-in clinic in Manassas</h2><p>Most people do not start searching for a walk-in clinic until something unexpected happens. A child wakes up with a fever, a sore throat gets worse by lunchtime, or a weekend injury starts swelling before Monday morning. In those moments, patients want fast care without the cost and delay that often come with an emergency room visit. That is where a local walk-in clinic can make a real difference.</p><p>At Altmed Medical Center, we designed our urgent care experience for the kinds of health issues that should be handled quickly but are not true emergencies. We serve patients in Manassas, Sudley, Gainesville, Bristow, and nearby communities who need same-day access, clear next steps, and a clinic that feels approachable rather than rushed.</p><h2>What to bring to your visit</h2><p>If you are visiting a walk-in clinic for the first time, bringing a few basic items can make the process smoother:</p><ul><li>A photo ID and your insurance card if you have one</li><li>A list of medications you currently take</li><li>Any paperwork related to work injuries, school clearance, or urgent employer needs</li><li>Basic details about your symptoms, when they started, and anything that seems to make them better or worse</li></ul><h2>What happens after you arrive</h2><p>Most walk-in visits begin with a short intake process. Our team confirms your information, asks what brought you in, and helps document the main concern so the provider can get a clear picture quickly. Once the clinical visit begins, the focus is on practical treatment, whether that means testing, medication guidance, wound care, or a recommendation for a higher level of care when needed.</p><h2>When urgent care is the right choice</h2><p>Urgent care is a strong fit for flu-like symptoms, sore throat, sinus concerns, ear infections, rashes, mild injuries, sprains, minor cuts, and many common same-day issues. It is not a substitute for emergency care. If symptoms suggest chest pain, stroke, severe shortness of breath, or major trauma, patients should call 911 or go to the emergency room immediately.</p><h2>What makes Altmed different</h2><p>Patients often tell us they appreciate that Altmed feels more personal than a chain urgent care. We combine same-day access with broader clinical strengths in <a href=\"/services/urgent-care-manassas-va\">urgent care</a>, <a href=\"/services/primary-care-manassas-va\">primary care</a>, occupational medicine, and follow-up planning. That means a first urgent visit can become part of a more connected care experience rather than an isolated encounter.</p><h2>Planning your first visit with confidence</h2><p>If you have been putting off care because you are unsure what a walk-in clinic visit will be like, the best answer is often simple: come in prepared with the basics and let the clinic guide the rest. A strong walk-in clinic should reduce stress, not add to it. That is the standard we aim for every day in Manassas.</p>"
    },
    {
      id: "fallback-2",
      title: "Semaglutide GLP-1 Weight Loss Treatment in Manassas, VA",
      slug: "semaglutide-glp-1-weight-loss-treatment-in-manassas-va",
      excerpt:
        "What GLP-1 and semaglutide treatment actually involves, who may benefit, and why physician-guided weight loss is different from a one-click online prescription.",
      category: "Weight Loss & Nutrition",
      tags: ["semaglutide", "weight loss", "glp-1"],
      author: "Dr. Gerald K. Lee",
      publishedAt: "2026-04-08T09:00:00.000Z",
      featuredImage: "/legacy-assets/doctors/doc-2.jpg",
      metaTitle: "Semaglutide GLP-1 Weight Loss Treatment in Manassas, VA",
      metaDescription:
        "Learn how semaglutide and GLP-1 weight loss treatment works in Manassas, VA, and what to expect from physician-supervised care at Altmed Medical Center.",
      body:
        "<h2>Why so many patients are searching for GLP-1 treatment</h2><p>Medical weight loss has changed dramatically in the last few years, and much of that conversation now centers on GLP-1 medications such as semaglutide. Patients in Manassas are hearing about these treatments from friends, online videos, and national headlines, but many still have basic questions: How do GLP-1 medications work? Who is a good candidate? And what does safe, physician-guided treatment actually look like?</p><p>At Altmed Medical Center, we approach these questions carefully. Weight loss treatment is not about chasing trends. It is about understanding the patient’s health history, goals, risks, and long-term habits before building a plan that makes sense.</p><h2>What GLP-1 medications do</h2><p>GLP-1 medications influence appetite, fullness, and how the body responds to food. Many patients describe feeling less preoccupied with food and more able to follow a structured nutrition plan. That can be helpful, but medication alone is rarely the whole answer. The best results tend to come when treatment is paired with medical monitoring, behavior change, activity planning, and realistic nutrition support.</p><h2>Why physician oversight matters</h2><p>One of the biggest mistakes in the weight loss market is treating semaglutide like a standalone product rather than part of a larger clinical strategy. Patients need to understand dosage progression, side effects, hydration, protein intake, expectations, and whether a medication is even appropriate in the first place. That is why physician-guided care matters.</p><p>At Altmed, medical weight loss visits are designed to look at the full picture. We consider weight history, eating patterns, coexisting health concerns, and the patient’s daily routine before deciding what type of plan fits best.</p><h2>What a Manassas patient should expect</h2><p>If you are exploring <a href=\"/services/medical-weight-loss-manassas\">medical weight loss in Manassas</a>, expect the conversation to go beyond the prescription itself. Good care includes a clinical review, discussion of realistic goals, and an honest understanding of how treatment fits into work, family life, finances, and follow-up. Some patients may be good candidates for GLP-1 treatment. Others may need a different strategy first.</p><h2>Questions worth asking before you start</h2><ul><li>What is the plan beyond the medication itself?</li><li>How will progress be monitored?</li><li>What nutrition approach supports the treatment?</li><li>What side effects or barriers should be discussed up front?</li><li>How will the plan adjust if the response is slower or faster than expected?</li></ul><h2>Weight loss care should feel structured, not confusing</h2><p>Patients deserve better than generic weight loss marketing. If you are considering semaglutide or another GLP-1 option, the right next step is a thoughtful medical visit that looks at your entire health picture and builds a plan you can actually follow. That is the difference between chasing hype and building something sustainable.</p>"
    },
    {
      id: "fallback-3",
      title: "Telehealth in Manassas: Convenient Care from Altmed Medical Center",
      slug: "telehealth-in-manassas-convenient-care-from-altmed-medical-center",
      excerpt:
        "How telehealth works, what kinds of visits it can help with, and why virtual care has become a practical option for busy patients across Manassas.",
      category: "Telehealth",
      tags: ["telehealth", "virtual care"],
      author: "Dr. Gerald K. Lee",
      publishedAt: "2026-04-15T09:00:00.000Z",
      featuredImage: "/legacy-assets/homepage/top.jpg",
      metaTitle: "Telehealth in Manassas: Convenient Care from Altmed Medical Center",
      metaDescription:
        "Explore telehealth options in Manassas, VA for urgent care follow-up, primary care check-ins, and convenient virtual visits from Altmed Medical Center.",
      body:
        "<h2>Why telehealth has become part of everyday care</h2><p>Many patients no longer think of telehealth as a temporary convenience. It has become part of how modern clinics extend access, save time, and support follow-up care without forcing people to rearrange their whole day. In Manassas, that matters. Busy work schedules, commuting, childcare responsibilities, and transportation challenges can all make in-person visits harder than they need to be.</p><p>Telehealth gives patients another way to connect with their clinic when the situation is appropriate for a virtual visit.</p><h2>What telehealth can help with</h2><p>Telehealth is often useful for follow-up visits, routine primary care discussions, medication questions, and selected urgent concerns that do not require an in-person exam. It can also be a strong fit for ongoing check-ins related to weight loss, chronic condition management, or addiction-treatment follow-up when clinically appropriate.</p><ul><li>Follow-up visits after an in-person urgent care or primary care appointment</li><li>Routine discussions about chronic conditions and care plans</li><li>Questions about medications, symptoms, and next steps</li><li>Selected virtual support for weight loss and addiction-treatment continuity</li></ul><h2>What telehealth does not replace</h2><p>Virtual care is not the right setting for every problem. Patients who need procedures, imaging, vaccinations, physical exams, or evaluation of potentially serious symptoms may still need to come into the clinic or seek emergency care. A good telehealth program helps patients understand that distinction quickly rather than leaving them uncertain.</p><h2>Why patients in Manassas use virtual visits</h2><p>Convenience is the obvious reason, but it is not the only one. Telehealth can reduce missed work time, help patients stay connected to their provider, and make follow-up more realistic for people with demanding schedules. It also creates a smoother experience for patients who already trust a local clinic and want to keep care connected.</p><p>At Altmed, telehealth is part of a broader care model that includes <a href=\"/telehealth-manassas\">virtual visits in Manassas</a>, urgent care, primary care, and in-clinic follow-up when necessary.</p><h2>How to prepare for a better virtual visit</h2><p>Patients usually do best when they log in from a quiet place, have a list of medications nearby, and think ahead about the main questions they want answered. A focused visit helps the provider understand the issue quickly and decide whether telehealth is enough or whether the next step should happen in person.</p><h2>Convenience should still feel clinical and trustworthy</h2><p>Telehealth works best when it feels like an extension of a real medical relationship rather than a disconnected online interaction. That is why local, clinic-based virtual care remains valuable. Patients know who they are seeing, where the clinic is located, and how to get in-person support if they need it.</p>"
    }
  ]);

  return posts.map(normalizeBlogPost);
}

export async function getBlogPost(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug) ?? posts[0];
}

export async function getFaqs() {
  return safeFetch<FaqGroups>("/api/faq", {
    General: [
      {
        id: "1",
        question: "Where is Altmed Medical Center located?",
        answer: clinic.address
      }
    ]
  });
}

export async function getFaqSchema() {
  return safeFetch("/api/faq/schema", {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: []
  });
}

export async function getProviders() {
  const providers = await safeFetch<Provider[]>("/api/providers", [
    {
      id: "provider-1",
      name: "Dr. Gerald K. Lee",
      credentials: "MD, PhD, MS",
      title: "Founder & Lead Physician",
      bio: "Dr. Lee combines advanced research training with community-focused care.",
      specialties: ["Obesity Medicine", "Addiction Medicine", "Pain Management"],
      photo: "/images/dr-lee-placeholder.webp"
    }
  ]);

  return providers.map(normalizeProvider);
}

export async function getAdminUser() {
  return safeAdminFetch<AdminUser | null>("/api/auth/me", null);
}

export async function getAdminBlogPosts() {
  const posts = await safeAdminFetch<BlogPost[]>("/api/blog/admin", []);
  return posts.map(normalizeBlogPost);
}

export async function getAdminBlogPost(id: string) {
  const post = await safeAdminFetch<BlogPost | null>(`/api/blog/admin/${id}`, null);
  return post ? normalizeBlogPost(post) : null;
}

export async function getAdminBlogCategories() {
  return safeAdminFetch<BlogTaxonomy[]>("/api/blog/admin/categories", []);
}

export async function getAdminBlogTags() {
  return safeAdminFetch<BlogTaxonomy[]>("/api/blog/admin/tags", []);
}

export async function getAdminFaqs() {
  return safeAdminFetch<FaqItem[]>("/api/faq/admin", []);
}

export async function getAdminAnnouncements() {
  return safeAdminFetch<Announcement[]>("/api/announcements/admin", []);
}

export async function getAdminContactSubmissions() {
  return safeAdminFetch<ContactSubmission[]>("/api/contact/submissions", []);
}

export async function getAdminContactStats() {
  return safeAdminFetch<ContactStats>("/api/contact/stats", {
    totalReceived: 0,
    botBlocked: 0,
    reviewed: 0,
    unreviewed: 0
  });
}

export async function getAdminProviders() {
  const providers = await safeAdminFetch<Provider[]>("/api/providers/admin", []);
  return providers.map(normalizeProvider);
}

export async function getAdminAnalyticsSummary() {
  return safeAdminFetch<AnalyticsSummary>("/api/analytics/summary", {
    total: 0,
    byName: {}
  });
}

export async function getAdminSiteSettings() {
  return safeAdminFetch<SiteSetting[]>("/api/settings/admin/all", []);
}

export async function getSiteSetting(key: string) {
  return safeFetch<SiteSetting | null>(`/api/settings/${key}`, null);
}

export async function getNavigationMenu(): Promise<NavigationMenuItem[]> {
  const setting = await getSiteSetting("navigation");
  const menu = setting?.value?.mainMenu;

  if (!Array.isArray(menu)) {
    return defaultNavigationMenu;
  }

  return menu as NavigationMenuItem[];
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const [
    user,
    blogPosts,
    faqs,
    announcements,
    contactSubmissions,
    contactStats,
    providers,
    servicePages,
    settings,
    analytics
  ] = await Promise.all([
    getAdminUser(),
    getAdminBlogPosts(),
    getAdminFaqs(),
    getAdminAnnouncements(),
    getAdminContactSubmissions(),
    getAdminContactStats(),
    getAdminProviders(),
    safeFetch<ServicePage[]>("/api/services-pages", []),
    getAdminSiteSettings(),
    getAdminAnalyticsSummary()
  ]);

  return {
    user,
    blogPosts,
    faqs,
    announcements,
    contactSubmissions,
    contactStats,
    providers,
    servicePages: servicePages.map(normalizeServicePage),
    settings,
    analytics,
    routeAudit: reconstructedLegacyRoutes
  };
}

export async function getServicePage(slug: string) {
  const card = serviceCards.find((entry) => entry.slug === slug);
  const legacySlug = legacyServiceRedirects[slug];
  const fallbackContent = servicePageFallbackContent[slug] ?? (legacySlug ? servicePageFallbackContent[legacySlug] : undefined);
  const fallback: ServicePage = {
    slug,
    name: fallbackContent?.name ?? card?.title ?? slug,
    heroContent: fallbackContent?.heroContent ?? `<h1>${card?.title ?? slug}</h1>`,
    bodyContent:
      fallbackContent?.bodyContent ?? `<p>${card?.description ?? "Service information coming soon."}</p>`,
    metaTitle:
      fallbackContent?.metaTitle ?? `${card?.title ?? slug} | Altmed Medical Center`,
    metaDescription:
      fallbackContent?.metaDescription ?? card?.description ?? "Service information from Altmed Medical Center.",
    metaKeywords:
      fallbackContent?.metaKeywords ?? `${card?.title ?? slug}, Altmed Medical Center`,
    featuredImage:
      fallbackContent?.featuredImage ?? card?.image ?? "/legacy-assets/homepage/clinic-front-view.jpg",
    isActive: true
  };

  const page = await safeFetch<ServicePage | null>(`/api/services-pages/${slug}`, null);

  if (page) {
    return normalizeServicePage(
      shouldUseFallbackServiceCopy(page, fallback)
        ? {
            ...page,
            name: fallback.name,
            heroContent: fallback.heroContent,
            bodyContent: fallback.bodyContent,
            metaTitle: fallback.metaTitle,
            metaDescription: fallback.metaDescription,
            metaKeywords: fallback.metaKeywords,
            featuredImage: fallback.featuredImage
          }
        : page
    );
  }

  if (legacySlug) {
    const legacyPage = await safeFetch<ServicePage | null>(`/api/services-pages/${legacySlug}`, null);

    if (legacyPage) {
      return normalizeServicePage({
        ...(shouldUseFallbackServiceCopy(legacyPage, fallback)
          ? {
              ...legacyPage,
              heroContent: fallback.heroContent,
              bodyContent: fallback.bodyContent,
              metaTitle: fallback.metaTitle,
              metaDescription: fallback.metaDescription,
              metaKeywords: fallback.metaKeywords,
              featuredImage: fallback.featuredImage
            }
          : legacyPage),
        slug,
        name: card?.title ?? legacyPage.name
      });
    }
  }

  return normalizeServicePage(fallback);
}

export async function getClinicSchema() {
  return safeFetch<Record<string, unknown>>("/api/seo/schema/clinic", {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: clinic.name
  });
}

export async function getSiteSettings() {
  return {
    clinic,
    blogCategories
  };
}
