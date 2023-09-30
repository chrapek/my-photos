import { Inject, Injectable } from '@nestjs/common';
import { DB, DbType } from '@app/shared/drizzle-orm-nest';
import { NewFile, files } from '@app/shared/db-schema';

@Injectable()
export class FileRepository {
  constructor(@Inject(DB) private readonly db: DbType) {}

  async create(file: NewFile) {
    return await this.db
      .insert(files)
      .values(file)
      .onConflictDoUpdate({ target: files.hash, set: file })
      .returning();
  }
}
