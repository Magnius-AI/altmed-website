import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { Announcement } from "../../database/entities";
import { CreateAnnouncementDto, UpdateAnnouncementDto } from "./dto";

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement) private readonly repository: Repository<Announcement>
  ) {}

  async active() {
    const now = new Date();
    return this.repository.find({
      where: [
        { isActive: true, startDate: LessThanOrEqual(now), endDate: MoreThanOrEqual(now) },
        { isActive: true, startDate: LessThanOrEqual(now), endDate: IsNull() }
      ],
      order: { pinned: "DESC", startDate: "DESC" }
    });
  }

  async banner() {
    const active = await this.active();
    return active.find((announcement) => announcement.showOnHomepageBanner) ?? null;
  }

  admin() {
    return this.repository.find({ order: { startDate: "DESC" } });
  }

  create(dto: CreateAnnouncementDto) {
    return this.repository.save(
      this.repository.create({
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null
      })
    );
  }

  async update(id: string, dto: UpdateAnnouncementDto) {
    const announcement = await this.repository.findOne({ where: { id } });
    if (!announcement) {
      throw new NotFoundException("Announcement not found");
    }
    Object.assign(announcement, dto, {
      startDate: dto.startDate ? new Date(dto.startDate) : announcement.startDate,
      endDate: dto.endDate ? new Date(dto.endDate) : announcement.endDate
    });
    return this.repository.save(announcement);
  }

  async remove(id: string) {
    await this.repository.delete(id);
    return { success: true };
  }
}
