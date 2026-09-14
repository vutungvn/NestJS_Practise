import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { OwnershipGuard } from '../../common/guards/ownership.guard.js';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Áp dụng OwnershipGuard cho API xóa bài viết
  @Delete(':id')
  @UseGuards(OwnershipGuard)
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
