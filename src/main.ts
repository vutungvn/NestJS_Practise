import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { VersioningType } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger.middleware.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(LoggerMiddleware);

  app.setGlobalPrefix('api');

  app.enableCors();

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
