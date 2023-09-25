// user-roles.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from 'src/database/models/users_roles';
import { Role } from 'src/database/models/roles.model';
import { User } from 'src/database/models/users.model';

export interface UserRoles {
  name: string;
  email: string;
  phone_number: string;
  roles: string[];
}

@Injectable()
export class UserRolesService {
  constructor(
    @InjectModel(UserRole)
    private readonly userrolesModel: typeof UserRole,
    @InjectModel(Role)
    private readonly rolesModel: typeof Role,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) { }

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
      return ['Gest'];
    }

    return null;
  }

  async editUserRoles(
    userId: number,
    roles: string[]
  ): Promise<UserRoles | null> {
    try {
      const user = await this.userModel.findByPk(userId);

      if (user) {
        const roleInstances = await this.rolesModel.findAll({
          where: { value: roles },
        });

        await UserRole.destroy({
          where: { user_id: userId }, 
        });
        await UserRole.bulkCreate(
          roleInstances.map((role) => ({
            user_id: userId,
            role_id: role.id,
          }))
        );

        return {
          name: user.name,
          email: user.email,
          phone_number: user.phone_number,
          roles: roles,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error editing user roles: ', error);
      return null; 
    }
  }

  async getAllRoles() {
    return await this.rolesModel.findAll();
  }
}

// async getUserInfoIncludeRoleById(userId: number): Promise<UserRoles[]> {
//   const users = await User.findAll({
//     where: { id: userId },
//     include: [
//       {
//         model: UserRole,
//         include: [
//           {
//             model: Role,
//           },
//         ],
//       },
//     ],
//   });

//   const userRoles: UserRoles[] = users.map((user) => {
//     const roles = user.users_roles.map((userRole) => userRole.roles.value);
//     return {
//       name: user.name,
//       email: user.email,
//       phone_number: user.phone_number,
//       roles: roles,
//     };
//   });

//   return userRoles;
// }


