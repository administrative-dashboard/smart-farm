// user-community.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCommunity } from 'src/database/models/users_communities.model';
import { Community } from 'src/database/models/communities.model'; // Import the Community model

@Injectable()
export class UserCommunityService {
  constructor(
    @InjectModel(UserCommunity)
    private readonly userCommunityModel: typeof UserCommunity,
    @InjectModel(Community) // Inject the Community model
    private readonly communityModel: typeof Community, // Add a reference to the Community model
  ) {}

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
}
