//owners-portable-devices.service.ts
import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OwnerPortableDevice } from '../database/models/owners_portable_devices.model '; // Подставьте путь к модели вашего портативного устройства
import { Model } from 'sequelize-typescript';
import { PortableDevice } from '../database/models/portable_devices.model '; // Подставьте путь к модели ваших портативных устройств
import { Sequelize, Op } from 'sequelize';
import { now } from 'sequelize/types/utils';
import { User } from 'src/database/models/users.model';
@Injectable()
export class OwnersPortableDevicesService {
  constructor(
    @InjectModel(OwnerPortableDevice)
    private readonly OwnerPortableDeviceModel: typeof OwnerPortableDevice,
    
  ) {}

  async  getUserIdByEmail(email: string): Promise<number | null> {
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




  async getDevicesByEmail(email: string): Promise<any[]> {
    try {
      const userId = await this.getUserIdByEmail(email);
      const devices = await this.OwnerPortableDeviceModel.findAll({
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
            model: PortableDevice,
            attributes: [],
          },
        ],
      });
      return devices;
    } catch (error) {
      throw error;
    }
  }


  async searchDevices(
    email: string,
    query: any,
    deviceName?: any,
    deviceType?: any,
    quantity?: any,
    sharedQuantity?: any,
    created_at?: any
  ): Promise<any[]> {
    console.log(created_at);
    try {
      const userId = await this.getUserIdByEmail(email);
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
      } else if (query !== '' && query !== 'undefined') {
        whereClause[Op.or] = [
          Sequelize.literal(`"portable_devices"."name" ILIKE :textQuery`),
          Sequelize.literal(`"portable_devices"."type" ILIKE :textQuery`),
        ];
      }

      if (deviceName !== '' && deviceName !== 'undefined') {
        console.log('device_name is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"portable_devices"."name" ILIKE :textDeviceName`)
        );
      }
      if (deviceType !== '' && deviceType !== 'undefined') {
        console.log('device_type is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"portable_devices"."type" ILIKE :textDeviceType`)
        );
      }
      if (quantity !== '' && quantity !== 'undefined') {
        console.log('quantity is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"quantity" = :numQuantity`)
        );
      }
      if (sharedQuantity !== '' && sharedQuantity !== 'undefined') {
        console.log('shared_quantity is pushed');
        whereClause[Op.and].push(
          Sequelize.literal(`"shared_quantity" = :numSharedQuantity`)
        );
      }
      if (created_at !== '' && created_at !== 'undefined') {
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

      const devices = await this.OwnerPortableDeviceModel.findAll({
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
            model: PortableDevice,
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
      });
      return devices;
    } catch (error) {
      throw error;
    }
  }

  async createDevice(email: string, deviceData: any): Promise<OwnerPortableDevice> {
    try {
      const userId = await this.getUserIdByEmail(email);
      let existingPortableDevice = await PortableDevice.findOne({
        where: {
          name: deviceData.name,
          type: deviceData.type,
        },
      });
      if (!existingPortableDevice) {
        existingPortableDevice = await PortableDevice.create({
          name: deviceData.name,
          type: deviceData.type,
        });
      }
      const existingRecord = await this.OwnerPortableDeviceModel.findOne({
        where: {
          user_id: userId,
          portable_device_id: existingPortableDevice.id,
        },
      });
      if (existingRecord) {
        throw new Error('User has already associated with this device.');
      }
      const ownerPortableDevice = await this.OwnerPortableDeviceModel.create({
        user_id: userId,
        portable_device_id: existingPortableDevice.id,
        quantity: deviceData.quantity,
        is_shared: deviceData.shared_quantity > 0,
        shared_quantity: deviceData.shared_quantity,
        created_at: deviceData.created_at,
      });
      return ownerPortableDevice;
    } catch (error) {
      throw error; // Rethrow the error
    }
  }
  

  async getPortableDeviceById(id: string): Promise<any | null> {
    try {
      const ParsedId = parseInt(id, 10);
      /* const portableDevices = await this.getDevicesByUserId(userId); */
      const portableDevice = await this.OwnerPortableDeviceModel.findOne({
        where: {
          id: ParsedId,
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
            model: PortableDevice,
            attributes: [],
          },
        ],
      });

      return portableDevice || null;
    } catch (error) {
      throw error;
    }
  }

  async updatePortableDeviceById(id: string, deviceData: any): Promise<any> {
    try {
      const ParsedId = parseInt(id, 10);

      // First, check if the portable device with the given ID exists
      const existingPortableDevice =
        await this.OwnerPortableDeviceModel.findOne({
          where: {
            id: ParsedId,
          },
        });

      if (!existingPortableDevice) {
        return null; // Portable device not found
      }

      // Determine the value of is_shared based on shared_quantity
      const isShared = deviceData.shared_quantity > 0;

      // Update the portable device record with the specified data
      await existingPortableDevice.update({
        quantity: deviceData.quantity,
        is_shared: isShared,
        shared_quantity: deviceData.shared_quantity,
        updated_at: new Date(), // Update the updated_at timestamp
      });

      // Find the associated PortableDevice record
      const associatedPortableDevice = await PortableDevice.findByPk(
        existingPortableDevice.portable_device_id
      );

      if (associatedPortableDevice) {
        // Update the PortableDevice record
        await associatedPortableDevice.update({
          type: deviceData.device_type,
          name: deviceData.device_name,
        });
      }

      // Return the updated OwnerPortableDevice
      return existingPortableDevice;
    } catch (error) {
      throw error;
    }
  }
  async deletePortableDeviceById(id: string): Promise<boolean> {
    try {
      const ParsedId = parseInt(id, 10);

      // Find the OwnerPortableDevice record with the given ID
      const existingPortableDevice =
        await this.OwnerPortableDeviceModel.findOne({
          where: {
            id: ParsedId,
          },
        });

      if (!existingPortableDevice) {
        return false; // Portable device not found
      }

      // Find the associated PortableDevice record
      const associatedPortableDevice = await PortableDevice.findByPk(
        existingPortableDevice.portable_device_id
      );

      if (associatedPortableDevice) {
        // Delete the associated PortableDevice record
        await associatedPortableDevice.destroy();
      }

      // Delete the OwnerPortableDevice record
      await existingPortableDevice.destroy();

      return true; // Deletion successful
    } catch (error) {
      throw error;
    }
  }
 


}
