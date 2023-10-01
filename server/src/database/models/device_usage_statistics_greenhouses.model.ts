//roles.model.ts
import { Column, Model, Table, DataType, ForeignKey, HasOne } from 'sequelize-typescript';
import { Greenhouse } from './greenhouses.model'
import { PortableDevice } from './portable_devices.model';

@Table({ tableName: 'device_usage_statistics_greenhouses', timestamps: false  })
export class DeviceUsageStatisticsGreenhouses extends Model<DeviceUsageStatisticsGreenhouses> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({})
  quantity: number;

  @Column({})
  start_date: Date;

  @Column({})
  end_date: Date;

  @ForeignKey(() => Greenhouse)
  @Column
  greenhouse_id: number;

  @ForeignKey(() => PortableDevice)
  @Column
  device_id: number;

  // @HasOne(() => ScheduleDevice)
  // schedules_devices: ScheduleDevice;
}
