// users.model.ts
import {
  Column,
  Model,
  Table,
  HasOne,
  BelongsToMany,
} from 'sequelize-typescript';

import { UserCommunity } from './users_communities.model';
import { UserRole } from './users_roles';
import { Role } from './roles.model';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ unique: true, allowNull: false })
  email: string;

  @Column({ allowNull: false })
  phone_number: string;

  @Column({ allowNull: false })
  profile_image: string;

  @HasOne(() => UserCommunity)
  users_communities: UserCommunity;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
