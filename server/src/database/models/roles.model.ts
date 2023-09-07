//roles.model.ts
import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { UserRole } from './users_roles';
import { RolePermission } from './roles_perms.model';
import { User } from './users.model';
import { Permission } from './permissions.model';

@Table({ tableName: 'roles', timestamps: false })
export class Role extends Model<Role> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  value: string;

  @Column
  description: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];

  @BelongsToMany(() => Permission, () => RolePermission)
  permissions: Permission[];
}
