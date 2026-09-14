import { Injectable } from '@nestjs/common';
import { TransferDto } from './dto/transfer.dto.js';
import { InsufficientFundsException } from '../../common/exceptions/insufficient-funds.exception.js';

@Injectable()
export class PaymentService {
  async transfer(transferDto: TransferDto) {
    const { amount } = transferDto;

    const userBalance = 50000;

    if (amount > userBalance) {
      throw new InsufficientFundsException(); // Ném ra Custom Exception
    }

    return {
      message: 'Chuyển tiền thành công',
      amount,
      balanceRemaining: userBalance - amount,
    };
  }
}
