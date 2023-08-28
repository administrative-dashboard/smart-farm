// users_roles.model.ts
import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Permission } from './permissions.model';
import { Role } from './roles.model';

@Table({ tableName: 'roles_perms' })
export class RolePermission extends Model<RolePermission> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @ForeignKey(() => Role)
  @Column
  role_id: number;

  @ForeignKey(() => Permission)
  @Column
  permission_id: number;
}
