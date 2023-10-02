// permissions.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserPermissionsService } from 'src/user/user-permissions.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userPermissionsService: UserPermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!requiredPermissions) {
      return true; // No permissions are required, so allow access.
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user.id; // Assuming you have a user object in the request.

    const userPermissions = await this.userPermissionsService.getPermsByUserId(userId);
    if (!userPermissions) {
      return false; // User permissions not found, deny access.
    }

    // Check if the user has all of the required permissions.
    const hasRequiredPermissions = requiredPermissions.every(permission =>
      userPermissions.includes(permission),
    );
    return hasRequiredPermissions;
  }
}
