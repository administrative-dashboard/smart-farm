// product.model.ts
import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ProductType } from './product_types.model';
import { OwnerProduct } from './owners_products.model';

@Table({ tableName: 'products', timestamps: false })
export class Product extends Model<Product> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({})
  description: string;

  @ForeignKey(() => ProductType)
  @Column
  type_id: number;

  @BelongsTo(() => ProductType)
  declare product_types: ProductType;

  @HasMany(() => OwnerProduct)
  owners_products: OwnerProduct[];
}
