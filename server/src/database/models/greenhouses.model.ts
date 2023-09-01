// users.model.ts
import { Column, Model, Table, HasOne } from 'sequelize-typescript';
import { OwnerGreenhouse } from './owners_greenhouses.model';

@Table({ tableName: 'greenhouses', timestamps: false })
export class Greenhouse extends Model<Greenhouse> {
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

  @HasOne(() => OwnerGreenhouse)
  owners_greenhouses: OwnerGreenhouse;
}
