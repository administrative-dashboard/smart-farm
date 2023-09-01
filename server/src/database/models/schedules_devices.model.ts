//roles.model.ts
import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DeviceRequestHistory } from './device_requests_history.model';

@Table({ tableName: 'schedules_devices' })
export class ScheduleDevice extends Model<ScheduleDevice> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({})
  actual_used_from: Date;

  @Column({})
  actual_used_to: Date;

  @ForeignKey(() => DeviceRequestHistory)
  @Column
  device_request_history_id: number;
}
