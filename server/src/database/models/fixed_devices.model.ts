// users.model.ts
import {
  Column,
  Model,
  Table,
  HasOne 
} from 'sequelize-typescript';
import { OwnerFixedDevice } from './owners_fixed_devices.model';


@Table({ tableName: 'fixed_devices' })
export class FixedDevice extends Model<FixedDevice> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false  })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  type: string;

  @Column({})
  description: string;

  @HasOne(() => OwnerFixedDevice)
  owners_fixed_devices: OwnerFixedDevice;

}
