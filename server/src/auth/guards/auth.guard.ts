// auth.guard.ts
import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		return super.canActivate(context);
	}

	handleRequest(err, user, info, context: ExecutionContext) {
		if (err || !user) {
			const httpContext = context.switchToHttp();
			const response = httpContext.getResponse();
			throw new UnauthorizedException();
			//  response.redirect(`google/logout`);
			return false;
		}
		return user;
	}
}