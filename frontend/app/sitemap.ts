import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getBlogPosts, getTreatmentPlans } from "@/lib/api";
import { legacyServiceRedirects, publicRoutes, serviceCards, servicePageFallbackContent } from "@/lib/site-content";
import { getAbsoluteUrl, getOriginFromHeaders } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, plans] = await Promise.all([getBlogPosts(), getTreatmentPlans()]);
  const origin = getOriginFromHeaders(headers());
  const now = new Date();
  const redirectServiceSources = new Set([
    ...Object.keys(legacyServiceRedirects),
    "occupational-health/breath-alcohol-test-manassas",
    "occupational-health/pre-employment-physical"
  ]);
  const serviceSlugs = Array.from(
    new Set([...serviceCards.map((service) => service.slug), ...Object.keys(servicePageFallbackContent)])
  ).filter((slug) => !redirectServiceSources.has(slug));
  const staticRoutes = [
    publicRoutes.home,
    publicRoutes.services,
    publicRoutes.plans,
    publicRoutes.about,
    publicRoutes.contact,
    publicRoutes.providers,
    publicRoutes.blog,
    publicRoutes.faq,
    publicRoutes.forms,
    publicRoutes.appointment,
    publicRoutes.telehealth,
    publicRoutes.tpaAgreement,
    "/insurance-accepted-manassas",
    "/es",
    "/patient-forms/medical-record-request-form",
    "/privacy-policy",
    "/terms",
    "/pay-bill"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: getAbsoluteUrl(route, origin),
      lastModified: now
    })),
    ...serviceSlugs.map((slug) => ({
      url: getAbsoluteUrl(`/services/${slug}`, origin),
      lastModified: now
    })),
    ...posts.map((post) => ({
      url: getAbsoluteUrl(`/health-blogs/${post.slug}`, origin),
      lastModified: post.updatedAt ? new Date(post.updatedAt) : now
    })),
    ...plans.map((plan) => ({
      url: getAbsoluteUrl(`/plans/${plan.slug}`, origin),
      lastModified: plan.updatedAt ? new Date(plan.updatedAt) : now
    }))
  ];
}
