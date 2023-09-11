import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PhoneValidationService } from './services/phone-validation.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly phoneValidationService: PhoneValidationService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/validate-phone')
  validatePhone(@Body('phone') phoneNumber: string): { isValid: boolean } {
    const isValid =
      this.phoneValidationService.validatePhoneNumber(phoneNumber);
    return { isValid };
  }
}
