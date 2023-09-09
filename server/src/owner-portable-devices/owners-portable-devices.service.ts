import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OwnerPortableDevice } from '../database/models/owners_portable_devices.model ';  // Подставьте путь к модели вашего портативного устройства
import { Model } from 'sequelize-typescript';
import { PortableDevice } from '../database/models/portable_devices.model ';  // Подставьте путь к модели ваших портативных устройств
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
  async createDevice(userId: number, deviceData: any): Promise<OwnerPortableDevice> {
    try {
      // Create a new portable device record
      const newPortableDevice = await PortableDevice.create({
        name: deviceData.name,
        type: deviceData.type,
      });
  
      // Determine the value of is_shared based on shared_quantity
      const isShared = deviceData.shared_quantity > 0;
  
      // Create an association between the owner and the newly created portable device
      const ownerPortableDevice = await this.OwnerPortableDeviceModel.create({
        user_id: userId, // Assuming you have the user_id in deviceData
        portable_device_id: newPortableDevice.id,
        quantity: deviceData.quantity,
        is_shared: isShared, // Set is_shared based on the condition
        shared_quantity: deviceData.shared_quantity,
        created_at: deviceData.created_at,
      });
  
      return ownerPortableDevice;
    } catch (error) {
      console.log(">>>>>>>>>>>>>>", error);
      throw error;
    }
  }

}