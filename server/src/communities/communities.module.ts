import { Module } from '@nestjs/common';
import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';
import { Community } from 'src/database/models/communities.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserCommunityService } from 'src/user/user-community.service';
import { User } from 'src/database/models/users.model';
import { UserCommunity } from 'src/database/models/users_communities.model';
import { GoogleService } from 'src/auth/google.service';
import { UserService } from 'src/user/user.service';
import { UserRolesService } from 'src/user/user-roles.service';
import { UserRole } from 'src/database/models/users_roles';
import { Role } from 'src/database/models/roles.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Community, User, UserCommunity, UserRole, Role]),
  ],
  controllers: [CommunitiesController],
  providers: [CommunitiesService, UserCommunityService, GoogleService, UserService, UserRolesService]
})
export class CommunitiesModule { }
