import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { User } from './users.model';
import { Community } from './communities.model';

interface UserCommunityCreationAttrs {
  user_id: number;
  community_id: number;
}

@Table({ tableName: 'users_communities' })
export class UserCommunity extends Model<UserCommunity, UserCommunityCreationAttrs> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Community)
  @Column
  community_id: number;
}