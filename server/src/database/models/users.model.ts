// users.model.ts
import {
  Column,
  Model,
  Table,
  HasOne,
  BelongsToMany,
  HasMany,
  BeforeCreate,
} from 'sequelize-typescript';

import { UserCommunity } from './users_communities.model';
import { UserRole } from './users_roles';
import { Role } from './roles.model';
import { OwnerField } from './owners_fields.model';
import { OwnerGreenhouse } from './owners_greenhouses.model';
import { DeviceRequestHistory } from './device_requests_history.model';
import { FixedDevice } from './fixed_devices.model';
import { PortableDevice } from './portable_devices.model ';
import { OwnerFixedDevice } from './owners_fixed_devices.model';
import { OwnerPortableDevice } from './owners_portable_devices.model ';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model<User> {
  @BeforeCreate
  static async setDefaultRole(instance: User) {
    const defaultRole = await Role.findOne({ where: { value: 'EMPLOYEE' } });
    if (defaultRole) {
      instance.roles = [defaultRole];
    }
  }

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

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasMany(() => OwnerField)
  owners_fields: OwnerField;

  @HasMany(() => OwnerGreenhouse)
  owners_greenhouses: OwnerGreenhouse;

  @HasMany(() => DeviceRequestHistory)
  device_requests_history: DeviceRequestHistory;

  @BelongsToMany(() => FixedDevice, () => OwnerFixedDevice)
  fixed_devices: FixedDevice[];

  @HasMany(() => OwnerPortableDevice)
  owners_portable_devices: OwnerPortableDevice[];
}
