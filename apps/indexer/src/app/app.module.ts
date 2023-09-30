import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NatsJetStreamTransport } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { DrizzleOrmModule } from '@app/shared/drizzle-orm-nest'

@Module({
  imports: [
    NatsJetStreamTransport.register({
      connectionOptions: {
        servers: 'localhost:4222',
        name: 'indexer-publisher',
      },
    }),
    DrizzleOrmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
