// users.model.ts
import {
  Column,
  Model,
  Table,
  HasOne,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { OwnerGreenhouse } from './owners_greenhouses.model';
import { DeviceUsageStatisticsGreenhouses } from './device_usage_statistics_greenhouses.model';
import { MeasurementUnit } from './measurement_units';
@Table({ tableName: 'greenhouses', timestamps: false })
export class Greenhouse extends Model<Greenhouse> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ unique: true, allowNull: false })
  size: number;

  @Column({})
  description: string;

  @Column({})
  location: string;

  @HasOne(() => OwnerGreenhouse)
  owners_greenhouses: OwnerGreenhouse;

  @ForeignKey(() => MeasurementUnit)
  @Column({ allowNull: false })
  measurement_id: number;

  @BelongsTo(() => MeasurementUnit)
  declare measurement_units: MeasurementUnit;

  @HasMany(() => DeviceUsageStatisticsGreenhouses)
  device_usage_statistics_greenhouses: DeviceUsageStatisticsGreenhouses;
}
