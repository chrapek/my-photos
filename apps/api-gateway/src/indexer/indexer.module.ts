import { Module } from '@nestjs/common';
import { IndexerController } from './indexer.controller';
import { IndexerService } from './indexer.service';
import { NatsJetStreamTransport } from '@nestjs-plugins/nestjs-nats-jetstream-transport';

@Module({
    imports: [
        NatsJetStreamTransport.register({
            connectionOptions: {
              servers: 'localhost:4222',
              name: 'api-gateway-publisher',
            },
          }),
        ],
    controllers: [IndexerController],
    providers: [IndexerService]
})
export class IndexerModule {}
