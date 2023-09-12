// user/user.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'; // Import SequelizeModule
import { UserService } from './user.service';
import { User } from 'src/database/models/users.model'; // Import your User model
import { UserController } from './user.controller';
import { UserCommunityService } from './user-community.service';
import { UserCommunity } from 'src/database/models/users_communities.model';
import { Community } from 'src/database/models/communities.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserCommunity, Community]),
  ],
  providers: [UserService, UserCommunityService],
  controllers: [UserController],
  // exports: [UserService],
})
export class UserModule {}
