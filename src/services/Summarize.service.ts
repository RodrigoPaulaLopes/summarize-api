import { Repository } from "typeorm";
import { Summarize } from "../entities/Summarize.entity";
import SummarizeRepository from "../repositories/Summarize.repository";

export class SummarizeService {
  private userRepository: Repository<Summarize>;

  constructor() {
    this.userRepository = SummarizeRepository
  }

  public async index(): Promise<Summarize[]> {
    return await this.userRepository.find();
  }

  public async create(data: any): Promise<Summarize[]> {
    // Placeholder for the actual summarization logic
    const summarize = this.userRepository.create(data);

    return await this.userRepository.save(summarize)
  }
}