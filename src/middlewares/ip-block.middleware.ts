import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpBlockMiddleware implements NestMiddleware {
  // Mảng tĩnh chứa các IP bị chặn
  private readonly blacklist: string[] = [
    '::1', // IPv6 Loopback (Localhost)
    '127.0.0.1', // IPv4 Loopback (Localhost)
    '::ffff:127.0.0.1',
  ];

  use(req: Request, res: Response, next: NextFunction) {
    const clientIp = req.ip || req.socket.remoteAddress || '';

    // Kiểm tra xem IP có nằm trong danh sách đen không
    if (this.blacklist.includes(clientIp)) {
      return res.status(403).json({
        statusCode: 403,
        message: `IP ${clientIp} đã bị chặn truy cập do nghi ngờ spam.`,
        error: 'Forbidden',
      });
    }

    next();
  }
}
