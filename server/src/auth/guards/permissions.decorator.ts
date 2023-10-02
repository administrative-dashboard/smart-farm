// permissions.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Permissions = (...permissions: string[]) => SetMetadata('permissions', permissions);


// @UseGuards(JwtAuthGuard, PermissionsGuard)
//   @Permissions('READ_EMPLOYEE') 

//   @UseGuards(JwtAuthGuard, RolesGuard) // Apply JwtAuthGuard and RolesGuard
// @Roles('ADMIN', 'COMMUNITY_MANAGER')