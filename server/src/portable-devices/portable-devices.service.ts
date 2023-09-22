import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PortableDevice } from 'src/database/models/portable_devices.model ';
@Injectable()
export class PortableDevicesService {
  constructor(
    @InjectModel(PortableDevice)
    private readonly portableDeviceModel: typeof PortableDevice,
  ) {}

  async createDevice(deviceData: { name: string; type: string }): Promise<PortableDevice> {
    try {
      // Create a new portable device record
      const newPortableDevice = await this.portableDeviceModel.create({
        name: deviceData.name,
        type: deviceData.type,
      });

      return newPortableDevice;
    } catch (error) {
      // Handle any errors
      throw error;
    }
  }
}
