import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { LoggerMiddleware } from '../../middlewares/logger.middleware.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
