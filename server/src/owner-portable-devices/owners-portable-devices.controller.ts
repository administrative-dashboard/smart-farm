import {
  Controller,
  Get,
  Req,
  Res,
  Post,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { Response, response } from 'express';
import { OwnersPortableDevicesService } from './owners-portable-devices.service';
@Controller('portable_devices')
export class PortableDevicesController {
  constructor(
    private readonly ownersPortableDevicesService: OwnersPortableDevicesService
  ) {}

  @Get()
  async getPortableDevices(@Res() res: Response) {
    try {
      const userIdFromToken = 1;

      const portableDevices =
        await this.ownersPortableDevicesService.getDevicesByUserId(
          userIdFromToken
        );

      const totalItems = portableDevices.length;

      res.header('Content-Range', `items 0-${totalItems - 1}/${totalItems}`);

      return res.json(portableDevices);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  @Post('create')
  async createPortableDevice(@Body() deviceData: any) {
    try {
      console.log(deviceData);
      const userIdFromToken = 1;
      return await this.ownersPortableDevicesService.createDevice(
        userIdFromToken,
        deviceData
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  async deletePortableDevice(
    @Param('id') deviceId: number,
    @Res() res: Response
  ) {
    console.log('In controller');
    try {
      const result =
        await this.ownersPortableDevicesService.deleteDevice(deviceId);
      console.log(result);
      if (result) {
        return res.status(204).send();
      } else {
        return res.status(404).json({ message: 'Device not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  @Get(':id')
  async getPortableDeviceById(@Param('id') id: number) {
    try {
      const portableDevice =
        await this.ownersPortableDevicesService.getDevicesByUserId(id);
      if (!portableDevice) {
        return { message: 'Portable device not found' };
      }
      return portableDevice;
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred' };
    }
  }
  // @Put(':id')
  // async updatePortableDevice(
  //   @Param('id') id: number,
  //   @Body() updatedDeviceData: any,
  //   @Res() res: Response
  // ) {
  //   try {
  //     const existingDevice =
  //       await this.ownersPortableDevicesService.getPortableDeviceById(id);

  //     if (!existingDevice) {
  //       return res.status(404).json({ message: 'Portable device not found' });
  //     }

  //     // Assuming your service method returns a boolean indicating success
  //     const updateResult = await this.ownersPortableDevicesService.updatePortableDevice(
  //       id,
  //       updatedDeviceData
  //     );

  //     if (updateResult) {
  //       return res.status(204).send(); // Successful update, return a 204 status code
  //     } else {
  //       return res.status(500).json({ message: 'Failed to update the portable device' });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: 'An error occurred' });
  //   }
  // }
}
