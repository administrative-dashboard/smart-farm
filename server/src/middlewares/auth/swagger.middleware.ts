import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req, res, next) {
    const token = req.cookies['token']; 
    if (token) {
      req.headers['authorization'] = `Bearer ${token}`;
    }
    next();
  }
}
