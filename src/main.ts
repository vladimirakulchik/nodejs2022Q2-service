import 'dotenv/config';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const apiFilePath: string = join('doc', 'api.yaml');
  const apiFile: string = await readFile(apiFilePath, 'utf-8');
  SwaggerModule.setup('doc', app, parse(apiFile));

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
