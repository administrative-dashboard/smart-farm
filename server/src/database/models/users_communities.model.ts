//user_communities.ts
import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './users.model';
import { Community } from './communities.model';

@Table({ tableName: 'users_communities', timestamps: false })
export class UserCommunity extends Model<UserCommunity> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Community)
  @Column
  community_id: number;

  @BelongsTo(() => User)
  declare users: User;

  @BelongsTo(() => Community)
  declare communities: Community;
}