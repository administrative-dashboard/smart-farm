// users.model.ts
import { Table, Column, Model, HasOne, HasMany, DataType } from 'sequelize-typescript';
import { UserCommunity } from './users_communities.model';

interface UserCreationAttrs {
  name: string;
  email: string;
  phone_number: string;
  profile_image: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column({ unique: true, allowNull: false })
  email: string;

  @Column(DataType.STRING)
  phone_number: string;

  @Column(DataType.STRING)
  profile_image: string;

  @HasOne(() => UserCommunity)
  user_community: UserCommunity;
}
