import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service.js';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProduct(): string {
    return this.productService.getProducts();
  }
}
