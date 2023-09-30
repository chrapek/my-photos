import type { Config } from 'drizzle-kit';

export default {
  schema: './libs/shared/db-schema/src/index.ts',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.NX_DB_URL ?? '',
  },
} satisfies Config;
