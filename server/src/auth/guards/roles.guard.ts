// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRolesService } from 'src/user/user-roles.service';
import { GoogleService } from '../google.service';
import { UserService } from 'src/user/user.service';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userRolesService: UserRolesService,
    private readonly googleService: GoogleService,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // No roles are required, so allow access.
    }

    const request = context.switchToHttp().getRequest();
    const accessToken = request.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      const user = await this.userService.getUserInfoByEmail(email);

    const userId = user.id; // Assuming you have a user object in the request.
    const userRoles = await this.userRolesService.getRolesByUserId(userId);
    if (!userRoles) {
      return false; // User roles not found, deny access.
    }

    // Check if the user has at least one of the required roles.
    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
    return hasRequiredRole;
  }
}
