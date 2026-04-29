import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { create } from "xmlbuilder2";
import { Repository } from "typeorm";
import { BlogPost, ServicePage, SiteSettings, TreatmentPlan } from "../../database/entities";

@Injectable()
export class SeoService {
  constructor(
    @InjectRepository(BlogPost) private readonly blogRepository: Repository<BlogPost>,
    @InjectRepository(ServicePage)
    private readonly servicesRepository: Repository<ServicePage>,
    @InjectRepository(SiteSettings)
    private readonly settingsRepository: Repository<SiteSettings>,
    @InjectRepository(TreatmentPlan)
    private readonly treatmentPlansRepository: Repository<TreatmentPlan>
  ) {}

  async sitemapXml() {
    const baseUrl = "https://altmedfirst.com";
    const blogPosts = await this.blogRepository.find({ where: { published: true } });
    const servicePages = await this.servicesRepository.find({ where: { isActive: true } });
    const treatmentPlans = await this.treatmentPlansRepository.find({ where: { isActive: true } });
    const staticPaths = [
      { path: "", priority: "1.0" },
      { path: "/services", priority: "0.9" },
      { path: "/plans", priority: "0.9" },
      { path: "/health-blogs", priority: "0.7" },
      { path: "/faqs", priority: "0.6" },
      { path: "/contact-us", priority: "0.6" },
      { path: "/about-us", priority: "0.6" },
      { path: "/announcements", priority: "0.6" },
      { path: "/appointment", priority: "0.6" }
    ];

    const doc = create({ version: "1.0", encoding: "UTF-8" }).ele("urlset", {
      xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
    });

    staticPaths.forEach((item) => {
      doc.ele("url").ele("loc").txt(`${baseUrl}${item.path}`).up().ele("priority").txt(item.priority);
    });

    servicePages.forEach((page) => {
      doc.ele("url").ele("loc").txt(`${baseUrl}/services/${page.slug}`).up().ele("priority").txt("0.9");
    });

    blogPosts.forEach((post) => {
      doc
        .ele("url")
        .ele("loc")
        .txt(`${baseUrl}/health-blogs/${post.slug}`)
        .up()
        .ele("priority")
        .txt("0.7");
    });

    treatmentPlans.forEach((plan) => {
      doc
        .ele("url")
        .ele("loc")
        .txt(`${baseUrl}/plans/${plan.slug}`)
        .up()
        .ele("priority")
        .txt("0.8");
    });

    return doc.end({ prettyPrint: true });
  }

  robotsTxt() {
    return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*
Disallow: /dashboard/
Disallow: /login
Disallow: /api/
Sitemap: https://altmedfirst.com/sitemap.xml`;
  }

  async defaults() {
    return this.settingsRepository.findOne({ where: { key: "seo_defaults" } });
  }

  async updateDefaults(value: Record<string, unknown>) {
    const existing = await this.defaults();
    if (existing) {
      existing.value = value;
      return this.settingsRepository.save(existing);
    }
    return this.settingsRepository.save(
      this.settingsRepository.create({ key: "seo_defaults", value })
    );
  }

  clinicSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      name: "Altmed Medical Center",
      url: "https://altmedfirst.com",
      telephone: "+17033614357",
      email: "info@altmedfirst.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "8551 Rixlew Lane, Suite 140",
        addressLocality: "Manassas",
        addressRegion: "VA",
        postalCode: "20109",
        addressCountry: "US"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 38.7509,
        longitude: -77.4753
      }
    };
  }
}
