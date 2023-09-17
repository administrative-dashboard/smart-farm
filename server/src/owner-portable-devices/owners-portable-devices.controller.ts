//owner-portable-devices.controller.ts
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
import { NotFoundError } from 'rxjs';
@Controller('portable_devices')
@UseGuards(JwtAuthGuard)
export class PortableDevicesController {
  constructor(
    private readonly ownersPortableDevicesService: OwnersPortableDevicesService
  ) {}

  @Get()
  async getPortableDevices(
    @Query() queryParams: any,
    @Request() req,
  ) {
    try {
      console.log('ЗАПРОС ПОЛУЧЕН');
      console.log('QUERY PARAMETERS:', queryParams);
      const userId = req.user.user_id;
      console.log(userId);

      let portableDevices;

      if (queryParams.q) {
        // Handle search by general query
        portableDevices = await this.ownersPortableDevicesService.searchDevices(queryParams.q, userId);
      } else if (queryParams.device_name) {
        // Handle search by device name
        portableDevices = await this.ownersPortableDevicesService.searchDeviceName(queryParams.device_name, userId);
      } else if (queryParams.device_type) {
        // Handle search by device type
        portableDevices = await this.ownersPortableDevicesService.searchDeviceType(queryParams.device_type, userId);
      } else if (queryParams.quantity) {
        // Handle search by quantity
        portableDevices = await this.ownersPortableDevicesService.searchDeviceQuantity(queryParams.quantity, userId);
      } else if (queryParams.shared_quantity) {
        // Handle search by shared quantity
        portableDevices = await this.ownersPortableDevicesService.searchSharedQuantity(queryParams.shared_quantity, userId);
      } else {
        // No valid query parameter provided, fetch all devices
        portableDevices = await this.ownersPortableDevicesService.getDevicesByUserId(userId);
      }

      console.log('Filtered Devices:', portableDevices);
      return portableDevices;
    } catch (error) {
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
