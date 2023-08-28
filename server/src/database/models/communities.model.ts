import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { UserCommunity } from './users_communities.model';

@Table({ tableName: 'communities' })
export class Community extends Model<Community> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ unique: true, allowNull: false })
  name: string;

  @Column(DataType.STRING)
  location: string;

  @HasMany(() => UserCommunity)
  user_communities: UserCommunity[];
}
