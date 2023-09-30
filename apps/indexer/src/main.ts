import { NestFactory } from '@nestjs/core';

import { IndexerModule } from './app/indexer.module';
import { CustomStrategy, MicroserviceOptions } from '@nestjs/microservices';
import { NatsJetStreamServer } from '@nestjs-plugins/nestjs-nats-jetstream-transport';

async function bootstrap() {
  const options: CustomStrategy = {
    strategy: new NatsJetStreamServer({
      connectionOptions: {
        servers: process.env.NX_NATS_SERVER,
        name: 'indexer-listener',
      },
      consumerOptions: {
        durable: 'index-microservice',
      },
    }),
  };
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    IndexerModule,
    options
  );

  await app.listen();
}

bootstrap();
