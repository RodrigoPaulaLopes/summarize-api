import { Repository } from "typeorm";
import { Summarize } from "../entities/Summarize.entity";
import SummarizeRepository from "../repositories/Summarize.repository";
import Pagination from "../types/Pagination";
import AppError from "../errors/error";
import ChatGPT from "../api/chatgpt";
import { CreateSummarize } from "../types/Summarize";

export class SummarizeService {
  private userRepository: Repository<Summarize>;
  private readonly chatgpt: ChatGPT;

  constructor() {
    this.userRepository = SummarizeRepository
    this.chatgpt = new ChatGPT();
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

  public async create(data: CreateSummarize): Promise<any> {
    const response = await this.chatgpt.summarizeAndImprove(data.content)

    if (!response) {
      throw new AppError("Failed to summarize the text", 400);
    }

    data.content = response;
    // Placeholder for the actual summarization logic
    const summarize = this.userRepository.create(data);
    return await this.userRepository.save(summarize)
  }

  public async show(id: string): Promise<Summarize> {
    const summarize = await this.userRepository.findOneBy({ id });

    if (!summarize) {
      throw new AppError("Summarization not found", 404);
    }

    return summarize;
  }

  public async update(id: string, data: any): Promise<Summarize | null> {
    const summarize = await this.userRepository.findOneBy({ id });

    if (!summarize) {
      throw new AppError("Summarization not found", 404);
    }

    await this.userRepository.update(id, data);

    return await this.userRepository.findOneBy({ id });
  }

  public async delete(id: string): Promise<void> {
    const summarize = await this.userRepository.findOneBy({ id });

    if (!summarize) {
      throw new AppError("Summarization not found", 404);
    }

    await this.userRepository.delete(id);
  }
}