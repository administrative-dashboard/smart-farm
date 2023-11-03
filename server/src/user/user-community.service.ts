// user-community.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCommunity } from 'src/database/models/users_communities.model';
import { Community } from 'src/database/models/communities.model';
import { User } from 'src/database/models/users.model';
import { UserRole } from 'src/database/models/users_roles';
import { Role } from 'src/database/models/roles.model';
import { Sequelize, Op } from 'sequelize';
import { UserPermission } from 'src/database/models/users_permissions.model';
import { Permission } from 'src/database/models/permissions.model';

@Injectable()
export class UserCommunityService {
  constructor(
    @InjectModel(UserCommunity)
    private readonly userCommunityModel: typeof UserCommunity,
    @InjectModel(Community)
    private readonly communityModel: typeof Community,
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  async addUserToCommunity(
    userId: number,
    communityId: number
  ): Promise<UserCommunity> {
    if (Number.isInteger(communityId) && communityId > 0) {
      const existingUserCommunity = await UserCommunity.findOne({
        where: {
          user_id: userId,
        },
      });

      if (existingUserCommunity) {
        existingUserCommunity.community_id = communityId;
        await existingUserCommunity.save();
        return existingUserCommunity;
      } else {
        const newUserCommunity = await UserCommunity.create({
          user_id: userId,
          community_id: communityId,
        });
        return newUserCommunity;
      }
    } else {
      throw new BadRequestException('Invalid community_id');
    }
  }

  async getCommunityNameByUserId(userId: number): Promise<string | null> {
    const userCommunity = await this.userCommunityModel.findOne({
      where: { user_id: userId },
    });

    if (userCommunity) {
      const community = await this.communityModel.findOne({
        where: { id: userCommunity.community_id },
      });

      return community ? community.name : null;
    }

    return null;
  }

  async getUsersInSameCommunity(communityName: string): Promise<{
    data: any[];
    total: number;
  }> {
    try {
      const community = await Community.findOne({
        where: {
          name: communityName,
        },
        include: [
          {
            model: UserCommunity,
            attributes: ['user_id'],
          },
        ],
      });
      console.log('community', community.id);
      if (!community || !community.user_communities) {
        console.log('Community or user_communities is undefined:', community);
        return { data: [], total: 0 };
      }

      const userIDsInCommunity = community.user_communities.map(
        (uc) => uc.user_id
      );

      if (
        !community ||
        !community.user_communities ||
        community.user_communities.length === 0
      ) {
        console.log(
          'Community or user_communities is undefined or empty:',
          community
        );
        return { data: [], total: 0 };
      }
      const users = await User.findAll({
        where: {
          id: userIDsInCommunity,
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

      const data = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        roles: user.users_roles.map((userRole) => userRole.roles.value),
        permissions: user.users_permissions.map(
          (UserPerm) => UserPerm.permissions.value
        ),
      }));

      const total = data.length;
      return { data, total };
    } catch (error) {}
  }

  async searchUsersInSameCommunity(
    communityName: string,
    query?: string,
    page?: number,
    perPage?: number,
    field?: any,
    order?: any
  ): Promise<{
    data: any[];
    total: number;
  }> {
    try {
      const community = await Community.findOne({
        where: {
          name: communityName,
        },
        include: [
          {
            model: UserCommunity,
            attributes: ['user_id'],
          },
        ],
      });

      if (!community || !community.user_communities) {
        console.log('Community or user_communities is undefined:', community);
        return { data: [], total: 0 };
      }

      const userIDsInCommunity = community.user_communities.map(
        (uc) => uc.user_id
      );

      if (
        !community ||
        !community.user_communities ||
        community.user_communities.length === 0
      ) {
        console.log(
          'Community or user_communities is undefined or empty:',
          community
        );
        return { data: [], total: 0 };
      }

      const sort = [];
      if (field && order) {
        sort.push([field, order]);
      } else {
        sort.push(['id', 'ASC']);
      }

      const users = await User.findAll({
        where: {
          id: userIDsInCommunity,
          [Op.or]: [
            { name: { [Op.iLike]: `%${query}%` } },
            { email: { [Op.iLike]: `%${query}%` } },
            { phone_number: { [Op.iLike]: `%${query}%` } },
          ],
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

      const data = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        roles: user.users_roles.map((userRole) => userRole.roles.value),
        permissions: user.users_permissions.map(
          (UserPerm) => UserPerm.permissions.value
        ),
      }));

      const total = data.length;
      return { data, total };
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
