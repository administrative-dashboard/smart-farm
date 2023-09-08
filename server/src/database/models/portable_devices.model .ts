// portable_devices.model.ts
import { Column, Model, Table, BelongsToMany, HasMany } from 'sequelize-typescript';
import { User } from './users.model';
import { DeviceRequestHistory } from './device_requests_history.model';
import { DeviceUsageStatisticsCommunities } from './device_usage_statistics_communities.model';
import { DeviceUsageStatisticsFields } from './device_usage_statistics_fields.model';
import { DeviceUsageStatisticsGreenhouses } from './device_usage_statistics_greenhouses.model';
import { OwnerPortableDevice } from './owners_portable_devices.model ';

@Table({ tableName: 'portable_devices', timestamps: false })
export class PortableDevice extends Model<PortableDevice> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  type: string;

  //  @HasMany(() => OwnerPortableDevice)
  //  users: User[];
  // @HasMany(() => DeviceUsageStatisticsCommunities)
  // device_usage_statistics_communities: DeviceUsageStatisticsCommunities;

  // @HasMany(() => DeviceUsageStatisticsFields)
  // device_usage_statistics_fields: DeviceUsageStatisticsFields;

  // @HasMany(() => DeviceUsageStatisticsGreenhouses)
  // device_usage_statistics_greenhouses: DeviceUsageStatisticsGreenhouses;
}
