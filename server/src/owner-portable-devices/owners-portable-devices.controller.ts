import {
  Controller,
  Get,
  Put,
  Request,
  Delete,
  Res,
  Post,
  Body,
  Logger,
  Param,
  Query,
  UseGuards,
  NotFoundException
} from '@nestjs/common'; // Import Logger
import { Response, query, response } from 'express';
import { OwnersPortableDevicesService } from './owners-portable-devices.service';
import { HttpCode } from '@nestjs/common';
import { Headers } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
@Controller('portable_devices')
@UseGuards(JwtAuthGuard)
export class PortableDevicesController {
  constructor(
    private readonly ownersPortableDevicesService: OwnersPortableDevicesService
  ) {}

  @Get()
  async getPortableDevices(@Query('q') searchTerm: string, @Request() req) {
    try {
      console.log('ЗАПРОС ПОЛУЧЕН');

      const userId = req.user.user_id;
      console.log(userId);

      // Fetch all portable devices for the user
      let portableDevices = await this.ownersPortableDevicesService.getDevicesByUserId(userId);

      // If a search term is provided, filter the devices
      
      if (searchTerm) {
        console.log(searchTerm+'bbb');
        portableDevices = portableDevices.filter(device => {
          // Modify the condition to filter based on your data structure
          return (
            device.device_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            device.device_type.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
      }

      const totalItems = portableDevices.length;

      // Return the filtered devices
      return portableDevices;
    } catch (error) {
      // Use NestJS NotFoundException for better error handling
      throw new NotFoundException('Portable devices not found', 'custom-error-code');
    }
  }

  


  @Get(':id')
  async getPortableDeviceById(@Param('id') id: string) {
    try {
      const portableDevice =
        await this.ownersPortableDevicesService.getPortableDeviceById(id);

      if (!portableDevice) {
        return { message: 'Portable device not found' };
      }

      return portableDevice;
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred' };
    }
  }

  @Put(':id')
  async updatePortableDeviceById(
    @Param('id') id: string,
    @Body() deviceData: any
  ) {
    try {
      const updatedPortableDevice =
        await this.ownersPortableDevicesService.updatePortableDeviceById(
          id,
          deviceData
        );

      if (!updatedPortableDevice) {
        return { message: 'Portable device not found' };
      }

      return updatedPortableDevice;
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred' };
    }
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createPortableDevice(@Body() deviceData: any, @Request() req) {
    try {
      console.log(deviceData);
      const userId = req.user.user_id;
      return await this.ownersPortableDevicesService.createDevice(
        userId,
        deviceData
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  async deletePortableDeviceById(@Param('id') id: string) {
    try {
      const deleted =
        await this.ownersPortableDevicesService.deletePortableDeviceById(id);

      if (!deleted) {
        return { message: 'Portable device not found' };
      }

      return { message: 'Portable device deleted successfully' };
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred' };
    }
  }
}
