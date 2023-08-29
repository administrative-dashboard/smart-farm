import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from './users.model';
import { Field } from './fields.model';

@Table({ tableName: 'owners_fields' })
export class OwnerField extends Model<OwnerField> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Field)
  @Column
  field_id: number;
}