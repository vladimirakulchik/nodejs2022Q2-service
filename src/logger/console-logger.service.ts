import { LoggerService } from '@nestjs/common';

export class ConsoleLogger implements LoggerService {
  private logsLevel: number;

  constructor(logsLevel: number) {
    this.logsLevel = logsLevel;
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.info(message, ...optionalParams);
  }
}
