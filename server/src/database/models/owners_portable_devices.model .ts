import { Column, Model, Table, ForeignKey, DataType } from 'sequelize-typescript';
import { User } from './users.model';
import { PortableDevice } from './portable_devices.model';
import { MeasurementUnit } from './measurement_units';

@Table({ tableName: 'owners_portable_devices' })
export class OwnerPortableDevice extends Model<OwnerPortableDevice> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({})
  quantity: number;

  @Column({ defaultValue: DataType.NOW })
  date: Date;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => PortableDevice)
  @Column
  portable_device_id: number;

  @ForeignKey(() => MeasurementUnit)
  @Column
  measurement_id: number;
}