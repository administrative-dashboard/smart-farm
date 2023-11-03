//community.controller.ts
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { UserCommunityService } from 'src/user/user-community.service';
import { GoogleService } from 'src/auth/google.service';
import { UserService } from 'src/user/user.service';
import { UserRolesService } from 'src/user/user-roles.service';
import { RolesPermsGuard } from 'src/auth/guards/roles_perms.guard';
import { RolesPerms } from 'src/auth/guards/roles_perms.decorator';

@Controller('community')
export class CommunitiesController {
  constructor(
    private readonly communitiesService: CommunitiesService,
    private readonly userCommunityService: UserCommunityService,
    private readonly googleService: GoogleService,
    private readonly userService: UserService,
    private readonly userRoleService: UserRolesService
  ) {}

  @Get('info')
  @UseGuards(JwtAuthGuard)
  async getCommunityInfo() {
    return await this.communitiesService.getAllCommunities();
  }

  @Get('users')
  @UseGuards(JwtAuthGuard, RolesPermsGuard)
  @RolesPerms('ADMIN', 'COMMUNITY_MANAGER', 'EDIT_ROLE')
  async getUsersFromCommunity(
    @Query('q') searchTerm: any,
    @Query('page') page: any,
    @Query('perPage') perPage: any,
    @Query('field') field: any,
    @Query('order') order: any,
    @Request() req
  ) {
    try {
      page = parseInt(page);
      perPage = parseInt(perPage);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      const user = await this.userService.getUserInfoByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const userId = user.id;
      const communityName =
        await this.userCommunityService.getCommunityNameByUserId(userId);
      if (searchTerm) {
        const users =
          await this.userCommunityService.searchUsersInSameCommunity(
            communityName,
            searchTerm,
            page,
            perPage,
            field,
            order
          );
        return users;
      } else {
        const { data, total } =
          await this.userCommunityService.getUsersInSameCommunity(
            communityName
          );

        return { data, total };
      }
    } catch (error) {
      console.error('Error fetching community and users:', error);
      return null;
    }
  }

  @Get('users/:id')
  @UseGuards(JwtAuthGuard, RolesPermsGuard)
  @RolesPerms('ADMIN', 'COMMUNITY_MANAGER', 'EDIT_ROLE')
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
  @UseGuards(JwtAuthGuard, RolesPermsGuard)
  @RolesPerms('ADMIN', 'COMMUNITY_MANAGER', 'EDIT_ROLE')
  async updateUserById(
    @Param('id') id: string,
    @Body() data: any,
    @Request() req,
    @Res() res
  ) {
    try {
      const updatedUser = await this.userService.updateUserById(id, data);

      if (!updatedUser) {
        return res.status(404).json({
          message: 'User not found',
          status: 'error',
        });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
