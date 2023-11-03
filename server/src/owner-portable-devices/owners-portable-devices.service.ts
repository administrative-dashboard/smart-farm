//owners-portable-devices.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OwnerPortableDevice } from '../database/models/owners_portable_devices.model ';
import { PortableDevice } from '../database/models/portable_devices.model ';
import { Sequelize, Op } from 'sequelize';
import { User } from 'src/database/models/users.model';
@Injectable()
export class OwnersPortableDevicesService {
  constructor(
    @InjectModel(OwnerPortableDevice)
    private readonly OwnerPortableDeviceModel: typeof OwnerPortableDevice
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

  async getDevicesByEmail(
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
      const total = await this.OwnerPortableDeviceModel.count({
        where: {
          user_id: userId,
        },
      });
      const data = await this.OwnerPortableDeviceModel.findAll({
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

  async searchDevices(
    email: string,
    query?: any,
    deviceName?: any,
    deviceType?: any,
    quantity?: any,
    sharedQuantity?: any,
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
      const total = await this.OwnerPortableDeviceModel.count({
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

      const data = await this.OwnerPortableDeviceModel.findAll({
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

  async createDevice(
    email: string,
    deviceData: any
  ): Promise<OwnerPortableDevice> {
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
        throw new Error('USER IS ASSOCIATED WITH THE DEVICE');
      } else {
        const ownerPortableDevice = await this.OwnerPortableDeviceModel.create({
          user_id: userId,
          portable_device_id: existingPortableDevice.id,
          quantity: deviceData.quantity,
          is_shared: deviceData.shared_quantity > 0,
          shared_quantity: deviceData.shared_quantity,
          created_at: deviceData.created_at,
        });
        return ownerPortableDevice;
      }
    } catch (error) {
      if ((error.message = 'USER IS ASSOCIATED WITH THE DEVICE')) {
        throw error;
      }
      console.error(error);
    }
  }

  async getPortableDeviceById(id: string): Promise<any | null> {
    try {
      const ParsedId = parseInt(id, 10);
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

  async updatePortableDeviceById(
    id: string,
    deviceData: any,
    email: string
  ): Promise<any> {
    try {
      const ParsedId = parseInt(id, 10);
      const userId = await this.getUserIdByEmail(email);

      const repeatingDevice = await this.OwnerPortableDeviceModel.findOne({
        where: {
          user_id: userId,
          id: {
            [Op.not]: ParsedId,
          },
        },
        include: [
          {
            model: PortableDevice,
            where: {
              name: deviceData.device_name,
              type: deviceData.device_type,
            },
          },
        ],
      });
      if (repeatingDevice) {
        throw new Error(
          'You already have a portable device with the same name and type.'
        );
      }
      const existingPortableDevice =
        await this.OwnerPortableDeviceModel.findOne({
          where: {
            id: ParsedId,
          },
        });

      if (!existingPortableDevice) {
        return null;
      }
      const isShared = deviceData.shared_quantity > 0;

      await existingPortableDevice.update({
        quantity: deviceData.quantity,
        is_shared: isShared,
        shared_quantity: deviceData.shared_quantity,
        updated_at: new Date(),
      });

      const associatedPortableDevice = await PortableDevice.findByPk(
        existingPortableDevice.portable_device_id
      );

      if (associatedPortableDevice) {
        await associatedPortableDevice.update({
          type: deviceData.device_type,
          name: deviceData.device_name,
        });
      }

      return existingPortableDevice;
    } catch (error) {
      throw error;
    }
  }
  async deletePortableDeviceById(id: string): Promise<boolean> {
    try {
      const ParsedId = parseInt(id, 10);

      const existingPortableDevice =
        await this.OwnerPortableDeviceModel.findOne({
          where: {
            id: ParsedId,
          },
        });

      if (!existingPortableDevice) {
        return false;
      }

      const associatedPortableDevice = await PortableDevice.findByPk(
        existingPortableDevice.portable_device_id
      );

      if (associatedPortableDevice) {
        await associatedPortableDevice.destroy();
      }

      await existingPortableDevice.destroy();

      return true;
    } catch (error) {
      throw error;
    }
  }
}
