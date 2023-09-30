import { Test, TestingModule } from '@nestjs/testing';

import { IndexerController } from './indexer.controller';
import { IndexerService } from './indexer.service';

describe('IndexerController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [IndexerController],
      providers: [IndexerService],
    }).compile();
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe('getData', () => {});
});
