// products.service.ts

import { Injectable } from '@nestjs/common';
import { OwnerProduct } from '../database/models/owners_products.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/database/models/users.model';
import { Product } from '../database/models/product.model';
import { Sequelize, Op } from 'sequelize';
import { ProductType } from 'src/database/models/product_types.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(OwnerProduct)
    private readonly OwnerProductModel: typeof OwnerProduct
  ) {}

  async getUserIdByEmail(email: string): Promise<number | null> {
    try {
      const user = await User.findOne({
        attributes: ['id'],
        where: {
          email: email,
        },
      });

      if (user) {
        return user.id;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error retrieving user ID by email:', error);
      throw error;
    }
  }

  async getProductsByEmail(
    email: string,
    page?: number,
    perPage?: number,
    field?: string,
    order?: string
  ): Promise<{ data: any[]; total: number }> {
    try {
      const userId = await this.getUserIdByEmail(email);
      const sort = [];
      if (field && order) {
        sort.push([field, order]);
      } else {
        sort.push(['id', 'ASC']);
      }
      const total = await this.OwnerProductModel.count({
        where: {
          user_id: userId,
        },
      });
      const data = await this.OwnerProductModel.findAll({
        where: {
          user_id: userId,
        },
        attributes: [
          'id',
          [Sequelize.col('products.name'), 'product_name'],
          [Sequelize.col('products.product_types.type'), 'product_type'],
          [Sequelize.col('products.description'), 'description'],
          'created_at',
        ],
        include: [
          {
            model: Product,
            attributes: [],
            include: [
              {
                model: ProductType,
                attributes: [],
              },
            ],
          },
        ],
        order: sort,
        offset: (page - 1) * perPage,
        limit: perPage,
        subQuery: false,
      });

      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async searchProducts(
    email: string,
    query?: any,
    productName?: any,
    productType?: any,
    description?: any,
    created_at?: any,
    page?: number,
    perPage?: number,
    field?: any,
    order?: any
  ): Promise<{ data: any[]; total: number }> {
    console.log(created_at);
    try {
      const userId = await this.getUserIdByEmail(email);
      const sort = [];
      if (field && order) {
        sort.push([field, order]);
      } else {
        sort.push(['id', 'ASC']);
      }
      const total = await this.OwnerProductModel.count({
        where: {
          user_id: userId,
        },
      });
      const whereClause: any = {
        [Op.and]: [
          {
            user_id: userId,
          },
        ],
      };

      if (query !== '' && query !== undefined) {
        whereClause[Op.or] = [
          Sequelize.literal(`"products"."name" ILIKE :textQuery`),
          Sequelize.literal(
            `"products->product_types"."type" ILIKE :textQuery`
          ),
        ];
      }

      if (productName !== '' && productName !== undefined) {
        console.log('productName is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"products"."name" ILIKE :textProductName`)
        );
      }
      if (productType !== '' && productType !== undefined) {
        console.log('productType is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(
            `"products->product_types"."type" ILIKE :textProductType`
          )
        );
      }
      if (description !== '' && description !== undefined) {
        console.log('description is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(
            `"products"."description" ILIKE :textProductDescription`
          )
        );
      }

      if (created_at !== '' && created_at !== undefined) {
        console.log('created_at is pushed');
        const date = new Date(created_at);
        date.setHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);
        whereClause[Op.and].push({
          created_at: {
            [Op.between]: [date, endDate],
          },
        });
      }

      const data = await this.OwnerProductModel.findAll({
        where: whereClause,
        attributes: [
          'id',
          [Sequelize.col('products.description'), 'description'],
          'created_at',
          [Sequelize.col(`products.name`), 'product_name'],
          [Sequelize.col(`products.product_types.type`), 'product_type'],
        ],
        include: [
          {
            model: Product,
            as: 'products',
            attributes: [],
            include: [{ model: ProductType, attributes: ['type'] }],
          },
        ],
        replacements: {
          textQuery: `%${query}%`,
          textProductName: `%${productName}%`,
          textProductType: `%${productType}%`,
          textProductDescription: `%${description}%`,
        },
        order: sort,
        offset: (page - 1) * perPage,
        limit: perPage,
        subQuery: false,
      });
      return { data, total };
    } catch (error) {
      throw error;
    }
  }

  async getOrCreateProductTypeId(typeName: string): Promise<number> {
    try {
      const existingType = await ProductType.findOne({
        where: {
          type: typeName,
        },
      });

      if (existingType) {
        return existingType.id;
      } else {
        const newType = await ProductType.create({
          type: typeName,
        });
        return newType.id;
      }
    } catch (error) {
      throw error;
    }
  }

  async getProductTypeId(typeName: string): Promise<number> {
    try {
      const existingType = await ProductType.findOne({
        where: {
          type: typeName,
        },
      });

      if (existingType) {
        return existingType.id;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(email: string, productData: any): Promise<OwnerProduct> {
    try {
      const userId = await this.getUserIdByEmail(email);

      const typeId = await this.getOrCreateProductTypeId(productData.type);

      let existingOwnerProduct = await Product.findOne({
        where: {
          name: productData.name,
          description: productData.description,
          type_id: typeId,
        },
      });

      if (!existingOwnerProduct) {
        existingOwnerProduct = await Product.create({
          name: productData.name,
          description: productData.description,
          type_id: typeId,
        });
      }

      const existingRecord = await this.OwnerProductModel.findOne({
        where: {
          user_id: userId,
          product_id: existingOwnerProduct.id,
        },
      });

      if (existingRecord) {
        throw new Error('USER IS ASSOCIATED WITH THE PRODUCT');
      } else {
        const OwnerProduct = await this.OwnerProductModel.create({
          user_id: userId,
          product_id: existingOwnerProduct.id,
          created_at: productData.created_at,
          updated_at: productData.updated_at,
        });

        return OwnerProduct;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProductById(id: string): Promise<any | null> {
    try {
      const ParsedId = parseInt(id, 10);
      const product = await this.OwnerProductModel.findOne({
        where: {
          id: ParsedId,
        },
        attributes: [
          'id',
          [Sequelize.col('products.description'), 'description'],
          'created_at',
          [Sequelize.col('products.name'), 'product_name'],
          [Sequelize.col('products.product_types.type'), 'product_type'],
        ],
        include: [
          {
            model: Product,
            attributes: [],
            include: [{ model: ProductType, attributes: [] }],
          },
        ],
      });
      return product || null;
    } catch (error) {
      throw error;
    }
  }

  async updateProductById(id: string, productData: any): Promise<any> {
    try {
      const ParsedId = parseInt(id, 10);

      const existingOwnerProduct = await this.OwnerProductModel.findOne({
        where: {
          id: ParsedId,
        },
      });

      if (!existingOwnerProduct) {
        return null;
      }

      const associatedProduct = await Product.findByPk(
        existingOwnerProduct.product_id
      );

      if (!associatedProduct) {
        return null;
      }

      const getedtype = await this.getProductTypeId(productData.product_type);

      if (getedtype) {
        const existingProductWithSameData = await Product.findOne({
          where: {
            name: productData.product_name,
            description: productData.description,
            type_id: getedtype,
          },
        });

        if (existingProductWithSameData) {
          throw new Error(
            'A product with the same name, description, and type already exists'
          );
        }
      }

      await existingOwnerProduct.update({
        updated_at: new Date(),
      });

      await associatedProduct.update({
        name: productData.product_name,
        description: productData.description,
        type_id: await this.getOrCreateProductTypeId(productData.product_type),
      });

      return existingOwnerProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductById(id: string): Promise<boolean> {
    try {
      const ParsedId = parseInt(id, 10);

      const existingOwnerProduct = await this.OwnerProductModel.findOne({
        where: {
          id: ParsedId,
        },
      });

      if (!existingOwnerProduct) {
        return false; 
      }

      const associatedProduct = await Product.findByPk(
        existingOwnerProduct.product_id
      );

      if (associatedProduct) {
        await associatedProduct.destroy();
      }

      await existingOwnerProduct.destroy();

      return true;
    } catch (error) {
      throw error;
    }
  }
}
