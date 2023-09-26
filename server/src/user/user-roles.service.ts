// user-roles.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from 'src/database/models/users_roles';
import { Role } from 'src/database/models/roles.model';
import { User } from 'src/database/models/users.model';
import { Sequelize } from 'sequelize';



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

  async getUserById(id: string): Promise<any | null> {
    try {
      const ParsedId = parseInt(id, 10);
      const user = await User.findOne({
        where: {
          id: ParsedId,
        },
        attributes: [
          'id',
          'name',
          'email',
          'phone_number',
          [Sequelize.col('users_roles.roles.value'), 'roles'],
        ],
        include: [
          {
            model: UserRole,
            attributes: [],
            include: [
              {
                model: Role,
                attributes: ['value'],
              },
            ],
          },
        ],
      });
      return user || null;
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
      });

      if (!user) {
        return null;
      }

      await user.update({
        name: data.name,
        phone_number: data.phone_number,
      });

      const roleValue = data.roles;
      const updatedRole = await Role.findOne({
        where: {
          value: roleValue,
        },
      });

      if (updatedRole) {
        const associatedRole = await UserRole.findOne({
          where: {
            user_id: user.id,
          },
        });
        console.log('associatedRole:', associatedRole);
        if (associatedRole) {
          await associatedRole.update({
            role_id: updatedRole.id, 
          });
        }
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getAllRoles() {
    return await this.rolesModel.findAll();
  }
}


