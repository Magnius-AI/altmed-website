import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Provider } from "../../database/entities";
import { CreateProviderDto, ReorderProvidersDto, UpdateProviderDto } from "./dto";

@Injectable()
export class ProvidersService {
  constructor(@InjectRepository(Provider) private readonly repository: Repository<Provider>) {}

  findPublic() {
    return this.repository.find({
      where: { isActive: true },
      order: { displayOrder: "ASC", name: "ASC" }
    });
  }

  findAdmin() {
    return this.repository.find({ order: { displayOrder: "ASC", name: "ASC" } });
  }

  create(dto: CreateProviderDto) {
    return this.repository.save(this.repository.create(dto));
  }

  async update(id: string, dto: UpdateProviderDto) {
    await this.repository.update({ id }, dto);
    return this.repository.findOneByOrFail({ id });
  }

  async reorder(dto: ReorderProvidersDto) {
    await Promise.all(
      dto.items.map((item) =>
        this.repository.update({ id: item.id }, { displayOrder: item.displayOrder })
      )
    );
    return { success: true };
  }

  async remove(id: string) {
    await this.repository.delete(id);
    return { success: true };
  }
}
