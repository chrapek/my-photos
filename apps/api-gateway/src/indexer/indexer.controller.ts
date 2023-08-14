import { Controller, Post } from '@nestjs/common';
import { IndexerService } from './indexer.service';

@Controller('indexer')
export class IndexerController {
    constructor(
        private readonly service: IndexerService,
    ) {}

    @Post()
    async indexFiles() {
        return await this.service.indexFiles();
    }
}
