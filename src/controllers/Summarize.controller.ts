import { Request, Response } from "express";
import { SummarizeService } from "../services/Summarize.service";
import { Summarize } from "../entities/Summarize.entity";




export class SummarizeController {

    private summarizeService: SummarizeService;

    constructor() {
        this.summarizeService = new SummarizeService();
    }


    async index(req: Request, res: Response): Promise<any> {

        const summarize = await this.summarizeService.index()
        res.status(200).json(summarize)
    }
    async create(req: Request, res: Response): Promise<any> {
        const { title, content } = req.body// Placeholder for the actual summarization logic
        this.summarizeService.create({ title, content })
        res.status(201).json({ message: "Summarization created successfully" })
    }
}