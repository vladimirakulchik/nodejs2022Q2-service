import { LoggerService } from '@nestjs/common';
import { ConsoleLogger } from './console-logger.service';
import { FileLogger } from './file-logger.service';

export class LoggerFactory {
  public static create(): LoggerService {
    if (true) {
      return new ConsoleLogger();
    }

    return new FileLogger();
  }
}
