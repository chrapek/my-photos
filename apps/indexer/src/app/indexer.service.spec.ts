import { Test } from '@nestjs/testing';

import { IndexerService } from './indexer.service';

describe('IndexerService', () => {
  let service: IndexerService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [IndexerService],
    }).compile();

    service = app.get<IndexerService>(IndexerService);
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe('getData', () => {});
});
