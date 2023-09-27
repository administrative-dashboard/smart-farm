import { Module } from '@nestjs/common';
import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';
import { Community } from 'src/database/models/communities.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserCommunityService } from 'src/user/user-community.service';
import { User } from 'src/database/models/users.model';
import { UserCommunity } from 'src/database/models/users_communities.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Community, User, UserCommunity]),
  ],
  controllers: [CommunitiesController],
  providers: [CommunitiesService, UserCommunityService]
})
export class CommunitiesModule { }