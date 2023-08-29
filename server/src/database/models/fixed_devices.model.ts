// users.model.ts
import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from './users.model';

@Table({ tableName: 'fixed_devices' })
export class FixedDevice extends Model<FixedDevice> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false  })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  type: string;

  @Column({ allowNull: false })
  quantity: number;

  @Column({})
  created_at: Date;

  @Column({})
  updated_at: Date;

  @ForeignKey(() => User)
  @Column
  user_id: number;
}
