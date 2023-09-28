// product_types.model.ts
import { Column, Model, Table, BelongsToMany, HasMany } from 'sequelize-typescript';
import { RolePermission } from './roles_perms.model';
import { Role } from './roles.model';
import { Product } from './product.model';

@Table({ tableName: 'product_types', timestamps: false })
export class ProductType extends Model<ProductType> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  type: string;

  @Column({})
  description: string;
  
  @HasMany(() => Product)
  products: Product[];
 
}
