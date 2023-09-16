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
import { NotFoundError } from 'rxjs';
@Controller('portable_devices')
export class PortableDevicesController {
  constructor(
    private readonly ownersPortableDevicesService: OwnersPortableDevicesService
  ) {}

  @Get()
  async getPortableDevices(@Query('q') searchTerm: string, @Request() req) {
    try {
      console.log('ЗАПРОС ПОЛУЧЕН');
      console.log('SEARCH TERM==', searchTerm);
      const userId = req.user.user_id;
      console.log(userId);
      if (searchTerm) {
        console.log('Search Term:', searchTerm);
        const filteredDevices =
          await this.ownersPortableDevicesService.searchDevices(
            searchTerm,
            userId
          );
        console.log('After Filtering:', filteredDevices);
        return filteredDevices;
      } else {
        let portableDevices =
          await this.ownersPortableDevicesService.getDevicesByUserId(userId);
        console.log(portableDevices);
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

  @Get('search')
  @UseGuards(JwtAuthGuard)
  async searchDevices(@Query('q') query: string, @Request() req) {
    try {
      const userId = req.user.user_id;
      const portableDevices =
        await this.ownersPortableDevicesService.searchDevices(query, userId);
      return portableDevices;
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  async getPortableDeviceById(@Param('id') id: string) {
    try {
      /* const userIdFromToken = 1; */

      // Call the service to get the portable device by ID
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
      // Call the service to update the portable device by ID
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

      // Call the service to create the portable device
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
      // Call the service method to delete the portable device by ID
      const deleted =
        await this.ownersPortableDevicesService.deletePortableDeviceById(id);

      if (!deleted) {
        return { message: 'Portable device not found' };
      }

      return { message: 'Portable device deleted successfully' };
    } catch (error) {
      // Handle any errors, e.g., return an error response
      console.log(error);
      return { error: 'An error occurred' };
    }
  }
}
