import { Module } from '@nestjs/common';
import { DB, DbProvider } from './drizzle-orm.provider';

@Module({
  providers: [DbProvider],
  exports: [DB],
})
export class DrizzleOrmModule {}
