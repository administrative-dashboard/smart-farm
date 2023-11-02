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
  Param,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { OwnersPortableDevicesService } from './owners-portable-devices.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { GoogleService } from 'src/auth/google.service';
import { RolesPermsGuard } from 'src/auth/guards/roles_perms.guard';
import { RolesPerms } from 'src/auth/guards/roles_perms.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('portable_devices')
@UseGuards(JwtAuthGuard, RolesPermsGuard)
@RolesPerms('OWNER', 'EDIT_PORTABLE_DEVICE')
export class PortableDevicesController {
  constructor(
    private readonly ownersPortableDevicesService: OwnersPortableDevicesService,
    private readonly googleService: GoogleService,
  ) { }

  @Get()
  async getPortableDevices(
    @Query('q') searchTerm: any,
    @Query('device_name') deviceName: any,
    @Query('device_type') deviceType: any,
    @Query('quantity') quantity: any,
    @Query('shared_quantity') sharedQuantity: any,
    @Query('created_at') date: any,
    @Query('page') page: any,
    @Query('perPage') perPage: any,
    @Query('field') field: any,
    @Query('order') order: any,
    @Request() req
  ) {
    try {
      console.log(typeof (page));
      page = parseInt(page);
      perPage = parseInt(perPage);
      console.log('page::::===', page);
      console.log('perPage::::===', perPage);
      console.log('ЗАПРОС ПОЛУЧЕН!!!!!!!!!');
      console.log('searchTerm==', searchTerm);
      console.log('device_name==', deviceName);
      console.log('device_type==', deviceType);
      console.log('quantity==', quantity);
      console.log('shared_quantity==', sharedQuantity);
      console.log('created_at==', date);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      console.log(email);
      if (searchTerm || deviceName || deviceType || quantity || sharedQuantity || date) {
        const filteredDevices =
          await this.ownersPortableDevicesService.searchDevices(
            email,
            searchTerm,
            deviceName,
            deviceType,
            quantity,
            sharedQuantity,
            date,
            page,
            perPage,
            field,
            order,
          );
        console.log(filteredDevices);
        return filteredDevices;
      } else if (page && perPage) {
        const { data, total } =
          await this.ownersPortableDevicesService.getDevicesByEmail(email, page, perPage, field, order,);
        return { data, total };
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
    @Request() req,
    @Param('id') id: string,
    @Body() deviceData: any,
    @Res() res,
  ) {
    try {
      console.log('Device Data: ', deviceData)
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      const updatedPortableDevice =
        await this.ownersPortableDevicesService.updatePortableDeviceById(
          id,
          deviceData,
          email
        );

      if (!updatedPortableDevice) {
        return { message: 'Portable device not found' };
      }

      res.status(200).json(updatedPortableDevice);
    } catch (error) {
      if (error.message === 'You already have a portable device with the same name and type.') {
        res.status(400).json({
          message: 'You already have a portable device with the same name and type.',
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

  @Post('create')
  async createPortableDevice(@Body() deviceData: any, @Request() req, @Res() res) {
    try {
      console.log(deviceData);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);

      const result = await this.ownersPortableDevicesService.createDevice(
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
