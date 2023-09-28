// owners_products.model.ts
import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './users.model';
import { Product } from './product.model';

@Table({ tableName: 'owners_products', timestamps: false })
export class OwnerProduct extends Model<OwnerProduct> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({})
  created_at: Date;

  @Column({})
  updated_at: Date;

  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => Product)
  declare products: Product;

  @BelongsTo(() => User)
  declare users: User;
}
