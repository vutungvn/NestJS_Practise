import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    request.user = {
      id: 'user_123',
      username: 'vutungvn',
    };

    // Lấy thông tin user đã đăng nhập (giả lập hoặc từ AuthGuard)
    const user = request['user'];

    // Lấy resource ID từ URL params (:id)
    const resourceId = request.params.id;

    if (!user || !user.id) {
      throw new ForbiddenException(
        'Không tìm thấy thông tin người dùng xác thực',
      );
    }

    if (!resourceId) {
      throw new BadRequestException('Thiếu tham số ID bài viết/tài nguyên');
    }

    // So sánh ID của user hiện tại với ID sở hữu tài nguyên
    if (user.id !== resourceId) {
      throw new ForbiddenException(
        'Bạn không có quyền chỉnh sửa hoặc xóa tài nguyên của người khác',
      );
    }

    return true;
  }
}
