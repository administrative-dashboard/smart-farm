// account.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { GoogleAuthService } from '../../auth/google-auth.service';
@Injectable()
export class AccountMiddleware implements NestMiddleware {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization;

    try {
      const isValidToken = await this.googleAuthService.verifyAccessToken(accessToken);

      if (!isValidToken) {
        return res.status(401).json({ message: 'Token is not valide' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Error auth' });
    }
  }
}
