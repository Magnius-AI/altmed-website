import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { AnalyticsEvent } from "../../database/entities";
import { CreateAnalyticsEventDto } from "./dto";

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsEvent) private readonly repository: Repository<AnalyticsEvent>
  ) {}

  create(dto: CreateAnalyticsEventDto, ipAddress?: string) {
    return this.repository.save(
      this.repository.create({
        ...dto,
        ipAddress: ipAddress ?? null
      })
    );
  }

  async summary() {
    const since = new Date();
    since.setDate(since.getDate() - 30);
    const rows = await this.repository.find({
      where: { createdAt: Between(since, new Date()) },
      order: { createdAt: "DESC" }
    });

    const byName = rows.reduce<Record<string, number>>((acc, row) => {
      acc[row.eventName] = (acc[row.eventName] ?? 0) + 1;
      return acc;
    }, {});
    return { total: rows.length, byName };
  }

  async chatbot() {
    const rows = await this.repository.find({
      where: [
        { eventName: "chatbot_opened" },
        { eventName: "chatbot_message_sent" },
        { eventName: "language_switched" },
        { eventName: "emergency_response_triggered" }
      ],
      order: { createdAt: "DESC" }
    });
    return rows;
  }
}
