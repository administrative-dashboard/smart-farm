import { Controller } from '@nestjs/common';
import { PortableDevicesService } from './portable-devices.service';
import { Post, Body } from '@nestjs/common';
@Controller('portable_device')
export class PortableDevicesController {
  constructor(
    private readonly portableDevicesService: PortableDevicesService
  ) {}

  @Post()
  async createPortableDevice(@Body() deviceData: any) {
    try {
      return await this.portableDevicesService.createDevice(deviceData);
    } catch (error) {
      console.log(error);
    }
  }
}
