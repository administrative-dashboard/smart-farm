//roles.model.ts
import { Column, Model, Table, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './users.model';
import { PortableDevice } from './portable_devices.model';

@Table({ tableName: 'device_requests_history' })
export class DeviceRequestHistory extends Model<DeviceRequestHistory> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ defaultValue: DataType.NOW })
  date: Date;

  @Column({ defaultValue: false })
  status: boolean;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => PortableDevice)
  @Column
  portable_device_id: number;
}
