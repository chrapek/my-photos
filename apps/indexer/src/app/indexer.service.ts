import { NatsJetStreamClientProxy } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { Injectable } from '@nestjs/common';
import { existsSync, readdirSync, statSync } from 'fs';
import { extname, join } from 'path';
import { PATH_IMAGE_ADD, PATH_VIDEO_ADD } from '@app/shared/subjects';
import { FileType } from '@app/shared/common';

@Injectable()
export class IndexerService {
  private readonly mediaDir = process.env.NX_MEDIA_DIR;

  constructor(private client: NatsJetStreamClientProxy) {}

  indexAll() {
    this.indexLocalStorageRecursive(join(process.cwd(), this.mediaDir), this.client);
  }

  async indexLocalStorageRecursive(currentPath: string, client: NatsJetStreamClientProxy) {
    const items = readdirSync(currentPath);

    for (const item of items) {
      const itemPath = join(currentPath, item);
      if (!existsSync(itemPath)) {
        console.error(`Path does not exist: ${itemPath}`);
        continue;
      }

      if (statSync(itemPath).isDirectory()) {
        this.indexLocalStorageRecursive(itemPath, client);
      } else {
        const extension = extname(itemPath).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.gif'].includes(extension)) {
          client.emit(`${PATH_IMAGE_ADD}.${extension.substring(1)}`, { fileName: item, path: itemPath, type: FileType.IMAGE })
        }
        if (['.mp4', '.avi', '.mov'].includes(extension)) {
          client.emit(`${PATH_VIDEO_ADD}.${extension.substring(1)}`, { fileName: item, path: itemPath, type: FileType.IMAGE })
        }
      }
    }
  }
}
