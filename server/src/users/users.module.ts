// users.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../database/models/users.model';
import { Community } from 'src/database/models/communities.model';
import { UserCommunity } from 'src/database/models/users_communities.model';

@Module({
  providers: [],
  imports: [
    SequelizeModule.forFeature([User, Community, UserCommunity]),
    // forwardRef(()=> AuthModule)
  ],
  exports: [SequelizeModule],
})
export class UsersModule{ }