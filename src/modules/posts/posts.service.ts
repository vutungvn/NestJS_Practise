import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto.js';

@Injectable()
export class PostsService {
  // Giả lập danh sách bài viết trong cơ sở dữ liệu
  private posts = [
    {
      id: 'user_123',
      title: 'Bài viết của vutungvn',
      content: 'Nội dung bài viết thuộc sở hữu của user_123',
      authorId: 'user_123',
    },
    {
      id: 'user_999',
      title: 'Bài viết của người khác',
      content: 'Nội dung bài viết thuộc sở hữu của user_999',
      authorId: 'user_999',
    },
  ];

  remove(id: string) {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Không tìm thấy bài viết với ID: ${id}`);
    }
    const deletedPost = this.posts.splice(index, 1);
    return {
      message: `Đã xóa bài viết có ID ${id} thành công!`,
      deletedPost: deletedPost[0],
    };
  }
}
