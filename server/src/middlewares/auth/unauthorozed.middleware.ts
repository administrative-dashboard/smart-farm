import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class UnauthorizedRedirectMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: () => void) {
    if (res.statusCode === 401) {
      console.log('Handling 401 Unauthorized');
      res.redirect('/google/logout');
    } else {
      next();
    }
  }
}
