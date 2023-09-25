// measurement.model.ts
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Field } from './fields.model';

@Table({ tableName: 'measurement_units', timestamps: false })
export class MeasurementUnit extends Model<MeasurementUnit> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({})
  value: string;

  @Column({})
  type: string;

  @HasMany(() => Field)
  fields: Field[];
}
