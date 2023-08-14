import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern} from '@nestjs/microservices';
import { INDEX_ALL } from '@app/shared/subjects';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @EventPattern(INDEX_ALL)
  indexFiles() {
    this.service.indexAll()
  }
}
