// users.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../database/models/users.model';
import { Community } from 'src/database/models/communities.model';
import { UserCommunity } from 'src/database/models/users_communities.model';
import { Role } from 'src/database/models/roles.model';
import { UserRole } from 'src/database/models/users_roles';

@Module({
  providers: [],
  imports: [
    SequelizeModule.forFeature([
      User,
      Community,
      UserCommunity,
      Role,
      UserRole,
    ]),
    // forwardRef(()=> AuthModule)
  ],
  exports: [SequelizeModule],
})
export class UsersModule {}