import { Controller, Get, Put,Req,Delete, Res, Post, Body, Logger,Param } from '@nestjs/common'; // Import Logger
import { Response, response } from 'express';
import { OwnersPortableDevicesService } from './owners-portable-devices.service';
import { HttpCode } from '@nestjs/common';
import { Headers } from '@nestjs/common';
@Controller('portable_devices')
export class PortableDevicesController {
  constructor(
    private readonly ownersPortableDevicesService: OwnersPortableDevicesService
  ) {}

  @Get()
  async getPortableDevices(@Req() req: Request, @Res() res: Response, @Headers() header) {
  
    try {
      const userDataHeader= req.headers['user-data'];
      console.log(userDataHeader);
      try {
        let userData = JSON.parse(userDataHeader);
      } catch (parseError) {
        // Handle the case where JSON parsing fails
        console.log(parseError);
      }
    
      
      // Use userData to customize your query or logic
      // For example, you can access userData.user_id
      // Fetch the portable devices data for the user using userData
      const portableDevices = await this.ownersPortableDevicesService.getDevicesByUserId(5);

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
 
  @Get(':id')
  async getPortableDeviceById(@Param('id') id: string) {
    try {
      /* const userIdFromToken = 1; */

      // Call the service to get the portable device by ID
      const portableDevice = await this.ownersPortableDevicesService.getPortableDeviceById(
        id
        
      );

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
    @Body() deviceData: any,
  ) {
    try {
    

      // Call the service to update the portable device by ID
      const updatedPortableDevice = await this.ownersPortableDevicesService.updatePortableDeviceById(
        id,
        deviceData,
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
  async createPortableDevice(@Body() deviceData: any) {
    try {
      console.log(deviceData);
      const userIdFromToken = 1;
      // Call the service to create the portable device
      return await this.ownersPortableDevicesService.createDevice(userIdFromToken, deviceData);
    } catch (error) {
      console.log(error);
    }
  }
 

  @Delete(':id')
  async deletePortableDeviceById(@Param('id') id: string) {
    try {
      // Call the service method to delete the portable device by ID
      const deleted = await this.ownersPortableDevicesService.deletePortableDeviceById(id);

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


