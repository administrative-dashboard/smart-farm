//roles.model.ts
import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { UserRole } from './users_roles';

@Table({ tableName: 'roles', timestamps: false })
export class Role extends Model<Role> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  value: string;

  @Column
  description: string;

  @HasMany(() => UserRole)
  users_roles: UserRole[];
}
