import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { UserCommunityService } from 'src/user/user-community.service';

@Controller('community')
export class CommunitiesController {
  constructor(
    private readonly communitiesService: CommunitiesService,
    private readonly userCommunityService: UserCommunityService,
  ) { }

  @Get('info')
  async getCommunityInfo() {
    return await this.communitiesService.getAllCommunities();
  }

  //katarel community_manager
  @Get('users')
  @UseGuards(JwtAuthGuard)
  async getUsersFromCommunity(@Request() req) {
    try {
      const userId = req.user.user_id;
      const communityName = await this.userCommunityService.getCommunityNameByUserId(userId);
      return communityName;
    } catch (error) {
      console.error('Error fetching community name:', error);
      return null;
    }
  }
}
