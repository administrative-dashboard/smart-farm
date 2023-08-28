import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { UserCommunity } from './users_communities.model';
interface CommunityCreationAttrs {
  name: string;
  location: string;
}

@Table({ tableName: 'communities' })
export class Community extends Model<Community, CommunityCreationAttrs> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ unique: true, allowNull: false })
  name: string;

  @Column(DataType.STRING)
  location: string;

  @HasMany(() => UserCommunity)
  user_communities: UserCommunity[];
}