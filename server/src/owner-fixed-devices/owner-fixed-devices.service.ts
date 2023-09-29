//owners-fixed-devices.service.ts
import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OwnerFixedDevice } from 'src/database/models/owners_fixed_devices.model';
import { Model } from 'sequelize-typescript';
import { FixedDevice } from 'src/database/models/fixed_devices.model';
import { Sequelize, Op } from 'sequelize';
import { now } from 'sequelize/types/utils';
import { User } from 'src/database/models/users.model';
@Injectable()
export class OwnersFixedDevicesService {
  constructor(
    @InjectModel(OwnerFixedDevice)
    private readonly OwnerFixedDeviceModel: typeof OwnerFixedDevice
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

  async getDevicesByEmail(email: string,page?:number,
    perPage?:number,field?: string,
    order?: string): Promise<{ data: any[], total: number }> {
    try {
      const userId = await this.getUserIdByEmail(email);
      const sort = [];
      if (field && order) {
        sort.push([field, order]); 
      } else {
        sort.push(['id', 'ASC']);
      } 
      const total = await this.OwnerFixedDeviceModel.count({
        where: {
          user_id: userId,
        },
      });
      console.log(userId);
      const data = await this.OwnerFixedDeviceModel.findAll({
        where: {
          user_id: userId,
        },
        attributes: [
          'id',
          [Sequelize.col('fixed_devices.name'), 'device_name'],
          [Sequelize.col('fixed_devices.type'), 'device_type'],
          'quantity',
          'created_at',
        ],
        include: [
          {
            model: FixedDevice,
            attributes: [],
          },
        ],
        order: sort,
        offset:((page-1)*perPage),
        limit : perPage,
        subQuery:false,
      });
      return {data, total};
    } catch (error) {
      throw error;
    }
  }

  async searchDevices(
    email: string,
    query?: any,
    deviceName?: any,
    deviceType?: any,
    quantity?: any,
    created_at?: any,
    page?:number,
    perPage?:number,
    field?:any,
    order?:any,
  ): Promise<{ data: any[], total: number }> {
    console.log(created_at);
    try {
      //console.log("searchdevice");
      const userId = await this.getUserIdByEmail(email);
      const sort = [];
      if (field && order) {
        sort.push([field, order]); 
      } else {
        sort.push(['id', 'ASC']);
      } 
      const total = await this.OwnerFixedDeviceModel.count({
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
        whereClause[Op.or] = [Sequelize.literal(`"quantity" = :numQuery`)];
      } else if (query !== '' && query !== undefined) {
        whereClause[Op.or] = [
          Sequelize.literal(`"fixed_devices"."name" ILIKE :textQuery`),
          Sequelize.literal(`"fixed_devices"."type" ILIKE :textQuery`),
        ];
      }

      if (deviceName !== '' && deviceName !== undefined) {
        console.log('device_name is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"fixed_devices"."name" ILIKE :textDeviceName`)
        );
      }
      if (deviceType !== '' && deviceType !== undefined) {
        console.log('device_type is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"fixed_devices"."type" ILIKE :textDeviceType`)
        );
      }
      if (quantity !== '' && quantity !== undefined) {
        console.log('quantity is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"quantity" = :numQuantity`)
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

      const data = await this.OwnerFixedDeviceModel.findAll({
        where: whereClause,
        attributes: [
          'id',
          'quantity',
          'created_at',
          [Sequelize.literal(`"fixed_devices"."name"`), 'device_name'],
          [Sequelize.literal(`"fixed_devices"."type"`), 'device_type'],
        ],
        include: [
          {
            model: FixedDevice,
            as: 'fixed_devices',
            attributes: [],
          },
        ],
        replacements: {
          textQuery: `%${query}%`,
          textDeviceName: `%${deviceName}%`,
          textDeviceType: `%${deviceType}%`,
          textDeviceDate: `%${created_at}%`,
          numQuantity: quantity,
          numQuery: query,
        },
        order: sort,
        offset:((page-1)*perPage), 
        limit : perPage,
        subQuery:false, 
      });
      return {data, total};
    } catch (error) {
      throw error;
    }
  }

  async createDevice(
    email: string,
    deviceData: any
  ): Promise<OwnerFixedDevice> {
    try {
      const userId = await this.getUserIdByEmail(email);
      let existingFixedDevice = await FixedDevice.findOne({
        where: {
          name: deviceData.name,
          type: deviceData.type,
        },
      });
      if (!existingFixedDevice) {
        existingFixedDevice = await FixedDevice.create({
          name: deviceData.name,
          type: deviceData.type,
        });
      }
      const existingRecord = await this.OwnerFixedDeviceModel.findOne({
        where: {
          user_id: userId,
          fixed_device_id: existingFixedDevice.id,
        },
      });
      if(existingRecord) {
        throw new Error("USER IS ASSOCIATED WITH THE DEVICE");
      } else {
         const ownerFixedDevice = await this.OwnerFixedDeviceModel.create({
        user_id: userId,
        fixed_device_id: existingFixedDevice.id,
        quantity: deviceData.quantity,
        created_at: deviceData.created_at,
      });
      return ownerFixedDevice;
      }
      
    } catch (error) {
      if(error.message="USER IS ASSOCIATED WITH THE DEVICE"){
        throw(error);
      }
      console.error(error);

    }
  }

  async getFixedDeviceById(id: string): Promise<any | null> {
    try {
      console.log('inside get');
      const ParsedId = parseInt(id, 10);
      /* const fixedDevices = await this.getDevicesByUserId(userId); */
      const fixedDevice = await this.OwnerFixedDeviceModel.findOne({
        where: {
          id: ParsedId,
        },
        attributes: [
          'id',
          [Sequelize.col('fixed_devices.name'), 'device_name'],
          [Sequelize.col('fixed_devices.type'), 'device_type'],
          'quantity',
          'created_at',
        ],
        include: [
          {
            model: FixedDevice,
            attributes: [],
          },
        ],
      });

      return fixedDevice || null;
    } catch (error) {
      throw error;
    }
  }

  async updateFixedDeviceById(id: string, deviceData: any,email:string): Promise<any> {
    try {
      const ParsedId = parseInt(id, 10);
      const userId = await this.getUserIdByEmail(email);
      const repeatingDevice =
      await this.OwnerFixedDeviceModel.findOne({
        where: {
          user_id : userId,
          id: {
            [Op.not]: ParsedId, // Используйте Op.not для исключения записи с определенным id
          },

        },
        include: [
          {
            model: FixedDevice,
            where: {
              name: deviceData.device_name,
              type: deviceData.device_type,
            },
          },
        ],
      });
      if (repeatingDevice) {
        throw new Error('You already have a fixed device with the same name and type.');
      }
    
    
    
      // First, check if the fixed device with the given ID exists
      const existingFixedDevice = await this.OwnerFixedDeviceModel.findOne({
        where: {
          id: ParsedId,
        },
      });

      if (!existingFixedDevice) {
        return null; // Fixed device not found
      }

      await existingFixedDevice.update({
        quantity: deviceData.quantity,
        updated_at: new Date(),
      });

      // Find the associated FixedDevice record
      const associatedFixedDevice = await FixedDevice.findByPk(
        existingFixedDevice.fixed_device_id
      );

      if (associatedFixedDevice) {
        // Update the FixedDevice record
        await associatedFixedDevice.update({
          type: deviceData.device_type,
          name: deviceData.device_name,
        });
      }

      // Return the updated OwnerFixedDevice
      return existingFixedDevice;
    } catch (error) {
      throw error;
    }
  }
  async deleteFixedDeviceById(id: string): Promise<boolean> {
    try {
      const ParsedId = parseInt(id, 10);

      // Find the OwnerFixedDevice record with the given ID
      const existingFixedDevice = await this.OwnerFixedDeviceModel.findOne({
        where: {
          id: ParsedId,
        },
      });

      if (!existingFixedDevice) {
        return false; // Fixed device not found
      }

      // Find the associated FixedDevice record
      const associatedFixedDevice = await FixedDevice.findByPk(
        existingFixedDevice.fixed_device_id
      );

      if (associatedFixedDevice) {
        // Delete the associated FixedDevice record
        await associatedFixedDevice.destroy();
      }

      // Delete the OwnerFixedDevice record
      await existingFixedDevice.destroy();

      return true; // Deletion successful
    } catch (error) {
      throw error;
    }
  }
}
