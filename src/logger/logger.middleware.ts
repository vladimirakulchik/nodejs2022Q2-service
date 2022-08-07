import {
  Inject,
  Injectable,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject('LoggerService')
    private readonly logger: LoggerService,
  ) {}

  use(request: Request, response: Response, next: NextFunction): void {
    finished(response, () => {
      const { method, path, query, body } = request;
      const { statusCode, statusMessage } = response;

      let message = `${method} ${path} `;
      message += this.isEmpty(query) ? '' : `query: ${JSON.stringify(query)} `;
      message += this.isEmpty(body) ? '' : `body: ${JSON.stringify(body)} `;
      message += `-> ${statusCode} ${statusMessage}`;

      if (statusCode >= 500) {
        this.logger.error(message);
      }

      if (statusCode >= 400) {
        this.logger.warn(message);
      } else {
        this.logger.log(message);
      }
    });

    next();
  }

  private isEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }
}
