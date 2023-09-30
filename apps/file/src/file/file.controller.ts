import { Controller } from '@nestjs/common';
import { FileService } from './file.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PATH_IMAGE_ADD_ALL, PATH_VIDEO_ADD_ALL } from '@app/shared/subjects';
import { NewPath } from '@app/shared/common';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @EventPattern([PATH_IMAGE_ADD_ALL, PATH_VIDEO_ADD_ALL])
  processFileAddedEvent(@Payload() data: NewPath) {
    return this.fileService.processFileAddedEvent(data);
  }
}
