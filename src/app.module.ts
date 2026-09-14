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
import { IpBlockMiddleware } from './middlewares/ip-block.middleware.js';
import { PaymentModule } from './modules/payment/payment.module.js';
import { PostsModule } from './modules/posts/posts.module.js';

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
    PaymentModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
