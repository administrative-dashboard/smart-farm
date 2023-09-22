//community.controller.ts
import { Controller, Get, NotFoundException, Query, Request, Res, UseGuards } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { UserCommunityService } from 'src/user/user-community.service';
import { GoogleService } from 'src/auth/google.service';
import { UserService } from 'src/user/user.service';

@Controller('community')
export class CommunitiesController {
  constructor(
    private readonly communitiesService: CommunitiesService,
    private readonly userCommunityService: UserCommunityService,
    private readonly googleService: GoogleService,
    private readonly userService: UserService,
  ) { }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  async getCommunityInfo() {
    return await this.communitiesService.getAllCommunities();
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)
  async getUsersFromCommunity(
    @Query('q') searchTerm: string,
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('phone_number') phone_number: string,
    @Request() req
  ) {
    try {
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      const user = await this.userService.getUserInfoByEmail(email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const userId = user.id;
      const communityName = await this.userCommunityService.getCommunityNameByUserId(userId);
      const users = await this.userCommunityService.getUsersInSameCommunity(communityName);

      const filteredUsers = users.filter((user) => {
        if (
          (searchTerm && user.name.includes(searchTerm)) ||
          (name && user.name === name) ||
          (email && user.email === email) ||
          (phone_number && user.phone_number === phone_number)
        ) {
          return true;
        }
        return false;
      });

      return { communityName, users: filteredUsers };
    } catch (error) {
      console.error('Error fetching community and users:', error);
      return null;
    }
  }