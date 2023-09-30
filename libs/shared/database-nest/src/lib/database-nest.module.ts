import { Module } from '@nestjs/common';
import { FileRepository } from './file.repository';

@Module({
  providers: [FileRepository],
  exports: [FileRepository],
})
export class DatabaseModule {}
