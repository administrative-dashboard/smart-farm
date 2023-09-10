import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OwnerPortableDevice } from '../database/models/owners_portable_devices.model '; // Подставьте путь к модели вашего портативного устройства
import { Model } from 'sequelize-typescript';
import { PortableDevice } from '../database/models/portable_devices.model '; // Подставьте путь к модели ваших портативных устройств
import { Sequelize } from 'sequelize';

@Injectable()
export class OwnersPortableDevicesService {
  constructor(
    @InjectModel(OwnerPortableDevice)
    private readonly OwnerPortableDeviceModel: typeof OwnerPortableDevice
  ) {}

  async getDevicesByUserId(userId: number): Promise<any[]> {
    try {
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
  async createDevice(
    userId: number,
    deviceData: any
  ): Promise<OwnerPortableDevice> {
    try {
      const newPortableDevice = await PortableDevice.create({
        name: deviceData.name,
        type: deviceData.type,
      });

      const isShared = deviceData.shared_quantity > 0;

      const ownerPortableDevice = await this.OwnerPortableDeviceModel.create({
        user_id: userId,
        portable_device_id: newPortableDevice.id,
        quantity: deviceData.quantity,
        is_shared: isShared,
        shared_quantity: deviceData.shared_quantity,
        created_at: deviceData.created_at,
      });

      return ownerPortableDevice;
    } catch (error) {
      console.log('>>>>>>>>>>>>>>', error);
      throw error;
    }
  }
  async deleteDevice(id: number): Promise<boolean> {
    try{
      const deletedDevice = await this.OwnerPortableDeviceModel.findByPk(id);
    if(deletedDevice) {
      await deletedDevice.destroy();
      return true;
    } 
    else {
      return false;
    }
    } catch (error) {
      console.error(error);
      throw(error);
    }
  }
}
