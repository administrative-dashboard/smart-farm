// src/services/phone-validation.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class PhoneValidationService {
  validatePhoneNumber(phoneNumber: string): boolean {
    const armenianPrefix = '+374';
    return phoneNumber.startsWith(armenianPrefix) && !phoneNumber.startsWith('+3740');
  }
}
