import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OwnerField } from 'src/database/models/owners_fields.model';
import { Model } from 'sequelize-typescript';
import { Field } from 'src/database/models/fields.model';
import { Sequelize, Op } from 'sequelize';
import { now } from 'sequelize/types/utils';
import { User } from 'src/database/models/users.model';
@Injectable()
export class OwnerFieldsService {
  constructor(
    @InjectModel(OwnerField)
    private readonly ownerField: typeof OwnerField
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

  async getFieldsByEmail(
    email: string,
    page?: number,
    perPage?: number,
    field?: string,
    order?: string
  ): Promise<{ fields: any[], total: number }> {
    try {
      const userId = await this.getUserIdByEmail(email);
      const sort = [];
      if (field && order) {
        sort.push([field, order]); 
      } else {
        sort.push(['id', 'ASC']);
      }  
      const total = await this.ownerField.count({
        where: {
          user_id: userId,
        },
      });
      const devices = await this.ownerField.findAll({
        where: {
          user_id: userId,
        },
        attributes: [
          'id',
          [Sequelize.col('portable_devices.name'), 'device_name'],
          [Sequelize.col('portable_devices.type'), 'device_type'],
          'quantity',
          'created_at',
          'is_shared',
          'shared_quantity',
        ],
        include: [
          {
            model: Field,
            attributes: [],
          },
        ],
        order: sort, 
        offset: ((page - 1) * perPage),
        limit: perPage,
        subQuery: false,
      });

      return { fields, total };
    } catch (error) {
      throw error;
    }
  }
  
  
  async searchFields(
    email: string,
    query?: any,
    deviceName?: any,
    deviceType?: any,
    quantity?: any,
    sharedQuantity?: any,
    created_at?: any,
    page?:number,
    perPage?:number,
    field?:any,
    order?:any,
  ): Promise<{ devices: any[], total: number }>{

    console.log(created_at);
    try {
      
      const userId = await this.getUserIdByEmail(email);
      const sort = [];
      if (field && order) {
        sort.push([field, order]); 
      } else {
        sort.push(['id', 'ASC']);
      } 
      const total = await this.ownerField.count({
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

      if (!isNaN(query) && query !== '') {
        whereClause[Op.or] = [
          Sequelize.literal(`"quantity" = :numQuery`),
          Sequelize.literal(`"shared_quantity" = :numQuery`),
        ];
      } else if (query !== '' && query !== undefined) {
        whereClause[Op.or] = [
          Sequelize.literal(`"portable_devices"."name" ILIKE :textQuery`),
          Sequelize.literal(`"portable_devices"."type" ILIKE :textQuery`),
        ];
      }

      if (deviceName !== '' && deviceName !== undefined) {
        console.log('device_name is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"portable_devices"."name" ILIKE :textDeviceName`)
        );
      }
      if (deviceType !== '' && deviceType !== undefined) {
        console.log('device_type is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"portable_devices"."type" ILIKE :textDeviceType`)
        );
      }
      if (quantity !== '' && quantity !== undefined) {
        console.log('quantity is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"quantity" = :numQuantity`)
        );
      }
      if (sharedQuantity !== '' && sharedQuantity !== undefined) {
        console.log('shared_quantity is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"shared_quantity" = :numSharedQuantity`)
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

      const devices = await this.ownerField.findAll({
        where: whereClause,
        attributes: [
          'id',
          'quantity',
          'created_at',
          'is_shared',
          'shared_quantity',
          [Sequelize.literal(`"portable_devices"."name"`), 'device_name'],
          [Sequelize.literal(`"portable_devices"."type"`), 'device_type'],
        ],
        include: [
          {
            model: Field,
            as: 'portable_devices',
            attributes: [],
          },
        ],
        replacements: {
          textQuery: `%${query}%`,
          textDeviceName: `%${deviceName}%`,
          textDeviceType: `%${deviceType}%`,
          textDeviceDate: `%${created_at}%`,
          numQuantity: quantity,
          numSharedQuantity: sharedQuantity,
          numQuery: query,
        },
        order:sort,
        offset:((page-1)*perPage), 
        limit : perPage,
        subQuery:false, 
      });
      return  {devices, total};
    } catch (error) {
      throw error;
    }
  }
}