// user-community.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCommunity } from 'src/database/models/users_communities.model';
import { Community } from 'src/database/models/communities.model';
import { User } from 'src/database/models/users.model';
import { UserRole } from 'src/database/models/users_roles';
import { Role } from 'src/database/models/roles.model';
export interface UserWithRoles {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  profile_image: string;
  roles: string[];
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

  async addUserToCommunity(
    userId: number,
    communityId: number
  ): Promise<UserCommunity> {
    return await UserCommunity.create({
      user_id: userId,
      community_id: communityId,
    });
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

  async getUsersInSameCommunity(
    communityName: string
  ): Promise<{data: any[], total: number}> {
    const users = await User.findAll({
      include: [
        {
          model: UserCommunity,
          include: [
            {
              model: Community,
              where: {
                name: communityName,
              },
            },
          ],
        },
        {
          model: UserRole,
          include: [
            {
              model: Role,
            },
          ],
        },
      ],
    });
const total = 6;
    const data = users.map((user) => {
      const roles = user.users_roles.map((userRole) => userRole.roles.value);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        profile_image: user.profile_image,
        roles: roles,
      };
    });

    return {data, total};
  }
}