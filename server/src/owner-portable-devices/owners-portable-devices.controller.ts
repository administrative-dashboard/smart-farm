import { Controller, Get, Req, Res, Post, Body, Logger } from '@nestjs/common'; // Import Logger
import { Response, response } from 'express';
import { OwnersPortableDevicesService } from './owners-portable-devices.service';
import { HttpCode } from '@nestjs/common';
@Controller('portable_devices')
export class PortableDevicesController {
  constructor(
    private readonly ownersPortableDevicesService: OwnersPortableDevicesService
  ) {}

  @Get()
  async getPortableDevices(@Res() res: Response) {
    try {
      // Replace 'userIdFromToken' with the actual user ID from the JWT token
      const userIdFromToken = 1;

      // Fetch the portable devices data for the user
      const portableDevices =
        await this.ownersPortableDevicesService.getDevicesByUserId(
          userIdFromToken
        );

      // Calculate the total number of items (if available)
      const totalItems = portableDevices.length;

      // Set the Content-Range header
      res.header('Content-Range', `items 0-${totalItems - 1}/${totalItems}`);

      // Send the JSON response with the retrieved data
      return res.json(portableDevices);
    } catch (error) {
      // Handle any errors, e.g., return an error response
      res.status(500).json(error);
    }
  }

  @Post('create')
  async createPortableDevice(@Body() deviceData: any) {
    try {
      const userIdFromToken = 1;
      // Call the service to create the portable device
      return await this.ownersPortableDevicesService.createDevice(userIdFromToken, deviceData);
    } catch (error) {
      console.log(error);
    }
  }
}
