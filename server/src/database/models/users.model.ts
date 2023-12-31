// users.model.ts
import { Column, Model, Table, HasOne, HasMany } from 'sequelize-typescript';

import { UserCommunity } from './users_communities.model';
import { UserRole } from './users_roles';
import { OwnerField } from './owners_fields.model';
import { OwnerGreenhouse } from './owners_greenhouses.model';
import { DeviceRequestHistory } from './device_requests_history.model';
import { OwnerFixedDevice } from './owners_fixed_devices.model';
import { OwnerPortableDevice } from './owners_portable_devices.model ';
import { UserPermission } from './users_permissions.model';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ unique: true, allowNull: false })
  email: string;

  @Column({ allowNull: false })
  phone_number: string;

  @Column({ allowNull: false })
  profile_image: string;

  @HasOne(() => UserCommunity)
  users_communities: UserCommunity;

  @HasMany(() => UserRole)
  users_roles: UserRole[];

  @HasMany(() => OwnerField)
  owners_fields: OwnerField;

  @HasMany(() => OwnerGreenhouse)
  owners_greenhouses: OwnerGreenhouse;

  @HasMany(() => DeviceRequestHistory)
  device_requests_history: DeviceRequestHistory;

  @HasMany(() => OwnerPortableDevice)
  owners_portable_devices: OwnerPortableDevice[];

  @HasMany(() => OwnerFixedDevice)
  owners_fixed_devices: OwnerFixedDevice[];

  @HasMany(() => UserPermission)
  users_permissions: UserPermission[];
}