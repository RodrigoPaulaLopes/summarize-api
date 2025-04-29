import { Request, Response } from "express";
import { SummarizeService } from "../services/Summarize.service";
import SummarizeRepository from "../repositories/Summarize.repository";
import ChatGPT from "../api/chatgpt";


export class SummarizeController {

    private readonly summarizeService: SummarizeService;

    constructor() {
        this.summarizeService = new SummarizeService(SummarizeRepository, new ChatGPT());
    }


    async index(req: Request, res: Response): Promise<any> {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const user = req.user

        const summarize = await this.summarizeService.index(user, page, limit)
        return res.status(200).json({ data: summarize, message: "" })
    }
    async create(req: Request, res: Response): Promise<any> {
        const { title, content } = req.body
        const user = req.user
        // ceholder for the actual summarization logic
        const data = await this.summarizeService.create( { title, content, user })
        return res.status(201).json({ data, message: "Summarization created successfully" })
    }

    async show(req: Request, res: Response): Promise<any> {
        const { id } = req.params
        const user = req.user
        const summarize = await this.summarizeService.show(user, id)
        return res.status(200).json({ data: summarize, message: `Summarization with id ${id} retrieved successfully` })
    }
    async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params
        const { title, content } = req.body

        const summarize = await this.summarizeService.update(id, { title, content })

        return res.status(200).json({ data: summarize, message: `Summarization with id ${id} updated successfully` })
    }

    async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params
        const user = req.user
        const summarize = await this.summarizeService.delete(user, id)
        return res.status(200).json({ data: summarize, message: `Summarization with id ${id} deleted successfully` })
    }
}