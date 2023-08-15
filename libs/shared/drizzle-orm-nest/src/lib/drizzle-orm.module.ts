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
        const { NX_DB_USERNAME, NX_DB_PASSWORD, NX_DB_HOST, NX_DB_PORT, NX_DB_NAME } = process.env;
        const client = postgres(`postgres://${NX_DB_USERNAME}:${NX_DB_PASSWORD}@${NX_DB_HOST}:${NX_DB_PORT}/${NX_DB_NAME}`);
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
