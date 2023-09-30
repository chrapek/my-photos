import { NatsJetStreamClientProxy } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { Injectable } from '@nestjs/common';
import { existsSync, readdirSync, statSync } from 'fs';
import { extname, join } from 'path';
import { PATH_IMAGE_ADD, PATH_VIDEO_ADD } from '@app/shared/subjects';
import { hashFile } from '@app/shared/crypto';
import { FileType } from '@app/shared/db-schema';
import { FileRepository } from '@app/shared/database-nest';

@Injectable()
export class AppService {
  private readonly mediaDir = process.env.NX_MEDIA_DIR;

  constructor(
    private client: NatsJetStreamClientProxy,
    private readonly fileRepository: FileRepository
  ) {}

  indexAll() {
    async function traverseDirectory(currentPath: string, client: NatsJetStreamClientProxy, fileRepository: FileRepository) {
      const items = readdirSync(currentPath);

      for (const item of items) {
        const itemPath = join(currentPath, item);
        if (!existsSync(itemPath)) {
          console.error(`Path does not exist: ${itemPath}`);
          continue;
        }

        if (statSync(itemPath).isDirectory()) {
          traverseDirectory(itemPath, client, fileRepository);
        } else {
          const extension = extname(itemPath).toLowerCase();
          const hash = await (await hashFile(itemPath)).toString('base64')
          console.log(hash);
          if (['.jpg', '.jpeg', '.png', '.gif'].includes(extension)) {
            console.log(itemPath)
            const file = await fileRepository.create({ 
              hash, 
              type: FileType.IMAGE,
              fileName: item,
            })
            // client.emit(`${PATH_IMAGE_ADD}.${extension.substring(1)}`, itemPath)
          }
          if (['.mp4', '.avi', '.mov'].includes(extension)) {
            console.log(itemPath)
            // client.emit(`${PATH_VIDEO_ADD}.${extension.substring(1)}`, itemPath)
          }
        }
      }
    }

    traverseDirectory(join(process.cwd(), this.mediaDir), this.client, this.fileRepository);
  }
}
