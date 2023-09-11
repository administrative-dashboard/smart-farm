// user/user.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'; // Import SequelizeModule
import { UserService } from './user.service';
import { User } from 'src/database/models/users.model'; // Import your User model
import { UserController } from './user.controller';
import { UserCommunityService } from './user-community.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
  ],
  providers: [UserService, UserCommunityService],
  controllers: [UserController],
  // exports: [UserService],
})
export class UserModule {}
