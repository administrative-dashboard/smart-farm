// product_types.model.ts
import {
  Column,
  Model,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { Product } from './product.model';

@Table({ tableName: 'product_types', timestamps: false })
export class ProductType extends Model<ProductType> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  type: string;

  @HasMany(() => Product)
  products: Product[];
}
