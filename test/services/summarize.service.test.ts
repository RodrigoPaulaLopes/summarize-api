import { SummarizeService } from '../../src/services/Summarize.service';

describe('SummarizeService', () => {
    const summarizeService: SummarizeService = new SummarizeService();

    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return all summarize',async  () => {

        const summarizes = await summarizeService.index(1, 10);
        

        expect(summarizes).toEqual([])
    });
})