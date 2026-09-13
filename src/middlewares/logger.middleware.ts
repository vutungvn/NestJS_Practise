import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Đã vào logger middleware');
  next();
}
