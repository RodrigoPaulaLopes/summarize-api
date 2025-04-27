import { EntityRepository, Repository } from "typeorm";
import AppDataSource from "../database/data-source";
import { Summarize } from "../entities/Summarize.entity";

const SummarizeRepository: Repository<Summarize> = AppDataSource.getRepository("summarize");

export default SummarizeRepository

