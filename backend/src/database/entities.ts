import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({ default: "admin" })
  role!: string;

  @Column({ type: "varchar", nullable: true })
  name!: string | null;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

@Entity("blog_posts")
export class BlogPost {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column({ unique: true })
  slug!: string;

  @Column("text")
  body!: string;

  @Column({ type: "text", nullable: true })
  excerpt!: string | null;

  @Column({ type: "varchar", nullable: true })
  featuredImage!: string | null;

  @Column({ type: "varchar", nullable: true })
  featuredImageAlt!: string | null;

  @Column({ type: "varchar", nullable: true })
  metaTitle!: string | null;

  @Column({ type: "text", nullable: true })
  metaDescription!: string | null;

  @Column({ type: "text", nullable: true })
  metaKeywords!: string | null;

  @Column({ type: "varchar", nullable: true })
  canonicalUrl!: string | null;

  @Column({ type: "varchar", nullable: true })
  author!: string | null;

  @Column({ type: "varchar", nullable: true })
  category!: string | null;

  @Column("simple-array", { nullable: true })
  tags!: string[] | null;

  @Column({ default: false })
  featured!: boolean;

  @Column({ default: false })
  published!: boolean;

  @Column({ nullable: true, type: "timestamp" })
  publishedAt!: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

@Entity("blog_categories")
export class BlogCategory {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

@Entity("blog_tags")
export class BlogTag {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

@Entity("faqs")
export class FAQ {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("text")
  question!: string;

  @Column("text")
  answer!: string;

  @Column()
  category!: string;

  @Column({ default: 0 })
  displayOrder!: number;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

@Entity("announcements")
export class Announcement {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column("text")
  body!: string;

  @Column({ type: "varchar", default: "General" })
  type!: string;

  @Column({ type: "varchar", default: "Normal" })
  priority!: string;

  @Column({ type: "timestamp" })
  startDate!: Date;

  @Column({ nullable: true, type: "timestamp" })
  endDate!: Date | null;

  @Column({ default: false })
  showOnHomepageBanner!: boolean;

  @Column({ default: false })
  pinned!: boolean;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

@Entity("contact_submissions")
export class ContactSubmission {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  fullName!: string;

  @Column()
  phone!: string;

  @Column()
  email!: string;

  @Column({ type: "varchar", nullable: true })
  preferredContactMethod!: string | null;

  @Column({ type: "varchar", nullable: true })
  subject!: string | null;

  @Column("text")
  message!: string;

  @Column({ default: false })
  isBot!: boolean;

  @Column({ type: "varchar", nullable: true })
  botReason!: string | null;

  @Column({ type: "varchar", nullable: true })
  ipAddress!: string | null;

  @Column({ nullable: true, type: "float" })
  recaptchaScore!: number | null;

  @Column({ default: false })
  reviewed!: boolean;

  @CreateDateColumn({ name: "submitted_at" })
  submittedAt!: Date;
}

@Entity("service_pages")
export class ServicePage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  name!: string;

  @Column("text", { nullable: true })
  heroContent!: string | null;

  @Column("text", { nullable: true })
  bodyContent!: string | null;

  @Column({ type: "varchar", nullable: true })
  metaTitle!: string | null;

  @Column({ type: "text", nullable: true })
  metaDescription!: string | null;

  @Column({ type: "text", nullable: true })
  metaKeywords!: string | null;

  @Column({ type: "varchar", nullable: true })
  featuredImage!: string | null;

  @Column({ default: true })
  isActive!: boolean;

  @UpdateDateColumn()
  updatedAt!: Date;
}

@Entity("providers")
export class Provider {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ type: "varchar", nullable: true })
  credentials!: string | null;

  @Column({ type: "varchar", nullable: true })
  title!: string | null;

  @Column("text", { nullable: true })
  bio!: string | null;

  @Column({ type: "varchar", nullable: true })
  photo!: string | null;

  @Column("simple-array", { nullable: true })
  specialties!: string[] | null;

  @Column({ type: "text", nullable: true })
  personalNote!: string | null;

  @Column({ default: 0 })
  displayOrder!: number;

  @Column({ default: true })
  isActive!: boolean;
}

@Entity("site_settings")
export class SiteSettings {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  key!: string;

  @Column("jsonb")
  value!: Record<string, unknown>;

  @UpdateDateColumn()
  updatedAt!: Date;
}

@Entity("analytics_events")
export class AnalyticsEvent {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  eventName!: string;

  @Column({ nullable: true, type: "text" })
  eventData!: string | null;

  @Column({ type: "varchar", nullable: true })
  sessionId!: string | null;

  @Column({ type: "varchar", nullable: true })
  ipAddress!: string | null;

  @CreateDateColumn()
  createdAt!: Date;
}
