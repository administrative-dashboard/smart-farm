// auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (token) {
      try {
        const decodedToken = this.jwtService.verify(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          return res.redirect('google/logout');
        }
      } catch (error) {
        return res.redirect('google/logout');
      }
    }

    next();
  }
}
