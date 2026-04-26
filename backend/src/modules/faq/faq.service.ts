import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FAQ } from "../../database/entities";
import { CreateFaqDto, ReorderFaqDto, UpdateFaqDto } from "./dto";

@Injectable()
export class FaqService {
  constructor(@InjectRepository(FAQ) private readonly repository: Repository<FAQ>) {}

  async findPublic() {
    const faqs = await this.repository.find({
      where: { isActive: true },
      order: { category: "ASC", displayOrder: "ASC" }
    });

    return faqs.reduce<Record<string, FAQ[]>>((acc, faq) => {
      acc[faq.category] = [...(acc[faq.category] ?? []), faq];
      return acc;
    }, {});
  }

  findAdmin() {
    return this.repository.find({ order: { category: "ASC", displayOrder: "ASC" } });
  }

  async schema() {
    const faqs = await this.repository.find({
      where: { isActive: true },
      order: { displayOrder: "ASC" }
    });
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    };
  }

  create(dto: CreateFaqDto) {
    return this.repository.save(this.repository.create(dto));
  }

  async update(id: string, dto: UpdateFaqDto) {
    const faq = await this.repository.findOne({ where: { id } });
    if (!faq) {
      throw new NotFoundException("FAQ not found");
    }
    Object.assign(faq, dto);
    return this.repository.save(faq);
  }

  async reorder(dto: ReorderFaqDto) {
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
