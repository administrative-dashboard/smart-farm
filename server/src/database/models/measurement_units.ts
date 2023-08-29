// users.model.ts
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'measurement_units' })
export class MeasurementUnit extends Model<MeasurementUnit> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({})
  value: string;
}
