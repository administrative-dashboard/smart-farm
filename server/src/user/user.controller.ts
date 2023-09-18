//User.controller.ts
import { Controller, Get, Request, UseGuards, NotFoundException, Param, Post, Body, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserCommunityService } from './user-community.service';
import { UserCommunity } from 'src/database/models/users_communities.model';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { GoogleService } from 'src/auth/google.service';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userCommunityService: UserCommunityService,
    private readonly googleService: GoogleService
  ) { }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Request() req) {
    // const userId = req.user.user_id;
    const accessToken = req.user.accessToken;
    const email = await this.googleService.getUserInfo(accessToken);
    console.log("email", email);
    const userInfo = await this.userService.getUserInfoByEmail(email);
    return userInfo;
  }

  @Put('info')
  @UseGuards(JwtAuthGuard)
  async updateUserInfo(@Request() req, @Body() userData: any) {
    try {
      // const userId = req.user.user_id;
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      const existingUser = await this.userService.getUserInfoByEmail(email);
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }
      if (userData.name) {
        existingUser.name = userData.name;
      }

      if (userData.phone_number) {
        existingUser.phone_number = userData.phone_number;
      }

      if (userData.profile_image) {
        existingUser.profile_image = userData.profile_image;
      }

      const updatedUser = await existingUser.save();
      return updatedUser;
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  }

  @Put('updatephone')
  @UseGuards(JwtAuthGuard)
  async updateUserPhoneNumber(@Request() req, @Body() userData: any) {
    try {
      // const userId = req.user.user_id;
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      const existingUser = await this.userService.getUserInfoByEmail(email);

      if (!existingUser) {
        throw new NotFoundException('User not found');
      }
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
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      const user = await this.userService.getUserInfoByEmail(email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const userId = user.id;
      const communityId = userData.community_id;
      const newUserCommunity = await this.userCommunityService.addUserToCommunity(userId, communityId);
      return newUserCommunity;
    } catch (error) {
      console.error('Error adding community for user:', error);
      throw new NotFoundException('Error adding community for user');
    }
  }

  @Get('community')
  @UseGuards(JwtAuthGuard)
  async getCommunityName(@Request() req) {
    try {
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      const user = await this.userService.getUserInfoByEmail(email);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const userId = user.id;
      const communityName = await this.userCommunityService.getCommunityNameByUserId(userId);
      return communityName;
    } catch (error) {
      console.error('Error fetching community name:', error);
      throw new NotFoundException('Error fetching community name');
    }
  }
}
