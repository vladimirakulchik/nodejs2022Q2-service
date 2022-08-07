import 'dotenv/config';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';
import { LoggerService, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerFactory } from './logger/logger.factory';

async function bootstrap() {
  const logger: LoggerService = LoggerFactory.create();

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception thrown:', error);
    process.exit(1);
  });
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  // app.useLogger(logger);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const apiFilePath: string = join('doc', 'api.yaml');
  const apiFile: string = await readFile(apiFilePath, 'utf-8');
  SwaggerModule.setup('doc', app, parse(apiFile));

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
