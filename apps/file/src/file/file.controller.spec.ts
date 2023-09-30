import { Test, TestingModule } from '@nestjs/testing';

import { FileController } from './file.controller';
import { FileService } from './file.service';

describe('FileController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [FileController],
      providers: [FileService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const fileController = app.get<FileController>(FileController);
      expect(fileController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
