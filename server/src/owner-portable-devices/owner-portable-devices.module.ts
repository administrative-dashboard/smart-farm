import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OwnersPortableDevicesService } from './owners-portable-devices.service';
import { OwnerPortableDevice } from '../database/models/owners_portable_devices.model '; // Adjust the path
import { PortableDevicesController } from './owners-portable-devices.controller';
import { PortableDevice } from 'src/database/models/portable_devices.model ';
import { GoogleService } from 'src/auth/google.service';
import { UserRolesService } from 'src/user/user-roles.service';
import { UserRole } from 'src/database/models/users_roles';
import { Role } from 'src/database/models/roles.model';
import { User } from 'src/database/models/users.model';
import { UserPermissionsService } from 'src/user/user-permissions.service';
import { UserPermission } from 'src/database/models/users_permissions.model';
import { Permission } from 'src/database/models/permissions.model';
import { UserService } from 'src/user/user.service';
@Module({
  imports: [
    SequelizeModule.forFeature([
      OwnerPortableDevice,
      PortableDevice,
      UserRole,
      Role,
      User,
      UserPermission,
      Permission,
    ]),
  ],
  providers: [
    OwnersPortableDevicesService,
    GoogleService,
    UserRolesService,
    UserPermissionsService,
    UserService,
  ],
  controllers: [PortableDevicesController],
})
export class OwnerPortableDeviceModule {}
