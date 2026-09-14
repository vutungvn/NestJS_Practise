import { BadRequestException } from '@nestjs/common';

export class InsufficientFundsException extends BadRequestException {
  constructor(message?: string) {
    super(message || 'Số dư tài khoản không đủ để thực hiện giao dịch');
  }
}
