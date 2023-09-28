// users.model.ts
import { Column, Model, Table, BelongsToMany, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { RolePermission } from './roles_perms.model';
import { Role } from './roles.model';
import { IntegerDataType } from 'sequelize';
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
  // @HasMany(() => OwnerPortableDevice)
  // users: User[];

  @ForeignKey(() => ProductType)
  @Column
  type_id: number;
  
  @BelongsTo(() => ProductType)
  declare product_types: ProductType;

  @HasMany(() => OwnerProduct)
  owners_products: OwnerProduct[];
 
}
