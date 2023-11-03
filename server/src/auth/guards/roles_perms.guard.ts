// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRolesService } from 'src/user/user-roles.service';
import { GoogleService } from '../google.service';
import { UserService } from 'src/user/user.service';
import { UserPermissionsService } from 'src/user/user-permissions.service';
@Injectable()
export class RolesPermsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userRolesService: UserRolesService,
    private readonly userPermissionsService: UserPermissionsService,
    private readonly googleService: GoogleService,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRolesPerms = this.reflector.get<string[]>(
      'roles_perms',
      context.getHandler()
    );
    if (!requiredRolesPerms) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const accessToken = request.user.accessToken;
    const email = await this.googleService.getUserInfo(accessToken);
    const user = await this.userService.getUserInfoByEmail(email);

    const userId = user.id;
    const userRoles = await this.userRolesService.getRolesByUserId(userId);
    if (!userRoles) {
      return false;
    }

    const userPermissions =
      await this.userPermissionsService.getPermsByUserId(userId);
    if (!userPermissions) {
      return false;
    }

    const hasRequiredRole = requiredRolesPerms.some((role) =>
      userRoles.includes(role)
    );

    const hasRequiredPermission = requiredRolesPerms.some((perm) =>
      userPermissions.includes(perm)
    );

    return hasRequiredRole || hasRequiredPermission;
  }
}
