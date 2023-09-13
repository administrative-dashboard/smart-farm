//User.controller.ts
import { Controller, Get, Request, UseGuards, NotFoundException, Param, Post, Body, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserCommunityService } from './user-community.service';
import { UserCommunity } from 'src/database/models/users_communities.model';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userCommunityService: UserCommunityService,
  ) { }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Request() req) {
    const userId = req.user.user_id;
    const userInfo = await this.userService.getUserInfoById(userId);
    return userInfo;
  }

  @Put('updatephone')
  @UseGuards(JwtAuthGuard)
  async updateUserPhoneNumber(@Request() req, @Body() userData: any) {
    try {
      const userId = req.user.user_id;
      const existingUser = await this.userService.getUserInfoById(userId);

      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      // You may want to add validation for phone_number here if needed

      existingUser.phone_number = userData.phone_number;
      const updatedUser = await existingUser.save();

      return updatedUser;
    } catch (error) {
      console.error('Error updating phone number for user:', error);
      throw new NotFoundException('Error updating phone number for user');
    }
  }

  @Post('community')
  @UseGuards(JwtAuthGuard)
  async addCommunity(@Request() req, @Body() userData: any) {
    try {
      const userId = req.user.user_id;
      const newUserCommunity = new UserCommunity();
      newUserCommunity.user_id = userId;
      newUserCommunity.community_id = userData.community_id;
      await newUserCommunity.save();
      return newUserCommunity;
    } catch (error) {
      console.error('Error adding community for user:', error);
    }
  }

  @Get('community')
  @UseGuards(JwtAuthGuard)
  async getCommunityName(@Request() req) {
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
