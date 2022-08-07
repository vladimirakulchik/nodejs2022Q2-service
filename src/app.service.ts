import { Inject, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('LoggerService')
    private readonly logger: LoggerService,
  ) {}

  getHello(): string {
    // throw new Error('Test exception');

    this.logger.error('error message');
    this.logger.log('text');
    this.logger.warn('some warning');
    this.logger.debug('debug info');
    this.logger.verbose('verbose log');

    return 'Hello World!';
  }
}
