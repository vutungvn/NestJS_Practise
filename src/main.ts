import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor.js';
import { AllExceptionsFilter } from './common/filters/database-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Đăng ký Global Interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  // Áp dụng Global Exception Filter
  app.useGlobalFilters(new AllExceptionsFilter());

  app.setGlobalPrefix('api');

  app.enableCors();

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
