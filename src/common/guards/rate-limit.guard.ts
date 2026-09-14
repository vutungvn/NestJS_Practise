import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

@Injectable()
export class RateLimitGuard implements CanActivate {
  // Map lưu trữ in-memory { ip: { count, resetTime } }
  private static readonly ipMap = new Map<string, RateLimitInfo>();

  private readonly LIMIT = 10; // Tối đa 10 request
  private readonly WINDOW_MS = 60 * 1000; // Khung thời gian: 1 phút (60.000 ms)

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const clientIp = request.ip || request.socket.remoteAddress || 'unknown-ip';
    const currentTime = Date.now();

    const record = RateLimitGuard.ipMap.get(clientIp);

    // Nếu IP chưa có trong Map hoặc đã hết 1 phút kể từ đợt reset trước
    if (!record || currentTime > record.resetTime) {
      RateLimitGuard.ipMap.set(clientIp, {
        count: 1,
        resetTime: currentTime + this.WINDOW_MS,
      });
      return true;
    }

    // Nếu đã có record và vẫn trong khung thời gian 1 phút
    if (record.count >= this.LIMIT) {
      const retryAfter = Math.ceil((record.resetTime - currentTime) / 1000);
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: `Bạn đã vượt quá giới hạn 10 request/phút. Vui lòng thử lại sau ${retryAfter} giây.`,
          error: 'Too Many Requests',
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // Tăng số lượt gọi API của IP
    record.count += 1;
    RateLimitGuard.ipMap.set(clientIp, record);

    return true;
  }
}
