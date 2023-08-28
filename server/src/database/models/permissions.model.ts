// users.model.ts
import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { RolePermission } from './roles_perms.model';
import { Role } from './roles.model';

@Table({ tableName: 'permissions' })
export class Permission extends Model<Permission> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  value: string;

  @Column({})
  description: string;

  @BelongsToMany(() => Role, () => RolePermission)
  roles: Role[];
}
