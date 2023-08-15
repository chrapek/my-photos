import { Injectable, OnModuleInit } from "@nestjs/common";
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

@Injectable()
export class DrizzleOrmService implements OnModuleInit {
    public db: PostgresJsDatabase

    onModuleInit() {
        const { NX_DB_USERNAME, NX_DB_PASSWORD, NX_DB_HOST, NX_DB_PORT, NX_DB_NAME } = process.env;
        const client = postgres(`postgres://${NX_DB_USERNAME}:${NX_DB_PASSWORD}@${NX_DB_HOST}:${NX_DB_PORT}/${NX_DB_NAME}`);
        return drizzle(client);
    }
}   