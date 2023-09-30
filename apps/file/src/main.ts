import { NestFactory } from '@nestjs/core';

import { FileModule } from './file/file.module';
import { CustomStrategy, MicroserviceOptions } from '@nestjs/microservices';
import { NatsJetStreamServer } from '@nestjs-plugins/nestjs-nats-jetstream-transport';

async function bootstrap() {
  const options: CustomStrategy = {
    strategy: new NatsJetStreamServer({
      connectionOptions: {
        servers: process.env.NX_NATS_SERVER,
        name: 'file-listener',
      },
      consumerOptions: {
        durable: 'file-microservice',
        deliverTo: 'test',
      },
    }),
  };
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(FileModule, options);

  await app.listen();
}

bootstrap();
