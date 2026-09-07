import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, content: string) {
    try {
      const response = await this.mailerService.sendMail({
        to,
        subject,
        text: content,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #4CAF50;">Thông báo từ hệ thống NestJS</h2>
            <p>${content}</p>
            <hr />
            <small>Email này được gửi tự động, vui lòng không phản hồi.</small>
          </div>
        `,
      });

      return response;
    } catch (error: any) {
      console.error('Lỗi khi gửi email:', error);
      throw new InternalServerErrorException(
        'Gửi email thất bại: ' + error.message,
      );
    }
  }
}
