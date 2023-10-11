//roles.model.ts
import { Column, Model, Table, DataType, ForeignKey, HasOne } from 'sequelize-typescript';
import { User } from './users.model';

enum RequestStatus {
  New = 'new',
  Accepted = 'accepted',
  Rejected = 'rejected',
}

@Table({ tableName: 'device_requests_history', timestamps: false  })
export class DeviceRequestHistory extends Model<DeviceRequestHistory> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({})
  created_date: Date;

  @Column({})
  updated_date: Date;

  @Column({})
  used_from: Date;

  @Column({})
  used_to: Date;

  @Column({ type: DataType.ENUM, values: ['new', 'accepted', 'rejected'], defaultValue: 'new' })
  status: RequestStatus;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Column
  device_id: number;

}
