import type { MetadataRoute } from "next";
import { getBlogPosts, getTreatmentPlans } from "@/lib/api";
import { publicRoutes, serviceCards } from "@/lib/site-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, plans] = await Promise.all([getBlogPosts(), getTreatmentPlans()]);
  const now = new Date();
  const staticRoutes = [
    publicRoutes.home,
    publicRoutes.services,
    publicRoutes.plans,
    publicRoutes.about,
    publicRoutes.contact,
    publicRoutes.blog,
    publicRoutes.faq,
    publicRoutes.forms,
    publicRoutes.appointment,
    publicRoutes.telehealth
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `https://stage.altmedfirst.com${route === "/" ? "" : route}`,
      lastModified: now
    })),
    ...serviceCards.map((service) => ({
      url: `https://stage.altmedfirst.com/services/${service.slug}`,
      lastModified: now
    })),
    ...posts.map((post) => ({
      url: `https://stage.altmedfirst.com/health-blogs/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : now
    })),
    ...plans.map((plan) => ({
      url: `https://stage.altmedfirst.com/plans/${plan.slug}`,
      lastModified: plan.updatedAt ? new Date(plan.updatedAt) : now
    }))
  ];
}
