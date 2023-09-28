// user/user.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'; // Import SequelizeModule
import { UserService } from './user.service';
import { User } from 'src/database/models/users.model'; // Import your User model
import { UserController } from './user.controller';
import { UserCommunityService } from './user-community.service';
import { UserCommunity } from 'src/database/models/users_communities.model';
import { Community } from 'src/database/models/communities.model';
import { UserRole } from 'src/database/models/users_roles';
import { Role } from 'src/database/models/roles.model';
import { GoogleService } from 'src/auth/google.service';
import { UserRolesService } from './user-roles.service';
import { Permission } from 'src/database/models/permissions.model';
import { UserPermission } from 'src/database/models/users_permissions.model';
import { UserPermissionsService } from './user-permissions.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      UserCommunity,
      Community,
      UserRole,
      Role,
      Permission,
      UserPermission
    ]),
  ],
  providers: [
    UserService,
    UserCommunityService,
    GoogleService,
    UserRolesService,
    UserPermissionsService
  ],
  controllers: [UserController],
  exports: [UserCommunityService],
})
export class UserModule {}