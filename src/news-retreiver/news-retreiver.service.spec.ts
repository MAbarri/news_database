import { Test, TestingModule } from '@nestjs/testing';
import { NewsRetreiverService } from './news-retreiver.service';

describe('NewsRetreiverService', () => {
  let service: NewsRetreiverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsRetreiverService],
    }).compile();

    service = module.get<NewsRetreiverService>(NewsRetreiverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
