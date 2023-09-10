import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OwnerPortableDevice } from '../database/models/owners_portable_devices.model ';  // Подставьте путь к модели вашего портативного устройства
import { Model } from 'sequelize-typescript';
import { PortableDevice } from '../database/models/portable_devices.model ';  // Подставьте путь к модели ваших портативных устройств
import { Sequelize } from 'sequelize';
import { now } from 'sequelize/types/utils';

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
          'id',
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
        include: [{
          model: PortableDevice,
          attributes: [], 
        }],
        
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
      const existingPortableDevice = await this.OwnerPortableDeviceModel.findOne({
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
      const associatedPortableDevice = await PortableDevice.findByPk(existingPortableDevice.portable_device_id);
  
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
      const existingPortableDevice = await this.OwnerPortableDeviceModel.findOne({
        where: {
          id: ParsedId,
        },
      });
  
      if (!existingPortableDevice) {
        return false; // Portable device not found
      }
  
      // Find the associated PortableDevice record
      const associatedPortableDevice = await PortableDevice.findByPk(existingPortableDevice.portable_device_id);
  
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