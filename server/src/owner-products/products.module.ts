import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { OwnerProduct } from '../database/models/owners_products.model';
import { Product } from '../database/models/product.model';
import { GoogleService } from 'src/auth/google.service';
import { ProductType } from 'src/database/models/product_types.model';

@Module({
  imports: [SequelizeModule.forFeature([OwnerProduct, Product, ProductType])],
  providers: [ProductsService, GoogleService],
  controllers: [ProductsController],
})
export class OwnerProductModule {}
