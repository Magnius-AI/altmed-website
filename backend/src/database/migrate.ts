import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
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

const config = configuration();

const dataSource = new DataSource({
  type: "postgres",
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  ssl: config.app.environment === "production"
    ? { rejectUnauthorized: false }
    : false,
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
  synchronize: true, // In production consider using migrations instead
  logging: true,
});

async function migrate() {
  try {
    console.log("🔄 Connecting to database...");
    await dataSource.initialize();
    console.log("✅ Database connected");

    console.log("🔄 Running synchronization...");
    await dataSource.synchronize();
    console.log("✅ Database schema synchronized");

    await dataSource.destroy();
    console.log("✅ Migration complete");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migrate();