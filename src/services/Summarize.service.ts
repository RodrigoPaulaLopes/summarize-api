import { Repository } from "typeorm";
import { Summarize } from "../entities/Summarize.entity";
import summarizeRepository from "../repositories/Summarize.repository";
import Pagination from "../types/Pagination";
import AppError from "../errors/error";
import ChatGPT from "../api/chatgpt";
import { CreateSummarize } from "../types/Summarize";
import User from "../entities/User.entity";

export class SummarizeService {
  private summarizeRepository: Repository<Summarize>;
  private readonly chatgpt: ChatGPT;

  constructor(private readonly repository: Repository<Summarize>, gpt: ChatGPT) {
    this.summarizeRepository = repository
    this.chatgpt = gpt;
  }

  public async index(user: User,  page: number, limit: number): Promise<Pagination> {
    const [users, total] = await this.summarizeRepository.findAndCount({
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
    const summarize = this.summarizeRepository.create(data);
    return await this.summarizeRepository.save(summarize)
  }

  public async show(id: string): Promise<Summarize> {
    const summarize = await this.summarizeRepository.findOneBy({ id });

    if (!summarize) {
      throw new AppError("Summarization not found", 404);
    }

    return summarize;
  }

  public async update(id: string, data: CreateSummarize): Promise<Summarize | null> {
    const summarize = await this.summarizeRepository.findOneBy({ id });

    if (!summarize) {
      throw new AppError("Summarization not found", 404);
    }

    const response = await this.chatgpt.summarizeAndImprove(data.content)

    if (!response) {
      throw new AppError("Failed to summarize the text", 400);
    }
    data.content = response;

    await this.summarizeRepository.update(id, data);

    return await this.summarizeRepository.findOneBy({ id });
  }

  public async delete(id: string): Promise<void> {
    const summarize = await this.summarizeRepository.findOneBy({ id });

    if (!summarize) {
      throw new AppError("Summarization not found", 404);
    }

    await this.summarizeRepository.delete(id);
  }
}