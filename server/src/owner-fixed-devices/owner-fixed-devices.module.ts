import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { OwnersFixedDevicesService } from './owner-fixed-devices.service';
import { OwnerFixedDevice } from 'src/database/models/owners_fixed_devices.model';
import { FixedDevicesController } from './owner-fixed-devices.controller';
import { FixedDevice } from 'src/database/models/fixed_devices.model';
import { GoogleService } from 'src/auth/google.service';
import { User } from 'src/database/models/users.model';
import { Role } from 'src/database/models/roles.model';
import { Permission } from 'src/database/models/permissions.model';
import { UserRole } from 'src/database/models/users_roles';
import { UserPermission } from 'src/database/models/users_permissions.model';
import { UserService } from 'src/user/user.service';
import { UserRolesService } from 'src/user/user-roles.service';
import { UserPermissionsService } from 'src/user/user-permissions.service';
@Module({
  imports: [
    SequelizeModule.forFeature([
      OwnerFixedDevice,
      FixedDevice,
      User,
      Role,
      Permission,
      UserRole,
      UserPermission,
    ]),
  ],
  providers: [
    OwnersFixedDevicesService,
    GoogleService,
    UserService,
    UserRolesService,
    UserPermissionsService,
  ],
  controllers: [FixedDevicesController],
})
export class OwnerFixedDeviceModule {}
