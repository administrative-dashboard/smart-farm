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
  Param,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { OwnersFixedDevicesService } from './owner-fixed-devices.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { GoogleService } from 'src/auth/google.service';
import { RolesPermsGuard } from 'src/auth/guards/roles_perms.guard';
import { RolesPerms } from 'src/auth/guards/roles_perms.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@Controller('fixed_devices')
@ApiTags('portable_devices')
@UseGuards(JwtAuthGuard, RolesPermsGuard)
@RolesPerms('OWNER', 'EDIT_FIXED_DEVICE')
export class FixedDevicesController {
  constructor(
    private readonly ownersFixedDevicesService: OwnersFixedDevicesService,
    private readonly googleService: GoogleService
  ) {}

  @ApiBearerAuth()
  @Get()
  async getFixedDevices(
    @Query('q') searchTerm: any,
    @Query('device_name') deviceName: any,
    @Query('device_type') deviceType: any,
    @Query('quantity') quantity: any,
    @Query('created_at') date: any,
    @Query('page') page: any,
    @Query('perPage') perPage: any,
    @Query('field') field: any,
    @Query('order') order: any,
    @Request() req
  ) {
    try {
      page = parseInt(page);
      perPage = parseInt(perPage);
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
            date,
            page,
            perPage,
            field,
            order
          );
        return filteredDevices;
      } else {
        console.log('else');
        const { data, total } =
          await this.ownersFixedDevicesService.getDevicesByEmail(
            email,
            page,
            perPage,
            field,
            order
          );
        return { data, total };
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

  @ApiBearerAuth()
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

  @ApiBearerAuth()
  @Put(':id')
  async updateFixedDeviceById(
    @Request() req,
    @Param('id') id: string,
    @Body() deviceData: any,
    @Res() res
  ) {
    try {
      console.log('Device Data: ', deviceData);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      const updatedFixedDevice =
        await this.ownersFixedDevicesService.updateFixedDeviceById(
          id,
          deviceData,
          email
        );

      if (!updatedFixedDevice) {
        return { message: 'Fixed device not found' };
      }

      res.status(200).json(updatedFixedDevice);
    } catch (error) {
      if (
        error.message ===
        'You already have a fixed device with the same name and type.'
      ) {
        res.status(400).json({
          message:
            'You already have a fixed device with the same name and type.',
          status: 'error',
        });
      } else {
        res.status(500).json({
          message: 'An error occurred.',
          status: 'error',
        });
      }
    }
  }

  @ApiBearerAuth()
  @Post('create')
  async createFixedDevice(@Body() deviceData: any, @Request() req, @Res() res) {
    try {
      console.log(deviceData);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);

      const result = await this.ownersFixedDevicesService.createDevice(
        email,
        deviceData
      );

      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'USER IS ASSOCIATED WITH THE DEVICE') {
        res.status(400).json({
          message: 'You already have a device with the same name and type.',
          status: 'error',
        });
      } else {
        res.status(500).json({
          message: 'An error occurred.',
          status: 'error',
        });
        console.log(error);
      }
    }
  }

  @ApiBearerAuth()
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
