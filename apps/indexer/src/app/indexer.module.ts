import { Module } from '@nestjs/common';
import { IndexerController } from './indexer.controller';
import { IndexerService } from './indexer.service';
import { NatsJetStreamTransport } from '@nestjs-plugins/nestjs-nats-jetstream-transport';

@Module({
  imports: [
    NatsJetStreamTransport.register({
      connectionOptions: {
        servers: process.env.NX_NATS_SERVER,
        name: 'indexer-publisher',
      },
    }),
  ],
  controllers: [IndexerController],
  providers: [IndexerService],
})
export class IndexerModule {}
