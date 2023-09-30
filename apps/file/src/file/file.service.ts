import { hashFile } from '@app/shared/crypto';
import { FileRepository } from '@app/shared/database-nest';
import { Injectable } from '@nestjs/common';
import { NewPath } from '@app/shared/common';
import { NatsJetStreamClientProxy } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { IMAGE_FILE_ADD } from '@app/shared/subjects';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private client: NatsJetStreamClientProxy
  ) {}

  async processFileAddedEvent({ fileName, path, type }: NewPath) {
    console.log(path);
    const hash = (await hashFile(path)).toString('base64');
    const file = await this.fileRepository.create({
      hash,
      type,
      fileName,
    });

    this.client.emit(IMAGE_FILE_ADD, { id: file });
  }
}
