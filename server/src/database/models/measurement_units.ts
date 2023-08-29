// users.model.ts
import { Column, Model, Table, HasMany } from 'sequelize-typescript';

import { OwnerFixedDevice } from './owners_fixed_devices.model';
import { OwnerPortableDevice } from './owners_portable_devices.model ';

@Table({ tableName: 'measurement_units' })
export class MeasurementUnit extends Model<MeasurementUnit> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({})
  value: string;

  @HasMany(() => OwnerPortableDevice)
  owners_portable_devices: OwnerPortableDevice;

  @HasMany(() => OwnerFixedDevice)
  owners_fixed_devices: OwnerFixedDevice;
}
