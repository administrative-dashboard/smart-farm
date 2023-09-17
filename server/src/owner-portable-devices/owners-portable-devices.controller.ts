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
  NotFoundException,
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
  async getPortableDevices(
    @Query('q') searchTerm: any,
    @Query('device_name') deviceName: any,
    @Query('device_type') deviceType: any,
    @Query('quantity') quantity: any,
    @Query('shared_quantity') sharedQuantity: any,
    @Query('created_at') date: any,
    @Request() req
  ) {
    try {
      console.log('ЗАПРОС ПОЛУЧЕН!!!!!!!!!');
      console.log('searchTerm==', searchTerm);
      console.log('device_name==', deviceName);
      console.log('device_type==', deviceType);
      console.log('quantity==', quantity);
      console.log('shared_quantity==', sharedQuantity);
      console.log('created_at==', date);
      const userId = req.user.user_id;
      console.log(userId);
      if (searchTerm || deviceName || deviceType || quantity || sharedQuantity || date) {
        const filteredDevices =
          await this.ownersPortableDevicesService.searchDevices(
            userId,
            searchTerm,
            deviceName,
            deviceType,
            quantity,
            sharedQuantity,
            date
          );
        /* console.log('After Filtering:', filteredDevices); */
        return filteredDevices;
      } else {
        let portableDevices =
        await this.ownersPortableDevicesService.getDevicesByUserId(userId);
        /* console.log(portableDevices); */
        const totalItems = portableDevices.length;
        return portableDevices;
      }
    } catch (error) {
      throw new NotFoundException(
        'Portable devices not found',
        'custom-error-code'
      );
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
