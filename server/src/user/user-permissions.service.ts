// user-permissions.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/database/models/users.model';
import { UserPermission } from 'src/database/models/users_permissions.model';
import { Permission } from 'src/database/models/permissions.model';

@Injectable()
export class UserPermissionsService {
  constructor(
    @InjectModel(UserPermission)
    private readonly userpermsModel: typeof UserPermission,
    @InjectModel(Permission)
    private readonly permsModel: typeof Permission,
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  async getPermsByUserId(userId: number): Promise<string[] | null> {
    const userPerms = await this.userpermsModel.findAll({
      where: { user_id: userId },
    });

    if (userPerms && userPerms.length > 0) {
      const permIds = userPerms.map((userPerm) => userPerm.permission_id);
      const perms = await this.permsModel.findAll({
        where: { id: permIds },
      });

      return perms.map((perm) => perm.value);
    } else {
      return ['Gest'];
    }

    return null;
  }

  async getAllPerms() {
    return await this.permsModel.findAll();
  }
}
