// user-community.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCommunity } from 'src/database/models/users_communities.model';
import { Community } from 'src/database/models/communities.model'; // Import the Community model
import { User } from 'src/database/models/users.model';
import { UserRole } from 'src/database/models/users_roles';
import { Role } from 'src/database/models/roles.model';

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

  async addUserToCommunity(userId: number, communityId: number): Promise<UserCommunity> {
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

  async getUsersInSameCommunity(userId: number) {
    const userCommunity = await this.userCommunityModel.findOne({
      where: { user_id: userId },
    });
    console.log(userCommunity.community_id)
    if (userCommunity) {
      const usersInSameCommunity = await this.userCommunityModel.findAll({
        where: { community_id: userCommunity.community_id },
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'email', 'phone_number'],
          },
        ],
        attributes: [],
      });
      return usersInSameCommunity.map((entry) => ({
        // communityName: entry.communities.name,
        userId: entry.users.id,
        userName: entry.users.name,
        userEmail: entry.users.email,
        userPhoneNumber: entry.users.phone_number,
      }));
    }

    return null;
  }
  //   if (userCommunity) {
  //     const usersInSameCommunity = await this.userCommunityModel.findAll({
  //       where: { community_id: userCommunity.community_id },
  //       include: [
  //         {
  //           model: User,
  //           attributes: ['id', 'name', 'email', 'phone_number'],
  //           include: [
  //             {
  //               model: UserRole,
  //               attributes: ['role_id'],
  //               include: [
  //                 {
  //                   model: Role,
  //                   attributes: ['value'],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     });

  //     return usersInSameCommunity;
  //   }

  //   return null;
  // }
}

