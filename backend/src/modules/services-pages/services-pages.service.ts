import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ServicePage } from "../../database/entities";
import { UpdateServicePageDto } from "./dto";

@Injectable()
export class ServicesPagesService {
  constructor(
    @InjectRepository(ServicePage) private readonly repository: Repository<ServicePage>
  ) {}

  findAllPublic() {
    return this.repository.find({
      where: { isActive: true },
      order: { name: "ASC" }
    });
  }

  async findBySlug(slug: string) {
    const page = await this.repository.findOne({ where: { slug } });
    if (!page) {
      throw new NotFoundException("Service page not found");
    }
    return page;
  }

  async update(slug: string, dto: UpdateServicePageDto) {
    const page = await this.findBySlug(slug);
    Object.assign(page, dto);
    return this.repository.save(page);
  }

  async toggle(slug: string) {
    const page = await this.findBySlug(slug);
    page.isActive = !page.isActive;
    return this.repository.save(page);
  }
}
