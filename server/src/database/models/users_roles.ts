// users_roles.model.ts
import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './users.model';
import { Role } from './roles.model';

@Table({ tableName: 'users_roles', timestamps: false })
export class UserRole extends Model<UserRole> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @ForeignKey(() => Role)
  @Column
  role_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => Role, 'role_id')
  declare roles: Role;

  @BelongsTo(() => User, 'user_id')
  declare users: User;
}
