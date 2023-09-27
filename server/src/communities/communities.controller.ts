//community.controller.ts
import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
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
  @UseGuards(JwtAuthGuard)
  async getCommunityInfo() {
    return await this.communitiesService.getAllCommunities();
  }
}

  // @Get('users')
  // @UseGuards(JwtAuthGuard)
  // async getUsersFromCommunity(@Request() req) {
  //   try {
  //     const userId = req.user.user_id;
  //     const communityName = await this.userCommunityService.getCommunityNameByUserId(userId);
  //     const users = await this.userCommunityService.getUsersInSameCommunity(userId);
  //     //  response.header('Content-Range', `users 0-${users.length - 1}/${users.length}`);

  //     return { communityName, users };
  //   } catch (error) {
  //     console.error('Error fetching community and users:', error);
  //     return null;
  //   }
  // }
