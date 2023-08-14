import { NatsJetStreamClientProxy } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { Injectable } from '@nestjs/common';
import { existsSync, readdirSync, statSync } from 'fs';
import { extname, join } from 'path';
import { PATH_IMAGE_ADD, PATH_VIDEO_ADD } from '@app/shared/subjects';

@Injectable()
export class AppService {
  private readonly mediaDir = process.env.MEDIA_DIR;

  constructor(private client: NatsJetStreamClientProxy) {}

  indexAll() {
    function traverseDirectory(currentPath: string, client: NatsJetStreamClientProxy) {
      const items = readdirSync(currentPath);

      for (const item of items) {
        const itemPath = join(currentPath, item);
        if (!existsSync(itemPath)) {
          console.error(`Path does not exist: ${itemPath}`);
          continue;
        }

        if (statSync(itemPath).isDirectory()) {
          traverseDirectory(itemPath, client);
        } else {
          const extension = extname(itemPath).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.gif'].includes(extension)) {
            console.log(itemPath)
            client.emit(`${PATH_IMAGE_ADD}.${extension.substring(1)}`, itemPath)
          }
          if (['.mp4', '.avi', '.mov'].includes(extension)) {
            console.log(itemPath)
            client.emit(`${PATH_VIDEO_ADD}.${extension.substring(1)}`, itemPath)
          }
        }
      }
    }

    traverseDirectory(join(process.cwd(), '../../', this.mediaDir), this.client);
  }
}
