import { hashFile } from '@app/shared/crypto';
import { FileRepository } from '@app/shared/database-nest';
import { Injectable } from '@nestjs/common';
import { NewPath } from '@app/shared/common';
import { NatsJetStreamClientProxy } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { DefaultReadTaskOptions, exiftool } from 'exiftool-vendored';
import { FILE_ADD } from '@app/shared/subjects';


@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private client: NatsJetStreamClientProxy
  ) {}

  async processFileAddedEvent({ fileName, path, type }: NewPath) {
    const hash = (await hashFile(path)).toString('base64');
    const file = await this.fileRepository.create({
      hash,
      type,
      fileName,
    });

    this.client.emit(FILE_ADD, { id: file });
  }

  async getMetadata(path: string) {
    const exifTags = await exiftool.read(path, undefined, {
      ...DefaultReadTaskOptions,
      defaultVideosToUTC: true,
      backfillTimezones: true,
      inferTimezoneFromDatestamps: true,
      useMWG: true,
    });

    return exifTags;
  }
}