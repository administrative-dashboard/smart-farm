// permissions.model.ts
import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { RolePermission } from './roles_perms.model';
import { Role } from './roles.model';
import { UserPermission } from './users_permissions.model';

@Table({ tableName: 'permissions', timestamps: false })
export class Permission extends Model<Permission> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  value: string;

  @Column({})
  description: string;

  @HasMany(() => UserPermission)
  users_permissions: UserPermission[];
}
