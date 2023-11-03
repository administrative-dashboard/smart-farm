import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './users.model';
import { Greenhouse } from './greenhouses.model';

@Table({ tableName: 'owners_greenhouses', timestamps: false })
export class OwnerGreenhouse extends Model<OwnerGreenhouse> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Greenhouse)
  @Column
  greenhouse_id: number;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @BelongsTo(() => Greenhouse)
  declare greenhouses: Greenhouse;
}
