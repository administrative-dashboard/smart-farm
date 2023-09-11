// phone-validation.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PhoneValidationService } from '../services/phone-validation.service'; // Adjust the path as needed

@Controller('phone-validation')
export class PhoneValidationController {
  constructor(private readonly phoneValidationService: PhoneValidationService) {}

  @Post()
  validatePhone(@Body('phone') phoneNumber: string): { isValid: boolean } {
    const isValid = this.phoneValidationService.validatePhoneNumber(phoneNumber);
    return { isValid };
  }
}
