import { Test } from '@nestjs/testing';

import { FileService } from './file.service';

describe('FileController', () => {
  let service: FileService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    service = app.get<FileService>(FileService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
