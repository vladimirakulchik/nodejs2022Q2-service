import { Module } from '@nestjs/common';
import { LoggerFactory } from './logger.factory';

const loggerServiceProvider = {
  provide: 'LoggerService',
  useValue: LoggerFactory.create(),
};

@Module({
  providers: [loggerServiceProvider],
  exports: [loggerServiceProvider],
})
export class LoggerModule {}
