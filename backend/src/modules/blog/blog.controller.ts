import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import {
  CreateBlogPostDto,
  CreateBlogTaxonomyDto,
  UpdateBlogPostDto,
  UpdateBlogTaxonomyDto
} from "./dto";
import { BlogService } from "./blog.service";

@Controller("blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findPublished() {
    return this.blogService.findPublished();
  }

  @Get("categories")
  categories() {
    return this.blogService.categories();
  }

  @Get("admin")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  findAdmin() {
    return this.blogService.findAdmin();
  }

  @Get("admin/categories")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  adminCategories() {
    return this.blogService.adminCategories();
  }

  @Get("admin/tags")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  adminTags() {
    return this.blogService.adminTags();
  }

  @Get("admin/:id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  findById(@Param("id") id: string) {
    return this.blogService.findById(id);
  }

  @Get(":slug")
  findBySlug(@Param("slug") slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  create(@Body() dto: CreateBlogPostDto) {
    return this.blogService.create(dto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  update(@Param("id") id: string, @Body() dto: UpdateBlogPostDto) {
    return this.blogService.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  remove(@Param("id") id: string) {
    return this.blogService.remove(id);
  }

  @Post("admin/categories")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  createCategory(@Body() dto: CreateBlogTaxonomyDto) {
    return this.blogService.createCategory(dto);
  }

  @Patch("admin/categories/:id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  updateCategory(@Param("id") id: string, @Body() dto: UpdateBlogTaxonomyDto) {
    return this.blogService.updateCategory(id, dto);
  }

  @Delete("admin/categories/:id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  removeCategory(@Param("id") id: string) {
    return this.blogService.deleteCategory(id);
  }

  @Post("admin/tags")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  createTag(@Body() dto: CreateBlogTaxonomyDto) {
    return this.blogService.createTag(dto);
  }

  @Patch("admin/tags/:id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  updateTag(@Param("id") id: string, @Body() dto: UpdateBlogTaxonomyDto) {
    return this.blogService.updateTag(id, dto);
  }

  @Delete("admin/tags/:id")
  @UseGuards(JwtAuthGuard)
  @Roles("admin")
  removeTag(@Param("id") id: string) {
    return this.blogService.deleteTag(id);
  }
}
