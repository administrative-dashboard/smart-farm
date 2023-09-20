import { Injectable, NestMiddleware } from '@nestjs/common';
import {Response} from 'express';

@Injectable()
export class UnauthorizedRedirectMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: () => void) {
    console.log('UnauthorizedRedirectMiddleware executed.');
    if (res.statusCode === 401) {
      console.log('Handling 401 Unauthorized');
      res.clearCookie('token');
      res.redirect('/google/logout');
    } else {
      // Call the next middleware or route handler.
      next();
    }
  }
}
