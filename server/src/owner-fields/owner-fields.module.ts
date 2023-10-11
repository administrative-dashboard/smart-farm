import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OwnerFieldsController } from './owner-fields.controller';
import { OwnerFieldsService } from './owner-fields.service';
import { GoogleService } from 'src/auth/google.service';
import { Field } from 'src/database/models/fields.model';
import { OwnerField } from 'src/database/models/owners_fields.model';
import { User } from 'src/database/models/users.model';
import { Role } from 'src/database/models/roles.model';
import { Permission } from 'src/database/models/permissions.model';
import { UserRole } from 'src/database/models/users_roles';
import { UserPermission } from 'src/database/models/users_permissions.model';
import { UserService } from 'src/user/user.service';
import { UserRolesService } from 'src/user/user-roles.service';
import { UserPermissionsService } from 'src/user/user-permissions.service';
@Module({
  imports: [SequelizeModule.forFeature([OwnerField, Field, User, Role, Permission, UserRole, UserPermission])],
  controllers: [OwnerFieldsController],
  providers: [OwnerFieldsService, GoogleService, UserService, UserRolesService, UserPermissionsService],
})
export class OwnerFieldsModule {}