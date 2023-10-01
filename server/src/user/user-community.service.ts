// user-community.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCommunity } from 'src/database/models/users_communities.model';
import { Community } from 'src/database/models/communities.model';
import { User } from 'src/database/models/users.model';
import { UserRole } from 'src/database/models/users_roles';
import { Role } from 'src/database/models/roles.model';
import { Sequelize } from 'sequelize';
export interface UserWithRoles {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  profile_image: string;
  roles: string;
}
@Injectable()
export class UserCommunityService {
  constructor(
    @InjectModel(UserCommunity)
    private readonly userCommunityModel: typeof UserCommunity,
    @InjectModel(Community)
    private readonly communityModel: typeof Community,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) { }

  // async addUserToCommunity(
  //   userId: number,
  //   communityId: number
  // ): Promise<UserCommunity> {
  //   return await UserCommunity.create({
  //     user_id: userId,
  //     community_id: communityId,
  //   });
  // }
  async addUserToCommunity(userId: number, communityId: number): Promise<UserCommunity> {
    // Check if communityId is a valid integer
    if (Number.isInteger(communityId) && communityId > 0) {
      // Check if the record already exists
      const existingUserCommunity = await UserCommunity.findOne({
        where: {
          user_id: userId,
        },
      });
  
      if (existingUserCommunity) {
        // If it exists, update the community_id
        existingUserCommunity.community_id = communityId;
        await existingUserCommunity.save();
        return existingUserCommunity;
      } else {
        // If it doesn't exist, create a new record
        const newUserCommunity = await UserCommunity.create({
          user_id: userId,
          community_id: communityId,
        });
        return newUserCommunity;
      }
    } else {
      // Handle the case where communityId is not a valid integer
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
    data: any[],
    total: number
  }> {
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
      return { data: [], total: 0 };
    }
    const userIDsInCommunity = community.user_communities.map(
      (uc) => uc.user_id
    );
    const data = await User.findAll({
      where: {
        id: userIDsInCommunity,
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

    const total = data.length;
    return { data, total };
  }
}
