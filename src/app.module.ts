import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductModule } from './modules/products/product.module.js';
import { CategoriesModule } from './modules/categories/categories.module.js';
import { PrismaModule } from './systems/prisma/prisma.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './systems/mail/mail.module.js';
import { AuthMiddleware } from './middlewares/auth.middleware.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    CategoriesModule,
    PrismaModule,
    UsersModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({
        path: 'categories',
        version: '1',
        method: RequestMethod.ALL,
      });
  }
}
