import 'dotenv/config';
import { LoggerService } from '@nestjs/common';
import { ConsoleLogger } from './console-logger.service';
import { FileLogger } from './file-logger.service';

export class LoggerFactory {
  public static create(): LoggerService {
    const useFileLogger: boolean =
      process.env.LOGS_WRITE_TO_FILE.toLowerCase() == 'true';

    const logsLevel: number = +process.env.LOGS_LEVEL;

    if (!useFileLogger) {
      return new ConsoleLogger(logsLevel);
    }

    const logsDir: string | null = process.env.LOGS_DIRECTORY ?? null;
    const logsFileName: string | null = process.env.LOGS_FILE_NAME ?? null;
    const errorsFileName: string | null =
      process.env.LOGS_ERRORS_FILE_NAME ?? null;
    const maxFileSize: number | null =
      +process.env.LOGS_MAX_FILE_SIZE_KB * 1024 ?? null;

    return new FileLogger(logsLevel, logsDir, logsFileName, errorsFileName, maxFileSize);
  }
}
