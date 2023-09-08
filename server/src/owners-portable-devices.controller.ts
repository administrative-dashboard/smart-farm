//owners-portable-devices.conroller.ts
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { OwnersPortableDevicesService } from './owners-portable-devices.service'; // Adjust the path
import { log } from 'console';
@Controller('portable_devices')
export class PortableDevicesController {
  constructor(private readonly ownersPortableDevicesService: OwnersPortableDevicesService) {}
  
  @Get()
  async getPortableDevices(@Res() res: Response) {
    try {
      
      // Replace 'userIdFromToken' with the actual user ID from the JWT token
      const userIdFromToken = 1;

      // Fetch the portable devices data for the user
      const portableDevices = await this.ownersPortableDevicesService.getDevicesByUserId(userIdFromToken);
      
      // Calculate the total number of items (if available)
      const totalItems = portableDevices.length;

      // Set the Content-Range header
      res.header('Content-Range', `items 0-${totalItems - 1}/${totalItems}`);

      // Send the JSON response with the retrieved data
      return res.json(portableDevices);
    } catch (error) {
      console.log(error);
      // Handle any errors, e.g., return an error response
      res.status(500).json(error);
    }
  }
}
