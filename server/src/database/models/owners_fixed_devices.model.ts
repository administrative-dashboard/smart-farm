// users.model.ts
import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from './users.model';
import { FixedDevice } from './fixed_devices.model';

@Table({ tableName: 'owners_fixed_devices', timestamps: false })
export class OwnerFixedDevice extends Model<OwnerFixedDevice> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false  })
  id: number;

  @Column({ allowNull: false })
  quantity: number;

  @Column({})
  created_at: Date;

  @Column({})
  updated_at: Date;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => FixedDevice)
  @Column
  fixed_device_id: number;
}
