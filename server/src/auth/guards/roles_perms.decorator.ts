// roles-perms.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const RolesPerms = (...rolesPerms: string[]) =>
  SetMetadata('roles_perms', rolesPerms);
