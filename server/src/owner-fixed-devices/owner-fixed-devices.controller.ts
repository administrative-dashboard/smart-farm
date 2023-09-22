//owner-Fixed-devices.controller.ts
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
import { OwnersFixedDevicesService } from './owner-fixed-devices.service';
import { HttpCode } from '@nestjs/common';
import { Headers } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { NotFoundError } from 'rxjs';
import { GoogleService } from 'src/auth/google.service';
@Controller('fixed_devices')
@UseGuards(JwtAuthGuard)
export class FixedDevicesController {
  constructor(
    private readonly ownersFixedDevicesService: OwnersFixedDevicesService,
    private readonly googleService: GoogleService
  ) {}

  @Get()
  async getFixedDevices(
    @Query('q') searchTerm: any,
    @Query('device_name') deviceName: any,
    @Query('device_type') deviceType: any,
    @Query('quantity') quantity: any,
    @Query('created_at') date: any,
    @Request() req
  ) {
    try {
      console.log('ЗАПРОС ПОЛУЧЕН!!!!!!!!!');
      console.log('searchTerm==', searchTerm);
      console.log('device_name==', deviceName);
      console.log('device_type==', deviceType);
      console.log('quantity==', quantity);
      console.log('created_at==', date);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      console.log(email);
      if (searchTerm || deviceName || deviceType || quantity || date) {
        console.log('filters');
        const filteredDevices =
          await this.ownersFixedDevicesService.searchDevices(
            email,
            searchTerm,
            deviceName,
            deviceType,
            quantity,
            date
          );
        return filteredDevices;
      } else {
        console.log('else');
        let fixedDevices = await this.ownersFixedDevicesService.getDevicesByEmail(email);
        const totalItems = fixedDevices.length;
        return fixedDevices;
      } 

      // console.log('Filtered Devices:', FixedDevices);
      // return FixedDevices;
    } catch (error) {
      throw new NotFoundException(
        'Fixed devices not found',
        'custom-error-code'
      );
    }
  }

  @Get(':id')
  async getFixedDeviceById(@Param('id') id: string) {
    try {
      const fixedDevice =
        await this.ownersFixedDevicesService.getFixedDeviceById(id);

      if (!fixedDevice) {
        return { message: 'Fixed device not found' };
      }

      return fixedDevice;
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred' };
    }
  }

  @Put(':id')
  async updateFixedDeviceById(
    @Param('id') id: string,
    @Body() deviceData: any
  ) {
    try {
      const updatedFixedDevice =
        await this.ownersFixedDevicesService.updateFixedDeviceById(
          id,
          deviceData
        );

      if (!updatedFixedDevice) {
        return { message: 'Fixed device not found' };
      }

      return updatedFixedDevice;
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred' };
    }
  }

  @Post('create')
  async createFixedDevice(@Body() deviceData: any, @Request() req) {
    try {
      console.log(deviceData);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);

      const result = await this.ownersFixedDevicesService.createDevice(
        email,
        deviceData
      );

      return result; // If successful, return the created device
    } catch (error) {
      if (error.message === 'User has already associated with this device.') {
        // Return a specific response when the error message matches
        return {
          message: 'User has already associated with this device.',
          status: 'error',
        };
      } else {
        console.log(error);
        // Handle other errors or rethrow if needed
        throw error;
      }
    }
  }

  @Delete(':id')
  async deleteFixedDeviceById(@Param('id') id: string) {
    try {
      const deleted =
        await this.ownersFixedDevicesService.deleteFixedDeviceById(id);

      if (!deleted) {
        return { message: 'Fixed device not found' };
      }

      return { message: 'Fixed device deleted successfully' };
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred' };
    }
  }
}