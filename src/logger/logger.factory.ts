import 'dotenv/config';
import { LoggerService } from '@nestjs/common';
import { ConsoleLogger } from './console-logger.service';
import { FileLogger } from './file-logger.service';

export class LoggerFactory {
  public static create(): LoggerService {
    const useFileLogger: boolean =
      process.env.LOGS_WRITE_TO_FILE.toLowerCase() === 'true';

    const logsLevel: number = +process.env.LOGS_LEVEL ?? 2;

    if (!useFileLogger) {
      return new ConsoleLogger(logsLevel);
    }

    const maxFileSize: number =
      (+process.env.LOGS_MAX_FILE_SIZE_KB ?? 100) * 1000;

    const logsDir: string = process.env.LOGS_DIRECTORY ?? 'logs';
    const logsFileName: string = process.env.LOGS_FILE_NAME ?? 'log.txt';
    const errorsFileName: string =
      process.env.LOGS_ERRORS_FILE_NAME ?? 'error.txt';
    const writeErrorsToAnotherFile: boolean =
      process.env.LOGS_ERRORS_TO_ANOTHER_FILE.toLowerCase() === 'true';

    return new FileLogger(
      logsLevel,
      maxFileSize,
      logsDir,
      logsFileName,
      errorsFileName,
      writeErrorsToAnotherFile,
    );
  }
}
