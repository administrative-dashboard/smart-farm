//roles.model.ts
import { Column, Model, Table, DataType, ForeignKey, HasOne } from 'sequelize-typescript';
import { Community } from './communities.model'
import { PortableDevice } from './portable_devices.model';

@Table({ tableName: 'device_usage_statistics_communities', timestamps: false  })
export class DeviceUsageStatisticsCommunities extends Model<DeviceUsageStatisticsCommunities> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({})
  quantity: number;

  @Column({})
  start_date: Date;

  @Column({})
  end_date: Date;

  @ForeignKey(() => Community)
  @Column
  community_id: number;

  @ForeignKey(() => PortableDevice)
  @Column
  device_id: number;

  // @HasOne(() => ScheduleDevice)
  // schedules_devices: ScheduleDevice;
}
