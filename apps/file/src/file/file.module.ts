import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { DatabaseModule } from '@app/shared/database-nest';
import { NatsJetStreamTransport } from '@nestjs-plugins/nestjs-nats-jetstream-transport';

@Module({
  imports: [
    DatabaseModule,
    NatsJetStreamTransport.register({
      connectionOptions: {
        servers: process.env.NX_NATS_SERVER,
        name: 'file-publisher',
      },
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
