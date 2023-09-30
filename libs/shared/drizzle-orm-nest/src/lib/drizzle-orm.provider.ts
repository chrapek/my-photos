import { FactoryProvider, Logger } from "@nestjs/common";
import { DefaultLogger, LogWriter } from "drizzle-orm";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const DB = Symbol('DB_SERVICE');
export type DbType = PostgresJsDatabase;

export const DbProvider: FactoryProvider = {
  provide: DB,
  useFactory: () => {
    const logger = new Logger('DB');

    logger.debug('Connecting to DB...');

    const connection = postgres(process.env.NX_DB_URL)

    logger.debug('Connected to DB!');

    class CustomDbLogWriter implements LogWriter {
      write(message: string) {
        logger.verbose(message);
      }
    }

    return drizzle(connection, {
      logger: new DefaultLogger({ writer: new CustomDbLogWriter() }),
    });
  },
};