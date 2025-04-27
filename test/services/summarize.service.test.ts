import { Repository } from 'typeorm';
import { SummarizeService } from '../../src/services/Summarize.service';
import { Summarize } from '../../src/entities/Summarize.entity';

describe('SummarizeService', () => {
    let summarizeService: SummarizeService;
    let summarizeRepository: jest.Mocked<Repository<Summarize>>;
    const response = {
        "data": [
            {
                "id": "72f320d6-c13e-45ee-8479-2ccc25f44d01",
                "title": "O Apocalipse Chegou",
                "content": "Era um dia comum, tipo, sabe, quando o sol estava brilhando e as pessoas estavam andando por aí, sem saber que o apocalipse estava prestes a acontecer. De repente, tudo ficou escuro, como se alguém tivesse desligado o interruptor do sol, mas ninguém sabia o que estava acontecendo. O céu estava cheio de nuvens, mas não aquelas nuvens fofas, eram nuvens tipo... feias. E aí, do nada, começaram a cair uns meteoros, mas não eram meteoro, eram tipo bolas de fogo que caíam em câmera lenta. As pessoas começaram a correr, mas não para onde, porque não dava para saber para onde correr. Os carros estavam todos parados, mas não era um engarrafamento, era como se o mundo tivesse tirado férias. Um monte de pessoas estava tentando gritar, mas o som era abafado, como se alguém tivesse colocado um cobertor gigante em cima do som do mundo. Enquanto isso, de algum lugar distante, uma música tocava. Não era música boa, tipo música de apocalipse, mas era uma música de fundo que ninguém ligava. O mundo estava acabado, mas ninguém sabia exatamente o que estava acabando. Tudo estava, tipo, desmoronando, mas as pessoas estavam muito ocupadas comendo pizza, porque, bem, o apocalipse chegou e quem não ama uma boa pizza? No final, o apocalipse não foi tão apocalíptico. Algumas pessoas se salvaram, outras ficaram lá, mas ninguém sabia muito bem como ou por que. E no fim, todos apenas sentaram e olharam o céu... que ainda estava com aquelas nuvens feias. E a pizza? Ah, a pizza era boa, no fim.",
                "created_at": new Date("2025-04-27T23:22:02.657Z"),
                "updated_at": new Date("2025-04-27T23:22:02.657Z"),
            }
        ],
        "pagination": {
            "total": 1,
            "totalPages": 1,
            "currentPage": 1,
            "limit": 10 // também corrigido aqui!
        }
    };

    beforeEach(() => {
        summarizeRepository = {
            findAndCount: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
        } as unknown as jest.Mocked<Repository<Summarize>>;

        summarizeService = new SummarizeService(summarizeRepository);
    });

    it('should return all summarize', async () => {
        summarizeRepository.findAndCount.mockResolvedValue([
            [
                {
                    id: "72f320d6-c13e-45ee-8479-2ccc25f44d01",
                    title: "O Apocalipse Chegou",
                    content: "Era um dia comum, tipo, sabe, quando o sol estava brilhando e as pessoas estavam andando por aí, sem saber que o apocalipse estava prestes a acontecer. De repente, tudo ficou escuro, como se alguém tivesse desligado o interruptor do sol, mas ninguém sabia o que estava acontecendo. O céu estava cheio de nuvens, mas não aquelas nuvens fofas, eram nuvens tipo... feias. E aí, do nada, começaram a cair uns meteoros, mas não eram meteoro, eram tipo bolas de fogo que caíam em câmera lenta. As pessoas começaram a correr, mas não para onde, porque não dava para saber para onde correr. Os carros estavam todos parados, mas não era um engarrafamento, era como se o mundo tivesse tirado férias. Um monte de pessoas estava tentando gritar, mas o som era abafado, como se alguém tivesse colocado um cobertor gigante em cima do som do mundo. Enquanto isso, de algum lugar distante, uma música tocava. Não era música boa, tipo música de apocalipse, mas era uma música de fundo que ninguém ligava. O mundo estava acabado, mas ninguém sabia exatamente o que estava acabando. Tudo estava, tipo, desmoronando, mas as pessoas estavam muito ocupadas comendo pizza, porque, bem, o apocalipse chegou e quem não ama uma boa pizza? No final, o apocalipse não foi tão apocalíptico. Algumas pessoas se salvaram, outras ficaram lá, mas ninguém sabia muito bem como ou por que. E no fim, todos apenas sentaram e olharam o céu... que ainda estava com aquelas nuvens feias. E a pizza? Ah, a pizza era boa, no fim.",
                    created_at: new Date("2025-04-27T23:22:02.657Z"),
                    updated_at: new Date("2025-04-27T23:22:02.657Z"),
                }
            ],
            1
        ]);

        const summarizes = await summarizeService.index(1, 10);

        expect(summarizes).toEqual(response);
    });
});
