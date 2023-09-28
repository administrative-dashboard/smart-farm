// users.model.ts
import { Column, Model, Table, BelongsToMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { RolePermission } from './roles_perms.model';
import { Role } from './roles.model';
import { IntegerDataType } from 'sequelize';
import { ProductType } from './product_types.model';
import { User } from './users.model';
import { Product } from './product.model';

@Table({ tableName: 'owners_products', timestamps: false })
export class OwnerProduct extends Model<OwnerProduct> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({})
  description: string;

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

// user_id integer [ref: > users.id]
//   product_id integer [ref: > products.id] 
//   created_at timestamp 
//   updated_at timestamp 