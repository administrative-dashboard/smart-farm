// users.model.ts
import { Column, Model, Table, HasOne } from 'sequelize-typescript';
import { OwnerPortableDevice } from './owners_portable_devices.model ';

@Table({ tableName: 'portable_devices' })
export class PortableDevice extends Model<PortableDevice> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  type: string;

  @Column({})
  description: string;

  @HasOne(() => OwnerPortableDevice)
  owners_portable_devices: OwnerPortableDevice;
}
