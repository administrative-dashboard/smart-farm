// phone-validation.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PhoneValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const phoneNumber = req.body.phone; // Assuming the phone number is in the request body

    const armenianPrefix = '+374';

    // Check if the phone number starts with the Armenian prefix, is exactly 12 characters long,
    // and does not contain a '0' after the prefix
    const isValid =
      phoneNumber.startsWith(armenianPrefix) &&
      phoneNumber.length === 12 &&
      !phoneNumber.startsWith('+3740');

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid phone number format or length.' });
    }

    next();
  }
}
