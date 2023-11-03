import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './users.model';
import { Field } from './fields.model';
import { MeasurementUnit } from './measurement_units';

@Table({ tableName: 'owners_fields', timestamps: false })
export class OwnerField extends Model<OwnerField> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Field)
  @Column
  field_id: number;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @BelongsTo(() => Field)
  declare fields: Field;
}
