// user-roles.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from 'src/database/models/users_roles';
import { Role } from 'src/database/models/roles.model';
import { User } from 'src/database/models/users.model';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectModel(UserRole)
    private readonly userrolesModel: typeof UserRole,
    @InjectModel(Role)
    private readonly rolesModel: typeof Role,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async getRolesByUserId(userId: number): Promise<string[] | null> {
    const userRoles = await this.userrolesModel.findAll({
      where: { user_id: userId },
    });

    if (userRoles && userRoles.length > 0) {
      const roleIds = userRoles.map((userRole) => userRole.role_id);
      const roles = await this.rolesModel.findAll({
        where: { id: roleIds },
      });

      return roles.map((role) => role.value);
    } else {
      return ["Gest"];
    }

    return null;
  }
}
