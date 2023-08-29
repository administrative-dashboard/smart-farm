// users_roles.model.ts
import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from './users.model';
import { Role } from './roles.model';

@Table({ tableName: 'users_roles' })
export class UserRole extends Model<UserRole> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @ForeignKey(() => Role)
  @Column
  role_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;
}