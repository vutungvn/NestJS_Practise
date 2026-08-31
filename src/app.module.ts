import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductModule } from './modules/products/product.module.js';
import { CategoriesModule } from './modules/categories/categories.module.js';

@Module({
  imports: [ProductModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
