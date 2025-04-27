import { Repository } from "typeorm";
import { Summarize } from "../entities/Summarize.entity";
import SummarizeRepository from "../repositories/Summarize.repository";
import Pagination from "../types/Pagination";

export class SummarizeService {
  private userRepository: Repository<Summarize>;

  constructor() {
    this.userRepository = SummarizeRepository
  }

  public async index(page: number, limit: number): Promise<Pagination> {
    const [users, total] = await this.userRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: {
        created_at: "ASC",
      }
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: users,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    }

  }

  public async create(data: any): Promise<Summarize[]> {
    // Placeholder for the actual summarization logic
    const summarize = this.userRepository.create(data);

    return await this.userRepository.save(summarize)
  }
}