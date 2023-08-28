import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from './users.model';
import { Community } from './communities.model';

@Table({ tableName: 'users_communities' })
export class UserCommunity extends Model<UserCommunity> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Community)
  @Column
  community_id: number;
}