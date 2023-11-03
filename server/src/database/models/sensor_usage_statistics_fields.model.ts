import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';

@Table({ tableName: 'sensor_usage_statistics_fields', timestamps: false })
export class SensorUsageStatisticsFields extends Model<SensorUsageStatisticsFields> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({})
  start_date: Date;

  @Column({})
  end_date: Date;
}
