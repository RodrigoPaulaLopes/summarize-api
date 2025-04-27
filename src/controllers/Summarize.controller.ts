import { Request, Response } from "express";
import { SummarizeService } from "../services/Summarize.service";
import { Summarize } from "../entities/Summarize.entity";
import AppError from "../errors/error";




export class SummarizeController {

    private readonly summarizeService: SummarizeService;

    constructor() {
        this.summarizeService = new SummarizeService();
    }


    async index(req: Request, res: Response): Promise<any> {

        const page = Number(req.query.page) || 1; 
        const limit = Number(req.query.limit) || 10;

        const summarize = await this.summarizeService.index(page, limit)
        return res.status(200).json({data: summarize, message: ""})
    }
    async create(req: Request, res: Response): Promise<any> {
        const { title, content } = req.body// Placeholder for the actual summarization logic
        const data = await this.summarizeService.create({ title, content })
        return res.status(201).json({data, message: "Summarization created successfully" })
    }
}