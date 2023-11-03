// users.model.ts
import {
  Column,
  Model,
  Table,
  HasOne,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { OwnerField } from './owners_fields.model';
import { MeasurementUnit } from './measurement_units';

@Table({ tableName: 'fields', timestamps: false })
export class Field extends Model<Field> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ unique: true, allowNull: false })
  size: number;

  @Column({})
  description: string;

  @Column({})
  location: string;

  @HasOne(() => OwnerField)
  owners_fields: OwnerField;

  @ForeignKey(() => MeasurementUnit)
  @Column({ allowNull: false })
  measurement_id: number;

  @BelongsTo(() => MeasurementUnit)
  declare measurement_units: MeasurementUnit;
}
