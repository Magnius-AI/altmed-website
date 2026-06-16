import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
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
    private readonly treatmentPlansRepository: Repository<TreatmentPlan>,
    private readonly configService: ConfigService
  ) {}

  private getBaseUrl() {
    const configured = this.configService.get<string>("app.frontendUrl") ?? "http://localhost:3000";
    try {
      const url = new URL(configured);
      url.hostname = url.hostname.replace(/^www\./i, "");
      return url.origin;
    } catch {
      return "http://localhost:3000";
    }
  }

  async sitemapXml() {
    const baseUrl = this.getBaseUrl();
    const blogPosts = await this.blogRepository.find({ where: { published: true } });
    const servicePages = await this.servicesRepository.find({ where: { isActive: true } });
    const treatmentPlans = await this.treatmentPlansRepository.find({ where: { isActive: true } });
    const staticPaths = [
      { path: "", priority: "1.0" },
      { path: "/services", priority: "0.9" },
      { path: "/plans", priority: "0.9" },
      { path: "/health-blogs", priority: "0.7" },
      { path: "/faq", priority: "0.6" },
      { path: "/contact", priority: "0.6" },
      { path: "/about", priority: "0.6" },
      { path: "/providers", priority: "0.6" },
      { path: "/patient-forms", priority: "0.6" },
      { path: "/telehealth-manassas", priority: "0.6" },
      { path: "/appointment", priority: "0.6" },
      { path: "/insurance-accepted-manassas", priority: "0.5" },
      { path: "/es", priority: "0.5" }
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
    const baseUrl = this.getBaseUrl();

    return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*
Disallow: /dashboard/
Disallow: /login
Disallow: /api/
Sitemap: ${baseUrl}/sitemap.xml`;
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
      url: this.getBaseUrl(),
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
