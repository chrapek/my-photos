import { Module } from '@nestjs/common';
import { FileRepository } from './file.repository';
import { DrizzleOrmModule } from '@app/shared/drizzle-orm-nest';

@Module({
  imports: [DrizzleOrmModule],
  providers: [FileRepository],
  exports: [FileRepository],
})
export class DatabaseModule {}
