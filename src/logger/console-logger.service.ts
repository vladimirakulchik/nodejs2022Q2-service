import { LoggerService } from '@nestjs/common';
import { LogLevel } from './level.enum';

export class ConsoleLogger implements LoggerService {
  private logsLevel: number;

  constructor(logsLevel: number) {
    this.logsLevel = logsLevel;
  }

  log(message: any, ...optionalParams: any[]) {
    if (!this.checkLogLevel(LogLevel.LOG)) {
      return;
    }

    console.log(this.getDate() + ' [LOG]', message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    if (!this.checkLogLevel(LogLevel.ERROR)) {
      return;
    }

    console.error(this.getDate() + ' [ERROR]', message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    if (!this.checkLogLevel(LogLevel.WARN)) {
      return;
    }

    console.warn(this.getDate() + ' [WARN]', message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    if (!this.checkLogLevel(LogLevel.DEBUG)) {
      return;
    }

    console.debug(this.getDate() + ' [DEBUG]', message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    if (!this.checkLogLevel(LogLevel.VERBOSE)) {
      return;
    }

    console.info(this.getDate() + ' [VERBOSE]', message, ...optionalParams);
  }

  private checkLogLevel(level: LogLevel): boolean {
    return level <= this.logsLevel;
  }

  private getDate(): string {
    const now = new Date();

    return now.toISOString();
  }
}
