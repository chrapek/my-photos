import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';
import { FileType } from '@app/shared/common';

export const typeEnum = pgEnum('file_type', [FileType.IMAGE, FileType.VIDEO]);

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

export type File = InferModel<typeof files>;
export type NewFile = InferModel<typeof files, 'insert'>;
