import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OwnerPortableDevice } from './database/models/owners_portable_devices.model ';  // Подставьте путь к модели вашего портативного устройства
import { Model } from 'sequelize-typescript';
import { PortableDevice } from './database/models/portable_devices.model ';  // Подставьте путь к модели ваших портативных устройств
import { Sequelize } from 'sequelize';

@Injectable()
export class OwnersPortableDevicesService {
  constructor(
    @InjectModel(OwnerPortableDevice)
    private readonly OwnerPortableDeviceModel: typeof OwnerPortableDevice,
  ) {}

  async getDevicesByUserId(userId: number): Promise<any[]> {
    try {
      const devices = await this.OwnerPortableDeviceModel.findAll({
        where: {
          user_id: userId,
        },
        attributes: [
          [Sequelize.literal('ROW_NUMBER() OVER (ORDER BY "portable_devices"."id")'), 'id'],
          [Sequelize.col('portable_devices.name'), 'device_name'],
          [Sequelize.col('portable_devices.type'), 'device_type'],
          'quantity',
          'created_at',
          'is_shared',
          'shared_quantity',
        ],
        include: [{
          model: PortableDevice,
          attributes: [], 
        }],
        
      });
      return devices;
    } catch (error) {
      throw error;
    }
  }
}