import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // 1. Xử lý lỗi trùng lặp dữ liệu (Unique Constraint)
    // PostgreSQL native error code: '23505'
    // Prisma Unique constraint error code: 'P2002'
    // MongoDB Duplicate Key error code: 11000
    const isUniqueViolation =
      exception?.code === '23505' ||
      exception?.code === 'P2002' ||
      exception?.code === 11000;

    if (isUniqueViolation) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Dữ liệu này đã tồn tại trong hệ thống',
        error: 'Bad Request',
        timestamp: new Date().toISOString(),
      });
    }

    // 2. Xử lý các lỗi HttpException tiêu chuẩn của NestJS
    const status = exception?.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception?.getResponse
      ? exception.getResponse()
      : null;

    const message =
      typeof exceptionResponse === 'object' && exceptionResponse !== null
        ? (exceptionResponse as any).message || exception.message
        : exception.message || 'Lỗi hệ thống nội bộ';

    return response.status(status).json({
      statusCode: status,
      message: message,
      error: status === 500 ? 'Internal Server Error' : 'Error',
      timestamp: new Date().toISOString(),
    });
  }
}
