import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NatsJetStreamTransport } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { DatabaseModule } from '@app/shared/database-nest';

@Module({
  imports: [
    NatsJetStreamTransport.register({
      connectionOptions: {
        servers: 'localhost:4222',
        name: 'indexer-publisher',
      },
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
