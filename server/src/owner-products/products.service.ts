// products.service.ts

import { Injectable } from '@nestjs/common';
import { OwnerProduct } from '../database/models/owners_products.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/database/models/users.model';
import { Product } from '../database/models/product.model';
import { Sequelize, Op } from 'sequelize';
import { ProductType } from 'src/database/models/product_types.model';
import { type } from 'os';

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
        return null; // Return null if the user with the specified email does not exist
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
            include: [{ model: ProductType, attributes: [] }],
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
          Sequelize.col(`"products"."name" ILIKE :textQuery`),
          //   Sequelize.col(`"products"."type" ILIKE :textQuery`),
        ];
      }

      if (productName !== '' && productName !== undefined) {
        console.log('productName is pushed');
        whereClause[Op.and].push(
          Sequelize.col(`"products"."name" ILIKE :textProductName`)
        );
      }
      if (productType !== '' && productType !== undefined) {
        console.log('productType is pushed');
        whereClause[Op.and]
          .push
          //   Sequelize.col(`"products"."type" ILIKE :textProductType`)
          ();
      }
      if (description !== '' && description !== undefined) {
        console.log('description is pushed');
        whereClause[Op.and].push(
          Sequelize.col(
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
          'name',
          [Sequelize.col('products.description'), 'description'],
          'created_at',
          [Sequelize.col(`"products"."name"`), 'product_name'],
          [Sequelize.col(`"products"."type"`), 'product_type'],
        ],
        include: [
          {
            model: Product,
            as: 'products',
            attributes: [],
          },
        ],
        replacements: {
          textQuery: `%${query}%`,
          textProductName: `%${productName}%`,
          textProductType: `%${productType}%`,
          textDeviceDate: `%${created_at}%`,
          textDeviceDescription: `%${description}%`,
          numQuery: query,
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

  async createProduct(email: string, productData: any): Promise<OwnerProduct> {
    try {
      const userId = await this.getUserIdByEmail(email);

      const typeId = await this.getOrCreateProductTypeId(productData.type);

      let existingProduct = await Product.findOne({
        where: {
          name: productData.name,
          description: productData.description,
          type_id: typeId,
        },
      });

      if (!existingProduct) {
        existingProduct = await Product.create({
          name: productData.name,
          description: productData.description,
          type_id: typeId,
        });
      }

      const existingRecord = await this.OwnerProductModel.findOne({
        where: {
          user_id: userId,
          product_id: existingProduct.id,
        },
      });

      if (existingRecord) {
        throw new Error('USER IS ASSOCIATED WITH THE PRODUCT');
      } else {
        const OwnerProduct = await this.OwnerProductModel.create({
          user_id: userId,
          product_id: existingProduct.id,
          created_at: productData.created_at,
          updated_at: productData.created_at,
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

      // Поиск существующего OwnerProduct по ID
      const existingProduct = await this.OwnerProductModel.findOne({
        where: {
          id: ParsedId,
        },
      });

      if (!existingProduct) {
        return null; // Продукт не найден
      }

      // Получение связанного с OwnerProduct продукта
      const associatedProduct = await Product.findByPk(
        existingProduct.product_id
      );

      if (!associatedProduct) {
        return null; // Продукт не найден
      }

      // Обновление данных OwnerProduct
      await existingProduct.update({
        updated_at: new Date(),
      });

      // Обновление данных связанного продукта
      await associatedProduct.update({
        name: productData.product_name,
        description: productData.description,
      });

      // Проверка и обновление типа продукта, если указан новый тип
      if (productData.type) {
        const typeId = await this.getOrCreateProductTypeId(productData.type);
        await associatedProduct.update({
          type_id: typeId,
        });
      }

      return existingProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductById(id: string): Promise<boolean> {
    try {
      const ParsedId = parseInt(id, 10);

      // Find the OwnerProduct record with the given ID
      const existingProduct = await this.OwnerProductModel.findOne({
        where: {
          id: ParsedId,
        },
      });

      if (!existingProduct) {
        return false; // Product not found
      }

      // Find the associated Product record
      const associatedProduct = await Product.findByPk(
        existingProduct.product_id
      );

      if (associatedProduct) {
        // Delete the associated Product record
        await associatedProduct.destroy();
      }

      // Delete the OwnerProduct record
      await existingProduct.destroy();

      return true; // Deletion successful
    } catch (error) {
      throw error;
    }
  }
}
