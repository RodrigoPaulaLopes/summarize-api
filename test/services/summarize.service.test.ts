import { Repository } from 'typeorm';
import { SummarizeService } from '../../src/services/Summarize.service';
import { Summarize } from '../../src/entities/Summarize.entity';
import ChatGPT from '../../src/api/chatgpt';
import AppError from '../../src/errors/error';


describe('SummarizeService', () => {
    let summarizeService: SummarizeService;
    let summarizeRepository: jest.Mocked<Repository<Summarize>>;
    let chatgpt: jest.Mocked<ChatGPT>;
    const response = {
        "data": [
            {
                "id": "72f320d6-c13e-45ee-8479-2ccc25f44d01",
                "title": "O Apocalipse Chegou",
                "content": "Era um dia comum, tipo, sabe, quando o sol estava brilhando e as pessoas estavam andando por aí, sem saber que o apocalipse estava prestes a acontecer. De repente, tudo ficou escuro, como se alguém tivesse desligado o interruptor do sol, mas ninguém sabia o que estava acontecendo. O céu estava cheio de nuvens, mas não aquelas nuvens fofas, eram nuvens tipo... feias. E aí, do nada, começaram a cair uns meteoros, mas não eram meteoro, eram tipo bolas de fogo que caíam em câmera lenta. As pessoas começaram a correr, mas não para onde, porque não dava para saber para onde correr. Os carros estavam todos parados, mas não era um engarrafamento, era como se o mundo tivesse tirado férias. Um monte de pessoas estava tentando gritar, mas o som era abafado, como se alguém tivesse colocado um cobertor gigante em cima do som do mundo. Enquanto isso, de algum lugar distante, uma música tocava. Não era música boa, tipo música de apocalipse, mas era uma música de fundo que ninguém ligava. O mundo estava acabado, mas ninguém sabia exatamente o que estava acabando. Tudo estava, tipo, desmoronando, mas as pessoas estavam muito ocupadas comendo pizza, porque, bem, o apocalipse chegou e quem não ama uma boa pizza? No final, o apocalipse não foi tão apocalíptico. Algumas pessoas se salvaram, outras ficaram lá, mas ninguém sabia muito bem como ou por que. E no fim, todos apenas sentaram e olharam o céu... que ainda estava com aquelas nuvens feias. E a pizza? Ah, a pizza era boa, no fim.",
                "created_at": new Date("2025-04-27T23:22:02.657Z"),
                "updated_at": new Date("2025-04-27T23:22:02.657Z"),
                "user": {
                    "id": "a084fbca-b6c0-45c9-b57d-1dff7d48ec0b",
                    "first_name": null,
                    "last_name": null,
                    "email": "camille.lopes@yopmail.com",
                    "password": "$2b$10$ACRFM8UPwF1vDc7oa9NLBuIF4X8aAq2dVHErTuoVvQ4k5p73I.atq",
                    "created_at": "2025-04-29T15:37:18.144Z",
                    "updated_at": "2025-04-29T15:37:18.144Z"
                },
            }
        ],
        "pagination": {
            "total": 1,
            "totalPages": 1,
            "currentPage": 1,
            "limit": 10
        }
    };

    beforeEach(() => {
        summarizeRepository = {
            findAndCount: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findOneBy: jest.fn(),
        } as unknown as jest.Mocked<Repository<Summarize>>;

        chatgpt = {
            summarizeAndImprove: jest.fn().mockResolvedValue(response.data[0].content),
        } as unknown as jest.Mocked<ChatGPT>;

        summarizeService = new SummarizeService(summarizeRepository, chatgpt);

    });

    it('should create a new summarize', async () => {
        const newSummarize = {
            title: "Novo Título",
            content: "Novo conteúdo do resumo.",
            user: {
                id: "a084fbca-b6c0-45c9-b57d-1dff7d48ec0b",
                first_name: "",
                last_name: "",
                email: "camille.lopes@yopmail.com",
                password: "$2b$10$ACRFM8UPwF1vDc7oa9NLBuIF4X8aAq2dVHErTuoVvQ4k5p73I.atq",
                created_at: new Date(),
                updated_at: new Date(),
                summarizes: []
            },

        };

        const savedSummarize = {
            id: "123e4567-e89b-12d3-a456-426614174000",
            ...newSummarize,
            created_at: new Date(),
            updated_at: new Date(),
        };

        summarizeRepository.create.mockReturnValue(savedSummarize);
        summarizeRepository.save.mockResolvedValue(savedSummarize);

        const result = await summarizeService.create(newSummarize);

        expect(summarizeRepository.create).toHaveBeenCalledWith(newSummarize);
        expect(summarizeRepository.save).toHaveBeenCalledWith(savedSummarize);
        expect(result).toEqual(savedSummarize);
    });

    it('should find a summarize by id', async () => {
        const summarizeId = "72f320d6-c13e-45ee-8479-2ccc25f44d01";
        const user = {
            id: "a084fbca-b6c0-45c9-b57d-1dff7d48ec0b",
            first_name: "",
            last_name: "",
            email: "camille.lopes@yopmail.com",
            password: "$2b$10$ACRFM8UPwF1vDc7oa9NLBuIF4X8aAq2dVHErTuoVvQ4k5p73I.atq",
            created_at: new Date(),
            updated_at: new Date(),
            summarizes: []
        }
        const foundSummarize = {
            id: summarizeId,
            title: "O Apocalipse Chegou",
            user: user,
            content: "Era um dia comum, tipo, sabe, quando o sol estava brilhando...",
            created_at: new Date("2025-04-27T23:22:02.657Z"),
            updated_at: new Date("2025-04-27T23:22:02.657Z"),
        };

        summarizeRepository.findOneBy.mockResolvedValue(foundSummarize);

        const result = await summarizeService.show(user, summarizeId);

        expect(summarizeRepository.findOneBy).toHaveBeenCalledWith({ id: summarizeId, user: {id: user.id} });
        expect(result).toEqual(foundSummarize);
    });
    
    it("should throw an error if create a text resume not works", async () => {
        const user = {
            id: "a084fbca-b6c0-45c9-b57d-1dff7d48ec0b",
            first_name: "",
            last_name: "",
            email: "camille.lopes@yopmail.com",
            password: "$2b$10$ACRFM8UPwF1vDc7oa9NLBuIF4X8aAq2dVHErTuoVvQ4k5p73I.atq",
            created_at: new Date(),
            updated_at: new Date(),
            summarizes: []
        }
        const newSummarize = {
            title: "Novo Título",
            content: "Novo conteúdo do resumo.",
            user: user
        };

        chatgpt.summarizeAndImprove.mockResolvedValueOnce("")

        expect(summarizeService.create(newSummarize)).rejects.toThrow(
            new AppError("Failed to summarize the text", 400)
        )
        expect(chatgpt.summarizeAndImprove).toHaveBeenCalledWith(newSummarize.content)
    });
    /*it('should throw an error if summarize not found by id', async () => {
        const summarizeId = "72f320d6-c13e-45ee-8479-2ccc25f44d05";

        summarizeRepository.findOneBy.mockResolvedValue(null);

        await expect(summarizeService.show(summarizeId)).rejects.toThrow(
            new AppError("Summarization not found", 404)
        );

        expect(summarizeRepository.findOneBy).toHaveBeenCalledWith({ id: summarizeId });
    });

    it('should update a summarize', async () => {
        const summarizeId = "72f320d6-c13e-45ee-8479-2ccc25f44d01";
        const updateData = {
            title: "Título Atualizado",
            content: "Conteúdo atualizado do resumo.",
        };

        const existingSummarize = {
            id: summarizeId,
            title: "Título Atualizado",
            content: "Conteúdo atualizado do resumo.",
            created_at: new Date("2025-04-27T23:22:02.657Z"),
            updated_at: new Date("2025-04-27T23:22:02.657Z"),
        };


        const updatedSummarize = {
            id: summarizeId,
            ...updateData,
            created_at: new Date("2025-04-27T23:22:02.657Z"),
            updated_at: new Date("2025-04-27T23:22:02.657Z"),
        };

        summarizeRepository.findOneBy.mockResolvedValue(existingSummarize);
        summarizeRepository.update.mockResolvedValue({ raw: [], affected: 1, generatedMaps: [] });

        const result = await summarizeService.update(summarizeId, updateData);

        expect(summarizeRepository.findOneBy).toHaveBeenCalledWith({ id: summarizeId });
        expect(summarizeRepository.update).toHaveBeenCalledWith(summarizeId, updateData);
        expect(result).toEqual(updatedSummarize);
    });

    it("should throw an error if update a text resume not works", async () => {
        const id = "123e4567-e89b-12d3-a456-426614174000"
        const newSummarize = {
            title: "Novo Título",
            content: "Novo conteúdo do resumo.",
        };

        const existingSummarize = {
            id,
            ...newSummarize,
            created_at: new Date("2025-04-27T23:22:02.657Z"),
            updated_at: new Date("2025-04-27T23:22:02.657Z"),
        }
        chatgpt.summarizeAndImprove.mockResolvedValueOnce("")

        summarizeRepository.findOneBy.mockResolvedValueOnce(existingSummarize);

        expect(summarizeService.update(id, newSummarize)).rejects.toThrow(
            new AppError("Failed to summarize the text", 400)
        )
        
    });

    it('should delete a summarize', async () => {
        const summarizeId = "72f320d6-c13e-45ee-8479-2ccc25f44d01";

        const existingSummarize = {
            id: summarizeId,
            title: "O Apocalipse Chegou",
            content: "Era um dia comum, tipo, sabe, quando o sol estava brilhando...",
            created_at: new Date("2025-04-27T23:22:02.657Z"),
            updated_at: new Date("2025-04-27T23:22:02.657Z"),
        };

        summarizeRepository.findOneBy.mockResolvedValue(existingSummarize);

        await summarizeService.delete(summarizeId);

        expect(summarizeRepository.findOneBy).toHaveBeenCalledWith({ id: summarizeId });
        expect(summarizeRepository.delete).toHaveBeenCalledWith(summarizeId);

    });*/
});
