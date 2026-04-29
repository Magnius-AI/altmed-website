import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BlogCategory, BlogPost, BlogTag } from "../../database/entities";
import {
  CreateBlogPostDto,
  CreateBlogTaxonomyDto,
  UpdateBlogPostDto,
  UpdateBlogTaxonomyDto
} from "./dto";

type BlogTaxonomyWithUsage = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  usageCount: number;
  updatedAt: Date;
};

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost) private readonly repository: Repository<BlogPost>,
    @InjectRepository(BlogCategory)
    private readonly categoryRepository: Repository<BlogCategory>,
    @InjectRepository(BlogTag)
    private readonly tagRepository: Repository<BlogTag>
  ) {}

  async findPublished(): Promise<BlogPost[]> {
    return this.repository.find({
      where: { published: true },
      order: { featured: "DESC", publishedAt: "DESC", createdAt: "DESC" }
    });
  }

  async findAdmin(): Promise<BlogPost[]> {
    return this.repository.find({ order: { featured: "DESC", updatedAt: "DESC" } });
  }

  async findBySlug(slug: string): Promise<BlogPost> {
    const post = await this.repository.findOne({ where: { slug, published: true } });
    if (!post) {
      throw new NotFoundException("Blog post not found");
    }
    return post;
  }

  async findById(id: string): Promise<BlogPost> {
    const post = await this.repository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException("Blog post not found");
    }
    return post;
  }

  async create(dto: CreateBlogPostDto): Promise<BlogPost> {
    await this.ensureTaxonomies(dto.category, dto.tags);
    return this.repository.save(
      this.repository.create({
        ...dto,
        tags: this.normalizeTags(dto.tags),
        faqs: this.normalizeFaqs(dto.faqs),
        publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : null
      })
    );
  }

  async update(id: string, dto: UpdateBlogPostDto): Promise<BlogPost> {
    const post = await this.findById(id);
    const nextCategory = dto.category !== undefined ? dto.category : post.category ?? undefined;
    const nextTags = dto.tags !== undefined ? dto.tags : post.tags ?? undefined;

    await this.ensureTaxonomies(nextCategory, nextTags);

    Object.assign(post, dto, {
      tags: dto.tags !== undefined ? this.normalizeTags(dto.tags) : post.tags,
      faqs: dto.faqs !== undefined ? this.normalizeFaqs(dto.faqs) : post.faqs,
      publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : post.publishedAt
    });

    return this.repository.save(post);
  }

  async remove(id: string): Promise<{ success: boolean }> {
    await this.repository.delete(id);
    return { success: true };
  }

  async categories(): Promise<string[]> {
    const categories = await this.categoryRepository.find({
      where: { isActive: true },
      order: { name: "ASC" }
    });
    if (categories.length) {
      return categories.map((category) => category.name);
    }

    const rows = await this.repository
      .createQueryBuilder("post")
      .select("DISTINCT post.category", "category")
      .where("post.category IS NOT NULL")
      .andWhere("post.category <> ''")
      .orderBy("post.category", "ASC")
      .getRawMany<{ category: string }>();

    return rows.map((row) => row.category);
  }

  async adminCategories(): Promise<BlogTaxonomyWithUsage[]> {
    const categories = await this.categoryRepository.find({ order: { name: "ASC" } });
    const usage = await this.getCategoryUsage();
    return categories.map((category) => ({
      ...category,
      usageCount: usage.get(category.name) ?? 0
    }));
  }

  async adminTags(): Promise<BlogTaxonomyWithUsage[]> {
    const tags = await this.tagRepository.find({ order: { name: "ASC" } });
    const usage = await this.getTagUsage();
    return tags.map((tag) => ({
      ...tag,
      usageCount: usage.get(tag.name) ?? 0
    }));
  }

  async createCategory(dto: CreateBlogTaxonomyDto): Promise<BlogCategory> {
    return this.categoryRepository.save(
      this.categoryRepository.create({
        name: dto.name.trim(),
        slug: this.resolveSlug(dto),
        description: dto.description?.trim() || null,
        isActive: dto.isActive ?? true
      })
    );
  }

  async updateCategory(id: string, dto: UpdateBlogTaxonomyDto): Promise<BlogCategory> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException("Blog category not found");
    }

    const previousName = category.name;
    Object.assign(category, {
      name: dto.name?.trim() ?? category.name,
      slug: dto.slug ? this.slugify(dto.slug) : dto.name ? this.slugify(dto.name) : category.slug,
      description: dto.description !== undefined ? dto.description.trim() || null : category.description,
      isActive: dto.isActive ?? category.isActive
    });

    if (dto.name && dto.name.trim() !== previousName) {
      const posts = await this.repository.find({ where: { category: previousName } });
      for (const post of posts) {
        post.category = category.name;
      }
      await this.repository.save(posts);
    }

    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: string): Promise<{ success: boolean }> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException("Blog category not found");
    }

    const posts = await this.repository.find({ where: { category: category.name } });
    for (const post of posts) {
      post.category = null;
    }
    await this.repository.save(posts);
    await this.categoryRepository.delete(id);
    return { success: true };
  }

  async createTag(dto: CreateBlogTaxonomyDto): Promise<BlogTag> {
    return this.tagRepository.save(
      this.tagRepository.create({
        name: dto.name.trim(),
        slug: this.resolveSlug(dto),
        description: dto.description?.trim() || null,
        isActive: dto.isActive ?? true
      })
    );
  }

  async updateTag(id: string, dto: UpdateBlogTaxonomyDto): Promise<BlogTag> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException("Blog tag not found");
    }

    const previousName = tag.name;
    Object.assign(tag, {
      name: dto.name?.trim() ?? tag.name,
      slug: dto.slug ? this.slugify(dto.slug) : dto.name ? this.slugify(dto.name) : tag.slug,
      description: dto.description !== undefined ? dto.description.trim() || null : tag.description,
      isActive: dto.isActive ?? tag.isActive
    });

    if (dto.name && dto.name.trim() !== previousName) {
      const posts = await this.repository.find();
      const postsToUpdate = posts.filter((post) => post.tags?.includes(previousName));
      for (const post of postsToUpdate) {
        post.tags = (post.tags ?? []).map((value) => (value === previousName ? tag.name : value));
      }
      await this.repository.save(postsToUpdate);
    }

    return this.tagRepository.save(tag);
  }

  async deleteTag(id: string): Promise<{ success: boolean }> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException("Blog tag not found");
    }

    const posts = await this.repository.find();
    const postsToUpdate = posts.filter((post) => post.tags?.includes(tag.name));
    for (const post of postsToUpdate) {
      post.tags = (post.tags ?? []).filter((value) => value !== tag.name);
    }
    await this.repository.save(postsToUpdate);
    await this.tagRepository.delete(id);
    return { success: true };
  }

  private async ensureTaxonomies(category?: string, tags?: string[]) {
    const cleanedCategory = category?.trim();
    if (cleanedCategory) {
      const existingCategory = await this.categoryRepository.findOne({ where: { name: cleanedCategory } });
      if (!existingCategory) {
        await this.categoryRepository.save(
          this.categoryRepository.create({
            name: cleanedCategory,
            slug: this.slugify(cleanedCategory),
            isActive: true
          })
        );
      }
    }

    const normalizedTags = this.normalizeTags(tags);
    for (const tagName of normalizedTags) {
      const existingTag = await this.tagRepository.findOne({ where: { name: tagName } });
      if (!existingTag) {
        await this.tagRepository.save(
          this.tagRepository.create({
            name: tagName,
            slug: this.slugify(tagName),
            isActive: true
          })
        );
      }
    }
  }

  private async getCategoryUsage() {
    const rows = await this.repository
      .createQueryBuilder("post")
      .select("post.category", "name")
      .addSelect("COUNT(*)", "count")
      .where("post.category IS NOT NULL")
      .andWhere("post.category <> ''")
      .groupBy("post.category")
      .getRawMany<{ name: string; count: string }>();

    return new Map(rows.map((row) => [row.name, Number(row.count)]));
  }

  private async getTagUsage() {
    const posts = await this.repository.find({ select: { tags: true } });
    const usage = new Map<string, number>();

    posts.forEach((post) => {
      (post.tags ?? []).forEach((tag) => {
        usage.set(tag, (usage.get(tag) ?? 0) + 1);
      });
    });

    return usage;
  }

  private normalizeTags(tags?: string[]) {
    return (tags ?? [])
      .map((tag) => tag.trim())
      .filter(Boolean)
      .filter((tag, index, values) => values.indexOf(tag) === index);
  }

  private normalizeFaqs(faqs?: Array<{ question: string; answer: string }>) {
    return (faqs ?? [])
      .map((faq) => ({
        question: String(faq.question ?? "").trim(),
        answer: String(faq.answer ?? "").trim()
      }))
      .filter((faq) => faq.question && faq.answer);
  }

  private resolveSlug(dto: CreateBlogTaxonomyDto | UpdateBlogTaxonomyDto) {
    return this.slugify(dto.slug?.trim() || dto.name?.trim() || "");
  }

  private slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
}
