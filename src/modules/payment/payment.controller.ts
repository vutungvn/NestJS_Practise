import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service.js';
import { TransferDto } from './dto/transfer.dto.js';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('transfer')
  transfer(@Body() transferDto: TransferDto) {
    return this.paymentService.transfer(transferDto);
  }
}
