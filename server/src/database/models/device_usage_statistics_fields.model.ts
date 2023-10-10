//roles.model.ts
import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Field } from './fields.model'
import { PortableDevice } from './portable_devices.model ';

@Table({ tableName: 'device_usage_statistics_fields', timestamps: false  })
export class DeviceUsageStatisticsFields extends Model<DeviceUsageStatisticsFields> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({})
  quantity: number;

  @Column({})
  start_date: Date;

  @Column({})
  end_date: Date;

  @ForeignKey(() => Field)
  @Column
  field_id: number;

  @ForeignKey(() => PortableDevice)
  @Column
  device_id: number;

}
