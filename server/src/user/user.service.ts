// user.service.ts

import { Injectable } from '@nestjs/common';
import { User } from 'src/database/models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from 'src/database/models/users_roles';
import { Role } from 'src/database/models/roles.model';
import { UserPermission } from 'src/database/models/users_permissions.model';
import { Permission } from 'src/database/models/permissions.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) { }

  async getUserInfoByEmail(email: string) {
    try {
      const userInfo = await this.userModel.findOne({ where: { email } });
      return userInfo;
    } catch (error) {
      throw error;
    }
  }

  async getUserInfoById(id: number) {
    try {
      const userInfo = await this.userModel.findOne({ where: { id } });
      return userInfo;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string): Promise<any | null> {
    try {
      const ParsedId = parseInt(id, 10);
      const user = await User.findOne({
        where: {
          id: ParsedId,
        },
        include: [
          {
            model: UserRole,
            include: [
              {
                model: Role,
                attributes: ['value'],
              },
            ],
          },

          {
            model: UserPermission,
            include: [
              {
                model: Permission,
                attributes: ['value'],
              },
            ],
          },
        ],
      });
      if (!user) {
        return null;
      }

      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        roles: user.users_roles.map((userRole) => userRole.roles.value),
        permissions: user.users_permissions.map((userPerm) => userPerm.permissions.value),
      };
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateUserById(id: string, data: any): Promise<any> {
    try {
      const ParsedId = parseInt(id, 10);

      const user = await User.findOne({
        where: {
          id: ParsedId,
        },
        include: [
          {
            model: UserRole,
            include: [Role],
          },
          {
            model: UserPermission,
            include: [Permission],
          },
        ],
      });

      if (!user) {
        return null;
      }

      await user.update({
        name: data.name,
        phone_number: data.phone_number,
      });

      const updatedRoles = data.roles || [];
      const currentRoles = user.users_roles.map(
        (userRole) => userRole.roles.value
      );

      const updatedPerms = data.permissions || [];
      const currentPerms = user.users_permissions.map(
        (userPerm) => userPerm.permissions.value
      );

      const rolesToAdd = updatedRoles.filter(
        (role) => !currentRoles.includes(role)
      );
      const rolesToRemove = currentRoles.filter(
        (role) => !updatedRoles.includes(role)
      );

      const permsToAdd = updatedPerms.filter(
        (perm) => !currentPerms.includes(perm)
      );
      const permsToRemove = currentPerms.filter(
        (perm) => !updatedPerms.includes(perm)
      );

      for (const roleToRemove of rolesToRemove) {
        const userRoleToRemove = user.users_roles.find(
          (userRole) => userRole.roles.value === roleToRemove
        );
        if (userRoleToRemove) {
          await userRoleToRemove.destroy();
        }
      }

      for (const permToRemove of permsToRemove) {
        const userPermToRemove = user.users_permissions.find(
          (userPerm) => userPerm.permissions.value === permToRemove
        );
        if (userPermToRemove) {
          await userPermToRemove.destroy();
        }
      }

      const rolesToAddPromises = rolesToAdd.map(async (roleToAdd) => {
        const roleModel = await Role.findOne({ where: { value: roleToAdd } });

        if (roleModel) {
          await UserRole.create({
            user_id: user.id,
            role_id: roleModel.id,
          });
        }
      });

      const permsToAddPromises = permsToAdd.map(async (permToAdd) => {
        const permModel = await Permission.findOne({
          where: { value: permToAdd },
        });

        if (permModel) {
          await UserPermission.create({
            user_id: user.id,
            permission_id: permModel.id,
          });
        }
      });

      const allPromises = [...rolesToAddPromises, ...permsToAddPromises];

      await Promise.all(allPromises);

      return user;
    } catch (error) {
      throw error;
    }
  }
}
