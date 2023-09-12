//User.controller.ts
import { Controller, Get, Request, UseGuards, NotFoundException, Param, Post, Body, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserCommunityService } from './user-community.service';
import { UserCommunity } from 'src/database/models/users_communities.model';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userCommunityService: UserCommunityService,
  ) { }

  @Get('info/:userId')
  async getUserInfo(@Param('userId') userId: number) {
    const userInfo = await this.userService.getUserInfoById(userId);
    return userInfo;
  }

  @Put('updatephone/:userId')
  async updateUserPhoneNumber(
    @Param('userId') userId: number,
    @Body() userData: any,
  ) {
    try {
      const existingUser = await this.userService.getUserInfoById(userId);

      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      existingUser.phone_number = userData.phone_number;
      await existingUser.save();

      return existingUser;
    } catch (error) {
      console.error("Error updating phone number for user:", error);
      throw new NotFoundException('Error updating phone number for user');
    }
  }

  @Post('community/:userId')
  async addCommunity(
    @Param('userId') userId: number,
    @Body() userData: any,
  ) {
    try {
      const newUserCommunity = new UserCommunity();
      newUserCommunity.user_id = userId;
      newUserCommunity.community_id = userData.community_id;
      await newUserCommunity.save();
      return newUserCommunity;
    } catch (error) {
      console.error('Error adding community for user:', error);
    }
  }

  @Get('community/:userId')
  async getCommunityName(@Param('userId') userId: number): Promise<string | null> {
    try {
      const communityName = await this.userCommunityService.getCommunityNameByUserId(userId);
      return communityName;
    } catch (error) {
      console.error('Error fetching community name:', error);
      return null;
    }
  }
}

// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Get('info')
//   // @UseGuards(AuthGuard('jwt')) 
//   async getUserInfo(@Request() req) {
//     const userId = req.user.id; 
//     const userInfo = await this.userService.getUserInfo(1); 
//     if (!userInfo) {
//       throw new NotFoundException('User profile not found');
//     }
//     return userInfo;
//   }
// }
