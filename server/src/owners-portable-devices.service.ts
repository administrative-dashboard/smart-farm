//owners-portable-devices.service
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PortableDevice } from './database/models/portable_devices.model '; // Подставьте путь к модели вашего портативного устройства
import { Model } from 'sequelize-typescript';

@Injectable()
export class OwnersPortableDevicesService {
  constructor(
    @InjectModel(PortableDevice)
    private readonly portableDeviceModel: typeof PortableDevice,
  ) {}

  async getDevicesByUserId(userId: number): Promise<PortableDevice[]> {
    try {
      // Use findAll with a where condition to filter by user_id
      const devices = await this.portableDeviceModel.findAll({
        where: {
          user_id: userId,
        },
      });

      return devices;
    } catch (error) {
      throw error;
    }
  }


  /* async getAllDevices(): Promise<PortableDevice[]> {
    return this.portableDeviceModel.findAll();
  }

  async createDevice(deviceData: Partial<PortableDevice>): Promise<PortableDevice> {
    return this.portableDeviceModel.create(deviceData);
  }

  async getDeviceById(id: number): Promise<PortableDevice | null> {
    return this.portableDeviceModel.findByPk(id);
  } */

  // Другие методы для работы с данными портативных устройств
}
