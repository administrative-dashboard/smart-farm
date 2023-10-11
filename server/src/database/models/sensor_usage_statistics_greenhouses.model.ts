
import { Column, Model, Table} from 'sequelize-typescript';


@Table({ tableName: 'sensor_usage_statistics_greenhouses', timestamps: false  })
export class SensorUsageStatisticsGreenhouses extends Model<SensorUsageStatisticsGreenhouses> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({})
  start_date: Date;

  @Column({})
  end_date: Date;

}
