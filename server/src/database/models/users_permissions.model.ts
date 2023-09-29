// users_perms.model.ts
import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './users.model';
import { Permission } from './permissions.model';

@Table({ tableName: 'users_permissions', timestamps: false })
export class UserPermission extends Model<UserPermission> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @ForeignKey(() => Permission)
  @Column
  permission_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => Permission)
  declare permissions: Permission;

  @BelongsTo(() => User)
  declare users: User;
}

