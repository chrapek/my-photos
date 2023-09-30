import { Controller } from '@nestjs/common';
import { IndexerService } from './indexer.service';
import { EventPattern } from '@nestjs/microservices';
import { INDEX_ALL } from '@app/shared/subjects';

@Controller()
export class IndexerController {
  constructor(private readonly service: IndexerService) {}

  @EventPattern(INDEX_ALL)
  indexFiles() {
    this.service.indexAll();
  }
}
