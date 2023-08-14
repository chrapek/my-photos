import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { CustomStrategy, MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NatsJetStreamServer } from '@nestjs-plugins/nestjs-nats-jetstream-transport';

async function bootstrap() {
  const options: CustomStrategy = {
    strategy: new NatsJetStreamServer({
      connectionOptions: {
        servers: 'localhost:4222',
        name: 'indexer-listener',
      },
      consumerOptions: {
        durable: 'index-microservice',
        deliverToSubject: 'test',
      },
    }),
  };
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, options);

  await app.listen();
}

bootstrap();
