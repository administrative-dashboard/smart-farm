// users.model.ts
import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { User } from './users.model';
import { OwnerFixedDevice } from './owners_fixed_devices.model';

@Table({ tableName: 'fixed_devices', timestamps: false })
export class FixedDevice extends Model<FixedDevice> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  type: string;

  @BelongsToMany(() => User, () => OwnerFixedDevice)
  users: User[];
}
