import { boolean, pgEnum, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const typeEnum = pgEnum('file_type', ['IMAGE', 'VIDEO']);

export const files = pgTable('files', {
  id: serial('id').primaryKey(),
  hash: varchar('hash').unique().notNull(),
  type: typeEnum('type').notNull(),
  fileName: varchar('file_name').notNull(),
  thumbnailFileName: varchar('thumbnail_file_name'),
  isFavorite: boolean('is_favorite').default(false),
  isArchived: boolean('is_archived').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
});