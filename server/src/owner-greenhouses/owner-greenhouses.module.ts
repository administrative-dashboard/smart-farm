import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OwnerGreenhousesController } from './owner-greenhouses.controller';
import { OwnerGreenhousesService } from './owner-greenhouses.service';
import { GoogleService } from 'src/auth/google.service';
import { Greenhouse } from 'src/database/models/greenhouses.model';
import { OwnerGreenhouse } from 'src/database/models/owners_greenhouses.model';
import { User } from 'src/database/models/users.model';
import { UserPermission } from 'src/database/models/users_permissions.model';
import { UserRole } from 'src/database/models/users_roles';
import { Role } from 'src/database/models/roles.model';
import { Permission } from 'src/database/models/permissions.model';
import { UserService } from 'src/user/user.service';
import { UserRolesService } from 'src/user/user-roles.service';
import { UserPermissionsService } from 'src/user/user-permissions.service';
@Module({
  imports: [SequelizeModule.forFeature([OwnerGreenhouse, Greenhouse, User, UserPermission, UserRole, Role, Permission])],
  controllers: [OwnerGreenhousesController],
  providers: [OwnerGreenhousesService, GoogleService, UserService, UserRolesService, UserPermissionsService]
})
export class OwnerGreenhousesModule {}
