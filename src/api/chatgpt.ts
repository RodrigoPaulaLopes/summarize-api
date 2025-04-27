import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

class ChatGPT {
    private readonly openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async summarizeAndImprove(text: string): Promise<string> {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "Você é um assistente que resume e melhora textos.",
                    },
                    {
                        role: "user",
                        content: `Por favor, resuma e melhore o seguinte texto: "${text}"`,
                    },
                ],
            });

            return response.choices[0]?.message?.content || "Erro ao processar a solicitação.";
        } catch (error) {
            console.error("Erro ao resumir e melhorar o texto:", error);
            throw new Error("Não foi possível processar o texto.");
        }
    }
}

export default ChatGPT;
