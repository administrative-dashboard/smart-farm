// user-community.service.ts

import { Injectable } from '@nestjs/common';
import { UserCommunity } from 'src/database/models/users_communities.model';

@Injectable()
export class UserCommunityService {
  constructor() {}

  async addUserToCommunity(userId: number, communityId: number): Promise<UserCommunity> {
    return await UserCommunity.create({
      user_id: userId,
      community_id: communityId,
    });
  }
}
