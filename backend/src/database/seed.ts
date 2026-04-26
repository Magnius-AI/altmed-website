import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import * as bcrypt from "bcrypt";
import configuration from "../config/configuration";
import {
  AnalyticsEvent,
  Announcement,
  BlogCategory,
  BlogPost,
  BlogTag,
  ContactSubmission,
  FAQ,
  Provider,
  ServicePage,
  SiteSettings,
  User
} from "./entities";
import { blogCategorySeed, blogSeed, blogTagSeed, faqSeed, servicePagesSeed } from "./seed-data";

const config = configuration();

const dataSource = new DataSource({
  type: "postgres",
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  entities: [
    User,
    BlogPost,
    BlogCategory,
    BlogTag,
    FAQ,
    Announcement,
    ContactSubmission,
    ServicePage,
    Provider,
    SiteSettings,
    AnalyticsEvent
  ],
  synchronize: true
});

async function seed() {
  await dataSource.initialize();

  const userRepo = dataSource.getRepository(User);
  const blogRepo = dataSource.getRepository(BlogPost);
  const blogCategoryRepo = dataSource.getRepository(BlogCategory);
  const blogTagRepo = dataSource.getRepository(BlogTag);
  const faqRepo = dataSource.getRepository(FAQ);
  const announcementsRepo = dataSource.getRepository(Announcement);
  const servicePageRepo = dataSource.getRepository(ServicePage);
  const providerRepo = dataSource.getRepository(Provider);
  const settingsRepo = dataSource.getRepository(SiteSettings);

  const admin = await userRepo.findOne({ where: { email: "admin@altmedfirst.com" } });
  if (!admin) {
    await userRepo.save(
      userRepo.create({
        email: "admin@altmedfirst.com",
        passwordHash: await bcrypt.hash("Altmed2009$", 12),
        role: "admin",
        name: "Altmed Administrator",
        isActive: true
      })
    );
  }

  for (const page of servicePagesSeed) {
    const existing = await servicePageRepo.findOne({ where: { slug: page.slug } });
    if (!existing) {
      await servicePageRepo.save(servicePageRepo.create(page));
    }
  }

  let displayOrder = 1;
  for (const [category, question, answer] of faqSeed) {
    const existing = await faqRepo.findOne({ where: { question } });
    if (!existing) {
      await faqRepo.save(
        faqRepo.create({ category, question, answer, displayOrder: displayOrder++, isActive: true })
      );
    }
  }

  for (const category of blogCategorySeed) {
    const existing = await blogCategoryRepo.findOne({ where: { slug: category.slug } });
    if (!existing) {
      await blogCategoryRepo.save(blogCategoryRepo.create({ ...category, isActive: true }));
    }
  }

  for (const tag of blogTagSeed) {
    const existing = await blogTagRepo.findOne({ where: { slug: tag.slug } });
    if (!existing) {
      await blogTagRepo.save(blogTagRepo.create({ ...tag, isActive: true }));
    }
  }

  for (const post of blogSeed) {
    const existing = await blogRepo.findOne({ where: { slug: post.slug } });
    if (!existing) {
      await blogRepo.save(
        blogRepo.create({
          ...post,
          tags: post.tags ? [...post.tags] : undefined
        })
      );
    }
  }

  if (!(await announcementsRepo.count())) {
    await announcementsRepo.save(
      announcementsRepo.create({
        title: "Welcome to Altmed Medical Center",
        body: "Now accepting new patients! Walk-ins welcome Mon–Fri, 9 AM–5 PM. Telehealth available. Call (703) 361-4357 to learn more.",
        type: "General",
        priority: "Normal",
        startDate: new Date(),
        showOnHomepageBanner: true,
        pinned: true,
        isActive: true
      })
    );
  }

  const settings = [
    {
      key: "nap",
      value: {
        clinicName: "Altmed Medical Center",
        address: "8551 Rixlew Lane, Suite 140, Manassas, VA 20109",
        phone: "(703) 361-4357",
        email: "info@altmedfirst.com",
        canonicalUrl: "https://altmedfirst.com"
      }
    },
    {
      key: "hours",
      value: {
        weekdays: { open: "09:00", close: "17:00" },
        saturday: { closed: true },
        sunday: { closed: true }
      }
    },
    {
      key: "social",
      value: {
        facebook: "https://www.facebook.com/p/Altmed-Medical-Center-100050878933887/",
        instagram: "@altmed_medical",
        yelp: "https://www.yelp.com/biz/altmed-medical-center-manassas-2"
      }
    },
    {
      key: "seo_defaults",
      value: {
        titleSuffix: "| Altmed Medical Center",
        ogImage: "/images/og-default.webp",
        descriptionTemplate: "Altmed Medical Center provides trusted care in Manassas, VA."
      }
    },
    {
      key: "navigation",
      value: {
        mainMenu: [
          { id: "home", label: "Home", href: "/" },
          {
            id: "about",
            label: "About",
            href: "/about",
            children: [
              { id: "about-team", label: "Our Team", href: "/about#team" },
              { id: "about-mission", label: "Our Mission", href: "/about#mission" }
            ]
          },
          {
            id: "services",
            label: "Services",
            href: "/services",
            children: [
              { id: "urgent-care", label: "Urgent Care", href: "/services/urgent-care-manassas-va" },
              { id: "primary-care", label: "Primary Care", href: "/services/primary-care-manassas-va" },
              { id: "occupational-health", label: "Occupational Health", href: "/services/occupational-health-clinic-manassas" },
              { id: "weight-loss", label: "Medical Weight Loss", href: "/services/medical-weight-loss-manassas" }
            ]
          },
          { id: "forms", label: "Patient Forms", href: "/patient-forms" },
          { id: "blog", label: "Blog", href: "/health-blogs" },
          { id: "faq", label: "FAQs", href: "/faq" },
          { id: "contact", label: "Contact", href: "/contact" }
        ]
      }
    }
  ];

  for (const setting of settings) {
    const existing = await settingsRepo.findOne({ where: { key: setting.key } });
    if (!existing) {
      await settingsRepo.save(settingsRepo.create(setting));
    }
  }

  if (!(await providerRepo.count())) {
    await providerRepo.save(
      providerRepo.create({
        name: "Dr. Gerald K. Lee",
        credentials: "MD, PhD, MS",
        title: "Founder & Lead Physician",
        bio: "Dr. Gerald Lee combines frontline clinical care with advanced training in epidemiology and biostatistics to deliver evidence-based, compassionate medicine for families and employers across Northern Virginia.",
        photo: "/images/dr-lee-placeholder.webp",
        specialties: [
          "Obesity Medicine",
          "Addiction Medicine",
          "Pain Management",
          "Family Medicine",
          "Occupational Health",
          "Preventive Medicine"
        ],
        personalNote: "Comprehensive Care. Convenient Access. Trusted Expertise.",
        displayOrder: 1,
        isActive: true
      })
    );
  }

  await dataSource.destroy();
  console.log("Seed complete");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
