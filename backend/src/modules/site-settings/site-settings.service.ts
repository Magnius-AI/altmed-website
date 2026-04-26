import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SiteSettings } from "../../database/entities";
import { UpdateSiteSettingDto } from "./dto";

@Injectable()
export class SiteSettingsService {
  constructor(
    @InjectRepository(SiteSettings) private readonly repository: Repository<SiteSettings>
  ) {}

  findByKey(key: string) {
    return this.repository.findOne({ where: { key } });
  }

  findAll() {
    return this.repository.find({ order: { key: "ASC" } });
  }

  async update(key: string, dto: UpdateSiteSettingDto) {
    const existing = await this.repository.findOne({ where: { key } });
    if (existing) {
      existing.value = dto.value;
      return this.repository.save(existing);
    }
    return this.repository.save(this.repository.create({ key, value: dto.value }));
  }
}
