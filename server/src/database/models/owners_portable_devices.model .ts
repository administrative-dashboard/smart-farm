// owners_portable_devices.model.ts
import {
  Column,
  Model,
  Table,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './users.model';
import { DeviceRequestHistory } from './device_requests_history.model';
import { DeviceUsageStatisticsCommunities } from './device_usage_statistics_communities.model';
import { DeviceUsageStatisticsFields } from './device_usage_statistics_fields.model';
import { DeviceUsageStatisticsGreenhouses } from './device_usage_statistics_greenhouses.model';
import { PortableDevice } from './portable_devices.model ';

@Table({ tableName: 'owners_portable_devices', timestamps: false })
export class OwnerPortableDevice extends Model<OwnerPortableDevice> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  quantity: number;

  @Column({})
  created_at: Date;

  @Column({})
  updated_at: Date;

  @Column({})
  is_shared: boolean;

  @Column({})
  shared_quantity: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => PortableDevice)
  @Column
  portable_device_id: number;

  @BelongsTo(() => PortableDevice)
  declare portable_devices: PortableDevice;
}
