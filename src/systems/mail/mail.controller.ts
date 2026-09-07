import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service.js';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-email')
  async sendEmail(
    @Body('email') email: string,
    @Body('subject') subject: string,
    @Body('content') content: string,
  ) {
    const targetEmail = email || 'example@gmail.com';
    const mailSubject = subject || 'Thử nghiệm gửi mail từ NestJS';
    const mailContent =
      content || 'Xin chào! Đây là email kiểm tra gửi qua Gmail SMTP.';

    await this.mailService.sendEmail(targetEmail, mailSubject, mailContent);

    return {
      success: true,
      message: `Đã gửi email thành công tới địa chỉ: ${targetEmail}`,
    };
  }
}
