import { INDEX_ALL } from '@app/shared/subjects';
import { NatsJetStreamClientProxy } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IndexerService {
  constructor(private client: NatsJetStreamClientProxy) {}

  async indexFiles() {
    return this.client.emit(INDEX_ALL, 'api');
  }
}
