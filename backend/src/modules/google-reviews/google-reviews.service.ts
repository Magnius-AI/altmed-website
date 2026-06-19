import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThanOrEqual, Repository } from "typeorm";
import { GoogleReview } from "../../database/entities";
import { CreateGoogleReviewDto, UpdateGoogleReviewDto } from "./dto";

@Injectable()
export class GoogleReviewsService {
  constructor(
    @InjectRepository(GoogleReview) private readonly repository: Repository<GoogleReview>
  ) {}

  findPublic() {
    return this.repository.find({
      where: { isActive: true, rating: MoreThanOrEqual(4) },
      order: { displayOrder: "ASC", reviewDate: "DESC", createdAt: "DESC" },
      take: 6
    });
  }

  findAdmin() {
    return this.repository.find({
      order: { displayOrder: "ASC", reviewDate: "DESC", createdAt: "DESC" }
    });
  }

  create(dto: CreateGoogleReviewDto) {
    return this.repository.save(this.repository.create(this.toEntityPayload(dto)));
  }

  async update(id: string, dto: UpdateGoogleReviewDto) {
    const review = await this.repository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException("Google review not found");
    }

    Object.assign(review, this.toEntityPayload(dto));
    return this.repository.save(review);
  }

  async remove(id: string) {
    await this.repository.delete(id);
    return { success: true };
  }

  private toEntityPayload(dto: CreateGoogleReviewDto | UpdateGoogleReviewDto): Partial<GoogleReview> {
    const payload: Partial<GoogleReview> = {};

    if (dto.reviewerName !== undefined) {
      payload.reviewerName = dto.reviewerName.trim();
    }

    if (dto.rating !== undefined) {
      payload.rating = dto.rating;
    }

    if (dto.reviewText !== undefined) {
      payload.reviewText = dto.reviewText.trim();
    }

    if (dto.reviewDate !== undefined) {
      payload.reviewDate = dto.reviewDate ? new Date(dto.reviewDate) : null;
    }

    if (dto.sourceUrl !== undefined) {
      payload.sourceUrl = dto.sourceUrl.trim() || null;
    }

    if (dto.displayOrder !== undefined) {
      payload.displayOrder = dto.displayOrder;
    }

    if (dto.isActive !== undefined) {
      payload.isActive = dto.isActive;
    }

    return payload;
  }
}
