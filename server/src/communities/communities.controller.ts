//community.controller.ts
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { UserCommunityService } from 'src/user/user-community.service';
import { GoogleService } from 'src/auth/google.service';
import { UserService } from 'src/user/user.service';
import { UserRolesService } from 'src/user/user-roles.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';

@Controller('community')
export class CommunitiesController {
  constructor(
    private readonly communitiesService: CommunitiesService,
    private readonly userCommunityService: UserCommunityService,
    private readonly googleService: GoogleService,
    private readonly userService: UserService,
    private readonly userRoleService: UserRolesService
  ) { }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  async getCommunityInfo() {
    return await this.communitiesService.getAllCommunities();
  }
  
  @Get('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'COMMUNITY_MANAGER')
  async getUsersFromCommunity(
    @Query('q') searchTerm: string,
    @Query('name') name: string,
    @Query('email') email: string,
    @Query('phone_number') phone_number: string,
    @Query('roles') roles: string,
    @Query('permissions') permissions: string,
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
      const { data, total } = await this.userCommunityService.getUsersInSameCommunity(communityName);

      // const filteredUsers = data.filter((user) => {
      //   if (
      //     (searchTerm && user.user.name.includes(searchTerm)) || // Filter based on user name
      //     (name && user.user.name === name) ||
      //     (email && user.user.email === email) ||
      //     (phone_number && user.user.phone_number === phone_number) ||
      //     (role && user.roles.includes(role))
      //   ) {
      //     return true;
      //   }
      //   return false;
      // });
      return { data, total };
      // return { communityName, data };
    } catch (error) {
      console.error('Error fetching community and users:', error);
      return null;
    }
  }
  @Get('users/:id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string) {
    try {
      const data = await this.userService.getUserById(id);
      if (!data) {
        return { message: 'user not found' };
      }

      return data;
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred' };
    }
  }

  @Put('users/:id')
  @UseGuards(JwtAuthGuard)
  async updateUserById(
    @Param('id') id: string,
    @Body() data: any
  ) {
    try {
      const updateUserById =
        await this.userService.updateUserById(
          id,
          data
        );

      if (!updateUserById) {
        return { message: 'user not found' };
      }

      return updateUserById;
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred' };
    }
  }

}