import { NatsJetStreamClientProxy } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { Inject, Injectable } from '@nestjs/common';
import { existsSync, readdirSync, statSync } from 'fs';
import { extname, join } from 'path';
import { PATH_IMAGE_ADD, PATH_VIDEO_ADD } from '@app/shared/subjects';
import { hashFile } from '@app/shared/crypto';
import { DB, DbType } from '@app/shared/drizzle-orm-nest';
import { FileType, files } from '@app/shared/db-schema';

@Injectable()
export class AppService {
  private readonly mediaDir = process.env.NX_MEDIA_DIR;

  constructor(
    private client: NatsJetStreamClientProxy,
    @Inject(DB) private readonly db: DbType
  ) {}

  indexAll() {
    async function traverseDirectory(currentPath: string, client: NatsJetStreamClientProxy, db: DbType) {
      const items = readdirSync(currentPath);

      for (const item of items) {
        const itemPath = join(currentPath, item);
        if (!existsSync(itemPath)) {
          console.error(`Path does not exist: ${itemPath}`);
          continue;
        }

        if (statSync(itemPath).isDirectory()) {
          traverseDirectory(itemPath, client, db);
        } else {
          const extension = extname(itemPath).toLowerCase();
          const hash = await (await hashFile(itemPath)).toString('base64')
          console.log(hash);
          if (['.jpg', '.jpeg', '.png', '.gif'].includes(extension)) {
            console.log(itemPath)
            const file = await db.insert(files).values({ 
              hash, 
              type: FileType.IMAGE,
              fileName: item,
            }).onConflictDoNothing().returning();
            console.log("INSERTED FILE")
            console.log(file)
            // client.emit(`${PATH_IMAGE_ADD}.${extension.substring(1)}`, itemPath)
          }
          if (['.mp4', '.avi', '.mov'].includes(extension)) {
            console.log(itemPath)
            // client.emit(`${PATH_VIDEO_ADD}.${extension.substring(1)}`, itemPath)
          }
        }
      }
    }

    traverseDirectory(join(process.cwd(), this.mediaDir), this.client, this.db);
  }
}
