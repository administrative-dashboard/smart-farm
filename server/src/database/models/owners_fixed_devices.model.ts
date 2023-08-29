import { Column, Model, Table, ForeignKey, DataType } from 'sequelize-typescript';
import { User } from './users.model';
import { FixedDevice } from './fixed_devices.model';
import { MeasurementUnit } from './measurement_units';


@Table({ tableName: 'owners_fixed_devices' })
export class OwnerFixedDevice extends Model<OwnerFixedDevice> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({})
  quantity: number;

  @Column({ defaultValue: DataType.NOW })
  date: Date;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => FixedDevice)
  @Column
  fixed_device_id: number;

  @ForeignKey(() => MeasurementUnit)
  @Column
  measurement_id: number;
}