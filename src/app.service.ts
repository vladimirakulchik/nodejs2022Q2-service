import { Inject, Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('LoggerService')
    private readonly logger: LoggerService,
  ) {}

  getHello(): string {
    this.logger.log('Log anything here!');

    return 'Hello World!';
  }
}
