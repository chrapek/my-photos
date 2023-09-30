import { DynamicModule, Module } from '@nestjs/common';
import { DrizzleOrmService } from './drizzle-orm.service';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

@Module({})
export class DrizzleOrmModule {
  static forRoot(): DynamicModule {
    const dbProvider = {
      provide: DrizzleOrmService,
      useFactory: () => {
        const client = postgres(process.env.NX_DB_URL);
        return drizzle(client);
      }
    }

    return {
      exports: [dbProvider],
      providers: [dbProvider],
      module: DrizzleOrmModule,
    };
  }
}
